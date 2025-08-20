document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const logoutBtn = document.querySelector('.logout-btn');

    // Elementos do formulário de registro/edição de consulta
    const recordAppointmentForm = document.getElementById('recordAppointmentForm');
    const patientNameInput = document.getElementById('patientName');
    const consultationDateInput = document.getElementById('consultationDate');
    const consultationTimeInput = document.getElementById('consultationTime');
    const patientPhoneInput = document.getElementById('patientPhone');
    const mainComplaintInput = document.getElementById('mainComplaint');
    const diagnosisInput = document.getElementById('diagnosis');
    const medicationsInput = document.getElementById('medications');
    const observationsInput = document.getElementById('observations');
    const recordAppointmentBtn = document.getElementById('recordAppointmentBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const formTitle = document.getElementById('recordAppointmentTitle');

    // Elementos da Visão Geral
    const nextAppointmentSummaryText = document.querySelector('#overview > div:nth-child(2) > p'); // Elemento de texto da próxima consulta
    const viewNextAppointmentDetailsBtn = document.getElementById('viewNextAppointmentDetailsBtn'); // O botão "Ver Detalhes" na visão geral
    const todayAppointmentsCountElement = document.querySelector('#overview > div:nth-child(3) > p'); // Elemento de texto para o contador de hoje
    const viewAllTodayAppointmentsBtn = document.getElementById('viewAllTodayAppointmentsBtn'); // O novo botão "Ver Todas"

    let editingConsultationId = null; // Variável para armazenar o ID da consulta sendo editada
    let nextAppointmentId = null; // Variável para armazenar o ID da próxima consulta

    // Função para mostrar a seção ativa e esconder as outras
    const showSection = (targetId) => {
        contentSections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
        // Quando muda de seção, reseta o formulário de registro/edição
        if (targetId !== 'record-appointment') {
            resetRecordAppointmentForm();
        }
    };

    // Função para ativar o link de navegação correto
    const activateNavLink = (targetId) => {
        navLinks.forEach(link => {
            if (link.dataset.target === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    // Adiciona evento de clique aos links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o comportamento padrão do link
            const targetId = link.dataset.target; // Pega o ID da seção alvo
            showSection(targetId);
            activateNavLink(targetId);
        });
    });

    // Manipulador para o botão de "Sair"
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o comportamento padrão do link
            const confirmLogout = confirm('Tem certeza que deseja sair do painel?');
            if (confirmLogout) {
                window.location.href = 'doctor-login.html'; // Redireciona para a página de login
            }
        });
    }

    // Defina a data mínima para o campo de data de consulta
    if (consultationDateInput) {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
        const year = today.getFullYear();
        const minDate = `${year}-${month}-${day}`;
        consultationDateInput.setAttribute('min', minDate);
    }

    // --- Dados Simulados de Consultas ---
    let simulatedConsultations = [
        {
            id: 'c1',
            patientName: 'Maria Oliveira',
            date: '2025-08-10', // Data no futuro para ser "próxima"
            time: '14:00',
            phone: '(11) 98765-4321',
            status: 'completed',
            mainComplaint: 'Dor de cabeça persistente há 3 dias, acompanhada de sensibilidade à luz.',
            diagnosis: 'Cefaleia tensional. Descartado migrânea e outras causas neurológicas.',
            medications: 'Paracetamol 500mg, 1 comprimido a cada 6 horas se dor. Relaxante muscular 5mg à noite.',
            observations: 'Paciente orientada sobre hidratação e repouso. Retorno em 7 dias se sintomas persistirem. Sugerido evitar telas por longos períodos.'
        },
        {
            id: 'c2',
            patientName: 'João Pereira',
            date: '2025-07-30', // HOJE
            time: '15:00', // Já passou do horário atual, então não será a "próxima" se a hora for 15:55
            phone: '(21) 99876-5432',
            status: 'pending',
            mainComplaint: 'Febre alta (39°C), tosse seca e dor de garganta.',
            diagnosis: 'Infecção de vias aéreas superiores (IVAS), provavelmente viral.',
            medications: 'Dipirona 1g, 1 comprimido a cada 6 horas para febre/dor. Xarope para tosse (ambroxol) 5ml, 3x ao dia.',
            observations: 'Repouso, hidratação. Alerta para procurar PA se dificuldade respiratória. Exame de COVID-19 solicitado (resultado pendente).'
        },
        {
            id: 'c3',
            patientName: 'Beatriz Santos',
            date: '2025-07-30', // HOJE
            time: '16:30', // Próxima consulta (se a hora atual for 15:55)
            phone: '(31) 97654-3210',
            status: 'confirmed',
            mainComplaint: 'Dor abdominal no quadrante inferior direito, náuseas.',
            diagnosis: 'Gastrite leve, provável dispepsia funcional. Descartado apendicite por exame físico.',
            medications: 'Omeprazol 20mg, 1 comprimido antes do café da manhã por 14 dias. Buscopan para cólicas se necessário.',
            observations: 'Orientação dietética. Evitar alimentos gordurosos e condimentados. Acompanhamento clínico em 10 dias. Solicitação de endoscopia caso não haja melhora.'
        },
        {
            id: 'c4',
            patientName: 'Ana Souza',
            date: '2025-07-31', // Amanhã
            time: '09:00',
            phone: '(41) 96543-2109',
            status: 'canceled',
            mainComplaint: 'Queimação ao urinar, aumento da frequência urinária.',
            diagnosis: 'Infecção do Trato Urinário (ITU) não complicada.',
            medications: 'Ciprofloxacino 500mg, 1 comprimido a cada 12 horas por 7 dias. Analgésico urinário conforme necessidade.',
            observations: 'Hidratação abundante. Evitar reter urina. Retorno se não houver melhora em 48h. Cultura de urina solicitada.'
        },
        {
            id: 'c5',
            patientName: 'Carlos Lima',
            date: '2025-07-30', // HOJE
            time: '17:00', // Depois da Beatriz
            phone: '(51) 95432-1098',
            status: 'pending',
            mainComplaint: 'Dificuldade para dormir, ansiedade e palpitações.',
            diagnosis: 'Transtorno de ansiedade generalizada (TAG) leve.',
            medications: 'Fitoterápico calmante (Valeriana) 1 cápsula à noite. Orientação para higiene do sono.',
            observations: 'Sugestão de terapia cognitivo-comportamental. Avaliação psiquiátrica se sintomas se agravarem. Reavaliação em 3 semanas.'
        }
    ];

    // Mapeamento de status para classes CSS e texto amigável
    const statusMap = {
        'pending': { text: 'Pendente', class: 'pending' },
        'confirmed': { text: 'Confirmada', class: 'confirmed' },
        'completed': { text: 'Concluída', class: 'completed' },
        'canceled': { text: 'Cancelada', class: 'canceled' }
    };

    // Função para renderizar a tabela de consultas
    const renderConsultationsTable = () => {
        const tableBody = document.querySelector('.consultations-table tbody');
        tableBody.innerHTML = ''; // Limpa o corpo da tabela

        simulatedConsultations.forEach(consultation => {
            const row = document.createElement('tr');
            row.dataset.id = consultation.id; // Adiciona o ID ao dataset da linha

            const statusInfo = statusMap[consultation.status] || { text: 'Desconhecido', class: 'default' };

            row.innerHTML = `
                <td>${consultation.patientName}</td>
                <td>${consultation.date}</td>
                <td>${consultation.time}</td>
                <td><span class="status-badge ${statusInfo.class}">${statusInfo.text}</span></td>
                <td class="actions">
                    <button class="btn btn-primary btn-small view-btn" data-id="${consultation.id}"><i class="fas fa-eye"></i> Ver</button>
                    <button class="btn btn-secondary btn-small edit-btn" data-id="${consultation.id}"><i class="fas fa-edit"></i> Editar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        attachTableButtonListeners(); // Reanexa os event listeners
    };

    // --- Lógica do Modal de Detalhes da Consulta ---
    const viewAppointmentModal = document.getElementById('viewAppointmentModal');
    const closeModalButton = document.getElementById('closeModalButton');
    const closeButtonSpan = viewAppointmentModal ? viewAppointmentModal.querySelector('.close-button') : null; // O "x" no canto

    const modalPatientName = document.getElementById('modalPatientName');
    const modalConsultationDate = document.getElementById('modalConsultationDate');
    const modalConsultationTime = document.getElementById('modalConsultationTime');
    const modalPatientPhone = document.getElementById('modalPatientPhone');
    const modalConsultationStatus = document.getElementById('modalConsultationStatus');
    const modalMainComplaint = document.getElementById('modalMainComplaint');
    const modalDiagnosis = document.getElementById('modalDiagnosis');
    const modalMedications = document.getElementById('modalMedications');
    const modalObservations = document.getElementById('modalObservations');
    const editModalButton = document.getElementById('editModalButton');

    // Função para abrir o modal e preencher com dados
    const openViewAppointmentModal = (consultationId) => {
        const consultation = simulatedConsultations.find(c => c.id === consultationId);
        if (consultation) {
            modalPatientName.textContent = consultation.patientName;
            modalConsultationDate.textContent = consultation.date;
            modalConsultationTime.textContent = consultation.time;
            modalPatientPhone.textContent = consultation.phone;
            
            const statusInfo = statusMap[consultation.status] || { text: 'Desconhecido', class: 'default' };
            modalConsultationStatus.textContent = statusInfo.text;
            modalConsultationStatus.className = `status-badge ${statusInfo.class}`; // Garante que a classe CSS do status seja aplicada

            modalMainComplaint.textContent = consultation.mainComplaint || 'N/A';
            modalDiagnosis.textContent = consultation.diagnosis || 'N/A';
            modalMedications.textContent = consultation.medications || 'Nenhum medicamento prescrito.';
            modalObservations.textContent = consultation.observations || 'Sem observações adicionais.';

            editModalButton.dataset.id = consultation.id; // Anexa o ID para o botão Editar do modal
            viewAppointmentModal.classList.add('active'); // Mostra o modal
        }
    };

    // Função para fechar o modal
    const closeViewAppointmentModal = () => {
        viewAppointmentModal.classList.remove('active');
    };

    // Event listeners para fechar o modal
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeViewAppointmentModal);
    }
    if (closeButtonSpan) {
        closeButtonSpan.addEventListener('click', closeViewAppointmentModal);
    }
    window.addEventListener('click', (event) => {
        if (event.target === viewAppointmentModal) {
            closeViewAppointmentModal();
        }
    });

    // --- Lógica de Edição de Consulta ---

    // Função para pré-preencher o formulário com dados de uma consulta
    const populateRecordFormForEdit = (consultation) => {
        editingConsultationId = consultation.id;
        formTitle.textContent = 'Editar Consulta'; // Muda o título do formulário
        recordAppointmentBtn.textContent = 'Salvar Alterações'; // Muda o texto do botão
        recordAppointmentBtn.classList.remove('btn-primary');
        recordAppointmentBtn.classList.add('btn-success');
        cancelEditBtn.style.display = 'inline-block'; // Mostra o botão de cancelar

        patientNameInput.value = consultation.patientName;
        consultationDateInput.value = consultation.date;
        consultationTimeInput.value = consultation.time;
        patientPhoneInput.value = consultation.phone;
        mainComplaintInput.value = consultation.mainComplaint;
        diagnosisInput.value = consultation.diagnosis;
        medicationsInput.value = consultation.medications;
        observationsInput.value = consultation.observations;
    };

    // Função para resetar o formulário e voltar ao modo de "Registrar Nova"
    const resetRecordAppointmentForm = () => {
        editingConsultationId = null;
        formTitle.textContent = 'Registrar Nova Consulta';
        recordAppointmentBtn.textContent = 'Registrar Consulta';
        recordAppointmentBtn.classList.remove('btn-success');
        recordAppointmentBtn.classList.add('btn-primary');
        cancelEditBtn.style.display = 'none';
        recordAppointmentForm.reset();
    };

    // Event listener para o botão "Cancelar Edição"
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', resetRecordAppointmentForm);
    }

    // Manipulador do formulário de registro/edição
    if (recordAppointmentForm) {
        recordAppointmentForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const newConsultationData = {
                patientName: patientNameInput.value,
                date: consultationDateInput.value,
                time: consultationTimeInput.value,
                phone: patientPhoneInput.value,
                mainComplaint: mainComplaintInput.value,
                diagnosis: diagnosisInput.value,
                medications: medicationsInput.value,
                observations: observationsInput.value,
                status: 'confirmed' // Define um status padrão para novas/editadas, ou use um campo no form
            };

            if (editingConsultationId) {
                // Modo de Edição
                const index = simulatedConsultations.findIndex(c => c.id === editingConsultationId);
                if (index !== -1) {
                    simulatedConsultations[index] = { ...simulatedConsultations[index], ...newConsultationData };
                    alert('Consulta atualizada com sucesso!');
                } else {
                    alert('Erro: Consulta não encontrada para edição.');
                }
            } else {
                // Modo de Registro de Nova Consulta
                // Gera um ID simples. Em um sistema real, o ID viria do banco de dados.
                newConsultationData.id = 'c' + (simulatedConsultations.length + 1); 
                simulatedConsultations.push(newConsultationData);
                alert('Nova consulta registrada com sucesso!');
            }

            renderConsultationsTable(); // Atualiza a tabela
            updateOverviewCounts(); // Atualiza a visão geral
            resetRecordAppointmentForm(); // Limpa e reseta o formulário
            showSection('appointments'); // Volta para a lista de consultas após registrar/editar
            activateNavLink('appointments');
        });
    }

    // Anexa event listeners para os botões da tabela (View e Edit)
    const attachTableButtonListeners = () => {
        // Remover listeners antigos para evitar duplicação (importante ao renderizar novamente a tabela)
        document.querySelectorAll('.consultations-table .actions .view-btn').forEach(button => {
            const oldClickListener = button._clickListener; // Recupera listener anterior
            if (oldClickListener) {
                button.removeEventListener('click', oldClickListener);
            }
            const newClickListener = (event) => {
                openViewAppointmentModal(event.currentTarget.dataset.id);
            };
            button.addEventListener('click', newClickListener);
            button._clickListener = newClickListener; // Armazena o listener
        });

        document.querySelectorAll('.consultations-table .actions .edit-btn').forEach(button => {
            const oldClickListener = button._clickListener;
            if (oldClickListener) {
                button.removeEventListener('click', oldClickListener);
            }
            const newClickListener = (event) => {
                const consultationId = event.currentTarget.dataset.id;
                const consultationToEdit = simulatedConsultations.find(c => c.id === consultationId);
                if (consultationToEdit) {
                    populateRecordFormForEdit(consultationToEdit);
                    showSection('record-appointment');
                    activateNavLink('record-appointment');
                } else {
                    alert('Erro: Consulta não encontrada para edição.');
                }
            };
            button.addEventListener('click', newClickListener);
            button._clickListener = newClickListener;
        });
    };

    // Event listener para o botão "Editar Consulta" dentro do modal
    if (editModalButton) {
        editModalButton.addEventListener('click', (event) => {
            const consultationId = event.currentTarget.dataset.id;
            const consultationToEdit = simulatedConsultations.find(c => c.id === consultationId);
            if (consultationToEdit) {
                closeViewAppointmentModal(); // Fecha o modal de visualização
                populateRecordFormForEdit(consultationToEdit);
                showSection('record-appointment');
                activateNavLink('record-appointment');
            } else {
                alert('Erro: Consulta não encontrada para edição.');
            }
        });
    }

    // --- Lógica de Visão Geral (Overview) ---

    // Função para atualizar os contadores e a próxima consulta na Visão Geral
    const updateOverviewCounts = () => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Apenas data, sem hora

        let consultationsTodayCount = 0;
        let nextAppointment = null;
        let minTimeDiff = Infinity; // Diferença de tempo mínima para encontrar a próxima consulta

        simulatedConsultations.forEach(c => {
            const consultationDateTime = new Date(c.date + 'T' + c.time); // Combina data e hora para um objeto Date

            // Verifica se a consulta é para hoje
            if (consultationDateTime.toDateString() === today.toDateString()) {
                // Conta apenas consultas confirmadas ou pendentes para "Consultas Agendadas Hoje"
                if (c.status === 'confirmed' || c.status === 'pending') {
                    consultationsTodayCount++;
                }

                // Encontra a próxima consulta do dia (apenas se for HOJE e no FUTURO)
                if (consultationDateTime > now) { // Verifica se a consulta ainda não passou
                    const timeDiff = consultationDateTime.getTime() - now.getTime();
                    if (timeDiff < minTimeDiff) {
                        minTimeDiff = timeDiff;
                        nextAppointment = c;
                    }
                }
            }
        });

        // Atualiza o card de "Próxima Consulta"
        if (nextAppointment) {
            nextAppointmentSummaryText.textContent = `Paciente: ${nextAppointment.patientName} - ${nextAppointment.time}`;
            nextAppointmentId = nextAppointment.id; // Armazena o ID da próxima consulta
            viewNextAppointmentDetailsBtn.style.display = 'inline-flex'; // Mostra o botão
        } else {
            nextAppointmentSummaryText.textContent = 'Nenhuma próxima consulta agendada para hoje.';
            nextAppointmentId = null; // Reseta o ID
            viewNextAppointmentDetailsBtn.style.display = 'none'; // Esconde o botão se não houver próxima consulta
        }
        
        // Atualiza o card de "Consultas Agendadas Hoje"
        if (todayAppointmentsCountElement) {
             todayAppointmentsCountElement.textContent = `${consultationsTodayCount} Consultas`;
        }

        // Se não houver consultas agendadas para hoje, esconde o botão "Ver Todas"
        if (viewAllTodayAppointmentsBtn) {
            if (consultationsTodayCount > 0) {
                viewAllTodayAppointmentsBtn.style.display = 'inline-flex';
            } else {
                viewAllTodayAppointmentsBtn.style.display = 'none';
            }
        }
    };

    // Event listener para o botão "Ver Detalhes" na Visão Geral
    if (viewNextAppointmentDetailsBtn) {
        viewNextAppointmentDetailsBtn.addEventListener('click', () => {
            if (nextAppointmentId) {
                openViewAppointmentModal(nextAppointmentId);
            } else {
                alert('Nenhuma próxima consulta para ver detalhes.');
            }
        });
    }

    // Event listener para o botão "Ver Todas" na Visão Geral
    if (viewAllTodayAppointmentsBtn) {
        viewAllTodayAppointmentsBtn.addEventListener('click', () => {
            showSection('appointments'); // Muda para a seção de "Minhas Consultas"
            activateNavLink('appointments'); // Ativa o link na sidebar
            // Futuramente, se houver filtros na tabela de consultas, você poderia aplicar um filtro "somente hoje" aqui.
        });
    }


    // --- Inicialização ao carregar a página ---
    renderConsultationsTable(); // Renderiza a tabela de consultas ao carregar
    updateOverviewCounts(); // Atualiza os dados da visão geral
    showSection('overview'); // Mostra a seção de visão geral por padrão
    activateNavLink('overview');
});