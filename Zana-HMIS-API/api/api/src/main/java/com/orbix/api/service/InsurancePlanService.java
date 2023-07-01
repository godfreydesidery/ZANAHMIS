/**
 * 
 */
package com.orbix.api.service;

import java.util.List;

import com.orbix.api.domain.InsurancePlan;

/**
 * @author Godfrey
 *
 */
public interface InsurancePlanService {
	InsurancePlan save(InsurancePlan insurancePlan);	
	List<InsurancePlan>getInsurancePlans(); // return all the insurancePlans
	InsurancePlan getInsurancePlanByName(String name);
	InsurancePlan getInsurancePlanById(Long id);
	boolean deleteInsurancePlan(InsurancePlan insurancePlan);
}
