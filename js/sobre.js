// 1. Inicializa EmailJS
(function () {
    emailjs.init("ns1vzMJF6oLALijRx");
})();

// 2. Aguarda carregar a página
document.addEventListener('DOMContentLoaded', function () {

    const modal = document.getElementById("modalContato");
    const btn = document.getElementById("btnFaleConosco");
    const span = document.getElementById("fechar-modal");
    const form = document.getElementById("formContato");

    // Abrir modal
    if (btn) btn.onclick = () => modal.style.display = "block";

    // Fechar modal
    if (span) span.onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }

    // 3. Enviar Formulário
    if (form) { // garante que o form existe antes de adicionar evento
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const status = document.getElementById("statusEnvio");

            // VALIDAÇÃO DO RECAPTCHA
            if (typeof grecaptcha === 'undefined') {
                alert("Erro: reCAPTCHA não carregou. Atualize a página.");
                return;
            }
            if (grecaptcha.getResponse() === "") {
                alert("Marque o reCAPTCHA por favor");
                return;
            }

            status.innerText = "Enviando...";
            status.style.color = "#94a3b8";

            emailjs.send("service_7coe18a", "template_uchxd7a", {
                from_email: document.getElementById("emailUsuario").value,
                message: document.getElementById("mensagemUsuario").value
            })
                .then(() => {
                    status.innerText = "✅ Mensagem enviada com sucesso!";
                    status.style.color = "#4ade80";
                    form.reset();
                    grecaptcha.reset(); // limpa o captcha
                    setTimeout(() => modal.style.display = "none", 2000);
                }, (error) => {
                    console.log(error);
                    status.innerText = "❌ Erro ao enviar. Tente novamente.";
                    status.style.color = "#f87171";
                    grecaptcha.reset(); // limpa mesmo se der erro
                });
        });
    }
});