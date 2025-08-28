package com.medacare.medcare.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medacare.medcare.model.Medico;
import com.medacare.medcare.repo.MedicoRepo;

@Service
public class MedicoService {
		
	@Autowired
	private final MedicoRepo medRepo;
	
	public MedicoService(MedicoRepo medRepo) {
		super();
		this.medRepo = medRepo;
	}

	public Medico inserirMedico(Medico medico) {
        return medRepo.save(medico);
    }
    
    public List<Medico> listarTodosMedicos() {
        return medRepo.findAll();
    }
    
    public Medico atualizarMedico(int id, Medico medicoAtualizado) {
        return medRepo.findById(id)
            .map(medico -> {
                medico.setNomeMedico(medicoAtualizado.getNomeMedico());
                medico.setCrm(medicoAtualizado.getCrm());
                medico.setSenhaMedico(medicoAtualizado.getSenhaMedico());
                medico.setDataNascMedico(medicoAtualizado.getDataNascMedico());
                medico.setEspecialidade(medicoAtualizado.getEspecialidade());
                return medRepo.save(medico);
            })
            .orElseThrow(() -> new RuntimeException("Médico não encontrado"));
    }
    
    public void deletarMedico(int id) {
        medRepo.deleteById(id);
    }
    
    public Optional<Medico> buscarMedicoPorId(int id) {
        return medRepo.findById(id);
    }
    
    public List<Medico> buscarMedicosPorEspecialidade(String especialidade) {
        return medRepo.findByEspecialidade(especialidade);
    }
    
    public Optional<Medico> buscarMedicoPorCrm(String crm) {
        return medRepo.findByCrm(crm);
    }
    
    public boolean existePorCrm(String crm) {
        return medRepo.existsByCrm(crm);
    }
	
}
