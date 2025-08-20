package com.medacare.medcare.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

	private UsuarioDetailsService userDetailsService;

	public SecurityConfig(UsuarioDetailsService userDetailsService) {
		this.userDetailsService = userDetailsService;
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable())
				.authorizeHttpRequests(auth -> auth.requestMatchers("/css/**", "/js/**")
						.permitAll().anyRequest().authenticated()) // Exige autenticação para outras páginas
				.formLogin(form -> form.loginPage("/html/loginPaciente.html") // Define a página de login personalizada
						.loginProcessingUrl("/loginPaciente") // Action do formulário de login
						.usernameParameter("email") // Campo de email no formulário
						.passwordParameter("password") // Campo de senha no formulário
						.defaultSuccessUrl("/html/dashbordPaciente.html", true).permitAll()) // Redirecionamento após login bem-sucedido
				.logout(logout -> logout.permitAll()); // Permite logout sem autenticação
		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return NoOpPasswordEncoder.getInstance();
	}

	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsService);
		authProvider.setPasswordEncoder(passwordEncoder());
		return authProvider;
	}
}