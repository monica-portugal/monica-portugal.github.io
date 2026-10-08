// Variável global para o contador do click
let contador = 0;

// 1. Handler para o ONCLICK (Contador)
function incrementarContador() {
    contador++;
    const textoContador = document.getElementById('contador-texto');
    const botao = document.getElementById('btn-contador');

    // Altera o textContent
    textoContador.textContent = 'Contador de Cliques: ' + contador;

    // Altera o style
    textoContador.style.color = '#e74c3c'; // Muda o título para vermelho
    botao.style.backgroundColor = '#e74c3c'; // Muda o botão para vermelho
}

// 2. Handler para o ONDBLCLICK
function mudarCorDuplo() {
    const caixaDuplo = document.getElementById('db-texto');
    const botao = document.getElementById('btn-duplo');

    // Altera o textContent
    caixaDuplo.textContent = 'Uau! Duplo clique detetado!';
    botao.textContent = 'Duplo clique feito!';

    // Altera o style
    caixaDuplo.style.fontSize = '24px';
    caixaDuplo.style.color = '#27ae60'; // Verde
    botao.style.transform = 'rotate(5deg)'; // Inclina o botão 5 graus
}

// 3. Handler para o ONMOUSEOVER
function aumentarImagem() {
    const textoImg = document.getElementById('img-texto');
    const imagem = document.getElementById('imagem-magica');

    // Altera o textContent
    textoImg.textContent = 'Imagem ampliada!';

    // Altera o style
    imagem.style.transform = 'scale(1.1)'; // Aumenta o tamanho da imagem em 10%
    imagem.style.boxShadow = '0 10px 20px rgba(0,0,0,0.4)'; // Adiciona sombra
    textoImg.style.color = '#8e44ad'; // Roxo
}

// 4. Handler para o ONMOUSEOUT
function diminuirImagem() {
    const textoImg = document.getElementById('img-texto');
    const imagem = document.getElementById('imagem-magica');

    // Altera o textContent
    textoImg.textContent = 'Passa o rato na imagem';

    // Altera o style
    imagem.style.transform = 'scale(1)'; // Volta ao tamanho original
    imagem.style.boxShadow = 'none'; // Remove a sombra
    textoImg.style.color = '#333'; // Volta à cor original do texto
}

// 5. Handler para o ONMOUSEMOVE
function rastrearMovimento(evento) {
    const textoMovimento = document.getElementById('movimento-texto');
    const area = document.querySelector('.area-movimento');

    // Captura as coordenadas do rato
    let x = evento.clientX;
    let y = evento.clientY;

    // Altera o textContent para mostrar as coordenadas
    textoMovimento.textContent = 'Posição: X: ' + x + ', Y: ' + y;

    // Altera o style dinamicamente consoante a posição (muda a cor de fundo)
    let r = x % 255;
    let g = y % 255;
    area.style.backgroundColor = `rgb(${r}, ${g}, 180)`;
    textoMovimento.style.color = 'white';
    textoMovimento.style.fontWeight = 'bold';
}
