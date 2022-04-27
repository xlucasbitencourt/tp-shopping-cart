// const { fetchProducts } = require('./helpers/fetchProducts');

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

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const mostraProdutos = async (busca) => { // requisito 1
  const items = document.querySelector('.items'); // identifica o elemento com a classe items
  const lista = await fetchProducts(busca); // guarda o retorno da função criada no outro arquivo
  lista.results.map((alvo) => {
    const { id: sku, title: name, thumbnail: image } = alvo; // desestrutura para colocar os nomes que estão na função acima
    return items.appendChild(createProductItemElement({ sku, name, image })); // chama a função para gerar os items na página, como filhos do elemento de classe items
  });
};

window.onload = () => { mostraProdutos('computador'); }; // chama a função no carregamento da página
