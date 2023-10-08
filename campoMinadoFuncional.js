let matriz;
//Função que gera matriz através do mapeamento da lista usando a bibiloteca Array e a função map,para gerar listas através de uma função que foi solicitada para os itens do array;
//Na função gera matriz new Array(linhas).fill(0),irá gerar uma lista [0,0,0,0] => a quantidade de itens depende do parâmetros "linhas",logo depois,a partir do .map((itemDoArray) => itemDoArray = Array(colunas).fill(0)),cada item da lista gerada,recebe a função de criar uma nova lista com a quantidade de itens definida pelo parâmetro 'colunas',e todos os itens da lista serão preenchidos por 0 por causa do .fill(0);
function geraMatriz(l,c){
   matriz = new Array(l).fill(0).map((itemDoArray) => itemDoArray = Array(c).fill(0));
 }
function gerarTabuleiro(l, c) { //A função gerarTabuleiro recebe dois parâmetros: linhas e colunas, que indicam o número de linhas e colunas que a tabela deve ter

    geraMatriz(l, c)//a constante matriz recebe a função chamada geraMatriz para criar uma matriz com o número especificado de linhas e colunas 
    
    const tabuleiro = document.querySelector('.tabuleiro');//A constante tabela recebe um elemento HTML no documento com o ID 'tabuleito' usando document.querySelector('tabuleiro')
    
    const tabuleiroHTML = matriz.map((linha) => {
    
    const colunasHTML = linha.map(() => "<td class='blocked'></td>").join('');// a função começa a construir a representação HTML da tabela usando a matriz criada anteriormente.Isso é feito usando a função map para iterar sobre cada linha da matriz e ,para cada linha da matriz, a função map é usada novamente para criar uma representação HTML das células da tabela. Neste caso, cada célula é representada como um elemento <td> (célula de tabela) com a classe 'bloqueado'(A classe 'bloqueado' pode ser usada para aplicar estilos CSS ou para identificar células de alguma maneira especial posteriormente).As células da linha são então unidas em uma única string usando join(''), criando assim uma representação HTML da linha completa
    
    return `<tr>${colunasHTML}</tr>`;
    
    }).join('');
    
    tabuleiro.innerHTML = tabuleiroHTML;// a representação HTML da tabela é inserida no elemento com o ID 'tabuleiro' no documento HTML usando tabuleiro.innerHTML = tabuleiroHTML,substituindo qualquer conteúdo existente dentro desse elemento pelo novo conteúdo ddo tabuleiro criado
    
    }

