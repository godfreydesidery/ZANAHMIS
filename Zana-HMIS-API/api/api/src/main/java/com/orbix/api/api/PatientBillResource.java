/**
 * 
 */
package com.orbix.api.api;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.orbix.api.domain.Admission;
import com.orbix.api.domain.AdmissionBed;
import com.orbix.api.domain.Clinician;
import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.LabTest;
import com.orbix.api.domain.NonConsultation;
import com.orbix.api.domain.Patient;
import com.orbix.api.domain.PatientBill;
import com.orbix.api.domain.PatientPayment;
import com.orbix.api.domain.PatientPaymentDetail;
import com.orbix.api.domain.Prescription;
import com.orbix.api.domain.Procedure;
import com.orbix.api.domain.Radiology;
import com.orbix.api.domain.Registration;
import com.orbix.api.domain.User;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.exceptions.NotFoundException;
import com.orbix.api.repositories.AdmissionBedRepository;
import com.orbix.api.repositories.AdmissionRepository;
import com.orbix.api.repositories.ClinicianRepository;
import com.orbix.api.repositories.ConsultationRepository;
import com.orbix.api.repositories.LabTestRepository;
import com.orbix.api.repositories.NonConsultationRepository;
import com.orbix.api.repositories.PatientBillRepository;
import com.orbix.api.repositories.PatientPaymentDetailRepository;
import com.orbix.api.repositories.PatientPaymentRepository;
import com.orbix.api.repositories.PatientRepository;
import com.orbix.api.repositories.PrescriptionRepository;
import com.orbix.api.repositories.ProcedureRepository;
import com.orbix.api.repositories.RadiologyRepository;
import com.orbix.api.repositories.RegistrationRepository;
import com.orbix.api.repositories.UserRepository;
import com.orbix.api.service.ClinicianService;
import com.orbix.api.service.DayService;
import com.orbix.api.service.UserService;

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
public class PatientBillResource {
	
	private final PatientBillRepository patientBillRepository;
	private final PatientRepository patientRepository;
	private final ConsultationRepository consultationRepository;
	private final NonConsultationRepository nonConsultationRepository;
	private final AdmissionRepository admissionRepository;
	private final PatientPaymentRepository patientPaymentRepository;
	private final PatientPaymentDetailRepository patientPaymentDetailRepository;
	
	private final LabTestRepository labTestRepository;
	private final ProcedureRepository procedureRepository;
	private final PrescriptionRepository prescriptionRepository;
	private final RadiologyRepository radiologyRepository;
	private final AdmissionBedRepository admissionBedRepository;
	private final RegistrationRepository registrationRepository;
	
	private final UserService userService;
	private final DayService dayService;
	
	
	
	@GetMapping("/bills/get_registration_bill")
	public ResponseEntity<PatientBill> getRegistrationBill(
			@RequestParam(name = "patient_id") Long patient_id,
			HttpServletRequest request){
		Patient patient = patientRepository.findById(patient_id).get();
		PatientBill bill = registrationRepository.findByPatient(patient).getPatientBill();
		if(!bill.getStatus().equals("UNPAID")) {
			return null;
		}
		return ResponseEntity.ok().body(bill);
	}
	
	@GetMapping("/bills/get_consultation_bill")
	public ResponseEntity<PatientBill> getConsultationBill(
			@RequestParam(name = "patient_id") Long patient_id,
			HttpServletRequest request){
		Patient patient = patientRepository.findById(patient_id).get();
		List<String> statuses = new ArrayList<>();
		statuses.add("PENDING");
		Optional<Consultation> c = consultationRepository.findByPatientAndStatusIn(patient, statuses);
		if(!c.isPresent()) {
			return null;
		}
		if(!c.get().getPatientBill().getStatus().equals("UNPAID")) {
			return null;
		}
		return ResponseEntity.ok().body(c.get().getPatientBill());
	}
	
