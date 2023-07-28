/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.WardInsurancePlan;

/**
 * @author Godfrey
 *
 */
public interface WardInsurancePlanRepository extends JpaRepository <WardInsurancePlan, Long> {

}
