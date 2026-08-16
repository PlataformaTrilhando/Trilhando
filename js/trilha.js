/**
 * SCRIPT DE INTERATIVIDADE - PROJETO TRILHANDO
 * Este script gerencia o progresso das trilhas e a exibição dinâmica do Modal de detalhes.
 */

// Conteúdo estratégico para os detalhes de cada habilidade
const detalhesHabilidades = {
    "html": {
        titulo: "HTML: A Fundação da Web",
        foco: "Semântica, Acessibilidade e SEO.",
        mercado: "Não é apenas 'fazer o site aparecer'. Recrutadores buscam quem sabe usar as tags corretas (main, article, nav) para que o Google indexe o site e leitores de tela funcionem perfeitamente.",
        dica: "Pratique a criação de formulários acessíveis. É um dos testes técnicos mais comuns para Juniores."
    },
    "css": {
        titulo: "CSS: Design e Responsividade",
        foco: "Flexbox, Grid e Mobile-First.",
        mercado: "Hoje, mais de 60% dos acessos são via mobile. Dominar CSS não é decorar cores, é saber estruturar layouts que funcionam em qualquer tela sem quebrar.",
        dica: "Tente recriar o layout de um site famoso usando apenas Flexbox e Grid. Isso demonstra domínio real."
    },
    "javascript": {
        titulo: "JavaScript: A Lógica do Front-end",
        foco: "DOM, Fetch API e Lógica de Programação.",
        mercado: "É aqui que você prova que é um desenvolvedor. O mercado busca quem entende como os dados são manipulados e como integrar o site com serviços externos (APIs).",
        dica: "Entenda o 'Vanilla JS' antes de pular para frameworks. Quem domina a base aprende qualquer biblioteca rápido."
    },
    "git": {
        titulo: "Git e GitHub: Colaboração Real",
        foco: "Versionamento e Fluxo de Trabalho (Branches).",
        mercado: "Ninguém trabalha sozinho. Saber Git permite trabalhar em equipe sem apagar o código do colega. O seu GitHub é o seu currículo vivo.",
        dica: "Crie o hábito de fazer commits pequenos e claros. Isso mostra organização profissional para o recrutador."
    },
    "comunicacao": {
        titulo: "Comunicação e Equipe",
        foco: "Clareza, Escuta Ativa e Empatia.",
        mercado: "Saber explicar um problema técnico para alguém não técnico é uma das habilidades mais valorizadas. O 'Dev isolado' não existe mais no mercado moderno.",
        dica: "Em reuniões, tente resumir o que foi decidido para garantir que todos estão na mesma página."
    },
    "tempo": {
        titulo: "Gestão de Tempo",
        foco: "Priorização e Método Kanban.",
        mercado: "O mercado trabalha com prazos. Saber estimar seu tempo e usar ferramentas como Trello ou Jira é essencial para a saúde do projeto.",
        dica: "Use a técnica Pomodoro para focar em tarefas complexas e evite o multitarefa."
    },
    "problemas": {
        titulo: "Resolução de Problemas",
        foco: "Pensamento Crítico e Debugging.",
        mercado: "Programar é resolver problemas. Recrutadores valorizam quem tem resiliência para encontrar a causa raiz de um erro.",
        dica: "Quando encontrar um erro, tente explicá-lo em voz alta (técnica do Pato de Borracha). Isso ajuda a clarear a solução."
    },
    "projeto": {
        titulo: "Projeto prático",
        foco: "Aplicar seus conhecimentos em um projeto real.",
        mercado: "No mercado, portfólio fala mais alto que diploma. Empresas e recrutadores pedem pra 'mostrar o que você já fez'. Ter 2 a 3 projetos no GitHub aumenta muito suas chances em entrevistas e processos seletivos.",
        dica: "Documente seu projeto no GitHub com README, prints e deploy. Trate ele como se fosse pra um cliente real: prazo, escopo e entrega."
    }
};

/**
 * Função para atualizar a barra de progresso
 */
function atualizarProgresso(trilhaClasse, checkClasse, barraId, textoId) {
    const barra = document.getElementById(barraId);
    const texto = document.getElementById(textoId);
    const checkboxes = document.querySelectorAll(`.${trilhaClasse} .${checkClasse}`);

    if (!barra || !texto || checkboxes.length === 0) return;

    const total = checkboxes.length;
    const marcados = document.querySelectorAll(`.${trilhaClasse} .${checkClasse}:checked`).length;
    const porcentagem = Math.round((marcados / total) * 100);

    barra.style.width = porcentagem + '%';
    texto.innerText = porcentagem + '%';

    // Efeito visual ao completar 100%
    if (porcentagem === 100) {
        barra.style.background = "#8F3EF7";
    } else {
        barra.style.background = "#10B981";
    }
}

/**
 * Gerenciamento do Modal
 */
const modal = document.getElementById("modalDetalhes");
const spanClose = document.getElementsByClassName("close-modal")[0];

function abrirModal(key) {
    const dados = detalhesHabilidades[key];
    if (!dados) return;

    document.getElementById("modal-titulo").innerText = dados.titulo;
    document.getElementById("modal-foco").innerText = dados.foco;
    document.getElementById("modal-mercado").innerText = dados.mercado;
    document.getElementById("modal-dica").innerText = dados.dica;

    modal.style.display = "block";
}

// Fecha o modal ao clicar no X ou fora da janela
spanClose.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
};

/**
 * Inicialização ao carregar a página
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Configuração das Trilhas
    const configTrilhas = [
        { trilha: 'tecnica', check: 'check-item-tec', barra: 'barra-progresso-tec', texto: 'progresso-texto-tec' },
        { trilha: 'soft-skills', check: 'check-item-soft', barra: 'barra-progresso-soft', texto: 'progresso-texto-soft' }
    ];

    configTrilhas.forEach(t => {
        // Inicializa progresso
        atualizarProgresso(t.trilha, t.check, t.barra, t.texto);

        // Adiciona listeners para os checkboxes
        document.querySelectorAll(`.${t.trilha} .${t.check}`).forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                atualizarProgresso(t.trilha, t.check, t.barra, t.texto);
            });
        });
    });

    // 2. Configuração dos botões de detalhes
    document.querySelectorAll('.btn-detalhes').forEach(botao => {
        botao.addEventListener('click', function () {
            const key = this.getAttribute('data-key');
            abrirModal(key);
        });
    });
});
