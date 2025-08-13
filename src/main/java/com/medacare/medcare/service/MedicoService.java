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
		if (med.getCrm().length() != 13) {
			throw new RuntimeException("CRM inválido");
		}
		medRepo.save(med);
	}
	
	public List<Medico> listarMedicos (){
		return medRepo.findAll();
	}
	
	public void atualizarMedico (Medico med){
		if(medRepo.existsByCrmAndIdMedicoNot(med.getCrm(), med.getIdMedico())) {
			throw new RuntimeException("CRM já existe");
		}
		medRepo.save(med);
	}
	
	public void deletarMedico (int id) {
		medRepo.deleteById(id);
	}
	
}
