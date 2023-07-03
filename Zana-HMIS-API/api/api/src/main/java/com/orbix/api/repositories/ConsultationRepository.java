/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface ConsultationRepository extends JpaRepository<Consultation, Long> {

}