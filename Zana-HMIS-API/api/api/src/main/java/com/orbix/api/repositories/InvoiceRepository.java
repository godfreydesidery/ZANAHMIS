/**
 * 
 */
package com.orbix.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Invoice;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

	/**
	 * @param patient
	 * @param string
	 * @return
	 */
	Optional<Invoice> findByPatientAndStatus(Patient patient, String string);

}
