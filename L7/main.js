// A. Estado e variáveis com referência de elementos do DOM
let produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];

const produtosContainer = document.querySelector('#produtos-container');
const cestoContainer = document.querySelector('#cesto-container');
const precoTotalElement = document.querySelector('#preco-total');

// B. Funções utilitárias
function guardarNoLocalStorage() {
    localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados));
}

function criarProduto(produto) {
    const article = document.createElement('article');
    article.classList.add('produto-card');

    // Botão Adicionar ao Cesto
    const btnAdicionar = document.createElement('button');
    btnAdicionar.textContent = '+ Adicionar ao cesto';

    // Event Listener associado ao botão do produto
    btnAdicionar.addEventListener('click', () => {
        produtosSelecionados.push(produto);
        guardarNoLocalStorage();
        atualizaCesto();
    });

    const titulo = document.createElement('h2');
    titulo.textContent = produto.title;

    const imagem = document.createElement('img');
    imagem.src = produto.image;
    imagem.alt = produto.title;

    const preco = document.createElement('p');
    preco.classList.add('preco');
    preco.textContent = `${produto.price} €`;

    const descricao = document.createElement('p');
    descricao.classList.add('descricao');
    descricao.textContent = produto.description;

    article.append(btnAdicionar, titulo, imagem, preco, descricao);

    return article;
}

function criaProdutoCesto(produto, index) {
    const article = document.createElement('article');
    article.classList.add('cesto-card');

    // Botão Remover do Cesto
    const btnRemover = document.createElement('button');
    btnRemover.textContent = '- Remover do cesto';

    // Remove o produto pelo seu index no array (útil para produtos repetidos)
    btnRemover.addEventListener('click', () => {
        produtosSelecionados.splice(index, 1);
        guardarNoLocalStorage();
        atualizaCesto();
    });

    const titulo = document.createElement('h2');
    titulo.textContent = produto.title;

    const imagem = document.createElement('img');
    imagem.src = produto.image;
    imagem.alt = produto.title;

    const preco = document.createElement('p');
    preco.classList.add('preco');
    preco.textContent = `${produto.price} €`;

    article.append(btnRemover, titulo, imagem, preco);

    return article;
}

// C. Event handlers
function renderizarProdutos(listaProdutos) {
    produtosContainer.innerHTML = '';
    listaProdutos.forEach(produto => {
        const artigoProduto = criarProduto(produto);
        produtosContainer.appendChild(artigoProduto);
    });
}

function atualizaCesto() {
    cestoContainer.innerHTML = '';
    let total = 0;

    produtosSelecionados.forEach((produto, index) => {
        const artigoCesto = criaProdutoCesto(produto, index);
        cestoContainer.appendChild(artigoCesto);
        total += produto.price; // Somar ao total
    });

    // Atualizar o elemento de texto com o preço total (com duas casas decimais)
    precoTotalElement.textContent = `Total: ${total.toFixed(2)} €`;
}

// D. Event Listeners
// Nota: Os event listeners dos botões já foram criados diretamente dentro de "criarProduto" e "criaProdutoCesto"
// porque assim cada botão fica associado logo ao respetivo objeto de produto.

// E. Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mostrar os produtos da loja
    renderizarProdutos(produtos);

    // 2. Mostrar os produtos que já estão guardados no cesto (se existirem)
    atualizaCesto();
});
