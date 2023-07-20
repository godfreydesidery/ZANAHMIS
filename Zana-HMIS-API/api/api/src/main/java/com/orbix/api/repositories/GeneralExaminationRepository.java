/**
 * 
 */
package com.orbix.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.ClinicalNote;
import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.GeneralExamination;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface GeneralExaminationRepository extends JpaRepository<GeneralExamination, Long> {

	/**
	 * @param consultation
	 * @return
	 */
	Optional<GeneralExamination> findByConsultation(Consultation consultation);

}
