/**
 * 
 */
package com.orbix.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.Prescription;

/**
 * @author Godfrey
 *
 */
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {

	/**
	 * @param consultation
	 * @param statuses
	 * @return
	 */
	List<Prescription> findAllByConsultationAndStatusIn(Consultation consultation, List<String> statuses);

	/**
	 * @param consultation
	 * @param statuses
	 * @return
	 */
	List<Prescription> findAllByNonConsultationAndStatusIn(Consultation consultation, List<String> statuses);

}
