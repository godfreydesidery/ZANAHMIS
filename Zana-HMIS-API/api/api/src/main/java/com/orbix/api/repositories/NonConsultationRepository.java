/**
 * 
 */
package com.orbix.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.NonConsultation;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface NonConsultationRepository extends JpaRepository<NonConsultation, Long> {

	/**
	 * @param patient
	 * @param string
	 * @return
	 */
	Optional<NonConsultation> findByPatientAndStatus(Patient patient, String string);

}
