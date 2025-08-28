package com.medacare.medcare.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medacare.medcare.model.Agendamento;
import com.medacare.medcare.model.Medico;
import com.medacare.medcare.model.Usuario;
import com.medacare.medcare.repo.AgendamentoRepo;
import com.medacare.medcare.repo.MedicoRepo;
import com.medacare.medcare.repo.UsuarioRepo;

@Service
public class AgendamentoService {
	@Autowired
	private final AgendamentoRepo agendaRepo;
	@Autowired
	private final MedicoRepo medRepo;
	@Autowired
	private final UsuarioRepo usuRepo;

	
	
	public AgendamentoService(AgendamentoRepo agendaRepo, MedicoRepo medRepo, UsuarioRepo usuRepo) {
		super();
		this.agendaRepo = agendaRepo;
		this.medRepo = medRepo;
		this.usuRepo = usuRepo;
	}

	public Agendamento criarAgendamento(Agendamento agendamento, int idMedico, int idUsuario) {
        // Verificar se médico existe
        Medico medico = medRepo.findById(idMedico)
            .orElseThrow(() -> new RuntimeException("Médico não encontrado"));
        
        // Verificar se usuário existe
        Usuario usuario = usuRepo.findById(idUsuario)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        // Verificar conflito de horário para o médico
        if (agendaRepo.existsByMedicoAndData(idMedico, agendamento.getDataAgendamento())) {
            throw new RuntimeException("Médico já possui agendamento neste horário");
        }
        
        // Verificar conflito de horário para o usuário
        if (agendaRepo.existsByUsuarioAndData(idUsuario, agendamento.getDataAgendamento())) {
            throw new RuntimeException("Usuário já possui agendamento neste horário");
        }
        
        agendamento.setMedico(medico);
        agendamento.setUsuario(usuario);
        
        return agendaRepo.save(agendamento);
    }
	public Optional<Agendamento> buscarAgendamentoPorId(int id) {
        return agendaRepo.findById(id);
    }
	public List<Agendamento> listarTodosAgendamentos() {
        return agendaRepo.findAll();
    }
	
	public List<Agendamento> listarAgendamentosPorIntervalo(LocalDateTime inicio, LocalDateTime fim) {
        return agendaRepo.findByDataAgendamentoBetween(inicio, fim);
    }
    
    public List<Agendamento> listarAgendamentosPorMedico(int idMedico) {
        return agendaRepo.findByMedicoIdMedico(idMedico);
    }
    
    public List<Agendamento> listarAgendamentosPorUsuario(int idUsuario) {
        return agendaRepo.findByUsuarioIdUsuario(idUsuario);
    }
    
    public List<Agendamento> listarAgendamentosFuturosPorMedico(int idMedico) {
        return agendaRepo.findAgendamentosFuturosPorMedico(idMedico, LocalDateTime.now());
    }
    
    public List<Agendamento> listarAgendamentosFuturosPorUsuario(int idUsuario) {
        return agendaRepo.findAgendamentosFuturosPorUsuario(idUsuario, LocalDateTime.now());
    }
    
    public Optional<Agendamento> buscarProximoAgendamentoUsuario(int idUsuario) {
        return agendaRepo.findProximoAgendamentoUsuario(idUsuario, LocalDateTime.now());
    }
    
    public Optional<Agendamento> buscarProximoAgendamentoMedico(int idMedico) {
        return agendaRepo.findProximoAgendamentoMedico(idMedico, LocalDateTime.now());
    }
    
    public Agendamento atualizarAnamnese(int idAgendamento, String anamnese) {
        return agendaRepo.findById(idAgendamento)
            .map(agendamento -> {
                agendamento.setAnamnese(anamnese);
                return agendaRepo.save(agendamento);
            })
            .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));
    }
    
    public void cancelarAgendamento(int idAgendamento) {
        agendaRepo.deleteById(idAgendamento);
    }
    
    public boolean verificarDisponibilidadeMedico(int idMedico, LocalDateTime data) {
        return !agendaRepo.existsByMedicoAndData(idMedico, data);
    }
    
    public Long contarAgendamentosPorMedico(int idMedico) {
        return agendaRepo.countByMedico(idMedico);
    }
    
    public Long contarAgendamentosPorUsuario(int idUsuario) {
        return agendaRepo.countByUsuario(idUsuario);
    }
    
    public List<Agendamento> listarAgendamentosComAnamnesePorMedico(int idMedico) {
        return agendaRepo.findAgendamentosComAnamnesePorMedico(idMedico);
    }
    
    public List<Agendamento> listarAgendamentosSemAnamnesePorMedico(int idMedico) {
        List<Agendamento> todos = agendaRepo.findByMedicoIdMedico(idMedico);
        List<Agendamento> comAnamnese = agendaRepo.findAgendamentosComAnamnesePorMedico(idMedico);
        todos.removeAll(comAnamnese);
        return todos;
    }
}

