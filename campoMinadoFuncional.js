//Função que gera matriz através do mapeamento da lista usando a bibiloteca Array e a função map,para gerar listas através de uma função que foi solicitada para os itens do array;
//Na função gera matriz new Array(linhas).fill(0),irá gerar uma lista [0,0,0,0] => a quantidade de itens depende do parâmetros "linhas",logo depois,a partir do .map((itemDoArray) => itemDoArray = Array(colunas).fill(0)),cada item da lista gerada,recebe a função de criar uma nova lista com a quantidade de itens definida pelo parâmetro 'colunas',e todos os itens da lista serão preenchidos por 0 por causa do .fill(0);
function geraMatriz(linhas,colunas){
    const matriz = new Array(linhas).fill(0).map((itemDoArray) => itemDoArray = Array(colunas).fill(0));
    return matriz;
 }
function gerarTabuleiro(linhas, colunas) { //A função gerarTabuleiro recebe dois parâmetros: linhas e colunas, que indicam o número de linhas e colunas que a tabela deve ter

    const matriz = geraMatriz(linhas, colunas)//a constante matriz recebe a função chamada geraMatriz para criar uma matriz com o número especificado de linhas e colunas 
    
    const tabuleiro = document.querySelector('.tabuleiro');//A constante tabela recebe um elemento HTML no documento com o ID 'tabuleito' usando document.querySelector('tabuleiro')
    
    const tabuleiroHTML = matriz.map((linha) => {
    
    const colunasHTML = linha.map(() => "<td class='blocked'></td>").join('');// a função começa a construir a representação HTML da tabela usando a matriz criada anteriormente.Isso é feito usando a função map para iterar sobre cada linha da matriz e ,para cada linha da matriz, a função map é usada novamente para criar uma representação HTML das células da tabela. Neste caso, cada célula é representada como um elemento <td> (célula de tabela) com a classe 'bloqueado'(A classe 'bloqueado' pode ser usada para aplicar estilos CSS ou para identificar células de alguma maneira especial posteriormente).As células da linha são então unidas em uma única string usando join(''), criando assim uma representação HTML da linha completa
    
    return `<tr>${colunasHTML}</tr>`;
    
    }).join('');
    
    tabuleiro.innerHTML = tabuleiroHTML;// a representação HTML da tabela é inserida no elemento com o ID 'tabuleiro' no documento HTML usando tabuleiro.innerHTML = tabuleiroHTML,substituindo qualquer conteúdo existente dentro desse elemento pelo novo conteúdo ddo tabuleiro criado
    
    }
    
    gerarTabuleiro(9,9)
 //Função que dá valor para os itens da matriz gerada anteriormente,usando a reutilização de funções;
 //A const matriz recebe a função geramatriz com seus parâmetros,logo depois a const matrizComNumerosAleatórios pega o resultado da função geraMatriz,que retorna uma lista,com listas dentro,todas preenchidas com 0 EX:[[0,0,0,0,0]],mapeia esse resultado da função,chegando na lista Interior,que é [0,0,0,0,0],só que apenas com um map,nao conseguiria mudar os valores de dentro dessa lista,então usando um map na lista Interior,gerada pelo primeiro map,consegue-se adentrar os itens da lista interior,assim dando uma função para que cada item da lista interior retorne um valor randômico e aproximado para baixo,que está entre 1 e 10;
 function valorParaAsMatrizes(linhas,colunas){
    const matriz = geraMatriz(linhas,colunas);
    const matrizComNumerosAleatorios = matriz.map((listaInterior) => listaInterior.map((itensDaListaInterior) => Math.floor(Math.random()*10)+1));
    return matrizComNumerosAleatorios;
 }
 function filtraBombas(linhas,colunas){
    const matrizComNumerosAleatorios = valorParaAsMatrizes(linhas,colunas);
    const bomba = Math.floor(Math.random()*10);
    console.log(bomba)
    const bombasFiltradas = matrizComNumerosAleatorios.map((listaInterior) => listaInterior.filter((numeroDoArray) => numeroDoArray == bomba));
    return bombasFiltradas
 
 }
 console.log(filtraBombas(9,9))

 function gerarnumero1(l, c) {
   const count = matriz
     matriz.slice(l - 1, l + 2).map(linha => linha.slice(c - 1, c + 2)).flat().filter(cell => cell === -1).length
   
   matriz[l][c] = count;
 }
 
 function gerarnumero2() {
   matriz.map((linha, i) => {
     linha.map((cell, j) => {
       if (cell !== -1) {
         gerarnumero(i, j)
       }
     })
   })
}
 