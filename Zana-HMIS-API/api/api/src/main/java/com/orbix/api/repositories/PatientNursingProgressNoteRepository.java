/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.PatientNursingProgressNote;

/**
 * @author Godfrey
 *
 */
public interface PatientNursingProgressNoteRepository extends JpaRepository<PatientNursingProgressNote, Long> {

}
