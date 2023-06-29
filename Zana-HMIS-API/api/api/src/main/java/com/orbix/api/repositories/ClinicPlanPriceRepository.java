/**
 * 
 */
package com.orbix.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.ClinicPlanPrice;
import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.Visit;

/**
 * @author Godfrey
 *
 */
public interface ClinicPlanPriceRepository extends JpaRepository<ClinicPlanPrice, Long> {

	/**
	 * @param clinic
	 * @param insurancePlan
	 * @return
	 */
	Optional<ClinicPlanPrice> findByClinicAndInsurancePlan(Clinic clinic, InsurancePlan insurancePlan);

}
