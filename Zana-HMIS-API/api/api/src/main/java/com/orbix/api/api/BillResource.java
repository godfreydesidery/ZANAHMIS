/**
 * 
 */
package com.orbix.api.api;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.orbix.api.domain.Bill;
import com.orbix.api.domain.Clinician;
import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.Patient;
import com.orbix.api.repositories.BillRepository;
import com.orbix.api.repositories.ClinicianRepository;
import com.orbix.api.repositories.ConsultationRepository;
import com.orbix.api.repositories.PatientRepository;
import com.orbix.api.service.ClinicianService;

import lombok.RequiredArgsConstructor;

/**
 * @author Godfrey
 *
 */
@RestController
@RequestMapping("/zana-hmis-api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BillResource {
	
	private final BillRepository billRepository;
	private final PatientRepository patientRepository;
	private final ConsultationRepository consultationRepository;
	
	@GetMapping("/bills/get_registration_bill")
	public ResponseEntity<Bill> getRegistrationBill(
			@RequestParam(name = "patient_id") Long patient_id){
		Patient patient = patientRepository.findById(patient_id).get();
		Optional<Bill> b = billRepository.findById(patient.getRegistrationBillId());
		if(!b.get().getStatus().equals("UNPAID")) {
			return null;
		}
		return ResponseEntity.ok().body(b.get());
	}
	
	@GetMapping("/bills/get_consultation_bill")
	public ResponseEntity<Bill> getConsultationBill(
			@RequestParam(name = "patient_id") Long patient_id){
		Patient patient = patientRepository.findById(patient_id).get();
		List<String> statuses = new ArrayList<>();
		statuses.add("PENDING");
		Optional<Consultation> c = consultationRepository.findByPatientAndStatusIn(patient, statuses);
		if(!c.isPresent()) {
			return null;
		}
		if(!c.get().getBill().getStatus().equals("UNPAID")) {
			return null;
		}
		return ResponseEntity.ok().body(c.get().getBill());
	}
}
