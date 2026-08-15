// Catálogo de FVS (Fichas de Verificação de Serviço) — Qualitab Obra
// Conteúdo técnico recriado em 2026-08 a partir de pesquisa de normas ABNT vigentes,
// reproduzindo o trabalho original perdido. FVS-02, FVS-05 e FVS-19 usam texto
// idêntico ao de um backup real de uso do app; os demais foram recriados do zero.
// IMPORTANTE: este conteúdo ainda precisa ser validado por um engenheiro/responsável
// técnico antes de uso formal em campo (itens, normas e tolerâncias sujeitos a revisão).
const FVS_CATALOGO = [
  { codigo:"FVS-01", nome:"Compactação de Aterro", rev:"00",
    normas:["NBR 5681:2015 - Controle tecnológico da execução de aterros em obras de edificação","NBR 7182:2020 - Solo - Ensaio de compactação","NBR 7185:2016 - Solo - Determinação da massa específica aparente, in situ, com emprego de frasco de areia","NBR 9813:2016 - Solo - Determinação da massa específica aparente, in situ, com emprego de cilindro de cravação"],
    itens:[
      "Ensaio de compactação (Proctor) realizado para o material de aterro utilizado",
      "Umidade do material de aterro na faixa admissível em relação à umidade ótima",
      "Espessura das camadas de aterro conforme especificação de projeto",
      "Grau de compactação atingido conforme exigência de projeto",
      "Equipamento de compactação adequado ao tipo de solo",
      "Ausência de matéria orgânica, entulho ou material inadequado no aterro",
      "Drenagem e proteção do aterro contra erosão/saturação"
    ]
  },
  { codigo:"FVS-02", nome:"Locação de Obra", rev:"00",
    normas:["NBR 13133:2021 - Execução de levantamento topográfico"],
    itens:[
      "Referência de nível (RN) e cotas conforme projeto",
      "Esquadro dos eixos de locação conferido (3-4-5 ou estação total)",
      "Afastamentos/recuos conforme projeto legal aprovado",
      "Gabarito de madeira travado e nivelado",
      "Cotas de arrasamento e nível de soleira conferidos (tolerância de projeto)",
      "Alinhamento de pilares/eixos estruturais conferido",
      "Memorial de locação assinado por responsável técnico"
    ]
  },
  { codigo:"FVS-03", nome:"Estacas Hélice Contínua", rev:"00",
    normas:["NBR 6122:2022 - Projeto e execução de fundações","NBR 6122 (Emenda 1:2022, Anexo O) - Concreto para estacas hélice contínua monitorada","NBR 16903:2020 - Prova de carga estática em fundação profunda","NBR 13208:2007 - Estacas - Ensaios de carregamento dinâmico","ASTM D5882/16 - Standard Test Method for Low Strain Impact Integrity Testing of Deep Foundations","Caderno de Encargos SUDECAP - Capítulo 4: Fundações, item 4.5 (Tabela 8 - Hélice Contínua Monitorada)","PES 4.2 - Fundações Profundas - Estacas Hélice Contínua (procedimento interno TERGOS) — itens marcados \"prática interna TERGOS\" abaixo não constam nas normas ABNT, são cultura/exigência própria da empresa"],
    itens:[
      "Locação e verticalidade/prumo do equipamento conferidos antes do início da perfuração — desvio entre eixo executado e eixo de projeto dentro de 10% do diâmetro da estaca (estacas isoladas não travadas)",
      "Perfuração monitorada eletronicamente (torque, velocidade de avanço/rotação e profundidade) até a cota de projeto, com torque e força de arranque compatíveis com o diâmetro da estaca e a resistência do solo",
      "Concretagem executada por injeção pelo tubo central do trado, simultânea e contínua à retirada, com pressão controlada — sem interrupções que gerem vazios ou estrangulamento no fuste",
      "Volume de concreto consumido por estaca comparado ao volume teórico do fuste (fator de injeção controlado, sem sobre ou sub-consumo)",
      "Classe de concreto (fck) e armadura mínima conforme classe de agressividade ambiental do projeto — C30 (CAA I/II) ou C40 (CAA III/IV), armadura mín. 0,4%, comprimento útil mín. 4,0 m incluindo trecho de ligação com o bloco",
      "Consumo mínimo de cimento e abatimento (slump) do concreto conforme Anexo O da NBR 6122 — concreto bombeável específico para hélice contínua // conferir valor vigente, norma alterada pela Emenda 1/2022",
      "Armadura introduzida somente após o lançamento do concreto, até a profundidade especificada, sem danificar o fuste ainda fresco",
      "Ensaio de integridade (PIT) e/ou prova de carga estática realizados, com resultado aprovado pela fiscalização antes da concretagem do bloco de coroamento",
      "Fornecimento de concreto integralmente planejado antes do início da perfuração — traço aprovado, volume total da estaca, programação de entrega dos caminhões-betoneira e disponibilidade de bomba compatíveis com o ritmo de execução (prática interna TERGOS)",
      "Escavação de cada estaca iniciada somente quando o concreto disponível em obra for suficiente para concretá-la por completo, considerando a perda (prática interna TERGOS)",
      "Sequência de perfuração planejada previamente, com estacas situadas em raio de até 6 vezes o diâmetro da estaca a ser escavada concretadas há pelo menos 24 horas, evitando soterramento ou contaminação de peças recém-concretadas",
      "Cilindros de isopor instalados na parte superior interna da estaca antes da concretagem, para impedir que o concreto preencha a região da armadura no interior do bloco de coroamento e evitar demolição posterior (prática interna TERGOS)",
      "Posicionamento das barras de aterramento (SPDA) na armação conferido, quando especificado em projeto",
      "Ferragens expostas protegidas após a concretagem, até a execução do bloco de coroamento",
      "Demolição do topo da estaca até a cota de arrasamento executada sem comprometer a armação — seção final plana e perpendicular ao eixo, com ponteiros/marteletes leves e leve inclinação para cima (prática interna TERGOS)",
      "4 corpos de prova moldados para cada caminhão de concreto utilizado (prática interna TERGOS)",
      "Mapeamento colorido, no projeto de fundações impresso, identificando a região concretada por cada caminhão-betoneira, para rastreabilidade do lançamento de concreto (prática interna TERGOS)",
      "Formulário \"Controle de Execução de Estaca Hélice Contínua\" preenchido para cada estaca executada, a partir de cópia do modelo salva na pasta da obra — nunca editado por cima da planilha modelo (prática interna TERGOS)"
    ]
  },
  { codigo:"FVS-04", nome:"Fundações Rasas - Blocos e Cintas", rev:"00",
    normas:["NBR 6122:2022 - Projeto e execução de fundações","NBR 6118:2023 - Projeto de estruturas de concreto - Procedimento","NBR 6489:2019 - Solo - Prova de carga estática em fundação direta","NBR 16889:2020 - Concreto - Determinação da consistência pelo abatimento do tronco de cone","NBR 14931:2023 - Execução de estruturas de concreto - Procedimento","Caderno de Encargos SUDECAP - Capítulo 4: Fundações, itens 4.4 (Fundações em Superfície) e 4.4.2 (Condições Específicas)"],
    itens:[
      "Locação e cotas de assentamento (nível de arrasamento) dos blocos/sapatas/cintas conferidas com o projeto de fundações antes da escavação",
      "Fundo da vala/cava compactado e recoberto com lastro de concreto magro (não estrutural) de 5 cm de espessura, antes da armação",
      "Formas de madeira instaladas nas laterais das cavas — não é permitido concretar contra o barranco (solo)",
      "Cava limpa e isenta de materiais nocivos (madeira, solo carreado por chuva, água acumulada) imediatamente antes do lançamento do concreto",
      "Bitola, quantidade, posicionamento e cobrimento da armadura da sapata/viga (cinta) conferidos com o projeto estrutural, com espaçadores garantindo o cobrimento mínimo",
      "Classe de resistência do concreto (fck) e consistência (slump) conferidos conforme especificação de projeto, com corpos de prova moldados para ensaio",
      "Dimensões executadas (largura, comprimento, altura/espessura) dos blocos/sapatas/cintas conferidas com o projeto — sem lançamento de volumes/quantitativos indevidos",
      "Prova de carga estática em fundação direta realizada conforme NBR 6489 (quando exigida pelo projetista), com resultado aprovado pela fiscalização antes da execução"
    ]
  },
  { codigo:"FVS-05", nome:"Tubulação a céu aberto", rev:"00",
    normas:["NBR 5626:2020 - Água fria e água quente","NBR 8160 - Esgoto sanitário","NBR 10844 - Águas pluviais"],
    itens:[
      "Declividade mínima conforme diâmetro e tipo de tubulação",
      "Assentamento sobre berço de areia compactada",
      "Profundidade mínima de cobertura sobre tubulação enterrada",
      "Estanqueidade das juntas testada antes do reaterro",
      "Proteção mecânica antes do reaterro",
      "Caixas de passagem e inspeção niveladas e acessíveis",
      "Diâmetros e materiais conforme projeto hidrossanitário"
    ]
  },
  { codigo:"FVS-06", nome:"Montagem de forma e desforma", rev:"00",
    normas:["NBR 15696:2009 - Fôrmas e escoramentos para estruturas de concreto - Projeto, dimensionamento e procedimentos executivos","NBR 6118:2023 - Projeto de estruturas de concreto - Procedimento"],
    itens:[
      "Estanqueidade e alinhamento das fôrmas conferidos antes da concretagem",
      "Dimensões internas das fôrmas conferidas com projeto estrutural",
      "Limpeza e desmoldante aplicados antes da concretagem",
      "Escoramento dimensionado e travado conforme carga prevista",
      "Prazo mínimo de desforma respeitado conforme resistência do concreto",
      "Retirada das fôrmas sem danos à peça concretada",
      "Superfície do concreto após desforma sem falhas de concretagem (bicheiras/ninhos)"
    ]
  },
  { codigo:"FVS-07", nome:"Montagem de Armadura", rev:"00",
    normas:["NBR 7480:2022 - Aço destinado a armaduras para estruturas de concreto armado - Requisitos","NBR 6118:2023 - Projeto de estruturas de concreto - Procedimento"],
    itens:[
      "Bitola, quantidade e posicionamento das barras conforme projeto estrutural",
      "Cobrimento mínimo da armadura garantido com espaçadores",
      "Emendas e traspasses conforme comprimento especificado",
      "Amarração da armadura firme, sem deslocamentos durante a concretagem",
      "Ausência de corrosão, óleo ou contaminantes nas barras",
      "Espaçamento entre barras respeitando o mínimo normativo",
      "Embutidos e passagens (elétrica/hidráulica) sem interferência na armadura"
    ]
  },
  { codigo:"FVS-08", nome:"Concretagem de Peças Estruturais", rev:"00",
    normas:["NBR 6118:2023 - Projeto de estruturas de concreto - Procedimento","NBR 12655:2022 - Concreto de cimento Portland - Preparo, controle, recebimento e aceitação - Procedimento","NBR 5738:2015 - Concreto - Procedimento para moldagem e cura de corpos de prova","NBR 5739:2018 - Concreto - Ensaio de compressão de corpos de prova cilíndricos"],
    itens:[
      "Nota fiscal/ficha de concreto conferida com especificação de projeto (fck, slump, brita)",
      "Ensaio de abatimento (slump test) realizado no recebimento",
      "Moldagem de corpos de prova para controle de resistência",
      "Lançamento do concreto sem segregação e com altura de queda controlada",
      "Adensamento com vibrador realizado corretamente",
      "Cura do concreto realizada pelo período mínimo especificado",
      "Juntas de concretagem posicionadas e tratadas conforme projeto",
      "Temperatura e condições climáticas de concretagem controladas"
    ]
  },
  { codigo:"FVS-09", nome:"Instalações Elétricas", rev:"00",
    normas:["NBR 5410:2004 - Instalações elétricas de baixa tensão"],
    itens:[
      "Dimensionamento de condutores conforme carga e queda de tensão de projeto",
      "Proteção e seccionamento (disjuntores/DR) conforme projeto",
      "Aterramento executado e continuidade elétrica testada",
      "Eletrodutos e caixas de passagem instalados conforme projeto",
      "Pontos de tomadas e iluminação nas quantidades e posições de projeto",
      "Teste de funcionamento e isolamento dos circuitos antes do fechamento",
      "Quadro de distribuição identificado e com diagrama unifilar disponível"
    ]
  },
  { codigo:"FVS-10", nome:"Instalação Hidráulica", rev:"00",
    normas:["NBR 5626:2020 - Sistemas prediais de água fria e água quente - Projeto, execução, ensaios e manutenção","NBR 8160:1999 - Sistemas prediais de esgoto sanitário - Projeto e execução"],
    itens:[
      "Diâmetros e materiais das tubulações conforme projeto hidrossanitário",
      "Fixação e distância dos pontos conforme projeto",
      "Teste de estanqueidade da água fria/quente antes do fechamento",
      "Declividade e ventilação do sistema de esgoto conforme projeto",
      "Teste de estanqueidade do esgoto e ausência de obstruções",
      "Registros e válvulas instalados e acessíveis",
      "Isolamento térmico da tubulação de água quente conforme especificação"
    ]
  },
  { codigo:"FVS-11", nome:"Infra. Para Ar Condicionado", rev:"00",
    normas:["NBR 16401-1:2024 - Instalações de ar-condicionado - Sistemas centrais e unitários - Parte 1: Projetos das instalações","NBR 16401-3:2008 - Parte 3: Qualidade do ar interior","NBR 7541:2015 - Tubos de cobre sem costura para ar-condicionado e refrigeração"],
    itens:[
      "Dimensionamento de dutos conforme carga térmica e projeto",
      "Infraestrutura de dreno de condensado com caimento adequado",
      "Tubulação frigorígena (linha de cobre) instalada e testada",
      "Infraestrutura elétrica dedicada aos equipamentos conforme projeto",
      "Aberturas e passagens para tomada de ar externo/exaustão conforme projeto",
      "Base/suporte das unidades condensadoras dimensionado e nivelado"
    ]
  },
  { codigo:"FVS-12", nome:"Tubulão (fuste mecanizado, base manual)", rev:"00",
    normas:["NBR 6122:2022 - Projeto e execução de fundações","NBR 16903:2020 - Prova de carga estática em fundação profunda","NR-18 (item 18.7.2) - Segurança e Saúde no Trabalho na Indústria da Construção — Escavações, Fundações e Desmonte de Rochas","NR-33 - Segurança e Saúde nos Trabalhos em Espaços Confinados","Caderno de Encargos SUDECAP - Capítulo 4: Fundações, item 4.5 (Tabela 10 - Tubulão)"],
    itens:[
      "Perfuração do fuste executada mecanicamente (perfuratriz) até a profundidade especificada em projeto, com verticalidade e diâmetro conferidos",
      "Diâmetro do fuste conferido — mínimo de 0,9 m no trecho onde houver entrada do trabalhador para o alargamento da base (NR-18.7.2.17)",
      "Encamisamento do fuste instalado antes da descida do trabalhador para a etapa de alargamento da base, garantindo proteção contra desmoronamento",
      "Liberação de serviço específica emitida pelo responsável técnico para a etapa de alargamento da base, antes de qualquer descida (NR-18.7.2.22.1)",
      "Equipamento de descida/içamento (sarilho) projetado por profissional habilitado, fixado no terreno, com dupla trava de segurança e corda com no mínimo 6 voltas sobre o tambor",
      "Ventilação por insuflação de ar em funcionamento e teste de atmosfera (gases e oxigênio) realizado antes da descida do trabalhador, conforme NR-33",
      "Base alargada executada nas dimensões de projeto, com fundo limpo, e concretagem iniciada em até 24 horas após a conclusão do alargamento",
      "Ensaio de integridade e/ou prova de carga realizados conforme especificado pelo projetista, com resultado aprovado antes da concretagem do bloco de coroamento"
    ]
  },
  { codigo:"FVS-13", nome:"Impermeabilização com Manta Asfáltica", rev:"00",
    normas:["NBR 9575:2010 - Impermeabilização - Seleção e projeto","NBR 9574:2008 - Execução de impermeabilização","NBR 13707:2018 - Manta asfáltica para impermeabilização - Requisitos (verificar edição vigente)"],
    itens:[
      "Substrato regularizado, seco e sem fissuras antes da aplicação",
      "Primer aplicado conforme especificação antes da manta",
      "Sobreposição de emendas conforme especificação mínima",
      "Reforços em pontos singulares (ralos, tubulações, encontros) executados",
      "Teste de estanqueidade (lâmina d'água) realizado antes do contrapiso/proteção",
      "Camada de proteção mecânica executada sobre a manta",
      "Ralos e caimentos finais conferidos após a impermeabilização"
    ]
  },
  { codigo:"FVS-14", nome:"Impermeabilização com Argamassa Polimérica", rev:"00",
    normas:["NBR 9575:2010 - Impermeabilização - Seleção e projeto","NBR 9574:2008 - Execução de impermeabilização","NBR 11905:2015 - Argamassa polimérica industrializada para impermeabilização - Requisitos"],
    itens:[
      "Substrato preparado, regularizado e curado antes da aplicação",
      "Traço e preparo da argamassa polimérica conforme especificação do fabricante",
      "Número de demãos e espessura total conforme especificação",
      "Reforço com tela/manta em pontos críticos (juntas, ralos, encontros)",
      "Cura da argamassa polimérica conforme recomendação do fabricante",
      "Teste de estanqueidade realizado antes da proteção mecânica",
      "Camada de proteção mecânica aplicada sem danificar a impermeabilização"
    ]
  },
  { codigo:"FVS-15", nome:"Alvenaria Estrutural", rev:"00",
    normas:["NBR 16868-1:2020 - Alvenaria estrutural - Parte 1: Projeto","NBR 16868-2:2020 - Parte 2: Execução e controle de obras","NBR 16868-3:2020 - Parte 3: Métodos de ensaio"],
    itens:[
      "Bloco estrutural conforme especificação de resistência e classe de projeto",
      "Modulação e amarração dos blocos conforme projeto de fiadas",
      "Espessura e preenchimento das juntas de argamassa conforme especificação",
      "Grauteamento de furos conforme projeto estrutural",
      "Armadura horizontal e vertical instalada conforme detalhamento",
      "Verificação de esquadro e prumo das paredes estruturais",
      "Vergas, contravergas e reforços em aberturas conforme projeto"
    ]
  },
  { codigo:"FVS-16", nome:"Alvenaria de Vedação", rev:"00",
    normas:["NBR 15270-1:2017 - Componentes cerâmicos - Blocos e tijolos para alvenaria - Parte 1: Requisitos (verificar edição vigente)","NBR 15575-4:2021 - Edificações habitacionais - Desempenho - Parte 4: Sistemas de vedações verticais internas e externas (norma de execução NBR 8545 está cancelada, sem substituta direta confirmada)"],
    itens:[
      "Bloco/tijolo cerâmico conforme especificação dimensional e resistência",
      "Modulação e amarração da alvenaria conforme projeto de paginação",
      "Espessura e preenchimento das juntas de assentamento conforme especificação",
      "Prumo e esquadro das paredes conferidos",
      "Encunhamento entre alvenaria e estrutura executado no prazo especificado",
      "Vergas e contravergas em vãos de portas e janelas conforme especificação",
      "Amarração/tela em encontros com pilares e vigas para evitar fissuras"
    ]
  },
  { codigo:"FVS-17", nome:"Reboco Interno", rev:"00",
    normas:["NBR 13749:2013 - Revestimento de paredes e tetos de argamassas inorgânicas - Especificação","NBR 7200:1998 - Execução de revestimento de paredes e tetos de argamassas inorgânicas - Procedimento"],
    itens:[
      "Chapisco aplicado como base de aderência antes do emboço",
      "Espessura do reboco/emboço conforme especificação",
      "Planeza e prumo da superfície acabada dentro da tolerância",
      "Traço e preparo da argamassa conforme especificação de projeto",
      "Cura do reboco realizada para evitar fissuração",
      "Juntas de trabalho e encontros com outros materiais tratados"
    ]
  },
  { codigo:"FVS-18", nome:"Reboco Externo", rev:"00",
    normas:["NBR 13749:2013 - Revestimento de paredes e tetos de argamassas inorgânicas - Especificação","NBR 7200:1998 - Execução de revestimento de paredes e tetos de argamassas inorgânicas - Procedimento"],
    itens:[
      "Chapisco aplicado como base de aderência em fachada",
      "Espessura do reboco conforme especificação, considerando exposição externa",
      "Juntas de dilatação e trabalho respeitadas na fachada",
      "Planeza e prumo da fachada dentro da tolerância",
      "Proteção contra chuva e insolação direta durante a cura",
      "Caimento e pingadeiras em platibandas e peitoris executados",
      "Acabamento final (textura/desempenado) uniforme"
    ]
  },
  { codigo:"FVS-19", nome:"Execução de Revestimento de Piso Interno: Cerâmica e Porcelanato", rev:"00",
    normas:["NBR 13818/NBR 15463 - Placas cerâmicas","NBR 14081 (partes 1-5) - Argamassa colante"],
    itens:[
      "Planeza e nivelamento do contrapiso antes do assentamento",
      "Tempo em aberto da argamassa colante respeitado",
      "Dupla colagem aplicada em porcelanatos de grande formato",
      "Percentual de argamassa aderida no verso conferido (amostral)",
      "Juntas de assentamento com largura e espaçadores conforme especificação",
      "Juntas de dilatação/movimentação a cada área e junto a paredes",
      "Caimento correto em áreas molhadas para ralos",
      "Ausência de peças soltas (som cavo) antes do rejuntamento"
    ]
  },
  { codigo:"FVS-21", nome:"Pintura e Textura", rev:"00",
    normas:["NBR 15079-1:2025 - Tintas para construção civil - Requisitos de desempenho - Parte 1: Tinta fosca nas cores claras","NBR 15079-2:2025 - Parte 2: Tintas semiacetinada, acetinada e semibrilho nas cores claras (edição de 04/2025; verificar vigência antes de uso formal, pois edições anteriores da NBR 15079 foram canceladas)","NBR 13245:1995 - Execução de pinturas em edificações não industriais - Preparação de superfície (verificar edição vigente)"],
    itens:[
      "Preparo e limpeza da superfície antes da pintura",
      "Umidade da base dentro do limite aceitável para pintura",
      "Fundo preparador/selador aplicado conforme especificação",
      "Número de demãos e diluição conforme especificação do fabricante",
      "Uniformidade de cor, textura e acabamento final",
      "Proteção de esquadrias, pisos e áreas adjacentes durante a pintura",
      "Lote/validade da tinta conferido e produto conforme especificação"
    ]
  },
  { codigo:"FVS-22", nome:"Contrapiso", rev:"00",
    normas:["NBR 13753:1996 - Revestimento de piso interno e/ou externo com placas cerâmicas e com utilização de argamassa colante (referência de execução de contrapiso; verificar edição vigente)","NBR 12655:2022 - Concreto - Preparo, controle e recebimento (aplicável quando contrapiso for em concreto)"],
    itens:[
      "Espessura do contrapiso conforme especificação de projeto",
      "Traço da argamassa e preparo conforme especificação",
      "Nivelamento e caimento conforme especificação (áreas secas e molhadas)",
      "Junta de dilatação/encontro executada conforme especificação",
      "Aderência à base ou desolidarização conforme tipo de contrapiso",
      "Cura do contrapiso realizada pelo período mínimo"
    ]
  },
  { codigo:"FVS-23", nome:"Rejuntamento", rev:"00",
    normas:["NBR 14992:2003 - Argamassa à base de cimento Portland para rejuntamento de placas cerâmicas - Requisitos e métodos de ensaio (verificar edição vigente)"],
    itens:[
      "Tempo de espera após assentamento respeitado antes do rejunte",
      "Tipo de rejunte conforme especificação (largura de junta e ambiente)",
      "Preenchimento completo e uniforme das juntas",
      "Limpeza do excesso de rejunte na superfície das placas",
      "Juntas de movimentação preservadas (não rejuntadas com argamassa rígida)",
      "Cura do rejunte protegida de água e tráfego prematuro"
    ]
  },
  { codigo:"FVS-24", nome:"Esquadria de Madeira", rev:"00",
    normas:["NBR 15930-1:2011 - Portas de madeira para edificações - Parte 1: Terminologia","NBR 15930-2:2011 - Parte 2: Requisitos","NBR 15930-3:2011 - Parte 3: Requisitos adicionais","NBR 15930-4:2011 - Parte 4: Instalação e manutenção"],
    itens:[
      "Dimensões e esquadro da esquadria conforme projeto",
      "Fixação do marco/batente na alvenaria conforme especificação",
      "Funcionamento de dobradiças, fechaduras e ferragens",
      "Acabamento superficial (pintura/verniz) conforme especificação",
      "Requisitos complementares atendidos (acústico/corta-fogo), quando especificados"
    ]
  },
  { codigo:"FVS-25", nome:"Divisórias e Portas de Vidro", rev:"00",
    normas:["NBR 7199:2016 - Aplicações de vidros na construção civil - Requisitos (com emenda vigente a partir de 30/06/2025)"],
    itens:[
      "Espessura e tipo de vidro conforme especificação e aplicação",
      "Fixação e vedação dos painéis conforme especificação",
      "Ferragens (dobradiças, puxadores, molas de piso) instaladas e testadas",
      "Sinalização de segurança em painéis de grande área",
      "Ausência de trincas, lascas ou defeitos aparentes após instalação"
    ]
  },
  { codigo:"FVS-26", nome:"Execução de Instalação de Esquadria de Alumínio", rev:"01",
    normas:["NBR 10821-1:2017 - Esquadrias para edificações - Parte 1: Terminologia","NBR 10821-2:2017 - Parte 2: Requisitos e classificação","NBR 10821-4:2017 - Parte 4: Requisitos de desempenho adicionais e instalação","NBR 10821-5:2017 - Parte 5: Manutenção e desempenho acústico"],
    itens:[
      "Dimensões e esquadro do vão e da esquadria conferidos",
      "Fixação da esquadria ao vão conforme especificação",
      "Estanqueidade à água e permeabilidade ao ar conforme classificação de projeto",
      "Funcionamento de folhas móveis e ferragens",
      "Vidro e acabamento da esquadria conforme especificação",
      "Requisitos de segurança (guarda-corpo/queda) atendidos quando aplicável"
    ]
  },
  { codigo:"FVS-27", nome:"Colocação de Contramarco", rev:"00",
    normas:["NBR 10821-4:2017 - Esquadrias para edificações - Parte 4: Requisitos de desempenho adicionais e instalação (referência de instalação; não há norma específica exclusiva para contramarco confirmada)"],
    itens:[
      "Prumo, nível e esquadro do contramarco conferidos antes da fixação",
      "Fixação do contramarco à alvenaria/estrutura conforme especificação",
      "Vedação entre contramarco e alvenaria executada",
      "Dimensões internas do contramarco compatíveis com a esquadria a instalar"
    ]
  },
  { codigo:"FVS-28", nome:"Fachada Aerada", rev:"00",
    normas:["Sem norma ABNT específica confirmada para fachada ventilada/aerada em geral — prática de mercado/fabricante do sistema (verificar antes de uso formal)","Correlato: NBR 15575-4:2021 - Desempenho de edificações habitacionais - Sistemas de vedações verticais"],
    itens:[
      "Estrutura de fixação (perfis/mísulas) nivelada e ancorada // verificar",
      "Câmara de ar ventilada com dimensão conforme projeto do sistema // verificar",
      "Painéis de revestimento fixados sem folga excessiva // verificar",
      "Estanqueidade e remates (encontros, cantos, platibandas) tratados // verificar"
    ]
  },
  { codigo:"FVS-30", nome:"Revestimento Interno em Gesso", rev:"00",
    normas:["NBR 13867:1997 - Revestimento interno de paredes e tetos com pasta de gesso - Materiais, preparo, aplicação e acabamento (norma cancelada, sem substituta direta claramente identificada nesta pesquisa — verificar edição vigente antes de uso formal)"],
    itens:[
      "Superfície base preparada antes da aplicação do gesso",
      "Espessura da camada de gesso conforme especificação",
      "Planeza, esquadro e prumo da superfície acabada",
      "Preparo e tempo de utilização da pasta de gesso respeitados",
      "Acabamento final liso e pronto para pintura"
    ]
  },
  { codigo:"FVS-31", nome:"Forro de Gesso Acartonado", rev:"00",
    normas:["NBR 15758-2:2009 - Sistemas construtivos em chapas de gesso para drywall - Parte 2: Requisitos para sistemas usados como forros (norma cancelada em 09/2025, revisão em consulta nacional — verificar edição vigente)","NBR 14715-1:2021 - Chapas de gesso para drywall - Requisitos"],
    itens:[
      "Nível da estrutura metálica (perfis) conferido antes da fixação das chapas",
      "Fixação das chapas de gesso conforme especificação",
      "Tratamento de juntas (fita e massa) conforme especificação",
      "Recortes para luminárias, difusores e passagens conferidos",
      "Nível final do forro conferido em toda a área"
    ]
  },
  { codigo:"FVS-32", nome:"Forro de Gesso em Placas", rev:"00",
    normas:["NBR 16382:2015 - Placas de gesso para forro - Requisitos","NBR 16591:2017 - Execução de forro autoportante com placas de gesso - Procedimento"],
    itens:[
      "Estrutura de sustentação (arames/tirantes) nivelada e firme",
      "Encaixe e alinhamento das placas de gesso",
      "Tratamento de juntas com massa e fita",
      "Recortes para luminárias e pontos de instalação conferidos",
      "Nível final do forro e platibandas/sancas conferidos"
    ]
  },
  { codigo:"FVS-33", nome:"Shaft Drywall", rev:"00",
    normas:["NBR 15758-1:2009 - Sistemas construtivos em chapas de gesso para drywall - Parte 1: Requisitos para sistemas usados como paredes (norma cancelada em 09/2025, revisão em consulta nacional — verificar edição vigente)","NBR 14715-1:2021 - Chapas de gesso para drywall - Requisitos"],
    itens:[
      "Estrutura metálica (guias e montantes) fixada e nivelada",
      "Chapas resistentes ao fogo/umidade utilizadas conforme exigência",
      "Vedação de passagens de tubulações/instalações no shaft",
      "Acabamento das juntas e fixação final das chapas",
      "Isolamento acústico e estanqueidade do shaft conforme projeto"
    ]
  },
  { codigo:"FVS-34", nome:"Assentamento de Peitoris e Soleiras", rev:"01",
    normas:["Sem norma ABNT específica confirmada para assentamento de peitoris e soleiras — prática de mercado/fabricante (verificar antes de uso formal)","Correlato: NBR 13755:2017 - Revestimentos cerâmicos de fachadas e paredes externas com utilização de argamassa colante (quando o material da peça for cerâmico/porcelanato)"],
    itens:[
      "Caimento do peitoril para fora, evitando infiltração // verificar",
      "Nivelamento e assentamento firme da soleira // verificar",
      "Dimensões e balanço da peça conforme especificação // verificar",
      "Vedação e rejunte das bordas da peça // verificar"
    ]
  },
  { codigo:"FVS-35", nome:"Instalação de Gás", rev:"00",
    normas:["NBR 15526:2016 - Redes de distribuição interna para gases combustíveis em instalações residenciais e comerciais - Projeto e execução","NBR 13103 - Aparelhos a gás para uso residencial - Instalação (verificar edição vigente)"],
    itens:[
      "Traçado e diâmetro da tubulação conforme projeto e memorial de cálculo",
      "Teste de estanqueidade da rede antes da entrada em operação",
      "Ventilação do ambiente onde há aparelhos a gás conforme especificação",
      "Registros e conexões instalados conforme especificação",
      "Central de GLP/medição e proteções instaladas conforme projeto",
      "Documentação técnica (ART/memorial) disponível para liberação"
    ]
  },
  { codigo:"FVS-36", nome:"Colocação de Guarda Corpo e Corrimão", rev:"00",
    normas:["NBR 14718 - Guarda-corpos para edificação (verificar edição vigente)"],
    itens:[
      "Altura do guarda-corpo conforme mínimo normativo",
      "Vãos entre elementos verticais dentro do limite admissível",
      "Resistência estrutural do guarda-corpo (fixação e ancoragem)",
      "Corrimão contínuo e com dimensão de empunhadura adequada",
      "Material e acabamento sem riscos de corte ou ferimento"
    ]
  },
  { codigo:"FVS-37", nome:"Colocação de Bancadas", rev:"00",
    normas:["Sem norma ABNT específica confirmada para colocação de bancadas — prática de mercado/fabricante do material (granito, mármore, quartzo) (verificar antes de uso formal)","Correlato: NBR 15575-3:2021 - Desempenho de edificações habitacionais - Sistemas de pisos"],
    itens:[
      "Nivelamento e prumo da bancada conferidos // verificar",
      "Fixação e apoio estrutural adequados ao peso da peça // verificar",
      "Recortes para cuba, cooktop e torneira conferidos com os equipamentos // verificar",
      "Emendas entre módulos executadas com alinhamento e vedação // verificar",
      "Ausência de trincas, manchas ou defeitos aparentes na peça // verificar"
    ]
  },
  { codigo:"FVS-37", nome:"Colocação de Bancadas", rev:"01",
    normas:["Sem norma ABNT específica confirmada para colocação de bancadas — prática de mercado/fabricante do material (granito, mármore, quartzo) (verificar antes de uso formal)","Correlato: NBR 15575-3:2021 - Desempenho de edificações habitacionais - Sistemas de pisos"],
    itens:[
      "Nivelamento e prumo da bancada conferidos // verificar",
      "Fixação e apoio estrutural adequados ao peso da peça // verificar",
      "Recortes para cuba, cooktop e torneira conferidos com os equipamentos // verificar",
      "Emendas entre módulos executadas com alinhamento e vedação // verificar",
      "Ausência de trincas, manchas ou defeitos aparentes na peça // verificar"
    ]
  },
  { codigo:"FVS-39", nome:"Nicho", rev:"00",
    normas:["Sem norma ABNT específica confirmada para execução de nichos — prática de mercado/fabricante (verificar antes de uso formal)","Correlato: NBR 9575:2010 - Impermeabilização - Seleção e projeto (quando o nicho estiver em área molhada e exigir impermeabilização)"],
    itens:[
      "Dimensões e posição do nicho conforme projeto // verificar",
      "Impermeabilização do nicho em área molhada // verificar",
      "Caimento do fundo do nicho evitando acúmulo de água // verificar",
      "Revestimento interno do nicho alinhado com o revestimento do ambiente // verificar"
    ]
  },
  { codigo:"FVS-40", nome:"Piso vinílico", rev:"00",
    normas:["NBR 14917-1:2017 - Revestimentos resilientes para pisos - Manta e placa vinílica flexível homogênea ou heterogênea em PVC - Parte 1: Requisitos","NBR 14917-2:2022 - Parte 2: Procedimentos (instalação)"],
    itens:[
      "Nivelamento e planeza do substrato antes da instalação",
      "Aclimatação do material antes da instalação",
      "Aplicação do adesivo conforme especificação do fabricante",
      "Emendas e juntas tratadas conforme especificação",
      "Ausência de bolhas, ondulações ou descolamento após instalação",
      "Acabamento em soleiras, ralos e transições de piso"
    ]
  },
  { codigo:"FVS-41", nome:"Instalação de Louças e Metais", rev:"00",
    normas:["NBR 15097-1:2011 - Aparelhos sanitários de material cerâmico - Parte 1: Requisitos e métodos de ensaio","NBR 15097-2:2011 - Parte 2: Procedimento para instalação","NBR 10281:2015 - Torneiras - Requisitos e métodos de ensaio","NBR 16749:2016 - Aparelhos sanitários - Misturadores - Requisitos e métodos de ensaio"],
    itens:[
      "Fixação da bacia sanitária/lavatório firme e nivelada",
      "Vedação entre louça e tubulação sem vazamentos",
      "Funcionamento da caixa acoplada/válvula de descarga testado",
      "Metais (torneiras, registros, misturadores) instalados e testados",
      "Alinhamento e nivelamento das peças com o revestimento do ambiente",
      "Limpeza e proteção das peças até a entrega"
    ]
  },
  { codigo:"FVS-41", nome:"Instalação de Rodapés", rev:"00",
    normas:["Sem norma ABNT específica de execução de rodapés identificada nesta pesquisa — prática de mercado/fabricante (verificar antes de uso formal)","Correlato: NBR 15575-3:2021 - Desempenho de edificações habitacionais - Sistemas de pisos"],
    itens:[
      "Nivelamento e alinhamento do rodapé com o piso",
      "Fixação firme sem folgas ou som cavo",
      "Encontros e cantos (internos/externos) bem acabados",
      "Rejunte/silicone aplicado entre rodapé e piso/parede"
    ]
  },
  { codigo:"FVS-42", nome:"Instalação de Torneiras", rev:"00",
    normas:["Sem norma ABNT específica confirmada para o serviço de instalação de torneiras (como produto específico) — prática de mercado/fabricante (verificar antes de uso formal)","Correlato: NBR 10281:2015 - Torneiras - Requisitos e métodos de ensaio (norma de produto, não de instalação)"],
    itens:[
      "Vedação da conexão com a tubulação sem vazamentos // verificar",
      "Fixação e alinhamento da torneira // verificar",
      "Funcionamento e vazão testados // verificar",
      "Acabamento e limpeza da torneira instalada // verificar"
    ]
  },
  { codigo:"FVS-43", nome:"Exaustões Mecânicas", rev:"00",
    normas:["Sem norma ABNT específica confirmada para exaustão mecânica residencial simples — prática de mercado/fabricante (verificar antes de uso formal)","Correlato: NBR 16401-3:2008 - Instalações de ar-condicionado - Sistemas centrais e unitários - Parte 3: Qualidade do ar interior (quando integrada a sistema de climatização)"],
    itens:[
      "Dimensionamento do duto e exaustor conforme ambiente // verificar",
      "Saída de exaustão para o exterior sem retorno de ar/odores // verificar",
      "Fixação e nivelamento do exaustor // verificar",
      "Funcionamento testado antes da entrega // verificar"
    ]
  }
];
window.FVS_CATALOGO = FVS_CATALOGO;
