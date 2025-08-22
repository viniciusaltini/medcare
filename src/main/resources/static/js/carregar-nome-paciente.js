// carregar-nome-paciente.js - Versão Mínima
async function carregarNomeUsuario() {
    try {
        const response = await fetch("http://localhost:8080/usuarios/atual", {
            credentials: "include"
        });
        
        if (response.ok) {
            const userData = await response.json();
            if (userData.autenticado && userData.nomeUsuario) {
                // Atualiza ambos os lugares onde o nome aparece
                document.getElementById("usernameDisplay").textContent = userData.nomeUsuario;
                document.getElementById("headerPatientName").textContent = userData.nomeUsuario;
                
                // Salva para não precisar buscar novamente
                sessionStorage.setItem("username", userData.nomeUsuario);
            }
        }
    } catch (error) {
        console.log("Não foi possível carregar o nome do usuário");
    }
}

// Carrega o nome salvo se existir
const savedName = sessionStorage.getItem("username");
if (savedName) {
    document.getElementById("usernameDisplay").textContent = savedName;
    document.getElementById("headerPatientName").textContent = savedName;
}

// Busca dados atualizados
document.addEventListener('DOMContentLoaded', carregarNomeUsuario);