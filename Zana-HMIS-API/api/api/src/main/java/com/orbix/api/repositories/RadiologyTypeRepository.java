/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Patient;
import com.orbix.api.domain.RadiologyType;

/**
 * @author Godfrey
 *
 */
public interface RadiologyTypeRepository extends JpaRepository<RadiologyType, Long> {

	/**
	 * @param name
	 * @return
	 */
	RadiologyType findByName(String name);

}
