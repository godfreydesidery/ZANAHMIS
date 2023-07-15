/**
 * 
 */
package com.orbix.api.api;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.Clinician;
import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.Patient;
import com.orbix.api.exceptions.MissingInformationException;
import com.orbix.api.repositories.ClinicRepository;
import com.orbix.api.repositories.ClinicianRepository;
import com.orbix.api.repositories.InsurancePlanRepository;
import com.orbix.api.repositories.PatientRepository;
import com.orbix.api.service.CompanyProfileService;
import com.orbix.api.service.PatientService;

import lombok.RequiredArgsConstructor;

/**
 * @author Godfrey
 *
 */
@RestController
@RequestMapping("/zana-hmis-api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PatientResource {
	private final 	PatientService patientService;
	private final PatientRepository patientRepository;
	private final ClinicRepository clinicRepository;
	private final ClinicianRepository clinicianRepository;
	private final InsurancePlanRepository insurancePlanRepository;
	
	@GetMapping("/patients")
	public ResponseEntity<List<Patient>>getMaterials(){
		return ResponseEntity.ok().body(patientService.getAll());
	}
	
	@GetMapping("/patients/get_by_search_key")
	public ResponseEntity<Patient> getProductBySearchKey(
			@RequestParam(name = "search_key") String searchKey){
		return ResponseEntity.ok().body(patientService.findBySearchKey(searchKey));
	}
	
	@GetMapping("/patients/get_all_search_keys")
	public ResponseEntity<List<String>> getSearchKeys(){
		List<String> keys = new ArrayList<String>();
		keys = patientService.getSearchKeys();
		return ResponseEntity.ok().body(keys);
	}
	
	@PostMapping("/patients/register")
	//@PreAuthorize("hasAnyAuthority('PRODUCT-CREATE')")
	public ResponseEntity<Patient>registerPatient(
			@RequestBody Patient patient,
			HttpServletRequest request){
		if(patient.getNo().equals("") || patient.getNo().equals("NA")) {
			patient.setNo("NA");
		}
		if(patient.getPaymentType().equals("INSURANCE")) {
			InsurancePlan plan = insurancePlanRepository.findByName(patient.getInsurancePlan().getName()).get();
			patient.setInsurancePlan(plan);
			if(patient.getMembershipNo().equals("")) {
				throw new MissingInformationException("Membership number required");
			}
			patient.setCardNo("");
		}else {
			patient.setInsurancePlan(null);
		}
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/register").toUriString());
		return ResponseEntity.created(uri).body(patientService.doRegister(patient, request));
	}
	
	@PostMapping("/patients/update")
	//@PreAuthorize("hasAnyAuthority('PRODUCT-CREATE')")
	public ResponseEntity<Patient>updatePatient(
			@RequestBody Patient patient,
			HttpServletRequest request){
		if(patient.getPaymentType().equals("INSURANCE")) {
			InsurancePlan plan = insurancePlanRepository.findByName(patient.getInsurancePlan().getName()).get();
			patient.setInsurancePlan(plan);
			if(patient.getMembershipNo().equals("")) {
				throw new MissingInformationException("Membership number required");
			}
			patient.setCardNo("");
		}else {
			patient.setInsurancePlan(null);
		}
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/update").toUriString());
		return ResponseEntity.created(uri).body(patientService.update(patient, request));
	}
	
	@PostMapping("/patients/do_consultation")
	//@PreAuthorize("hasAnyAuthority('PRODUCT-CREATE')")
	public ResponseEntity<Patient>consultation(
			@RequestParam Long patient_id, @RequestParam String clinic_name, @RequestParam String clinician_name, 
			HttpServletRequest request){
		Optional<Patient> p = patientRepository.findById(patient_id);
		Optional<Clinic> c = clinicRepository.findByName(clinic_name);
		Optional<Clinician> cn = clinicianRepository.findByName(clinician_name);
		
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/do_consultation").toUriString());
		return ResponseEntity.created(uri).body(patientService.doConsultation(p.get(), c.get(), cn.get(), request));
	}
}
