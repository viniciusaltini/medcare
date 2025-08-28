package com.medacare.medcare.repo;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.medacare.medcare.model.Agendamento;

public interface AgendamentoRepo extends JpaRepository<Agendamento, Integer>{

    // Buscar agendamentos por médico
    List<Agendamento> findByMedicoIdMedico(int idMedico);
    
    // Buscar agendamentos por usuário
    List<Agendamento> findByUsuarioIdUsuario(int idUsuario);
    
    // Buscar agendamentos por médico e data
    List<Agendamento> findByMedicoIdMedicoAndDataAgendamentoBetween(
        int idMedico, LocalDateTime start, LocalDateTime end);
    
    // Buscar agendamentos por usuário e data
    List<Agendamento> findByUsuarioIdUsuarioAndDataAgendamentoBetween(
        int idUsuario, LocalDateTime start, LocalDateTime end);
    
    // Buscar agendamentos por tipo de consulta
    List<Agendamento> findByTipoConsulta(boolean tipoConsulta);
    
    // Buscar agendamentos por médico e tipo de consulta
    List<Agendamento> findByMedicoIdMedicoAndTipoConsulta(int idMedico, boolean tipoConsulta);
    
    // Buscar agendamentos futuros por médico
    @Query("SELECT a FROM Agendamento a WHERE a.medico.idMedico = :idMedico AND a.dataAgendamento > :now")
    List<Agendamento> findAgendamentosFuturosPorMedico(@Param("idMedico") int idMedico, @Param("now") LocalDateTime now);
    
    // Buscar agendamentos futuros por usuário
    @Query("SELECT a FROM Agendamento a WHERE a.usuario.idUsuario = :idUsuario AND a.dataAgendamento > :now")
    List<Agendamento> findAgendamentosFuturosPorUsuario(@Param("idUsuario") int idUsuario, @Param("now") LocalDateTime now);
    
    // Buscar agendamentos passados por médico
    @Query("SELECT a FROM Agendamento a WHERE a.medico.idMedico = :idMedico AND a.dataAgendamento < :now")
    List<Agendamento> findAgendamentosPassadosPorMedico(@Param("idMedico") int idMedico, @Param("now") LocalDateTime now);
    
    // Buscar agendamentos passados por usuário
    @Query("SELECT a FROM Agendamento a WHERE a.usuario.idUsuario = :idUsuario AND a.dataAgendamento < :now")
    List<Agendamento> findAgendamentosPassadosPorUsuario(@Param("idUsuario") int idUsuario, @Param("now") LocalDateTime now);
    
    // Verificar se já existe agendamento para o médico no mesmo horário
    @Query("SELECT COUNT(a) > 0 FROM Agendamento a WHERE a.medico.idMedico = :idMedico AND a.dataAgendamento = :dataAgendamento")
    boolean existsByMedicoAndData(@Param("idMedico") int idMedico, @Param("dataAgendamento") LocalDateTime dataAgendamento);
    
    // Verificar se já existe agendamento para o usuário no mesmo horário
    @Query("SELECT COUNT(a) > 0 FROM Agendamento a WHERE a.usuario.idUsuario = :idUsuario AND a.dataAgendamento = :dataAgendamento")
    boolean existsByUsuarioAndData(@Param("idUsuario") int idUsuario, @Param("dataAgendamento") LocalDateTime dataAgendamento);
    
    // Buscar agendamentos por intervalo de datas
    List<Agendamento> findByDataAgendamentoBetween(LocalDateTime start, LocalDateTime end);
    
    // Buscar agendamentos por médico e usuário
    List<Agendamento> findByMedicoIdMedicoAndUsuarioIdUsuario(int idMedico, int idUsuario);
    
    // Buscar agendamentos com anamnese preenchida
    @Query("SELECT a FROM Agendamento a WHERE a.anamnese IS NOT NULL AND a.anamnese != ''")
    List<Agendamento> findAgendamentosComAnamnese();
    
    // Buscar agendamentos sem anamnese
    @Query("SELECT a FROM Agendamento a WHERE a.anamnese IS NULL OR a.anamnese = ''")
    List<Agendamento> findAgendamentosSemAnamnese();
    
    // Buscar agendamentos por médico e com anamnese
    @Query("SELECT a FROM Agendamento a WHERE a.medico.idMedico = :idMedico AND a.anamnese IS NOT NULL AND a.anamnese != ''")
    List<Agendamento> findAgendamentosComAnamnesePorMedico(@Param("idMedico") int idMedico);
    
    // Buscar próximo agendamento do usuário
    @Query("SELECT a FROM Agendamento a WHERE a.usuario.idUsuario = :idUsuario AND a.dataAgendamento > :now ORDER BY a.dataAgendamento ASC LIMIT 1")
    Optional<Agendamento> findProximoAgendamentoUsuario(@Param("idUsuario") int idUsuario, @Param("now") LocalDateTime now);
    
    // Buscar próximo agendamento do médico
    @Query("SELECT a FROM Agendamento a WHERE a.medico.idMedico = :idMedico AND a.dataAgendamento > :now ORDER BY a.dataAgendamento ASC LIMIT 1")
    Optional<Agendamento> findProximoAgendamentoMedico(@Param("idMedico") int idMedico, @Param("now") LocalDateTime now);
    
    // Contar agendamentos por médico
    @Query("SELECT COUNT(a) FROM Agendamento a WHERE a.medico.idMedico = :idMedico")
    Long countByMedico(@Param("idMedico") int idMedico);
    
    // Contar agendamentos por usuário
    @Query("SELECT COUNT(a) FROM Agendamento a WHERE a.usuario.idUsuario = :idUsuario")
    Long countByUsuario(@Param("idUsuario") int idUsuario);
}

