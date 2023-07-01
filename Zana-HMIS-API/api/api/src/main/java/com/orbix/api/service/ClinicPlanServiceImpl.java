/**
 * 
 */
package com.orbix.api.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.ClinicPlanPrice;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.repositories.DayRepository;
import com.orbix.api.repositories.ClinicPlanPriceRepository;
import com.orbix.api.repositories.ClinicRepository;
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
public class ClinicPlanServiceImpl implements ClinicPlanService{
	private final UserRepository userRepository;
	private final UserService userService;
	private final DayRepository dayRepository;
	private final DayService dayService;
	private final ClinicPlanPriceRepository clinicPlanPriceRepository;
	
	@Override
	public ClinicPlanPrice save(InsurancePlan insurancePlan, Clinic clinic, double price) {
		Optional<ClinicPlanPrice> p = clinicPlanPriceRepository.findByInsurancePlanAndClinic(insurancePlan, clinic);
		ClinicPlanPrice plan = new ClinicPlanPrice();
		if(p.isPresent()) {
			//save existing
			p.get().setConsultationFee(price);
			plan = p.get();
		}else {
			plan.setInsurancePlan(insurancePlan);
			plan.setClinic(clinic);
			plan.setConsultationFee(price);
		}
		return clinicPlanPriceRepository.save(plan);
	}

	//@Override
	//public List<Clinic> getClinics() {
		//log.info("Fetching all clinics");
		//return clinicRepository.findAll();
	//}

	

	@Override
	public boolean deleteClinicPlanPrice(InsurancePlan insurancePlan, Clinic clinic) {
		/**
		 * Delete a clinic if a clinic is deletable
		 */
		Optional<ClinicPlanPrice> p = clinicPlanPriceRepository.findByInsurancePlanAndClinic(insurancePlan, clinic);
		
		clinicPlanPriceRepository.delete(p.get());
		return true;
	}
	
	private boolean allowDeleteClinic(Clinic clinic) {
		/**
		 * Code to check if a clinic is deletable
		 * Returns false if not
		 */
		return false;
	}
}
