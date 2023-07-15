/**
 * 
 */
package com.orbix.api.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.Clinician;
import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface PatientService {
	Patient doRegister(Patient patient, HttpServletRequest request);
	Patient doConsultation(Patient p, Clinic c, Clinician cn, HttpServletRequest request);
	Patient update(Patient patient, HttpServletRequest request);
	List<Patient>getBySearchKey(String searchKey);
	List<Patient>getAll();
	List<String> getSearchKeys();
	Patient findBySearchKey(String code);
}
