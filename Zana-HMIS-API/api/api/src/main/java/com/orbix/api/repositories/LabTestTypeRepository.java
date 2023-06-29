/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.LabTestType;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface LabTestTypeRepository extends JpaRepository<LabTestType, Long> {

}
