# Qualitab Obra — Histórico do Projeto

Documento de continuidade gerado em 24/07/2026. Objetivo: permitir retomar o projeto em fases futuras sem perder contexto das decisões já tomadas.

---

## 1. Origem e objetivo

A Carol pediu um sistema para substituir o **Qualitab**, app que a engenheira responsável de uma obra (amiga da Carol) usava e que saiu de uso. O objetivo: controlar a qualidade dos serviços executados em cada etapa da construção (por pavimento/ambiente), em conformidade com as normas ABNT vigentes, com checklist de verificação, fotos e documentação da execução.

Prints do Qualitab original (enviados via WhatsApp) mostravam uma tela "Lista de Serviços" com códigos **FVS** (Ficha de Verificação de Serviço), numerados de FVS-01 a FVS-43+, cada um com número de revisão (Rev.: 00, 01...), cobrindo desde infraestrutura (compactação, locação de obra) até acabamento (rodapés, torneiras, exaustores).

**Decisão de formato:** app web simples (HTML/JS, sem instalação, funciona no navegador do celular), em vez de planilha ou app nativo — para ter algo funcional rápido.

---

## 2. Pesquisa técnica das normas ABNT

Antes de construir, foi feita uma pesquisa (via agente com WebSearch) das normas ABNT vigentes aplicáveis a cada um dos ~35 FVS da lista, com 4-8 itens de verificação técnica objetivos por serviço.

**Resultado:** a maioria das normas foi confirmada com boa segurança (ex: NBR 6122:2019, NBR 5410:2004, NBR 5626:2020, NBR 15575, NBR 16868 etc.). Um grupo pequeno ficou **sem norma ABNT específica confirmada** e foi marcado explicitamente como tal no catálogo (sem inventar número de norma):
- FVS-28 Fachada Aerada
- FVS-34 Assentamento de Peitoris e Soleiras
- FVS-37 Colocação de Bancadas
- FVS-39 Nicho
- FVS-42 Instalação de Torneiras (como produto específico)
- FVS-43 Exaustões Mecânicas (uso residencial simples)

**Atenção apontada pela pesquisa:** NBR 15079 (tintas) teve edições canceladas em 2025 — recomenda-se checar a norma vigente na ABNT antes de uso formal.

**Ação recomendada para a engenheira responsável:** validar/complementar essas referências normativas antes de uso formal em campo, já que ela é a responsável técnica.

---

## 3. O que foi construído

Local (atualizado em 10/08/2026 — pasta renomeada, ver seção 11): `C:\Users\User\Documents\FVS OBRAS - TERGOS\`

```
FVS OBRAS - TERGOS/
├── index.html              ← o app inteiro (abrir este arquivo no navegador)
├── scripts/
│   ├── catalogo-fvs.js     ← catálogo mestre de FVS com normas e itens de checklist
│   ├── subchecks-fvs.js    ← sub-checklist de cada item de cada FVS
│   └── nomes-comodo.js     ← whitelist de nomes de cômodo (usada na importação de planta)
├── assets/
│   └── logo-tergos-*.webp  ← logo da TERGOS (horizontal/vertical)
├── dados/
│   └── *.json              ← backups exportados (referência)
└── documentos/
    └── HISTORICO_PROJETO.md ← este arquivo (cópia de referência; o original vive em Downloads)