// A função gerarBombas retorna os locais contendos as bombas, atráves de outras 3 funções internas.Onde a função indice gera índices aleatórios (linha e coluna) ; a função localdabomba recebe uma matriz de entrada, gera índices aleatórios usando índices() e então define o valor na posição correspondente na grade como -1 , retornando a matriz atualizada. O código começa matrizbomba como um array preenchido com valores nulos com comprimento igual ao número de bombas.Depois,ele usa o Array.reduce() para iterar sobre esse array e chama repetidamente a função localdabomba() para colocar bombas em posições aleatórias na grade. O resultado é uma grade (matrizbomba) com bombas distribuídas aleatoriamente.
function gerarBombas(l,c,bombas) {
  const indices = () => [
     Math.floor(Math.random() * l),
     Math.floor(Math.random() * c),
   ];
   const localdabomba = (matriz) => {
     const [linha, coluna] = indices();
     matriz[linha][coluna] = -1;
     return matriz;
   };
   const matrizbomba = Array(bombas).fill(null).reduce(localdabomba, matriz);
 return matrizbomba;
 }

 
 function gerarnumero1(l, c) { //Os parâmetros l e c representam, respectivamente, linhas e colunas da matriz que está sendo manipulada
   const count = matriz.slice(l - 1, l + 2).map(linha => linha.slice(c - 1, c + 2)).flat().filter(cell => cell === -1).length //A execução funciona da seguinte maneira: seleção de linhas, cruzamento dessas linhas selecionadas com as colunas. flat() vai transformar a matriz bidimensional em unidimensional
   
   matriz[l][c] = count; //Posterior ao passo acima, length vai atribuir o valor a count, e count será atribuido na posição de linhas(l) e colunas(c) na matriz
 }
 
 function gerarnumero2() { //A função servirá para dar contunuidade a matriz feita na função "gerarnumero1"
   matriz.map((linha, i) => {
     linha.map((cell, j) => {
       if (cell !== -1) { //O cáculo será feito para os elementos que sejam diferentes de -1, que é uma lógica definida anteriormente em "gerarnumero1"
         gerarnumero1(i, j) //"gerarnumero2" servirá para fazer a iteração com "gerarnumero1" e processar todos os elementos que não sejam -1
       }
     })
   })
}
function bandeira(event) { //Esta função é usada para alternar entre os estados de uma célula no jogo e é chamada quando um evento de clique ocorre em uma célula.
      const cell = event.target; // Essa const recebe a célula que foi clicada usando `event.target`(o comando ".target" acessa o alvo em um evento que aconteceu em um elemento HTML,como clique de um mouse)
      if (cell.className === "blocked") {
          cell.className = "flag"; //Se a célula estiver bloqueada, a função altera a classe da célula para "flag",ou seja,indica que a célula agora está sinalizada com uma bandeira.
          cell.innerHTML = "&#128681;"; //Essa linha de código adiciona o código HTML da bandeira (um emoji de bandeira) à célula.
      } else if (cell.className === "flag") {
          cell.className = "blocked"; //Aqui trata-se de outra condicional em que se a célula não estiver bloqueada, a função verifica se a classe da célula é "flag". Se for, isso significa que a célula está sinalizada com uma bandeira.E,caso a célula estiver sinalizada com uma bandeira, a função altera a classe da célula de volta para "blocked".
          cell.innerHTML = ""; //Nessa linha,a função remove o código HTML da bandeira da célula.
      }
      return false;
  } //E,por fim, a função retorna `false` para evitar que o evento de clique seja propagado para outros elementos.

function init() { //Esta função se classifica como a principal função que inicializa o jogo,ditando a dificuldade do mesmo

tabuleiro = document.querySelector(".tabuleiro") //Essa função recebe a referência para o elemento HTML "tabuleiro",o qual será alterado de acordo com a dificuldade selecionada na tela inicial

tabuleiro.onclick = verificar; //Define a função "verificar" para ser chamada quando o tabuleiro for clicado tabela.oncontextmenu = bandeira; //Define a função "bandeira" para ser chamada quando o botão direito do mouse for clicado no tabuleiro

tabuleiro.oncontextmenu = bandeira;//Chama a função bandeira pelo click direito do

const diff = document.getElementById("dificuldade"); //Essa const recebe a referência do elemento HTML com ID "dificuldade"
const selecionarDiff = parseInt(diff.value); //Essa const vai receber o valor selecionado no elemento HTML e convertê-lo em número inteiro(Ex.:1,2,3...,neste jogo,foram utilizados 0=nível fácil,1=nível intermediário e 2=nível difícil) por meio da função pré definida "parseInt"

if (selecionarDiff==0) {//Com base na dificuldade selecionada,são criados tabuleiros de tamanhos de colunas e linhas diferentes e com mais ou menos bombas,neste caso,SE a dificuldade selecionada for fácil,será gerado um tabuleiro com 9 linhas,9 colunas e 10 bombas espalhadas por ele.
const linhas = 9;

const colunas = 9;

const bombas = 10;
gerarTabuleiro(linhas, colunas);
gerarBombas(linhas, colunas,bombas);
gerarnumero2(linhas,colunas);
mostrarBombas()
setTimeout(mostrarBombasTemporariamente,1000)
} else if (selecionarDiff==1) { //SE a dificuldade selecionada for intermediária,será gerado um tabuleiro com 16 linhas,16 colunas e 40 bombas espalhadas pelo campo.

const linhas = 16; 

const colunas = 16;

const bombas = 40;
gerarTabuleiro(linhas, colunas);
gerarBombas(linhas, colunas,bombas);
gerarnumero2(linhas,colunas);
mostrarBombas()
setTimeout(mostrarBombasTemporariamente,1000)  
} else { // Já,se,a dificuldade selecionada for difícil,será gerado um tabuleiro com 16 linhas,30 colunas e 99 bombas

const linhas = 16;

const colunas = 30;

const bombas = 99; 
gerarTabuleiro(linhas, colunas);
gerarBombas(linhas, colunas,bombas);
gerarnumero2(linhas,colunas);
mostrarBombas()
setTimeout(mostrarBombasTemporariamente,1000)
}
}


