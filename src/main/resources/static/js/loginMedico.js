document.addEventListener('DOMContentLoaded', () => {
            const loginForm = document.getElementById('doctorLoginForm');
            const loginMessage = document.getElementById('loginMessage');

            if (loginForm) {
                loginForm.addEventListener('submit', (event) => {
                    event.preventDefault(); // Impede o envio real do formulário

                    const username = document.getElementById('username').value;
                    const password = document.getElementById('password').value;

                    // Lógica de simulação de login
                    // Em um sistema real, aqui você faria uma requisição para o backend
                    if (username === 'medico' && password === '123') {
                        loginMessage.textContent = 'Login bem-sucedido! Redirecionando para o painel...';
                        loginMessage.className = 'message success';
                        loginMessage.style.display = 'block';
                        // Simula o redirecionamento após 1.5 segundos
                        setTimeout(() => {
                            window.location.href = 'doctor-dashboard.html'; // Redireciona para o painel
                        }, 1500);
                    } else {
                        loginMessage.textContent = 'Usuário ou senha incorretos. Tente novamente.';
                        loginMessage.className = 'message error';
                        loginMessage.style.display = 'block';
                    }
                });
            }
        });