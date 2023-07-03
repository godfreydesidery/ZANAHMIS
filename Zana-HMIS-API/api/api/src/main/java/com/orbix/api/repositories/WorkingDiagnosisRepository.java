/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Patient;
import com.orbix.api.domain.WorkingDiagnosis;

/**
 * @author Godfrey
 *
 */
public interface WorkingDiagnosisRepository extends JpaRepository<WorkingDiagnosis, Long> {

}