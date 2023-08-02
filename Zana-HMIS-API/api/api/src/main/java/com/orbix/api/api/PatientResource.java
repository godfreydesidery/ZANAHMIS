/**
 * 
 */
package com.orbix.api.api;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
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

import com.orbix.api.domain.PatientBill;
import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.ClinicalNote;
import com.orbix.api.domain.Clinician;
import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.DiagnosisType;
import com.orbix.api.domain.FinalDiagnosis;
import com.orbix.api.domain.GeneralExamination;
import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.PatientInvoice;
import com.orbix.api.domain.PatientInvoiceDetail;
import com.orbix.api.domain.PatientPaymentDetail;
import com.orbix.api.domain.LabTest;
import com.orbix.api.domain.LabTestType;
import com.orbix.api.domain.Medicine;
import com.orbix.api.domain.NonConsultation;
import com.orbix.api.domain.Patient;
import com.orbix.api.domain.PatientCreditNote;
import com.orbix.api.domain.Prescription;
import com.orbix.api.domain.Procedure;
import com.orbix.api.domain.ProcedureType;
import com.orbix.api.domain.Radiology;
import com.orbix.api.domain.RadiologyType;
import com.orbix.api.domain.User;
import com.orbix.api.domain.Visit;
import com.orbix.api.domain.WorkingDiagnosis;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.exceptions.MissingInformationException;
import com.orbix.api.exceptions.NotFoundException;
import com.orbix.api.models.ConsultationModel;
import com.orbix.api.models.FinalDiagnosisModel;
import com.orbix.api.models.LabTestModel;
import com.orbix.api.models.ProcedureModel;
import com.orbix.api.models.RadiologyModel;
import com.orbix.api.models.WorkingDiagnosisModel;
import com.orbix.api.repositories.ClinicRepository;
import com.orbix.api.repositories.ClinicalNoteRepository;
import com.orbix.api.repositories.ClinicianRepository;
import com.orbix.api.repositories.ConsultationRepository;
import com.orbix.api.repositories.DayRepository;
import com.orbix.api.repositories.DiagnosisTypeRepository;
import com.orbix.api.repositories.FinalDiagnosisRepository;
import com.orbix.api.repositories.GeneralExaminationRepository;
import com.orbix.api.repositories.InsurancePlanRepository;
import com.orbix.api.repositories.LabTestRepository;
import com.orbix.api.repositories.LabTestTypeRepository;
import com.orbix.api.repositories.MedicineRepository;
import com.orbix.api.repositories.NonConsultationRepository;
import com.orbix.api.repositories.PatientBillRepository;
import com.orbix.api.repositories.PatientCreditNoteRepository;
import com.orbix.api.repositories.PatientInvoiceDetailRepository;
import com.orbix.api.repositories.PatientInvoiceRepository;
import com.orbix.api.repositories.PatientPaymentDetailRepository;
import com.orbix.api.repositories.PatientPaymentRepository;
import com.orbix.api.repositories.PatientRepository;
import com.orbix.api.repositories.PrescriptionRepository;
import com.orbix.api.repositories.ProcedureRepository;
import com.orbix.api.repositories.ProcedureTypeRepository;
import com.orbix.api.repositories.RadiologyRepository;
import com.orbix.api.repositories.RadiologyTypeRepository;
import com.orbix.api.repositories.VisitRepository;
import com.orbix.api.repositories.WorkingDiagnosisRepository;
import com.orbix.api.service.CompanyProfileService;
import com.orbix.api.service.DayService;
import com.orbix.api.service.PatientService;
import com.orbix.api.service.UserService;

