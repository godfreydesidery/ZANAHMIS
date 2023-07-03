/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Patient;
import com.orbix.api.domain.Procedure;

/**
 * @author Godfrey
 *
 */
public interface ProcedureRepository extends JpaRepository<Procedure, Long> {

}