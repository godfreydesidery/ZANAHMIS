/**
 * 
 */
package com.orbix.api.domain;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
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
@Table(name = "clinicians")
public class Clinician {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank
	@Column(unique = true)
	private String name;
	private String type;
	private boolean active = true;
		
	@ManyToMany
	@JoinTable(
	  name = "clinician_clinics", 
	  joinColumns = @JoinColumn(name = "clinician_id"), 
	  inverseJoinColumns = @JoinColumn(name = "clinic_id"))
	Set<Clinic> clinics;
}
