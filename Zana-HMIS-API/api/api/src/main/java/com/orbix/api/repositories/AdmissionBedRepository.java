/**
 * 
 */
package com.orbix.api.repositories;

import java.util.List;

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

}