/**
 * Script para expansão do card de Tecnologia - Trilhando
 */

document.addEventListener('DOMContentLoaded', () => {
    const cardTecnologia = document.querySelector('.cardArea.destaque');

    if (cardTecnologia) {
        const btnExplore = cardTecnologia.querySelector('button');

        // Criação do container de subáreas (inicialmente oculto via CSS)
        const subAreasContainer = document.createElement('div');
        subAreasContainer.className = 'sub-areas-container';
        subAreasContainer.innerHTML = `
            <div class="sub-areas-content">
                <h4>Escolha sua trilha:</h4>
                <div class="sub-areas-grid">
                    <a href="trilhas.html" class="sub-area-item ativo">
                        <span class="dot"></span> Front-end
                    </a>
                    <div class="sub-area-item inativo">
                        <span class="dot"></span> Back-end <small>(Em breve)</small>
                    </div>
                    <div class="sub-area-item inativo">
                        <span class="dot"></span> Ciência de Dados <small>(Em breve)</small>
                    </div>
                    <div class="sub-area-item inativo">
                        <span class="dot"></span> Mobile <small>(Em breve)</small>
                    </div>
                </div>
                <button class="btn-voltar">← Voltar</button>
            </div>
        `;

        // Insere o container dentro do card
        cardTecnologia.appendChild(subAreasContainer);

        // Evento de clique para expandir
        btnExplore.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita conflitos
            cardTecnologia.classList.add('expandido');
        });

        // Evento para voltar/recolher
        const btnVoltar = subAreasContainer.querySelector('.btn-voltar');
        btnVoltar.addEventListener('click', (e) => {
            e.stopPropagation();
            cardTecnologia.classList.remove('expandido');
        });
    }
});
