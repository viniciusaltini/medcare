package com.medacare.medcare.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "usuarios")
public class Usuario {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column (name = "idusuarios")
	int idUsuario;
	@Column (name = "nomeusuario")
	String nomeUsuario;
	@Column (name = "emailusuario")
	String emailUsuario;
	@Column (name = "senhausuario")
	String senhaUsuario;
	@Column (name = "dataNascUsuario")
	LocalDate dataNascUsuario;
	@Column (name = "pesoUsuario")
	BigDecimal peso;
	@Column (name = "alturaUsuario")
	BigDecimal altura;
	public int getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(int idUsuario) {
		this.idUsuario = idUsuario;
	}
	public String getNomeUsuario() {
		return nomeUsuario;
	}
	public void setNomeUsuario(String nomeUsuario) {
		this.nomeUsuario = nomeUsuario;
	}
	public String getEmailUsuario() {
		return emailUsuario;
	}
	public void setEmailUsuario(String emailUsuario) {
		this.emailUsuario = emailUsuario;
	}
	public String getSenhaUsuario() {
		return senhaUsuario;
	}
	public void setSenhaUsuario(String senhaUsuario) {
		this.senhaUsuario = senhaUsuario;
	}
	public LocalDate getDataNascUsuario() {
		return dataNascUsuario;
	}
	public void setDataNascUsuario(LocalDate dataNascUsuario) {
		this.dataNascUsuario = dataNascUsuario;
	}
	public BigDecimal getPeso() {
		return peso;
	}
	public void setPeso(BigDecimal peso) {
		this.peso = peso;
	}
	public BigDecimal getAltura() {
		return altura;
	}
	public void setAltura(BigDecimal altura) {
		this.altura = altura;
	}
	public Usuario(int idUsuario, String nomeUsuario, String emailUsuario, String senhaUsuario,
			LocalDate dataNascUsuario, BigDecimal peso, BigDecimal altura) {
		super();
		this.idUsuario = idUsuario;
		this.nomeUsuario = nomeUsuario;
		this.emailUsuario = emailUsuario;
		this.senhaUsuario = senhaUsuario;
		this.dataNascUsuario = dataNascUsuario;
		this.peso = peso;
		this.altura = altura;
	}
	public Usuario() {
		super();
	}
	
	
}
