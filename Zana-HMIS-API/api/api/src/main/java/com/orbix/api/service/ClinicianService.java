/**
 * 
 */
package com.orbix.api.service;

import java.util.List;

import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.Clinician;

/**
 * @author Godfrey
 *
 */
public interface ClinicianService {
	Clinician save(Clinician clinician);	
	List<Clinician>getClinicians(); // return all the clinics
	Clinician getClinicianByName(String name);
	Clinician getClinicianById(Long id);
	boolean deleteClinician(Clinician clinician);
}
