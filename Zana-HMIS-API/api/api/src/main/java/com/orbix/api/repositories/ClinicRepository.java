/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface ClinicRepository extends JpaRepository<Clinic, Long> {

	/**
	 * @param name
	 * @return
	 */
	Clinic findByName(String name);

}
