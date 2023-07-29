/**
 * 
 */
package com.orbix.api.service;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.Clinician;
import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.LabTest;
import com.orbix.api.domain.NonConsultation;
import com.orbix.api.domain.Patient;
import com.orbix.api.domain.PaymentType;
import com.orbix.api.domain.Prescription;
import com.orbix.api.domain.Procedure;
import com.orbix.api.domain.Radiology;

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
	
	LabTest saveLabTest(LabTest test, Optional<Consultation> c, Optional<NonConsultation> nc, HttpServletRequest request);
	
	Radiology saveRadiology(Radiology radio, Optional<Consultation> c, Optional<NonConsultation> nc, HttpServletRequest request);
	
	Procedure saveProcedure(Procedure procedure, Optional<Consultation> c, Optional<NonConsultation> nc, HttpServletRequest request);
	
	Prescription savePrescription(Prescription prescription, Optional<Consultation> c, Optional<NonConsultation> nc, HttpServletRequest request);
}
