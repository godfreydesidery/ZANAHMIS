/**
 * 
 */
package com.orbix.api.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.orbix.api.domain.Bill;
import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.Clinician;
import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.ConsultationPlanPrice;
import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.Invoice;
import com.orbix.api.domain.InvoiceDetail;
import com.orbix.api.domain.Patient;
import com.orbix.api.domain.RegistrationPlanPrice;
import com.orbix.api.domain.Visit;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.exceptions.NotFoundException;
import com.orbix.api.repositories.BillRepository;
import com.orbix.api.repositories.ConsultationPlanPriceRepository;
import com.orbix.api.repositories.ConsultationRepository;
import com.orbix.api.repositories.DayRepository;
import com.orbix.api.repositories.InsurancePlanRepository;
import com.orbix.api.repositories.InvoiceDetailRepository;
import com.orbix.api.repositories.InvoiceRepository;
import com.orbix.api.repositories.PatientRepository;
import com.orbix.api.repositories.RegistrationPlanPriceRepository;
import com.orbix.api.repositories.VisitRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * @author Godfrey
 *
 */
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PatientServiceImpl implements PatientService {
	
	private final PatientRepository patientRepository;
	private final BillRepository billRepository;
	private final ConsultationRepository consultationRepository;
	private final InvoiceRepository invoiceRepository;
	private final InvoiceDetailRepository invoiceDetailRepository;
	private final DayRepository dayRepository;
	private final UserService userService;
	private final DayService dayService;
	private final ConsultationPlanPriceRepository consultationPlanPriceRepository;
	private final InsurancePlanRepository insurancePlanRepository;
	private final RegistrationPlanPriceRepository registrationPlanPriceRepository;
	private final VisitRepository visitRepository;
	
	@Override
	public List<Patient> getAll() {
		return patientRepository.findAll();
	}
	
	@Override
	public Patient findBySearchKey(String key) {
		Optional<Patient> p = patientRepository.findBySearchKey(key);
		if(!p.isPresent()) {
			throw new NotFoundException("Patient not found");
		}
		return p.get();
	}
	
	@Override
	public Patient doRegister(Patient p, HttpServletRequest request) {
		// TODO Auto-generated method stub
		/**
		 * Save patient after validating credentials
		 */
		Patient patient = patientRepository.save(p);
		
		/*
		 * 
		 */	
		/**
		 * generate patient unique file no// change this to conventional no, this is only for starting
		 */
		patient.setNo(patient.getId().toString());
		/**
		 * Create a search key; to sanitize searchkey later
		 */
		patient.setSearchKey("NA");
		patient = patientRepository.save(patient);//generate search key, 
		patient.setSearchKey(createSearchKey(patient.getNo(), patient.getFirstName(), patient.getMiddleName(), patient.getLastName(), patient.getPhoneNo()));		
		/**
		 * Add forensic data to patient
		 */
		patient.setCreatedBy(userService.getUserId(request));
		patient.setCreatedOn(dayService.getDayId());
		patient = patientRepository.save(patient);
		
		/**
		 * Create registration bill and assign it to patient
		 */
		Bill regBill = new Bill();
		double am = 2000;//fetch this value from database, later
		regBill.setAmount(am);
		regBill.setQty(1);
		regBill.setBalance(am);
		regBill.setDescription("Registration Fee");
		regBill.setStatus("UNPAID");
		regBill.setPatient(patient);
		/**
		 * Add forensic data to registration bill
		 */
		regBill.setCreatedBy(userService.getUserId(request));
		regBill.setCreatedOn(dayService.getDayId());
		/**
		 * Save Registration bill
		 */
		regBill = billRepository.save(regBill);
		/**
		 * Assign registration bill to patient
		 */
		patient.setRegistrationBillId(regBill.getId());
		patient.setRegistrationFeeStatus("UNPAID");
		/**
		 * Save patient
		 */
		patient = patientRepository.save(patient);

		/**
		 * For insurance covered patients, check 
		 */
		if(patient.getPaymentType().equalsIgnoreCase("INSURANCE")) {
			/**
			 * Validate card, if card not valid, throw error, if valid, proceed		
			 */
			/**
			 * Set card validation status to valid, if card valid
			 */
			patient.setCardValidationStatus("VALID");
			/**
			 * Load Registration plan
			 */
			Optional<RegistrationPlanPrice> plan = registrationPlanPriceRepository.findByInsurancePlan(patient.getInsurancePlan());
			if(!plan.isPresent()) {
				throw new NotFoundException("There is no registration plan for this insurance plan. Please change payment method");
			}
			/**
			 * If plan is present, edit registration bill to reflect plan price
			 */
			regBill.setAmount(plan.get().getRegistrationFee());
			regBill.setPaid(plan.get().getRegistrationFee());
			regBill.setBalance(0);
			regBill = billRepository.save(regBill);
			/**
			 * Find a pending invoice to register claims, if there is no pending invoice, create one
			 */
			Optional<Invoice> inv = invoiceRepository.findByPatientAndStatus(patient, "PENDING");
			if(!inv.isPresent()) {
				/**
				 * If no pending invoice
				 */
				Invoice invoice = new Invoice();
				invoice.setNo("NA");
				invoice.setPatient(patient);
				invoice.setInsurancePlan(patient.getInsurancePlan());
				invoice.setStatus("PENDING");
				invoice = invoiceRepository.save(invoice);
				invoice.setNo(invoice.getId().toString());
				invoice = invoiceRepository.save(invoice);
				/**
				 * Add registration bill claim to invoice
				 */
				InvoiceDetail invoiceDetail = new InvoiceDetail();
				invoiceDetail.setInvoice(invoice);
				invoiceDetail.setBill(regBill);
				invoiceDetail.setDescription("Registration Fee");
				invoiceDetail.setQty(1);
				invoiceDetailRepository.saveAndFlush(invoiceDetail);
			}else {
				/**
				 * If there is a .pending invoice
				 */
				InvoiceDetail invoiceDetail = new InvoiceDetail();
				invoiceDetail.setInvoice(inv.get());
				invoiceDetail.setBill(regBill);
				invoiceDetail.setDescription("Registration Fee");
				invoiceDetail.setQty(1);
				invoiceDetailRepository.saveAndFlush(invoiceDetail);
			}
			
			/**
			 * Set registration bill to COVERED status, after assigning it to insurance cover
			 */
			regBill.setStatus("COVERED");
			/**
			 * Save registration bill
			 */
			regBill = billRepository.save(regBill);
			/**
			 * Set patient Registration fee status to PAID
			 */
			patient.setRegistrationFeeStatus("PAID");
			patient = patientRepository.save(patient);			
			
			patient = patientRepository.saveAndFlush(patient);			
		}	
		/**
		 * Create patient visit
		 */
		Visit visit = new Visit();
		visit.setPatient(patient);
		visit.setVisitSequence("FIRST");
		//visit.setVisitedAt(visitedAt);
		visit.setVisitedOn(dayService.getDayId());
		visitRepository.save(visit);
		
		return patient;
	}
	
	@Override
	public Patient doConsultation(Patient p, Clinic c, Clinician cn, HttpServletRequest request) {
		// TODO Auto-generated method stub
		/**
		 * Check whether patient is assigned to a consultation, if yes, throws error
		 */
		Optional<Consultation> pendingCon = consultationRepository.findByPatientAndStatus(p, "PENDING");
		if(pendingCon.isPresent()) {
			throw new InvalidOperationException("Patient has pending consultation, please consider freeing the patient");
		}
		Optional<Consultation> activeCon = consultationRepository.findByPatientAndStatus(p, "IN PROCESS");
		if(activeCon.isPresent()) {
			throw new InvalidOperationException("Patient has an active consultation, please wait for the patient to be released");
		}
		/**
		 * Create a consultation bill and assign it to patient and consultation
		 */
		Bill conBill = new Bill();
		conBill.setAmount(c.getConsultationFee());
		conBill.setPaid(0);
		conBill.setBalance(c.getConsultationFee());
		conBill.setQty(1);
		conBill.setDescription("Consultation Fee");
		conBill.setStatus("UNPAID");
		/**
		 * Add forensic data to registration bill
		 */
		conBill.setCreatedBy(userService.getUserId(request));
		conBill.setCreatedOn(dayService.getDayId());
		/**
		 * Assign patient to consultation bill
		 */
		conBill.setPatient(p);
		/**
		 * Save Registration bill
		 */
		conBill = billRepository.save(conBill);
		/**
		 * Create consultation
		 */
		Consultation consultation = new Consultation();
		consultation.setPatient(p);
		consultation.setClinic(c);
		consultation.setClinician(cn);
		consultation.setStatus("PENDING");
		consultation.setBill(conBill);
		/**
		 * Add forensic data
		 */
		consultation.setCreatedBy(userService.getUserId(request));
		consultation.setCreatedOn(dayService.getDayId());
		/**
		 * Save consultation
		 */
		consultation = consultationRepository.save(consultation);
		
		/**
		 * Now, if the patient is covered
		 */
		if(p.getPaymentType().equals("INSURANCE")) {
			Optional<ConsultationPlanPrice> consultationPricePlan = consultationPlanPriceRepository.findByClinicAndInsurancePlan(c, p.getInsurancePlan());
			
			if(!consultationPricePlan.isPresent()) {
				throw new InvalidOperationException("Plan not available for this clinic. Please change payment method");
			}
			conBill.setAmount(consultationPricePlan.get().getConsultationFee());
			conBill.setPaid(consultationPricePlan.get().getConsultationFee());
			conBill.setBalance(0);
			conBill.setStatus("COVERED");
			conBill = billRepository.save(conBill);
			
			/**
			 * Find a pending invoice to register claims, if there is no pending invoice, create one
			 */
			Optional<Invoice> inv = invoiceRepository.findByPatientAndStatus(p, "PENDING");
			if(!inv.isPresent()) {
				/**
				 * If no pending invoice
				 */
				Invoice invoice = new Invoice();
				invoice.setNo("NA");
				invoice.setPatient(p);
				invoice.setInsurancePlan(p.getInsurancePlan());
				invoice.setStatus("PENDING");
				invoice = invoiceRepository.save(invoice);
				invoice.setNo(invoice.getId().toString());
				invoice = invoiceRepository.save(invoice);
				/**
				 * Add registration bill claim to invoice
				 */
				InvoiceDetail invoiceDetail = new InvoiceDetail();
				invoiceDetail.setInvoice(invoice);
				invoiceDetail.setBill(conBill);
				invoiceDetail.setDescription("Consultation Fee");
				invoiceDetail.setQty(1);
				invoiceDetailRepository.saveAndFlush(invoiceDetail);
			}else {
				/**
				 * If there is a .pending invoice
				 */
				InvoiceDetail invoiceDetail = new InvoiceDetail();
				invoiceDetail.setInvoice(inv.get());
				invoiceDetail.setBill(conBill);
				invoiceDetail.setDescription("Consultation Fee");
				invoiceDetail.setQty(1);
				invoiceDetailRepository.saveAndFlush(invoiceDetail);
			}
		}
		/**
		 * Set visit, create one if the last visit is not for today
		 */
		Optional<Visit> v = visitRepository.findLastByPatient(p);
		Visit visit = new Visit();
		if(!v.isPresent() || v.get().getVisitedOn() != dayService.getDayId()) {			
			visit.setPatient(p);
			visit.setVisitSequence("FIRST");
			//visit.setVisitedAt(visitedAt);
			visit.setVisitedOn(dayService.getDayId());
			visitRepository.save(visit);
		}else {
			visit = v.get();
		}
		consultation.setVisit(visit);
		consultation = consultationRepository.save(consultation);
		return null;
	}

	@Override
	public Patient update(Patient patient, HttpServletRequest request) {
		Optional<Patient> pt = patientRepository.findById(patient.getId());
		if(!pt.isPresent()) {
			throw new NotFoundException("Patient not found in database");
		}
		if(!pt.get().getNo().equals(patient.getNo())) {
			throw new InvalidOperationException("Editing patient file no is not allowed");
		}
		
		patient.setSearchKey(createSearchKey(patient.getNo(), patient.getFirstName(), patient.getMiddleName(), patient.getLastName(), patient.getPhoneNo()));
		//recreate search key
		
		return patientRepository.saveAndFlush(patient);
		
	}

	@Override
	public List<Patient> getBySearchKey(String searchKey) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public List<String> getSearchKeys() {
		return patientRepository.getSearchKeys();	
	}
	
	private String createSearchKey(String no, String firstName, String middleName, String lastName, String phoneNo) {
		String key = no +" "+ firstName +" "+ middleName +" "+ lastName +" "+ phoneNo;
		key = key.trim().replaceAll("\\s+", " ");
		key = key.replaceAll("[+^]*#$%&", ""); 
		return  key;
	}

}
