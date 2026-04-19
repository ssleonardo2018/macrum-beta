// Rolagem suave para links de âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Manipulação do Formulário
const form = document.getElementById('macrumForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulação de envio (em um cenário real, aqui entraria o fetch para API)
    const btn = document.querySelector('.btn-submit');
    const originalText = btn.innerText;
    
    btn.innerText = "Enviando...";
    btn.style.opacity = "0.7";
    btn.disabled = true;

    setTimeout(() => {
        alert("Obrigado! Recebemos sua solicitação. Nossa equipe comercial entrará em contato em breve.");
        btn.innerText = originalText;
        btn.style.opacity = "1";
        btn.disabled = false;
        form.reset();
    }, 2000);
});

// Efeito de Header ao rolar
window.addEventListener('scroll', () => {
    const header = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
    } else {
        header.style.boxShadow = 'none';
    }
});
