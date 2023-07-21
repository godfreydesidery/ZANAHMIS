/**
 * 
 */
package com.orbix.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.Patient;
import com.orbix.api.domain.Procedure;

/**
 * @author Godfrey
 *
 */
public interface ProcedureRepository extends JpaRepository<Procedure, Long> {

	/**
	 * @param consultation
	 * @param statuses
	 * @return
	 */
	List<Procedure> findAllByConsultationAndStatusIn(Consultation consultation, List<String> statuses);

	/**
	 * @param consultation
	 * @param statuses
	 * @return
	 */
	List<Procedure> findAllByNonConsultationAndStatusIn(Consultation consultation, List<String> statuses);

}
