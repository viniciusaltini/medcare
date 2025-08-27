package com.medacare.medcare.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="agendamentos")
public class Agendamento {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_agendamento")
	int idAgendamento;
	@Column(name="data_agendamento")
	LocalDateTime dataAgendamento;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_medicos", referencedColumnName = "id_medicos")
	Medico medico;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_usuarios", referencedColumnName = "id_usuarios")
	Usuario usuario;
	@Column(name="tipo_consulta")
	boolean tipoConsulta;
	@Column(name="motivo_consulta")
	String motivoConsulta;
	@Column(name="anamnese")
	String anamnese;
	
	
	
	public String getAnamnese() {
		return anamnese;
	}
	public void setAnamnese(String anamnese) {
		this.anamnese = anamnese;
	}
	public int getIdAgendamento() {
		return idAgendamento;
	}
	public void setIdAgendamento(int idAgendamento) {
		this.idAgendamento = idAgendamento;
	}
	public LocalDateTime getDataAgendamento() {
		return dataAgendamento;
	}
	public void setDataAgendamento(LocalDateTime dataAgendamento) {
		this.dataAgendamento = dataAgendamento;
	}
	public Medico getMedico() {
		return medico;
	}
	public void setMedico(Medico medico) {
		this.medico = medico;
	}
	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	public boolean isTipoConsulta() {
		return tipoConsulta;
	}
	public void setTipoConsulta(boolean tipoConsulta) {
		this.tipoConsulta = tipoConsulta;
	}
	public String getMotivoConsulta() {
		return motivoConsulta;
	}
	public void setMotivoConsulta(String motivoConsulta) {
		this.motivoConsulta = motivoConsulta;
	}
	public Agendamento(int idAgendamento, LocalDateTime dataAgendamento, Medico medico, Usuario usuario,
			boolean tipoConsulta, String motivoConsulta, String anamnese) {
		super();
		this.idAgendamento = idAgendamento;
		this.dataAgendamento = dataAgendamento;
		this.medico = medico;
		this.usuario = usuario;
		this.tipoConsulta = tipoConsulta;
		this.motivoConsulta = motivoConsulta;
		this.anamnese = anamnese;
	}
	public Agendamento() {
		super();
	}
	@Override
	public String toString() {
		return "Agendamento [idAgendamento=" + idAgendamento + ", dataAgendamento=" + dataAgendamento + ", medico="
				+ medico + ", usuario=" + usuario + ", tipoConsulta=" + tipoConsulta + ", motivoConsulta="
				+ motivoConsulta + ", anamnese=" + anamnese + "]";
	}
	
	
	
}
