/**
 * 
 */
package com.orbix.api.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Admission;
import com.orbix.api.domain.AdmissionBed;
import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.NonConsultation;

/**
 * @author Godfrey
 *
 */
public interface AdmissionBedRepository extends JpaRepository <AdmissionBed, Long> {
	/**
	 * @param admission
	 * @param statuses
	 * @return
	 */
	List<AdmissionBed> findAllByAdmissionAndStatusIn(Admission admission, List<String> statuses);

	/**
	 * @param admission
	 * @return
	 */
	List<AdmissionBed> findAllByAdmission(Admission admission);

	/**
	 * @param adm
	 * @return
	 */
	Optional<AdmissionBed> findLastByAdmission(Admission adm);

}
