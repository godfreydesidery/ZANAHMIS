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
import com.orbix.api.domain.ClinicPlanPrice;
import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.Invoice;
import com.orbix.api.domain.InvoiceDetail;
import com.orbix.api.domain.Patient;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.exceptions.NotFoundException;
import com.orbix.api.repositories.BillRepository;
import com.orbix.api.repositories.ClinicPlanPriceRepository;
import com.orbix.api.repositories.ConsultationRepository;
import com.orbix.api.repositories.DayRepository;
import com.orbix.api.repositories.InvoiceDetailRepository;
import com.orbix.api.repositories.InvoiceRepository;
import com.orbix.api.repositories.PatientRepository;
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
	private final ClinicPlanPriceRepository clinicPlanPriceRepository;
	
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
		//save patient, after validating credentials
		Patient patient = patientRepository.saveAndFlush(p);
		
		//generate patient unique file no
		
		patient.setNo(patient.getId().toString());//change this to conventional no, this is only for starting
		patient.setSearchKey("NA");
		patient.setCreatedBy(userService.getUserId(request));
		patient.setCreatedOn(dayService.getDayId());
		patient = patientRepository.saveAndFlush(patient);
		//generate search key, to sanitize searchkey later
		patient.setSearchKey(createSearchKey(patient.getNo(), patient.getFirstName(), patient.getMiddleName(), patient.getLastName(), patient.getPhoneNo()));
		patient = patientRepository.saveAndFlush(patient);
		
		//create registration bill
		Bill regBill = new Bill();
		double am = 2000;//fetch this value from database, later
		regBill.setAmount(am);
		regBill.setQty(1);
		regBill.setCreatedBy(userService.getUserId(request));
		regBill.setCreatedOn(dayService.getDayId());
		regBill.setBalance(am);
		regBill.setDescription("Registration Fee");
		regBill.setStatus("UNPAID");
		regBill.setPatient(patient);
		regBill = billRepository.saveAndFlush(regBill);
		patient.setRegistrationBillId(regBill.getId());
		patient.setRegistrationFeeStatus("UNPAID");
		patient = patientRepository.saveAndFlush(patient);
		//create registration and assign a bill to it

		if(patient.getPaymentType().equalsIgnoreCase("Insurance")) {
			//validate card, if card not valid, throw error
			
			patient.setCardValidationStatus("VALID");
			//Create invoice to claim fee if not exist
			Optional<Invoice> inv = invoiceRepository.findByPatientAndStatus(patient, "PENDING");
			if(!inv.isPresent()) {
				Invoice invoice = new Invoice();
				invoice.setNo("NA");
				invoice.setPatient(patient);
				invoice.setInsurancePlan(patient.getInsurancePlan());
				invoice.setStatus("PENDING");
				invoice = invoiceRepository.saveAndFlush(invoice);
				invoice.setNo(invoice.getId().toString());
				invoice = invoiceRepository.saveAndFlush(invoice);
				
				InvoiceDetail invoiceDetail = new InvoiceDetail();
				invoiceDetail.setInvoice(invoice);
				invoiceDetail.setBill(regBill);
				invoiceDetail.setDescription("Registration Fee");
				invoiceDetail.setQty(1);
				invoiceDetailRepository.saveAndFlush(invoiceDetail);
			}else {
				InvoiceDetail invoiceDetail = new InvoiceDetail();
				invoiceDetail.setInvoice(inv.get());
				invoiceDetail.setBill(regBill);
				invoiceDetail.setDescription("Registration Fee");
				invoiceDetail.setQty(1);
				invoiceDetailRepository.saveAndFlush(invoiceDetail);
			}
			regBill.setStatus("COVERED");
			regBill = billRepository.saveAndFlush(regBill);
			patient.setRegistrationFeeStatus("PAID");
			patient = patientRepository.saveAndFlush(patient);
			
		}
		
		return patient;
	}
	
	@Override
	public Patient doConsultation(Patient p, Consultation con, HttpServletRequest request) {
		// TODO Auto-generated method stub
		//first check whether the patient has cleared registration fee
		
		Bill regBill = billRepository.findByPatient(p);
		if(regBill.getBalance() > 0) {
			throw new InvalidOperationException("Process failed, registration fee not cleared");
		}
		//get the required bill amount for consultation
		double conFee = 0;
		if(p.getPaymentType().equalsIgnoreCase("INSURANCE")) {
			Optional<ClinicPlanPrice> clinicPricePlan = clinicPlanPriceRepository.findByClinicAndInsurancePlan(con.getClinic(), p.getInsurancePlan());
			if(!clinicPricePlan.isPresent()) {
				throw new InvalidOperationException("Plan not available for this clinic");
			}
			conFee = clinicPricePlan.get().getConsultationFee();
		}else {
			conFee = con.getClinic().getConsultationFee();
		}
		//create bill for consultation
		Bill consultationBill = new Bill();
		consultationBill.setAmount(conFee);
		consultationBill.setCreatedBy(userService.getUserId(request));
		consultationBill.setCreatedOn(dayService.getDayId());
		consultationBill.setCreatedAt(LocalDateTime.now());
		consultationBill.setBalance(conFee);
		consultationBill.setDescription("Consultation Fee");
		consultationBill.setStatus("UNPAID");
		if(p.getPaymentType().equalsIgnoreCase("INSURANCE")) {
			consultationBill.setStatus("COVERED");
			consultationBill.setPaid(conFee);
			consultationBill.setBalance(0);
		}
		consultationBill = billRepository.saveAndFlush(regBill);
		
		Consultation consultation = new Consultation();
		consultation.setPatient(p);
		consultation.setBill(consultationBill);
		consultation.setClinic(con.getClinic());
		consultation.setClinician(con.getClinician());
		consultation.setPaymentType(p.getPaymentType());
		consultation.setCreatedBy(userService.getUserId(request));
		consultation.setCreatedOn(dayService.getDayId());
		consultation.setCreatedAt(LocalDateTime.now());
		consultation = consultationRepository.saveAndFlush(consultation);
		
		if(p.getPaymentType().equalsIgnoreCase("INSURANCE")) {
			//Create invoice to claim fee if not exist
			Optional<Invoice> inv = invoiceRepository.findByPatientAndStatus(p, "PENDING");
			if(!inv.isPresent()) {
				Invoice invoice = new Invoice();
				invoice.setNo("NA");
				invoice.setPatient(p);
				invoice.setInsurancePlan(p.getInsurancePlan());
				invoice.setStatus("PENDING");
				invoice = invoiceRepository.saveAndFlush(invoice);
				invoice.setNo(invoice.getId().toString());
				invoice = invoiceRepository.saveAndFlush(invoice);
				
				InvoiceDetail invoiceDetail = new InvoiceDetail();
				invoiceDetail.setInvoice(invoice);
				invoiceDetail.setBill(regBill);
				invoiceDetail.setDescription("Consultation Fee");
				invoiceDetail.setQty(1);
				invoiceDetailRepository.saveAndFlush(invoiceDetail);
			}else {
				InvoiceDetail invoiceDetail = new InvoiceDetail();
				invoiceDetail.setInvoice(inv.get());
				invoiceDetail.setBill(regBill);
				invoiceDetail.setDescription("Consultation Fee");
				invoiceDetail.setQty(1);
				invoiceDetailRepository.saveAndFlush(invoiceDetail);
			}
		}
		
		return null;
	}

	@Override
	public Patient update(Patient patient, HttpServletRequest request) {
		Optional<Patient> pt = patientRepository.findById(patient.getId());
		if(!pt.isPresent()) {
			throw new NotFoundException("Patient not found in database");
		}
		Patient p = pt.get();
		p.setFirstName(patient.getFirstName());
		p.setMiddleName(patient.getMiddleName());
		p.setLastName(patient.getLastName());
		p.setDateOfBirth(patient.getDateOfBirth());
		p.setGender(patient.getGender());
		p.setPatientType(patient.getPatientType());
		p.setNationality(patient.getNationality());
		p.setNationalId(patient.getNationalId());
		p.setPassportNo(patient.getPassportNo());
		p.setPhoneNo(p.getPhoneNo());
		p.setEmail(patient.getEmail());
		p.setAddress(patient.getAddress());
		p.setKinFullName(patient.getKinFullName());
		p.setKinRelationship(patient.getKinRelationship());
		p.setKinPhoneNo(patient.getKinPhoneNo());
		p.setCardNo(patient.getCardNo());
		
		//add additional items here latter during refinement
		//to include update of insurance plan
		p.setSearchKey(createSearchKey(p.getNo(), p.getFirstName(), p.getMiddleName(), p.getLastName(), p.getPhoneNo()));
		//recreate search key
		
		return patientRepository.saveAndFlush(p);
		
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
