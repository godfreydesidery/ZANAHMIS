/**
 * 
 */
package com.orbix.api.api;

import java.net.URI;
import java.time.LocalDate;
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
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.orbix.api.domain.Bill;
import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.Clinician;
import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.Invoice;
import com.orbix.api.domain.InvoiceDetail;
import com.orbix.api.domain.Patient;
import com.orbix.api.domain.PatientCreditNote;
import com.orbix.api.domain.Payment;
import com.orbix.api.domain.PaymentType;
import com.orbix.api.domain.User;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.exceptions.MissingInformationException;
import com.orbix.api.exceptions.NotFoundException;
import com.orbix.api.repositories.BillRepository;
import com.orbix.api.repositories.ClinicRepository;
import com.orbix.api.repositories.ClinicianRepository;
import com.orbix.api.repositories.ConsultationRepository;
import com.orbix.api.repositories.DayRepository;
import com.orbix.api.repositories.InsurancePlanRepository;
import com.orbix.api.repositories.InvoiceDetailRepository;
import com.orbix.api.repositories.InvoiceRepository;
import com.orbix.api.repositories.PatientCreditNoteRepository;
import com.orbix.api.repositories.PatientRepository;
import com.orbix.api.repositories.PaymentRepository;
import com.orbix.api.repositories.VisitRepository;
import com.orbix.api.service.CompanyProfileService;
import com.orbix.api.service.DayService;
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
@Transactional
public class PatientResource {
	private final PatientService patientService;
	private final PatientRepository patientRepository;
	private final ClinicRepository clinicRepository;
	private final ClinicianRepository clinicianRepository;
	private final InsurancePlanRepository insurancePlanRepository;
	private final ConsultationRepository consultationRepository;
	private final BillRepository billRepository;
	private final PaymentRepository paymentRepository;
	private final PatientCreditNoteRepository patientCreditNoteRepository;
	private final InvoiceDetailRepository invoiceDetailRepository;
	private final InvoiceRepository invoiceRepository;
	private final VisitRepository visitRepository;
	private final DayRepository dayRepository;
	
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
			@RequestBody PaymentType paymentType,
			@RequestParam Long patient_id, @RequestParam String clinic_name, @RequestParam String clinician_name, 
			HttpServletRequest request){
		Optional<Patient> p = patientRepository.findById(patient_id);
		Optional<Clinic> c = clinicRepository.findByName(clinic_name);
		Optional<Clinician> cn = clinicianRepository.findByName(clinician_name);
		
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/do_consultation").toUriString());
		return ResponseEntity.created(uri).body(patientService.doConsultation(p.get(), c.get(), cn.get(), paymentType, request));
	}
	
	@PostMapping("/patients/cancel_consultation")
	//@PreAuthorize("hasAnyAuthority('PRODUCT-CREATE')")
	public ResponseEntity<Boolean>consultation(
			@RequestParam Long id, 
			HttpServletRequest request){
		Optional<Consultation> c = consultationRepository.findById(id);
		if(!c.get().getStatus().equals("PENDING")) {
			throw new InvalidOperationException("Could not cancel, only a PENDING consultation can be canceled");
		}
		/**
		 * Cancel the consultation
		 */
		Consultation consultation = c.get();
		consultation.setStatus("CANCELED");
		consultation = consultationRepository.save(consultation);		
		/**
		 * Now find the bill associated with the consultation
		 */
		Bill bill = billRepository.findById(consultation.getBill().getId()).get();
		/**
		 * Now cancel the bill
		 */
		bill.setStatus("CANCELED");
		bill = billRepository.save(bill);
		/**
		 * Find payment associated with the bill, if there is
		 */
		Optional<Payment> p = paymentRepository.findByBill(bill);
		/**
		 * If there is a payment associated with this bill, refund it, and create a credit note for it
		 */
		if(p.isPresent()) {
			Payment payment = p.get();
			payment.setStatus("REFUNDED");
			payment = paymentRepository.save(payment);
			/**
			 * Create credit note
			 */
			PatientCreditNote patientCreditNote = new PatientCreditNote();
			patientCreditNote.setAmount(payment.getAmount());
			patientCreditNote.setPatient(consultation.getPatient());
			patientCreditNote.setReference("Cancel consultation");
			patientCreditNote.setStatus("PENDING");
			patientCreditNote.setNo("NA");
			patientCreditNote = patientCreditNoteRepository.save(patientCreditNote);
			patientCreditNote.setNo(patientCreditNote.getId().toString());
			patientCreditNote = patientCreditNoteRepository.save(patientCreditNote);
		}
		/**
		 * Find invoice detail associated with this bill
		 */
		Optional<InvoiceDetail> i = invoiceDetailRepository.findByBill(bill);
		/**
		 * If there is a invoice detail associated with this bill, delete it
		 */
		if(i.isPresent()) {			
			invoiceDetailRepository.delete(i.get());
			Invoice invoice = i.get().getInvoice();
			int j = 0;
			for(InvoiceDetail d : invoice.getInvoiceDetails()) {
				j = j++;
			}
			if(j == 0) {
				invoiceRepository.delete(invoice);
			}			
		}
		
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/cancel_consultation").toUriString());
		return ResponseEntity.created(uri).body(true);
	}
	
	@GetMapping("/patients/get_active_consultations")
	//@PreAuthorize("hasAnyAuthority('PRODUCT-CREATE')")
	public ResponseEntity<List<Consultation>>getActiveConsultations(
			@RequestParam Long patient_id, HttpServletRequest request){
			
		Optional<Patient> p = patientRepository.findById(patient_id);
		List<String> statuses = new ArrayList<>();
		statuses.add("PENDING");
		statuses.add("IN-PROCESS");
		List<Consultation> consultations = consultationRepository.findAllByPatientAndStatusIn(p.get(), statuses);
		
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/get_active_consultation").toUriString());
		return ResponseEntity.created(uri).body(consultations);
	}
	
	@GetMapping("/patients/last_visit_date")
	//@PreAuthorize("hasAnyAuthority('PRODUCT-CREATE')")
	public ResponseEntity<LocalDate>getLastVisitDate(
			@RequestParam Long patient_id){
			
		Optional<Patient> p = patientRepository.findById(patient_id);
		
		LocalDate lastVistitDate = dayRepository.findById(visitRepository.findLastByPatient(p.get()).get().getVisitedOn()).get().getBussinessDate();
		
		
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/last_visit_date").toUriString());
		return ResponseEntity.created(uri).body(lastVistitDate);
	}
	
	@GetMapping("/patients/load_pending_consultations_by_clinician_id")    // to do later
	public ResponseEntity<List<Consultation>> loadPendingConsultationsByClinician(
			@RequestParam(name = "clinician_id") Long clinicianId){
		Optional<Clinician> c = clinicianRepository.findById(clinicianId);
		
		List<String> statuses = new ArrayList<>();
		statuses.add("PENDING");
		List<Consultation> cons = consultationRepository.findAllByClinicianAndStatusIn(c.get(), statuses);
		/**
		 * Should load paid or insurance covered consultations only
		 */
		List<Consultation> consultationsToShow = new ArrayList<>();
		for(Consultation cn : cons) {
			if(cn.getBill().getStatus().equals("PAID") || cn.getBill().getStatus().equals("COVERED")) {
				consultationsToShow.add(cn);
			}
		}
		return ResponseEntity.ok().body(consultationsToShow);
	}
	
	@GetMapping("/patients/load_in_process_consultations_by_clinician_id")    // to do later
	public ResponseEntity<List<Consultation>> loadInProcessConsultationsByClinician(
			@RequestParam(name = "clinician_id") Long clinicianId){
		Optional<Clinician> c = clinicianRepository.findById(clinicianId);
		
		List<String> statuses = new ArrayList<>();
		statuses.add("IN-PROCESS");
		List<Consultation> cons = consultationRepository.findAllByClinicianAndStatusIn(c.get(), statuses);
		
		return ResponseEntity.ok().body(cons);
	}
	
	@GetMapping("/patients/open_consultation")    // to do later
	public ResponseEntity<Boolean> openConsultation(
			@RequestParam(name = "consultation_id") Long consultationId){
		Optional<Consultation> c = consultationRepository.findById(consultationId);
		if(c.get().getStatus().equals("PENDING")) {
			if(c.get().getBill().getStatus().equals("PAID") || c.get().getBill().getStatus().equals("COVERED")) {
				c.get().setStatus("IN-PROCESS");
				consultationRepository.save(c.get());
				return ResponseEntity.ok().body(true);
			}else {
				throw new InvalidOperationException("Could not open. Payment not verified.");
			}
		}else {
			throw new InvalidOperationException("Could not open. Not a pending consultation.");
		}				
	}
	
	@GetMapping("/patients/load_consultation")    // to do later
	public ResponseEntity<Consultation> loadConsultation(
			@RequestParam(name = "id") Long id){
		Optional<Consultation> c = consultationRepository.findById(id);
		if(c.isPresent()) {
			URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/load_consultation").toUriString());
			return ResponseEntity.created(uri).body(c.get());
		}else {
			throw new NotFoundException("Consultation not found");
		}
	}
}

