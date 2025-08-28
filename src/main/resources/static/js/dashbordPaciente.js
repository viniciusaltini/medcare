document.addEventListener('DOMContentLoaded', () => {
           const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
           const contentSections = document.querySelectorAll('.content-section');
           const currentSectionTitle = document.getElementById('currentSectionTitle');
           const logoutButton = document.getElementById('logoutButton');
           const scheduleAppointmentForm = document.getElementById('scheduleAppointmentForm');
           const scheduleMessage = document.getElementById('scheduleMessage');
           const profileForm = document.getElementById('profileForm');
           const editProfileBtn = document.getElementById('editProfileBtn');
           const saveProfileBtn = document.getElementById('saveProfileBtn');
           const cancelProfileBtn = document.getElementById('cancelProfileBtn');
           const profileInputs = profileForm.querySelectorAll('input:not(#profileName):not(#profileEmail), textarea');
           
           carregarMedicos();

           // Elementos para o nome dinâmico
           const sidebarPatientName = document.getElementById('sidebarPatientName');
           const headerPatientName = document.getElementById('headerPatientName');

           // --- Lógica para o nome do paciente dinâmico ---
           if (window.currentPatientName) {
               sidebarPatientName.textContent = `Olá, ${window.currentPatientName.split(' ')[0]}!`; // Apenas o primeiro nome
               headerPatientName.textContent = window.currentPatientName;
               document.getElementById('profileName').value = window.currentPatientName; // Atualiza o campo no perfil
           }


           // --- Funções Auxiliares ---

           // Função para exibir uma seção e atualizar o título no cabeçalho
           const showSection = (sectionId) => {
               // Esconde todas as seções de conteúdo
               contentSections.forEach(section => {
                   section.style.display = 'none'; 
                   section.classList.remove('active'); 
               });
               
               // Esconde todas as modais abertas
               document.querySelectorAll('.modal').forEach(modal => {
                   modal.classList.remove('show');
                   modal.style.display = 'none';
               });

               const activeSection = document.getElementById(sectionId);
               if (activeSection) {
                   activeSection.style.display = 'block'; 
                   activeSection.classList.add('active'); 
                   currentSectionTitle.textContent = activeSection.querySelector('h2') ? activeSection.querySelector('h2').textContent : 'Dashboard';
               }
           };

           // Função para ativar o link correspondente na sidebar e atualizar o título (pode ser redundante com showSection, mas mantém a lógica de nav)
           const activateNavLink = (sectionId) => {
               sidebarLinks.forEach(link => link.classList.remove('active')); // Desativa todos os links
               const targetLink = document.querySelector(`.sidebar-nav a[data-section="${sectionId}"]`);
               if (targetLink) {
                   targetLink.classList.add('active'); // Ativa o link correto
               }
           };

           // Função para exibir mensagens de feedback (sucesso/erro)
           const showFormMessage = (element, message, type) => {
               element.textContent = message;
               element.className = `form-message ${type}`; // Define a classe de estilo
               element.style.display = 'flex'; // Torna visível
               void element.offsetWidth; // Força reflow para CSS transition
               element.classList.add('show'); // Ativa a transição de entrada
               
               setTimeout(() => {
                   element.classList.remove('show'); // Desativa a transição de entrada
                   setTimeout(() => { element.style.display = 'none'; }, 500); // Esconde após a transição
               }, 5000); // Mensagem visível por 5 segundos
           };


           // --- Lógica Principal do Dashboard ---

           // Navegação da Sidebar: Adiciona evento de clique a todos os links da sidebar
           sidebarLinks.forEach(link => {
               link.addEventListener('click', (event) => {
                   event.preventDefault(); // Evita que o link recarregue a página
                   const sectionId = link.dataset.section; // Pega o ID da seção do atributo data-section
                   showSection(sectionId); // Exibe a seção
                   activateNavLink(sectionId); // Ativa o link na sidebar
               });
           });

           // Lógica de Logout: Adiciona evento de clique ao botão de Sair
           if (logoutButton) {
               logoutButton.addEventListener('click', (event) => {
                   event.preventDefault(); // Evita o comportamento padrão do link
                   sessionStorage.removeItem('medcarePatientLoggedIn'); // Limpa o status de login do sessionStorage
                   sessionStorage.removeItem('medcarePatientName'); // Limpa o nome do paciente também
                   window.location.href = 'login.html'; // Redireciona para a página de login
               });
           }


async function carregarMedicos() {
  const select = document.getElementById('doctorName');
  const errorDiv = document.getElementById('errorMessage');

  select.innerHTML = '<option disabled selected>Carregando…</option>';
  errorDiv.textContent = '';

  try {
    const resp = await fetch('http://localhost:8080/medicos');
    
    // DEBUG: Verifique o que está vindo da API
    console.log('Status:', resp.status);
    const responseText = await resp.text();
    console.log('Resposta bruta:', responseText);
    
    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status}: ${responseText}`);
    }

    // Tente fazer parse do JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Erro ao parsear JSON:', parseError, 'Conteúdo:', responseText);
      throw new Error('Resposta inválida do servidor');
    }

    // Continue com o processamento...
    const medicos = Array.isArray(data) ? data : (Array.isArray(data?.content) ? data.content : []);
    
    console.log('Médicos recebidos:', medicos);

    select.innerHTML = '<option value="" disabled selected>Selecione um médico…</option>';

    medicos.forEach(m => {
      const id = m.idMedico || m.id_medicos || m.id;
      const nome = m.nomeMedico || m.nome_medico || m.nome;
      const especialidade = m.especialidade || '';
      
      const option = document.createElement('option');
      option.value = id;
      option.textContent = `${nome} (${especialidade})`;
      select.appendChild(option);
    });

    if (select.options.length === 1) {
      errorDiv.textContent = 'Nenhum médico disponível';
    }

  } catch (e) {
    console.error('Erro ao carregar médicos:', e);
    errorDiv.textContent = '❌ Erro ao carregar médicos: ' + e.message;
    select.innerHTML = '<option disabled selected>Erro ao carregar</option>';
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

// Busca dados atualizados
document.addEventListener('DOMContentLoaded', carregarNomeUsuario);
           // Simulação de Submissão de Agendamento: Lida com o formulário de agendamento de consulta
           if (scheduleAppointmentForm) {
               scheduleAppointmentForm.addEventListener('submit', async function (event) {
                    event.preventDefault(); // Impede o envio real do formulário
                   
                   const doctor = document.getElementById('doctorName');
                    const doctorid = doctor.value;
                    const doctorName = doctor.options[doctor.selectedIndex].text;
                   const date = document.getElementById('appointmentDate').value;
                   const time = document.getElementById('appointmentTime').value;
                   const appointmentType = document.getElementById('appointmentType').value; // Novo campo
                   const reason = document.getElementById('reason').value;
                   const datetime = `${date}T${time}:00`;
                   console.log(datetime)

                   // Validação simples dos campos
                   if (!doctor || !date || !time || !appointmentType || !reason) {
                       showFormMessage(scheduleMessage, 'Por favor, preencha todos os campos para agendar a consulta.', 'error');
                       return;
                   }
                   /// Busca o id do paciente atual
                    let pacienteId = null; // Use 'let' em vez de 'const' pois será reatribuído
                    try {
                        const userResp = await fetch('http://localhost:8080/usuarios/atual', { 
                            credentials: 'include' 
                        });
                        if (userResp.ok) {
                            const userData = await userResp.json();
                            pacienteId = userData.idUsuario || userData.id_usuarios || userData.id;
                        }
                    } catch (e) {
                        showFormMessage(scheduleMessage, 'Erro ao obter dados do paciente.', 'error');
                        return;
                    }

                    if (!pacienteId) {
                        showFormMessage(scheduleMessage, 'Não foi possível identificar o paciente.', 'error');
                        return;
                    }

                    const appointmentTypeValue = appointmentType.toLowerCase() === "presencial";

                    // CORREÇÃO: Use o formato correto do DTO
                    const response = await fetch('http://localhost:8080/agendamentos', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            dataAgendamento: datetime,
                            idMedico: doctorid,        // Mude de 'medico' para 'idMedico'
                            idUsuario: pacienteId,     // Mude de 'usuario' para 'idUsuario'
                            tipoConsulta: appointmentTypeValue,
                            motivoConsulta: reason,
                            anamnese: null
                        })
                    });
                console.log('Resposta do servidor:', response);

                 if (response.ok) {
                    // Simulação de sucesso
                   showFormMessage(scheduleMessage, `Agendamento com "${doctorName}" para ${date} às ${time} (${appointmentType}) solicitado com sucesso!`, 'success');
                   scheduleAppointmentForm.reset(); // Limpa o formulário
                }   else {
                    scheduleMessage.textContent = 'Erro ao agendar consulta.';
                    scheduleMessage.className = 'error'; 
                }
                   
                   // Re-renderiza a tabela para incluir a nova consulta
                   renderAppointmentsTable();
                   // Atualiza o contador de consultas no overview
                   updateOverviewCounts();
               });
           }

           // Lógica de Edição de Perfil: Gerencia a edição dos campos do perfil
           // Função para alternar o modo de edição dos inputs e visibilidade dos botões
           const toggleProfileEdit = (isEditing) => {
               profileInputs.forEach(input => {
                   input.readOnly = !isEditing; // Define se o campo é somente leitura
                   // Ajusta a cor de fundo com base no modo de edição (simulado)
                   input.style.backgroundColor = isEditing ? 'var(--white)' : 'var(--light-gray)';
               });
               editProfileBtn.style.display = isEditing ? 'none' : 'inline-flex'; // Esconde/mostra botão "Editar"
               saveProfileBtn.style.display = isEditing ? 'inline-flex' : 'none'; // Mostra/esconde botão "Salvar"
               cancelProfileBtn.style.display = isEditing ? 'inline-flex' : 'none'; // Mostra/esconde botão "Cancelar"
           };

           // Evento para o botão "Editar Dados"
           if (editProfileBtn) {
               editProfileBtn.addEventListener('click', () => toggleProfileEdit(true));
           }

           // Evento para o botão "Cancelar" edição do perfil
           if (cancelProfileBtn) {
               cancelProfileBtn.addEventListener('click', () => {
                   profileForm.reset(); // Reseta os campos do formulário para os valores iniciais (simulado)
                   toggleProfileEdit(false); // Volta ao modo de visualização
               });
           }

           // Evento de submissão do formulário de perfil (simulado)
           if (profileForm) {
               profileForm.addEventListener('submit', function(event) {
                   event.preventDefault();
                   // Em um cenário real, você enviaria os dados atualizados para um servidor aqui
                   const updatedName = document.getElementById('profileName').value;
                   const updatedPhone = document.getElementById('profilePhone').value;
                   const updatedAddress = document.getElementById('profileAddress').value;

                   // Atualiza o sessionStorage e os elementos do DOM com o novo nome
                   sessionStorage.setItem('medcarePatientName', updatedName);
                   window.currentPatientName = updatedName; // Atualiza a variável global
                   sidebarPatientName.textContent = `Olá, ${updatedName.split(' ')[0]}!`;
                   headerPatientName.textContent = updatedName;

                   toggleProfileEdit(false); // Volta ao modo de visualização
               });
           }

           // --- Lógica de Modal de Detalhes da Consulta ---
           // Dados simulados de consultas com mais detalhes
           
           // Elementos da Modal de Detalhes
           const appointmentDetailsModal = document.getElementById('appointmentDetailsModal');
           const closeButtonDetails = appointmentDetailsModal.querySelector('.close-button');
           const modalDoctorName = document.getElementById('modalDoctorName');
           const modalAppointmentDate = document.getElementById('modalAppointmentDate');
           const modalAppointmentTime = document.getElementById('modalAppointmentTime');
           const modalSpecialty = document.getElementById('modalSpecialty');
           const modalAppointmentType = document.getElementById('modalAppointmentType'); // Novo elemento
           const modalReason = document.getElementById('modalReason');
           const modalStatus = document.getElementById('modalStatus');
           const modalDoctorNotes = document.getElementById('modalDoctorNotes');
           const modalPrescription = document.getElementById('modalPrescription');

           // Função para abrir a modal com os detalhes da consulta
           const openAppointmentDetailsModal = (appointmentId) => {
               const appointment = simulatedAppointments[appointmentId];
               if (appointment) {
                   modalDoctorName.textContent = appointment.doctor;
                   modalAppointmentDate.textContent = appointment.date;
                   modalAppointmentTime.textContent = appointment.time;
                   modalSpecialty.textContent = appointment.specialty;
                   modalReason.textContent = appointment.reason;
                   modalAppointmentType.textContent = appointment.appointmentType; // Popula o novo campo
                   
                   // Atualiza o badge de status na modal
                   modalStatus.className = `status-badge ${appointment.status}`; 
                   modalStatus.textContent = appointment.statusText;

                   modalDoctorNotes.textContent = appointment.doctorNotes;
                   modalPrescription.textContent = appointment.prescription;
                   
                   appointmentDetailsModal.style.display = 'flex'; // Torna a modal visível
                   void appointmentDetailsModal.offsetWidth; 
                   appointmentDetailsModal.classList.add('show'); 
               }
           };

           // Função para fechar a modal de detalhes
           const closeAppointmentDetailsModal = () => {
               appointmentDetailsModal.classList.remove('show'); 
               setTimeout(() => {
                   appointmentDetailsModal.style.display = 'none'; 
               }, 300); 
           };

           // Event listener para o botão de fechar (X) da modal de detalhes
           if (closeButtonDetails) {
               closeButtonDetails.addEventListener('click', closeAppointmentDetailsModal);
           }

           // Event listener para fechar a modal de detalhes ao clicar fora dela
           window.addEventListener('click', (event) => {
               if (event.target === appointmentDetailsModal) {
                   closeAppointmentDetailsModal();
               }
           });


           // --- Lógica de Filtro e Pesquisa de Consultas ---
           const statusFilter = document.getElementById('statusFilter');
           const searchAppointmentsInput = document.getElementById('searchAppointments');
           const appointmentTableBody = document.querySelector('#my-appointments .data-table tbody');

           // Função para renderizar as consultas na tabela
           const renderAppointmentsTable = () => {
               appointmentTableBody.innerHTML = ''; // Limpa a tabela antes de renderizar
               
               const filteredAppointments = Object.values(simulatedAppointments).filter(appointment => {
                   const selectedStatus = statusFilter.value;
                   const searchTerm = searchAppointmentsInput.value.toLowerCase().trim();

                   const matchesStatus = (selectedStatus === 'all' || appointment.status === selectedStatus);
                   const matchesSearch = (
                       appointment.doctor.toLowerCase().includes(searchTerm) || 
                       appointment.specialty.toLowerCase().includes(searchTerm)
                   );
                   return matchesStatus && matchesSearch;
               });

               filteredAppointments.forEach(appointment => {
                   const row = document.createElement('tr');
                   row.setAttribute('data-id', appointment.id);

                   // Ações disponíveis com base no status
                   let actionsHtml = `
                       <button class="btn btn-primary btn-small view-details-btn" data-appointment-id="${appointment.id}"><i class="fas fa-eye"></i> Ver</button>
                   `;
                   if (appointment.status === 'confirmed' || appointment.status === 'pending') {
                       actionsHtml += `
                           <button class="btn btn-secondary btn-small reschedule-btn" data-appointment-id="${appointment.id}"><i class="fas fa-edit"></i> Remarcar</button>
                           <button class="btn btn-secondary btn-small cancel-btn" data-appointment-id="${appointment.id}"><i class="fas fa-times"></i> Cancelar</button>
                       `;
                   }

                   row.innerHTML = `
                       <td data-label="Médico">${appointment.doctor}</td>
                       <td data-label="Data">${appointment.date}</td>
                       <td data-label="Horário">${appointment.time}</td>
                       <td data-label="Especialidade">${appointment.specialty}</td>
                       <td data-label="Status"><span class="status-badge ${appointment.status}">${appointment.statusText}</span></td>
                       <td data-label="Ações" class="actions">${actionsHtml}</td>
                   `;
                   appointmentTableBody.appendChild(row);
               });

               // Re-adiciona os event listeners após re-renderizar a tabela
               attachAppointmentButtonListeners();
           };

           // Função para anexar event listeners aos botões da tabela (View, Reschedule, Cancel)
           const attachAppointmentButtonListeners = () => {
               // Event listener para os botões "Ver"
               document.querySelectorAll('.view-details-btn').forEach(button => {
                   button.removeEventListener('click', handleViewDetailsClick); // Remove para evitar duplicidade
                   button.addEventListener('click', handleViewDetailsClick);
               });

               // Event listener para os botões "Remarcar"
               document.querySelectorAll('.reschedule-btn').forEach(button => {
                   button.removeEventListener('click', handleRescheduleClick); // Remove para evitar duplicidade
                   button.addEventListener('click', handleRescheduleClick);
               });

               // Event listener para os botões "Cancelar"
               document.querySelectorAll('.cancel-btn').forEach(button => {
                   button.removeEventListener('click', handleCancelClick); // Remove para evitar duplicidade
                   button.addEventListener('click', handleCancelClick);
               });
           };

           // Handlers de clique para os botões da tabela (para poderem ser reanexados)
           const handleViewDetailsClick = (event) => {
               const appointmentId = event.currentTarget.dataset.appointmentId;
               openAppointmentDetailsModal(appointmentId);
           };

           // --- Lógica para Remarcar Consulta (com nova modal) ---
           const rescheduleAppointmentModal = document.getElementById('rescheduleAppointmentModal');
           const rescheduleCloseButton = rescheduleAppointmentModal.querySelector('.reschedule-close-button');
           const rescheduleForm = document.getElementById('rescheduleForm');
           const rescheduleMessage = document.getElementById('rescheduleMessage');
           const rescheduleDoctor = document.getElementById('rescheduleDoctor');
           const rescheduleOldDate = document.getElementById('rescheduleOldDate');
           const rescheduleOldTime = document.getElementById('rescheduleOldTime');
           const rescheduleAppointmentId = document.getElementById('rescheduleAppointmentId');
           const newAppointmentDate = document.getElementById('newAppointmentDate');
           const newAppointmentTime = document.getElementById('newAppointmentTime');

           const handleRescheduleClick = (event) => {
               const appointmentId = event.currentTarget.dataset.appointmentId;
               const appointment = simulatedAppointments[appointmentId];
               if (appointment) {
                   rescheduleAppointmentId.value = appointmentId; // Salva o ID da consulta
                   rescheduleDoctor.textContent = appointment.doctor;
                   rescheduleOldDate.textContent = appointment.date;
                   rescheduleOldTime.textContent = appointment.time;
                   newAppointmentDate.value = appointment.date; // Preenche com a data atual
                   newAppointmentTime.value = appointment.time; // Preenche com o horário atual

                   rescheduleAppointmentModal.style.display = 'flex';
                   void rescheduleAppointmentModal.offsetWidth;
                   rescheduleAppointmentModal.classList.add('show');
               }
           };

           const closeRescheduleModal = () => {
               rescheduleAppointmentModal.classList.remove('show');
               setTimeout(() => {
                   rescheduleAppointmentModal.style.display = 'none';
                   rescheduleForm.reset(); // Reseta o formulário
                   rescheduleMessage.style.display = 'none'; // Esconde mensagens
               }, 300);
           };

           if (rescheduleCloseButton) {
               rescheduleCloseButton.addEventListener('click', closeRescheduleModal);
           }
           window.addEventListener('click', (event) => {
               if (event.target === rescheduleAppointmentModal) {
                   closeRescheduleModal();
               }
           });

           if (rescheduleForm) {
               rescheduleForm.addEventListener('submit', (event) => {
                   event.preventDefault();
                   const idToReschedule = rescheduleAppointmentId.value;
                   const newDate = newAppointmentDate.value;
                   const newTime = newAppointmentTime.value;
                   const reason = document.getElementById('rescheduleReason').value;

                   if (!newDate || !newTime) {
                       showFormMessage(rescheduleMessage, 'Por favor, selecione a nova data e horário.', 'error');
                       return;
                   }

                   const originalAppointment = simulatedAppointments[idToReschedule];
                   if (originalAppointment) {
                       originalAppointment.date = newDate;
                       originalAppointment.time = newTime;
                       originalAppointment.status = 'pending'; // Volta para pendente após remarcação
                       originalAppointment.statusText = 'Pendente';
                       originalAppointment.doctorNotes += `\n(Remarcado para ${newDate} às ${newTime}. Motivo: ${reason || 'Não informado'})`;
                       
                       showFormMessage(rescheduleMessage, `Consulta com ${originalAppointment.doctor} remarcada para ${newDate} às ${newTime} com sucesso!`, 'success');
                       
                       // Atualiza a tabela imediatamente
                       renderAppointmentsTable();
                       updateOverviewCounts(); // Atualiza o resumo
                       
                       setTimeout(closeRescheduleModal, 2000); // Fecha a modal após 2 segundos
                   } else {
                       showFormMessage(rescheduleMessage, 'Erro: Consulta não encontrada para remarcação.', 'error');
                   }
               });
           }


           // --- Lógica para Cancelar Consultas ---
           const handleCancelClick = (event) => {
               const appointmentId = event.currentTarget.dataset.appointmentId;
               const appointment = simulatedAppointments[appointmentId];
               if (appointment && confirm(`Tem certeza que deseja cancelar a consulta com ${appointment.doctor} em ${appointment.date} às ${appointment.time}?`)) {
                   appointment.status = 'canceled';
                   appointment.statusText = 'Cancelada';
                   
                   alert(`Consulta com ${appointment.doctor} foi cancelada.`);
                   
                   // Re-renderiza a tabela para atualizar o status e remover botões
                   renderAppointmentsTable();
                   updateOverviewCounts(); // Atualiza o resumo
               }
           };


           // --- Lógica para o Resumo na Visão Geral (Overview) ---
           const nextAppointmentSummary = document.getElementById('nextAppointmentSummary');
           const completedAppointmentsCount = document.getElementById('completedAppointmentsCount');

           const updateOverviewCounts = () => {
               const now = new Date();
               let nextAppointment = null;
               let completedCount = 0;

               Object.values(simulatedAppointments).forEach(appt => {
                   if (appt.status === 'completed') {
                       completedCount++;
                   }

                   // Encontra a próxima consulta não cancelada/concluída
                   if (appt.status === 'confirmed' || appt.status === 'pending') {
                       const apptDateTime = new Date(`${appt.date}T${appt.time}`);
                       if (apptDateTime > now) { // Se a consulta for no futuro
                           if (!nextAppointment || apptDateTime < new Date(`${nextAppointment.date}T${nextAppointment.time}`)) {
                               nextAppointment = appt;
                           }
                       }
                   }
               });

               if (nextAppointment) {
                   nextAppointmentSummary.textContent = `${nextAppointment.doctor} em ${nextAppointment.date} às ${nextAppointment.time} (${nextAppointment.specialty})`;
               } else {
                   nextAppointmentSummary.textContent = 'Nenhuma consulta agendada.';
               }
               completedAppointmentsCount.textContent = completedCount;
           };

        
           

           showSection('overview');
           activateNavLink('overview'); 
           renderAppointmentsTable(); // Popula a tabela de consultas
           updateOverviewCounts(); // Atualiza o resumo na visão geral

           // Adicionar event listeners para os filtros
           statusFilter.addEventListener('change', renderAppointmentsTable);
           searchAppointmentsInput.addEventListener('input', renderAppointmentsTable);
       });