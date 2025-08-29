package com.medacare.medcare.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@Configuration
public class JacksonConfig {
	   @Bean
	    public ObjectMapper objectMapper() {
	        ObjectMapper mapper = new ObjectMapper();

	        // Suporte a LocalDateTime e outros tipos do Java 8
	        mapper.registerModule(new JavaTimeModule());

	        // Evita erro de datas em timestamp (número gigante)
	        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

	        // Evita erro de beans vazios
	        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);

	        return mapper;
	    }
}
