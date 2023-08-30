/**
 * 
 */
package com.orbix.api.domain;

import java.time.LocalDateTime;
import java.util.Set;

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
@Table(name = "clinical_notes")
public class ClinicalNote {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(length = 500)
	private String mainComplain;
	@Column(length = 3000)
	private String presentIllnessHistory;
	@Column(length = 3000)
	private String pastMedicalHistory;
	@Column(length = 3000)
	private String familyAndSocialHistory;
	@Column(length = 3000)
	private String drugsAndAllergyHistory;
	@Column(length = 3000)
	private String reviewOfOtherSystems;
	@Column(length = 3000)
	private String physicalExamination;
	@Column(length = 3000)
	private String managementPlan;
	
	@OneToOne(targetEntity = Consultation.class, fetch = FetchType.EAGER,  optional = false)
    @JoinColumn(name = "consultation_id", nullable = false , updatable = false)
    @OnDelete(action = OnDeleteAction.NO_ACTION)	
    private Consultation consultation;
	
	@Column(name = "created_by_user_id", nullable = false , updatable = false)
    private Long createdby;
	@Column(name = "created_on_day_id", nullable = false , updatable = false)
    private Long createdOn;
	private LocalDateTime createdAt = LocalDateTime.now();
	
}
