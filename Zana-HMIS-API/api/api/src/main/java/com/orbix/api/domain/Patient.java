/**
 * 
 */
package com.orbix.api.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
import javax.validation.constraints.NotBlank;

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
@Table(name = "patients")
public class Patient {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank
	@Column(unique = true)
	private String no;
	@NotBlank
	@Column(unique = true)
	private String searchKey;
	/**
	 * Patients basic details
	 */
	@NotBlank
	private String firstName;
	private String middleName;
	@NotBlank
	private String lastName;
	private LocalDate dateOfBirth;
	private String gender;
	private String patientType;
	/**
	 * Initial payment method
	 */
	private String paymentType = "";
	private String memberShipNo = "";
	/**
	 * Contact details
	 */
	private String phoneNo;		
	private String address;
	private String email;
	private String nationality;
	private String nationalId;	
	private String passportNo;
	/**
	 * Next of kin details
	 */
	private String kinFullName;
	private String kinRelationship;
	private String kinPhoneNo;
	/**
	 * To specify whether patient is active or not
	 */
	private boolean active = true;
	/**
	 * 
	 */
	private Long createdBy;
	private Long createdOn;
	private LocalDateTime createdAt = LocalDateTime.now();
	
	private Long registrationBillId;
	private double registrationFee;
	private String registrationFeeStatus = "";
	
	private String cardNo = "";
	private String cardValidationStatus = "";
	
	@ManyToOne(targetEntity = InsurancePlan.class, fetch = FetchType.LAZY,  optional = true)
    @JoinColumn(name = "insurance_plan_id", nullable = true , updatable = true)
    @OnDelete(action = OnDeleteAction.NO_ACTION)	
    private InsurancePlan insurancePlan;
}
