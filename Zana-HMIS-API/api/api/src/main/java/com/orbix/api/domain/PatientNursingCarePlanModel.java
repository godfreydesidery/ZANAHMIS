/**
 * 
 */
package com.orbix.api.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.Data;

/**
 * @author Godfrey
 *
 */
@Data
public class PatientNursingCarePlanModel {
	private Long id;
	private String nursingDiagnosis;
	private String expectedOutcome;
	private String implementation;
	private String evaluation;
    private Consultation consultation;	
    private NonConsultation nonConsultation;		
    private Admission admission;			
    private Patient patient;		
    private Nurse nurse;	
	private String created;
}
