// const { fetchProducts } = require('./helpers/fetchProducts');

// const getSavedCartItems = require("./helpers/getSavedCartItems");

// const getSavedCartItems = require("./helpers/getSavedCartItems");

// const saveCartItems = require("./helpers/saveCartItems");

// const { fetchItem } = require("./helpers/fetchItem");

const cartItems = document.querySelector('.cart__items'); // adiciona elemento de classe cart__items

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const valorCarrinho = () => { // requisito 5
  const totalPrice = document.querySelector('.total-price'); // local onde será exibido o valor na página
  const item = document.querySelectorAll('.cart__item'); // constante para pegar itens do carrinho (tive que criar outra sei lá porque caralho)
  const total = Array.from(item) // total é uma array dos elementos produtos no carrinho
  .reduce((a, pro) => a + (parseFloat(pro.innerHTML.split('|')[2] // tira os dados numéricos para compor o valor
  .replace(' PRICE: $', ''))), 0); // substitui o proce para deixar o valor numérico
  // .toFixed(2); // mostra somente 2 casas decimais
  totalPrice.innerText = total; // coloca o valor na página
};

function cartItemClickListener(event) { // requisito 3
  event.target.remove(); // remove o local onde foi clicado (o escutador está na função abaixo)
  valorCarrinho(); // requisito 5
  saveCartItems(cartItems.innerHTML); // requisito 4 - salva o carrinho cada vez que remover item
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const adicionaCarrinho = async (alvo) => { // requisito 2 jogado pra cima por causa da bosta do lint
 // const cartItems = document.querySelector('.cart__items'); // adiciona elemento de classe cart__items
  const id = getSkuFromProductItem(alvo.target.parentNode); // pega o id através da utra função
  const resultado = await fetchItem(id); // pega a lista da função fetchItem
  const { id: sku, title: name, price: salePrice } = resultado; // muda o nome das chaves
  const itemCarrinho = createCartItemElement({ sku, name, salePrice }); // cria os items do carrinho
  cartItems.appendChild(itemCarrinho); // adiciona na página
  valorCarrinho(); // requisito 5
  saveCartItems(cartItems.innerHTML); // requisito 4 - salva o carrinho a caca vez que adicionar item ao carrinho
};

const restaura = () => { // requisito 4
  cartItems.innerHTML = getSavedCartItems(); // pega os itens salvos no local storage e guarda na página
  const cart = document.querySelectorAll('.cart__item'); // atribui a constante aos itens com a classe cart__item
  cart.forEach((a) => a.addEventListener('click', cartItemClickListener)); // coloca o escutador para conseguir exckuir o item do carrinho
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
  .addEventListener('click', adicionaCarrinho); // adiciona botão para executar função de colocar no carrinho

  return section;
}

const mostraProdutos = async (busca) => { // requisito 1
  const items = document.querySelector('.items'); // identifica o elemento com a classe items
  const lista = await fetchProducts(busca); // guarda o retorno da função criada no outro arquivo
  lista.results.forEach((alvo) => {
    const { id: sku, title: name, thumbnail: image } = alvo; // desestrutura para colocar os nomes que estão na função acima
    return items.appendChild(createProductItemElement({ sku, name, image })); // chama a função para gerar os items na página, como filhos do elemento de classe items
  });
  valorCarrinho(); // requisito 5
};

window.onload = () => { // chama a função no carregamento da página
  mostraProdutos('computador'); // requisito 1
  valorCarrinho(); // requisito 5
  restaura(); // // requisito 4 carrega o carrinho salvo no carregamento da página
 }; 
