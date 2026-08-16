/* Navegação e acessibilidade globais do Trilhando */
document.addEventListener('DOMContentLoaded', () => {
    const botao = document.querySelector('[data-menu-botao]');
    const lista = document.querySelector('[data-menu-lista]');
    const sobreposicao = document.querySelector('[data-menu-sobreposicao]');
    const acessibilidade = document.querySelector('[data-acessibilidade]');
    const toast = document.querySelector('[data-acessibilidade-toast]');
    let toastTimer;

    const alternarMenu = (aberto) => {
        if (!botao || !lista || !sobreposicao) return;
        botao.setAttribute('aria-expanded', String(aberto));
        lista.classList.toggle('aberto', aberto);
        sobreposicao.classList.toggle('aberto', aberto);
        document.body.classList.toggle('menu-aberto', aberto);
        if (aberto) lista.querySelector('a')?.focus();
        else botao.focus();
    };

    botao?.addEventListener('click', () => alternarMenu(botao.getAttribute('aria-expanded') !== 'true'));
    sobreposicao?.addEventListener('click', () => alternarMenu(false));
    lista?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => alternarMenu(false)));

    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && botao?.getAttribute('aria-expanded') === 'true') alternarMenu(false);
    });
    window.addEventListener('resize', () => {
        if (window.matchMedia('(min-width: 48.0625rem)').matches && botao?.getAttribute('aria-expanded') === 'true') alternarMenu(false);
    });

    const mostrarAcessibilidade = () => {
        if (!toast) return;
        toast.classList.add('visivel');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('visivel'), 6000);
    };
    acessibilidade?.addEventListener('click', mostrarAcessibilidade);

    // O e-mail do rodapé leva ao card e abre o modal funcional na página Sobre.
    document.querySelectorAll('[data-contato-link]').forEach((link) => {
        link.addEventListener('click', (evento) => {
            const destinoSobre = link.getAttribute('href')?.includes('sobre.html');
            if (!destinoSobre) return;
            if (window.location.pathname.endsWith('sobre.html')) {
                evento.preventDefault();
                history.pushState(null, '', '#contato');
                document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                document.getElementById('btnFaleConosco')?.click();
            }
        });
    });
    if (window.location.hash === '#contato') {
        setTimeout(() => document.getElementById('btnFaleConosco')?.click(), 250);
    }
});
