/**
 * 
 */
package com.orbix.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.ConsultationPlanPrice;
import com.orbix.api.domain.InsurancePlan;

/**
 * @author Godfrey
 *
 */
public interface ConsultationPlanPriceRepository extends JpaRepository<ConsultationPlanPrice, Long> {

	/**
	 * @param plan
	 * @param clinic
	 * @return
	 */
	Optional<ConsultationPlanPrice> findByInsurancePlanAndClinic(InsurancePlan plan, Clinic clinic);

	/**
	 * @param c
	 * @param insurancePlan
	 * @return
	 */
	Optional<ConsultationPlanPrice> findByClinicAndInsurancePlan(Clinic c, InsurancePlan insurancePlan);

}
