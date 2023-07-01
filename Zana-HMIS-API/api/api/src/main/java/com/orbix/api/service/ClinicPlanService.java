/**
 * 
 */
package com.orbix.api.service;

import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.ClinicPlanPrice;

/**
 * @author Godfrey
 *
 */
public interface ClinicPlanService {
	ClinicPlanPrice save(InsurancePlan insurancePlan, Clinic clinic, double price);	
	//List<ClinicPlanPrice>getClinicPlans(); // return all the insuranceProviders	
	boolean deleteClinicPlanPrice(InsurancePlan insurancePlan, Clinic clinic);
}
