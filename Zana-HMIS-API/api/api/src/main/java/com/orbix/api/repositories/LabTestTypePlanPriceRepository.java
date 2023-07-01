/**
 * 
 */
package com.orbix.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.LabTestType;
import com.orbix.api.domain.LabTestTypePlanPrice;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface LabTestTypePlanPriceRepository extends JpaRepository<LabTestTypePlanPrice, Long> {

	/**
	 * @param insurancePlan
	 * @param labTestType
	 * @return
	 */
	Optional<LabTestTypePlanPrice> findByInsurancePlanAndLabTestType(InsurancePlan insurancePlan,
			LabTestType labTestType);

}
