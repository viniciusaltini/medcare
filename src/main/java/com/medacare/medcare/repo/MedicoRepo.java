package com.medacare.medcare.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medacare.medcare.model.Medico;

public interface MedicoRepo extends JpaRepository<Medico, Integer> {
	
	
}
