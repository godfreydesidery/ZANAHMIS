/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.GeneralExamination;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface GeneralExaminationRepository extends JpaRepository<GeneralExamination, Long> {

}