//A Função limparCelulas serve para analisar os arrays que não são bombas,e dar características para os itens do array,de acordo com valor que o item em determinado índice tem,para isso é preciso dar dois parâmetros para a função que irá receber os parâmetros de linhas e colunas (respectivamente l,c) 
function limparCelulas(l, c) {
  //A const limparCelula serve para analisar se os índices recebidos estão dentro dos limites de linhas e colunas,
 const limparCelula = (indiceLin,indiceCol) => {
  const linhas = matriz.length;
  const colunas = matriz[0].length;
    if (indiceLin >= 0 && indiceLin < linhas && indiceCol >= 0 && indiceCol < colunas) {
      const cell = tabuleiro.rows[indiceLin].cells[indiceCol];
      //Este if abaixo irá analisar se o item do array que está sendo analisado possui a classe "blank"para aí entrar nos próximos ifs.

      if (cell.className !== "blank") {
        //O if abaixo analisa se o valor do item dado pelo array em determinados índices é igual a -1,se for igual a -1 quer dizer que é a bomba,ou seja,n precisa retornar nada,outra função que irá fazer o trabalho de acabar o jogo decretando o jogador como perdedor caso o array nestes índices seja clickado;
        if (matriz[indiceLin][indiceCol] == -1) {
            return 0;
        }
        //O if abaixo analisa se o valor do item dado pelo array em determinados índices é igual a 0,se for igual a 0,ele acessa ao html,dando um valor vazio,e também adicionando a classe "blank",além disso ele chama o limparCelulas de forma recursiva,pois,quando o valor do quadrado do campo minado é 0,tem o efeito de limpar as células ao redor que não são bombas,assim quando chama a função novamente,ela não irá entrar nos ifs e irá para a função limpar vizinhos;
        else if(matriz[indiceLin][indiceCol] == 0){
            cell.innerHTML = "";
            cell.className = "blank";
            return limparCelulas(indiceLin, indiceCol);
        }
        //O else abaixo analisa o  valor do item dado pelo array em determinados índices,caso o valor sena  diferente de 0 ou de -1 ele irá retornar para o html o número do item,e dará uma classe para o item de acordo com o número que ele irá retornar quando for clickado;
         else{
            cell.innerHTML = matriz[indiceLin][indiceCol];
            cell.className = "n" + matriz[indiceLin][indiceCol];
        }
        }
        }
      }
//A função limparVizinhos abaixo,será acessada quando o valor do item dos arrays for 0,e ela serve para analisar os arredores do item,ela chama a função limparCelula analisando o valor delas,e armazenando dentro de um array para conseguir limpar no click todas de uma vez,a depender do valor o item será limpo,isso acontece de maneira recursiva,até que encontre itens com valores diferentes de 0,ai o limparVizinhos é "barrado";
 const limparVizinhos = (indiceLin, indiceCol) => [
    limparCelula(indiceLin - 1, indiceCol - 1),
    limparCelula(indiceLin - 1, indiceCol),
    limparCelula(indiceLin - 1, indiceCol + 1),
    limparCelula(indiceLin, indiceCol - 1),
    limparCelula(indiceLin, indiceCol + 1),
    limparCelula(indiceLin, indiceCol),
    limparCelula(indiceLin + 1, indiceCol - 1),
    limparCelula(indiceLin + 1, indiceCol),
    limparCelula(indiceLin + 1, indiceCol + 1),
 ];
//O return retorna um array com as células limpas,que tem o valor do item do array igual a 0,assim fazendo a mecânica de no click em uma célula que seja com arredores de 0,todas as células sejam limpas no click;
 return limparVizinhos(l, c).map(limparCelula => limparCelula);
}
 

