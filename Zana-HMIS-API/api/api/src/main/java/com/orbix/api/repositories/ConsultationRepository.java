/**
 * 
 */
package com.orbix.api.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Clinician;
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
	 * @param patient
	 * @param statuses
	 * @return
	 */
	Optional<Consultation> findByPatientAndStatusIn(Patient patient, List<String> statuses);

	/**
	 * @param patient
	 * @param statuses
	 * @return
	 */
	List<Consultation> findAllByPatientAndStatusIn(Patient patient, List<String> statuses);

	/**
	 * @param clinician
	 * @return
	 */
	List<Consultation> findAllByClinician(Clinician clinician);

	/**
	 * @param clinician
	 * @param statuses
	 * @return
	 */
	List<Consultation> findAllByClinicianAndStatusIn(Clinician clinician, List<String> statuses);

	

	/**
	 * @param p
	 * @param string
	 * @return
	 */
	//Optional<Consultation> findByPatientAndStatus(Patient p, String string);

	
}
