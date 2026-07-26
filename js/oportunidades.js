/**
 * Script para interatividade da página de Oportunidades - Trilhando
 */

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('job-search');
    const filterType = document.getElementById('filter-type');
    const filterArea = document.getElementById('filter-area');
    const filterDist = document.getElementById('filter-dist');
    const opportunitiesContainer = document.getElementById('opportunities-container');
    const cards = opportunitiesContainer.querySelectorAll('.card-opportunity');

    /**
     * Função principal de filtragem
     */
    function filterJobs() {
        const searchTerm = searchInput.value.toLowerCase();
        const typeValue = filterType.value;
        const areaValue = filterArea.value;
        const distValue = filterDist.value;

        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const company = card.querySelector('.meta').textContent.toLowerCase();
            const cardType = card.getAttribute('data-type') || "";
            const cardArea = card.getAttribute('data-area') || "";
            const cardDist = card.getAttribute('data-dist') || ""; // 1. Lê a tag. Se não tiver vira ""

            // Lógica de correspondência
            const matchesSearch = title.includes(searchTerm) || company.includes(searchTerm);
            const matchesType = typeValue === "" || cardType === typeValue;
            const matchesArea = areaValue === "" || cardArea === areaValue;
            const matchesDist = distValue === "" || cardDist === distValue; // 2. Compara igual aos outros

            if (matchesSearch && matchesType && matchesArea && matchesDist) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });

        // Feedback visual se não houver resultados
        const visibleCards = Array.from(cards).filter(c => c.style.display !== 'none');
        let noResultsMsg = document.getElementById('no-results-msg');

        if (visibleCards.length === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('p');
                noResultsMsg.id = 'no-results-msg';
                noResultsMsg.style.textAlign = 'center';
                noResultsMsg.style.padding = '40px';
                noResultsMsg.style.color = '#b8b8b8';
                noResultsMsg.textContent = 'Nenhuma oportunidade encontrada com esses filtros.';
                opportunitiesContainer.appendChild(noResultsMsg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }

    // Event Listeners
    searchInput.addEventListener('input', filterJobs);
    filterType.addEventListener('change', filterJobs);
    filterArea.addEventListener('change', filterJobs);
    filterDist.addEventListener('change', filterJobs); // Já estava certo

    // Efeito de clique nos cards
    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.style.borderColor = '#3a2a55');
            card.style.borderColor = '#8F3EF7';
        });
    });
});