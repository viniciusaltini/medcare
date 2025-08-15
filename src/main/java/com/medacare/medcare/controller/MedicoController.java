package com.medacare.medcare.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medacare.medcare.model.Medico;
import com.medacare.medcare.service.MedicoService;

@RestController
@CrossOrigin
@RequestMapping("/medicos")
public class MedicoController {
	private final MedicoService medService;

	public MedicoController(MedicoService medService) {
		super();
		this.medService = medService;
	}
	@PostMapping
	public void inserirMedico (@RequestBody Medico m) {
		medService.inserirMedico(m);
	}
	@GetMapping
	public List<Medico> listarMedico () {
		return medService.listarMedicos();
	}
	@PutMapping
	public void atualizarMedico (@RequestBody Medico m) {
		medService.atualizarMedico(m);
	}
	@DeleteMapping("/{id}")
	public void deletaMedico (@PathVariable int id) {
		medService.deletarMedico(id);
	}
	
	@GetMapping("/{id}")
	public Optional<Medico> listaPorId (@PathVariable int id) {
		return medService.listaPorId(id);
	}
}