// Essa função serve para mostrar aonde as bombas ficaram posicionadas.Essa função percorre cada célula da matriz ''matriz'' e, se encontrar uma célula com o valor -1 (indicando uma bomba), ela atualiza o conteúdo HTML dessa célula para mostrar um ícone de bomba e define a classe da célula como "blank".

function mostrarBombas() {
  matriz.map((linha, i) =>
    linha.map((celula, j) => {
      if (celula === -1) {
        const local = tabuleiro.rows[i].cells[j];
        local.innerHTML = "&#128163;";
        local.className = "blank"; }
      })
  );}

  //A função verificar vai servir para verificar o click do usuário,e dar uma função dependendo de onde for o click do jogador,ela recebe como parâmetro o evento que acontece na tela;
function verificar(event) {
  //A const cell recebe o target do evento,ou seja onde o click do usuário foi,em que alvo foi o click;
  const cell = event.target;
  //O if abaixo analisa se o alvo clickado tem a classe "flag",se tiver essa classe,não entra no if,e o click não irá afetar em nada; 
  if (cell.className !== "flag") {
      const linha = cell.parentNode.rowIndex;//Recebe o índice do elemento "pai"da célula clickada,ou seja,pega o índice da linha do array no click,pega o índice do <td>;
      const coluna = cell.cellIndex;//Recebe o índice exato da célula clickada,no caso a coluna,que é a que está na parte de "dentro",o <tr>;
      //Caso entre no if acima,o if abaixo irá analisar através do valor matriz[linha][coluna],se for igual a -1,é a bomba,ou seja,vai mostrar as outras bombas,dar um background vermelho para os quadrados das bombas,n receberá nada nos clicks,e irá chamar a função tenteNovamente()
       if (matriz[linha][coluna]== -1) {
              mostrarBombas();
              cell.style.backgroundColor = "red";
              tabuleiro.onclick = undefined;
              tabuleiro.oncontextmenu = undefined;
              tenteNovamente();
              }
          //Caso o valor de matriz[linha][coluna] seja 0,irá chamar a função limpar células,nos índices que foram dados pelo click,que vão servir como parâmetro para a função limparCelulas;
          else if(matriz[linha][coluna] == 0){
              limparCelulas(linha, coluna);
              }
          //O else abaixo analisa o  valor do item dado pelo array em determinados índices,caso o valor sena  diferente de 0 ou de -1 ele irá retornar para o html o número do item,e dará uma classe para o item de acordo com o número que ele irá retornar quando for clickado;
          else{
              cell.innerHTML = matriz[linha][coluna];
              cell.className = "n" + matriz[linha][coluna];
      }
      //E Caso não tenham mais células que sejam diferente de -1,irá retornar a função fimDeJogo;
      fimDeJogo();
  }
}

// Está função tem como intuito de quando o jogador marcar todos os campos em que não exista bombas,receber uma mensagem de que venceu. Ela seleciona elementos que sejam "blocked" e "flag" no documento. Verifica se o número de elementos é igual a "bombas".Se o número de elementos corresponder ao número de bombas, chama a função "mostrarBombas' ,desativa os eventos e exibe um alerta com a mensagem "Você venceu!".

