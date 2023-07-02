/**
 * 
 */
package com.orbix.api.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface PatientService {
	Patient doRegister(Patient patient, HttpServletRequest request);
	Patient doConsultation(Patient patient, Consultation consultation, HttpServletRequest request);
	Patient update(Patient patient, HttpServletRequest request);
	List<Patient>getBySearchKey(String searchKey);
	List<Patient>getAll();
	List<String> getSearchKeys();
	Patient findBySearchKey(String code);
}
