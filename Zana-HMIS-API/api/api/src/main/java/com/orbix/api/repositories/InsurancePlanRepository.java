/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface InsurancePlanRepository extends JpaRepository<InsurancePlan, Long> {

}
