/**
 * 
 */
package com.orbix.api.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

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
	/**
	 * Contact details
	 */
	private String phoneNo;		
	private String address;
	private String email;
	private String nationality;
	private String nationalID;	
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
	
}
