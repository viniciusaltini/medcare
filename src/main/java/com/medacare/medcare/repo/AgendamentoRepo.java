package com.medacare.medcare.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medacare.medcare.model.Agendamento;

public interface AgendamentoRepo extends JpaRepository<Agendamento, Integer>{

}