```

### Arquitetura
- **Sem backend, sem build, sem instalação.** Um único `index.html` com CSS e JS embutidos, mais um arquivo de dados (`catalogo-fvs.js`) carregado via `<script src>`.
- **Persistência:** `localStorage` do navegador, chave `qualitab_obra_v1`. **Os dados NÃO sincronizam entre dispositivos/navegadores** — cada navegador/aparelho tem sua própria cópia local.
- **Hierarquia de dados:** Obra → Pavimento → Ambiente → Serviço (FVS aplicada, com revisão) → Itens de checklist (texto, status, observação, foto em base64).

### Funcionalidades implementadas
1. **CRUD completo** de Obra, Pavimento, Ambiente (criar, listar, navegar, **excluir com confirmação** — botão 🗑️ no header de cada tela).
2. **Catálogo de FVS pesquisável** — ao adicionar um serviço a um ambiente, busca por código ou nome no catálogo de 35+ FVS.
3. **Checklist por FVS**: cada item pode ser marcado como Conforme / Não Conforme / N/A, com campo de observação e **upload de foto** (via `<input type="file" capture="environment">`, salva como base64 no próprio registro).
4. **Dashboard de progresso**, em cada nível de navegação (obra, pavimento, ambiente): cards de Conformes/Não Conformes/Pendentes/Progresso%, barra de progresso.
5. **Gráficos visuais** (SVG puro, sem bibliotecas externas) na tela da obra:
   - Gráfico de rosca: distribuição Conforme/Não Conforme/Pendente da obra inteira.
   - Gráfico de barras horizontais: progresso % por pavimento.
   - Ranking de serviços (FVS) com mais não-conformidades somadas na obra inteira (top 8, ordenado, só aparece se houver ao menos 1 NC).
   - Paleta de cores segue a skill de dataviz (status: good/warning/critical; sequencial azul para magnitude).
6. **Exportação em PDF** (via `window.print()` do navegador — sem biblioteca externa):
   - Relatório detalhado por ambiente ("Ficha de Vistoria"): cada FVS com itens, status, observações, fotos anexadas, normas de referência, campo de assinatura do responsável técnico.
   - Relatório resumo da obra: cards de progresso, tabela por pavimento/ambiente, lista consolidada de não-conformidades.
7. **Backup/Restauração manual** (botões 💾 / 📂 na tela inicial, lista de obras):
   - 💾 Exportar backup: baixa um único arquivo `.json` com **todas as obras cadastradas** (não é por obra individual).
   - 📂 Restaurar backup: lê um `.json` e **substitui** (não mescla) os dados atuais, com confirmação antes.

### Testes realizados
Sem Node/npm/chromium-cli disponíveis no ambiente (Windows, sem essas ferramentas instaladas). Testes feitos via Chrome headless (`--headless=new`) do sistema, com harnesses de teste temporários que:
- Simulam cliques reais no DOM do app carregado em iframe/página.
- Verificam criação de obra/pavimento/ambiente, adição de FVS, marcação de status, upload de foto (simulado), observações, cálculo de progresso e contagem de NC, persistência no localStorage.
- Testaram exportação de PDF (conteúdo do `print-area` populado corretamente) e backup/restore.
- Todos os testes passaram (18 a 22 verificações por rodada, conforme a feature).
- Arquivos de teste temporários sempre foram removidos após o uso (não ficam no projeto).

---

## 4. Incidente registrado (importante para o futuro)

Durante uma rodada de testes automatizados da função de PDF, o script de teste usou `localStorage.removeItem("qualitab_obra_v1")` — **a mesma chave usada pelo app de produção** — para simular um estado limpo antes de testar. Isso poderia ter apagado dados reais cadastrados no mesmo navegador.

**Resultado:** a Carol confirmou que os dados perdidos eram apenas testes dela mesma, sem perda real.

**Correção aplicada:** todos os testes seguintes passaram a:
- Rodar em pasta isolada (scratchpad), nunca dentro do projeto.
- Capturar o valor original do `localStorage` do usuário **antes** de qualquer alteração e restaurá-lo **ao final**, independente do resultado do teste (inclusive em caminhos de exceção).
- Nunca mais usar a chave de produção (`qualitab_obra_v1`) para reset direto sem esse cuidado.

**Recomendação permanente:** por causa desse risco (dados só no navegador, sem backend), reforçar o uso do botão 💾 Exportar backup regularmente (ex: toda semana de obra).

---

## 5. Limitação identificada: sincronização entre dispositivos

**Pergunta da Carol:** se abrir em outro dispositivo, o histórico aparece? Ela queria ver em tempo real de outro lugar enquanto a amiga registra em campo.

**Resposta técnica dada:**
- `localStorage` é local por navegador/aparelho — não sincroniza sozinho.
- GitHub Pages resolveria "ter um link fixo acessível de qualquer lugar para o **código**", mas **não resolve sincronização de dados** — GitHub Pages só hospeda arquivos estáticos, sem banco de dados por trás.
- Sincronização real em tempo real exigiria um backend com banco de dados na nuvem (ex: Firebase, Supabase) — mudança arquitetural significativa, precisa de conta externa (gratuita até certo limite), e não foi implementada ainda.
- Capacidades de Artifact do Claude disponíveis nesta conta: apenas `downloads` e `mcp` — não há capacidade de "estado compartilhado em tempo real entre visualizações" disponível para essa finalidade.

**Status:** decisão em aberto. Opções discutidas com a Carol:
1. Manter fluxo atual (local + backup manual exportado/importado) — **sem custo, funciona hoje**.
2. Hospedar no GitHub Pages só para ter link fixo do código, mas ainda sem sincronia de dados.
3. Implementar backend real (Firebase/Supabase) para sincronização em tempo real — exige mais tempo, conta externa, e uma nova rodada de desenvolvimento.

**Ainda não decidido qual caminho seguir.** Retomar essa conversa com a Carol nas próximas fases.

---

## 6. Problema em andamento no momento da pausa

A Carol exportou um backup no celular Android dela via WhatsApp (tocou no ícone de download) mas não estava encontrando o arquivo salvo no aparelho para restaurá-lo. Ela não tem um app "gerenciador de arquivos" separado.

**Última orientação dada:** usar o próprio botão **📂 Restaurar backup** do app, que abre o seletor de arquivos nativo do Android — pedir para tocar em "Recentes" ou no menu ☰ dentro dessa tela de seleção, onde o arquivo `qualitab-obra-backup-AAAA-MM-DD.json` deve aparecer sem precisar navegar manualmente por pastas.

**Pendente:** confirmar com a Carol se esse caminho funcionou.

---

## 7. Próximos passos possíveis (não implementados ainda)

Discutidos mas não construídos:
- **Histórico/evolução no tempo** (gráfico de linha mostrando progresso e não-conformidades ao longo de dias/semanas) — exigiria guardar snapshots periódicos, mudança na estrutura de dados. Considerado de menor prioridade que o ranking de FVS (que já foi implementado).
- **Sincronização entre dispositivos** — ver seção 5 acima.
- Resolver o problema imediato de localizar o arquivo de backup no Android da Carol.

---

## 8. Botão de salvar manual por FVS (implementado em 24/07/2026)

A Carol notou que o app salvava automaticamente a cada clique (status, foto, observação), sem nenhum feedback visual de confirmação, e pediu um botão explícito de "Salvar".

**Mudança de modelo:** status/foto/observação agora só alteram o estado em memória. Um botão fixo no rodapé do checklist da FVS ("💾 Salvar" quando há alteração pendente / "✓ Salvo" quando tudo gravado) persiste no `localStorage` só quando clicado. Se o usuário tentar fechar o checklist (X ou toque fora do modal) com alterações não salvas, aparece confirmação ("Você tem alterações não salvas. Sair mesmo assim?") antes de descartar.

**Bug corrigido na mesma leva:** clicar em status/foto/observação recriava o modal inteiro (`draw()` completo), o que resetava o scroll para o topo sempre que a pessoa marcava um item mais abaixo na lista. Corrigido para atualizar só o item específico no DOM, sem recriar o modal — o scroll agora se mantém.

---

## 9. Sub-checklist de 3 níveis por item de FVS (implementado em 24/07/2026)

A Carol pediu que cada item de verificação da FVS (ex.: "Planeza e nivelamento do contrapiso") deixasse de ser um único status marcado manualmente e passasse a ter seus próprios pontos críticos objetivos, prevenindo que o responsável marque "conforme" sem checar tudo que compõe aquele item.

**Modelo implementado — hierarquia de 3 níveis:**
1. FVS (ex.: FVS-22 Contrapiso)
2. Item de verificação (ex.: "Planeza da superfície com régua de alumínio") — o que já existia
3. **Novo:** sub-checklist de 3-4 pontos objetivos e mensuráveis por item (ex.: "Régua de alumínio de 2m não acusa vão maior que 3mm sob a régua")

**Cálculo automático do status do item:** todos os sub-pontos marcados → item vira "Conforme" automaticamente; algum sub-ponto não marcado → item vira "Não Conforme" automaticamente, e a observação do item é preenchida com uma linha automática listando os sub-pontos pendentes (formato `🔧 Pendente: ...`). Essa linha se re-sincroniza sozinha sempre que os sub-pontos mudam. O campo de observação continua editável: texto digitado manualmente pelo usuário fica separado por uma linha em branco após o bloco automático e nunca é apagado pelo sistema, mesmo quando a linha automática muda ou desaparece.

**Botão N/A por item:** cada item mantém um botão "Marcar como N/A" que ignora os sub-pontos e marca o item inteiro como não aplicável (desabilita os checkboxes). Clicar de novo desfaz o N/A e o status volta a ser calculado pelos sub-pontos.

**Benchmark técnico:** os sub-checklists foram gerados para os 32 FVS do catálogo (todos os itens, ~230 no total) com base nas mesmas normas ABNT já citadas em cada FVS, usando valores numéricos reais quando a norma define (ex.: NBR 9050 para corrimãos, NBR 6118 para cobrimento de armadura). Nos pontos sem norma ABNT confirmada (fachada aerada, peitoril/soleira, bancada, exaustão etc.), os sub-pontos foram marcados explicitamente com `[Prática de mercado/fabricante — não é norma ABNT confirmada]` e comentário `// verificar`, mantendo o mesmo cuidado já usado no catálogo original — **precisam de validação pela engenheira responsável antes de uso formal**, assim como as normas do catálogo mestre.

