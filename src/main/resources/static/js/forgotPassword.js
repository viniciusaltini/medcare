document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
           event.preventDefault(); // Impede o envio real do formulário

           const email = document.getElementById('email').value;
           const messageDiv = document.getElementById('forgotPasswordMessage');

           messageDiv.style.display = 'none'; // Esconde mensagens anteriores
           messageDiv.className = 'form-message'; // Reseta classes

           if (!email) {
               messageDiv.textContent = 'Por favor, informe seu e-mail.';
               messageDiv.classList.add('error');
               messageDiv.style.display = 'flex';
               void messageDiv.offsetWidth; // Força reflow
               messageDiv.classList.add('show');
               return;
           }

           // Simulação de envio de e-mail
           // Em um sistema real, aqui você faria uma requisição para um backend
           // que enviaria o e-mail de recuperação de senha.

           messageDiv.textContent = `Se as informações estiverem corretas, instruções foram enviadas para ${email}.`;
           messageDiv.classList.add('success');
           messageDiv.style.display = 'flex';
           void messageDiv.offsetWidth; // Força reflow
           messageDiv.classList.add('show');
           
           // Limpa o campo após o "envio"
           document.getElementById('email').value = '';

           // Esconde a mensagem após 5 segundos
           setTimeout(() => {
               messageDiv.classList.remove('show');
               setTimeout(() => { messageDiv.style.display = 'none'; }, 500);
           }, 5000);

           console.log('Simulação de recuperação de senha para:', email);
       });