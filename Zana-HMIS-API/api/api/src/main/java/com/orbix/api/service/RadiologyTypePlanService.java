/**
 * 
 */
package com.orbix.api.service;

import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.RadiologyType;
import com.orbix.api.domain.RadiologyTypePlanPrice;

/**
 * @author Godfrey
 *
 */
public interface RadiologyTypePlanService {
	RadiologyTypePlanPrice save(InsurancePlan insurancePlan, RadiologyType radiologyType, double price);	
	//List<RadiologyTypePlanPrice>getRadiologyTypePlans(); // return all the insuranceProviders	
	boolean deleteRadiologyTypePlanPrice(InsurancePlan insurancePlan, RadiologyType radiologyType);
}
