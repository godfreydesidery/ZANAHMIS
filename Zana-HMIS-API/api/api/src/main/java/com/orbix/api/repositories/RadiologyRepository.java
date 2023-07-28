/**
 * 
 */
package com.orbix.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Admission;
import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.NonConsultation;
import com.orbix.api.domain.Patient;
import com.orbix.api.domain.Radiology;

/**
 * @author Godfrey
 *
 */
public interface RadiologyRepository extends JpaRepository<Radiology, Long> {

	/**
	 * @param consultation
	 * @param statuses
	 * @return
	 */
	List<Radiology> findAllByConsultationAndStatusIn(Consultation consultation, List<String> statuses);

	/**
	 * @param nonConsultation
	 * @param statuses
	 * @return
	 */
	List<Radiology> findAllByNonConsultationAndStatusIn(NonConsultation nonConsultation, List<String> statuses);

	/**
	 * @param admission
	 * @param statuses
	 * @return
	 */
	List<Radiology> findAllByAdmissionAndStatusIn(Admission admission, List<String> statuses);

}
