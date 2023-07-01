/**
 * 
 */
package com.orbix.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.Patient;
import com.orbix.api.domain.ProcedureType;
import com.orbix.api.domain.ProcedureTypePlanPrice;

/**
 * @author Godfrey
 *
 */
public interface ProcedureTypePlanPriceRepository extends JpaRepository<ProcedureTypePlanPrice, Long> {

	/**
	 * @param insurancePlan
	 * @param procedureType
	 * @return
	 */
	Optional<ProcedureTypePlanPrice> findByInsurancePlanAndProcedureType(InsurancePlan insurancePlan,
			ProcedureType procedureType);

}
