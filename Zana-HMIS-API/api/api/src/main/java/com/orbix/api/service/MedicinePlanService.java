/**
 * 
 */
package com.orbix.api.service;

import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.Medicine;
import com.orbix.api.domain.MedicinePlanPrice;

/**
 * @author Godfrey
 *
 */
public interface MedicinePlanService {
	MedicinePlanPrice save(InsurancePlan insurancePlan, Medicine medicine, double price);	
	//List<MedicinePlanPrice>getMedicinePlans(); // return all the insuranceProviders	
	boolean deleteMedicinePlanPrice(InsurancePlan insurancePlan, Medicine medicine);
}
