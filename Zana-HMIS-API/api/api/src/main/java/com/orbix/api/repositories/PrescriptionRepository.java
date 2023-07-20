/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Prescription;

/**
 * @author Godfrey
 *
 */
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {

}
