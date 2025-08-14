package com.medacare.medcare.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.medacare.medcare.model.Agendamento;
import com.medacare.medcare.repo.AgendamentoRepo;

@Service
public class AgendamentoService {
	
	private final AgendamentoRepo agendaRepo;

	public AgendamentoService(AgendamentoRepo agendaRepo) {
		super();
		this.agendaRepo = agendaRepo;
	}
	
	public void inserirAgendamento (Agendamento a) {
		agendaRepo.save(a);
	}
	
	public List<Agendamento> listaAgendamentos (){
		return agendaRepo.findAll();
	}
	
	public void atualizaAgendamento (Agendamento a) {
		agendaRepo.save(a);
	}
	
	public void deletaAgendamento (int id) {
		agendaRepo.deleteById(id);
	}
}
