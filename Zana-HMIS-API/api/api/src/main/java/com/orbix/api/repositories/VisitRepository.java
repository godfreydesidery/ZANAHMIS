/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Patient;
import com.orbix.api.domain.Visit;

/**
 * @author Godfrey
 *
 */
public interface VisitRepository extends JpaRepository<Visit, Long> {

}
