/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.DiagnosisType;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface DiagnosisTypeRepository extends JpaRepository<DiagnosisType, Long> {

}
