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
 