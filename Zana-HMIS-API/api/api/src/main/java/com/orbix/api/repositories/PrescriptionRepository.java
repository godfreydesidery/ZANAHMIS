/**
 * 
 */
package com.orbix.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Admission;
import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.NonConsultation;
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
	 * @param nonConsultation
	 * @param statuses
	 * @return
	 */
	List<Prescription> findAllByNonConsultationAndStatusIn(NonConsultation nonConsultation, List<String> statuses);

	/**
	 * @param admission
	 * @param statuses
	 * @return
	 */
	List<Prescription> findAllByAdmissionAndStatusIn(Admission admission, List<String> statuses);

	/**
	 * @param consultation
	 * @return
	 */
	List<Prescription> findAllByConsultation(Consultation consultation);

	/**
	 * @param nonConsultation
	 * @return
	 */
	List<Prescription> findAllByNonConsultation(NonConsultation nonConsultation);

}
