/**
 * 
 */
package com.orbix.api.domain;

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
@Table(name = "medicines")
public class Medicine {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank
	@Column(unique = true)
	private String name = "";
	private String uom = "";
	private double price = 0;
	private double stock = 0;
	private boolean active = true;
}