/**
 * 
 */
package com.orbix.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.LabTest;
import com.orbix.api.domain.NonConsultation;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface LabTestRepository extends JpaRepository<LabTest, Long> {

	/**
	 * @param consultation
	 * @param statuses
	 * @return
	 */
	List<LabTest> findAllByConsultationAndStatusIn(Consultation consultation, List<String> statuses);

	/**
	 * @param consultation
	 * @param statuses
	 * @return
	 */
	List<LabTest> findAllByNonConsultationAndStatusIn(Consultation consultation, List<String> statuses);

	/**
	 * @param statusToView
	 * @return
	 */
	List<LabTest> findAllByStatusIn(List<String> statusToView);

	/**
	 * @param cs
	 * @param ncs
	 * @return
	 */
	List<LabTest> findAllByConsultationInOrNonConsultationIn(List<Consultation> cs, List<NonConsultation> ncs);

	/**
	 * @param cs
	 * @return
	 */
	List<LabTest> findAllByConsultationIn(List<Consultation> cs);

	
	
}
