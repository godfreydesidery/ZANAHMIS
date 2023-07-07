/**
 * 
 */
package com.orbix.api.service;

import java.util.List;
import java.util.Optional;

import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.Clinician;

/**
 * @author Godfrey
 *
 */
public interface ClinicService {
	Clinic save(Clinic clinic);	
	List<Clinic>getClinics(); // return all the clinics
	Clinic getClinicByName(String name);
	Clinic getClinicById(Long id);
	boolean deleteClinic(Clinic clinic);
	List<String> getNames();
	/**
	 * @param clinicName
	 * @return
	 */
	Clinic getByName(String clinicName);
	/**
	 * @return
	 */
	List<Clinician> getClinicians();
	
}
