const saveCartItems = (local) => { // requisito 4
  localStorage.setItem('cartItems', local); // salva todo o conteudo dentro do elemento
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
