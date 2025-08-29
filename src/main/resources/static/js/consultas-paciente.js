// consultas-paciente.js
// Gerencia a seção "Minhas Consultas" do dashboard

// Variável global para armazenar as consultas
let userAppointments = [];

// Função para carregar consultas do usuário
async function carregarConsultasUsuario() {
    const tableBody = document.querySelector('#my-appointments .data-table tbody');
    
    if (!tableBody) {
        console.error('Tabela de consultas não encontrada');
        return;
    }
    
    // Mostra loading
    tableBody.innerHTML = `
        <tr>
            <td colspan="6" style="text-align: center; padding: 20px;">
                <i class="fas fa-spinner fa-spin"></i> Carregando suas consultas...
            </td>
        </tr>
    `;

    try {
        // Busca o ID do usuário atual
        let pacienteId = null;
        try {
            const userResp = await fetch('http://localhost:8080/usuarios/atual', { 
                credentials: 'include' 
            });
            if (userResp.ok) {
                const userData = await userResp.json();
                pacienteId = userData.idUsuario || userData.id_usuarios || userData.id;
                console.log('ID do paciente:', pacienteId);
            }
        } catch (e) {
            console.error('Erro ao obter ID do usuário:', e);
            throw new Error('Não foi possível identificar o usuário');
        }

        if (!pacienteId) {
            throw new Error('Usuário não identificado');
        }

        // Busca as consultas do usuário
        const response = await fetch(`http://localhost:8080/agendamentos/usuario/${pacienteId}`);
        
        if (!response.ok) {
            throw new Error(`Erro ao buscar consultas: ${response.status}`);
        }

        const consultas = await response.json();
        userAppointments = consultas;
        
        console.log('Consultas carregadas:', consultas);
        
        // Renderiza a tabela
        renderizarTabelaConsultas(consultas);
        
    } catch (error) {
        console.error('Erro ao carregar consultas:', error);
        const tableBody = document.querySelector('#my-appointments .data-table tbody');
        if (tableBody) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 20px; color: var(--danger-red);">
                        <i class="fas fa-exclamation-triangle"></i> ${error.message}
                        <br>
                        <button onclick="carregarConsultasUsuario()" class="btn btn-small btn-primary" style="margin-top: 10px;">
                            <i class="fas fa-redo"></i> Tentar novamente
                        </button>
                    </td>
                </tr>
            `;
        }
    }
}

// Função para renderizar a tabela com as consultas
function renderizarTabelaConsultas(consultas) {
    const tableBody = document.querySelector('#my-appointments .data-table tbody');
    if (!tableBody) return;

    const statusFilter = document.getElementById('statusFilter');
    const searchInput = document.getElementById('searchAppointments');
    
    const statusFilterValue = statusFilter ? statusFilter.value : 'all';
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

    // Filtra as consultas
    const consultasFiltradas = consultas.filter(consulta => {
        const medicoNome = consulta.medico?.nomeMedico || consulta.medico?.nome_medico || '';
        const especialidade = consulta.medico?.especialidade || '';
        const statusConsulta = getStatusConsulta(consulta);
        
        const matchesStatus = statusFilterValue === 'all' || statusFilterValue === statusConsulta;
        const matchesSearch = medicoNome.toLowerCase().includes(searchTerm) || 
                             especialidade.toLowerCase().includes(searchTerm);
        
        return matchesStatus && matchesSearch;
    });

    tableBody.innerHTML = '';

    if (consultasFiltradas.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 20px; color: var(--text-light);">
                    <i class="fas fa-calendar-times"></i><br>
                    ${consultas.length === 0 ? 'Nenhuma consulta encontrada' : 'Nenhuma consulta corresponde aos filtros'}
                </td>
            </tr>
        `;
        return;
    }

    // Ordena por data (mais recente primeiro)
    consultasFiltradas.sort((a, b) => new Date(b.dataAgendamento) - new Date(a.dataAgendamento));

    consultasFiltradas.forEach(consulta => {
        const row = document.createElement('tr');
        
        const medicoNome = consulta.medico?.nomeMedico || consulta.medico?.nome_medico || 'Médico não informado';
        const especialidade = consulta.medico?.especialidade || 'Especialidade não informada';
        const dataConsulta = new Date(consulta.dataAgendamento);
        const dataFormatada = dataConsulta.toLocaleDateString('pt-BR');
        const horaFormatada = dataConsulta.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        const status = getStatusConsulta(consulta);
        const statusText = getStatusText(status);
        
        let actionsHtml = `
            <button class="btn btn-primary btn-small view-details-btn" data-appointment-id="${consulta.idAgendamento}">
                <i class="fas fa-eye"></i> Ver
            </button>
        `;
        
        // Só mostra botões de ação para consultas futuras
        if (status === 'confirmed' || status === 'pending') {
            actionsHtml += `
                <button class="btn btn-secondary btn-small reschedule-btn" data-appointment-id="${consulta.idAgendamento}">
                    <i class="fas fa-edit"></i> Remarcar
                </button>
                <button class="btn btn-danger btn-small cancel-btn" data-appointment-id="${consulta.idAgendamento}">
                    <i class="fas fa-times"></i> Cancelar
                </button>
            `;
        }

        row.innerHTML = `
            <td data-label="Médico">${medicoNome}</td>
            <td data-label="Data">${dataFormatada}</td>
            <td data-label="Horário">${horaFormatada}</td>
            <td data-label="Especialidade">${especialidade}</td>
            <td data-label="Status">
                <span class="status-badge ${status}">${statusText}</span>
            </td>
            <td data-label="Ações" class="actions">${actionsHtml}</td>
        `;
        
        tableBody.appendChild(row);
    });

    // Adiciona os event listeners aos botões
    adicionarEventListenersTabela();
}

