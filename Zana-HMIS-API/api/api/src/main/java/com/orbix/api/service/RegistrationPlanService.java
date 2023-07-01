/**
 * 
 */
package com.orbix.api.service;

import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.RegistrationPlanPrice;

/**
 * @author Godfrey
 *
 */
public interface RegistrationPlanService {
	RegistrationPlanPrice save(InsurancePlan insurancePlan, double price);	
	//List<RegistrationPlanPrice>getRegistrationPlans(); // return all the insuranceProviders	
	boolean deleteRegistrationPlanPrice(InsurancePlan insurancePlan);
}
