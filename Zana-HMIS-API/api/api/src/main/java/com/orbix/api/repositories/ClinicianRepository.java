/**
 * 
 */
package com.orbix.api.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.Clinician;
import com.orbix.api.domain.Patient;
import com.orbix.api.domain.User;

/**
 * @author Godfrey
 *
 */
public interface ClinicianRepository extends JpaRepository<Clinician, Long> {

	/**
	 * @param name
	 * @return
	 */
	Optional<Clinician> findByName(String name);

	/**
	 * @param user
	 * @return
	 */
	Optional<Clinician> findByUser(User user);

	
}
