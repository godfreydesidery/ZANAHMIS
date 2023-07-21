/**
 * 
 */
package com.orbix.api.domain;

import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

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
@Table(name = "lab_test_types")
public class LabTestType {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank
	@Column(unique = true)
	private String code = "";
	@NotBlank
	@Column(unique = true)
	private String name = "";
	private String description = "";
	private String uom = "";
	private double price = 0;
	private boolean active = true;
	
	@OneToMany(targetEntity = LabTestTypeRange.class, mappedBy = "labTestType", fetch = FetchType.EAGER, orphanRemoval = true)
    @Valid
    @JsonIgnoreProperties("labTestType")
    private List<LabTestTypeRange> labTestTypeRanges;
}