import lombok.Data;
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
	private final NonConsultationRepository nonConsultationRepository;
	private final PatientBillRepository patientBillRepository;
	private final PatientPaymentRepository patientPaymentRepository;
	private final PatientPaymentDetailRepository patientPaymentDetailRepository;
	private final PatientCreditNoteRepository patientCreditNoteRepository;
	private final PatientInvoiceDetailRepository patientInvoiceDetailRepository;
	private final PatientInvoiceRepository patientInvoiceRepository;
	private final VisitRepository visitRepository;
	private final DayRepository dayRepository;
	private final ClinicalNoteRepository clinicalNoteRepository;
	private final GeneralExaminationRepository generalExaminationRepository;
	private final DiagnosisTypeRepository diagnosisTypeRepository;
	private final WorkingDiagnosisRepository workingDiagnosisRepository;
	private final FinalDiagnosisRepository finalDiagnosisRepository;
	private final LabTestRepository labTestRepository;
	private final RadiologyRepository radiologyRepository;
	private final ProcedureRepository procedureRepository;
	private final PrescriptionRepository prescriptionRepository;
	private final UserService userService;
	private final DayService dayService;
	private final LabTestTypeRepository labTestTypeRepository;
	private final RadiologyTypeRepository radiologyTypeRepository;
	private final ProcedureTypeRepository procedureTypeRepository;
	private final MedicineRepository medicineRepository;
	
	
	@GetMapping("/patients")
	public ResponseEntity<List<Patient>>getMaterials(
			HttpServletRequest request){
		return ResponseEntity.ok().body(patientService.getAll());
	}
	
	@GetMapping("/patients/get_by_search_key")
	public ResponseEntity<Patient> getProductBySearchKey(
			@RequestParam(name = "search_key") String searchKey,
			HttpServletRequest request){
		return ResponseEntity.ok().body(patientService.findBySearchKey(searchKey));
	}
	
	@GetMapping("/patients/get")
	public ResponseEntity<Patient> get(
			@RequestParam(name = "id") Long id,
			HttpServletRequest request){
		return ResponseEntity.ok().body(patientRepository.findById(id).get());
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
			
		}else {
			patient.setInsurancePlan(null);
		}
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/update").toUriString());
		return ResponseEntity.created(uri).body(patientService.update(patient, request));
	}
	
	@PostMapping("/patients/change_type")
	//@PreAuthorize("hasAnyAuthority('PRODUCT-CREATE')")
	public ResponseEntity<Patient>changeType(
			@RequestBody Patient patient,
			@RequestParam(name = "type") String type,
			HttpServletRequest request){
		Optional<Patient> p = patientRepository.findById(patient.getId());
		if(!p.isPresent()) {
			throw new NotFoundException("Could not process, patient not available");
		}
		if(!(type.equals("OUTPATIENT") || type.equals("OUTSIDER"))){
			throw new InvalidOperationException("Invalid patient types. Only OUTPATIENT and OUTSIDER types are allowed");
		}
		/**
		 * From OUTPATIENT to OUTSIDER
		 */
		if(type.equals("OUTSIDER")) {
			if(p.get().getType().equals("OUTSIDER")) {
				throw new InvalidOperationException("Can not transform to the same type");
			}
			List<String> statuses = new ArrayList<>();
			statuses.add("PENDING");
			statuses.add("IN-PROCESS");
			statuses.add("TRANSFERED");
			List<Consultation> cs = consultationRepository.findAllByPatientAndStatusIn(p.get(), statuses);
			if(!cs.isEmpty()) {
				throw new InvalidOperationException("Can not change patient type, the patient has an active consultation.");
			}else {
				p.get().setType("OUTSIDER");
				patient = patientRepository.save(p.get());
			}
		}else if(type.equals("OUTPATIENT")) {
			if(p.get().getType().equals("OUTPATIENT")) {
				throw new InvalidOperationException("Can not transform to the same type");
			}
			List<String> statuses = new ArrayList<>();
			statuses.add("IN-PROCESS");
			List<NonConsultation> ncs = nonConsultationRepository.findAllByPatientAndStatusIn(p.get(), statuses);
			if(!ncs.isEmpty()) {
				throw new InvalidOperationException("Can not change patient type, the has pending services. Please consider removing the services or clearing with the patient.");
			}else {
				p.get().setType("OUTPATIENT");
				patient = patientRepository.save(p.get());
			}
		}				
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/change_type").toUriString());
		return ResponseEntity.created(uri).body(patient);
	}
	
	@PostMapping("/patients/do_consultation")
	//@PreAuthorize("hasAnyAuthority('PRODUCT-CREATE')")
	public ResponseEntity<Patient>consultation(

			@RequestParam Long patient_id, @RequestParam String clinic_name, @RequestParam String clinician_name, 
			HttpServletRequest request){
		Optional<Patient> p = patientRepository.findById(patient_id);
		Optional<Clinic> c = clinicRepository.findByName(clinic_name);
		Optional<Clinician> cn = clinicianRepository.findByNickname(clinician_name);
		
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/do_consultation").toUriString());
		return ResponseEntity.created(uri).body(patientService.doConsultation(p.get(), c.get(), cn.get(), request));
	}
	
	@PostMapping("/patients/cancel_consultation")
	//@PreAuthorize("hasAnyAuthority('PRODUCT-CREATE')")
	public ResponseEntity<Boolean>cancelConsultation(
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
		 * Now find the patientBill associated with the consultation
		 */
		PatientBill patientBill = patientBillRepository.findById(consultation.getPatientBill().getId()).get();
		/**
		 * Now cancel the patientBill
		 */
		patientBill.setStatus("CANCELED");
		patientBill = patientBillRepository.save(patientBill);
		/**
		 * Find payment associated with the patientBill, if there is
		 */
		Optional<PatientPaymentDetail> pd = patientPaymentDetailRepository.findByPatientBill(patientBill);
		/**
		 * If there is a payment associated with this patientBill, refund it, and create a credit note for it
		 */
		if(pd.isPresent()) {
			PatientPaymentDetail ppd = pd.get();
			ppd.setStatus("REFUNDED");
			ppd = patientPaymentDetailRepository.save(ppd);
			/**
			 * Create credit note
			 */
			PatientCreditNote patientCreditNote = new PatientCreditNote();
			patientCreditNote.setAmount(ppd.getPatientBill().getAmount());
			patientCreditNote.setPatient(consultation.getPatient());
			patientCreditNote.setReference("Cancel consultation");
			patientCreditNote.setStatus("PENDING");
			patientCreditNote.setNo("NA");
			
			patientCreditNote.setCreatedby(userService.getUserId(request));
			patientCreditNote.setCreatedOn(dayService.getDayId());
			patientCreditNote.setCreatedAt(dayService.getTimeStamp());
			
			patientCreditNote = patientCreditNoteRepository.save(patientCreditNote);
			patientCreditNote.setNo(patientCreditNote.getId().toString());
			patientCreditNote = patientCreditNoteRepository.save(patientCreditNote);
		}
		/**
		 * Find patientInvoice detail associated with this patientBill
		 */
		Optional<PatientInvoiceDetail> i = patientInvoiceDetailRepository.findByPatientBill(patientBill);
		/**
		 * If there is a patientInvoice detail associated with this patientBill, delete it
		 */
		if(i.isPresent()) {			
			patientInvoiceDetailRepository.delete(i.get());
			PatientInvoice patientInvoice = i.get().getPatientInvoice();
			int j = 0;
			for(PatientInvoiceDetail d : patientInvoice.getPatientInvoiceDetails()) {
				j = j++;
			}
			if(j == 0) {
				patientInvoiceRepository.delete(patientInvoice);
			}			
		}
		
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/cancel_consultation").toUriString());
		return ResponseEntity.created(uri).body(true);
	}
	
	@GetMapping("/patients/get_active_consultations")
	//@PreAuthorize("hasAnyAuthority('PRODUCT-CREATE')")
	public ResponseEntity<List<Consultation>>getActiveConsultations(
			@RequestParam Long patient_id,
			HttpServletRequest request){
			
		Optional<Patient> p = patientRepository.findById(patient_id);
		List<String> statuses = new ArrayList<>();
		statuses.add("PENDING");
		statuses.add("IN-PROCESS");
		List<Consultation> consultations = consultationRepository.findAllByPatientAndStatusIn(p.get(), statuses);
		
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/get_active_consultation").toUriString());
		return ResponseEntity.created(uri).body(consultations);
	}
	
	@GetMapping("/patients/last_visit_date_time")
	//@PreAuthorize("hasAnyAuthority('PRODUCT-CREATE')")
	public ResponseEntity<LocalDateTime>getLastVisitDateTime(
			@RequestParam Long patient_id,
			HttpServletRequest request){
			
		Optional<Patient> p = patientRepository.findById(patient_id);
		
		LocalDateTime lastVistitDateTime = visitRepository.findLastByPatient(p.get()).get().getCreatedAt();
		
		
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/last_visit_date_time").toUriString());
		return ResponseEntity.created(uri).body(lastVistitDateTime);
	}
	
	@GetMapping("/patients/load_pending_consultations_by_clinician_id")    // to do later
	public ResponseEntity<List<Consultation>> loadPendingConsultationsByClinician(
			@RequestParam(name = "clinician_id") Long clinicianId,
			HttpServletRequest request){
		Optional<Clinician> c = clinicianRepository.findById(clinicianId);
		
		List<String> statuses = new ArrayList<>();
		statuses.add("PENDING");
		List<Consultation> cons = consultationRepository.findAllByClinicianAndStatusIn(c.get(), statuses);
		/**
		 * Should load paid or insurance covered consultations only
		 */
		List<Consultation> consultationsToShow = new ArrayList<>();
		for(Consultation cn : cons) {
			if(cn.getPatientBill().getStatus().equals("PAID") || cn.getPatientBill().getStatus().equals("COVERED")) {
				consultationsToShow.add(cn);
			}
		}		
		return ResponseEntity.ok().body(consultationsToShow);
	}
	
	@GetMapping("/patients/load_in_process_consultations_by_clinician_id")    // to do later
	public ResponseEntity<List<Consultation>> loadInProcessConsultationsByClinician(
			@RequestParam(name = "clinician_id") Long clinicianId,
			HttpServletRequest request){
		Optional<Clinician> c = clinicianRepository.findById(clinicianId);
		if(!c.isPresent()) {
			throw new NotFoundException("Clinician not found");
		}
		
		List<String> statuses = new ArrayList<>();
		statuses.add("IN-PROCESS");
		List<Consultation> cons = consultationRepository.findAllByClinicianAndStatusIn(c.get(), statuses);
		
		return ResponseEntity.ok().body(cons);
	}
	
	@GetMapping("/patients/open_consultation")    // to do later
	public ResponseEntity<Boolean> openConsultation(
			@RequestParam(name = "consultation_id") Long consultationId,
			HttpServletRequest request){
		Optional<Consultation> c = consultationRepository.findById(consultationId);
		if(c.get().getStatus().equals("PENDING")) {
			if(c.get().getPatientBill().getStatus().equals("PAID") || c.get().getPatientBill().getStatus().equals("COVERED")) {
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
			@RequestParam(name = "id") Long id,
			HttpServletRequest request){
		Optional<Consultation> c = consultationRepository.findById(id);
		if(c.isPresent()) {
			URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/load_consultation").toUriString());
			return ResponseEntity.created(uri).body(c.get());
		}else {
			throw new NotFoundException("Consultation not found");
		}
	}
	
	@GetMapping("/patients/load_clinical_note_by_consultation_id")
	public ResponseEntity<ClinicalNote> loadClinicalNoteByConsultationId(
			@RequestParam(name = "id") Long id,
			HttpServletRequest request){
		Optional<Consultation> c = consultationRepository.findById(id);		
		if(c.isPresent()) {
			Optional<ClinicalNote> n = clinicalNoteRepository.findByConsultation(c.get());
			if(n.isPresent()) {
				URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/load_clinical_note_by_consultation_id").toUriString());
				return ResponseEntity.created(uri).body(n.get());
			}else {
				/**
				 * Create one, and return it
				 */
				ClinicalNote note = new ClinicalNote();
				note.setConsultation(c.get());
				
				note.setCreatedby(userService.getUser(request).getId());
				note.setCreatedOn(dayService.getDay().getId());
				note.setCreatedAt(dayService.getTimeStamp());
				
				URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/load_clinical_note_by_consultation_id").toUriString());
				return ResponseEntity.created(uri).body(clinicalNoteRepository.save(note));
			}
		}else {
			throw new NotFoundException("Consultation not found");
		}
			
	}
	
	@GetMapping("/patients/load_general_examination_by_consultation_id")
	public ResponseEntity<GeneralExamination> loadGeneralExaminationByConsultationId(
			@RequestParam(name = "id") Long id,
			HttpServletRequest request){
		Optional<Consultation> c = consultationRepository.findById(id);		
		if(c.isPresent()) {
			Optional<GeneralExamination> n = generalExaminationRepository.findByConsultation(c.get());
			if(n.isPresent()) {
				URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/load_general_examination_by_consultation_id").toUriString());
				return ResponseEntity.created(uri).body(n.get());
			}else {
				/**
				 * Create one, and return it
				 */
				GeneralExamination exam = new GeneralExamination();
				exam.setConsultation(c.get());
				
				exam.setCreatedby(userService.getUser(request).getId());
				exam.setCreatedOn(dayService.getDay().getId());
				exam.setCreatedAt(dayService.getTimeStamp());
				
				URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/load_general_examination_by_consultation_id").toUriString());
				return ResponseEntity.created(uri).body(generalExaminationRepository.save(exam));
			}
		}else {
			throw new NotFoundException("Consultation not found");
		}
			
	}
	
	@PostMapping("/patients/save_clinical_note_and_general_examination") 
	public ResponseEntity<CG> saveCG(
			@RequestBody CG cg,
			HttpServletRequest request){
		Optional<Consultation> c = consultationRepository.findById(cg.getClinicalNote().getConsultation().getId());
		if(!c.isPresent()) {
			throw new NotFoundException("Consultation not found");
		}
		Optional<ClinicalNote> cn = clinicalNoteRepository.findByConsultation(c.get());
		ClinicalNote note = new ClinicalNote();
		if(cn.isPresent()) {
			cn.get().setMainComplain(cg.getClinicalNote().getMainComplain());
			cn.get().setDrugsAndAllergyHistory(cg.getClinicalNote().getDrugsAndAllergyHistory());
			cn.get().setFamilyAndSocialHistory(cg.getClinicalNote().getFamilyAndSocialHistory());
			cn.get().setPastMedicalHistory(cg.getClinicalNote().getPastMedicalHistory());
			cn.get().setPhysicalExamination(cg.getClinicalNote().getPhysicalExamination());
			cn.get().setPresentIllnessHistory(cg.getClinicalNote().getPresentIllnessHistory());
			cn.get().setReviewOfOtherSystems(cg.getClinicalNote().getReviewOfOtherSystems());
			cn.get().setManagementPlan(cg.getClinicalNote().getManagementPlan());
			
			note = clinicalNoteRepository.save(cn.get());
		}else {
			
			note.setMainComplain(cg.getClinicalNote().getMainComplain());
			note.setDrugsAndAllergyHistory(cg.getClinicalNote().getDrugsAndAllergyHistory());
			note.setFamilyAndSocialHistory(cg.getClinicalNote().getFamilyAndSocialHistory());
			note.setPastMedicalHistory(cg.getClinicalNote().getPastMedicalHistory());
			note.setPhysicalExamination(cg.getClinicalNote().getPhysicalExamination());
			note.setPresentIllnessHistory(cg.getClinicalNote().getPresentIllnessHistory());
			note.setReviewOfOtherSystems(cg.getClinicalNote().getReviewOfOtherSystems());
			note.setManagementPlan(cg.getClinicalNote().getManagementPlan());
			note.setConsultation(c.get());
			
			note.setCreatedby(userService.getUser(request).getId());
			note.setCreatedOn(dayService.getDay().getId());
			note.setCreatedAt(dayService.getTimeStamp());
			
			note = clinicalNoteRepository.save(note);
		}
		
		c = consultationRepository.findById(cg.getGeneralExamination().getConsultation().getId());
		if(!c.isPresent()) {
			throw new NotFoundException("Consultation not found");
		}
		Optional<GeneralExamination> ge = generalExaminationRepository.findByConsultation(c.get());
		GeneralExamination exam = new GeneralExamination();
		if(ge.isPresent()) {
			ge.get().setBodyMassIndex(cg.getGeneralExamination().getBodyMassIndex());
			ge.get().setBodyMassIndexComment(cg.getGeneralExamination().getBodyMassIndexComment());
			ge.get().setBodySurfaceArea(cg.getGeneralExamination().getBodySurfaceArea());
			ge.get().setHeight(cg.getGeneralExamination().getHeight());
			ge.get().setPressure(cg.getGeneralExamination().getPressure());
			ge.get().setPulseRate(cg.getGeneralExamination().getPulseRate());
			ge.get().setRespiratoryRate(cg.getGeneralExamination().getRespiratoryRate());
			ge.get().setSaturationOxygen(cg.getGeneralExamination().getSaturationOxygen());
			ge.get().setTemperature(cg.getGeneralExamination().getTemperature());
			ge.get().setWeight(cg.getGeneralExamination().getWeight());
			ge.get().setDescription(cg.getGeneralExamination().getDescription());
			
			exam = generalExaminationRepository.save(ge.get());
		}else {
			exam.setBodyMassIndex(cg.getGeneralExamination().getBodyMassIndex());
			exam.setBodyMassIndexComment(cg.getGeneralExamination().getBodyMassIndexComment());
			exam.setBodySurfaceArea(cg.getGeneralExamination().getBodySurfaceArea());
			exam.setHeight(cg.getGeneralExamination().getHeight());
			exam.setPressure(cg.getGeneralExamination().getPressure());
			exam.setPulseRate(cg.getGeneralExamination().getPulseRate());
			exam.setRespiratoryRate(cg.getGeneralExamination().getRespiratoryRate());
			exam.setSaturationOxygen(cg.getGeneralExamination().getSaturationOxygen());
			exam.setTemperature(cg.getGeneralExamination().getTemperature());
			exam.setWeight(cg.getGeneralExamination().getWeight());
			exam.setDescription(cg.getGeneralExamination().getDescription());
			exam.setConsultation(c.get());
			
			exam.setCreatedby(userService.getUser(request).getId());
			exam.setCreatedOn(dayService.getDay().getId());
			exam.setCreatedAt(dayService.getTimeStamp());
			
			exam = generalExaminationRepository.save(exam);
		}
		
		CG cgToReturn = new CG();
		cgToReturn.setClinicalNote(note);
		cgToReturn.setGeneralExamination(exam);
				
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/save_clinical_note_and_general_examination").toUriString());
		return ResponseEntity.created(uri).body(cgToReturn);
	}
	
	@PostMapping("/patients/save_working_diagnosis") 
	public ResponseEntity<WorkingDiagnosis> saveWorkingDiagnosis(
			@RequestBody WorkingDiagnosis diagnosis,
			HttpServletRequest request){
		Optional<Consultation> c = consultationRepository.findById(diagnosis.getConsultation().getId());
		if(!c.isPresent()) {
			throw new NotFoundException("Consultation not found");
		}
		Optional<DiagnosisType> dt = diagnosisTypeRepository.findByName(diagnosis.getDiagnosisType().getName());
		if(!dt.isPresent()) {
			throw new NotFoundException("Diagnosis type not found");
		}
		if(workingDiagnosisRepository.existsByConsultationAndDiagnosisType(c.get(), dt.get())) {
			throw new InvalidOperationException("Duplicate Diagnosis Types is not allowed");
		}
		diagnosis.setConsultation(c.get());
		diagnosis.setDiagnosisType(dt.get());
		diagnosis.setPatient(c.get().getPatient());
		
		if(diagnosis.getId() == null) {
			diagnosis.setCreatedby(userService.getUser(request).getId());
			diagnosis.setCreatedOn(dayService.getDay().getId());
			diagnosis.setCreatedAt(dayService.getTimeStamp());
		}
		
		
				
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/save_working_diagnosis").toUriString());
		return ResponseEntity.created(uri).body(workingDiagnosisRepository.save(diagnosis));
	}
	
	@GetMapping("/patients/load_working_diagnosis") 
	public ResponseEntity<List<WorkingDiagnosisModel>> loasWorkingDiagnosises(
			@RequestParam(name = "id") Long id,
			HttpServletRequest request){
		Optional<Consultation> c = consultationRepository.findById(id);
		if(!c.isPresent()) {
			throw new NotFoundException("Consultation not found");
		}		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/save_working_diagnosis").toUriString());
		
		List<WorkingDiagnosis> workingDiagnosises = workingDiagnosisRepository.findAllByConsultation(c.get());
		
		List<WorkingDiagnosisModel> models = new ArrayList<>();
		for(WorkingDiagnosis l : workingDiagnosises) {
			WorkingDiagnosisModel model= new WorkingDiagnosisModel();
			model.setId(l.getId());
			model.setDescription(l.getDescription());
			model.setDiagnosisType(l.getDiagnosisType());
			
			if(l.getCreatedAt() != null) {
				model.setCreated(l.getCreatedAt().toString()+" | "+userService.getUserById(l.getCreatedby()).getNickname());
			}else {
				model.setCreated("");
			}			
			models.add(model);
		}
		return ResponseEntity.created(uri).body(models);		
	}
	
	@PostMapping("/patients/save_final_diagnosis") 
	public ResponseEntity<FinalDiagnosis> saveFinalDiagnosis(
			@RequestBody FinalDiagnosis diagnosis,
			HttpServletRequest request){
		Optional<Consultation> c = consultationRepository.findById(diagnosis.getConsultation().getId());
		if(!c.isPresent()) {
			throw new NotFoundException("Consultation not found");
		}
		Optional<DiagnosisType> dt = diagnosisTypeRepository.findByName(diagnosis.getDiagnosisType().getName());
		if(!dt.isPresent()) {
			throw new NotFoundException("Diagnosis type not found");
		}
		if(finalDiagnosisRepository.existsByConsultationAndDiagnosisType(c.get(), dt.get())) {
			throw new InvalidOperationException("Duplicate Diagnosis Types is not allowed");
		}
		diagnosis.setConsultation(c.get());
		diagnosis.setDiagnosisType(dt.get());
		diagnosis.setPatient(c.get().getPatient());
		
		if(diagnosis.getId() == null) {
			diagnosis.setCreatedby(userService.getUser(request).getId());
			diagnosis.setCreatedOn(dayService.getDay().getId());
			diagnosis.setCreatedAt(dayService.getTimeStamp());
		}
				
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/save_final_diagnosis").toUriString());
		
		return ResponseEntity.created(uri).body(finalDiagnosisRepository.save(diagnosis));
	}
	
	@GetMapping("/patients/load_final_diagnosis") 
	public ResponseEntity<List<FinalDiagnosisModel>> loadFinalDiagnosises(
			@RequestParam(name = "id") Long id,
			HttpServletRequest request){
		Optional<Consultation> c = consultationRepository.findById(id);
		if(!c.isPresent()) {
			throw new NotFoundException("Consultation not found");
		}		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/save_final_diagnosis").toUriString());
		//return ResponseEntity.created(uri).body(c.get().getFinalDiagnosises());
		
		List<FinalDiagnosis> finalDiagnosises = finalDiagnosisRepository.findAllByConsultation(c.get());
		
		List<FinalDiagnosisModel> models = new ArrayList<>();
		for(FinalDiagnosis l : finalDiagnosises) {
			FinalDiagnosisModel model= new FinalDiagnosisModel();
			model.setId(l.getId());
			model.setDescription(l.getDescription());
			model.setDiagnosisType(l.getDiagnosisType());
			
			if(l.getCreatedAt() != null) {
				model.setCreated(l.getCreatedAt().toString()+" | "+userService.getUserById(l.getCreatedby()).getNickname());
			}else {
				model.setCreated("");
			}			
			models.add(model);
		}
		return ResponseEntity.created(uri).body(models);	
	}
	
	@GetMapping("/patients/delete_working_diagnosis") 
	public void deleteWorkingDiagnosis(
			@RequestParam(name = "id") Long id,
			HttpServletRequest request){				
		workingDiagnosisRepository.deleteById(id);
	}
	
	@GetMapping("/patients/delete_final_diagnosis") 
	public void deleteFinalDiagnosis(
			@RequestParam(name = "id") Long id,
			HttpServletRequest request){				
		finalDiagnosisRepository.deleteById(id);
	}
	
	@PostMapping("/patients/save_lab_test")
	//@PreAuthorize("hasAnyAuthority('PRODUCT-CREATE')")
	public ResponseEntity<LabTest>saveLabTest(
			@RequestBody LabTest labTest,
			@RequestParam Long consultation_id, @RequestParam Long non_consultation_id, 
			HttpServletRequest request){
		Optional<Consultation> c = consultationRepository.findById(consultation_id);
		Optional<NonConsultation> nc = nonConsultationRepository.findById(non_consultation_id);
		
		Optional<LabTestType> lt = labTestTypeRepository.findByName(labTest.getLabTestType().getName());
		if(c.isPresent()) {
			if(labTestRepository.existsByConsultationAndLabTestType(c.get(), lt.get())) {
				throw new InvalidOperationException("Duplicate Lab Test Types is not allowed");
			}
		}else if(nc.isPresent()) {
			if(labTestRepository.existsByNonConsultationAndLabTestType(nc.get(), lt.get())) {
				throw new InvalidOperationException("Duplicate Lab Test Types is not allowed");
			}
		}
		
		
		
		if(labTest.getId() == null) {
			labTest.setCreatedby(userService.getUser(request).getId());
			labTest.setCreatedOn(dayService.getDay().getId());
			labTest.setCreatedAt(dayService.getTimeStamp());
			
			labTest.setOrderedby(userService.getUser(request).getId());
			labTest.setOrderedOn(dayService.getDay().getId());
			labTest.setOrderedAt(dayService.getTimeStamp());
		}
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/save_lab_test").toUriString());
		return ResponseEntity.created(uri).body(patientService.saveLabTest(labTest, c, nc, request));
	}
	
	@PostMapping("/patients/save_radiology")
	//@PreAuthorize("hasAnyAuthority('PRODUCT-CREATE')")
	public ResponseEntity<Radiology>saveRadiology(
			@RequestBody Radiology radiology,
			@RequestParam Long consultation_id, @RequestParam Long non_consultation_id, 
			HttpServletRequest request){
		Optional<Consultation> c = consultationRepository.findById(consultation_id);
		Optional<NonConsultation> nc = nonConsultationRepository.findById(non_consultation_id);
		
		Optional<RadiologyType> lt = radiologyTypeRepository.findByName(radiology.getRadiologyType().getName());
		if(c.isPresent()) {
			if(radiologyRepository.existsByConsultationAndRadiologyType(c.get(), lt.get())) {
				throw new InvalidOperationException("Duplicate Radiology Types is not allowed");
			}
		}else if(nc.isPresent()) {
			if(radiologyRepository.existsByNonConsultationAndRadiologyType(nc.get(), lt.get())) {
				throw new InvalidOperationException("Duplicate Radiology Types is not allowed");
			}
		}
		
		
		if(radiology.getId() == null) {
			radiology.setCreatedby(userService.getUser(request).getId());
			radiology.setCreatedOn(dayService.getDay().getId());
			radiology.setCreatedAt(dayService.getTimeStamp());
			
			radiology.setOrderedby(userService.getUser(request).getId());
			radiology.setOrderedOn(dayService.getDay().getId());
			radiology.setOrderedAt(dayService.getTimeStamp());
		}
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/save_radiology").toUriString());
		return ResponseEntity.created(uri).body(patientService.saveRadiology(radiology, c, nc, request));
	}
	
	@PostMapping("/patients/save_procedure")
	//@PreAuthorize("hasAnyAuthority('PRODUCT-CREATE')")
	public ResponseEntity<Procedure>saveProcedure(
			@RequestBody Procedure procedure,
			@RequestParam Long consultation_id, @RequestParam Long non_consultation_id, 
			HttpServletRequest request){
		Optional<Consultation> c = consultationRepository.findById(consultation_id);
		Optional<NonConsultation> nc = nonConsultationRepository.findById(non_consultation_id);
		
		Optional<ProcedureType> lt = procedureTypeRepository.findByName(procedure.getProcedureType().getName());
		
		if(c.isPresent()) {
			if(procedureRepository.existsByConsultationAndProcedureType(c.get(), lt.get())) {
				throw new InvalidOperationException("Duplicate Procedure Types is not allowed");
			}
		}else if(nc.isPresent()) {
			if(procedureRepository.existsByNonConsultationAndProcedureType(nc.get(), lt.get())) {
				throw new InvalidOperationException("Duplicate Procedure Types is not allowed");
			}
		}
		
		if(procedure.getId() == null) {
			procedure.setCreatedby(userService.getUser(request).getId());
			procedure.setCreatedOn(dayService.getDay().getId());
			procedure.setCreatedAt(dayService.getTimeStamp());
			
			procedure.setOrderedby(userService.getUser(request).getId());
			procedure.setOrderedOn(dayService.getDay().getId());
			procedure.setOrderedAt(dayService.getTimeStamp());
		}
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/save_procedure").toUriString());
		return ResponseEntity.created(uri).body(patientService.saveProcedure(procedure, c, nc, request));
	}
	
	@PostMapping("/patients/save_prescription")
	//@PreAuthorize("hasAnyAuthority('PRODUCT-CREATE')")
	public ResponseEntity<Prescription>savePrescription(
			@RequestBody Prescription prescription,
			@RequestParam Long consultation_id, @RequestParam Long non_consultation_id, 
			HttpServletRequest request){
		Optional<Consultation> c = consultationRepository.findById(consultation_id);
		Optional<NonConsultation> nc = nonConsultationRepository.findById(non_consultation_id);
		
		Optional<Medicine> lt = medicineRepository.findByName(prescription.getMedicine().getName());
		if(prescriptionRepository.existsByConsultationAndMedicine(c.get(), lt.get())) {
			throw new InvalidOperationException("Duplicate Medicine types is not allowed");
		}
		
		if(prescription.getId() == null) {
			prescription.setCreatedby(userService.getUser(request).getId());
			prescription.setCreatedOn(dayService.getDay().getId());
			prescription.setCreatedAt(dayService.getTimeStamp());
			
			prescription.setOrderedby(userService.getUser(request).getId());
			prescription.setOrderedOn(dayService.getDay().getId());
			prescription.setOrderedAt(dayService.getTimeStamp());
		}
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/save_prescription").toUriString());
		return ResponseEntity.created(uri).body(patientService.savePrescription(prescription, c, nc, request));
	}
	
	@GetMapping("/patients/load_lab_tests") 
	public ResponseEntity<List<LabTestModel>> loadLabTests(
			@RequestParam(name = "consultation_id") Long consultationId,
			@RequestParam(name = "non_consultation_id") Long nonConsultationId,
			HttpServletRequest request){
		Optional<Consultation> c = consultationRepository.findById(consultationId);
		Optional<NonConsultation> nc = nonConsultationRepository.findById(nonConsultationId);
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/load_lab_test").toUriString());
		Patient patient = new Patient();
		Visit visit = new Visit();
		List<LabTest> labTests = new ArrayList<>();
		if(c.isPresent()) {
			patient = c.get().getPatient();
			visit = visitRepository.findLastByPatient(patient).get();
			if(visit.getStatus().equals("PENDING")) {
				labTests = labTestRepository.findAllByConsultation(c.get());
			}						
		}else if(nc.isPresent()){		
			patient = nc.get().getPatient();
			visit = visitRepository.findLastByPatient(patient).get();
			if(visit.getStatus().equals("PENDING")) {
				labTests = labTestRepository.findAllByNonConsultation(nc.get());
			}						
		}
		List<LabTestModel> models = new ArrayList<>();
		for(LabTest l : labTests) {
			LabTestModel model= new LabTestModel();
			model.setId(l.getId());
			model.setResult(l.getResult());
			model.setLabTestType(l.getLabTestType());
			model.setPatientBill(l.getPatientBill());
			model.setRange(l.getRange());
			model.setLevel(l.getLevel());
			model.setUnit(l.getUnit());
			model.setStatus(l.getStatus());

			if(l.getCreatedAt() != null) {
				model.setCreated(l.getCreatedAt().toString()+" | "+userService.getUserById(l.getCreatedby()).getNickname());
			}else {
				model.setCreated("");
			}
			if(l.getOrderedAt() != null) {
				model.setOrdered(l.getOrderedAt().toString()+" | "+userService.getUserById(l.getOrderedby()).getNickname());
			}else {
				model.setOrdered("");
			}
			if(l.getRejectedAt() != null) {
				model.setRejected(l.getRejectedAt().toString()+" | "+userService.getUserById(l.getRejectedby()).getNickname() + " | "+l.getRejectComment());
			}else {
				model.setRejected("");
			}
			model.setRejectComment(l.getRejectComment());			
			if(l.getAcceptedAt() != null) {
				model.setAccepted(l.getAcceptedAt().toString()+" | "+userService.getUserById(l.getAcceptedby()).getNickname());
			}else {
				model.setAccepted("");
			}
			if(l.getHeldAt() != null) {
				model.setHeld(l.getHeldAt().toString()+" | "+userService.getUserById(l.getHeldby()).getNickname());
			}else {
				model.setHeld("");
			}
			if(l.getCollectedAt() != null) {
				model.setCollected(l.getCollectedAt().toString()+" | "+userService.getUserById(l.getCollectedby()).getNickname());
			}else {
				model.setCollected("");
			}
			
			if(l.getVerifiedAt() != null) {
				model.setVerified(l.getVerifiedAt().toString()+" | "+userService.getUserById(l.getVerifiedby()).getNickname());
			}else {
				model.setVerified("");
			}
			
			models.add(model);
		}
		return ResponseEntity.created(uri).body(models);
	}
	
	@GetMapping("/patients/load_radiologies") 
	public ResponseEntity<List<RadiologyModel>> loadRadiologies(
			@RequestParam(name = "consultation_id") Long consultationId,
			@RequestParam(name = "non_consultation_id") Long nonConsultationId,
			HttpServletRequest request){
		Optional<Consultation> c = consultationRepository.findById(consultationId);
		Optional<NonConsultation> nc = nonConsultationRepository.findById(nonConsultationId);
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/load_radiologies").toUriString());
		Patient patient = new Patient();
		Visit visit = new Visit();
		List<Radiology> radiologies = new ArrayList<>();
		if(c.isPresent()) {
			patient = c.get().getPatient();
			visit = visitRepository.findLastByPatient(patient).get();
			if(visit.getStatus().equals("PENDING")) {
				radiologies = radiologyRepository.findAllByConsultation(c.get());
			}
			
		}else if(nc.isPresent()){	
			patient = nc.get().getPatient();
			visit = visitRepository.findLastByPatient(patient).get();
			if(visit.getStatus().equals("PENDING")) {
				radiologies = radiologyRepository.findAllByNonConsultation(nc.get());
			}					
		}
		List<RadiologyModel> models = new ArrayList<>();
		for(Radiology r : radiologies) {
			RadiologyModel model= new RadiologyModel();
			model.setId(r.getId());
			model.setResult(r.getResult());
			model.setRadiologyType(r.getRadiologyType());
			model.setDescription(r.getDescription());
			model.setDiagnosis(r.getDiagnosis());
			model.setPatientBill(r.getPatientBill());
			model.setAttachment(r.getAttachment());
			if(r.getCreatedAt() != null) {
				model.setCreated(r.getCreatedAt().toString()+" | "+userService.getUserById(r.getCreatedby()).getNickname());
			}else {
				model.setCreated("");
			}
			if(r.getRejectedAt() != null) {
				model.setRejected(r.getRejectedAt().toString()+" | "+userService.getUserById(r.getRejectedby()).getNickname());
			}else {
				model.setRejected("");
			}
			model.setRejectComment(r.getRejectComment());			
			if(r.getAcceptedAt() != null) {
				model.setAccepted(r.getAcceptedAt().toString()+" | "+userService.getUserById(r.getAcceptedby()).getNickname());
			}else {
				model.setAccepted("");
			}
			if(r.getOrderedAt() != null) {
				model.setOrdered(r.getOrderedAt().toString()+" | "+userService.getUserById(r.getOrderedby()).getNickname());
			}else {
				model.setOrdered("");
			}
			if(r.getVerifiedAt() != null) {
				model.setVerified(r.getVerifiedAt().toString()+" | "+userService.getUserById(r.getVerifiedby()).getNickname());
			}else {
				model.setVerified("");
			}
			model.setStatus(r.getStatus());models.add(model);
		}
		return ResponseEntity.created(uri).body(models);
	}
	
	@GetMapping("/patients/load_procedures") 
	public ResponseEntity<List<ProcedureModel>> loadProcedures(
			@RequestParam(name = "consultation_id") Long consultationId,
			@RequestParam(name = "non_consultation_id") Long nonConsultationId,
			HttpServletRequest request){
		Optional<Consultation> c = consultationRepository.findById(consultationId);
		Optional<NonConsultation> nc = nonConsultationRepository.findById(nonConsultationId);
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/load_procedures").toUriString());
		Patient patient = new Patient();
		Visit visit = new Visit();
		List<Procedure> procedures = new ArrayList<>();
		if(c.isPresent()) {
			patient = c.get().getPatient();
			visit = visitRepository.findLastByPatient(patient).get();
			if(visit.getStatus().equals("PENDING")) {
				procedures = procedureRepository.findAllByConsultation(c.get());
			}
			
		}else if(nc.isPresent()){	
			patient = nc.get().getPatient();
			visit = visitRepository.findLastByPatient(patient).get();
			if(visit.getStatus().equals("PENDING")) {
				procedures = procedureRepository.findAllByNonConsultation(nc.get());
			}					
		}
		List<ProcedureModel> models = new ArrayList<>();
		for(Procedure l : procedures) {
			ProcedureModel model= new ProcedureModel();
			model.setId(l.getId());
			model.setProcedureType(l.getProcedureType());
			model.setPatientBill(l.getPatientBill());
			model.setStatus(l.getStatus());

			if(l.getCreatedAt() != null) {
				model.setCreated(l.getCreatedAt().toString()+" | "+userService.getUserById(l.getCreatedby()).getNickname());
			}else {
				model.setCreated("");
			}
			if(l.getOrderedAt() != null) {
				model.setOrdered(l.getOrderedAt().toString()+" | "+userService.getUserById(l.getOrderedby()).getNickname());
			}else {
				model.setOrdered("");
			}
			if(l.getRejectedAt() != null) {
				model.setRejected(l.getRejectedAt().toString()+" | "+userService.getUserById(l.getRejectedby()).getNickname() + " | "+l.getRejectComment());
			}else {
				model.setRejected("");
			}
			model.setRejectComment(l.getRejectComment());			
			if(l.getAcceptedAt() != null) {
				model.setAccepted(l.getAcceptedAt().toString()+" | "+userService.getUserById(l.getAcceptedby()).getNickname());
			}else {
				model.setAccepted("");
			}
			if(l.getHeldAt() != null) {
				model.setHeld(l.getHeldAt().toString()+" | "+userService.getUserById(l.getHeldby()).getNickname());
			}else {
				model.setHeld("");
			}		
			if(l.getVerifiedAt() != null) {
				model.setVerified(l.getVerifiedAt().toString()+" | "+userService.getUserById(l.getVerifiedby()).getNickname());
			}else {
				model.setVerified("");
			}
			
			models.add(model);
		}
		return ResponseEntity.created(uri).body(models);
	}
	
	@GetMapping("/patients/load_prescriptions") 
	public ResponseEntity<List<Prescription>> loadPrescriptions(
			@RequestParam(name = "consultation_id") Long consultationId,
			@RequestParam(name = "non_consultation_id") Long nonConsultationId,
			HttpServletRequest request){
		Optional<Consultation> c = consultationRepository.findById(consultationId);
		Optional<NonConsultation> nc = nonConsultationRepository.findById(nonConsultationId);
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/load_prescriptions").toUriString());
		Patient patient = new Patient();
		Visit visit = new Visit();
		List<Prescription> prescriptions = new ArrayList<>();
		if(c.isPresent()) {
			patient = c.get().getPatient();
			visit = visitRepository.findLastByPatient(patient).get();
			if(visit.getStatus().equals("PENDING")) {
				prescriptions = prescriptionRepository.findAllByConsultation(c.get());
			}
			
		}else if(nc.isPresent()){	
			patient = nc.get().getPatient();
			visit = visitRepository.findLastByPatient(patient).get();
			if(visit.getStatus().equals("PENDING")) {
				prescriptions = prescriptionRepository.findAllByNonConsultation(nc.get());
			}					
		}
		return ResponseEntity.created(uri).body(prescriptions);
	}
	
	@PostMapping("/patients/delete_lab_test")
	//@PreAuthorize("hasAnyAuthority('PRODUCT-CREATE')")
	public ResponseEntity<Boolean>deleteLabTest(
			@RequestParam Long id, 
			HttpServletRequest request){
		Optional<LabTest> t = labTestRepository.findById(id);
		if(!t.get().getStatus().equals("PENDING")) {
			throw new InvalidOperationException("Could not delete, only a PENDING lab test can be deleted");
		}
		LabTest labTest = t.get();
		
		PatientBill patientBill = patientBillRepository.findById(t.get().getPatientBill().getId()).get();
		
		Optional<PatientPaymentDetail> pd = patientPaymentDetailRepository.findByPatientBill(patientBill);
		if(pd.isPresent()) {
			
			//disable deleting a paid test first
			throw new InvalidOperationException("Can not delete a paid lab test, please contact system administrator");
			
			/*PatientCreditNote patientCreditNote = new PatientCreditNote();
			patientCreditNote.setAmount(pd.get().getPatientBill().getAmount());
			patientCreditNote.setPatient(patientBill.getPatient());
			patientCreditNote.setReference("Lab test canceled");
			patientCreditNote.setStatus("PENDING");
			patientCreditNote.setNo("NA");
			patientCreditNote = patientCreditNoteRepository.save(patientCreditNote);
			patientCreditNote.setNo(patientCreditNote.getId().toString());
			patientCreditNote = patientCreditNoteRepository.save(patientCreditNote);*/
		}
		Optional<PatientInvoiceDetail> i = patientInvoiceDetailRepository.findByPatientBill(patientBill);
		/**
		 * If there is a patientInvoice detail associated with this patientBill, delete it
		 */
		if(i.isPresent()) {			
			patientInvoiceDetailRepository.delete(i.get());
			PatientInvoice patientInvoice = i.get().getPatientInvoice();
			int j = 0;
			for(PatientInvoiceDetail d : patientInvoice.getPatientInvoiceDetails()) {
				j = j++;
			}
			if(j == 0) {
				patientInvoiceRepository.delete(patientInvoice);
			}			
		}
		if(pd.isPresent()) {
			//disable deleting a paid test first
			throw new InvalidOperationException("Can not delete a paid lab test, please contact system administrator");
			/*patientPaymentDetailRepository.delete(pd.get());*/
		}
		labTestRepository.delete(labTest);
		patientBillRepository.delete(patientBill);		
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/delete_lab_test").toUriString());
		return ResponseEntity.created(uri).body(true);
	}
	
	
	@PostMapping("/patients/delete_radiology")
	//@PreAuthorize("hasAnyAuthority('PRODUCT-CREATE')")
	public ResponseEntity<Boolean>deleteRadiology(
			@RequestParam Long id, 
			HttpServletRequest request){
		Optional<Radiology> r = radiologyRepository.findById(id);
		if(!r.get().getStatus().equals("PENDING")) {
			throw new InvalidOperationException("Could not delete, only a PENDING radiology can be deleted");
		}
		Radiology radiology = r.get();
		
		PatientBill patientBill = patientBillRepository.findById(r.get().getPatientBill().getId()).get();
		
		Optional<PatientPaymentDetail> pd = patientPaymentDetailRepository.findByPatientBill(patientBill);
		if(pd.isPresent()) {
			//disable deleting a paid radiology first, in the mean time
			throw new InvalidOperationException("Can not delete a paid lab test, please contact system administrator");
			
			/*PatientCreditNote patientCreditNote = new PatientCreditNote();
			patientCreditNote.setAmount(pd.get().getPatientBill().getAmount());
			patientCreditNote.setPatient(patientBill.getPatient());
			patientCreditNote.setReference("Radiology canceled");
			patientCreditNote.setStatus("PENDING");
			patientCreditNote.setNo("NA");
			patientCreditNote = patientCreditNoteRepository.save(patientCreditNote);
			patientCreditNote.setNo(patientCreditNote.getId().toString());
			patientCreditNote = patientCreditNoteRepository.save(patientCreditNote);*/
		}
		Optional<PatientInvoiceDetail> i = patientInvoiceDetailRepository.findByPatientBill(patientBill);
		/**
		 * If there is a patientInvoice detail associated with this patientBill, delete it
		 */
		if(i.isPresent()) {			
			patientInvoiceDetailRepository.delete(i.get());
			PatientInvoice patientInvoice = i.get().getPatientInvoice();
			int j = 0;
			for(PatientInvoiceDetail d : patientInvoice.getPatientInvoiceDetails()) {
				j = j++;
			}
			if(j == 0) {
				patientInvoiceRepository.delete(patientInvoice);
			}			
		}
		if(pd.isPresent()) {
			//disable deleting a paid test first, in the mean time
			throw new InvalidOperationException("Can not delete a paid radiology, please contact system administrator");
			/*patientPaymentDetailRepository.delete(pd.get());*/
		}
		radiologyRepository.delete(radiology);
		patientBillRepository.delete(patientBill);
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/delete_radiology").toUriString());
		return ResponseEntity.created(uri).body(true);
	}
	
	@PostMapping("/patients/delete_procedure")
	//@PreAuthorize("hasAnyAuthority('PRODUCT-CREATE')")
	public ResponseEntity<Boolean>deleteProcedure(
			@RequestParam Long id, 
			HttpServletRequest request){
		Optional<Procedure> pr = procedureRepository.findById(id);
		if(!pr.get().getStatus().equals("PENDING")) {
			throw new InvalidOperationException("Could not delete, only a PENDING procedure can be deleted");
		}
		Procedure procedure = pr.get();
		
		PatientBill patientBill = patientBillRepository.findById(pr.get().getPatientBill().getId()).get();
		
		Optional<PatientPaymentDetail> pd = patientPaymentDetailRepository.findByPatientBill(patientBill);
		if(pd.isPresent()) {
			//disable deleting a paid procedure first, in the mean time
			throw new InvalidOperationException("Can not delete a paid procedure, please contact system administrator");
			
			/*PatientCreditNote patientCreditNote = new PatientCreditNote();
			patientCreditNote.setAmount(pd.get().getPatientBill().getAmount());
			patientCreditNote.setPatient(patientBill.getPatient());
			patientCreditNote.setReference("Procedure canceled");
			patientCreditNote.setStatus("PENDING");
			patientCreditNote.setNo("NA");
			patientCreditNote = patientCreditNoteRepository.save(patientCreditNote);
			patientCreditNote.setNo(patientCreditNote.getId().toString());
			patientCreditNote = patientCreditNoteRepository.save(patientCreditNote);*/
		}
		Optional<PatientInvoiceDetail> i = patientInvoiceDetailRepository.findByPatientBill(patientBill);
		/**
		 * If there is a patientInvoice detail associated with this patientBill, delete it
		 */
		if(i.isPresent()) {			
			patientInvoiceDetailRepository.delete(i.get());
			PatientInvoice patientInvoice = i.get().getPatientInvoice();
			int j = 0;
			for(PatientInvoiceDetail d : patientInvoice.getPatientInvoiceDetails()) {
				j = j++;
			}
			if(j == 0) {
				patientInvoiceRepository.delete(patientInvoice);
			}			
		}
		if(pd.isPresent()) {
			//disable deleting a paid test first, in the mean time
			throw new InvalidOperationException("Can not delete a paid procedure, please contact system administrator");
			/*patientPaymentDetailRepository.delete(pd.get());*/
		}
		
		procedureRepository.delete(procedure);
		patientBillRepository.delete(patientBill);
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/delete_procedure").toUriString());
		return ResponseEntity.created(uri).body(true);
	}
	
	@PostMapping("/patients/delete_prescription")
	//@PreAuthorize("hasAnyAuthority('PRODUCT-CREATE')")
	public ResponseEntity<Boolean>deletePrescription(
			@RequestParam Long id, 
			HttpServletRequest request){
		Optional<Prescription> pr = prescriptionRepository.findById(id);
		if(!pr.get().getStatus().equals("PENDING")) {
			throw new InvalidOperationException("Could not delete, only a PENDING prescription can be deleted");
		}
		Prescription prescription = pr.get();
		
		PatientBill patientBill = patientBillRepository.findById(pr.get().getPatientBill().getId()).get();
		
		Optional<PatientPaymentDetail> pd = patientPaymentDetailRepository.findByPatientBill(patientBill);
		if(pd.isPresent()) {
			//disable deleting a paid test first, in the mean time
			throw new InvalidOperationException("Can not delete a paid prescription, please contact system administrator");
			
			/*PatientCreditNote patientCreditNote = new PatientCreditNote();
			patientCreditNote.setAmount(pd.get().getPatientBill().getAmount());
			patientCreditNote.setPatient(patientBill.getPatient());
			patientCreditNote.setReference("Prescription canceled");
			patientCreditNote.setStatus("PENDING");
			patientCreditNote.setNo("NA");
			patientCreditNote = patientCreditNoteRepository.save(patientCreditNote);
			patientCreditNote.setNo(patientCreditNote.getId().toString());
			patientCreditNote = patientCreditNoteRepository.save(patientCreditNote);*/
		}
		Optional<PatientInvoiceDetail> i = patientInvoiceDetailRepository.findByPatientBill(patientBill);
		/**
		 * If there is a patientInvoice detail associated with this patientBill, delete it
		 */
		if(i.isPresent()) {			
			patientInvoiceDetailRepository.delete(i.get());
			PatientInvoice patientInvoice = i.get().getPatientInvoice();
			int j = 0;
			for(PatientInvoiceDetail d : patientInvoice.getPatientInvoiceDetails()) {
				j = j++;
			}
			if(j == 0) {
				patientInvoiceRepository.delete(patientInvoice);
			}			
		}
		if(pd.isPresent()) {
			//disable deleting a paid test first, in the mean time
			throw new InvalidOperationException("Can not delete a paid prescription, please contact system administrator");
			/*patientPaymentDetailRepository.delete(pd.get());*/
		}
		
		prescriptionRepository.delete(prescription);
		patientBillRepository.delete(patientBill);
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/delete_prescription").toUriString());
		return ResponseEntity.created(uri).body(true);
	}
	
	
	@GetMapping("/patients/get_lab_outpatient_list") 
	public ResponseEntity<List<Patient>> getLabOutpatientList(
			HttpServletRequest request){
		
		List<Consultation> cs = consultationRepository.findAllByStatus("IN-PROCESS");
		List<NonConsultation> ncs = nonConsultationRepository.findAllByStatus("IN-PROCESS");
		List<LabTest> labTests = labTestRepository.findAllByConsultationIn(cs);			
		List<Patient> patients = new ArrayList<>();		
		for(LabTest t : labTests) {
			if(t.getPatient().getType().equals("OUTPATIENT") && (t.getPatientBill().getStatus().equals("PAID") || t.getPatientBill().getStatus().equals("COVERED"))) {
				patients.add(t.getPatient());
			}
		}
		HashSet<Patient> h = new HashSet<Patient>(patients);
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/get_lab_outpatient_list").toUriString());
		return ResponseEntity.created(uri).body(new ArrayList<Patient>(h));
	}
	
	@GetMapping("/patients/get_lab_tests_by_patient_id") 
	public ResponseEntity<List<LabTestModel>> getLabTestByPatientId(
			@RequestParam(name = "id") Long id,
			HttpServletRequest request){
		Optional<Patient> p = patientRepository.findById(id);
		if(!p.isPresent()) {
			return null;
		}
		List<Consultation> cs = consultationRepository.findAllByPatientAndStatus(p.get(), "IN-PROCESS");
		List<NonConsultation> ncs = nonConsultationRepository.findAllByPatientAndStatus(p.get(), "IN-PROCESS");
		List<LabTest> labTests = labTestRepository.findAllByConsultationInOrNonConsultationIn(cs, ncs);	
		
		List<LabTestModel> labTestsToReturn = new ArrayList<>();
		for(LabTest test : labTests) {
			if(test.getPatientBill().getStatus().equals("PAID") || test.getPatientBill().getStatus().equals("COVERED")) {
				LabTestModel t = new LabTestModel();
				t.setId(test.getId());
				t.setResult(test.getResult());
				t.setRange(test.getRange());
				t.setLevel(test.getLevel());
				t.setUnit(test.getUnit());
				t.setLabTestType(test.getLabTestType());
				t.setPatient(test.getPatient());
				t.setConsultation(test.getConsultation());
				t.setNonConsultation(test.getNonConsultation());
				t.setPatientBill(test.getPatientBill());
				t.setStatus(test.getStatus());
				t.setVerified("Not Available");;
				labTestsToReturn.add(t);				
			}
		}
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/get_lab_tests_by_patient_id").toUriString());
		return ResponseEntity.created(uri).body(labTestsToReturn);
	}
	
	@PostMapping("/patients/accept_lab_test") 
	public boolean acceptLabTest(
			@RequestBody LLabTest test,
			HttpServletRequest request){
		Optional<LabTest> t = labTestRepository.findById(test.getId());
		if(!t.isPresent()) {
			throw new NotFoundException("Lab Test not found");
		}
		if(!(t.get().getStatus().equals("PENDING") || t.get().getStatus().equals("REJECTED"))) {
			throw new InvalidOperationException("Could not accept, only PENDING or REJECTED tests can be accepted");
		}
		t.get().setStatus("ACCEPTED");
		labTestRepository.save(t.get());
		return true;
	}
	
	@PostMapping("/patients/reject_lab_test") 
	public boolean rejectLabTest(
			@RequestBody LLabTest test,
			HttpServletRequest request){
		Optional<LabTest> t = labTestRepository.findById(test.getId());
		if(!t.isPresent()) {
			throw new NotFoundException("Lab Test not found");
		}
		if(!(t.get().getStatus().equals("PENDING") || t.get().getStatus().equals("ACCEPTED"))) {
			throw new InvalidOperationException("Could not accept, only PENDING or ACCEPTED tests can be rejected");
		}
		t.get().setStatus("REJECTED");
		labTestRepository.save(t.get());
		return true;
	}
	
	@PostMapping("/patients/collect_lab_test") 
	public boolean collectLabTest(
			@RequestBody LLabTest test,
			HttpServletRequest request){
		Optional<LabTest> t = labTestRepository.findById(test.getId());
		if(!t.isPresent()) {
			throw new NotFoundException("Lab Test not found");
		}
		if(!(t.get().getStatus().equals("ACCEPTED"))) {
			throw new InvalidOperationException("Could not accept, only ACCEPTED tests can be collected");
		}
		t.get().setStatus("COLLECTED");
		labTestRepository.save(t.get());
		return true;
	}
	
	@PostMapping("/patients/verify_lab_test") 
	public boolean verifyLabTestResult(
			@RequestBody LLabTest test,
			HttpServletRequest request){
		Optional<LabTest> t = labTestRepository.findById(test.getId());
		if(!t.isPresent()) {
			throw new NotFoundException("Lab Test not found");
		}
		if(!t.get().getStatus().equals("COLLECTED")) {
			throw new InvalidOperationException("Could not verify, only COLLECTED tests can be verified");
		}
		t.get().setResult(test.getResult());
		t.get().setLevel(test.getLevel());
		t.get().setRange(test.getRange());
		t.get().setUnit(test.getUnit());
		t.get().setStatus("VERIFIED");
		labTestRepository.save(t.get());
		return true;
	}	
	
	@PostMapping("/patients/hold_lab_test") 
	public boolean holdLabTest(
			@RequestBody LLabTest test,
			HttpServletRequest request){
		Optional<LabTest> t = labTestRepository.findById(test.getId());
		if(!t.isPresent()) {
			throw new NotFoundException("Lab Test not found");
		}
		if(!(t.get().getStatus().equals("ACCEPTED"))) {
			throw new InvalidOperationException("Could not hold, only ACCEPTED tests can be held");
		}
		t.get().setStatus("PENDING");
		labTestRepository.save(t.get());
		return true;
	}	
	
	@GetMapping("/patients/load_non_consultation_id")
	public ResponseEntity<Long> getNonConsultationId(
			@RequestParam(name = "patient_id") Long id,
			HttpServletRequest request){
		Optional<Patient> p = patientRepository.findById(id);
		if(p.isEmpty()) {
			throw new NotFoundException("Patient not found");
		}
		if(!p.get().getType().equals("OUTSIDER")) {
			throw new InvalidOperationException("Operation only allowed for outsiders");
		}
		List<String> statuses = new ArrayList<>();
		statuses.add("PENDING");
		statuses.add("IN-PROCESS");
		Optional<NonConsultation> nc = nonConsultationRepository.findByPatientAndStatusIn(p.get(), statuses);
		
		Optional<Visit> v = visitRepository.findLastByPatient(p.get());
		Visit visit = new Visit();
		if(!v.isPresent() || !v.get().getStatus().equals("PENDING")) {			
			visit.setPatient(p.get());
			visit.setStatus("PENDING");
			visit.setType("OUTSIDER");
			if(!v.isPresent()) {
				visit.setSequence("FIRST");
			}else {
				visit.setSequence("SUBSEQUENT");
			}
			
			visit.setCreatedby(userService.getUser(request).getId());
			visit.setCreatedOn(dayService.getDay().getId());
			visit.setCreatedAt(dayService.getTimeStamp());
			
			visit = visitRepository.save(visit);
		}else {
			v.get().setType("OUTSIDER");
			visit = visitRepository.save(v.get());
		}
		NonConsultation nonConsultation = new NonConsultation();
		if(nc.isEmpty()) {
			nonConsultation.setCreatedby(userService.getUserId(request));
			nonConsultation.setCreatedOn(dayService.getDayId());
			nonConsultation.setCreatedAt(dayService.getTimeStamp());
			nonConsultation.setVisit(visit);
			nonConsultation.setPatient(p.get());
			nonConsultation.setInsurancePlan(p.get().getInsurancePlan());
			nonConsultation.setMembershipNo(p.get().getMembershipNo());
			nonConsultation.setPaymentType(p.get().getPaymentType());
			nonConsultation.setStatus("PENDING");
			nonConsultation = nonConsultationRepository.save(nonConsultation);
		}else {
			nonConsultation = nc.get();
		}
		return ResponseEntity.ok().body(nonConsultation.getId());
	}
}

@Data
class CG {
	private ClinicalNote clinicalNote;
	private GeneralExamination generalExamination;
}

@Data
class LLabTest {
	private Long id;
	private String result;
	private String range;
	private String level;
	private String unit;
	
}

