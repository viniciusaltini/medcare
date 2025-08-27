package com.medacare.medcare.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	@PostMapping
	public void inserirAgendamento (@RequestBody Agendamento a) {
		System.out.println(a);
		agendaService.inserirAgendamento(a);
		
	}
	@GetMapping
	public List<Agendamento> listaAgendamentos (){
		return agendaService.listaAgendamentos();
	}
	@PutMapping
	public void atualizaAgendamento (@RequestBody Agendamento a) {
		agendaService.atualizaAgendamento(a);
	}
	@DeleteMapping("/{id}")
	public void deletaAgendamento (@PathVariable int id) {
		agendaService.deletaAgendamento(id);
	}
}
