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
import javax.validation.constraints.NotBlank;

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
	@NotBlank
	private String paymentType = "";//CASH,DEBIT CARD, CREDIT CARD, MOBILE, INSURANCE
	private String membershipNo = "";
	@NotBlank
	private String status;
	
	/**
	 * A patient can have one or more non consultations
	 */
	@ManyToOne(targetEntity = Patient.class, fetch = FetchType.EAGER,  optional = false)
    @JoinColumn(name = "patient_id", nullable = false , updatable = false)
    @OnDelete(action = OnDeleteAction.NO_ACTION)	
    private Patient patient;
	
	/**
	 * One patient visit can have one or more consultation i.e. 
	 */
	@ManyToOne(targetEntity = Visit.class, fetch = FetchType.EAGER,  optional = false)
    @JoinColumn(name = "visit_id", nullable = false , updatable = false)
    @OnDelete(action = OnDeleteAction.NO_ACTION)	
    private Visit visit;
	
	@ManyToOne(targetEntity = InsurancePlan.class, fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "insurance_plan_id", nullable = true , updatable = true)
    @OnDelete(action = OnDeleteAction.NO_ACTION)	
    private InsurancePlan insurancePlan;
	
	
	@OneToMany(targetEntity = LabTest.class, mappedBy = "nonConsultation", fetch = FetchType.EAGER, orphanRemoval = true)
    @Valid
    @JsonIgnoreProperties("nonConsultation")
	@Fetch(value = FetchMode.SUBSELECT)
    private List<LabTest> labTests;
	
	@OneToMany(targetEntity = Radiology.class, mappedBy = "nonConsultation", fetch = FetchType.EAGER, orphanRemoval = true)
    @Valid
    @JsonIgnoreProperties("nonConsultation")
	@Fetch(value = FetchMode.SUBSELECT)
    private List<Radiology> radiologies;
	
	@OneToMany(targetEntity = Procedure.class, mappedBy = "nonConsultation", fetch = FetchType.EAGER, orphanRemoval = true)
    @Valid
    @JsonIgnoreProperties("nonConsultation")
	@Fetch(value = FetchMode.SUBSELECT)
    private List<Procedure> procedures;
	
	@OneToMany(targetEntity = Prescription.class, mappedBy = "nonConsultation", fetch = FetchType.EAGER, orphanRemoval = true)
    @Valid
    @JsonIgnoreProperties("nonConsultation")
	@Fetch(value = FetchMode.SUBSELECT)
    private List<Prescription> prescriptions;
	
	@ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER,  optional = false)
    @JoinColumn(name = "created_by_user_id", nullable = false , updatable = false)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private User createdby;
	
	@ManyToOne(targetEntity = Day.class, fetch = FetchType.EAGER,  optional = false)
    @JoinColumn(name = "created_on_day_id", nullable = false , updatable = false)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private User createdOn;
	private LocalDateTime createdAt = LocalDateTime.now();
}
