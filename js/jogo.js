// Declaração das variáveis
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
  jogar = true;

  // Reseta as cartas e imagens
  jogarNovamente();

  // Atualiza o placar com valores zerados
  atualizaPlacar(0, 0);

  // Mostra botão "Jogar Novamente"
  btnJogarNovamente.className = 'visivel';

  // Esconde o botão "Reiniciar"
  btnReiniciar.className = 'invisivel';
}

// Função para preparar o jogo para jogar novamente (sem resetar tudo)
function jogarNovamente() {
  jogar = true; // Deixa jogar novamente

  // Captura todas as divs da página
  let divis = document.getElementsByTagName("div");

  // Percorre cada div
  for (let i = 0; i < divis.length; i++) {
    // Se for uma das cartas com ID de 0 a 4
    if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3 || divis[i].id == 4 || divis[i].id == 5) {
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

// Função que atualiza o placar com base em acertos e tentativas
function atualizaPlacar(acertos, tentativas) {

  desempenho = (acertos / tentativas) * 100;

  // Atualiza o texto do placar na tela
  document.getElementById("resposta").innerHTML =
    "Placar - Acertos: " + acertos +
    " Tentativas: " + tentativas +
    " Desempenho: " + Math.round(desempenho) + "%";
}

// Função executada quando o jogador acerta
function acertou(obj) {
  // Aplica estilo de acerto à carta clicada
  obj.className = "acertou";

  // Cria a imagem de acerto e coloca na carta selecionada
  const img = new Image(100);
  img.id = "imagem";
  img.src = "../imagem/acertou.jpg"; //https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg <-- Antigo Smile
  obj.appendChild(img);
}

// Função executada quando o jogador erra
function errou(obj) {
  // Aplica estilo de erro à carta clicada
  obj.className = "errou";

  // Cria a imagem de erro e coloca na carta selecionada
  const img = new Image(100);
  img.id = "errou";
  img.src = "../imagem/errou.jpg"; // imagem funcional
  obj.appendChild(img);
}

// Função principal chamada ao clicar em uma carta
function verifica(obj) {
  // Verifica se ainda pode jogar
  if (jogar) {
    jogar = false; // Bloqueia jogadas até reiniciar
    tentativas++;  // Soma mais uma tentativa

    // Se já fez 15 tentativas, oculta o "Jogar Novamente" e mostra o "Reiniciar"
    if (tentativas == 15) {
      btnJogarNovamente.className = 'invisivel'; // esconde botão jogar novamente
      btnReiniciar.className = 'visivel';        // mostra botão reiniciar
    }

    // Sorteia um número de 0 a 5 (6 cartas possíveis)
    let sorteado = Math.floor(Math.random() * 6);

    // Se o ID da carta clicada for o mesmo do sorteado
    if (parseInt(obj.id) === sorteado) {
      acertou(obj); // Mostra a imagem de acerto
      acertos++;    // Soma aos acertos
    } else {
      errou(obj); // Mostra a imagem de erro na carta clicada errada
      const objSorteado = document.getElementById(sorteado);
      acertou(objSorteado); // Mostra a imagem de acerto na carta correta
    }

    // Atualiza o placar após a jogada
    atualizaPlacar(acertos, tentativas);

  } else {
    // Se tentar jogar sem clicar em "Jogar Novamente"
    alert('Clique em "Jogar novamente"');
  }
}

// Adiciona os eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
