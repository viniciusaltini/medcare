package com.medacare.medcare.dto;

public class MedicoDTO {
	 private int idMedico;
	    private String nomeMedico;
	    private String crm;
	    private String especialidade;
		public MedicoDTO(int idMedico, String nomeMedico, String crm, String especialidade) {
			super();
			this.idMedico = idMedico;
			this.nomeMedico = nomeMedico;
			this.crm = crm;
			this.especialidade = especialidade;
		}
		public int getIdMedico() {
			return idMedico;
		}
		public void setIdMedico(int idMedico) {
			this.idMedico = idMedico;
		}
		public String getNomeMedico() {
			return nomeMedico;
		}
		public void setNomeMedico(String nomeMedico) {
			this.nomeMedico = nomeMedico;
		}
		public String getCrm() {
			return crm;
		}
		public void setCrm(String crm) {
			this.crm = crm;
		}
		public String getEspecialidade() {
			return especialidade;
		}
		public void setEspecialidade(String especialidade) {
			this.especialidade = especialidade;
		}
		public MedicoDTO() {
			
		}
	    
	    
}
