const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

const arg = '<ol><li>Item</li></ol>';

localStorageSimulator('setItem');

// requisito 10
describe('4 - Teste a função saveCartItems', () => {
  test('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {
    saveCartItems(arg);
    expect(localStorage.setItem).toHaveBeenCalled();
  })
  test('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems', () => {
    saveCartItems(arg);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', arg);
  })
});
