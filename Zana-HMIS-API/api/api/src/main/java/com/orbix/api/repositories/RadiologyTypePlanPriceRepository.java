/**
 * 
 */
package com.orbix.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.Patient;
import com.orbix.api.domain.RadiologyType;
import com.orbix.api.domain.RadiologyTypePlanPrice;

/**
 * @author Godfrey
 *
 */
public interface RadiologyTypePlanPriceRepository extends JpaRepository<RadiologyTypePlanPrice, Long> {

	/**
	 * @param insurancePlan
	 * @param radiologyType
	 * @return
	 */
	Optional<RadiologyTypePlanPrice> findByInsurancePlanAndRadiologyType(InsurancePlan insurancePlan,
			RadiologyType radiologyType);

	/**
	 * @param radiologyType
	 * @param insurancePlan
	 * @return
	 */
	Optional<RadiologyTypePlanPrice> findByRadiologyTypeAndInsurancePlan(RadiologyType radiologyType,
			InsurancePlan insurancePlan);

	
}
