/**
 * 
 */
package com.orbix.api.service;

import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.ProcedureType;
import com.orbix.api.domain.ProcedureTypePlanPrice;

/**
 * @author Godfrey
 *
 */
public interface ProcedureTypePlanService {
	ProcedureTypePlanPrice save(InsurancePlan insurancePlan, ProcedureType procedureType, double price);	
	//List<ProcedureTypePlanPrice>getProcedureTypePlans(); // return all the insuranceProviders	
	boolean deleteProcedureTypePlanPrice(InsurancePlan insurancePlan, ProcedureType procedureType);
}
