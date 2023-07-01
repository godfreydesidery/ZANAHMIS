/**
 * 
 */
package com.orbix.api.service;

import java.util.List;

import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.InsuranceProvider;
import com.orbix.api.domain.LabTestType;
import com.orbix.api.domain.LabTestTypePlanPrice;

/**
 * @author Godfrey
 *
 */
public interface LabTestTypePlanService {
	LabTestTypePlanPrice save(InsurancePlan insurancePlan, LabTestType labTestType, double price);	
	//List<LabTestTypePlanPrice>getLabTestTypePlans(); // return all the insuranceProviders	
	boolean deleteLabTestTypePlanPrice(InsurancePlan insurancePlan, LabTestType labTestType);
}
