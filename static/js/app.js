
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



  

    login() {
       
        const val = document.getElementById('user').value.toLowerCase();
        // Simulação de autenticação por papel
        if (val === 'admin') {
            this.renderAdmin();
        } else if (['paciente', 'nutri', 'atendente'].includes(val)) {
            this.userRole = val;
            this.render(val);
        } else {
            alert('Use: paciente, nutri, atendente ou admin para testar.');
        }
    },


    renderAdmin() {
    const container = document.getElementById('app');
    
    // Dados simulados para o gráfico de gestão
    const estatisticas = [
        { local: "Bacaxá", atendimentos: 145, cor: "#006738" },
        { local: "Sampaio Corrêa", atendimentos: 82, cor: "#f2a900" },
        { local: "Vilatur", atendimentos: 43, cor: "#6c757d" }
    ];

    let htmlGrafico = estatisticas.map(item => `
        <div style="margin-bottom:15px">
            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:5px">
                <span>${item.local}</span>
                <strong>${item.atendimentos}</strong>
            </div>
            <div style="background:#eee; height:10px; border-radius:5px; overflow:hidden">
                <div style="background:${item.cor}; width:${(item.atendimentos/150)*100}%; height:100%"></div>
            </div>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="screen" style="display:flex; background: #f4f4f4;">
            <header class="header">
                <button onclick="app.render('login')" style="background:none; border:none; color:white; font-size:18px;">🚪</button>
                <span><strong>Gestão de Saúde - Saquarema</strong></span>
                <span style="font-size:18px">⚙️</span>
            </header>
            
            <div class="content">
                <div class="card full-card" style="background: white; border-bottom: 4px solid var(--primary)">
                    <h4 style="color:var(--primary); margin-bottom:10px">Resumo Mensal</h4>
                    <div style="display:flex; justify-content:space-around; text-align:center">
                        <div><p style="font-size:20px; font-weight:bold">270</p><p style="font-size:10px">Consultas</p></div>
                        <div style="border-left:1px solid #eee; padding-left:15px"><p style="font-size:20px; font-weight:bold">12</p><p style="font-size:10px">Nutris Ativos</p></div>
                        <div style="border-left:1px solid #eee; padding-left:15px"><p style="font-size:20px; font-weight:bold">94%</p><p style="font-size:10px">Satisfação</p></div>
                    </div>
                </div>

                <h4 style="margin: 20px 0 10px 5px">Atendimentos por Unidade</h4>
                <div class="card full-card">
                    ${htmlGrafico}
                </div>

                <div class="bento-grid" style="margin-top:15px">
                    <div class="card" onclick="alert('Gerando Relatório PDF...')">
                        <p style="font-size:24px">📄</p>
                        <p style="font-size:12px; font-weight:bold">Relatório Quadrimestral</p>
                    </div>
                    <div class="card" onclick="alert('Abrindo Gestão de Equipe...')">
                        <p style="font-size:24px">👥</p>
                        <p style="font-size:12px; font-weight:bold">Equipe de Nutrição</p>
                    </div>
                </div>

                <button onclick="app.render('login')" style="width:100%; margin-top:20px; background:#6c757d">Sair do Painel</button>
            </div>
        </div>
     `;
    },
   

    renderAnamnese() {
        const container = document.getElementById('app');
        container.innerHTML = `
            <div class="screen" style="display:flex; background: #fff;">
                <header class="header">
                    <button onclick="app.render('nutri')" style="background:none; border:none; color:white; font-size:20px;">←</button>
                    <span><strong>Nova Anamnese</strong></span>
                    <span style="width:20px"></span>
                </header>
                
                <div class="content">
                    <div id="anamnese-step-1">
                        <h3 style="margin-bottom:15px; color:var(--primary)">Dados do Paciente</h3>
                        <input type="text" placeholder="Nome Completo" style="width:100%">
                        <input type="number" placeholder="Idade" style="width:100%">
                        <div style="display:flex; gap:10px">
                            <input type="text" placeholder="Peso (kg)" style="flex:1">
                            <input type="text" placeholder="Altura (m)" style="flex:1">
                        </div>
                        <button onclick="document.getElementById('anamnese-step-1').style.display='none'; document.getElementById('anamnese-step-2').style.display='block';" style="width:100%; margin-top:20px">Próximo: Hábitos</button>
                    </div>
    
                    <div id="anamnese-step-2" style="display:none">
                        <h3 style="margin-bottom:15px; color:var(--primary)">Hábitos e Saúde</h3>
                        <label style="font-size:14px; display:block; margin-bottom:5px">Pratica atividade física?</label>
                        <select style="width:100%; padding:15px; border-radius:8px; margin-bottom:15px; border:1px solid #ccc">
                            <option>Sedentário</option>
                            <option>Leve (1-2x semana)</option>
                            <option>Moderado (3-5x semana)</option>
                            <option>Intenso (Diário)</option>
                        </select>
                        
                        <label style="font-size:14px; display:block; margin-bottom:5px">Patologias (Hipertensão, Diabetes...)</label>
                        <textarea placeholder="Descreva aqui..." style="width:100%; padding:15px; border-radius:8px; border:1px solid #ccc; height:80px"></textarea>
                        
                        <button onclick="app.salvarAnamnese()" style="width:100%; margin-top:20px; background:#28a745">Finalizar e Gerar Plano</button>
                        <button onclick="document.getElementById('anamnese-step-2').style.display='none'; document.getElementById('anamnese-step-1').style.display='block';" style="width:100%; margin-top:10px; background:#6c757d">Voltar</button>
                    </div>
                </div>
            </div>
        `;
    },
    
    salvarAnamnese() {
        alert('✅ Anamnese salva com sucesso no sistema da Prefeitura!');
        this.render('nutri');
    },



    renderPlanoAlimentar() {
    const container = document.getElementById('app');
    const dietaMock = [
        { refeicao: "Café da Manhã", hora: "07:30", itens: "Café com leite desnatado, 1 fatia de pão integral com queijo branco." },
        { refeicao: "Almoço", hora: "12:00", itens: "Arroz integral, feijão preto, filé de frango grelhado e salada verde à vontade." },
        { refeicao: "Lanche", hora: "15:30", itens: "1 fruta da estação (Banana ou Maçã) + 2 castanhas." },
        { refeicao: "Jantar", hora: "19:00", itens: "Sopa de legumes com carne magra ou omelete de 2 ovos." }
    ];

    let htmlDieta = dietaMock.map(item => `
        <div class="card full-card" style="margin-bottom:10px; border-left: 5px solid var(--primary); text-align: left;">
            <div style="display:flex; justify-content:space-between; align-items:center">
                <strong style="color:var(--primary)">${item.refeicao}</strong>
                <span style="font-size:12px; color:#666">🕒 ${item.hora}</span>
            </div>
            <p style="margin-top:8px; font-size:14px; line-height:1.4">${item.itens}</p>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="screen" style="display:flex; background: #f9f9f9;">
            <header class="header">
                <button onclick="app.render('paciente')" style="background:none; border:none; color:white; font-size:20px;">←</button>
                <span><strong>Meu Plano Alimentar</strong></span>
                <span onclick="window.print()" style="font-size:18px">🖨️</span>
            </header>
            
            <div class="content">
                <div style="background:var(--primary); color:white; padding:15px; border-radius:15px; margin-bottom:20px">
                    <p style="font-size:12px">Nutricionista Responsável:</p>
                    <strong>Dr. Carlos Silva (CRN-4 12345)</strong>
                    <p style="font-size:12px; margin-top:5px">Objetivo: Controle de Hipertensão</p>
                </div>
                
                <h4 style="margin-bottom:15px">Refeições Diárias</h4>
                ${htmlDieta}
                
                <button onclick="app.render('paciente')" style="width:100%; margin-top:10px; background:#6c757d">Voltar ao Início</button>
            </div>
        </div>
      `;
    },

    

    renderDashboard(role) {
        const container = document.getElementById('app');
        const layouts = {
            paciente: `

                <div class="full-card card" onclick="app.renderPlanoAlimentar()" style="cursor:pointer; background: var(--primary); color: white;">
                    <h3>🍎 Ver Minha Dieta</h3>
                    <p>Atualizada em: 10/10/2026</p>
                </div>
                <div class="card"><h4>Próxima Consulta</h4><p>12/10 - 14h</p></div>
                <div class="card"><h4>Receitas</h4><p>Saudáveis e Baratas</p></div>`,

          
            nutri: `
                <div class="full-card card" onclick="app.renderAnamnese()" style="cursor:pointer; border: 2px solid var(--primary)">
                    <h3>➕ Nova Avaliação</h3>
                    <p>Clique para iniciar anamnese de paciente</p>
                </div>
                <div class="card"><h4>Agenda</h4><p>Ver pacientes de hoje</p></div>
                <div class="card"><h4>Suplementos</h4><p>Estoque Bacaxá</p></div>`,

            
            atendente: `
                <div class="full-card card"><h3>Novo Agendamento</h3><p>Clique para iniciar</p></div>
                <div class="card"><h4>Filas</h4><p>Posto Bacaxá</p></div>
                <div class="card"><h4>Validar SUS</h4><p>Leitor Ativo</p></div>`,
            admin: `
                <div class="full-card card"><h3>Painel Geral Saquarema</h3><p>Status da Rede de Saúde</p></div>
                <div class="card"><h4>Nutricionistas</h4><p>12 logados</p></div>
                <div class="card"><h4>Logs</h4><p>Ver sistema</p></div>`
        };

        container.innerHTML = `
            <div class="screen" style="display:flex">
                <header class="header">
                    <span><strong>Macrum</strong></span>
                    <span class="role-tag">${role.toUpperCase()}</span>
                    <button onclick="app.render('login')" style="padding:5px; background:none; font-size:12px">Sair</button>
                </header>
                <div class="content">
                    <h2 style="margin-bottom:20px">Olá, ${role}!</h2>
                    <div class="bento-grid">
                        ${layouts[role]}
                    </div>
                </div>
                <nav style="background:white; padding:15px; display:flex; justify-content:space-around; border-top:1px solid #ddd">
                    <span>🏠</span><span>📅</span><span>👤</span>
                </nav>
            </div>`;
    }
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker registrado!', reg))
      .catch(err => console.log('Falha ao registrar Service Worker', err));
  });
}


window.onload = () => app.init();
