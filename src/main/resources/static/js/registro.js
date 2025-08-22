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
          

          // Limpa mensagens anteriores
          registerMessage.style.display = 'none';
          registerMessage.className = 'form-message'; // Remove classes de estilo

          

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