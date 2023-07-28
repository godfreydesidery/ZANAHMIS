/**
 * 
 */
package com.orbix.api.models;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.LabTestType;
import com.orbix.api.domain.NonConsultation;
import com.orbix.api.domain.Patient;
import com.orbix.api.domain.PatientBill;

import lombok.Data;

/**
 * @author Godfrey
 *
 */
@Data
public class LabTestModel {

	private Long id = null;
	private String result = "";
	private String range = "";
	private String level = "";
	private String unit = "";
	private String status = "";
	private Consultation consultation = null;
	private NonConsultation nonConsultation = null;
	private LabTestType labTestType = null;
	private PatientBill patientBill = null;
	private Patient patient = null;
	
	String verified = "";	
}
