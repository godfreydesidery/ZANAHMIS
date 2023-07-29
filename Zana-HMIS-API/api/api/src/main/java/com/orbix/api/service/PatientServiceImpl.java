/**
 * 
 */
package com.orbix.api.service;

import java.time.LocalDateTime;
import java.time.Year;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.orbix.api.api.accessories.Sanitizer;
import com.orbix.api.domain.PatientBill;
import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.Clinician;
import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.ConsultationInsurancePlan;
import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.PatientInvoice;
import com.orbix.api.domain.PatientInvoiceDetail;
import com.orbix.api.domain.LabTest;
import com.orbix.api.domain.LabTestType;
import com.orbix.api.domain.LabTestTypeInsurancePlan;
import com.orbix.api.domain.Medicine;
import com.orbix.api.domain.MedicineInsurancePlan;
import com.orbix.api.domain.NonConsultation;
import com.orbix.api.domain.Patient;
import com.orbix.api.domain.PaymentType;
import com.orbix.api.domain.Prescription;
import com.orbix.api.domain.Procedure;
import com.orbix.api.domain.ProcedureType;
import com.orbix.api.domain.ProcedureTypeInsurancePlan;
import com.orbix.api.domain.Radiology;
import com.orbix.api.domain.RadiologyType;
import com.orbix.api.domain.RadiologyTypeInsurancePlan;
import com.orbix.api.domain.Registration;
import com.orbix.api.domain.RegistrationInsurancePlan;
import com.orbix.api.domain.Visit;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.exceptions.NotFoundException;
import com.orbix.api.repositories.ConsultationInsurancePlanRepository;
import com.orbix.api.repositories.ConsultationRepository;
import com.orbix.api.repositories.DayRepository;
import com.orbix.api.repositories.InsurancePlanRepository;
import com.orbix.api.repositories.PatientInvoiceDetailRepository;
import com.orbix.api.repositories.PatientInvoiceRepository;
import com.orbix.api.repositories.LabTestRepository;
import com.orbix.api.repositories.LabTestTypeInsurancePlanRepository;
import com.orbix.api.repositories.LabTestTypeRepository;
import com.orbix.api.repositories.MedicineInsurancePlanRepository;
import com.orbix.api.repositories.MedicineRepository;
import com.orbix.api.repositories.PatientBillRepository;
import com.orbix.api.repositories.PatientRepository;
import com.orbix.api.repositories.PrescriptionRepository;
import com.orbix.api.repositories.ProcedureRepository;
import com.orbix.api.repositories.ProcedureTypeInsurancePlanRepository;
import com.orbix.api.repositories.ProcedureTypeRepository;
import com.orbix.api.repositories.RadiologyRepository;
import com.orbix.api.repositories.RadiologyTypeInsurancePlanRepository;
import com.orbix.api.repositories.RadiologyTypeRepository;
import com.orbix.api.repositories.RegistrationInsurancePlanRepository;
import com.orbix.api.repositories.RegistrationRepository;
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
	private final PatientBillRepository patientBillRepository;
	private final ConsultationRepository consultationRepository;
	private final PatientInvoiceRepository patientInvoiceRepository;
	private final PatientInvoiceDetailRepository patientInvoiceDetailRepository;
	private final DayRepository dayRepository;
	private final UserService userService;
	private final DayService dayService;
	private final ConsultationInsurancePlanRepository consultationInsurancePlanRepository;
	private final LabTestTypeInsurancePlanRepository labTestTypeInsurancePlanRepository;
	private final MedicineInsurancePlanRepository medicineInsurancePlanRepository;
	private final RadiologyTypeInsurancePlanRepository radiologyTypeInsurancePlanRepository;
	private final ProcedureTypeInsurancePlanRepository procedureTypeInsurancePlanRepository;
	private final LabTestTypeRepository labTestTypeRepository;
	private final LabTestRepository labTestRepository;
	private final InsurancePlanRepository insurancePlanRepository;
	private final RegistrationInsurancePlanRepository registrationInsurancePlanRepository;
	private final VisitRepository visitRepository;
	private final RadiologyTypeRepository radiologyTypeRepository;
	private final ProcedureTypeRepository procedureTypeRepository;
	private final RadiologyRepository radiologyRepository;
	private final ProcedureRepository procedureRepository;
	private final MedicineRepository medicineRepository;
	private final PrescriptionRepository prescriptionRepository;
	private final RegistrationRepository registrationRepository;
	
	
	
	
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
		p.setCreatedby(userService.getUser(request));
		p.setCreatedOn(dayService.getDay());
		p.setCreatedAt(dayService.getTimeStamp());
		
		Patient patient = patientRepository.save(p);
		
		/*
		 * 
		 */	
		/**
		 * generate patient unique file no// change this to conventional no, this is only for starting
		 */
		patient.setNo("MRNO/"+String.valueOf(Year.now().getValue())+"/"+ patient.getId().toString());
		/**
		 * Create a search key; to sanitize searchkey later
		 */
		patient.setSearchKey("NA");
		patient = patientRepository.save(patient);//generate search key, 
		patient.setSearchKey(createSearchKey(patient.getNo(), patient.getFirstName(), patient.getMiddleName(), patient.getLastName(), patient.getPhoneNo()));
		patient.setSearchKey(Sanitizer.sanitizeString(patient.getSearchKey()));
		/**
		 * Add forensic data to patient
		 */
		
		patient = patientRepository.save(patient);
		
		/**
		 * Create registration patientBill and assign it to patient
		 */
		PatientBill regBill = new PatientBill();
		double am = 2000;//fetch this value from database, later
		regBill.setAmount(am);
		regBill.setQty(1);
		regBill.setBalance(am);
		regBill.setDescription("Registration Fee");
		regBill.setStatus("UNPAID");
		regBill.setPatient(patient);
		/**
		 * Add forensic data to registration patientBill
		 */
		regBill.setCreatedby(userService.getUser(request));
		regBill.setCreatedOn(dayService.getDay());
		regBill.setCreatedAt(dayService.getTimeStamp());
		/**
		 * Save Registration patientBill
		 */
		regBill = patientBillRepository.save(regBill);
		/**
		 * Assign registration patientBill to patient
		 */
		
		Registration reg = new Registration();
		reg.setPatient(patient);
		
		reg.setCreatedby(userService.getUser(request));
		reg.setCreatedOn(dayService.getDay());
		reg.setCreatedAt(dayService.getTimeStamp());
		
		reg.setPatientBill(regBill);
		reg.setStatus("ACTIVE");
		registrationRepository.save(reg);
		
		//patient.setRegistrationBillId(regBill.getId());
		//patient.setRegistrationFeeStatus("UNPAID");
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
			 * Load Registration plan
			 */
			Optional<RegistrationInsurancePlan> plan = registrationInsurancePlanRepository.findByInsurancePlan(patient.getInsurancePlan());
			if(!plan.isPresent()) {
				throw new NotFoundException("There is no registration plan for this insurance plan. Please change payment method");
			}
			/**
			 * If plan is present, edit registration patientBill to reflect plan price
			 */
			regBill.setAmount(plan.get().getRegistrationFee());
			regBill.setPaid(plan.get().getRegistrationFee());
			regBill.setBalance(0);
			regBill = patientBillRepository.save(regBill);
			/**
			 * Find a pending patientInvoice to register claims, if there is no pending patientInvoice, create one
			 */
			Optional<PatientInvoice> inv = patientInvoiceRepository.findByPatientAndStatus(patient, "PENDING");
			if(!inv.isPresent()) {
				/**
				 * If no pending patientInvoice
				 */
				PatientInvoice patientInvoice = new PatientInvoice();
				patientInvoice.setNo("NA");
				patientInvoice.setPatient(patient);
				patientInvoice.setInsurancePlan(patient.getInsurancePlan());
				patientInvoice.setStatus("PENDING");
				
				patientInvoice.setCreatedby(userService.getUser(request));
				patientInvoice.setCreatedOn(dayService.getDay());
				patientInvoice.setCreatedAt(dayService.getTimeStamp());
				
				patientInvoice = patientInvoiceRepository.save(patientInvoice);
				patientInvoice.setNo(patientInvoice.getId().toString());
				
				
				
				patientInvoice = patientInvoiceRepository.save(patientInvoice);
				/**
				 * Add registration patientBill claim to patientInvoice
				 */
				PatientInvoiceDetail patientInvoiceDetail = new PatientInvoiceDetail();
				patientInvoiceDetail.setPatientInvoice(patientInvoice);
				patientInvoiceDetail.setPatientBill(regBill);
				patientInvoiceDetail.setAmount(regBill.getAmount());
				patientInvoiceDetail.setDescription("Registration Fee");
				patientInvoiceDetail.setQty(1);
				
				patientInvoiceDetail.setCreatedby(userService.getUser(request));
				patientInvoiceDetail.setCreatedOn(dayService.getDay());
				patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
				
				patientInvoiceDetailRepository.saveAndFlush(patientInvoiceDetail);
			}else {
				/**
				 * If there is a .pending patientInvoice
				 */
				PatientInvoiceDetail patientInvoiceDetail = new PatientInvoiceDetail();
				patientInvoiceDetail.setPatientInvoice(inv.get());
				patientInvoiceDetail.setPatientBill(regBill);
				patientInvoiceDetail.setAmount(regBill.getAmount());
				patientInvoiceDetail.setDescription("Registration Fee");
				patientInvoiceDetail.setQty(1);
				
				patientInvoiceDetail.setCreatedby(userService.getUser(request));
				patientInvoiceDetail.setCreatedOn(dayService.getDay());
				patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
				
				patientInvoiceDetailRepository.saveAndFlush(patientInvoiceDetail);
			}
			
			/**
			 * Set registration patientBill to COVERED status, after assigning it to insurance cover
			 */
			regBill.setStatus("COVERED");
			/**
			 * Save registration patientBill
			 */
			regBill = patientBillRepository.save(regBill);
			/**
			 * Set patient Registration fee status to PAID
			 */
			//patient.setRegistrationFeeStatus("PAID");
			patient = patientRepository.save(patient);			
			
			patient = patientRepository.saveAndFlush(patient);			
		}	
		/**
		 * Create patient visit
		 */
		Visit visit = new Visit();
		visit.setPatient(patient);
		visit.setSequence("FIRST");
		visit.setStatus("PENDING");
		visit.setType(patient.getType());
		
		visit.setCreatedby(userService.getUser(request));
		visit.setCreatedOn(dayService.getDay());
		visit.setCreatedAt(dayService.getTimeStamp());
		
		visitRepository.save(visit);
		
		return patient;
	}
	
	@Override
	public Patient doConsultation(Patient p, Clinic c, Clinician cn, HttpServletRequest request) {
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
		 * Create a consultation patientBill and assign it to patient and consultation
		 */
		PatientBill conBill = new PatientBill();
		conBill.setAmount(c.getConsultationFee());
		conBill.setPaid(0);
		conBill.setBalance(c.getConsultationFee());
		conBill.setQty(1);
		conBill.setDescription("Consultation");
		conBill.setStatus("UNPAID");
		/**
		 * Add forensic data to registration patientBill
		 */
		conBill.setCreatedby(userService.getUser(request));
		conBill.setCreatedOn(dayService.getDay());
		conBill.setCreatedAt(dayService.getTimeStamp());
		/**
		 * Assign patient to consultation patientBill
		 */
		conBill.setPatient(p);
		/**
		 * Save Registration patientBill
		 */
		conBill = patientBillRepository.save(conBill);
		/**
		 * Create consultation
		 */
		Consultation consultation = new Consultation();
		consultation.setPatient(p);
		consultation.setClinic(c);
		consultation.setClinician(cn);
		consultation.setStatus("PENDING");
		consultation.setPatientBill(conBill);
		consultation.setPaymentType(p.getPaymentType());
		
		/**
		 * Set visit, create one if the last visit is not for today
		 */
		Optional<Visit> v = visitRepository.findLastByPatient(p);
		Visit visit = new Visit();
		if(!v.isPresent() || !v.get().getStatus().equals("PENDING")) {			
			visit.setPatient(p);
			if(!v.isPresent()) {
				visit.setSequence("FIRST");
			}else {
				visit.setSequence("SUBSEQUENT");
			}
			
			visit.setCreatedby(userService.getUser(request));
			visit.setCreatedOn(dayService.getDay());
			visit.setCreatedAt(dayService.getTimeStamp());
			
			visitRepository.save(visit);
		}else {
			visit = v.get();
		}
		consultation.setVisit(visit);
		
		/**
		 * Add forensic data
		 */
		consultation.setCreatedby(userService.getUser(request));
		consultation.setCreatedOn(dayService.getDay());
		consultation.setCreatedAt(dayService.getTimeStamp());
		/**
		 * Save consultation
		 */
		consultation = consultationRepository.save(consultation);
		
		
		/**
		 * Check whether, if patient should pay by insurance, if the insurance cover is the same as the on registered for the patient
		 */
		if(p.getPaymentType().equals("INSURANCE")) {
			Optional<InsurancePlan> plan = insurancePlanRepository.findByName(p.getInsurancePlan().getName());
			if(!plan.isPresent()) {
				throw new NotFoundException("Insurance plan not found in database");
			}
			/**
			 * If plan has changed, check if previous transactions involving the plan have been signed
			 */
			Optional<PatientInvoice> pendingInv = patientInvoiceRepository.findByPatientAndStatus(p, "PENDING");
			if(p.getPaymentType().equals("INSURANCE")) {
				if(plan.get().getId() != p.getInsurancePlan().getId()) {
					if(pendingInv.isPresent()) {
						throw new InvalidOperationException("Use of two or more insurance plan. The patient should sign of the initial patientInvoice before proceeding with another plan");
					}
				}
				
			}else if(p.getPaymentType().equals("CASH")){
				if(pendingInv.isPresent()) {
					throw new InvalidOperationException("Use of two or more insurance plan. The patient should sign of the iniitial patientInvoice before proceeding with another plan");
				}
			}
			p.setPaymentType("INSURANCE");
			p.setInsurancePlan(plan.get());
			p.setMembershipNo(p.getMembershipNo());
			p = patientRepository.save(p);
			
			consultation.setPaymentType("INSURANCE");
			consultation.setMembershipNo(p.getMembershipNo());
			consultation.setInsurancePlan(plan.get());
			
			consultation.setCreatedby(userService.getUser(request));
			consultation.setCreatedOn(dayService.getDay());
			consultation.setCreatedAt(dayService.getTimeStamp());
			
			consultation = consultationRepository.save(consultation);
		}else if(p.getPaymentType().equals("CASH")){
			
			p.setPaymentType("CASH");
			p.setInsurancePlan(null);
			p.setMembershipNo("");
			p = patientRepository.save(p);
			
			consultation.setPaymentType("CASH");
			consultation.setMembershipNo("");
			consultation.setInsurancePlan(null);
			
			consultation.setCreatedby(userService.getUser(request));
			consultation.setCreatedOn(dayService.getDay());
			consultation.setCreatedAt(dayService.getTimeStamp());
			
			
			consultation = consultationRepository.save(consultation);
		}else {
			throw new InvalidOperationException("Invalid Payment type selected");
		}
		
		/**
		 * Now, if the patient is covered
		 */
		if(p.getPaymentType().equals("INSURANCE")) {
			
			
			Optional<ConsultationInsurancePlan> consultationPricePlan = consultationInsurancePlanRepository.findByClinicAndInsurancePlan(c, p.getInsurancePlan());
			
			if(!consultationPricePlan.isPresent()) {
				throw new InvalidOperationException("Plan not available for this clinic. Please change payment method");
			}
			conBill.setAmount(consultationPricePlan.get().getConsultationFee());
			conBill.setPaid(consultationPricePlan.get().getConsultationFee());
			conBill.setBalance(0);
			conBill.setStatus("COVERED");
			
			conBill.setCreatedby(userService.getUser(request));
			conBill.setCreatedOn(dayService.getDay());
			conBill.setCreatedAt(dayService.getTimeStamp());
			
			conBill = patientBillRepository.save(conBill);
			
			/**
			 * Find a pending patientInvoice to register claims, if there is no pending patientInvoice, create one
			 */
			Optional<PatientInvoice> inv = patientInvoiceRepository.findByPatientAndStatus(p, "PENDING");
			if(!inv.isPresent()) {
				/**
				 * If no pending patientInvoice
				 */
				PatientInvoice patientInvoice = new PatientInvoice();
				patientInvoice.setNo("NA");
				patientInvoice.setPatient(p);
				patientInvoice.setInsurancePlan(p.getInsurancePlan());
				patientInvoice.setStatus("PENDING");
				patientInvoice = patientInvoiceRepository.save(patientInvoice);
				patientInvoice.setNo(patientInvoice.getId().toString());

				patientInvoice.setCreatedby(userService.getUser(request));
				patientInvoice.setCreatedOn(dayService.getDay());
				patientInvoice.setCreatedAt(dayService.getTimeStamp());
				
				patientInvoice = patientInvoiceRepository.save(patientInvoice);
				/**
				 * Add registration patientBill claim to patientInvoice
				 */
				PatientInvoiceDetail patientInvoiceDetail = new PatientInvoiceDetail();
				patientInvoiceDetail.setPatientInvoice(patientInvoice);
				patientInvoiceDetail.setPatientBill(conBill);
				patientInvoiceDetail.setAmount(conBill.getAmount());
				patientInvoiceDetail.setDescription("Consultation");
				patientInvoiceDetail.setQty(1);
				
				patientInvoiceDetail.setCreatedby(userService.getUser(request));
				patientInvoiceDetail.setCreatedOn(dayService.getDay());
				patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
				
				patientInvoiceDetailRepository.saveAndFlush(patientInvoiceDetail);
			}else {
				/**
				 * If there is a .pending patientInvoice
				 */
				PatientInvoiceDetail patientInvoiceDetail = new PatientInvoiceDetail();
				patientInvoiceDetail.setPatientInvoice(inv.get());
				patientInvoiceDetail.setPatientBill(conBill);
				patientInvoiceDetail.setAmount(conBill.getAmount());
				patientInvoiceDetail.setDescription("Consultation");
				patientInvoiceDetail.setQty(1);
				
				patientInvoiceDetail.setCreatedby(userService.getUser(request));
				patientInvoiceDetail.setCreatedOn(dayService.getDay());
				patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
				
				patientInvoiceDetailRepository.saveAndFlush(patientInvoiceDetail);
			}
		}
		
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
		pt.get().setSearchKey(Sanitizer.sanitizeString(pt.get().getSearchKey()));
		//recreate search key
		pt.get().setFirstName(patient.getFirstName());
		pt.get().setMiddleName(patient.getMiddleName());
		pt.get().setLastName(patient.getLastName());
		pt.get().setDateOfBirth(patient.getDateOfBirth());
		pt.get().setGender(patient.getGender());
		pt.get().setNationality(patient.getNationality());
		pt.get().setNationalId(patient.getNationalId());
		pt.get().setPassportNo(patient.getPassportNo());
		pt.get().setPhoneNo(patient.getPhoneNo());
		pt.get().setEmail(patient.getEmail());
		pt.get().setAddress(patient.getAddress());
		pt.get().setKinFullName(patient.getKinFullName());
		pt.get().setKinRelationship(patient.getKinRelationship());
		pt.get().setKinPhoneNo(patient.getKinPhoneNo());
		
		
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
		PatientBill patientBill = new PatientBill();
		patientBill.setAmount(test.getLabTestType().getPrice());
		patientBill.setPaid(0);
		patientBill.setBalance(test.getLabTestType().getPrice());
		patientBill.setQty(1);
		patientBill.setDescription("Lab Test: "+test.getLabTestType().getName());
		patientBill.setStatus("UNPAID");		
		patientBill.setCreatedby(userService.getUser(request));
		patientBill.setCreatedOn(dayService.getDay());
		patientBill.setCreatedAt(dayService.getTimeStamp());
		patientBill.setPatient(patient);
		patientBill = patientBillRepository.save(patientBill);
		
		if(patient.getPaymentType().equals("INSURANCE")) {
			
			Optional<LabTestTypeInsurancePlan> labTestTypePricePlan = labTestTypeInsurancePlanRepository.findByLabTestTypeAndInsurancePlan(ltt.get(), patient.getInsurancePlan());
			
			if(labTestTypePricePlan.isPresent()) {
				patientBill.setAmount(labTestTypePricePlan.get().getPrice());
				patientBill.setPaid(labTestTypePricePlan.get().getPrice());
				patientBill.setBalance(0);
				patientBill.setStatus("COVERED");
				patientBill = patientBillRepository.save(patientBill);
				
				Optional<PatientInvoice> inv = patientInvoiceRepository.findByPatientAndStatus(patient, "PENDING");
				if(!inv.isPresent()) {
					/**
					 * If no pending patientInvoice
					 */
					PatientInvoice patientInvoice = new PatientInvoice();
					patientInvoice.setNo("NA");
					patientInvoice.setPatient(patient);
					patientInvoice.setInsurancePlan(patient.getInsurancePlan());
					patientInvoice.setStatus("PENDING");
					patientInvoice = patientInvoiceRepository.save(patientInvoice);
					patientInvoice.setNo(patientInvoice.getId().toString());
					patientInvoice = patientInvoiceRepository.save(patientInvoice);
					/**
					 * Add lab test patientBill claim to patientInvoice
					 */
					PatientInvoiceDetail patientInvoiceDetail = new PatientInvoiceDetail();
					patientInvoiceDetail.setPatientInvoice(patientInvoice);
					patientInvoiceDetail.setPatientBill(patientBill);
					patientInvoiceDetail.setAmount(patientBill.getAmount());
					patientInvoiceDetail.setDescription("Lab Test: "+test.getLabTestType().getName());
					patientInvoiceDetail.setQty(1);
					patientInvoiceDetailRepository.save(patientInvoiceDetail);
				}else {
					/**
					 * If there is a .pending patientInvoice
					 */
					PatientInvoiceDetail patientInvoiceDetail = new PatientInvoiceDetail();
					patientInvoiceDetail.setPatientInvoice(inv.get());
					patientInvoiceDetail.setPatientBill(patientBill);
					patientInvoiceDetail.setAmount(patientBill.getAmount());
					patientInvoiceDetail.setDescription("Lab Test: "+test.getLabTestType().getName());
					patientInvoiceDetail.setQty(1);
					patientInvoiceDetailRepository.save(patientInvoiceDetail);
				}
			}
			
		}
		test.setPatient(patient);
		test.setPatientBill(patientBill);
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
		PatientBill patientBill = new PatientBill();
		patientBill.setAmount(radio.getRadiologyType().getPrice());
		patientBill.setPaid(0);
		patientBill.setBalance(radio.getRadiologyType().getPrice());
		patientBill.setQty(1);
		patientBill.setDescription("Radiology: "+radio.getRadiologyType().getName());
		patientBill.setStatus("UNPAID");		
		patientBill.setCreatedby(userService.getUser(request));
		patientBill.setCreatedOn(dayService.getDay());
		patientBill.setCreatedAt(dayService.getTimeStamp());
		patientBill.setPatient(patient);
		patientBill = patientBillRepository.save(patientBill);
		
		if(patient.getPaymentType().equals("INSURANCE")) {
			
			Optional<RadiologyTypeInsurancePlan> radiologyTypePricePlan = radiologyTypeInsurancePlanRepository.findByRadiologyTypeAndInsurancePlan(rt.get(), patient.getInsurancePlan());
			
			if(radiologyTypePricePlan.isPresent()) {
				patientBill.setAmount(radiologyTypePricePlan.get().getPrice());
				patientBill.setPaid(radiologyTypePricePlan.get().getPrice());
				patientBill.setBalance(0);
				patientBill.setStatus("COVERED");
				patientBill = patientBillRepository.save(patientBill);
				
				Optional<PatientInvoice> inv = patientInvoiceRepository.findByPatientAndStatus(patient, "PENDING");
				if(!inv.isPresent()) {
					/**
					 * If no pending patientInvoice
					 */
					PatientInvoice patientInvoice = new PatientInvoice();
					patientInvoice.setNo("NA");
					patientInvoice.setPatient(patient);
					patientInvoice.setInsurancePlan(patient.getInsurancePlan());
					patientInvoice.setStatus("PENDING");
					patientInvoice = patientInvoiceRepository.save(patientInvoice);
					patientInvoice.setNo(patientInvoice.getId().toString());
					patientInvoice = patientInvoiceRepository.save(patientInvoice);
					/**
					 * Add lab test patientBill claim to patientInvoice
					 */
					PatientInvoiceDetail patientInvoiceDetail = new PatientInvoiceDetail();
					patientInvoiceDetail.setPatientInvoice(patientInvoice);
					patientInvoiceDetail.setPatientBill(patientBill);
					patientInvoiceDetail.setAmount(patientBill.getAmount());
					patientInvoiceDetail.setDescription("Radiology: "+radio.getRadiologyType().getName());
					patientInvoiceDetail.setQty(1);
					patientInvoiceDetailRepository.save(patientInvoiceDetail);
				}else {
					/**
					 * If there is a .pending patientInvoice
					 */
					PatientInvoiceDetail patientInvoiceDetail = new PatientInvoiceDetail();
					patientInvoiceDetail.setPatientInvoice(inv.get());
					patientInvoiceDetail.setPatientBill(patientBill);
					patientInvoiceDetail.setAmount(patientBill.getAmount());
					patientInvoiceDetail.setDescription("Radiology: "+radio.getRadiologyType().getName());
					patientInvoiceDetail.setQty(1);
					patientInvoiceDetailRepository.save(patientInvoiceDetail);
				}
			}
			
		}
		radio.setPatient(patient);
		radio.setPatientBill(patientBill);
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
		PatientBill patientBill = new PatientBill();
		patientBill.setAmount(procedure.getProcedureType().getPrice());
		patientBill.setPaid(0);
		patientBill.setBalance(procedure.getProcedureType().getPrice());
		patientBill.setQty(1);
		patientBill.setDescription("Procedure: "+procedure.getProcedureType().getName());
		patientBill.setStatus("UNPAID");		
		patientBill.setCreatedby(userService.getUser(request));
		patientBill.setCreatedOn(dayService.getDay());
		patientBill.setCreatedAt(dayService.getTimeStamp());
		patientBill.setPatient(patient);
		patientBill = patientBillRepository.save(patientBill);
		
		if(patient.getPaymentType().equals("INSURANCE")) {
			
			Optional<ProcedureTypeInsurancePlan> procedureTypePricePlan = procedureTypeInsurancePlanRepository.findByProcedureTypeAndInsurancePlan(pr.get(), patient.getInsurancePlan());
			
			if(procedureTypePricePlan.isPresent()) {
				patientBill.setAmount(procedureTypePricePlan.get().getPrice());
				patientBill.setPaid(procedureTypePricePlan.get().getPrice());
				patientBill.setBalance(0);
				patientBill.setStatus("COVERED");
				patientBill = patientBillRepository.save(patientBill);
				
				Optional<PatientInvoice> inv = patientInvoiceRepository.findByPatientAndStatus(patient, "PENDING");
				if(!inv.isPresent()) {
					/**
					 * If no pending patientInvoice
					 */
					PatientInvoice patientInvoice = new PatientInvoice();
					patientInvoice.setNo("NA");
					patientInvoice.setPatient(patient);
					patientInvoice.setInsurancePlan(patient.getInsurancePlan());
					patientInvoice.setStatus("PENDING");
					patientInvoice = patientInvoiceRepository.save(patientInvoice);
					patientInvoice.setNo(patientInvoice.getId().toString());
					patientInvoice = patientInvoiceRepository.save(patientInvoice);
					/**
					 * Add lab test patientBill claim to patientInvoice
					 */
					PatientInvoiceDetail patientInvoiceDetail = new PatientInvoiceDetail();
					patientInvoiceDetail.setPatientInvoice(patientInvoice);
					patientInvoiceDetail.setPatientBill(patientBill);
					patientInvoiceDetail.setAmount(patientBill.getAmount());
					patientInvoiceDetail.setDescription("Procedure: "+procedure.getProcedureType().getName());
					patientInvoiceDetail.setQty(1);
					patientInvoiceDetailRepository.save(patientInvoiceDetail);
				}else {
					/**
					 * If there is a .pending patientInvoice
					 */
					PatientInvoiceDetail patientInvoiceDetail = new PatientInvoiceDetail();
					patientInvoiceDetail.setPatientInvoice(inv.get());
					patientInvoiceDetail.setPatientBill(patientBill);
					patientInvoiceDetail.setAmount(patientBill.getAmount());
					patientInvoiceDetail.setDescription("Procedure: "+procedure.getProcedureType().getName());
					patientInvoiceDetail.setQty(1);
					patientInvoiceDetailRepository.save(patientInvoiceDetail);
				}
			}
			
		}
		procedure.setPatient(patient);
		procedure.setPatientBill(patientBill);
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
		PatientBill patientBill = new PatientBill();
		patientBill.setAmount(prescription.getMedicine().getPrice());
		patientBill.setPaid(0);
		patientBill.setBalance(prescription.getMedicine().getPrice());
		patientBill.setQty(1);
		patientBill.setDescription("Medicine: "+prescription.getMedicine().getName());
		patientBill.setStatus("UNPAID");		
		patientBill.setCreatedby(userService.getUser(request));
		patientBill.setCreatedOn(dayService.getDay());
		patientBill.setCreatedAt(dayService.getTimeStamp());
		patientBill.setPatient(patient);
		patientBill = patientBillRepository.save(patientBill);
		
		if(patient.getPaymentType().equals("INSURANCE")) {
			
			Optional<MedicineInsurancePlan> medicinePricePlan = medicineInsurancePlanRepository.findByMedicineAndInsurancePlan(md.get(), patient.getInsurancePlan());
			
			if(medicinePricePlan.isPresent()) {
				patientBill.setAmount(medicinePricePlan.get().getPrice());
				patientBill.setPaid(medicinePricePlan.get().getPrice());
				patientBill.setBalance(0);
				patientBill.setStatus("COVERED");
				patientBill = patientBillRepository.save(patientBill);
				
				Optional<PatientInvoice> inv = patientInvoiceRepository.findByPatientAndStatus(patient, "PENDING");
				if(!inv.isPresent()) {
					/**
					 * If no pending patientInvoice
					 */
					PatientInvoice patientInvoice = new PatientInvoice();
					patientInvoice.setNo("NA");
					patientInvoice.setPatient(patient);
					patientInvoice.setInsurancePlan(patient.getInsurancePlan());
					patientInvoice.setStatus("PENDING");
					patientInvoice = patientInvoiceRepository.save(patientInvoice);
					patientInvoice.setNo(patientInvoice.getId().toString());
					patientInvoice = patientInvoiceRepository.save(patientInvoice);
					/**
					 * Add lab test patientBill claim to patientInvoice
					 */
					PatientInvoiceDetail patientInvoiceDetail = new PatientInvoiceDetail();
					patientInvoiceDetail.setPatientInvoice(patientInvoice);
					patientInvoiceDetail.setPatientBill(patientBill);
					patientInvoiceDetail.setAmount(patientBill.getAmount());
					patientInvoiceDetail.setDescription("Medicine: "+prescription.getMedicine().getName());
					patientInvoiceDetail.setQty(1);
					patientInvoiceDetailRepository.save(patientInvoiceDetail);
				}else {
					/**
					 * If there is a .pending patientInvoice
					 */
					PatientInvoiceDetail patientInvoiceDetail = new PatientInvoiceDetail();
					patientInvoiceDetail.setPatientInvoice(inv.get());
					patientInvoiceDetail.setPatientBill(patientBill);
					patientInvoiceDetail.setAmount(patientBill.getAmount());
					patientInvoiceDetail.setDescription("Medicine: "+prescription.getMedicine().getName());
					patientInvoiceDetail.setQty(1);
					patientInvoiceDetailRepository.save(patientInvoiceDetail);
				}
			}
			
		}
		prescription.setPatient(patient);
		prescription.setPatientBill(patientBill);
		return prescriptionRepository.save(prescription);		
	}
}
