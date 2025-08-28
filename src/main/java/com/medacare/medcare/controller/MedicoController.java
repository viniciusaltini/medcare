package com.medacare.medcare.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medacare.medcare.dto.MedicoDTO;
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
    public ResponseEntity<MedicoDTO> inserirMedico(@RequestBody Medico medico) {
        Medico medicoSalvo = medService.inserirMedico(medico);
        MedicoDTO medicoDTO = convertToDTO(medicoSalvo);
        return ResponseEntity.ok(medicoDTO);
    }

    @GetMapping
    public ResponseEntity<List<MedicoDTO>> listarMedicos() {
        List<Medico> medicos = medService.listarTodosMedicos();
        List<MedicoDTO> medicosDTO = medicos.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(medicosDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicoDTO> atualizarMedico(@PathVariable int id, @RequestBody Medico medico) {
        Medico medicoAtualizado = medService.atualizarMedico(id, medico);
        MedicoDTO medicoDTO = convertToDTO(medicoAtualizado);
        return ResponseEntity.ok(medicoDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarMedico(@PathVariable int id) {
        medService.deletarMedico(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicoDTO> buscarMedicoPorId(@PathVariable int id) {
        Optional<Medico> medico = medService.buscarMedicoPorId(id);
        return medico.map(m -> ResponseEntity.ok(convertToDTO(m)))
                   .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/especialidade/{especialidade}")
    public ResponseEntity<List<MedicoDTO>> buscarPorEspecialidade(@PathVariable String especialidade) {
        List<Medico> medicos = medService.buscarMedicosPorEspecialidade(especialidade);
        List<MedicoDTO> medicosDTO = medicos.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(medicosDTO);
    }

    @GetMapping("/crm/{crm}")
    public ResponseEntity<MedicoDTO> buscarPorCrm(@PathVariable String crm) {
        Optional<Medico> medico = medService.buscarMedicoPorCrm(crm);
        return medico.map(m -> ResponseEntity.ok(convertToDTO(m)))
                   .orElse(ResponseEntity.notFound().build());
    }

    // Método auxiliar para converter Medico para MedicoDTO
    private MedicoDTO convertToDTO(Medico medico) {
        return new MedicoDTO(
            medico.getIdMedico(),
            medico.getNomeMedico(),
            medico.getCrm(),
            medico.getEspecialidade()
        );
    }
}