**Arquivos:**
- `scripts/subchecks-fvs.js` (novo) — `window.FVS_SUBCHECKS`, chave `"CODIGO|REV"` → item de texto exato → array de sub-pontos.
- `index.html` — nova estrutura de dados por item (`item.subitens: [{texto, feito}]`), função `subChecksDoItem()` para popular ao adicionar FVS a um ambiente, `atualizarObsAutomatica()` para o bloco automático + texto livre, `legendaStatusItem()` para o badge visual.

**Compatibilidade com dados antigos:** itens de FVS já cadastrados antes desta mudança (sem `subitens`) continuam funcionando com os 2 botões antigos (Conforme/Não Conf.), já que o fallback `if(!item.subitens) item.subitens = []` detecta a ausência de sub-checklist e mantém o comportamento anterior.

**Testes:** validado em ambiente isolado (scratchpad, nunca no localStorage de produção) o fluxo completo com FVS-22 Contrapiso — cálculo automático Pendente→Não Conf.→Conforme, preservação do texto livre na observação, toggle do botão N/A nos dois sentidos, e persistência correta no localStorage ao salvar.

---

## 11. Sessão de 10/08/2026 — rebrand visual, fluxo de QA (aprovação/reinspeção), fornecedores, catálogo expandido

Sessão longa, com vários pedidos encadeados. Resumo por assunto (todos confirmados pela Bela, exceto onde indicado):