// Função para determinar o status da consulta
function getStatusConsulta(consulta) {
    const agora = new Date();
    const dataConsulta = new Date(consulta.dataAgendamento);
    
    if (dataConsulta < agora) {
        return 'completed';
    } else {
        return 'pending';
    }
}

// Função para obter texto do status
function getStatusText(status) {
    const statusMap = {
        'confirmed': 'Confirmada',
        'pending': 'Pendente',
        'completed': 'Concluída',
        'canceled': 'Cancelada'
    };
    return statusMap[status] || 'Desconhecido';
}

// Função para adicionar event listeners aos botões da tabela
function adicionarEventListenersTabela() {
    // Botão Ver Detalhes
    document.querySelectorAll('.view-details-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const consultaId = e.currentTarget.dataset.appointmentId;
            abrirModalDetalhesConsulta(consultaId);
        });
    });
    
    // Botão Remarcar
    document.querySelectorAll('.reschedule-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const consultaId = e.currentTarget.dataset.appointmentId;
            alert(`Funcionalidade de remarcação para consulta ${consultaId} será implementada em breve.`);
        });
    });
    
    // Botão Cancelar
    document.querySelectorAll('.cancel-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const consultaId = e.currentTarget.dataset.appointmentId;
            cancelarConsulta(consultaId);
        });
    });
}

// Função para abrir modal de detalhes
function abrirModalDetalhesConsulta(consultaId) {
    const consulta = userAppointments.find(c => c.idAgendamento == consultaId);
    
    if (consulta) {
        const medicoNome = consulta.medico?.nomeMedico || 'Médico não informado';
        const dataConsulta = new Date(consulta.dataAgendamento);
        const dataFormatada = dataConsulta.toLocaleDateString('pt-BR');
        const horaFormatada = dataConsulta.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        const especialidade = consulta.medico?.especialidade || 'Especialidade não informada';
        const tipoConsulta = consulta.tipoConsulta ? 'Presencial' : 'Online';
        
        const status = getStatusConsulta(consulta);
        const statusText = getStatusText(status);
        
        // Preenche a modal
        document.getElementById('modalDoctorName').textContent = medicoNome;
        document.getElementById('modalAppointmentDate').textContent = dataFormatada;
        document.getElementById('modalAppointmentTime').textContent = horaFormatada;
        document.getElementById('modalSpecialty').textContent = especialidade;
        document.getElementById('modalAppointmentType').textContent = tipoConsulta;
        document.getElementById('modalReason').textContent = consulta.motivoConsulta || 'Não informado';
        document.getElementById('modalDoctorNotes').textContent = consulta.anamnese || 'Nenhuma observação';
        document.getElementById('modalPrescription').textContent = 'Não disponível';
        
        const statusElem = document.getElementById('modalStatus');
        statusElem.className = `status-badge ${status}`;
        statusElem.textContent = statusText;
        
        // Mostra a modal
        const modal = document.getElementById('appointmentDetailsModal');
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

// Função para fechar modal
function fecharModalDetalhesConsulta() {
    const modal = document.getElementById('appointmentDetailsModal');
    modal.classList.remove('show');
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Função para cancelar consulta
async function cancelarConsulta(consultaId) {
    if (!confirm('Tem certeza que deseja cancelar esta consulta?')) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/agendamentos/${consultaId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Consulta cancelada com sucesso!');
            carregarConsultasUsuario();
        } else if (response.status === 404) {
            throw new Error('Consulta não encontrada');
        } else {
            throw new Error('Erro ao cancelar consulta');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao cancelar consulta: ' + error.message);
    }
}

// Inicializa os event listeners para consultas
function inicializarConsultas() {
    console.log('Inicializando módulo de consultas...');
    
    // Filtros
    const statusFilter = document.getElementById('statusFilter');
    const searchInput = document.getElementById('searchAppointments');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', () => {
            if (userAppointments.length > 0) {
                renderizarTabelaConsultas(userAppointments);
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            if (userAppointments.length > 0) {
                renderizarTabelaConsultas(userAppointments);
            }
        });
    }
    
    // Botão de fechar modal
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', fecharModalDetalhesConsulta);
    }
    
    // Fechar modal clicando fora
    const modal = document.getElementById('appointmentDetailsModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                fecharModalDetalhesConsulta();
            }
        });
    }
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            fecharModalDetalhesConsulta();
        }
    });
    
    console.log('Módulo de consultas inicializado');
}

// Exporta as funções principais para uso global
window.carregarConsultasUsuario = carregarConsultasUsuario;
window.fecharModalDetalhesConsulta = fecharModalDetalhesConsulta;

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', inicializarConsultas);