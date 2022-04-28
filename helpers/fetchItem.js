// global.fetch = require('node-fetch'); // ativar para exibir no vscode, comentar para exibir no browser

const fetchItem = async (id) => { // requisito 2
  // basicamente a mesma função do requisito 1, porém trocando a url
  try {
    const url = `https://api.mercadolibre.com/items/${id}`; // link para o produto selecionado
    const link = await fetch(url); // requisição
    const resultado = await link.json(); // faz o lance lá do json
    return resultado; // retorna esse resultado para ser usado na próxima função
  } catch (erro) { // mensagem de erro
    return (erro); // retorna o erro caso dê errado
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

// console.log(fetchItem('MLB1341706310'));
