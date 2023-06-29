/**
 * 
 */
package com.orbix.api.domain;

import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Godfrey
 *
 */
@Entity
@Data 
@NoArgsConstructor 
@AllArgsConstructor
@Table(name = "consultations")
public class Consultation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private Long createdBy;
	private Long createdOn;
	private LocalDateTime createdAt = LocalDateTime.now();
	
	/**
	 * A patient can have one or more consultations
	 */
	@ManyToOne(targetEntity = Patient.class, fetch = FetchType.EAGER,  optional = true)
    @JoinColumn(name = "patient_id", nullable = true , updatable = true)
    @OnDelete(action = OnDeleteAction.NO_ACTION)	
    private Patient patient;
	/**
	 * One can only have one bill, i.e. A single consultation can only be
	 * billed once
	 */
	@OneToOne(targetEntity = Bill.class, fetch = FetchType.EAGER,  optional = true)
    @JoinColumn(name = "bill_id", nullable = true , updatable = true)
    @OnDelete(action = OnDeleteAction.NO_ACTION)	
    private Bill bill;
	/**
	 * One patient visit can have one or more consultation i.e. 
	 */
	@ManyToOne(targetEntity = Visit.class, fetch = FetchType.EAGER,  optional = true)
    @JoinColumn(name = "visit_id", nullable = true , updatable = true)
    @OnDelete(action = OnDeleteAction.NO_ACTION)	
    private Visit visit;
	/**
	 * One consultation has one clinic, i.e. a patient is sent to one clinic in a single consultation
	 */
	@OneToOne(targetEntity = Clinic.class, fetch = FetchType.EAGER,  optional = true)
    @JoinColumn(name = "clinic_id", nullable = true , updatable = true)
    @OnDelete(action = OnDeleteAction.NO_ACTION)	
    private Clinic clinic;	
	/**
	 * One consultation has one clinician, i.e. a patient is sent to one clinician in a single consultation
	 * However, a patient can be reasigned to another clinician
	 */
	@OneToOne(targetEntity = Clinician.class, fetch = FetchType.EAGER,  optional = true)
    @JoinColumn(name = "clinician_id", nullable = true , updatable = true)
    @OnDelete(action = OnDeleteAction.NO_ACTION)	
    private Clinician clinician;
	
}
