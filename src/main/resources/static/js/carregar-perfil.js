// carregar-perfil.js - Versão Final
class PerfilUsuario {
    constructor() {
        this.dadosOriginais = null;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.configurarEventos();
            // Carrega dados salvos se existirem
            const savedData = this.obterDadosUsuario();
            if (savedData) {
                this.preencherFormulario(savedData);
            }
        });
    }

    async carregarDadosPerfil() {
        try {
            this.mostrarLoading(true);
            
            const response = await fetch("http://localhost:8080/usuarios/atual", {
                credentials: "include"
            });
            
            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }
            
            const userData = await response.json();
            
            if (userData.autenticado) {
                this.preencherFormulario(userData);
                this.salvarDadosUsuario(userData);
            }
            
        } catch (error) {
            console.error("Erro ao carregar perfil:", error);
        } finally {
            this.mostrarLoading(false);
        }
    }

    preencherFormulario(dados) {
        // Campos não editáveis
        if (dados.nomeUsuario) {
            document.getElementById('profileName').value = dados.nomeUsuario;
        }
        if (dados.emailUsuario) {
            document.getElementById('profileEmail').value = dados.emailUsuario;
        }
        
        // Campos editáveis
        if (dados.dataNascimentoUsuario) {
            document.getElementById('profileBirthdate').value = dados.dataNascimentoUsuario;
        }
        if (dados.pesoUsuario !== null && dados.pesoUsuario !== undefined) {
            document.getElementById('profileWeight').value = dados.pesoUsuario;
        }
        if (dados.alturaUsuario !== null && dados.alturaUsuario !== undefined) {
            document.getElementById('profileHeight').value = dados.alturaUsuario;
        }
        
        this.dadosOriginais = { ...dados };
        this.desabilitarEdicao(); // Garante que começa em modo visualização
    }

    configurarEventos() {
        // Botão editar
        document.getElementById('editProfileBtn').addEventListener('click', () => {
            this.habilitarEdicao();
        });
        
        // Botão cancelar
        document.getElementById('cancelProfileBtn').addEventListener('click', () => {
            this.cancelarEdicao();
        });
        
        // Botão salvar
        document.getElementById('profileForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.salvarAlteracoes();
        });
        
        // Quando a seção de perfil é aberta
        const perfilLink = document.querySelector('a[data-section="my-profile"]');
        if (perfilLink) {
            perfilLink.addEventListener('click', () => {
                this.carregarDadosPerfil();
            });
        }
    }

    habilitarEdicao() {
        // Habilita apenas campos editáveis
        const camposEditaveis = ['profileBirthdate', 'profileWeight', 'profileHeight'];
        camposEditaveis.forEach(id => {
            document.getElementById(id).readOnly = false;
        });
        
        this.toggleBotoesEdicao(true);
    }

    cancelarEdicao() {
        if (this.dadosOriginais) {
            this.preencherFormulario(this.dadosOriginais);
        }
        this.desabilitarEdicao();
    }

    desabilitarEdicao() {
        // Todos os campos ficam readonly
        const todosCampos = document.querySelectorAll('#profileForm input');
        todosCampos.forEach(campo => {
            campo.readOnly = true;
        });
        this.toggleBotoesEdicao(false);
    }

    toggleBotoesEdicao(editando) {
        document.getElementById('editProfileBtn').style.display = editando ? 'none' : 'block';
        document.getElementById('saveProfileBtn').style.display = editando ? 'block' : 'none';
        document.getElementById('cancelProfileBtn').style.display = editando ? 'block' : 'none';
    }

    async salvarAlteracoes() {
        try {
            const formData = new FormData(document.getElementById('profileForm'));
            const dadosAtualizados = {
                dataNascimentoUsuario: formData.get('dataNascimentoUsuario'),
                pesoUsuario: formData.get('pesoUsuario') ? parseFloat(formData.get('pesoUsuario')) : null,
                alturaUsuario: formData.get('alturaUsuario') ? parseFloat(formData.get('alturaUsuario')) : null
            };

            const response = await fetch("http://localhost:8080/usuarios", {
                method: "PUT",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosAtualizados)
            });
            
            if (response.ok) {
                this.mostrarMensagemSucesso("Dados salvos com sucesso!");
                this.desabilitarEdicao();
                // Recarrega dados atualizados
                await this.carregarDadosPerfil();
            } else {
                throw new Error("Erro ao salvar");
            }
            
        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro ao salvar dados. Tente novamente.");
        }
    }

    // Funções auxiliares
    mostrarLoading(mostrar) {
        document.getElementById('profileLoading').style.display = mostrar ? 'block' : 'none';
    }
    
    mostrarMensagemSucesso(mensagem) {
        alert(mensagem); // Pode substituir por um toast mais elegante
    }
    
    salvarDadosUsuario(dados) {
        sessionStorage.setItem('userProfileData', JSON.stringify(dados));
    }
    
    obterDadosUsuario() {
        const dados = sessionStorage.getItem('userProfileData');
        return dados ? JSON.parse(dados) : null;
    }
}

// Inicializa automaticamente
new PerfilUsuario();