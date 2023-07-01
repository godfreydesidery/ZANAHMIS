/**
 * 
 */
package com.orbix.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.Medicine;
import com.orbix.api.domain.MedicinePlanPrice;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface MedicinePlanPriceRepository extends JpaRepository<MedicinePlanPrice, Long> {

	/**
	 * @param insurancePlan
	 * @param medicine
	 * @return
	 */
	Optional<MedicinePlanPrice> findByInsurancePlanAndMedicine(InsurancePlan insurancePlan, Medicine medicine);

}