	@PostMapping("/bills/confirm_registration_and_consultation_payment")
	public ResponseEntity<PatientBill> confirmRegistrationAndConsultationPayment(
			@RequestParam(name = "patient_id") Long patientId, @RequestParam(name = "total_amount") double totalAmount,
			HttpServletRequest request){
		Patient patient = patientRepository.findById(patientId).get();
		
		double amount = 0;
		PatientBill registrationBill = registrationRepository.findByPatient(patient).getPatientBill();
		if(registrationBill.getStatus().equals("UNPAID")) {
			amount = amount + registrationBill.getAmount();
		}
		
		List<String> statuses = new ArrayList<>();
		statuses.add("PENDING");
		List<Consultation> cs = consultationRepository.findAllByPatientAndStatusIn(patient, statuses);
		
		
		PatientPayment payment = new PatientPayment();
		payment.setAmount(totalAmount);
		
		payment.setCreatedby(userService.getUser(request).getId());
		payment.setCreatedOn(dayService.getDay().getId());
		payment.setCreatedAt(LocalDateTime.now());
		
		payment.setStatus("RECEIVED");
		payment = patientPaymentRepository.save(payment);
				
		if(registrationBill.getStatus().equals("UNPAID")) {
			registrationBill.setBalance(0);
			registrationBill.setPaid(registrationBill.getAmount());
			registrationBill.setStatus("PAID");
			
			registrationBill.setCreatedby(userService.getUser(request).getId());
			registrationBill.setCreatedOn(dayService.getDay().getId());
			registrationBill.setCreatedAt(LocalDateTime.now());
			
			registrationBill = patientBillRepository.save(registrationBill);
			
			PatientPaymentDetail pd = new PatientPaymentDetail();
			pd.setPatientBill(registrationBill);
			pd.setPatientPayment(payment);
			pd.setDescription("Registration Payment");
			pd.setStatus("RECEIVED");
			
			pd.setCreatedby(userService.getUser(request).getId());
			pd.setCreatedOn(dayService.getDay().getId());
			pd.setCreatedAt(LocalDateTime.now());
			
			patientPaymentDetailRepository.save(pd);			
		}
		
		for(Consultation c : cs) {
			PatientBill bill = c.getPatientBill();
			bill.setBalance(0);
			bill.setPaid(bill.getAmount());
			bill.setStatus("PAID");
			
			bill.setCreatedby(userService.getUser(request).getId());
			bill.setCreatedOn(dayService.getDay().getId());
			bill.setCreatedAt(LocalDateTime.now());
			
			patientBillRepository.save(bill);
			PatientPaymentDetail pd = new PatientPaymentDetail();
			pd.setPatientBill(bill);
			pd.setPatientPayment(payment);
			pd.setDescription("Consultation Payment");
			pd.setStatus("RECEIVED");
			
			pd.setCreatedby(userService.getUser(request).getId());
			pd.setCreatedOn(dayService.getDay().getId());
			pd.setCreatedAt(LocalDateTime.now());
			
			patientPaymentDetailRepository.save(pd);	
			amount = amount + bill.getAmount();
		}
		
		if(totalAmount != amount) {
			throw new InvalidOperationException("Could not confirm payment. Insufficient payment");
		}
		
		
		return ResponseEntity.ok().body(null);
	}
	
