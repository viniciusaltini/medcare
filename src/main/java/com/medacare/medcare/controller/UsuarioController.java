package com.medacare.medcare.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.boot.autoconfigure.couchbase.CouchbaseProperties.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medacare.medcare.model.Usuario;
import com.medacare.medcare.security.UsuarioDetailsService;
import com.medacare.medcare.service.UsuarioService;

@RestController
@CrossOrigin
@RequestMapping("/usuarios")
public class UsuarioController {

	private final UsuarioService usuService;
		
	public UsuarioController(UsuarioService usuService) {
		super();
		this.usuService = usuService;
	}

	@PostMapping
	public void inserirUsuario (@RequestBody Usuario u) {
		usuService.inserirUsuario(u);
	}
	
	@GetMapping
	public List<Usuario> listarUsuarios () {
		return usuService.listarUsuarios();
	}
	
	@PutMapping
	public void atualizaUsuario (@RequestBody Usuario u) {
		usuService.atualizaUsuario(u);
	}
	
	@DeleteMapping("/{id}")
	public void deletaUsuario (@PathVariable int id) {
		usuService.deletaUsuario(id);
	}
	
	@GetMapping("/{id}")
	public Optional<Usuario> listaPorId (@PathVariable int id) {
		return usuService.listaPorId(id);
	}
	
	 @GetMapping("/me")
	    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
	        // authentication.getPrincipal() is typically a UserDetails object
	        UsuarioDetailsService userDetails = (UsuarioDetailsService) authentication.getPrincipal();

	        // If you have a User entity with "name" field:
	        return ResponseEntity.ok(Map.of(
	            "name", userDetails.getName(),
	            "email", userDetails.getUsername()  // usually the login
	        ));
	    }
}
