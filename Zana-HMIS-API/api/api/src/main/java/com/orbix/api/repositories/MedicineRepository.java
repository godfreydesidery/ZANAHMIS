/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Medicine;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface MedicineRepository extends JpaRepository<Medicine, Long> {

	/**
	 * @param name
	 * @return
	 */
	Medicine findByName(String name);

}
