package com.medacare.medcare.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.medacare.medcare.model.Medico;
import com.medacare.medcare.repo.MedicoRepo;

@Service
public class MedicoService {
		
	private final MedicoRepo medRepo;
	
	public MedicoService(MedicoRepo medRepo) {
		super();
		this.medRepo = medRepo;
	}

	public void inserirMedico (Medico med) {
		medRepo.save(med);
	}
	
	public List<Medico> listarMedicos (){
		return medRepo.findAll();
	}
	
	public void atualizarMedico (Medico med){
		medRepo.save(med);
	}
	
	public void deletarMedico (int id) {
		medRepo.deleteById(id);
	}
	
}
