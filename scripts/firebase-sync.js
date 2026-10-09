// Sincronização em nuvem (FVS Obras - TERGOS).
//
// Este arquivo roda como módulo ES (type="module"), separado do script principal
// (clássico) do index.html. Os dois conversam através de `window`: o script
// principal expõe `window.db`, `window.saveDB`, `window.render` etc. (toda
// declaração `var`/`function` de nível superior num <script> clássico vira
// propriedade de window), e este módulo expõe `window.enviarFotoNuvem`,
// `window.buscarFotoNuvem`, `window.excluirFotoNuvem`, `window.fvsLogout`,
// `window.fvsLogado` e `window.statusSincronizacao` para o script principal usar.
//
// Design "local-first": se não houver internet, ou o Firebase não carregar por
// qualquer motivo, o app continua funcionando normalmente só com os dados locais
// (localStorage + IndexedDB) — a nuvem é um extra, nunca um bloqueio.

import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import {
  initializeFirestore, persistentLocalCache, persistentMultipleTabManager,
  collection, doc, setDoc, deleteDoc, onSnapshot, getFirestore
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";
import {
  getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-storage.js";

(async function iniciarSincronizacaoNuvem(){
  let app, auth, firestoreDb, storage;
  try{
    app = initializeApp(window.FIREBASE_CONFIG);
    auth = getAuth(app);
    try{
      firestoreDb = initializeFirestore(app, {
        localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
      });
    }catch(e){
      firestoreDb = getFirestore(app); // sem cache offline (ex.: aba privada) — ainda funciona online
    }
    storage = getStorage(app);
  }catch(e){
    console.warn("Sincronização na nuvem não iniciou (sem internet ou Firebase indisponível). O app continua funcionando com os dados locais.", e);
    return;
  }

  // ---------- estado ----------
  let usuarioAtual = null;
  let desinscreverObras = null;
  let idsRemotosConhecidos = new Set();
  let primeiraSincronizacaoFeita = false;
  let timerSync = null;
  let estadoSync = "offline"; // offline | aguardando-login | sincronizado | sincronizando | erro

  window.fvsLogado = ()=> !!usuarioAtual;
  window.statusSincronizacao = ()=>{
    if(!usuarioAtual) return "Sem sincronização — entre com sua conta da equipe para sincronizar com os outros aparelhos.";
    if(!navigator.onLine) return "Sem internet no momento. As alterações serão enviadas quando a conexão voltar.";
    if(estadoSync === "sincronizando") return "Sincronizando com a nuvem...";
    if(estadoSync === "erro") return "Não foi possível sincronizar agora. Suas alterações continuam salvas neste aparelho.";
    return "Sincronizado com a equipe (" + usuarioAtual.email + ").";
  };

  // ---------- compressão de fotos (padrão "leve": até 2000px, JPEG 85%) ----------
  function comprimirImagem(arquivo){
    return new Promise((resolve)=>{
      const imgEl = new Image();
      const url = URL.createObjectURL(arquivo);
      imgEl.onload = ()=>{
        const MAX = 2000;
        let { width, height } = imgEl;
        if(width > MAX || height > MAX){
          const escala = MAX / Math.max(width, height);
          width = Math.round(width * escala);
          height = Math.round(height * escala);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width; canvas.height = height;
        canvas.getContext("2d").drawImage(imgEl, 0, 0, width, height);
        URL.revokeObjectURL(url);
        canvas.toBlob((blob)=>resolve(blob || arquivo), "image/jpeg", 0.85);
      };
      imgEl.onerror = ()=>{ URL.revokeObjectURL(url); resolve(arquivo); };
      imgEl.src = url;
    });
  }

  function caminhoFoto(obraId, shortId){
    return "obras/" + obraId + "/fotos/" + shortId + ".jpg";
  }

  window.enviarFotoNuvem = async function(obraId, shortId, arquivo){
    if(!usuarioAtual) return;
    const comprimida = await comprimirImagem(arquivo);
    await uploadBytes(storageRef(storage, caminhoFoto(obraId, shortId)), comprimida);
  };
  window.buscarFotoNuvem = async function(obraId, shortId){
    if(!usuarioAtual) return null;
    try{
      const url = await getDownloadURL(storageRef(storage, caminhoFoto(obraId, shortId)));
      const resp = await fetch(url);
      return await resp.blob();
    }catch(e){ return null; }
  };
  window.excluirFotoNuvem = async function(obraId, shortId){
    if(!usuarioAtual) return;
    try{ await deleteObject(storageRef(storage, caminhoFoto(obraId, shortId))); }catch(e){ /* já não existe */ }
  };

  // ---------- envio dos dados da obra (texto/estrutura — sem fotos, que vão pelo Storage) ----------
  function cloneSeguro(obj){
    // remove undefined e qualquer coisa não serializável; Firestore não aceita "undefined".
    return JSON.parse(JSON.stringify(obj));
  }

  // Firestore recusa "array dentro de array" (ex.: campo: [[1,2],[3,4]]). Varre a obra
  // inteira procurando esse padrão antes de enviar, pra apontar o campo exato se for isso.
  function encontrarArrayAninhado(valor, caminho){
    if(Array.isArray(valor)){
      for(let i=0;i<valor.length;i++){
        if(Array.isArray(valor[i])) return caminho + "[" + i + "] (array dentro de array)";
        const achado = encontrarArrayAninhado(valor[i], caminho + "[" + i + "]");
        if(achado) return achado;
      }
    } else if(valor && typeof valor === "object"){
      for(const chave of Object.keys(valor)){
        const achado = encontrarArrayAninhado(valor[chave], caminho + "." + chave);
        if(achado) return achado;
      }
    }
    return null;
  }

  async function enviarObras(obras){
    if(!usuarioAtual || !obras.length) return;
    estadoSync = "sincronizando";
    try{
      for(const obra of obras){
        obra.atualizadoEm = Date.now();
        obra.atualizadoPor = usuarioAtual.email;
        const limpa = cloneSeguro(obra);
        const caminhoRuim = encontrarArrayAninhado(limpa, "obra");
        if(caminhoRuim){
          alert("Aviso de sincronização: encontrei o campo com problema antes de tentar enviar:\n\n" + caminhoRuim + "\n\nTire um print desta mensagem e me mande — isso vai direto ao ponto.");
        }
        await setDoc(doc(firestoreDb, "obras", obra.id), limpa);
        idsRemotosConhecidos.add(obra.id);
      }
      estadoSync = "sincronizado";
    }catch(e){
      console.warn("Falha ao sincronizar com a nuvem:", e);
      estadoSync = "erro";
      alert("Aviso de sincronização: não consegui enviar para a nuvem agora.\n\nCódigo: " + (e && e.code) + "\nMensagem completa: " + (e && e.message) + "\n\nOs dados continuam salvos neste aparelho — tire um print desta mensagem (a mensagem completa é a parte mais importante) e me mande.");
    }
  }

  // Exclusão só acontece por ação explícita da pessoa (botão de lixeira na obra),
  // nunca por comparação automática — isso já causou apagamento indevido de dados
  // reais quando uma aba/aparelho com visão incompleta dos dados achou, por engano,
  // que uma obra "deveria" ter sido removida.
  window.excluirObraNuvem = async function(obraId){
    if(!usuarioAtual) return;
    idsRemotosConhecidos.delete(obraId);
    try{ await deleteDoc(doc(firestoreDb, "obras", obraId)); }catch(e){ console.warn("Falha ao excluir obra na nuvem:", e); }
  };

  function agendarSincronizacao(dbObj){
    if(!usuarioAtual) return;
    clearTimeout(timerSync);
    timerSync = setTimeout(()=>enviarObras(dbObj.obras || []), 800);
  }

  // Escuta em tempo real: qualquer alteração feita por outro aparelho chega aqui.
  function iniciarEscuta(){
    if(desinscreverObras) return;
    desinscreverObras = onSnapshot(collection(firestoreDb, "obras"), (snapshot)=>{
      let mudouLocal = false;
      snapshot.docChanges().forEach((mudanca)=>{
        const remota = mudanca.doc.data();
        if(mudanca.type === "removed"){
          idsRemotosConhecidos.delete(remota.id);
          const antes = window.db.obras.length;
          const obraRemovida = window.db.obras.find(o=>o.id === remota.id);
          window.db.obras = window.db.obras.filter(o=>o.id !== remota.id);
          if(window.db.obras.length !== antes){
            mudouLocal = true;
            console.warn("[FVS sync] Obra removida da nuvem e do aparelho:", remota.id, obraRemovida && obraRemovida.nome);
            alert("Aviso de sincronização: a obra \"" + (obraRemovida ? obraRemovida.nome : remota.id) + "\" foi removida da nuvem (por este ou outro aparelho) e por isso saiu da lista aqui também.\n\nSe você não excluiu essa obra de propósito, tire um print desta mensagem e me mande.");
          }
          return;
        }
        idsRemotosConhecidos.add(remota.id);
        const local = window.db.obras.find(o=>o.id === remota.id);
        if(!local){
          window.db.obras.push(remota);
          mudouLocal = true;
        } else if((remota.atualizadoEm || 0) > (local.atualizadoEm || 0)){
          Object.assign(local, remota);
          mudouLocal = true;
        }
      });

      if(mudouLocal){
        try{ localStorage.setItem("qualitab_obra_v1", JSON.stringify(window.db)); }catch(e){ /* ignora: já estava salvo localmente antes */ }
        if(typeof window.render === "function") window.render();
      }

      if(!primeiraSincronizacaoFeita){
        primeiraSincronizacaoFeita = true;
        estadoSync = "sincronizado";
        // Sobe para a nuvem qualquer obra que já existia neste aparelho antes do login
        // (ex.: histórico já criado no PC) e que a nuvem ainda não conhece.
        const faltantes = (window.db.obras || []).filter(o=>!idsRemotosConhecidos.has(o.id));
        if(faltantes.length) enviarObras(faltantes);
      }
    }, (erro)=>{
      console.warn("Escuta da nuvem interrompida:", erro);
      estadoSync = "erro";
    });
  }

  function pararEscuta(){
    if(desinscreverObras){ desinscreverObras(); desinscreverObras = null; }
    idsRemotosConhecidos = new Set();
    primeiraSincronizacaoFeita = false;
  }

  // ---------- tela de login ----------
  function traduzirErroAuth(codigo){
    switch(codigo){
      case "auth/invalid-email": return "E-mail inválido.";
      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-credential": return "E-mail ou senha incorretos.";
      case "auth/too-many-requests": return "Muitas tentativas. Aguarde um pouco e tente de novo.";
      case "auth/network-request-failed": return "Sem conexão com a internet. Verifique sua rede.";
      default: return "Não foi possível entrar. Tente novamente.";
    }
  }

  function injetarEstilos(){
    if(document.getElementById("fvs-sync-estilos")) return;
    const style = document.createElement("style");
    style.id = "fvs-sync-estilos";
    style.textContent = `
      #fvs-login-overlay{position:fixed;inset:0;background:#38384a;display:flex;align-items:center;justify-content:center;z-index:9999;padding:20px;}
      #fvs-login-overlay .caixa{background:#fff;border-radius:16px;padding:28px 24px;max-width:340px;width:100%;box-shadow:0 10px 30px rgba(0,0,0,.3);}
      #fvs-login-overlay h1{font-size:18px;margin:0 0 4px;color:#38384a;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;}
      #fvs-login-overlay p.sub{font-size:13px;color:#878791;margin:0 0 18px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;}
      #fvs-login-overlay label{font-size:13px;color:#878791;font-weight:600;display:block;margin-top:12px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;}
      #fvs-login-overlay input{width:100%;box-sizing:border-box;padding:11px 12px;border:1px solid #e6e2d6;border-radius:8px;font-size:15px;margin-top:4px;font-family:inherit;}
      #fvs-login-overlay button{width:100%;margin-top:18px;padding:12px;border:none;border-radius:8px;background:#e5736e;color:#fff;font-size:15px;font-weight:600;cursor:pointer;}
      #fvs-login-overlay button:disabled{opacity:.6;}
      #fvs-login-overlay .erro{color:#c85850;font-size:13px;margin-top:10px;min-height:16px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;}
    `;
    document.head.appendChild(style);
  }

  function mostrarLogin(){
    injetarEstilos();
    if(document.getElementById("fvs-login-overlay")) return;
    const overlay = document.createElement("div");
    overlay.id = "fvs-login-overlay";
    overlay.innerHTML = `
      <div class="caixa">
        <h1>FVS Obras — TERGOS</h1>
        <p class="sub">Entre com a conta da equipe para sincronizar com todos os aparelhos.</p>
        <form id="fvs-login-form">
          <label>E-mail</label>
          <input type="email" id="fvs-login-email" autocomplete="username" required>
          <label>Senha</label>
          <input type="password" id="fvs-login-senha" autocomplete="current-password" required>
          <div class="erro" id="fvs-login-erro"></div>
          <button type="submit" id="fvs-login-btn">Entrar</button>
        </form>
      </div>`;
    document.body.appendChild(overlay);
    const form = document.getElementById("fvs-login-form");
    const btn = document.getElementById("fvs-login-btn");
    const erroEl = document.getElementById("fvs-login-erro");
    form.onsubmit = async (ev)=>{
      ev.preventDefault();
      erroEl.textContent = "";
      btn.disabled = true; btn.textContent = "Entrando...";
      const email = document.getElementById("fvs-login-email").value.trim();
      const senha = document.getElementById("fvs-login-senha").value;
      try{
        await signInWithEmailAndPassword(auth, email, senha);
      }catch(e){
        erroEl.textContent = traduzirErroAuth(e.code);
        btn.disabled = false; btn.textContent = "Entrar";
      }
    };
  }

  function esconderLogin(){
    const overlay = document.getElementById("fvs-login-overlay");
    if(overlay) overlay.remove();
  }

  window.fvsLogout = function(){ signOut(auth).catch(()=>{}); };

  // ---------- liga tudo ----------
  onAuthStateChanged(auth, (usuario)=>{
    usuarioAtual = usuario;
    if(usuario){
      esconderLogin();
      iniciarEscuta();
    } else {
      pararEscuta();
      mostrarLogin();
    }
    if(typeof window.render === "function") window.render();
  });

  // Ponto único: toda chamada a saveDB() (usada em ~40 lugares do app) passa a também
  // agendar o envio para a nuvem, sem precisar mexer em cada lugar separadamente.
  const saveDBOriginal = window.saveDB;
  window.saveDB = function(dbObj){
    const ok = saveDBOriginal(dbObj);
    if(ok) agendarSincronizacao(dbObj);
    return ok;
  };
})();
