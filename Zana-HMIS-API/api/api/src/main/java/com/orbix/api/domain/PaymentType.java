/**
 * 
 */
package com.orbix.api.domain;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Godfrey
 *
 */
@Data 
@NoArgsConstructor 
@AllArgsConstructor
public class PaymentType {
	private String name = "";
	private String insurancePlanName = "";
	private String insuranceMembershipNo = "";	
}
