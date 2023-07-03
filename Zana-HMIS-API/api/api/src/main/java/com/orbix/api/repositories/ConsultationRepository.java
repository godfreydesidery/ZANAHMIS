/**
 * 
 */
package com.orbix.api.repositories;

import java.util.List;

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

}
