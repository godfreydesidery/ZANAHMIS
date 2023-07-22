/**
 * 
 */
package com.orbix.api.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
import com.orbix.api.domain.LabTest;
import com.orbix.api.domain.LabTestPlanPrice;
import com.orbix.api.domain.LabTestType;
import com.orbix.api.domain.LabTestTypePlanPrice;
import com.orbix.api.domain.Medicine;
import com.orbix.api.domain.MedicinePlanPrice;
import com.orbix.api.domain.NonConsultation;
import com.orbix.api.domain.Patient;
import com.orbix.api.domain.PaymentType;
import com.orbix.api.domain.Prescription;
import com.orbix.api.domain.Procedure;
import com.orbix.api.domain.ProcedureType;
import com.orbix.api.domain.ProcedureTypePlanPrice;
import com.orbix.api.domain.Radiology;
import com.orbix.api.domain.RadiologyType;
import com.orbix.api.domain.RadiologyTypePlanPrice;
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
import com.orbix.api.repositories.LabTestRepository;
import com.orbix.api.repositories.LabTestTypePlanPriceRepository;
import com.orbix.api.repositories.LabTestTypeRepository;
import com.orbix.api.repositories.MedicinePlanPriceRepository;
import com.orbix.api.repositories.MedicineRepository;
import com.orbix.api.repositories.PatientRepository;
import com.orbix.api.repositories.PrescriptionRepository;
import com.orbix.api.repositories.ProcedureRepository;
import com.orbix.api.repositories.ProcedureTypePlanPriceRepository;
import com.orbix.api.repositories.ProcedureTypeRepository;
import com.orbix.api.repositories.RadiologyRepository;
import com.orbix.api.repositories.RadiologyTypePlanPriceRepository;
import com.orbix.api.repositories.RadiologyTypeRepository;
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
	private final LabTestTypePlanPriceRepository labTestTypePlanPriceRepository;
	private final MedicinePlanPriceRepository medicinePlanPriceRepository;
	private final RadiologyTypePlanPriceRepository radiologyTypePlanPriceRepository;
	private final ProcedureTypePlanPriceRepository procedureTypePlanPriceRepository;
	private final LabTestTypeRepository labTestTypeRepository;
	private final LabTestRepository labTestRepository;
	private final InsurancePlanRepository insurancePlanRepository;
	private final RegistrationPlanPriceRepository registrationPlanPriceRepository;
	private final VisitRepository visitRepository;
	private final RadiologyTypeRepository radiologyTypeRepository;
	private final ProcedureTypeRepository procedureTypeRepository;
	private final RadiologyRepository radiologyRepository;
	private final ProcedureRepository procedureRepository;
	private final MedicineRepository medicineRepository;
	private final PrescriptionRepository prescriptionRepository;
	
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
				invoiceDetail.setPrice(regBill.getAmount());
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
				invoiceDetail.setPrice(regBill.getAmount());
				invoiceDetail.setDescription("Registration");
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
		visit.setStatus("PENDING");
		visit.setVisitedOn(dayService.getDayId());
		visitRepository.save(visit);
		
		return patient;
	}
	
	@Override
	public Patient doConsultation(Patient p, Clinic c, Clinician cn, PaymentType paymentType, HttpServletRequest request) {
		// TODO Auto-generated method stub
		/**
		 * Check whether patient is assigned to a consultation, if yes, throws error
		 */
		List<String> statuses = new ArrayList<>();
		statuses.add("PENDING");
		Optional<Consultation> pendingCon = consultationRepository.findByPatientAndStatusIn(p, statuses);
		if(pendingCon.isPresent()) {
			throw new InvalidOperationException("Patient has pending consultation, please consider freeing the patient");
		}
		statuses.add("IN-PROCESS");
		Optional<Consultation> activeCon = consultationRepository.findByPatientAndStatusIn(p, statuses);
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
		conBill.setDescription("Consultation");
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
		 * Check whether, if patient should pay by insurance, if the insurance cover is the same as the on registered for the patient
		 */
		if(paymentType.getName().equals("INSURANCE")) {
			Optional<InsurancePlan> plan = insurancePlanRepository.findByName(paymentType.getInsurancePlanName());
			if(!plan.isPresent()) {
				throw new NotFoundException("Insurance plan not found in database");
			}
			/**
			 * If plan has changed, check if previous transactions involving the plan have been signed
			 */
			Optional<Invoice> pendingInv = invoiceRepository.findByPatientAndStatus(p, "PENDING");
			if(p.getPaymentType().equals("INSURANCE")) {
				if(plan.get().getId() != p.getInsurancePlan().getId()) {
					if(pendingInv.isPresent()) {
						throw new InvalidOperationException("Use of two or more insurance plan. The patient should sign of the initial invoice before proceeding with another plan");
					}
				}
				if(!paymentType.getInsuranceMembershipNo().equals(p.getMembershipNo())) {
					throw new InvalidOperationException("Membership number do not match. Please cross check membership no for correction");
				}
			}else if(p.getPaymentType().equals("CASH")){
				if(pendingInv.isPresent()) {
					throw new InvalidOperationException("Use of two or more insurance plan. The patient should sign of the iniitial invoice before proceeding with another plan");
				}
			}
			p.setPaymentType("INSURANCE");
			p.setInsurancePlan(plan.get());
			p.setMembershipNo(paymentType.getInsuranceMembershipNo());
			p = patientRepository.save(p);
			
			consultation.setPaymentType("INSURANCE");
			consultation.setMembershipNo(paymentType.getInsuranceMembershipNo());
			consultation.setInsurancePlan(plan.get());
			consultation = consultationRepository.save(consultation);
		}else if(paymentType.getName().equals("CASH")){
			
			p.setPaymentType("CASH");
			p.setInsurancePlan(null);
			p.setMembershipNo("");
			p = patientRepository.save(p);
			
			consultation.setPaymentType("CASH");
			consultation.setMembershipNo("");
			consultation.setInsurancePlan(null);
			consultation = consultationRepository.save(consultation);
		}else {
			throw new InvalidOperationException("Invalid Payment type selected");
		}
		
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
				invoiceDetail.setPrice(conBill.getAmount());
				invoiceDetail.setDescription("Consultation");
				invoiceDetail.setQty(1);
				invoiceDetailRepository.saveAndFlush(invoiceDetail);
			}else {
				/**
				 * If there is a .pending invoice
				 */
				InvoiceDetail invoiceDetail = new InvoiceDetail();
				invoiceDetail.setInvoice(inv.get());
				invoiceDetail.setBill(conBill);
				invoiceDetail.setPrice(conBill.getAmount());
				invoiceDetail.setDescription("Consultation");
				invoiceDetail.setQty(1);
				invoiceDetailRepository.saveAndFlush(invoiceDetail);
			}
		}
		/**
		 * Set visit, create one if the last visit is not for today
		 */
		Optional<Visit> v = visitRepository.findLastByPatient(p);
		Visit visit = new Visit();
		if(!v.isPresent() || !v.get().getStatus().equals("PENDING")) {			
			visit.setPatient(p);
			if(!v.isPresent()) {
				visit.setVisitSequence("FIRST");
			}else {
				visit.setVisitSequence("SUBSEQUENT");
			}
			
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
		
		pt.get().setSearchKey(createSearchKey(patient.getNo(), patient.getFirstName(), patient.getMiddleName(), patient.getLastName(), patient.getPhoneNo()));
		//recreate search key
		pt.get().setFirstName(patient.getFirstName());
		pt.get().setMiddleName(patient.getMiddleName());
		pt.get().setLastName(patient.getLastName());
		pt.get().setDateOfBirth(patient.getDateOfBirth());
		pt.get().setGender(patient.getGender());
		pt.get().setPatientType(patient.getPatientType());
		pt.get().setNationality(patient.getNationality());
		pt.get().setNationalId(patient.getNationalId());
		pt.get().setPassportNo(patient.getPassportNo());
		pt.get().setPhoneNo(patient.getPhoneNo());
		pt.get().setEmail(patient.getEmail());
		pt.get().setAddress(patient.getAddress());
		pt.get().setKinFullName(patient.getKinFullName());
		pt.get().setKinRelationship(patient.getKinRelationship());
		pt.get().setKinPhoneNo(patient.getKinPhoneNo());
		pt.get().setPaymentType(patient.getPaymentType());
		pt.get().setInsurancePlan(patient.getInsurancePlan());
		pt.get().setMembershipNo(patient.getMembershipNo());
		
		return patientRepository.save(pt.get());
		
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

	@Override
	public LabTest saveLabTest(LabTest test, Optional<Consultation> c, Optional<NonConsultation> nc, HttpServletRequest request) {
		Patient patient = new Patient();
		Optional<LabTestType> ltt = labTestTypeRepository.findByName(test.getLabTestType().getName());
		 
		if(!ltt.isPresent()) {
			throw new NotFoundException("Lab Test type not found");
		}
		//LabTestType labTestType = labTestTypeRepository.save(ltt.get());
		if(c.isPresent() && nc.isPresent()) {
			throw new InvalidOperationException("Could not save, labtest has two controversial properties");
		}
		if(!c.isPresent() && !nc.isPresent()) {
			throw new InvalidOperationException("Could not save, labtest must have one property");
		}
		if(c.isPresent()) {
			patient = c.get().getPatient();
			test.setConsultation(c.get());
		}
		if(nc.isPresent()) {
			patient = nc.get().getPatient();
			test.setNonConsultation(nc.get());
		}
		
		test.setLabTestType(ltt.get());
		test.setStatus("PENDING");
		Bill bill = new Bill();
		bill.setAmount(test.getLabTestType().getPrice());
		bill.setPaid(0);
		bill.setBalance(test.getLabTestType().getPrice());
		bill.setQty(1);
		bill.setDescription("Lab Test: "+test.getLabTestType().getName());
		bill.setStatus("UNPAID");		
		bill.setCreatedBy(userService.getUserId(request));
		bill.setCreatedOn(dayService.getDayId());
		bill.setPatient(patient);
		bill = billRepository.save(bill);
		
		if(patient.getPaymentType().equals("INSURANCE")) {
			
			Optional<LabTestTypePlanPrice> labTestTypePricePlan = labTestTypePlanPriceRepository.findByLabTestTypeAndInsurancePlan(ltt.get(), patient.getInsurancePlan());
			
			if(labTestTypePricePlan.isPresent()) {
				bill.setAmount(labTestTypePricePlan.get().getPrice());
				bill.setPaid(labTestTypePricePlan.get().getPrice());
				bill.setBalance(0);
				bill.setStatus("COVERED");
				bill = billRepository.save(bill);
				
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
					 * Add lab test bill claim to invoice
					 */
					InvoiceDetail invoiceDetail = new InvoiceDetail();
					invoiceDetail.setInvoice(invoice);
					invoiceDetail.setBill(bill);
					invoiceDetail.setPrice(bill.getAmount());
					invoiceDetail.setDescription("Lab Test: "+test.getLabTestType().getName());
					invoiceDetail.setQty(1);
					invoiceDetailRepository.save(invoiceDetail);
				}else {
					/**
					 * If there is a .pending invoice
					 */
					InvoiceDetail invoiceDetail = new InvoiceDetail();
					invoiceDetail.setInvoice(inv.get());
					invoiceDetail.setBill(bill);
					invoiceDetail.setPrice(bill.getAmount());
					invoiceDetail.setDescription("Lab Test: "+test.getLabTestType().getName());
					invoiceDetail.setQty(1);
					invoiceDetailRepository.save(invoiceDetail);
				}
			}
			
		}
		test.setPatient(patient);
		test.setBill(bill);
		return labTestRepository.save(test);		
	}
	
	@Override
	public Radiology saveRadiology(Radiology radio, Optional<Consultation> c, Optional<NonConsultation> nc, HttpServletRequest request) {
		Patient patient = new Patient();
		Optional<RadiologyType> rt = radiologyTypeRepository.findByName(radio.getRadiologyType().getName());
		 
		if(!rt.isPresent()) {
			throw new NotFoundException("Radiology type not found");
		}
		if(c.isPresent() && nc.isPresent()) {
			throw new InvalidOperationException("Could not save, radiology has two controversial properties");
		}
		if(!c.isPresent() && !nc.isPresent()) {
			throw new InvalidOperationException("Could not save, radiology must have one property");
		}
		if(c.isPresent()) {
			patient = c.get().getPatient();
			radio.setConsultation(c.get());
		}
		if(nc.isPresent()) {
			patient = nc.get().getPatient();
			radio.setNonConsultation(nc.get());
		}
		radio.setRadiologyType(rt.get());
		radio.setStatus("PENDING");
		Bill bill = new Bill();
		bill.setAmount(radio.getRadiologyType().getPrice());
		bill.setPaid(0);
		bill.setBalance(radio.getRadiologyType().getPrice());
		bill.setQty(1);
		bill.setDescription("Radiology: "+radio.getRadiologyType().getName());
		bill.setStatus("UNPAID");		
		bill.setCreatedBy(userService.getUserId(request));
		bill.setCreatedOn(dayService.getDayId());
		bill.setPatient(patient);
		bill = billRepository.save(bill);
		
		if(patient.getPaymentType().equals("INSURANCE")) {
			
			Optional<RadiologyTypePlanPrice> radiologyTypePricePlan = radiologyTypePlanPriceRepository.findByRadiologyTypeAndInsurancePlan(rt.get(), patient.getInsurancePlan());
			
			if(radiologyTypePricePlan.isPresent()) {
				bill.setAmount(radiologyTypePricePlan.get().getPrice());
				bill.setPaid(radiologyTypePricePlan.get().getPrice());
				bill.setBalance(0);
				bill.setStatus("COVERED");
				bill = billRepository.save(bill);
				
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
					 * Add lab test bill claim to invoice
					 */
					InvoiceDetail invoiceDetail = new InvoiceDetail();
					invoiceDetail.setInvoice(invoice);
					invoiceDetail.setBill(bill);
					invoiceDetail.setPrice(bill.getAmount());
					invoiceDetail.setDescription("Radiology: "+radio.getRadiologyType().getName());
					invoiceDetail.setQty(1);
					invoiceDetailRepository.save(invoiceDetail);
				}else {
					/**
					 * If there is a .pending invoice
					 */
					InvoiceDetail invoiceDetail = new InvoiceDetail();
					invoiceDetail.setInvoice(inv.get());
					invoiceDetail.setBill(bill);
					invoiceDetail.setPrice(bill.getAmount());
					invoiceDetail.setDescription("Radiology: "+radio.getRadiologyType().getName());
					invoiceDetail.setQty(1);
					invoiceDetailRepository.save(invoiceDetail);
				}
			}
			
		}
		radio.setPatient(patient);
		radio.setBill(bill);
		return radiologyRepository.save(radio);		
	}
	
	
	@Override
	public Procedure saveProcedure(Procedure procedure, Optional<Consultation> c, Optional<NonConsultation> nc, HttpServletRequest request) {
		Patient patient = new Patient();
		Optional<ProcedureType> pr = procedureTypeRepository.findByName(procedure.getProcedureType().getName());
		 
		if(!pr.isPresent()) {
			throw new NotFoundException("Procedure type not found");
		}
		if(c.isPresent() && nc.isPresent()) {
			throw new InvalidOperationException("Could not save, procedure has two controversial properties");
		}
		if(!c.isPresent() && !nc.isPresent()) {
			throw new InvalidOperationException("Could not save, procedure must have one property");
		}
		if(c.isPresent()) {
			patient = c.get().getPatient();
			procedure.setConsultation(c.get());
		}
		if(nc.isPresent()) {
			patient = nc.get().getPatient();
			procedure.setNonConsultation(nc.get());
		}
		procedure.setProcedureType(pr.get());
		procedure.setStatus("PENDING");
		Bill bill = new Bill();
		bill.setAmount(procedure.getProcedureType().getPrice());
		bill.setPaid(0);
		bill.setBalance(procedure.getProcedureType().getPrice());
		bill.setQty(1);
		bill.setDescription("Procedure: "+procedure.getProcedureType().getName());
		bill.setStatus("UNPAID");		
		bill.setCreatedBy(userService.getUserId(request));
		bill.setCreatedOn(dayService.getDayId());
		bill.setPatient(patient);
		bill = billRepository.save(bill);
		
		if(patient.getPaymentType().equals("INSURANCE")) {
			
			Optional<ProcedureTypePlanPrice> procedureTypePricePlan = procedureTypePlanPriceRepository.findByProcedureTypeAndInsurancePlan(pr.get(), patient.getInsurancePlan());
			
			if(procedureTypePricePlan.isPresent()) {
				bill.setAmount(procedureTypePricePlan.get().getPrice());
				bill.setPaid(procedureTypePricePlan.get().getPrice());
				bill.setBalance(0);
				bill.setStatus("COVERED");
				bill = billRepository.save(bill);
				
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
					 * Add lab test bill claim to invoice
					 */
					InvoiceDetail invoiceDetail = new InvoiceDetail();
					invoiceDetail.setInvoice(invoice);
					invoiceDetail.setBill(bill);
					invoiceDetail.setPrice(bill.getAmount());
					invoiceDetail.setDescription("Procedure: "+procedure.getProcedureType().getName());
					invoiceDetail.setQty(1);
					invoiceDetailRepository.save(invoiceDetail);
				}else {
					/**
					 * If there is a .pending invoice
					 */
					InvoiceDetail invoiceDetail = new InvoiceDetail();
					invoiceDetail.setInvoice(inv.get());
					invoiceDetail.setBill(bill);
					invoiceDetail.setPrice(bill.getAmount());
					invoiceDetail.setDescription("Procedure: "+procedure.getProcedureType().getName());
					invoiceDetail.setQty(1);
					invoiceDetailRepository.save(invoiceDetail);
				}
			}
			
		}
		procedure.setPatient(patient);
		procedure.setBill(bill);
		return procedureRepository.save(procedure);		
	}
	
	
	
	@Override
	public Prescription savePrescription(Prescription prescription, Optional<Consultation> c, Optional<NonConsultation> nc, HttpServletRequest request) {
		Patient patient = new Patient();
		Optional<Medicine> md = medicineRepository.findByName(prescription.getMedicine().getName());
		 
		if(!md.isPresent()) {
			throw new NotFoundException("Medicine not found");
		}
		if(c.isPresent() && nc.isPresent()) {
			throw new InvalidOperationException("Could not save, medicine has two controversial properties");
		}
		if(!c.isPresent() && !nc.isPresent()) {
			throw new InvalidOperationException("Could not save, medicine must have one property");
		}
		if(c.isPresent()) {
			patient = c.get().getPatient();
			prescription.setConsultation(c.get());
		}
		if(nc.isPresent()) {
			patient = nc.get().getPatient();
			prescription.setNonConsultation(nc.get());
		}
		prescription.setMedicine(md.get());
		prescription.setStatus("PENDING");
		Bill bill = new Bill();
		bill.setAmount(prescription.getMedicine().getPrice());
		bill.setPaid(0);
		bill.setBalance(prescription.getMedicine().getPrice());
		bill.setQty(1);
		bill.setDescription("Medicine: "+prescription.getMedicine().getName());
		bill.setStatus("UNPAID");		
		bill.setCreatedBy(userService.getUserId(request));
		bill.setCreatedOn(dayService.getDayId());
		bill.setPatient(patient);
		bill = billRepository.save(bill);
		
		if(patient.getPaymentType().equals("INSURANCE")) {
			
			Optional<MedicinePlanPrice> medicinePricePlan = medicinePlanPriceRepository.findByMedicineAndInsurancePlan(md.get(), patient.getInsurancePlan());
			
			if(medicinePricePlan.isPresent()) {
				bill.setAmount(medicinePricePlan.get().getPrice());
				bill.setPaid(medicinePricePlan.get().getPrice());
				bill.setBalance(0);
				bill.setStatus("COVERED");
				bill = billRepository.save(bill);
				
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
					 * Add lab test bill claim to invoice
					 */
					InvoiceDetail invoiceDetail = new InvoiceDetail();
					invoiceDetail.setInvoice(invoice);
					invoiceDetail.setBill(bill);
					invoiceDetail.setPrice(bill.getAmount());
					invoiceDetail.setDescription("Medicine: "+prescription.getMedicine().getName());
					invoiceDetail.setQty(1);
					invoiceDetailRepository.save(invoiceDetail);
				}else {
					/**
					 * If there is a .pending invoice
					 */
					InvoiceDetail invoiceDetail = new InvoiceDetail();
					invoiceDetail.setInvoice(inv.get());
					invoiceDetail.setBill(bill);
					invoiceDetail.setPrice(bill.getAmount());
					invoiceDetail.setDescription("Medicine: "+prescription.getMedicine().getName());
					invoiceDetail.setQty(1);
					invoiceDetailRepository.save(invoiceDetail);
				}
			}
			
		}
		prescription.setPatient(patient);
		prescription.setBill(bill);
		return prescriptionRepository.save(prescription);		
	}
}
