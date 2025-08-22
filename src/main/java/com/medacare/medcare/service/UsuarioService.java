package com.medacare.medcare.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.medacare.medcare.model.Usuario;
import com.medacare.medcare.repo.UsuarioRepo;

@Service
public class UsuarioService {
	
	private final UsuarioRepo usuRepo;

	public UsuarioService(UsuarioRepo usuRepo) {
		super();
		this.usuRepo = usuRepo;
	}
	
	public Optional<Usuario> findByEmail(String email) {
        return usuRepo.findByEmailUsuario(email);
    }
	
	public void inserirUsuario (Usuario u) {
		usuRepo.save(u);
	}
	
	public List<Usuario> listarUsuarios (){
		return usuRepo.findAll();
	}
	
	public void atualizaUsuario (Usuario u) {
		if(usuRepo.existsByEmailUsuarioAndIdUsuarioNot(u.getEmailUsuario(), u.getIdUsuario())) {
			throw new RuntimeException("Email já existe");
		}
		usuRepo.save(u);
	}
	
	public void deletaUsuario (int id) {
		usuRepo.deleteById(id);
	}
	
	
	public Optional<Usuario> listaPorId (int id) {
		return usuRepo.findById(id);
	}
	
}
