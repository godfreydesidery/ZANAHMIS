/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.NonConsultation;

/**
 * @author Godfrey
 *
 */
public interface NonConsultationRepository extends JpaRepository<NonConsultation, Long> {

}
