/**
 * 
 */
package com.orbix.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.DiagnosisType;
import com.orbix.api.domain.FinalDiagnosis;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface FinalDiagnosisRepository extends JpaRepository<FinalDiagnosis, Long> {

	/**
	 * @param consultation
	 * @param diagnosisType
	 * @return
	 */
	boolean existsByConsultationAndDiagnosisType(Consultation consultation, DiagnosisType diagnosisType);

	
	/**
	 * @param consultation
	 * @return
	 */
	List<FinalDiagnosis> findAllByConsultation(Consultation consultation);

}
