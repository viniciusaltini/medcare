package com.medacare.medcare.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
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
		System.out.println("Nome: " + u.getNomeUsuario());
	    System.out.println("Email: " + u.getEmailUsuario());
	    System.out.println("Senha: " + u.getSenhaUsuario());
		usuService.inserirUsuario(u);
	}
	
	@GetMapping
	public List<Usuario> listarUsuarios () {
		return usuService.listarUsuarios();
	}
	
	@PutMapping
	public ResponseEntity<?> atualizaUsuario(@RequestBody Map<String, Object> dadosAtualizados, Authentication authentication) {
	    try {
	        if (authentication == null || !authentication.isAuthenticated()) {
	            return ResponseEntity.status(401).body("Não autenticado");
	        }

	        String email = authentication.getName();
	        Optional<Usuario> usuarioOpt = usuService.findByEmail(email);
	        
	        if (usuarioOpt.isPresent()) {
	            Usuario usuario = usuarioOpt.get();
	            
	            // Atualiza apenas os campos permitidos
	            if (dadosAtualizados.containsKey("dataNascimentoUsuario")) {
	                usuario.setDataNascUsuario(java.time.LocalDate.parse(dadosAtualizados.get("dataNascimentoUsuario").toString()));
	            }
	            if (dadosAtualizados.containsKey("pesoUsuario")) {
	                Object peso = dadosAtualizados.get("pesoUsuario");
	                if (peso != null) {
	                    usuario.setPeso(new java.math.BigDecimal(peso.toString()));
	                } else {
	                    usuario.setPeso(null);
	                }
	            }
	            if (dadosAtualizados.containsKey("alturaUsuario")) {
	                Object altura = dadosAtualizados.get("alturaUsuario");
	                if (altura != null) {
	                    usuario.setAltura(new java.math.BigDecimal(altura.toString()));
	                } else {
	                    usuario.setAltura(null);
	                }
	            }
	            
	            usuService.atualizaUsuario(usuario);
	            return ResponseEntity.ok().build();
	        }
	        
	        return ResponseEntity.notFound().build();
	        
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body("Erro ao atualizar: " + e.getMessage());
	    }
	}
	
	@DeleteMapping("/{id}")
	public void deletaUsuario (@PathVariable int id) {
		usuService.deletaUsuario(id);
	}
	
	@GetMapping("/{id}")
	public Optional<Usuario> listaPorId (@PathVariable int id) {
		return usuService.listaPorId(id);
	}
	 // Endpoint para obter o usuário atual logado
    @GetMapping("/atual")
    public ResponseEntity<?> getUsuarioAtual(Authentication authentication) {
        Map<String, Object> response = new HashMap<>();
        
        if (authentication == null || !authentication.isAuthenticated() || 
            "anonymousUser".equals(authentication.getPrincipal())) {
            
            response.put("autenticado", false);
            response.put("nomeUsuario", "Visitante");
            return ResponseEntity.ok(response);
        }

        // Obtém o email do usuário logado do Spring Security
        String email = authentication.getName();
        
        // Busca o usuário completo no banco pelo email
        Optional<Usuario> usuarioOpt = usuService.findByEmail(email);
        
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            response.put("autenticado", true);
            response.put("idUsuario", usuario.getIdUsuario());
            response.put("nomeUsuario", usuario.getNomeUsuario());
            response.put("emailUsuario", usuario.getEmailUsuario());
            response.put("dataNascimentoUsuario", usuario.getDataNascUsuario());
            response.put("pesoUsuario", usuario.getPeso());
            response.put("alturaUsuario", usuario.getAltura());
        } else {
            response.put("autenticado", false);
            response.put("nomeUsuario", "Visitante");
            response.put("mensagem", "Usuário não encontrado no banco de dados");
        }
        
        return ResponseEntity.ok(response);
    }

    // Endpoint simplificado apenas para o nome do usuário
    @GetMapping("/nome-atual")
    public ResponseEntity<String> getNomeUsuarioAtual(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated() || 
            "anonymousUser".equals(authentication.getPrincipal())) {
            return ResponseEntity.ok("Visitante");
        }

        String email = authentication.getName();
        Optional<Usuario> usuarioOpt = usuService.findByEmail(email);
        
        return ResponseEntity.ok(usuarioOpt.map(Usuario::getNomeUsuario).orElse("Visitante"));
    }
    
    @GetMapping("/id-atual")
    public ResponseEntity<String> getIdUsuarioAtual(Authentication authentication) {
        
        if (authentication == null || !authentication.isAuthenticated() || 
            "anonymousUser".equals(authentication.getPrincipal())) {
            return ResponseEntity.ok("Visitante");
        }

        try {
            String email = authentication.getName();
            Usuario usuario = usuService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado para email: " + email));
            
            return ResponseEntity.ok(String.valueOf(usuario.getIdUsuario()));
            
        } catch (Exception e) {
            // Log do erro
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("1"); // Fallback para ID 1 em caso de erro
        }
    }
	
}
