document.getElementById('registerForm').addEventListener('submit', async function(event) {
          event.preventDefault(); // Impede o envio real do formulário

          const fullName = document.getElementById('fullName').value;
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          const confirmPassword = document.getElementById('confirmPassword').value;
          const registerMessage = document.getElementById('registerMessage');

            if (password !== confirmPassword) {
              registerMessage.textContent = 'As senhas não coincidem.';
              registerMessage.classList.add('error');
              registerMessage.style.display = 'block';
              return;
          }
          

          const response = await fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nomeUsuario: fullName,
            emailUsuario: email,
            senhaUsuario: password
         })
        });

          // Limpa mensagens anteriores
          registerMessage.style.display = 'none';
          registerMessage.className = 'form-message'; // Remove classes de estilo

          // Simulação de validação
          if (!fullName || !email || !password || !confirmPassword) {
              registerMessage.textContent = 'Por favor, preencha todos os campos.';
              registerMessage.classList.add('error');
              registerMessage.style.display = 'block';
              return;
          }

          if (password.length < 6) {
              registerMessage.textContent = 'A senha deve ter no mínimo 6 caracteres.';
              registerMessage.classList.add('error');
              registerMessage.style.display = 'block';
              return;
          }

          if (password !== confirmPassword) {
              registerMessage.textContent = 'As senhas não coincidem.';
              registerMessage.classList.add('error');
              registerMessage.style.display = 'block';
              return;
          }

          // Simulação de registro bem-sucedido
          registerMessage.textContent = `Conta 
		  para "${fullName}" criada com sucesso! Você será redirecionado para o login.`;
          registerMessage.classList.add('success');
          registerMessage.style.display = 'block';

          // Redireciona para a página de login após 3 segundos (simulando um processo)
          setTimeout(() => {
              window.location.href = 'loginPaciente.html'; // Redireciona para a página de login (que ainda criaremos)
          }, 3000);
      });