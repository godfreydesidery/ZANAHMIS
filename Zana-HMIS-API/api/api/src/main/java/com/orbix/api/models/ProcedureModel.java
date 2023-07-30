/**
 * 
 */
package com.orbix.api.models;

import com.orbix.api.domain.Admission;
import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.NonConsultation;
import com.orbix.api.domain.Patient;
import com.orbix.api.domain.PatientBill;
import com.orbix.api.domain.ProcedureType;
import lombok.Data;

/**
 * @author Godfrey
 *
 */
@Data
public class ProcedureModel {

	private Long id = null;
	private String note = "";
	private String status = "";
		
    private Consultation consultation = null;	
    private NonConsultation nonConsultation = null;	
    private Admission admission = null;	
    private ProcedureType procedureType = null;		
    private PatientBill patientBill = null;
    private Patient patient = null;
    
    private String created;   
    private String ordered;
    private String accepted;
    private String held;
    private String rejected;
    private String rejectComment;
    private String verified;
}
