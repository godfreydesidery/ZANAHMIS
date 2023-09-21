/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.PatientConsumable;

/**
 * @author Godfrey
 *
 */
public interface PatientConsumableRepository extends JpaRepository<PatientConsumable, Long> {

}
