/**
 * 
 */
package com.orbix.api.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.ProcedureType;
import com.orbix.api.domain.ProcedureTypePlanPrice;
import com.orbix.api.repositories.DayRepository;
import com.orbix.api.repositories.ProcedureTypePlanPriceRepository;
import com.orbix.api.repositories.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * @author Godfrey
 *
 */
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ProcedureTypePlanServiceImpl implements ProcedureTypePlanService{
	private final UserRepository userRepository;
	private final UserService userService;
	private final DayRepository dayRepository;
	private final DayService dayService;
	private final ProcedureTypePlanPriceRepository procedureTypePlanPriceRepository;
	
	@Override
	public ProcedureTypePlanPrice save(InsurancePlan insurancePlan, ProcedureType procedureType, double price) {
		Optional<ProcedureTypePlanPrice> p = procedureTypePlanPriceRepository.findByInsurancePlanAndProcedureType(insurancePlan, procedureType);
		ProcedureTypePlanPrice plan = new ProcedureTypePlanPrice();
		if(p.isPresent()) {
			//save existing
			p.get().setPrice(price);
			plan = p.get();
		}else {
			plan.setInsurancePlan(insurancePlan);
			plan.setProcedureType(procedureType);
			plan.setPrice(price);
		}
		return procedureTypePlanPriceRepository.save(plan);
	}

	//@Override
	//public List<ProcedureType> getProcedureTypes() {
		//log.info("Fetching all procedureTypes");
		//return procedureTypeRepository.findAll();
	//}

	

	@Override
	public boolean deleteProcedureTypePlanPrice(InsurancePlan insurancePlan, ProcedureType procedureType) {
		/**
		 * Delete a procedureType if a procedureType is deletable
		 */
		Optional<ProcedureTypePlanPrice> p = procedureTypePlanPriceRepository.findByInsurancePlanAndProcedureType(insurancePlan, procedureType);
		
		procedureTypePlanPriceRepository.delete(p.get());
		return true;
	}
	
	private boolean allowDeleteProcedureType(ProcedureType procedureType) {
		/**
		 * Code to check if a procedureType is deletable
		 * Returns false if not
		 */
		return false;
	}
}
