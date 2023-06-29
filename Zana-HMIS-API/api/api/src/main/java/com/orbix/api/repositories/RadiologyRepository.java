/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Patient;
import com.orbix.api.domain.Radiology;

/**
 * @author Godfrey
 *
 */
public interface RadiologyRepository extends JpaRepository<Radiology, Long> {

}
