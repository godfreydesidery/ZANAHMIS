/**
 * 
 */
package com.orbix.api.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.Medicine;
import com.orbix.api.domain.MedicinePlanPrice;
import com.orbix.api.repositories.DayRepository;
import com.orbix.api.repositories.MedicineRepository;
import com.orbix.api.repositories.MedicinePlanPriceRepository;
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
public class MedicinePlanServiceImpl implements MedicinePlanService{
	private final UserRepository userRepository;
	private final UserService userService;
	private final DayRepository dayRepository;
	private final DayService dayService;
	private final MedicinePlanPriceRepository medicinePlanPriceRepository;
	
	@Override
	public MedicinePlanPrice save(InsurancePlan insurancePlan, Medicine medicine, double price) {
		Optional<MedicinePlanPrice> p = medicinePlanPriceRepository.findByInsurancePlanAndMedicine(insurancePlan, medicine);
		MedicinePlanPrice plan = new MedicinePlanPrice();
		if(p.isPresent()) {
			//save existing
			p.get().setPrice(price);
			plan = p.get();
		}else {
			plan.setInsurancePlan(insurancePlan);
			plan.setMedicine(medicine);
			plan.setPrice(price);
		}
		return medicinePlanPriceRepository.save(plan);
	}

	//@Override
	//public List<Medicine> getMedicines() {
		//log.info("Fetching all medicines");
		//return medicineRepository.findAll();
	//}

	

	@Override
	public boolean deleteMedicinePlanPrice(InsurancePlan insurancePlan, Medicine medicine) {
		/**
		 * Delete a medicine if a medicine is deletable
		 */
		Optional<MedicinePlanPrice> p = medicinePlanPriceRepository.findByInsurancePlanAndMedicine(insurancePlan, medicine);
		
		medicinePlanPriceRepository.delete(p.get());
		return true;
	}
	
	private boolean allowDeleteMedicine(Medicine medicine) {
		/**
		 * Code to check if a medicine is deletable
		 * Returns false if not
		 */
		return false;
	}
}
