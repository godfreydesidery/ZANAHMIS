/**
 * 
 */
package com.orbix.api.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.InsurancePlan;
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

	/**
	 * @param patient
	 * @param insurancePlan
	 * @param string
	 * @return
	 */
	Optional<PatientInvoice> findByPatientAndInsurancePlanAndStatus(Patient patient, InsurancePlan insurancePlan,
			String string);

	/**
	 * @param object
	 * @param string
	 * @return
	 */
	List<PatientInvoice> findAllByInsurancePlanAndStatus(Object object, String string);

	/**
	 * @param plans
	 * @param string
	 * @return
	 */
	List<PatientInvoice> findAllByInsurancePlanInAndStatus(List<InsurancePlan> plans, String string);

}
