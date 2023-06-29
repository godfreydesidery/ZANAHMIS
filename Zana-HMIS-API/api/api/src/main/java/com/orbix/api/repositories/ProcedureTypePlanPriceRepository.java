/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Patient;
import com.orbix.api.domain.ProcedureTypePlanPrice;

/**
 * @author Godfrey
 *
 */
public interface ProcedureTypePlanPriceRepository extends JpaRepository<ProcedureTypePlanPrice, Long> {

}
