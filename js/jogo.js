// Declaração das variáveis globais
let desempenho = 0;   
let tentativas = 0;   
let acertos = 0;      
let jogar = true;     

// Captura os botões do HTML pelos IDs
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função que reinicia completamente o jogo
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;

  // Reseta as cartas e imagens, e libera jogada
  jogarNovamente();

  // Atualiza o placar com valores zerados
  atualizaPlacar();

  // Mostra botão "Jogar Novamente"
  btnJogarNovamente.className = 'visivel';

  // Esconde o botão "Reiniciar"
  btnReiniciar.className = 'invisivel';
}

// Função para preparar o jogo para jogar novamente (sem resetar tudo)
function jogarNovamente() {
  jogar = true; // Libera jogadas

  // Captura todas as divs da página
  let divis = document.getElementsByTagName("div");
  const idsValidos = new Set(['0', '1', '2', '3', '4', '5']);

  // Percorre cada div
  for (let i = 0; i < divis.length; i++) {
    if (idsValidos.has(divis[i].id)) {
      // Restaura o estilo padrão
      divis[i].className = "inicial";

      // Remove imagem de acerto anterior (caso exista)
      const imagem = divis[i].querySelector("#imagem");
      if (imagem) imagem.remove();

      // Remove imagem de erro anterior (caso exista)
      const erro = divis[i].querySelector("#errou");
      if (erro) erro.remove();
    }
  }
}

// Atualiza o placar com base nas variáveis globais
function atualizaPlacar() {
  desempenho = (acertos / tentativas) * 100;

  document.getElementById("resposta").innerHTML =
    "Placar - Acertos: " + acertos +
    " Tentativas: " + tentativas +
    " Desempenho: " + Math.round(desempenho) + "%";
}

// Função executada quando o jogador acerta
function acertou(obj) {
  obj.className = "acertou";
  const img = new Image(100);
  img.id = "imagem";
  img.src = "https://i.pinimg.com/736x/be/eb/a1/beeba17d3889abdd612c7d20bad1a101.jpg";
  obj.appendChild(img);
}

// Função executada quando o jogador erra
function errou(obj) {
  obj.className = "errou";
  const img = new Image(100);
  img.id = "errou";
  img.src = "https://i.pinimg.com/736x/55/b8/79/55b8794fede37e046b03d26d580eca2d.jpg";
  obj.appendChild(img);
}

// Função principal chamada ao clicar em uma carta
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;

    // Oculta/mostra botões após 15 tentativas
    if (tentativas === 15) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }

    // Sorteia número de 0 a 5
    let sorteado = Math.floor(Math.random() * 6);

    if (parseInt(obj.id) === sorteado) {
      acertou(obj);
      acertos++;
    } else {
      errou(obj);
      const objSorteado = document.getElementById(sorteado);
      acertou(objSorteado);
    }

    atualizaPlacar();

  } else {
    alert('Clique em "Jogar novamente"');
  }
}

// Adiciona os eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
