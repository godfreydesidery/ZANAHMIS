/**
 * 
 */
package com.orbix.api.domain;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.Valid;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
@Table(name = "non_consultations")
public class NonConsultation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String paymentType = "";//CASH,DEBIT CARD, CREDIT CARD, MOBILE, INSURANCE
	private String membershipNo = "";
	
	private String status = "";
	
	private Long createdBy;
	private Long createdOn;
	private LocalDateTime createdAt = LocalDateTime.now();
	
	/**
	 * A patient can have one or more non consultations
	 */
	@ManyToOne(targetEntity = Patient.class, fetch = FetchType.LAZY,  optional = true)
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
	
	@OneToOne(targetEntity = InsurancePlan.class, fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "insurance_plan_id", nullable = true , updatable = true)
    @OnDelete(action = OnDeleteAction.NO_ACTION)	
    private InsurancePlan insurancePlan;
	
	
	@OneToMany(targetEntity = LabTest.class, mappedBy = "nonConsultation", fetch = FetchType.EAGER, orphanRemoval = true)
    @Valid
    @JsonIgnoreProperties("nonConsultation")
	@Fetch(value = FetchMode.SUBSELECT)
    private List<LabTest> labTests;
}
