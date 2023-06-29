/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.LabTestTypePlanPrice;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface LabTestTypePlanPriceRepository extends JpaRepository<LabTestTypePlanPrice, Long> {

}
