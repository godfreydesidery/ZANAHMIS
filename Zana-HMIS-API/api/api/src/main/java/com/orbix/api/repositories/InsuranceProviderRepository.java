/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.InsuranceProvider;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface InsuranceProviderRepository extends JpaRepository<InsuranceProvider, Long> {

	/**
	 * @param name
	 * @return
	 */
	InsuranceProvider findByName(String name);

}