function fimDeJogo() {
  const final = document.querySelectorAll(".blocked, .flag");
  const verificaBombas = () =>{
    const colunas = matriz[0].length;
    if(colunas == 30){return bombas = 99}
    else if (colunas == 16){return bombas = 40}
    else{return bombas = 10}}
    verificaBombas()
  if (final.length === bombas || final.length === 0) {
      mostrarBombas();
      tabuleiro.onclick = undefined;
      tabuleiro.oncontextmenu = undefined;
      ganhou()
 }
}
//A função tenteNovamente cria um botão na tela,que ao ser clickado a janela irá recarregar,ela só é chamada caso o usuário perca o jogo,ou seja,clique em alguma bomba;
function tenteNovamente(){
  const botao = document.createElement("button");//Cria um botão no HTML;
  const tenteNovamente = document.createTextNode("Tente Novamente!")//Cria um texto que irá ser usado no HTML;
  botao.appendChild(tenteNovamente)//Insere o texto da const tenteNovamente,dentro do botão criado;
  botao.classList.add('tenteNovamente')//Adiciona a classe "tenteNovamente"para o botão
  const classeBotao = document.querySelector('.tenteNovamente')//Pega o botão pela classe,para que consiga manipular ele pelo DOM;
  document.body.insertBefore(botao,classeBotao)//Coloca o botão e sua classe,dentro do body do HTML,para que assim apareça no documento acessado;
  botao.addEventListener('click',evento =>{
      location.reload()
  })//Dá uma função para o click no botão,que é pra dar reload na página,e voltar ao padrão,sem modificações;
}
//função ganhou,faz quase a mesma função do tente novamente,mas muda a mensagem exibida no botão,e só é chamada quando o usuário ganha;
function ganhou(){
  const botao = document.createElement("button");//Cria um botão no HTML;
  const tenteNovamente = document.createTextNode("Parabéns,Você Ganhou! Jogue Novamente!")//Cria um texto que irá ser usado no HTML;
  botao.appendChild(tenteNovamente)//Insere o texto da const tenteNovamente,dentro do botão criado;
  botao.classList.add('ganhou')//Adiciona a classe "tenteNovamente"para o botão;
  const classeBotao = document.querySelector('.ganhou')//Pega o botão pela classe,para que consiga manipular ele pelo DOM;
  document.body.insertBefore(botao,classeBotao)
  botao.addEventListener('click',evento =>{
      location.reload()
  })//Dá uma função para o click no botão,que é pra dar reload na página,e voltar ao padrão,sem modificações;
};

// Essa função irá dar início ao jogo quando a tela for carregada ou recarregada ou quando a dificuldade for alterada
function carregarJogo () {
  init(); //Chama a função `init` para inicializar o jogo
  const diff = document.getElementById("dificuldade"); // Essa const recebe a dificuldade em que seleciona o elemento HTML com o ID "dificuldade" usando `document.getElementById("dificuldade")`
  diff.onchange = init; //É atribuído á função `init` o evento `onchange` do elemento "dificuldade". Isso significa que sempre que o valor do elemento "dificuldade" for alterado (por exemplo, quando o usuário seleciona uma opção diferente em uma lista suspensa), a função `init` será chamada novamente para reiniciar o jogo com a nova dificuldade selecionada.
};
onload = carregarJogo; //A função `carregarJogo` é atribuída ao evento `onload` da janela. Isso significa que a função `carregarJogo` será chamada assim que a página terminar de carregar.

// Essa função serve para mostrar aonde as bombas estão localizadas antes de começar a partida. Pecorre a matriz,e, se encontrar uma célula com o valor -1 (indicando uma bomba), mostra aonde está as bombas definindo a classe da célula como "blocked".

function mostrarBombasTemporariamente() {
  
  matriz.map((linha, i) =>
    linha.map((celula, j) => {
      if (celula === -1) {
        const local = tabuleiro.rows[i].cells[j];
        local.innerHTML = "";
        local.className = "blocked"; }
   })
);
}