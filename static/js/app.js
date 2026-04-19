
let deferredPrompt;
const installBanner = document.createElement('div');
installBanner.id = 'pwa-install-banner';

// Captura o evento de instalação do navegador
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Só mostra o banner se estivermos na tela de login
    if (document.getElementById('login-screen')) {
        showInstallBanner();
    }
});

function showInstallBanner() {
    installBanner.innerHTML = `
        <span style="color: #333; font-weight: bold; font-size: 14px;">Instalar App NutriSaquarema?</span>
        <div style="display:flex; gap: 8px;">
            <button onclick="triggerInstall()" style="background: var(--primary); color: white;">Instalar</button>
            <button onclick="closeInstallBanner()" style="background: #eee; color: #666;">Agora não</button>
        </div>
    `;
    document.body.appendChild(installBanner);
    installBanner.style.display = 'flex';
}

function triggerInstall() {
    installBanner.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('Usuário aceitou a instalação');
        }
        deferredPrompt = null;
    });
}

function closeInstallBanner() {
    installBanner.style.display = 'none';
}

// Escuta quando o app é instalado com sucesso
window.addEventListener('appinstalled', () => {
    console.log('PWA instalado com sucesso!');
    installBanner.style.display = 'none';
});


const app = {
    userRole: null,




if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker registrado!', reg))
      .catch(err => console.log('Falha ao registrar Service Worker', err));
  });
}


window.onload = () => app.init();
