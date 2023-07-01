/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Bill;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface BillRepository extends JpaRepository<Bill, Long> {

	/**
	 * @param p
	 * @return
	 */
	Bill findByPatient(Patient p);

}
