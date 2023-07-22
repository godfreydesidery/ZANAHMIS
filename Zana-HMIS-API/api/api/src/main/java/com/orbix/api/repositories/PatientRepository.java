/**
 * 
 */
package com.orbix.api.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface PatientRepository extends JpaRepository<Patient, Long> {
	//@Query("SELECT p.searchKey FROM Patient p WHERE p.registrationFeeStatus = 'UNPAID'")
	//List<String> getUnpaidRegSearchKeyss();
	
	@Query("SELECT p.searchKey FROM Patient p")
	List<String> getSearchKeys();

	/**
	 * @param key
	 * @return
	 */
	Optional<Patient> findBySearchKey(String key);
}
