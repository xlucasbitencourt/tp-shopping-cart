// global.fetch = require('node-fetch'); // ativar para exibir no vscode, comentar para exibir no browser

const fetchProducts = async (busca) => { // requisito 1
  try { // usando try e catch pois função assincronar pode dar erro
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${busca}`; // link para busca de dados
    const link = await fetch(url); // guardar requisição (uso de await para aguardar promise)
    const resultado = await link.json(); // pega o resultado acima e faz a parada com json que não entendi ainda
    return resultado; // o retorno é o array de produtos
  } catch (erro) { // caso dê erro
    return (erro); // mensagem para erro
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

// console.log(fetchProducts());