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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.orbix.api.domain.Bill;
import com.orbix.api.domain.Clinician;
import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.LabTest;
import com.orbix.api.domain.NonConsultation;
import com.orbix.api.domain.Patient;
import com.orbix.api.domain.Payment;
import com.orbix.api.domain.Prescription;
import com.orbix.api.domain.Procedure;
import com.orbix.api.domain.Radiology;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.exceptions.NotFoundException;
import com.orbix.api.repositories.BillRepository;
import com.orbix.api.repositories.ClinicianRepository;
import com.orbix.api.repositories.ConsultationRepository;
import com.orbix.api.repositories.LabTestRepository;
import com.orbix.api.repositories.NonConsultationRepository;
import com.orbix.api.repositories.PatientRepository;
import com.orbix.api.repositories.PaymentRepository;
import com.orbix.api.repositories.PrescriptionRepository;
import com.orbix.api.repositories.ProcedureRepository;
import com.orbix.api.repositories.RadiologyRepository;
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
	private final NonConsultationRepository nonConsultationRepository;
	private final PaymentRepository paymentRepository;
	
	private final LabTestRepository labTestRepository;
	private final ProcedureRepository procedureRepository;
	private final PrescriptionRepository prescriptionRepository;
	private final RadiologyRepository radiologyRepository;
	
	
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
	
	@PostMapping("/bills/confirm_bills_payment")
	public ResponseEntity<Bill> confirmBillsPayment(
			@RequestBody List<Bill> bills,
			@RequestParam(name = "total_amount") double totalAmount){
		
		double amount = 0;
		Payment payment = new Payment();
		
		for(Bill bill : bills) {
			Optional<Bill> b = billRepository.findById(bill.getId());
			if(!b.isPresent()) {
				throw new NotFoundException("Bill not found; Bill ID :"+bill.getId().toString());
			}
			if(!b.get().getStatus().equals("UNPAID")) {
				throw new InvalidOperationException("One or more bills have been paid/covered/canceled. Only unpaid bills can be paid");
			}
			if(b.get().getStatus().equals("UNPAID")) {
				b.get().setBalance(0);
				b.get().setPaid(b.get().getAmount());
				b.get().setStatus("PAID");
				billRepository.save(b.get());
				payment.setAmount(b.get().getAmount());
				payment.setBill(b.get());
				payment.setStatus("RECEIVED");
				paymentRepository.save(payment);
				amount = amount + b.get().getAmount();
			}
		}
		if(amount != totalAmount) {
			throw new InvalidOperationException("Could not confirm payment. Insufficient payment/ amount mismatch");
		}		
		return ResponseEntity.ok().body(null);
	}
	
	@GetMapping("/bills/get_lab_test_bills")
	public ResponseEntity<List<Bill>> getLabTestBills(
			@RequestParam(name = "patient_id") Long patient_id){
		Patient patient = patientRepository.findById(patient_id).get();
		List<String> statuses = new ArrayList<>();
		statuses.add("PENDING");
		List<LabTest> tests = new ArrayList<>();
		Optional<Consultation> c = consultationRepository.findByPatientAndStatus(patient, "IN-PROCESS");
		Optional<NonConsultation> nc = nonConsultationRepository.findByPatientAndStatus(patient, "IN-PROCESS");
		List<Bill> bills = new ArrayList<>();
		if(c.isPresent()) {
			tests = labTestRepository.findAllByConsultationAndStatusIn(c.get(), statuses);
		}else if(nc.isPresent()) {
			tests = labTestRepository.findAllByNonConsultationAndStatusIn(c.get(), statuses);
		}		
		for(LabTest test : tests) {
			if(test.getBill().getStatus().equals("UNPAID")) {
				bills.add(test.getBill());
			}
		}		
		return ResponseEntity.ok().body(bills);
	}
	
	@GetMapping("/bills/get_procedure_bills")
	public ResponseEntity<List<Bill>> getProcedureBills(
			@RequestParam(name = "patient_id") Long patient_id){
		Patient patient = patientRepository.findById(patient_id).get();
		List<String> statuses = new ArrayList<>();
		statuses.add("PENDING");
		List<Procedure> procedures = new ArrayList<>();
		Optional<Consultation> c = consultationRepository.findByPatientAndStatus(patient, "IN-PROCESS");
		Optional<NonConsultation> nc = nonConsultationRepository.findByPatientAndStatus(patient, "IN-PROCESS");
		List<Bill> bills = new ArrayList<>();
		if(c.isPresent()) {
			procedures = procedureRepository.findAllByConsultationAndStatusIn(c.get(), statuses);
		}else if(nc.isPresent()) {
			procedures = procedureRepository.findAllByNonConsultationAndStatusIn(c.get(), statuses);
		}		
		for(Procedure procedure : procedures) {
			if(procedure.getBill().getStatus().equals("UNPAID")) {
				bills.add(procedure.getBill());
			}
		}		
		return ResponseEntity.ok().body(bills);
	}
	
	@GetMapping("/bills/get_prescription_bills")
	public ResponseEntity<List<Bill>> getPrescriptionBills(
			@RequestParam(name = "patient_id") Long patient_id){
		Patient patient = patientRepository.findById(patient_id).get();
		List<String> statuses = new ArrayList<>();
		statuses.add("PENDING");
		List<Prescription> prescriptions = new ArrayList<>();
		Optional<Consultation> c = consultationRepository.findByPatientAndStatus(patient, "IN-PROCESS");
		Optional<NonConsultation> nc = nonConsultationRepository.findByPatientAndStatus(patient, "IN-PROCESS");
		List<Bill> bills = new ArrayList<>();
		if(c.isPresent()) {
			prescriptions = prescriptionRepository.findAllByConsultationAndStatusIn(c.get(), statuses);
		}else if(nc.isPresent()) {
			prescriptions = prescriptionRepository.findAllByNonConsultationAndStatusIn(c.get(), statuses);
		}		
		for(Prescription prescription : prescriptions) {
			if(prescription.getBill().getStatus().equals("UNPAID")) {
				bills.add(prescription.getBill());
			}
		}		
		return ResponseEntity.ok().body(bills);
	}
	
	@GetMapping("/bills/get_radiology_bills")
	public ResponseEntity<List<Bill>> getRadiologyBills(
			@RequestParam(name = "patient_id") Long patient_id){
		Patient patient = patientRepository.findById(patient_id).get();
		List<String> statuses = new ArrayList<>();
		statuses.add("PENDING");
		List<Radiology> radiologies = new ArrayList<>();
		Optional<Consultation> c = consultationRepository.findByPatientAndStatus(patient, "IN-PROCESS");
		Optional<NonConsultation> nc = nonConsultationRepository.findByPatientAndStatus(patient, "IN-PROCESS");
		List<Bill> bills = new ArrayList<>();
		if(c.isPresent()) {
			radiologies = radiologyRepository.findAllByConsultationAndStatusIn(c.get(), statuses);
		}else if(nc.isPresent()) {
			radiologies = radiologyRepository.findAllByNonConsultationAndStatusIn(c.get(), statuses);
		}		
		for(Radiology radiology : radiologies) {
			if(radiology.getBill().getStatus().equals("UNPAID")) {
				bills.add(radiology.getBill());
			}
		}		
		return ResponseEntity.ok().body(bills);
	}
}
