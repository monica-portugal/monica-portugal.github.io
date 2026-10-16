// A. declaraçao de variaveis
const form = document.querySelector('form');
const nodeInputNumero = document.querySelector('form input[type="number"]');
const nodeInputSubmit = document.querySelector('form input[type="submit"]');

// Variáveis da Coleção Principal
const nodeUlColecao = document.querySelector('#colecao ul');
const nodeSpanTotal = document.querySelector('#colecao h3 span');

// 1. CARREGAR DO LOCALSTORAGE (Se não existir nada, cria uma lista vazia [])
const colecao = JSON.parse(localStorage.getItem('minhaColecao')) || [];

// Variáveis dos Repetidos
const nodeUlRepetidos = document.querySelector('#repetidos ul');
const nodeSpanTotalRepetidos = document.querySelector('#repetidos h3 span');

// 1. CARREGAR DO LOCALSTORAGE
const repetidos = JSON.parse(localStorage.getItem('meusRepetidos')) || [];


// --- NOVA FUNÇÃO PARA GUARDAR DADOS ---
function salvarNoLocalStorage() {
    // Transforma as listas em texto e guarda no navegador
    localStorage.setItem('minhaColecao', JSON.stringify(colecao));
    localStorage.setItem('meusRepetidos', JSON.stringify(repetidos));
}


// B. event handlers
function guardaCarta() {
    const numero = Number(nodeInputNumero.value);

    // VERIFICA SE O CROMO JÁ EXISTE NA COLEÇÃO
    if (colecao.includes(numero)) {
        repetidos.push(numero);
        repetidos.sort((a, b) => a - b);
        atualizaLista(repetidos, nodeUlRepetidos);
        nodeSpanTotalRepetidos.textContent = repetidos.length;
        ativarBotoesEliminar();
    } else {
        colecao.push(numero);
        colecao.sort((a, b) => a - b);
        atualizaLista(colecao, nodeUlColecao);
        nodeSpanTotal.textContent = colecao.length;
    }

    // 2. GUARDAR APÓS INSERIR UM NOVO CROMO
    salvarNoLocalStorage();

    nodeInputNumero.value = '';
}

function atualizaLista(lista, elementoUl) {
    elementoUl.innerHTML = '';

    lista.forEach(numero => {
        const li = document.createElement('li');

        if (lista === repetidos) {
            li.innerHTML = `${numero} <button class="btn-apagar">Eliminar</button>`;
        } else {
            li.textContent = numero;
        }

        elementoUl.appendChild(li);
    });
}

function ativarBotoesEliminar() {
    const botoes = document.querySelectorAll('#repetidos .btn-apagar');

    botoes.forEach((botao, index) => {
        botao.onclick = () => {
            repetidos.splice(index, 1);
            atualizaLista(repetidos, nodeUlRepetidos);
            nodeSpanTotalRepetidos.textContent = repetidos.length;

            // 2. GUARDAR APÓS APAGAR UM CROMO REPETIDO
            salvarNoLocalStorage();

            ativarBotoesEliminar();
        };
    });
}


// C. event listeners
form.onsubmit = (event) => {
    event.preventDefault();
    guardaCarta();
}


//Atualizar o HTML imediatamente com os dados que vieram do LocalStorage
atualizaLista(colecao, nodeUlColecao);
nodeSpanTotal.textContent = colecao.length;

atualizaLista(repetidos, nodeUlRepetidos);
nodeSpanTotalRepetidos.textContent = repetidos.length;
ativarBotoesEliminar(); // Ativa os botões de eliminar dos repetidos que foram carregados
