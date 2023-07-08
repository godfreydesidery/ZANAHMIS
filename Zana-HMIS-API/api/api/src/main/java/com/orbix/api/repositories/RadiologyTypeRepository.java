/**
 * 
 */
package com.orbix.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

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
	
	@Query("SELECT r.name FROM RadiologyType r")
	List<String> getNames();

}
