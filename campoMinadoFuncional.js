//Função que gera matriz através do mapeamento da lista usando a bibiloteca Array e a função map,para gerar listas através de uma função que foi solicitada para os itens do array;
//Na função gera matriz new Array(linhas).fill(0),irá gerar uma lista [0,0,0,0] => a quantidade de itens depende do parâmetros "linhas",logo depois,a partir do .map((itemDoArray) => itemDoArray = Array(colunas).fill(0)),cada item da lista gerada,recebe a função de criar uma nova lista com a quantidade de itens definida pelo parâmetro 'colunas',e todos os itens da lista serão preenchidos por 0 por causa do .fill(0);
function geraMatriz(linhas,colunas){
    const matriz = new Array(linhas).fill(0).map((itemDoArray) => itemDoArray = Array(colunas).fill(0));
    return matriz;
 }
 //Função que dá valor para os itens da matriz gerada anteriormente,usando a reutilização de funções;
 //A const matriz recebe a função geramatriz com seus parâmetros,logo depois a const matrizComNumerosAleatórios pega o resultado da função geraMatriz,que retorna uma lista,com listas dentro,todas preenchidas com 0 EX:[[0,0,0,0,0]],mapeia esse resultado da função,chegando na lista Interior,que é [0,0,0,0,0],só que apenas com um map,nao conseguiria mudar os valores de dentro dessa lista,então usando um map na lista Interior,gerada pelo primeiro map,consegue-se adentrar os itens da lista interior,assim dando uma função para que cada item da lista interior retorne um valor randômico e aproximado para baixo,que está entre 1 e 10;
 function valorParaAsMatrizes(linhas,colunas){
    const matriz = geraMatriz(linhas,colunas);
    const matrizComNumerosAleatorios = matriz.map((listaInterior) => listaInterior.map((itensDaListaInterior) => Math.floor(Math.random(itensDaListaInterior)*10)));
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