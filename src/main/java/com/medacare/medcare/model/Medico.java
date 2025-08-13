package com.medacare.medcare.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "medicos")
public class Medico {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_medicos")
	int idMedico;
	@Column(name = "nome_medico")
	String nomeMedico;
	@Column(name = "crm")
	String crm;
	@Column(name = "senha_medico")
	String senhaMedico;
	@Column(name = "data_nascimento_medico")
	LocalDate dataNascMedico;
	@Column(name = "especialidade")
	String especialidade;

	public int getIdMedico() {
		return idMedico;
	}

	public void setIdMedico(int idMedico) {
		this.idMedico = idMedico;
	}

	public String getNomeMedico() {
		return nomeMedico;
	}

	public void setNomeMedico(String nomeMedico) {
		this.nomeMedico = nomeMedico;
	}

	public String getCrm() {
		return crm;
	}

	public void setCrm(String crm) {
		this.crm = crm;
	}

	public String getSenhaMedico() {
		return senhaMedico;
	}

	public void setSenhaMedico(String senhaMedico) {
		this.senhaMedico = senhaMedico;
	}

	public LocalDate getDataNascMedico() {
		return dataNascMedico;
	}

	public void setDataNascMedico(LocalDate dataNascMedico) {
		this.dataNascMedico = dataNascMedico;
	}

	public String getEspecialidade() {
		return especialidade;
	}

	public void setEspecialidade(String especialidade) {
		this.especialidade = especialidade;
	}

	public Medico(int idMedico, String nomeMedico, String crm, String senhaMedico, LocalDate dataNascMedico,
			String especialidade) {
		super();
		this.idMedico = idMedico;
		this.nomeMedico = nomeMedico;
		this.crm = crm;
		this.senhaMedico = senhaMedico;
		this.dataNascMedico = dataNascMedico;
		this.especialidade = especialidade;
	}

	public Medico() {
		super();
	}

}