**Identidade visual**
- Paleta de cores extraída de uma imagem enviada pela Bela: navy `#38384a`, coral `#e5736e`, cinza `#878791`, creme `#ebe3d1` — vira as novas variáveis CSS (`--primary`=coral, `--text`=navy, `--muted`=cinza, `--bg`=creme claro), no modo claro e escuro. As cores de status (conforme/não conforme/N/A/pendente) foram mantidas de propósito, para não perder legibilidade.
- Logo da TERGOS (`assets/logo-tergos-horizontal.webp`) aparece na tela inicial (lista de obras), num cabeçalho branco — as demais telas mantêm o cabeçalho colorido.
- Ícone de cada obra virou uma foto clicável (substitui o emoji genérico), salva em base64 em `obra.foto`.

**Fluxo de qualidade (Aprovação / Reinspeção)** — novidade que não existia antes
- Quando uma FVS chega a 100% verificada, aparece um bloco de **Aprovação** (aprovado/pendente), com botão pra alternar.
- Quando um item de uma FVS fica Não Conforme (ou Parcial, ver abaixo), aparece um campo de **data de reinspeção** — o status (vencida/agendada/não agendada) é calculado sozinho comparando a data com hoje, e o campo some sozinho quando não sobra mais item pendente de correção. A data é por FVS inteira (não por item — decisão explícita da Bela, mesmo a referência do app original mostrando por item).
- Dashboard da obra ganhou 4 cards coloridos (estilo do app Qualitab original), gráfico de aprovações (donut) e painel de reinspeções pendentes, todos com **porcentagem escrita** embaixo de cada número, calculada sobre o total que faz sentido pra cada métrica.

**Status do item de verificação — evoluiu em 3 etapas até o formato final**
- Antes: só Conforme/Não Conforme (e N/A à parte).
- Depois: virou 3 estados (+ Parcialmente Conforme, que também dispara a necessidade de reinspeção).
- **Formato final**: 5 botões-ícone por linha de verificação — 👍 Conforme, 👎 Não Conforme, 💬 Parcial, 🚫 N/A, ⏳ Pendente — substituindo tanto os botões de texto quanto as caixinhas de check dos sub-pontos do sub-checklist (seção 9 deste documento). Cada sub-ponto agora tem seu próprio status entre os 5, e o status do item "pai" é calculado a partir da mistura dos sub-pontos (todos ok → ok; todos nc → nc; nenhum avaliado → pendente; qualquer mistura → parcial; todos N/A → N/A).
- Dado antigo (sub-pontos marcados como check ✓/✗) é migrado automaticamente pro novo formato ao abrir, sem perder o que já tinha sido preenchido.

