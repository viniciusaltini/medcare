package com.medacare.medcare.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medacare.medcare.model.Agendamento;
import com.medacare.medcare.service.AgendamentoService;

@RestController
@CrossOrigin
@RequestMapping("/agendamentos")
public class AgendamentoController {
	
	private final AgendamentoService agendaService;
	
	public AgendamentoController(AgendamentoService agendaService) {
		super();
		this.agendaService = agendaService;
	}

	public void inserirAgendamento (Agendamento a) {
		agendaService.inserirAgendamento(a);;
	}
	
	public List<Agendamento> listaAgendamentos (){
		return agendaService.listaAgendamentos();
	}
	
	public void atualizaAgendamento (Agendamento a) {
		agendaService.atualizaAgendamento(a);
	}
	
	public void deletaAgendamento (int id) {
		agendaService.deletaAgendamento(id);
	}
}
