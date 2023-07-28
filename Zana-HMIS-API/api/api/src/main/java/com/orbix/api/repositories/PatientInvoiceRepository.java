/**
 * 
 */
package com.orbix.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Patient;
import com.orbix.api.domain.PatientInvoice;

/**
 * @author Godfrey
 *
 */
public interface PatientInvoiceRepository extends JpaRepository<PatientInvoice, Long> {

	/**
	 * @param patient
	 * @param string
	 * @return
	 */
	Optional<PatientInvoice> findByPatientAndStatus(Patient patient, String string);

}