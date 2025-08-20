package com.medacare.medcare.security;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import com.medacare.medcare.model.Usuario;
import com.medacare.medcare.repo.UsuarioRepo;

@Service
public class UsuarioDetailsService implements UserDetailsService {

	private UsuarioRepo repo;

	public UsuarioDetailsService(UsuarioRepo repo) {
		this.repo = repo;
	}

	@Override
	public UserDetails loadUserByUsername (String email) throws UsernameNotFoundException {
		Usuario usuario = repo.findByEmailUsuario(email)
				.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
		return new User(usuario.getEmailUsuario(), usuario.getSenhaUsuario(),
				Collections.singletonList(new SimpleGrantedAuthority("USER")));
	}
}
