/**
 * 
 */
package com.orbix.api.domain;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import javax.persistence.Column;
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
@Table(name = "procedures")
public class Procedure {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String note;
	private String type;
	@Column(name = "time_")
	private LocalTime time;
	private String diagnosis;
	@Column(name = "date_")
	private LocalDate date;
	private double hours;
	private double minutes;
	private String status;
	
	@ManyToOne(targetEntity = Consultation.class, fetch = FetchType.EAGER,  optional = true)
    @JoinColumn(name = "consultation_id", nullable = true , updatable = true)
    @OnDelete(action = OnDeleteAction.NO_ACTION)	
    private Consultation consultation;
	
	@ManyToOne(targetEntity = NonConsultation.class, fetch = FetchType.EAGER,  optional = true)
    @JoinColumn(name = "non_consultation_id", nullable = true , updatable = true)
    @OnDelete(action = OnDeleteAction.NO_ACTION)	
    private NonConsultation nonConsultation;
	
	@ManyToOne(targetEntity = Admission.class, fetch = FetchType.EAGER,  optional = true)
    @JoinColumn(name = "admission_id", nullable = true , updatable = true)
    @OnDelete(action = OnDeleteAction.NO_ACTION)	
    private Admission admission;
	
	@ManyToOne(targetEntity = ProcedureType.class, fetch = FetchType.EAGER,  optional = false)
    @JoinColumn(name = "procedure_type_id", nullable = false , updatable = true)
    @OnDelete(action = OnDeleteAction.NO_ACTION)	
    private ProcedureType procedureType;
	
	@OneToOne(targetEntity = PatientBill.class, fetch = FetchType.EAGER,  optional = false)
    @JoinColumn(name = "patient_bill_id", nullable = false , updatable = false)
    @OnDelete(action = OnDeleteAction.NO_ACTION)	
    private PatientBill patientBill;
	
	@ManyToOne(targetEntity = Patient.class, fetch = FetchType.EAGER,  optional = true)
	@JoinColumn(name = "patient_id", nullable = false , updatable = false)
    @OnDelete(action = OnDeleteAction.NO_ACTION)	
    private Patient patient;

	@Column(name = "created_by_user_id", nullable = false , updatable = false)
    private Long createdby;
	@Column(name = "created_on_day_id", nullable = false , updatable = false)
    private Long createdOn;
	private LocalDateTime createdAt = LocalDateTime.now();
	
    @Column(name = "ordered_by_user_id", nullable = false , updatable = false)
    private Long orderedby;
    @Column(name = "ordered_on_day_id", nullable = false , updatable = false)
    private Long orderedOn;
	private LocalDateTime orderedAt = LocalDateTime.now();

	@Column(name = "accepted_by_user_id", nullable = true , updatable = true)
    private Long acceptedby;
	@Column(name = "accepted_on_day_id", nullable = true , updatable = true)
    private Long acceptedOn;
	private LocalDateTime acceptedAt;
	
	@Column(name = "held_by_user_id", nullable = true , updatable = true)
    private Long heldby;
	@Column(name = "held_on_day_id", nullable = true , updatable = true)
    private Long heldOn;
	private LocalDateTime heldAt;

	@Column(name = "rejected_by_user_id", nullable = true , updatable = true)
    private Long rejectedby;
	@Column(name = "rejected_on_day_id", nullable = true , updatable = true)
    private Long rejectedOn;
	private LocalDateTime rejectedAt;
	private String rejectComment;
	
	@Column(name = "verified_by_user_id", nullable = true , updatable = true)
    private Long verifiedby;
	@Column(name = "verified_on_day_id", nullable = true , updatable = true)
    private Long verifiedOn;
	private LocalDateTime verifiedAt;
	
}
