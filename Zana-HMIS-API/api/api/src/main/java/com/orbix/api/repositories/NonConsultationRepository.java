/**
 * 
 */
package com.orbix.api.repositories;

import java.util.List;
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

	/**
	 * @param patient
	 * @param string
	 * @return
	 */
	List<NonConsultation> findAllByPatientAndStatus(Patient patient, String string);

	/**
	 * @param string
	 * @return
	 */
	List<NonConsultation> findAllByStatus(String string);

}
