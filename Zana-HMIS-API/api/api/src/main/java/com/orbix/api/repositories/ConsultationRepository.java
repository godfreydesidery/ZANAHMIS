/**
 * 
 */
package com.orbix.api.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface ConsultationRepository extends JpaRepository<Consultation, Long> {

	/**
	 * @param patient
	 * @return
	 */
	List<Consultation> findAllByPatient(Patient patient);

	/**
	 * @param p
	 * @param string
	 * @return
	 */
	Optional<Consultation> findByPatientAndStatus(Patient p, String string);

}
