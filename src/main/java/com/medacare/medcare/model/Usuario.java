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
	@Column (name = "id_usuarios")
	int idUsuario;
	@Column (name = "nome_usuario")
	String nomeUsuario;
	@Column (name = "email_usuario")
	String emailUsuario;
	@Column (name = "senha_usuario")
	String senhaUsuario;
	@Column (name = "data_nascimento_usuario")
	LocalDate dataNascUsuario;
	@Column (name = "peso_usuario")
	BigDecimal peso;
	@Column (name = "altura_usuario")
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
