let linhas,colunas,bombas,matriz,tabela;
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
function gerarBombas() {
  const indices = () => [
     Math.floor(Math.random() * linhas),
     Math.floor(Math.random() * colunas),
   ];
   const localdabomba = (matriz) => {
     const [linha, coluna] = indices();
     matriz[linha][coluna] = -1;
     return matriz;
   };
   const matrizbomba = Array(bombas).fill(null).reduce(localdabomba, matriz);
 return matrizbomba;
 }

 
 function gerarnumero1(l, c) {
   const count = matriz
     matriz.slice(l - 1, l + 2).map(linha => linha.slice(c - 1, c + 2)).flat().filter(cell => cell === -1).length
   
   matriz[l][c] = count;
 }
 
 function gerarnumero2() {
   matriz.map((linha, i) => {
     linha.map((cell, j) => {
       if (cell !== -1) {
         gerarnumero1(i, j)
       }
     })
   })
}
//A Função limparCelulas serve para analisar os arrays que não são bombas,e dar características para os itens do array,de acordo com valor que o item em determinado índice tem,para isso é preciso dar dois parâmetros para a função que irá receber os parâmetros de linhas e colunas (respectivamente l,c) 
function limparCelulas(l, c) {
  //A const limparCelula serve para analisar se os índices recebidos estão dentro dos limites de linhas e colunas,
 const limparCelula = (indiceLin,indiceCol) => {
    if (indiceLin >= 0 && indiceLin < linhas && indiceCol >= 0 && indiceCol < colunas) {
      const cell = tabela.rows[indiceLin].cells[indiceCol];
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
        const local = tabela.rows[i].cells[j];
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
              tabela.onclick = undefined;
              tabela.oncontextmenu = undefined;
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