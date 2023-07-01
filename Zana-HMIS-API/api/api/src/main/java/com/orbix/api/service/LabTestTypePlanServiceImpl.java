/**
 * 
 */
package com.orbix.api.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.LabTestType;
import com.orbix.api.domain.LabTestTypePlanPrice;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.repositories.DayRepository;
import com.orbix.api.repositories.LabTestTypePlanPriceRepository;
import com.orbix.api.repositories.LabTestTypeRepository;
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
public class LabTestTypePlanServiceImpl implements LabTestTypePlanService{
	private final UserRepository userRepository;
	private final UserService userService;
	private final DayRepository dayRepository;
	private final DayService dayService;
	private final LabTestTypePlanPriceRepository labTestTypePlanPriceRepository;
	
	@Override
	public LabTestTypePlanPrice save(InsurancePlan insurancePlan, LabTestType labTestType, double price) {
		Optional<LabTestTypePlanPrice> p = labTestTypePlanPriceRepository.findByInsurancePlanAndLabTestType(insurancePlan, labTestType);
		LabTestTypePlanPrice plan = new LabTestTypePlanPrice();
		if(p.isPresent()) {
			//save existing
			p.get().setPrice(price);
			plan = p.get();
		}else {
			plan.setInsurancePlan(insurancePlan);
			plan.setLabTestType(labTestType);
			plan.setPrice(price);
		}
		return labTestTypePlanPriceRepository.save(plan);
	}

	//@Override
	//public List<LabTestType> getLabTestTypes() {
		//log.info("Fetching all labTestTypes");
		//return labTestTypeRepository.findAll();
	//}

	

	@Override
	public boolean deleteLabTestTypePlanPrice(InsurancePlan insurancePlan, LabTestType labTestType) {
		/**
		 * Delete a labTestType if a labTestType is deletable
		 */
		Optional<LabTestTypePlanPrice> p = labTestTypePlanPriceRepository.findByInsurancePlanAndLabTestType(insurancePlan, labTestType);
		
		labTestTypePlanPriceRepository.delete(p.get());
		return true;
	}
	
	private boolean allowDeleteLabTestType(LabTestType labTestType) {
		/**
		 * Code to check if a labTestType is deletable
		 * Returns false if not
		 */
		return false;
	}
}
