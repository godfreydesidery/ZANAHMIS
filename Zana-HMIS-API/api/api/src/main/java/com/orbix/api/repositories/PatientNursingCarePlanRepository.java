/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.PatientNursingCarePlan;

/**
 * @author Godfrey
 *
 */
public interface PatientNursingCarePlanRepository extends JpaRepository<PatientNursingCarePlan, Long> {

}
