/**
 * 
 */
package com.orbix.api.api;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.orbix.api.domain.Bill;
import com.orbix.api.domain.Clinician;
import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.Patient;
import com.orbix.api.domain.Payment;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.repositories.BillRepository;
import com.orbix.api.repositories.ClinicianRepository;
import com.orbix.api.repositories.ConsultationRepository;
import com.orbix.api.repositories.PatientRepository;
import com.orbix.api.repositories.PaymentRepository;
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
@Transactional
public class BillResource {
	
	private final BillRepository billRepository;
	private final PatientRepository patientRepository;
	private final ConsultationRepository consultationRepository;
	private final PaymentRepository paymentRepository;
	
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
	
	@PostMapping("/bills/confirm_registration_and_consultation_payment")
	public ResponseEntity<Bill> confirmRegistrationAndConsultationPayment(
			@RequestParam(name = "patient_id") Long patientId, @RequestParam(name = "total_amount") double totalAmount){
		Patient patient = patientRepository.findById(patientId).get();
		
		double amount = 0;
		Optional<Bill> rb = billRepository.findById(patient.getRegistrationBillId());
		if(rb.isPresent()) {
			if(rb.get().getStatus().equals("UNPAID")) {
				amount = amount + rb.get().getAmount();
			}
		}
		
		List<String> statuses = new ArrayList<>();
		statuses.add("PENDING");
		List<Consultation> cs = consultationRepository.findAllByPatientAndStatusIn(patient, statuses);
		
		
		Payment regPayment = new Payment();
		Payment conPayment = new Payment();
		
		if(rb.get().getStatus().equals("UNPAID")) {
			rb.get().setBalance(0);
			rb.get().setPaid(rb.get().getAmount());
			rb.get().setStatus("PAID");
			billRepository.save(rb.get());
			regPayment.setAmount(rb.get().getAmount());
			regPayment.setBill(rb.get());
			regPayment.setStatus("RECEIVED");
			paymentRepository.save(regPayment);
		}
		
		for(Consultation c : cs) {
			Bill bill = c.getBill();
			bill.setBalance(0);
			bill.setPaid(bill.getAmount());
			bill.setStatus("PAID");
			billRepository.save(bill);
			conPayment = new Payment();
			conPayment.setAmount(bill.getAmount());
			conPayment.setBill(bill);
			conPayment.setStatus("RECEIVED");
			paymentRepository.save(conPayment);
			amount = amount + bill.getAmount();
		}
		
		if(totalAmount != amount) {
			throw new InvalidOperationException("Could not confirm payment. Insufficient payment");
		}
		
		
		return ResponseEntity.ok().body(null);
	}
}
