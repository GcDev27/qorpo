// Todo o conteúdo do site fica aqui. Para atualizar, edite só este arquivo.
// Campos com [colchetes] ainda precisam ser preenchidos com os dados reais do estúdio.

const ESTUDIO = {
  nome: "Qorpo",
  nomeCompleto: "Estúdio Qorpo",
  frase: "Tatuagem autoral em Fortaleza",
  sobre:
    "Um estúdio de tatuadores com estilos diferentes e um cuidado só: transformar a sua ideia em arte que acompanha o seu corpo para sempre. Atendimento com hora marcada, material descartável e ambiente pensado para você ficar à vontade.",
  instagram: "estudioqorpo",
  // WhatsApp geral do estúdio, só números com DDI e DDD. Ex.: 5585999998888
  whatsapp: "[55859XXXXXXXX]",
  endereco: "[Rua, número, bairro], Fortaleza - CE",
  linkMapa: "https://www.google.com/maps/search/?api=1&query=Est%C3%BAdio%20Qorpo%20Fortaleza",
  horarios: [
    ["Segunda a sexta", "[10h às 19h]"],
    ["Sábado", "[10h às 16h]"],
    ["Domingo", "Fechado"],
  ],
};

// Os tatuadores vêm de conteudo/tatuadores/ (veja gerar-artistas.py e artistas.js).

// Opções do formulário de orçamento
const TAMANHOS = ["Até 5 cm", "5 a 10 cm", "10 a 20 cm", "Maior que 20 cm", "Fechamento (braço, perna, costas)"];
const LOCAIS = ["Braço", "Antebraço", "Mão", "Perna", "Costela", "Costas", "Peito", "Pescoço", "Outro"];

const CUIDADOS = [
  ["Nas primeiras horas", "Mantenha o filme plástico pelo tempo que o tatuador indicar. Depois, lave com água e sabonete neutro, sem esfregar."],
  ["Hidratação", "Aplique uma camada fina da pomada indicada de 2 a 3 vezes por dia, sempre com as mãos limpas."],
  ["Por 15 dias, evite", "Sol, piscina, mar, sauna e academia pesada na região. Não coce nem arranque as casquinhas."],
  ["Depois de cicatrizada", "Use protetor solar sempre que a tatuagem ficar exposta: é o que mantém as cores e o traço vivos."],
];

const PERGUNTAS = [
  ["Quanto custa uma tatuagem?", "Depende do tamanho, do local e do nível de detalhe. Mande sua ideia pelo formulário e o tatuador responde com o orçamento pelo WhatsApp."],
  ["Preciso pagar sinal para agendar?", "[Sim. Cobramos um sinal para reservar o horário, abatido do valor final.]"],
  ["Posso levar minha própria referência?", "Pode e deve! Mande fotos de referência quando falar com o tatuador. Ele adapta a ideia ao seu corpo e ao estilo dele."],
  ["Dói muito?", "Varia de pessoa para pessoa e de região para região. Costela, pés e mãos costumam doer mais; braço e antebraço, menos. O tatuador te orienta."],
  ["Atendem menores de idade?", "[Somente maiores de 18 anos, com documento com foto.]"],
];
