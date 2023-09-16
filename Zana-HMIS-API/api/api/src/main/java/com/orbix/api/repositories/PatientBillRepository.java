/**
 * 
 */
package com.orbix.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Patient;
import com.orbix.api.domain.PatientBill;

/**
 * @author Godfrey
 *
 */
public interface PatientBillRepository extends JpaRepository<PatientBill, Long> {

	/**
	 * @param p
	 * @return
	 */
	PatientBill findByPatient(Patient p);

	/**
	 * @param patient
	 * @return
	 */
	List<PatientBill> findAllByPatient(Patient patient);

	/**
	 * @param patient
	 * @param string
	 * @return
	 */
	List<PatientBill> findAllByPatientAndStatus(Patient patient, String string);

}
