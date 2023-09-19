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
import com.orbix.api.domain.Admission;
import com.orbix.api.domain.AdmissionBed;
import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.Clinician;
import com.orbix.api.domain.CompanyProfile;
import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.ConsultationInsurancePlan;
import com.orbix.api.domain.DiagnosisType;
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
import com.orbix.api.domain.Prescription;
import com.orbix.api.domain.Procedure;
import com.orbix.api.domain.ProcedureType;
import com.orbix.api.domain.ProcedureTypeInsurancePlan;
import com.orbix.api.domain.Radiology;
import com.orbix.api.domain.RadiologyType;
import com.orbix.api.domain.RadiologyTypeInsurancePlan;
import com.orbix.api.domain.Registration;
import com.orbix.api.domain.RegistrationInsurancePlan;
import com.orbix.api.domain.Theatre;
import com.orbix.api.domain.Visit;
import com.orbix.api.domain.WardBed;
import com.orbix.api.domain.WardTypeInsurancePlan;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.exceptions.NotFoundException;
import com.orbix.api.repositories.AdmissionBedRepository;
import com.orbix.api.repositories.AdmissionRepository;
import com.orbix.api.repositories.ClinicianRepository;
import com.orbix.api.repositories.CompanyProfileRepository;
import com.orbix.api.repositories.ConsultationInsurancePlanRepository;
import com.orbix.api.repositories.ConsultationRepository;
import com.orbix.api.repositories.DayRepository;
import com.orbix.api.repositories.DiagnosisTypeRepository;
import com.orbix.api.repositories.InsurancePlanRepository;
import com.orbix.api.repositories.PatientInvoiceDetailRepository;
import com.orbix.api.repositories.PatientInvoiceRepository;
import com.orbix.api.repositories.LabTestRepository;
import com.orbix.api.repositories.LabTestTypeInsurancePlanRepository;
import com.orbix.api.repositories.LabTestTypeRepository;
import com.orbix.api.repositories.MedicineInsurancePlanRepository;
import com.orbix.api.repositories.MedicineRepository;
import com.orbix.api.repositories.NonConsultationRepository;
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
import com.orbix.api.repositories.TheatreRepository;
import com.orbix.api.repositories.VisitRepository;
import com.orbix.api.repositories.WardBedRepository;
import com.orbix.api.repositories.WardTypeInsurancePlanRepository;

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
	private final NonConsultationRepository nonConsultationRepository;
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
	private final DiagnosisTypeRepository diagnosisTypeRepository;
	private final TheatreRepository theatreRepository;
	private final CompanyProfileRepository companyProfileRepository;
	private final AdmissionRepository admissionRepository;
	private final WardBedRepository wardBedRepository;
	private final AdmissionBedRepository admissionBedRepository;
	private final WardTypeInsurancePlanRepository wardTypeInsurancePlanRepository;
	private final ClinicianRepository clinicianRepository;
	
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
		double regFee = 0;
		List<CompanyProfile> cps = companyProfileRepository.findAll();
		for(CompanyProfile cp : cps) {
			regFee = cp.getRegistrationFee();
		}
		/**
		 * Save patient after validating credentials
		 */
		p.setCreatedby(userService.getUser(request).getId());
		p.setCreatedOn(dayService.getDay().getId());
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
		//fetch this value from database, later
		regBill.setAmount(regFee);
		regBill.setQty(1);
		regBill.setBalance(regFee);
		regBill.setDescription("Registration Fee"); 
		regBill.setStatus("UNPAID");
		regBill.setPatient(patient);
		/**
		 * Add forensic data to registration patientBill
		 */
		regBill.setCreatedby(userService.getUser(request).getId());
		regBill.setCreatedOn(dayService.getDay().getId());
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
		
		reg.setCreatedby(userService.getUser(request).getId());
		reg.setCreatedOn(dayService.getDay().getId());
		reg.setCreatedAt(dayService.getTimeStamp());
		
		reg.setPatientBill(regBill);
		reg.setStatus("ACTIVE");
		registrationRepository.save(reg);
		
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
			Optional<RegistrationInsurancePlan> plan = registrationInsurancePlanRepository.findByInsurancePlanAndCovered(patient.getInsurancePlan(), true);
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
				
				patientInvoice.setCreatedby(userService.getUser(request).getId());
				patientInvoice.setCreatedOn(dayService.getDay().getId());
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
				
				patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
				patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
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
				
				patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
				patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
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
		
		visit.setCreatedby(userService.getUser(request).getId());
		visit.setCreatedOn(dayService.getDay().getId());
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
		conBill.setCreatedby(userService.getUser(request).getId());
		conBill.setCreatedOn(dayService.getDay().getId());
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
			
			visit.setCreatedby(userService.getUser(request).getId());
			visit.setCreatedOn(dayService.getDay().getId());
			visit.setCreatedAt(dayService.getTimeStamp());
			
			visitRepository.save(visit);
		}else {
			visit = v.get();
		}
		consultation.setVisit(visit);
		
		/**
		 * Add forensic data
		 */
		consultation.setCreatedby(userService.getUser(request).getId());
		consultation.setCreatedOn(dayService.getDay().getId());
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
			
			consultation.setCreatedby(userService.getUser(request).getId());
			consultation.setCreatedOn(dayService.getDay().getId());
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
			
			consultation.setCreatedby(userService.getUser(request).getId());
			consultation.setCreatedOn(dayService.getDay().getId());
			consultation.setCreatedAt(dayService.getTimeStamp());
			
			
			consultation = consultationRepository.save(consultation);
		}else {
			throw new InvalidOperationException("Invalid Payment type selected");
		}
		
		/**
		 * Now, if the patient is covered
		 */
		if(p.getPaymentType().equals("INSURANCE")) {
			
			
			Optional<ConsultationInsurancePlan> consultationPricePlan = consultationInsurancePlanRepository.findByClinicAndInsurancePlanAndCovered(c, p.getInsurancePlan(), true);
			
			if(!consultationPricePlan.isPresent()) {
				throw new InvalidOperationException("Plan not available for this clinic. Please change payment method");
			}
			conBill.setAmount(consultationPricePlan.get().getConsultationFee());
			conBill.setPaid(consultationPricePlan.get().getConsultationFee());
			conBill.setBalance(0);
			conBill.setStatus("COVERED");
			
			conBill.setCreatedby(userService.getUser(request).getId());
			conBill.setCreatedOn(dayService.getDay().getId());
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
				
				patientInvoice.setCreatedby(userService.getUser(request).getId());
				patientInvoice.setCreatedOn(dayService.getDay().getId());
				patientInvoice.setCreatedAt(dayService.getTimeStamp());
				
				patientInvoice = patientInvoiceRepository.save(patientInvoice);
				patientInvoice.setNo(patientInvoice.getId().toString());

				
				
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
				
				patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
				patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
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
				
				patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
				patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
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
	public LabTest saveLabTest(LabTest test, Optional<Consultation> c, Optional<NonConsultation> nc, Optional<Admission> a, HttpServletRequest request) {
		Patient patient = new Patient();
		Optional<LabTestType> ltt = labTestTypeRepository.findById(test.getLabTestType().getId());
		 
		if(!ltt.isPresent()) {
			throw new NotFoundException("Lab Test type not found");
		}
		Optional<DiagnosisType> dt;
		
		if(test.getDiagnosisType().getId() != null) {
			dt = diagnosisTypeRepository.findById(test.getDiagnosisType().getId());
			if(!dt.isPresent() && test.getDiagnosisType().getId() != null)	{
				throw new NotFoundException("Diagnosis type not found");
			}else {
				test.setDiagnosisType(dt.get());
			}
		}else {
			test.setDiagnosisType(null);
		}
		
		 
		
		if(c.isPresent() && nc.isPresent() && a.isPresent()) {
			throw new InvalidOperationException("Could not save, labtest should not have more than two properties");
		}		
		if(c.isPresent() && nc.isPresent() && !a.isPresent()) {
			throw new InvalidOperationException("Could not save, labtest should not have more than two properties");
		}
		if(c.isPresent() && !nc.isPresent() && a.isPresent()) {
			throw new InvalidOperationException("Could not save, labtest should not have more than two properties");
		}
		if(!c.isPresent() && nc.isPresent() && a.isPresent()) {
			throw new InvalidOperationException("Could not save, labtest should not have more than two properties");
		}		
		if(!c.isPresent() && !nc.isPresent() && !a.isPresent()) {
			throw new InvalidOperationException("Could not save, labtest must have one property");
		}
		
		if(c.isPresent()) {
			patient = c.get().getPatient();
			test.setConsultation(c.get());
			test.setClinician(c.get().getClinician());
		}
		if(nc.isPresent()) {
			NonConsultation non;// = new NonConsultation();
			if(nc.get().getStatus().equals("PENDING")) {
				nc.get().setStatus("IN-PROCESS");
				non =	nonConsultationRepository.save(nc.get());
			}else if(nc.get().getStatus().equals("IN-PROCESS")) {
				non = nc.get();
			}else {
				throw new InvalidOperationException("Could not be done. Patient already signed off");
			}
			patient = non.getPatient();
			test.setNonConsultation(non);
		}
		
		if(a.isPresent()) {
			Admission adm;// = new NonConsultation();
			if(a.get().getStatus().equals("PENDING")) {
				throw new InvalidOperationException("Could not be done. Admission not verified");
			}else if(a.get().getStatus().equals("IN-PROCESS")) {
				adm = a.get();
			}else {
				throw new InvalidOperationException("Could not be done. Patient already signed off");
			}
			patient = adm.getPatient();
			test.setAdmission(adm);
			Optional<Clinician> clin = clinicianRepository.findByUser(userService.getUser(request));
			if(clin.isPresent()) {
				test.setClinician(clin.get());
			}
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
		
		patientBill.setCreatedby(userService.getUser(request).getId());
		patientBill.setCreatedOn(dayService.getDay().getId());
		patientBill.setCreatedAt(dayService.getTimeStamp());
		
		patientBill.setPatient(patient);
		patientBill = patientBillRepository.save(patientBill);
		
		if(patient.getPaymentType().equals("INSURANCE") || a.isPresent() == true) {
			
			Optional<LabTestTypeInsurancePlan> labTestTypePricePlan = labTestTypeInsurancePlanRepository.findByLabTestTypeAndInsurancePlanAndCovered(ltt.get(), patient.getInsurancePlan(), true);
			
			if(labTestTypePricePlan.isPresent()) {
				patientBill.setAmount(labTestTypePricePlan.get().getPrice());
				patientBill.setPaid(labTestTypePricePlan.get().getPrice());
				patientBill.setBalance(0);
				patientBill.setStatus("COVERED");
				patientBill.setInsurancePlan(labTestTypePricePlan.get().getInsurancePlan());
				patientBill = patientBillRepository.save(patientBill);
								
				Optional<PatientInvoice> inv = patientInvoiceRepository.findByPatientAndInsurancePlanAndStatus(patient, patient.getInsurancePlan(),"PENDING");
				if(!inv.isPresent()) {
					/**
					 * If no pending patientInvoice
					 */
					PatientInvoice patientInvoice = new PatientInvoice();
					patientInvoice.setNo("NA");
					patientInvoice.setPatient(patient);
					patientInvoice.setInsurancePlan(patient.getInsurancePlan());
					patientInvoice.setStatus("PENDING");
					
					patientInvoice.setCreatedby(userService.getUser(request).getId());
					patientInvoice.setCreatedOn(dayService.getDay().getId());
					patientInvoice.setCreatedAt(dayService.getTimeStamp());
					
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
					
					patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
					patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
					patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
					
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
					
					patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
					patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
					patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
					
					patientInvoiceDetailRepository.save(patientInvoiceDetail);
				}
			}else if(a.isPresent() == true) {
				
				patientBill.setAmount(test.getLabTestType().getPrice());
				patientBill.setPaid(test.getLabTestType().getPrice());
				patientBill.setBalance(0);
				patientBill.setStatus("VERIFIED");
				patientBill = patientBillRepository.save(patientBill);
				
				Optional<PatientInvoice> inv = patientInvoiceRepository.findByPatientAndInsurancePlanAndStatus(patient, null,"PENDING");
				if(!inv.isPresent()) {
					/**
					 * If no pending patientInvoice
					 */
					PatientInvoice patientInvoice = new PatientInvoice();
					patientInvoice.setNo("NA");
					patientInvoice.setPatient(patient);
					patientInvoice.setInsurancePlan(null);
					patientInvoice.setStatus("PENDING");
					
					patientInvoice.setCreatedby(userService.getUser(request).getId());
					patientInvoice.setCreatedOn(dayService.getDay().getId());
					patientInvoice.setCreatedAt(dayService.getTimeStamp());
					
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
					
					patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
					patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
					patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
					
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
					
					patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
					patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
					patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
					
					patientInvoiceDetailRepository.save(patientInvoiceDetail);
				}
			}
			
		}
		test.setPatient(patient);
		test.setPatientBill(patientBill);
		labTestRepository.save(test);	
		return null;
	}
	
	@Override
	public Radiology saveRadiology(Radiology radio, Optional<Consultation> c, Optional<NonConsultation> nc, Optional<Admission> a, HttpServletRequest request) {
		Patient patient = new Patient();
		Optional<RadiologyType> rt = radiologyTypeRepository.findById(radio.getRadiologyType().getId());
				 
		if(!rt.isPresent()) {
			throw new NotFoundException("Radiology type not found");
		}
		Optional<DiagnosisType> dt;		
		if(radio.getDiagnosisType().getId() != null) {
			dt = diagnosisTypeRepository.findById(radio.getDiagnosisType().getId());
			if(!dt.isPresent() && radio.getDiagnosisType().getId() != null)	{
				throw new NotFoundException("Diagnosis type not found");
			}else {
				radio.setDiagnosisType(dt.get());
			}
		}else {
			radio.setDiagnosisType(null);
		}
		
		if(c.isPresent() && nc.isPresent() && a.isPresent()) {
			throw new InvalidOperationException("Could not save, radiology should not have more than two properties");
		}		
		if(c.isPresent() && nc.isPresent() && !a.isPresent()) {
			throw new InvalidOperationException("Could not save, radiology should not have more than two properties");
		}
		if(c.isPresent() && !nc.isPresent() && a.isPresent()) {
			throw new InvalidOperationException("Could not save, radiology should not have more than two properties");
		}
		if(!c.isPresent() && nc.isPresent() && a.isPresent()) {
			throw new InvalidOperationException("Could not save, radiology should not have more than two properties");
		}
		if(!c.isPresent() && !nc.isPresent() && !a.isPresent()) {
			throw new InvalidOperationException("Could not save, radiology should have one property");
		}
		if(c.isPresent()) {
			patient = c.get().getPatient();
			radio.setConsultation(c.get());
			radio.setClinician(c.get().getClinician());
		}
		
		if(nc.isPresent()) {
			NonConsultation non;// = new NonConsultation();
			if(nc.get().getStatus().equals("PENDING")) {
				nc.get().setStatus("IN-PROCESS");
				non =	nonConsultationRepository.save(nc.get());
			}else if(nc.get().getStatus().equals("IN-PROCESS")) {
				non = nc.get();
			}else {
				throw new InvalidOperationException("Could not be done. Patient already signed off");
			}
			patient = non.getPatient();
			radio.setNonConsultation(non);
		}
		if(a.isPresent()) {
			Admission adm;// = new NonConsultation();
			if(a.get().getStatus().equals("PENDING")) {
				throw new InvalidOperationException("Could not be done. Admission not verified");
			}else if(a.get().getStatus().equals("IN-PROCESS")) {
				adm = a.get();
			}else {
				throw new InvalidOperationException("Could not be done. Patient already signed off");
			}
			Optional<Clinician> clin = clinicianRepository.findByUser(userService.getUser(request));
			if(clin.isPresent()) {
				radio.setClinician(clin.get());
			}
			patient = adm.getPatient();
			radio.setAdmission(adm);
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
		patientBill.setCreatedby(userService.getUser(request).getId());
		patientBill.setCreatedOn(dayService.getDay().getId());
		patientBill.setCreatedAt(dayService.getTimeStamp());
		patientBill.setPatient(patient);
		patientBill = patientBillRepository.save(patientBill);
		
		if(patient.getPaymentType().equals("INSURANCE") || a.isPresent() == true) {
			
			Optional<RadiologyTypeInsurancePlan> radiologyTypePricePlan = radiologyTypeInsurancePlanRepository.findByRadiologyTypeAndInsurancePlanAndCovered(rt.get(), patient.getInsurancePlan(), true);
			
			if(radiologyTypePricePlan.isPresent()) {
				patientBill.setAmount(radiologyTypePricePlan.get().getPrice());
				patientBill.setPaid(radiologyTypePricePlan.get().getPrice());
				patientBill.setBalance(0);
				patientBill.setStatus("COVERED");
				patientBill.setInsurancePlan(radiologyTypePricePlan.get().getInsurancePlan());
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
					
					patientInvoice.setCreatedby(userService.getUser(request).getId());
					patientInvoice.setCreatedOn(dayService.getDay().getId());
					patientInvoice.setCreatedAt(dayService.getTimeStamp());
					
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
					
					patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
					patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
					patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
					
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
					
					patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
					patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
					patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
					
					patientInvoiceDetailRepository.save(patientInvoiceDetail);
				}
			}else if(a.isPresent() == true) {
				
				patientBill.setAmount(radio.getRadiologyType().getPrice());
				patientBill.setPaid(radio.getRadiologyType().getPrice());
				patientBill.setBalance(0);
				patientBill.setStatus("VERIFIED");
				patientBill = patientBillRepository.save(patientBill);
				
				Optional<PatientInvoice> inv = patientInvoiceRepository.findByPatientAndInsurancePlanAndStatus(patient, null,"PENDING");
				if(!inv.isPresent()) {
					/**
					 * If no pending patientInvoice
					 */
					PatientInvoice patientInvoice = new PatientInvoice();
					patientInvoice.setNo("NA");
					patientInvoice.setPatient(patient);
					patientInvoice.setInsurancePlan(null);
					patientInvoice.setStatus("PENDING");
					
					patientInvoice.setCreatedby(userService.getUser(request).getId());
					patientInvoice.setCreatedOn(dayService.getDay().getId());
					patientInvoice.setCreatedAt(dayService.getTimeStamp());
					
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
					
					patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
					patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
					patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
					
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
					
					patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
					patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
					patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
					
					patientInvoiceDetailRepository.save(patientInvoiceDetail);
				}
			}
		}
		radio.setPatient(patient);
		radio.setPatientBill(patientBill);
		return radiologyRepository.save(radio);		
	}
	
	
	@Override
	public Procedure saveProcedure(Procedure procedure, Optional<Consultation> c, Optional<NonConsultation> nc, Optional<Admission> a, HttpServletRequest request) {
		Patient patient = new Patient();
		Optional<ProcedureType> pr = procedureTypeRepository.findById(procedure.getProcedureType().getId());
		if(procedure.getType().equals("THEATRE")) {
			Optional<Theatre> th = theatreRepository.findByName(procedure.getTheatre().getName());
			if(th.isEmpty()) {
				throw new InvalidOperationException("Theatre not found");
			}
			
			procedure.setTheatre(th.get());
		}else {
			procedure.setTheatre(null);
		}
		if(procedure.getDiagnosisType().getId() != null) {
			Optional<DiagnosisType> dt = diagnosisTypeRepository.findById(procedure.getDiagnosisType().getId());
			if(dt.isEmpty()) {
				throw new NotFoundException("Diagnosis Type not found");
			}else {
				procedure.setDiagnosisType(dt.get());
			}
		}else {
			procedure.setDiagnosisType(null);
		}
		
		if(!pr.isPresent()) {
			throw new NotFoundException("Procedure type not found");
		}
		if(c.isPresent() && nc.isPresent() && a.isPresent()) {
			throw new InvalidOperationException("Could not save, procedure should not have more than two properties");
		}		
		if(c.isPresent() && nc.isPresent() && !a.isPresent()) {
			throw new InvalidOperationException("Could not save, procedure should not have more than two properties");
		}
		if(c.isPresent() && !nc.isPresent() && a.isPresent()) {
			throw new InvalidOperationException("Could not save, procedure should not have more than two properties");
		}
		if(!c.isPresent() && nc.isPresent() && a.isPresent()) {
			throw new InvalidOperationException("Could not save, procedure should not have more than two properties");
		}
		if(!c.isPresent() && !nc.isPresent() && !a.isPresent()) {
			throw new InvalidOperationException("Could not save, procedure should have one property");
		}
		if(c.isPresent()) {
			patient = c.get().getPatient();
			procedure.setConsultation(c.get());
			procedure.setClinician(c.get().getClinician());
		}
		
		if(nc.isPresent()) {
			NonConsultation non;// = new NonConsultation();
			if(nc.get().getStatus().equals("PENDING")) {
				nc.get().setStatus("IN-PROCESS");
				non =	nonConsultationRepository.save(nc.get());
			}else if(nc.get().getStatus().equals("IN-PROCESS")) {
				non = nc.get();
			}else {
				throw new InvalidOperationException("Could not be done. Patient already signed off");
			}
			patient = non.getPatient();
			procedure.setNonConsultation(non);
		}
		
		if(a.isPresent()) {
			Admission adm;// = new NonConsultation();
			if(a.get().getStatus().equals("PENDING")) {
				throw new InvalidOperationException("Could not be done. Admission not verified");
			}else if(a.get().getStatus().equals("IN-PROCESS")) {
				adm = a.get();
			}else {
				throw new InvalidOperationException("Could not be done. Patient already signed off");
			}
			Optional<Clinician> clin = clinicianRepository.findByUser(userService.getUser(request));
			if(clin.isPresent()) {
				procedure.setClinician(clin.get());
			}
			patient = adm.getPatient();
			procedure.setAdmission(adm);
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
		patientBill.setCreatedby(userService.getUser(request).getId());
		patientBill.setCreatedOn(dayService.getDay().getId());
		patientBill.setCreatedAt(dayService.getTimeStamp());
		patientBill.setPatient(patient);
		patientBill = patientBillRepository.save(patientBill);
		
		if(patient.getPaymentType().equals("INSURANCE") || a.isPresent() == true) {
			
			Optional<ProcedureTypeInsurancePlan> procedureTypePricePlan = procedureTypeInsurancePlanRepository.findByProcedureTypeAndInsurancePlanAndCovered(pr.get(), patient.getInsurancePlan(), true);
			
			if(procedureTypePricePlan.isPresent()) {
				patientBill.setAmount(procedureTypePricePlan.get().getPrice());
				patientBill.setPaid(procedureTypePricePlan.get().getPrice());
				patientBill.setBalance(0);
				patientBill.setStatus("COVERED");
				patientBill.setInsurancePlan(procedureTypePricePlan.get().getInsurancePlan());
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
					
					patientInvoice.setCreatedby(userService.getUser(request).getId());
					patientInvoice.setCreatedOn(dayService.getDay().getId());
					patientInvoice.setCreatedAt(dayService.getTimeStamp());
					
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
					
					patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
					patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
					patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
					
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
					
					patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
					patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
					patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
					
					patientInvoiceDetailRepository.save(patientInvoiceDetail);
				}
			}else if(a.isPresent() == true) {
				
				patientBill.setAmount(procedure.getProcedureType().getPrice());
				patientBill.setPaid(procedure.getProcedureType().getPrice());
				patientBill.setBalance(0);
				patientBill.setStatus("VERIFIED");
				patientBill = patientBillRepository.save(patientBill);
				
				Optional<PatientInvoice> inv = patientInvoiceRepository.findByPatientAndInsurancePlanAndStatus(patient, null,"PENDING");
				if(!inv.isPresent()) {
					/**
					 * If no pending patientInvoice
					 */
					PatientInvoice patientInvoice = new PatientInvoice();
					patientInvoice.setNo("NA");
					patientInvoice.setPatient(patient);
					patientInvoice.setInsurancePlan(null);
					patientInvoice.setStatus("PENDING");
					
					patientInvoice.setCreatedby(userService.getUser(request).getId());
					patientInvoice.setCreatedOn(dayService.getDay().getId());
					patientInvoice.setCreatedAt(dayService.getTimeStamp());
					
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
					
					patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
					patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
					patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
					
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
					
					patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
					patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
					patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
					
					patientInvoiceDetailRepository.save(patientInvoiceDetail);
				}
			}
		}
		procedure.setPatient(patient);
		procedure.setPatientBill(patientBill);
		return procedureRepository.save(procedure);		
	}
	
	
	
	@Override
	public Prescription savePrescription(Prescription prescription, Optional<Consultation> c, Optional<NonConsultation> nc, Optional<Admission> a, HttpServletRequest request) {
		Patient patient = new Patient();
		Optional<Medicine> md = medicineRepository.findByName(prescription.getMedicine().getName());
		 
		if(!md.isPresent()) {
			throw new NotFoundException("Medicine not found");
		}
		if(c.isPresent() && nc.isPresent() && a.isPresent()) {
			throw new InvalidOperationException("Could not save, prescription should not have more than two properties");
		}		
		if(c.isPresent() && nc.isPresent() && !a.isPresent()) {
			throw new InvalidOperationException("Could not save, prescription should not have more than two properties");
		}
		if(c.isPresent() && !nc.isPresent() && a.isPresent()) {
			throw new InvalidOperationException("Could not save, prescription should not have more than two properties");
		}
		if(!c.isPresent() && nc.isPresent() && a.isPresent()) {
			throw new InvalidOperationException("Could not save, prescription should not have more than two properties");
		}
		if(!c.isPresent() && !nc.isPresent() && !a.isPresent()) {
			throw new InvalidOperationException("Could not save, prescription should have one property");
		}
		if(c.isPresent()) {
			patient = c.get().getPatient();
			prescription.setConsultation(c.get());
			prescription.setClinician(c.get().getClinician());
		}
		if(nc.isPresent()) {
			patient = nc.get().getPatient();
			prescription.setNonConsultation(nc.get());
		}
		
		if(a.isPresent()) {
			Admission adm;// = new NonConsultation();
			if(a.get().getStatus().equals("PENDING")) {
				throw new InvalidOperationException("Could not be done. Admission not verified");
			}else if(a.get().getStatus().equals("IN-PROCESS")) {
				adm = a.get();
			}else {
				throw new InvalidOperationException("Could not be done. Patient already signed off");
			}
			Optional<Clinician> clin = clinicianRepository.findByUser(userService.getUser(request));
			if(clin.isPresent()) {
				prescription.setClinician(clin.get());
			}
			patient = adm.getPatient();
			prescription.setAdmission(adm);
		}
		
		prescription.setMedicine(md.get());
		prescription.setStatus("NOT-GIVEN");
		PatientBill patientBill = new PatientBill();
		patientBill.setAmount(prescription.getMedicine().getPrice() * prescription.getQty());
		patientBill.setPaid(0);
		patientBill.setBalance(prescription.getMedicine().getPrice() * prescription.getQty());
		patientBill.setQty(prescription.getQty());
		patientBill.setDescription("Medicine: "+prescription.getMedicine().getName());
		patientBill.setStatus("UNPAID");		
		patientBill.setCreatedby(userService.getUser(request).getId());
		patientBill.setCreatedOn(dayService.getDay().getId());
		patientBill.setCreatedAt(dayService.getTimeStamp());
		patientBill.setPatient(patient);
		patientBill = patientBillRepository.save(patientBill);
		
		if(patient.getPaymentType().equals("INSURANCE") || a.isPresent() == true) {
			
			Optional<MedicineInsurancePlan> medicinePricePlan = medicineInsurancePlanRepository.findByMedicineAndInsurancePlanAndCovered(md.get(), patient.getInsurancePlan(), true);
			
			if(medicinePricePlan.isPresent()) {
				patientBill.setAmount(medicinePricePlan.get().getPrice() * prescription.getQty());
				patientBill.setPaid(medicinePricePlan.get().getPrice() * prescription.getQty());
				patientBill.setBalance(0);
				patientBill.setStatus("COVERED");
				patientBill.setInsurancePlan(medicinePricePlan.get().getInsurancePlan());
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
					
					patientInvoice.setCreatedby(userService.getUser(request).getId());
					patientInvoice.setCreatedOn(dayService.getDay().getId());
					patientInvoice.setCreatedAt(dayService.getTimeStamp());
					
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
					patientInvoiceDetail.setQty(prescription.getQty());
					
					patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
					patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
					patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
					
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
					patientInvoiceDetail.setQty(prescription.getQty());
					
					patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
					patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
					patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
					
					patientInvoiceDetailRepository.save(patientInvoiceDetail);
				}
			}else if(a.isPresent() == true) {
				
				patientBill.setAmount(prescription.getMedicine().getPrice());
				patientBill.setPaid(prescription.getMedicine().getPrice());
				patientBill.setBalance(0);
				patientBill.setStatus("VERIFIED");
				patientBill = patientBillRepository.save(patientBill);
				
				Optional<PatientInvoice> inv = patientInvoiceRepository.findByPatientAndInsurancePlanAndStatus(patient, null,"PENDING");
				if(!inv.isPresent()) {
					/**
					 * If no pending patientInvoice
					 */
					PatientInvoice patientInvoice = new PatientInvoice();
					patientInvoice.setNo("NA");
					patientInvoice.setPatient(patient);
					patientInvoice.setInsurancePlan(null);
					patientInvoice.setStatus("PENDING");
					
					patientInvoice.setCreatedby(userService.getUser(request).getId());
					patientInvoice.setCreatedOn(dayService.getDay().getId());
					patientInvoice.setCreatedAt(dayService.getTimeStamp());
					
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
					
					patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
					patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
					patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
					
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
					
					patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
					patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
					patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
					
					patientInvoiceDetailRepository.save(patientInvoiceDetail);
				}
			}
		}
		prescription.setIssued(0);
		prescription.setBalance(prescription.getQty());
		prescription.setPatient(patient);
		prescription.setPatientBill(patientBill);
		return prescriptionRepository.save(prescription);		
	}

	@Override
	public Admission doAdmission(Patient p, WardBed wb, HttpServletRequest request) {
		
		if(!wb.isActive()) {
			throw new InvalidOperationException("Could not process admission, bed not active");
		}
		
		if(!wb.getStatus().equals("EMPTY")){
			throw new InvalidOperationException("Could not process admission, bed already occupied. Please select a different bed.");
		}
		wb.setStatus("WAITING");
		wb = wardBedRepository.save(wb);
		
		Admission admission = new Admission();
		admission.setPatient(p);
		admission.setPaymentType(p.getPaymentType());
		admission.setInsurancePlan(p.getInsurancePlan());
		admission.setMembershipNo(p.getMembershipNo());
		admission.setWardBed(wb);
		admission.setStatus("PENDING");
				
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
			
			visit.setCreatedby(userService.getUser(request).getId());
			visit.setCreatedOn(dayService.getDay().getId());
			visit.setCreatedAt(dayService.getTimeStamp());
			
			visitRepository.save(visit);
		}else {
			visit = v.get();
		}
		admission.setVisit(visit);
		
		admission.setCreatedBy(userService.getUser(request).getId());
		admission.setCreatedOn(dayService.getDay().getId());
		admission.setCreatedAt(dayService.getTimeStamp());
		
		admission.setAdmittedBy(userService.getUser(request).getId());
		admission.setAdmittedOn(dayService.getDay().getId());
		admission.setAdmittedAt(dayService.getTimeStamp());
		
		admission = admissionRepository.save(admission);
		
		/**
		 * Create ward bed bill
		 */
		PatientBill wardBedBill = new PatientBill();
		wardBedBill.setAmount(wb.getWard().getWardType().getPrice());
		wardBedBill.setPaid(0);
		wardBedBill.setBalance(wb.getWard().getWardType().getPrice());
		wardBedBill.setQty(1);
		wardBedBill.setDescription("Ward Bed / Room");
		wardBedBill.setStatus("UNPAID");
		/**
		 * Add forensic data to registration patientBill
		 */
		wardBedBill.setCreatedby(userService.getUser(request).getId());
		wardBedBill.setCreatedOn(dayService.getDay().getId());
		wardBedBill.setCreatedAt(dayService.getTimeStamp());
		/**
		 * Assign patient to consultation patientBill
		 */
		wardBedBill.setPatient(p);
		/**
		 * Save Registration patientBill
		 */
		wardBedBill = patientBillRepository.save(wardBedBill);
		
		AdmissionBed admissionBed = new AdmissionBed();
		admissionBed.setAdmission(admission);
		admissionBed.setPatient(p);
		admissionBed.setWardBed(wb);
		admissionBed.setPatientBill(wardBedBill);
		admissionBed.setStatus("OPENED");
		admissionBed.setOpenedAt(LocalDateTime.now());
		admissionBed = admissionBedRepository.save(admissionBed);
		
		p.setType("INPATIENT");
		p = patientRepository.save(p);
		
		if(p.getPaymentType().equals("INSURANCE")) {
						
			WardTypeInsurancePlan eligiblePlan = null;
			
			List<WardTypeInsurancePlan> wardTypePricePlans = wardTypeInsurancePlanRepository.findByInsurancePlanAndCovered(p.getInsurancePlan(), true);
			double eligiblePrice = 0;
			for(WardTypeInsurancePlan plan : wardTypePricePlans) {
				if(plan.getPrice() > eligiblePrice || plan.getInsurancePlan().getId() == p.getInsurancePlan().getId()) {
					eligiblePrice = plan.getPrice();
					eligiblePlan = plan;
					if(plan.getInsurancePlan().getId() == p.getInsurancePlan().getId()) {
						break;
					}
				}
			}	
			
			if(eligiblePlan != null) {
				wardBedBill.setAmount(eligiblePlan.getPrice());
				wardBedBill.setPaid(eligiblePlan.getPrice());
				wardBedBill.setBalance(0);
				wardBedBill.setStatus("COVERED");				
				wardBedBill = patientBillRepository.save(wardBedBill);
				
				Optional<PatientInvoice> inv = patientInvoiceRepository.findByPatientAndInsurancePlanAndStatus(p, p.getInsurancePlan(),"PENDING");
				if(!inv.isPresent()) {
					/**
					 * If no pending patientInvoice
					 */
					PatientInvoice patientInvoice = new PatientInvoice();
					patientInvoice.setNo("NA");
					patientInvoice.setPatient(p);
					patientInvoice.setAdmission(admission);
					patientInvoice.setInsurancePlan(p.getInsurancePlan());
					patientInvoice.setStatus("PENDING");
					
					patientInvoice.setCreatedby(userService.getUser(request).getId());
					patientInvoice.setCreatedOn(dayService.getDay().getId());
					patientInvoice.setCreatedAt(dayService.getTimeStamp());
					
					patientInvoice = patientInvoiceRepository.save(patientInvoice);
					patientInvoice.setNo(patientInvoice.getId().toString());
					patientInvoice = patientInvoiceRepository.save(patientInvoice);
					/**
					 * Add lab test patientBill claim to patientInvoice
					 */
					PatientInvoiceDetail patientInvoiceDetail = new PatientInvoiceDetail();
					patientInvoiceDetail.setPatientInvoice(patientInvoice);
					patientInvoiceDetail.setPatientBill(wardBedBill);
					patientInvoiceDetail.setAmount(wardBedBill.getAmount());
					patientInvoiceDetail.setDescription("Ward Bed / Room");
					patientInvoiceDetail.setQty(1);
					
					patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
					patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
					patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
					
					patientInvoiceDetailRepository.save(patientInvoiceDetail);
				}else {
					/**
					 * If there is a .pending patientInvoice
					 */
					PatientInvoiceDetail patientInvoiceDetail = new PatientInvoiceDetail();
					patientInvoiceDetail.setPatientInvoice(inv.get());
					patientInvoiceDetail.setPatientBill(wardBedBill);
					patientInvoiceDetail.setAmount(wardBedBill.getAmount());
					patientInvoiceDetail.setDescription("Ward Bed / Room");
					patientInvoiceDetail.setQty(1);
					
					patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
					patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
					patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
					
					patientInvoiceDetailRepository.save(patientInvoiceDetail);
				}
				
				
				
				
				if(eligiblePlan.getInsurancePlan().getId() != p.getInsurancePlan().getId() && (wb.getWard().getWardType().getPrice() - eligiblePlan.getPrice() > 0)) {
					PatientBill supplementaryWardBedBill = new PatientBill();
										
					supplementaryWardBedBill.setAmount(wb.getWard().getWardType().getPrice() - eligiblePlan.getPrice());
					supplementaryWardBedBill.setPaid(0);
					supplementaryWardBedBill.setBalance(wb.getWard().getWardType().getPrice() - eligiblePlan.getPrice());
					supplementaryWardBedBill.setStatus("UNPAID");
					supplementaryWardBedBill.setPrincipalPatientBill(wardBedBill);
					
					supplementaryWardBedBill = patientBillRepository.save(wardBedBill);					
					wardBedBill.setSupplementaryPatientBill(supplementaryWardBedBill);
					wardBedBill = patientBillRepository.save(wardBedBill);
					
					Optional<PatientInvoice> supInv = patientInvoiceRepository.findByPatientAndInsurancePlanAndStatus(p, null,"PENDING");
					if(!supInv.isPresent()) {
						/**
						 * If no pending patientInvoice
						 */
						PatientInvoice patientInvoice = new PatientInvoice();
						patientInvoice.setNo("NA");
						patientInvoice.setPatient(p);
						patientInvoice.setAdmission(admission);
						patientInvoice.setInsurancePlan(null);
						patientInvoice.setStatus("PENDING");
						
						patientInvoice.setCreatedby(userService.getUser(request).getId());
						patientInvoice.setCreatedOn(dayService.getDay().getId());
						patientInvoice.setCreatedAt(dayService.getTimeStamp());
						
						patientInvoice = patientInvoiceRepository.save(patientInvoice);
						patientInvoice.setNo(patientInvoice.getId().toString());
						patientInvoice = patientInvoiceRepository.save(patientInvoice);
						/**
						 * Add lab test patientBill claim to patientInvoice
						 */
						PatientInvoiceDetail patientInvoiceDetail = new PatientInvoiceDetail();
						patientInvoiceDetail.setPatientInvoice(patientInvoice);
						patientInvoiceDetail.setPatientBill(supplementaryWardBedBill);
						patientInvoiceDetail.setAmount(supplementaryWardBedBill.getAmount());
						patientInvoiceDetail.setDescription("Ward Bed / Room");
						patientInvoiceDetail.setQty(1);
						
						patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
						patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
						patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
						
						patientInvoiceDetailRepository.save(patientInvoiceDetail);
					}else {
						/**
						 * If there is a .pending patientInvoice
						 */
						PatientInvoiceDetail patientInvoiceDetail = new PatientInvoiceDetail();
						patientInvoiceDetail.setPatientInvoice(supInv.get());
						patientInvoiceDetail.setPatientBill(supplementaryWardBedBill);
						patientInvoiceDetail.setAmount(supplementaryWardBedBill.getAmount());
						patientInvoiceDetail.setDescription("Ward Bed / Room");
						patientInvoiceDetail.setQty(1);
						
						patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
						patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
						patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
						
						patientInvoiceDetailRepository.save(patientInvoiceDetail);
					}					
				}else {
					List<String> sts = new ArrayList<>();
					sts.add("PENDING");
					sts.add("IN-PROCESS");
					List<Consultation> cons = consultationRepository.findAllByPatientAndStatusIn(p, sts);
					for(Consultation con : cons) {
						con.setStatus("SIGNED-OUT");
						consultationRepository.save(con);
					}
					admission.setStatus("IN-PROCESS");
					admission = admissionRepository.save(admission);
					wb.setStatus("OCCUPIED");
					wardBedRepository.save(wb);
				}
			}else {
				//throw new InvalidOperationException("")
			}
		}else {
			Optional<PatientInvoice> inv = patientInvoiceRepository.findByPatientAndInsurancePlanAndStatus(p, null,"PENDING");
			if(!inv.isPresent()) {
				/**
				 * If no pending patientInvoice
				 */
				PatientInvoice patientInvoice = new PatientInvoice();
				patientInvoice.setNo("NA");
				patientInvoice.setPatient(p);
				patientInvoice.setAdmission(admission);
				patientInvoice.setInsurancePlan(null);
				patientInvoice.setStatus("PENDING");
				
				patientInvoice.setCreatedby(userService.getUser(request).getId());
				patientInvoice.setCreatedOn(dayService.getDay().getId());
				patientInvoice.setCreatedAt(dayService.getTimeStamp());
				
				patientInvoice = patientInvoiceRepository.save(patientInvoice);
				patientInvoice.setNo(patientInvoice.getId().toString());
				patientInvoice = patientInvoiceRepository.save(patientInvoice);
				/**
				 * Add lab test patientBill claim to patientInvoice
				 */
				PatientInvoiceDetail patientInvoiceDetail = new PatientInvoiceDetail();
				patientInvoiceDetail.setPatientInvoice(patientInvoice);
				patientInvoiceDetail.setPatientBill(wardBedBill);
				patientInvoiceDetail.setAmount(wardBedBill.getAmount());
				patientInvoiceDetail.setDescription("Ward Bed / Room");
				patientInvoiceDetail.setQty(1);
				
				patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
				patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
				patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
				
				patientInvoiceDetailRepository.save(patientInvoiceDetail);
			}else {
				/**
				 * If there is a .pending patientInvoice
				 */
				PatientInvoiceDetail patientInvoiceDetail = new PatientInvoiceDetail();
				patientInvoiceDetail.setPatientInvoice(inv.get());
				patientInvoiceDetail.setPatientBill(wardBedBill);
				patientInvoiceDetail.setAmount(wardBedBill.getAmount());
				patientInvoiceDetail.setDescription("Ward Bed / Room");
				patientInvoiceDetail.setQty(1);
				
				patientInvoiceDetail.setCreatedby(userService.getUser(request).getId());
				patientInvoiceDetail.setCreatedOn(dayService.getDay().getId());
				patientInvoiceDetail.setCreatedAt(dayService.getTimeStamp());
				
				patientInvoiceDetailRepository.save(patientInvoiceDetail);
			}
		}
		return admission;
	}
}
