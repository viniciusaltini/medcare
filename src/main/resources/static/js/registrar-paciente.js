async function registrarPaciente() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8080/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nomeUsuario: fullName,
                emailUsuario: email,
                senhaUsuario: password
            })
        });

        if (response.ok) {
            console.log("Usuário registrado com sucesso");
        } else {
            console.log("Usuário não registrado");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}