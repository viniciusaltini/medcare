// carregar-usuario.js
async function carregarUsuario() {
    try {
        const response = await fetch("http://localhost:8080/api/usuario-atual", {
            credentials: "include"
        });
        
        const userData = await response.json();
        
        if (userData.autenticado) {
            sessionStorage.setItem('userData', JSON.stringify(userData));
            
            if (userData.tipo === 'MEDICO') {
                carregarDashboardMedico(userData);
            } else if (userData.tipo === 'PACIENTE') {
                carregarDashboardPaciente(userData);
            }
        } else {
            window.location.href = '/html/entrar.html';
        }
    } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        window.location.href = '/html/entrar.html';
    }
}

function carregarDashboardMedico(medicoData) {
    console.log("Carregando dashboard médico:", medicoData);
    // Sua lógica para médico
}

function carregarDashboardPaciente(pacienteData) {
    console.log("Carregando dashboard paciente:", pacienteData);
    // Sua lógica para paciente
}