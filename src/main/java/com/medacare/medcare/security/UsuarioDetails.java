package com.medacare.medcare.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.medacare.medcare.model.Usuario;

public class UsuarioDetails implements UserDetails {
	
	private final Usuario u;

	public UsuarioDetails(Usuario u) {
		super();
		this.u = u;
	}
	
	public String obterNome() {
		return u.getNomeUsuario();
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return u.getSenhaUsuario();
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return u.getEmailUsuario();
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return UserDetails.super.isAccountNonExpired();
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return UserDetails.super.isAccountNonLocked();
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return UserDetails.super.isCredentialsNonExpired();
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return UserDetails.super.isEnabled();
	}

	

	
	
	
}
