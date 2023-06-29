/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Patient;
import com.orbix.api.domain.ProcedureType;

/**
 * @author Godfrey
 *
 */
public interface ProcedureTypeRepository extends JpaRepository<ProcedureType, Long> {

}
