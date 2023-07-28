/**
 * 
 */
package com.orbix.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Admission;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface AdmissionRepository extends JpaRepository<Admission, Long> {

	/**
	 * @param patient
	 * @param string
	 * @return
	 */
	Optional<Admission> findByPatientAndStatus(Patient patient, String string);

}
