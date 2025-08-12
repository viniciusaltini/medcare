package com.medacare.medcare.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medacare.medcare.model.Usuario;

public interface UsuarioRepo extends JpaRepository<Usuario, Integer> {

	
}
