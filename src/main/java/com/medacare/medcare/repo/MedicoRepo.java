package com.medacare.medcare.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.medacare.medcare.model.Medico;

public interface MedicoRepo extends JpaRepository<Medico, Integer> {
	
	 Optional<Medico> findByCrm(String crm);
	    
	    List<Medico> findByEspecialidade(String especialidade);
	    
	    List<Medico> findByNomeMedicoContainingIgnoreCase(String nome);
	    
	    boolean existsByCrm(String crm);
    
    
}
