const user = JSON.parse(localStorage.getItem("usuario_logado"));

if (!user || user.role !== "paciente") {
    window.location.href = "index.html";
}

function logout() {
    // limpa sessão
    localStorage.removeItem("usuario_logado");
    localStorage.removeItem("login_time");

    // redireciona para login
    window.location.href = "index.html";
}