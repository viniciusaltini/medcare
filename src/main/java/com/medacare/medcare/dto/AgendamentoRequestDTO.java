package com.medacare.medcare.dto;

import java.time.LocalDateTime;

public class AgendamentoRequestDTO {
	private LocalDateTime dataAgendamento;
    private int idMedico;
    private int idUsuario;
    private boolean tipoConsulta;
    private String motivoConsulta;
    private String anamnese;
    
    // Construtores
    public AgendamentoRequestDTO() {}
    
    // Getters e Setters
    public LocalDateTime getDataAgendamento() { return dataAgendamento; }
    public void setDataAgendamento(LocalDateTime dataAgendamento) { this.dataAgendamento = dataAgendamento; }
    
    public int getIdMedico() { return idMedico; }
    public void setIdMedico(int idMedico) { this.idMedico = idMedico; }
    
    public int getIdUsuario() { return idUsuario; }
    public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }
    
    public boolean isTipoConsulta() { return tipoConsulta; }
    public void setTipoConsulta(boolean tipoConsulta) { this.tipoConsulta = tipoConsulta; }
    
    public String getMotivoConsulta() { return motivoConsulta; }
    public void setMotivoConsulta(String motivoConsulta) { this.motivoConsulta = motivoConsulta; }
    
    public String getAnamnese() { return anamnese; }
    public void setAnamnese(String anamnese) { this.anamnese = anamnese; }
}

