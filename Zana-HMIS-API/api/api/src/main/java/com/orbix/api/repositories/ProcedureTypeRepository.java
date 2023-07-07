/**
 * 
 */
package com.orbix.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.orbix.api.domain.Patient;
import com.orbix.api.domain.ProcedureType;

/**
 * @author Godfrey
 *
 */
public interface ProcedureTypeRepository extends JpaRepository<ProcedureType, Long> {

	/**
	 * @param name
	 * @return
	 */
	ProcedureType findByName(String name);
	
	@Query("SELECT p.name FROM ProcedureType p")
	List<String> getNames();

}
