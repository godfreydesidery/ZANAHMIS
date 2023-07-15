/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Medicine;
import com.orbix.api.domain.PatientCreditNote;

/**
 * @author Godfrey
 *
 */
public interface PatientCreditNoteRepository extends JpaRepository<PatientCreditNote, Long> {

}
