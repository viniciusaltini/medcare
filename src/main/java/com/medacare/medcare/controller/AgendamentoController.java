package com.medacare.medcare.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medacare.medcare.dto.AgendamentoRequestDTO;
import com.medacare.medcare.model.Agendamento;
import com.medacare.medcare.service.AgendamentoService;

@RestController
@CrossOrigin
@RequestMapping("/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @PostMapping
    public ResponseEntity<?> criarAgendamento(@RequestBody AgendamentoRequestDTO agendamentoDTO) {
        
        try {
            Agendamento agendamento = new Agendamento();
            agendamento.setDataAgendamento(agendamentoDTO.getDataAgendamento());
            agendamento.setTipoConsulta(agendamentoDTO.isTipoConsulta());
            agendamento.setMotivoConsulta(agendamentoDTO.getMotivoConsulta());
            agendamento.setAnamnese(agendamentoDTO.getAnamnese());
            
            Agendamento novoAgendamento = agendamentoService.criarAgendamento(
                agendamento, 
                agendamentoDTO.getIdMedico(), 
                agendamentoDTO.getIdUsuario()
            );
            
            return ResponseEntity.status(HttpStatus.CREATED).body(novoAgendamento);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Buscar agendamento por ID
    @GetMapping("/{id}")
    public ResponseEntity<Agendamento> buscarAgendamentoPorId(@PathVariable int id) {
        Optional<Agendamento> agendamento = agendamentoService.buscarAgendamentoPorId(id);
        return agendamento.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
    }

    // Listar todos os agendamentos
    @GetMapping
    public ResponseEntity<List<Agendamento>> listarTodosAgendamentos() {
        List<Agendamento> agendamentos = agendamentoService.listarTodosAgendamentos();
        return ResponseEntity.ok(agendamentos);
    }

    // Listar agendamentos por médico
    @GetMapping("/medico/{idMedico}")
    public ResponseEntity<List<Agendamento>> listarAgendamentosPorMedico(@PathVariable int idMedico) {
        List<Agendamento> agendamentos = agendamentoService.listarAgendamentosPorMedico(idMedico);
        return ResponseEntity.ok(agendamentos);
    }

    // Listar agendamentos por usuário
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Agendamento>> listarAgendamentosPorUsuario(@PathVariable int idUsuario) {
        List<Agendamento> agendamentos = agendamentoService.listarAgendamentosPorUsuario(idUsuario);
        return ResponseEntity.ok(agendamentos);
    }

    // Listar agendamentos futuros por médico
    @GetMapping("/medico/{idMedico}/futuros")
    public ResponseEntity<List<Agendamento>> listarAgendamentosFuturosPorMedico(@PathVariable int idMedico) {
        List<Agendamento> agendamentos = agendamentoService.listarAgendamentosFuturosPorMedico(idMedico);
        return ResponseEntity.ok(agendamentos);
    }

    // Listar agendamentos futuros por usuário
    @GetMapping("/usuario/{idUsuario}/futuros")
    public ResponseEntity<List<Agendamento>> listarAgendamentosFuturosPorUsuario(@PathVariable int idUsuario) {
        List<Agendamento> agendamentos = agendamentoService.listarAgendamentosFuturosPorUsuario(idUsuario);
        return ResponseEntity.ok(agendamentos);
    }

    // Buscar próximo agendamento do usuário
    @GetMapping("/usuario/{idUsuario}/proximo")
    public ResponseEntity<Agendamento> buscarProximoAgendamentoUsuario(@PathVariable int idUsuario) {
        Optional<Agendamento> agendamento = agendamentoService.buscarProximoAgendamentoUsuario(idUsuario);
        return agendamento.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
    }

    // Buscar próximo agendamento do médico
    @GetMapping("/medico/{idMedico}/proximo")
    public ResponseEntity<Agendamento> buscarProximoAgendamentoMedico(@PathVariable int idMedico) {
        Optional<Agendamento> agendamento = agendamentoService.buscarProximoAgendamentoMedico(idMedico);
        return agendamento.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
    }

    // Atualizar anamnese do agendamento
    @PatchMapping("/{id}/anamnese")
    public ResponseEntity<?> atualizarAnamnese(
            @PathVariable int id,
            @RequestParam String anamnese) {
        
        try {
            Agendamento agendamentoAtualizado = agendamentoService.atualizarAnamnese(id, anamnese);
            return ResponseEntity.ok(agendamentoAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Cancelar agendamento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelarAgendamento(@PathVariable int id) {
        try {
            agendamentoService.cancelarAgendamento(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Verificar disponibilidade do médico
    @GetMapping("/disponibilidade")
    public ResponseEntity<Boolean> verificarDisponibilidadeMedico(
            @RequestParam int idMedico,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime data) {
        
        boolean disponivel = agendamentoService.verificarDisponibilidadeMedico(idMedico, data);
        return ResponseEntity.ok(disponivel);
    }

    // Contar agendamentos por médico
    @GetMapping("/medico/{idMedico}/count")
    public ResponseEntity<Long> contarAgendamentosPorMedico(@PathVariable int idMedico) {
        Long count = agendamentoService.contarAgendamentosPorMedico(idMedico);
        return ResponseEntity.ok(count);
    }

    // Contar agendamentos por usuário
    @GetMapping("/usuario/{idUsuario}/count")
    public ResponseEntity<Long> contarAgendamentosPorUsuario(@PathVariable int idUsuario) {
        Long count = agendamentoService.contarAgendamentosPorUsuario(idUsuario);
        return ResponseEntity.ok(count);
    }

    // Listar agendamentos por intervalo de datas
    @GetMapping("/intervalo")
    public ResponseEntity<List<Agendamento>> listarAgendamentosPorIntervalo(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fim) {
        
        List<Agendamento> agendamentos = agendamentoService.listarAgendamentosPorIntervalo(inicio, fim);
        return ResponseEntity.ok(agendamentos);
    }

    // Listar agendamentos com anamnese por médico
    @GetMapping("/medico/{idMedico}/com-anamnese")
    public ResponseEntity<List<Agendamento>> listarAgendamentosComAnamnesePorMedico(@PathVariable int idMedico) {
        List<Agendamento> agendamentos = agendamentoService.listarAgendamentosComAnamnesePorMedico(idMedico);
        return ResponseEntity.ok(agendamentos);
    }

    // Listar agendamentos sem anamnese por médico
    @GetMapping("/medico/{idMedico}/sem-anamnese")
    public ResponseEntity<List<Agendamento>> listarAgendamentosSemAnamnesePorMedico(@PathVariable int idMedico) {
        List<Agendamento> agendamentos = agendamentoService.listarAgendamentosSemAnamnesePorMedico(idMedico);
        return ResponseEntity.ok(agendamentos);
    }

}
