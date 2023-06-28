/**
 * 
 */
package com.orbix.api.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author GODFREY
 *
 */
@Entity
@Data 
@NoArgsConstructor 
@AllArgsConstructor
@Table(name = "products")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String barcode;
	@NotBlank
	@Column(unique = true)
	private String code;
	@NotBlank
	@Column(unique = true)
	private String description;
	@Column(unique = true)
	private String shortDescription;
	private String commonName;
	private double discount = 0;
	private double vat = 0;
	@Column(columnDefinition = "varchar(255) default 'V2'")
	private String vatGroup;
	private double profitMargin = 0;
	private double costPriceVatIncl = 0;
	private double costPriceVatExcl = 0;
	private double sellingPriceVatIncl = 0;
	private double sellingPriceVatExcl = 0;
	private String uom;
	private double packSize = 1;
	private double stock = 0;
	private double minimumInventory = 0;
	private double maximumInventory = 0;
	private double defaultReorderQty = 0;
	private double defaultReorderLevel = 0;
	private boolean active = true;
	private boolean sellable = true;
	private String ingredients = "";
		
		
}