**Fornecedores/Encarregados** — novidade
- Cadastro de responsáveis (nome + telefone) por obra, tela própria acessível pelo botão "👷 Fornecedores/Encarregados" na tela da obra.
- Cada FVS aplicada pode ser atribuída a um fornecedor/encarregado (campo dentro do checklist da FVS).
- Cada fornecedor tem uma tela com os serviços atribuídos a ele e um botão **"Exportar relatório de não conformidades (PDF)"** — é um PDF gerado pra Bela compartilhar manualmente (WhatsApp, e-mail), não um envio automático (o app não tem backend/mensageria).

**Catálogo de FVS — 2 novas fichas, com fontes oficiais pesquisadas**
- **FVS-03 / Estacas Hélice Contínua** — baseada no **Caderno de Encargos da SUDECAP, Capítulo 4 (Fundações)**, baixado e lido diretamente do site da Prefeitura de Belo Horizonte (`prefeitura.pbh.gov.br`), mais NBR 6122, NBR 16903, NBR 13208, ASTM D5882. Um item (consumo mínimo de cimento/slump) ficou marcado `// conferir valor vigente` porque a fonte primária (Anexo O da NBR 6122) não pôde ser lida na íntegra.
- **FVS-04 / Fundações Rasas - Blocos e Cintas** — mesma fonte SUDECAP (seção 4.4), mais NBR 6122, NBR 6118, NBR 6489 (prova de carga em fundação direta), NBR 16889, NBR 14931. Nenhum item precisou de ressalva desta vez.
- **Importante**: em ambos os casos, os *números* das normas foram confirmados contra a lista oficial "Legislação Aplicável" do documento da SUDECAP — mas o *texto completo* de cada norma NBR individual não foi lido (a ABNT vende essas normas, não são de acesso gratuito). Reforçar essa ressalva sempre que uma FVS nova for adicionada dessa forma.

**Melhorias de uso**
- Adicionar múltiplas FVS a um ambiente, ou múltiplos ambientes a uma unidade, agora é feito com seleção múltipla (marca vários, salva tudo de uma vez) — antes fechava a tela a cada item adicionado.
- Ambientes dentro de uma Unidade (apartamento individual) ganharam 16 sugestões de nome prontas (Sala Estar/Jantar, Lavabo, Suíte Master etc.) pra não precisar digitar toda vez.
- Pavimentos agora podem ser **renomeados** (botão ✏️ no cabeçalho) e **reordenados manualmente** (botão "↕️ Reordenar pavimentos", com setas ▲▼ por pavimento).
- Os 3 gráficos principais do dashboard da obra ficam lado a lado em telas largas (antes, um embaixo do outro).
- Corrigido um bug em que o campo de data de reinspeção não aparecia até fechar e reabrir a FVS depois de marcar um item como não conforme.

**Pasta renomeada e backup de segurança (10/08/2026, fim da sessão)**
- A pasta do projeto mudou de `qualitab-obra` para `FVS OBRAS - TERGOS` (pedido explícito da Bela — nada de código quebrou, os caminhos internos são relativos).
- **Controle de versão iniciado**: a pasta agora é um repositório git local (`git init` + primeiro commit com todo o estado atual). Isso permite ver histórico de mudanças e reverter algo se precisar, no futuro — desde que se continue commitando.
- **Backup adicional**: cópia compactada (.zip) de toda a pasta do projeto salva em `C:\Users\User\Documents\Backups\FVS-OBRAS-TERGOS-backup-2026-08-10_2000.zip`, fora da pasta de trabalho — se a pasta principal for perdida/corrompida, esse zip é a rede de segurança.

---

## 12. Como retomar

1. Abrir `Documentos\FVS OBRAS - TERGOS\index.html` no navegador para conferir o estado atual do app.
2. Ler este arquivo (seção 11 é o resumo mais recente) para reconstituir o contexto das decisões.
3. Perguntar à Bela se o problema do backup no Android foi resolvido (seção 6 — pendência antiga, pode já estar superada).
4. Perguntar à Bela qual caminho ela quer seguir quanto à sincronização entre dispositivos (seção 5), antes de investir tempo em qualquer arquitetura de backend.
5. Os sub-checklists técnicos (seção 9, e as FVS-03/FVS-04 da seção 11) foram gerados por pesquisa e ainda não foram revisados por um engenheiro/responsável técnico da obra — reforçar essa validação antes de uso formal em campo, especialmente nos pontos marcados `// verificar` ou `// conferir`.
6. A pasta é um repositório git desde 10/08/2026 — antes de mudanças grandes, considerar um novo commit como checkpoint (`git add -A && git commit -m "..."` dentro da pasta do projeto).
