/**
 * 
 */
package com.orbix.api.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.RegistrationPlanPrice;
import com.orbix.api.repositories.DayRepository;
import com.orbix.api.repositories.RegistrationPlanPriceRepository;
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
public class RegistrationPlanServiceImpl implements RegistrationPlanService{
	private final UserRepository userRepository;
	private final UserService userService;
	private final DayRepository dayRepository;
	private final DayService dayService;
	private final RegistrationPlanPriceRepository registrationPlanPriceRepository;
	
	@Override
	public RegistrationPlanPrice save(InsurancePlan insurancePlan, double price) {
		Optional<RegistrationPlanPrice> p = registrationPlanPriceRepository.findByInsurancePlan(insurancePlan);
		RegistrationPlanPrice plan = new RegistrationPlanPrice();
		if(p.isPresent()) {
			//save existing
			p.get().setRegistrationFee(price);
			plan = p.get();
		}else {
			plan.setInsurancePlan(insurancePlan);
			plan.setRegistrationFee(price);
		}
		return registrationPlanPriceRepository.save(plan);
	}

	//@Override
	//public List<Registration> getRegistrations() {
		//log.info("Fetching all registrations");
		//return registrationRepository.findAll();
	//}

	

	@Override
	public boolean deleteRegistrationPlanPrice(InsurancePlan insurancePlan) {
		/**
		 * Delete a registration if a registration is deletable
		 */
		Optional<RegistrationPlanPrice> p = registrationPlanPriceRepository.findByInsurancePlan(insurancePlan);
		
		registrationPlanPriceRepository.delete(p.get());
		return true;
	}
	
	private boolean allowDeleteRegistration() {
		/**
		 * Code to check if a registration is deletable
		 * Returns false if not
		 */
		return false;
	}
}
