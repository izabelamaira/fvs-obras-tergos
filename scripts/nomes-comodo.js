// Lista de nomes de cômodo válidos (whitelist), usada pela importação inteligente
// de projeto (DXF) para decidir o que É um ambiente de verdade, e não texto solto
// (cotas, notas, títulos). Termos em minúsculo, sem acento — a comparação já
// normaliza o texto lido do arquivo antes de comparar.
window.NOMES_COMODO = [
  "sala", "sala de estar", "sala de jantar", "sala de tv", "sala intima", "sala de estar/jantar",
  "living",
  "quarto", "dormitorio", "suite", "suite master", "master",
  "banheiro", "lavabo", "wc", "banho",
  "cozinha", "copa",
  "area de servico", "lavanderia",
  "varanda", "sacada", "terraco", "gourmet",
  "closet", "vestiario",
  "escritorio", "home office", "estudio",
  "despensa", "dml", "deposito",
  "garagem", "vaga",
  "mezanino", "sotao",
  "piscina", "churrasqueira", "edicula",
  "hall intimo", "hall social"
];
