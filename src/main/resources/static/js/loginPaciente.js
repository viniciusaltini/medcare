document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio real do formulário

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const loginMessage = document.getElementById('loginMessage');

            // Limpa mensagens anteriores
            loginMessage.style.display = 'none';
            loginMessage.className = 'form-message';

            // Simulação de validação e login
            if (!email || !password) {
                loginMessage.textContent = 'Por favor, preencha todos os campos.';
                loginMessage.classList.add('error');
                loginMessage.style.display = 'block';
                return;
            }

            // Simulação de credenciais
            const simulatedUser = {
                email: 'paciente@medcare.com',
                password: 'senha123'
            };

            if (email === simulatedUser.email && password === simulatedUser.password) {
                loginMessage.textContent = `Login bem-sucedido! Bem-vindo(a), ${email}.`;
                loginMessage.classList.add('success');
                loginMessage.style.display = 'block';

                console.log('Login simulado:', { email, password });

                // ** ADICIONE ESTA LINHA AQUI: **
                sessionStorage.setItem('medcarePatientLoggedIn', 'true');

                // Em um cenário real, redirecionaria para o dashboard do paciente
                setTimeout(() => {
                    window.location.href = 'patient-dashboard.html'; 
                }, 2000);

            } else {
                loginMessage.textContent = 'E-mail ou senha incorretos.';
                loginMessage.classList.add('error');
                loginMessage.style.display = 'block';
            }
        });