	@PostMapping("/bills/confirm_bills_payment")
	public ResponseEntity<PatientBill> confirmBillsPayment(
			@RequestBody List<PatientBill> bills,
			@RequestParam(name = "total_amount") double totalAmount,
			HttpServletRequest request){
		
		double amount = 0;
		PatientPayment payment = new PatientPayment();
		payment.setAmount(totalAmount);
		
		payment.setCreatedby(userService.getUser(request).getId());
		payment.setCreatedOn(dayService.getDay().getId());
		payment.setCreatedAt(LocalDateTime.now());
		payment.setStatus("RECEIVED");
		
		payment = patientPaymentRepository.save(payment);
		
		for(PatientBill bill : bills) {
			Optional<PatientBill> b = patientBillRepository.findById(bill.getId());
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
				
				patientBillRepository.save(b.get());
				PatientPaymentDetail pd = new PatientPaymentDetail();
				pd.setPatientBill(bill);
				pd.setPatientPayment(payment);
				pd.setDescription(b.get().getDescription());
				pd.setStatus("RECEIVED");
				
				pd.setCreatedby(userService.getUser(request).getId());
				pd.setCreatedOn(dayService.getDay().getId());
				pd.setCreatedAt(LocalDateTime.now());
				
				patientPaymentDetailRepository.save(pd);								
				amount = amount + b.get().getAmount();
			}
		}
		if(amount != totalAmount) {
			throw new InvalidOperationException("Could not confirm payment. Insufficient payment/ amount mismatch");
		}		
		return ResponseEntity.ok().body(null);
	}
	
	@GetMapping("/bills/get_lab_test_bills")
	public ResponseEntity<List<PatientBill>> getLabTestBills(
			@RequestParam(name = "patient_id") Long patient_id,
			HttpServletRequest request){
		Patient patient = patientRepository.findById(patient_id).get();
		List<String> statuses = new ArrayList<>();
		statuses.add("PENDING");
		List<LabTest> tests = new ArrayList<>();
		Optional<Consultation> c = consultationRepository.findByPatientAndStatus(patient, "IN-PROCESS");
		Optional<NonConsultation> nc = nonConsultationRepository.findByPatientAndStatus(patient, "IN-PROCESS");
		Optional<Admission> a = admissionRepository.findByPatientAndStatus(patient, "IN-PROCESS");
		List<PatientBill> bills = new ArrayList<>();
		if(c.isPresent()) {
			tests = labTestRepository.findAllByConsultationAndStatusIn(c.get(), statuses);
		}else if(nc.isPresent()) {
			tests = labTestRepository.findAllByNonConsultationAndStatusIn(nc.get(), statuses);
		}else if(a.isPresent()) {
			tests = labTestRepository.findAllByAdmissionAndStatusIn(a.get(), statuses);
		}			
		for(LabTest test : tests) {
			if(test.getPatientBill().getStatus().equals("UNPAID")) {
				bills.add(test.getPatientBill());
			}
		}		
		return ResponseEntity.ok().body(bills);
	}
	
	@GetMapping("/bills/get_procedure_bills")
	public ResponseEntity<List<PatientBill>> getProcedureBills(
			@RequestParam(name = "patient_id") Long patient_id,
			HttpServletRequest request){
		Patient patient = patientRepository.findById(patient_id).get();
		List<String> statuses = new ArrayList<>();
		statuses.add("PENDING");
		List<Procedure> procedures = new ArrayList<>();
		Optional<Consultation> c = consultationRepository.findByPatientAndStatus(patient, "IN-PROCESS");
		Optional<NonConsultation> nc = nonConsultationRepository.findByPatientAndStatus(patient, "IN-PROCESS");
		Optional<Admission> a = admissionRepository.findByPatientAndStatus(patient, "IN-PROCESS");
		List<PatientBill> bills = new ArrayList<>();
		if(c.isPresent()) {
			procedures = procedureRepository.findAllByConsultationAndStatusIn(c.get(), statuses);
		}else if(nc.isPresent()) {
			procedures = procedureRepository.findAllByNonConsultationAndStatusIn(nc.get(), statuses);
		}else if(a.isPresent()) {
			procedures = procedureRepository.findAllByAdmissionAndStatusIn(a.get(), statuses);
		}			
		for(Procedure procedure : procedures) {
			if(procedure.getPatientBill().getStatus().equals("UNPAID")) {
				bills.add(procedure.getPatientBill());
			}
		}		
		return ResponseEntity.ok().body(bills);
	}
	
	@GetMapping("/bills/get_prescription_bills")
	public ResponseEntity<List<PatientBill>> getPrescriptionBills(
			@RequestParam(name = "patient_id") Long patient_id,
			HttpServletRequest request){
		Patient patient = patientRepository.findById(patient_id).get();
		List<String> statuses = new ArrayList<>();
		statuses.add("PENDING");
		statuses.add("NOT-GIVEN");
		List<Prescription> prescriptions = new ArrayList<>();
		Optional<Consultation> c = consultationRepository.findByPatientAndStatus(patient, "IN-PROCESS");
		Optional<NonConsultation> nc = nonConsultationRepository.findByPatientAndStatus(patient, "IN-PROCESS");
		Optional<Admission> a = admissionRepository.findByPatientAndStatus(patient, "IN-PROCESS");
		List<PatientBill> bills = new ArrayList<>();
		if(c.isPresent()) {
			prescriptions = prescriptionRepository.findAllByConsultationAndStatusIn(c.get(), statuses);
		}else if(nc.isPresent()) {
			prescriptions = prescriptionRepository.findAllByNonConsultationAndStatusIn(nc.get(), statuses);
		}else if(a.isPresent()) {
			prescriptions = prescriptionRepository.findAllByAdmissionAndStatusIn(a.get(), statuses);
		}			
		for(Prescription prescription : prescriptions) {
			if(prescription.getPatientBill().getStatus().equals("UNPAID")) {
				bills.add(prescription.getPatientBill());
			}
		}		
		return ResponseEntity.ok().body(bills);
	}
	
	@GetMapping("/bills/get_radiology_bills")
	public ResponseEntity<List<PatientBill>> getRadiologyBills(
			@RequestParam(name = "patient_id") Long patient_id,
			HttpServletRequest request){
		Patient patient = patientRepository.findById(patient_id).get();
		List<String> statuses = new ArrayList<>();
		statuses.add("PENDING");
		List<Radiology> radiologies = new ArrayList<>();
		Optional<Consultation> c = consultationRepository.findByPatientAndStatus(patient, "IN-PROCESS");
		Optional<NonConsultation> nc = nonConsultationRepository.findByPatientAndStatus(patient, "IN-PROCESS");
		Optional<Admission> a = admissionRepository.findByPatientAndStatus(patient, "IN-PROCESS");
		List<PatientBill> bills = new ArrayList<>();
		if(c.isPresent()) {
			radiologies = radiologyRepository.findAllByConsultationAndStatusIn(c.get(), statuses);
		}else if(nc.isPresent()) {
			radiologies = radiologyRepository.findAllByNonConsultationAndStatusIn(nc.get(), statuses);
		}else if(a.isPresent()) {
			radiologies = radiologyRepository.findAllByAdmissionAndStatusIn(a.get(), statuses);
		}			
		for(Radiology radiology : radiologies) {
			if(radiology.getPatientBill().getStatus().equals("UNPAID")) {
				bills.add(radiology.getPatientBill());
			}
		}		
		return ResponseEntity.ok().body(bills);
	}
	
	@GetMapping("/bills/get_admission_bills")
	public ResponseEntity<List<PatientBill>> getAdmissionBills(
			@RequestParam(name = "patient_id") Long patient_id,
			HttpServletRequest request){
		Patient patient = patientRepository.findById(patient_id).get();
		List<String> statuses = new ArrayList<>();
		statuses.add("PENDING");
		List<AdmissionBed> admissionBeds = new ArrayList<>();		
		Optional<Admission> a = admissionRepository.findByPatientAndStatus(patient, "IN-PROCESS");
		List<PatientBill> bills = new ArrayList<>();
		if(a.isPresent()) {
			admissionBeds = admissionBedRepository.findAllByAdmissionAndStatusIn(a.get(), statuses);
		}			
		for(AdmissionBed admissionBed : admissionBeds) {
			if(admissionBed.getPatientBill().getStatus().equals("UNPAID")) {
				bills.add(admissionBed.getPatientBill());
			}
		}		
		return ResponseEntity.ok().body(bills);
	}
}
