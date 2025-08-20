package com.medacare.medcare.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medacare.medcare.model.Usuario;

public interface UsuarioRepo extends JpaRepository<Usuario, Integer> {
	
	boolean existsByEmailUsuarioAndIdUsuarioNot(String email, int id);
	
	Optional<Usuario> findByEmailUsuario (String emailUsuario);
}
