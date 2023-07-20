/**
 * 
 */
package com.orbix.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.ClinicalNote;
import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface ClinicalNoteRepository extends JpaRepository<ClinicalNote, Long> {

	/**
	 * @param consultation
	 * @return
	 */
	Optional<ClinicalNote> findByConsultation(Consultation consultation);

}
