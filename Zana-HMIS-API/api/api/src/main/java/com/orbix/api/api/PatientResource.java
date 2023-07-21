/**
 * 
 */
package com.orbix.api.api;

import java.net.URI;
import java.time.LocalDate;
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

import com.orbix.api.domain.Bill;
import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.ClinicalNote;
import com.orbix.api.domain.Clinician;
import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.DiagnosisType;
import com.orbix.api.domain.FinalDiagnosis;
import com.orbix.api.domain.GeneralExamination;
import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.Invoice;
import com.orbix.api.domain.InvoiceDetail;
import com.orbix.api.domain.LabTest;
import com.orbix.api.domain.NonConsultation;
import com.orbix.api.domain.Patient;
import com.orbix.api.domain.PatientCreditNote;
import com.orbix.api.domain.Payment;
import com.orbix.api.domain.PaymentType;
import com.orbix.api.domain.Prescription;
import com.orbix.api.domain.Procedure;
import com.orbix.api.domain.Radiology;
import com.orbix.api.domain.User;
import com.orbix.api.domain.WorkingDiagnosis;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.exceptions.MissingInformationException;
import com.orbix.api.exceptions.NotFoundException;
import com.orbix.api.models.LabTestModel;
import com.orbix.api.repositories.BillRepository;
import com.orbix.api.repositories.ClinicRepository;
import com.orbix.api.repositories.ClinicalNoteRepository;
import com.orbix.api.repositories.ClinicianRepository;
import com.orbix.api.repositories.ConsultationRepository;
import com.orbix.api.repositories.DayRepository;
import com.orbix.api.repositories.DiagnosisTypeRepository;
import com.orbix.api.repositories.FinalDiagnosisRepository;
import com.orbix.api.repositories.GeneralExaminationRepository;
import com.orbix.api.repositories.InsurancePlanRepository;
import com.orbix.api.repositories.InvoiceDetailRepository;
import com.orbix.api.repositories.InvoiceRepository;
import com.orbix.api.repositories.LabTestRepository;
import com.orbix.api.repositories.NonConsultationRepository;
import com.orbix.api.repositories.PatientCreditNoteRepository;
import com.orbix.api.repositories.PatientRepository;
import com.orbix.api.repositories.PaymentRepository;
import com.orbix.api.repositories.PrescriptionRepository;
import com.orbix.api.repositories.ProcedureRepository;
import com.orbix.api.repositories.RadiologyRepository;
import com.orbix.api.repositories.VisitRepository;
import com.orbix.api.repositories.WorkingDiagnosisRepository;
import com.orbix.api.service.CompanyProfileService;
import com.orbix.api.service.DayService;
import com.orbix.api.service.PatientService;

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
	private final BillRepository billRepository;
	private final PaymentRepository paymentRepository;
	private final PatientCreditNoteRepository patientCreditNoteRepository;
	private final InvoiceDetailRepository invoiceDetailRepository;
	private final InvoiceRepository invoiceRepository;
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
	
	@GetMapping("/patients")
	public ResponseEntity<List<Patient>>getMaterials(){
		return ResponseEntity.ok().body(patientService.getAll());
	}
	
	@GetMapping("/patients/get_by_search_key")
	public ResponseEntity<Patient> getProductBySearchKey(
			@RequestParam(name = "search_key") String searchKey){
		return ResponseEntity.ok().body(patientService.findBySearchKey(searchKey));
	}
	
	@GetMapping("/patients/get")
	public ResponseEntity<Patient> get(
			@RequestParam(name = "id") Long id){
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
	
	@GetMapping("/patients/load_clinical_note_by_consultation_id")
	public ResponseEntity<ClinicalNote> loadClinicalNoteByConsultationId(
			@RequestParam(name = "id") Long id){
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
				URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/load_clinical_note_by_consultation_id").toUriString());
				return ResponseEntity.created(uri).body(clinicalNoteRepository.save(note));
			}
		}else {
			throw new NotFoundException("Consultation not found");
		}
			
	}
	
	@GetMapping("/patients/load_general_examination_by_consultation_id")
	public ResponseEntity<GeneralExamination> loadGeneralExaminationByConsultationId(
			@RequestParam(name = "id") Long id){
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
				URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/load_general_examination_by_consultation_id").toUriString());
				return ResponseEntity.created(uri).body(generalExaminationRepository.save(exam));
			}
		}else {
			throw new NotFoundException("Consultation not found");
		}
			
	}
	
	@PostMapping("/patients/save_clinical_note_and_general_examination") 
	public ResponseEntity<CG> saveCG(
			@RequestBody CG cg){
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
			cn.get().setReviewOfOtherSystem(cg.getClinicalNote().getReviewOfOtherSystem());
			cn.get().setManagementPlan(cg.getClinicalNote().getManagementPlan());
			
			note = clinicalNoteRepository.save(cn.get());
		}else {
			
			note.setMainComplain(cg.getClinicalNote().getMainComplain());
			note.setDrugsAndAllergyHistory(cg.getClinicalNote().getDrugsAndAllergyHistory());
			note.setFamilyAndSocialHistory(cg.getClinicalNote().getFamilyAndSocialHistory());
			note.setPastMedicalHistory(cg.getClinicalNote().getPastMedicalHistory());
			note.setPhysicalExamination(cg.getClinicalNote().getPhysicalExamination());
			note.setPresentIllnessHistory(cg.getClinicalNote().getPresentIllnessHistory());
			note.setReviewOfOtherSystem(cg.getClinicalNote().getReviewOfOtherSystem());
			note.setManagementPlan(cg.getClinicalNote().getManagementPlan());
			note.setConsultation(c.get());
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
			@RequestBody WorkingDiagnosis diagnosis){
		Optional<Consultation> c = consultationRepository.findById(diagnosis.getConsultation().getId());
		if(!c.isPresent()) {
			throw new NotFoundException("Consultation not found");
		}
		Optional<DiagnosisType> dt = diagnosisTypeRepository.findByName(diagnosis.getDiagnosisType().getName());
		if(!dt.isPresent()) {
			throw new NotFoundException("Diagnosis type not found");
		}
		diagnosis.setConsultation(c.get());
		diagnosis.setDiagnosisType(dt.get());
		diagnosis.setPatient(c.get().getPatient());
		
				
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/save_working_diagnosis").toUriString());
		return ResponseEntity.created(uri).body(workingDiagnosisRepository.save(diagnosis));
	}
	
	@GetMapping("/patients/load_working_diagnosis") 
	public ResponseEntity<List<WorkingDiagnosis>> loasWorkingDiagnosises(
			@RequestParam(name = "id") Long id){
		Optional<Consultation> c = consultationRepository.findById(id);
		if(!c.isPresent()) {
			throw new NotFoundException("Consultation not found");
		}		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/save_working_diagnosis").toUriString());
		return ResponseEntity.created(uri).body(c.get().getWorkingDiagnosises());
	}
	
	@PostMapping("/patients/save_final_diagnosis") 
	public ResponseEntity<FinalDiagnosis> saveFinalDiagnosis(
			@RequestBody FinalDiagnosis diagnosis){
		Optional<Consultation> c = consultationRepository.findById(diagnosis.getConsultation().getId());
		if(!c.isPresent()) {
			throw new NotFoundException("Consultation not found");
		}
		Optional<DiagnosisType> dt = diagnosisTypeRepository.findByName(diagnosis.getDiagnosisType().getName());
		if(!dt.isPresent()) {
			throw new NotFoundException("Diagnosis type not found");
		}
		diagnosis.setConsultation(c.get());
		diagnosis.setDiagnosisType(dt.get());
		diagnosis.setPatient(c.get().getPatient());
		
				
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/save_final_diagnosis").toUriString());
		return ResponseEntity.created(uri).body(finalDiagnosisRepository.save(diagnosis));
	}
	
	@GetMapping("/patients/load_final_diagnosis") 
	public ResponseEntity<List<FinalDiagnosis>> loadFinalDiagnosises(
			@RequestParam(name = "id") Long id){
		Optional<Consultation> c = consultationRepository.findById(id);
		if(!c.isPresent()) {
			throw new NotFoundException("Consultation not found");
		}		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/save_final_diagnosis").toUriString());
		return ResponseEntity.created(uri).body(c.get().getFinalDiagnosises());
	}
	
	@GetMapping("/patients/delete_working_diagnosis") 
	public void deleteWorkingDiagnosis(
			@RequestParam(name = "id") Long id){				
		workingDiagnosisRepository.deleteById(id);
	}
	
	@GetMapping("/patients/delete_final_diagnosis") 
	public void deleteFinalDiagnosis(
			@RequestParam(name = "id") Long id){				
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
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/save_prescription").toUriString());
		return ResponseEntity.created(uri).body(patientService.savePrescription(prescription, c, nc, request));
	}
	
	@GetMapping("/patients/load_lab_tests") 
	public ResponseEntity<List<LabTest>> loadLabTests(
			@RequestParam(name = "consultation_id") Long consultationId,
			@RequestParam(name = "non_consultation_id") Long nonConsultationId){
		Optional<Consultation> c = consultationRepository.findById(consultationId);
		Optional<NonConsultation> nc = nonConsultationRepository.findById(nonConsultationId);
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/load_lab_test").toUriString());
		if(c.isPresent()) {
			return ResponseEntity.created(uri).body(c.get().getLabTests());
		}else if(nc.isPresent()){		
			return ResponseEntity.created(uri).body(nc.get().getLabTests());
		
		}else {
			return null;
		}
	}
	
	@GetMapping("/patients/load_radiologies") 
	public ResponseEntity<List<Radiology>> loadRadiologies(
			@RequestParam(name = "consultation_id") Long consultationId,
			@RequestParam(name = "non_consultation_id") Long nonConsultationId){
		Optional<Consultation> c = consultationRepository.findById(consultationId);
		Optional<NonConsultation> nc = nonConsultationRepository.findById(nonConsultationId);
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/load_radiologies").toUriString());
		if(c.isPresent()) {
			return ResponseEntity.created(uri).body(c.get().getRadiologies());
		}else if(nc.isPresent()){		
			return ResponseEntity.created(uri).body(nc.get().getRadiologies());
		
		}else {
			return null;
		}
	}
	
	@GetMapping("/patients/load_procedures") 
	public ResponseEntity<List<Procedure>> loadProcedures(
			@RequestParam(name = "consultation_id") Long consultationId,
			@RequestParam(name = "non_consultation_id") Long nonConsultationId){
		Optional<Consultation> c = consultationRepository.findById(consultationId);
		Optional<NonConsultation> nc = nonConsultationRepository.findById(nonConsultationId);
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/load_procedures").toUriString());
		if(c.isPresent()) {
			return ResponseEntity.created(uri).body(c.get().getProcedures());
		}else if(nc.isPresent()){		
			return ResponseEntity.created(uri).body(nc.get().getProcedures());
		
		}else {
			return null;
		}
	}
	
	@GetMapping("/patients/load_prescriptions") 
	public ResponseEntity<List<Prescription>> loadPrescriptions(
			@RequestParam(name = "consultation_id") Long consultationId,
			@RequestParam(name = "non_consultation_id") Long nonConsultationId){
		Optional<Consultation> c = consultationRepository.findById(consultationId);
		Optional<NonConsultation> nc = nonConsultationRepository.findById(nonConsultationId);
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/load_prescriptions").toUriString());
		if(c.isPresent()) {
			return ResponseEntity.created(uri).body(c.get().getPrescriptions());
		}else if(nc.isPresent()){		
			return ResponseEntity.created(uri).body(nc.get().getPrescriptions());
		
		}else {
			return null;
		}
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
		
		Bill bill = billRepository.findById(t.get().getBill().getId()).get();
		
		Optional<Payment> p = paymentRepository.findByBill(bill);
		if(p.isPresent()) {
			
			PatientCreditNote patientCreditNote = new PatientCreditNote();
			patientCreditNote.setAmount(p.get().getAmount());
			patientCreditNote.setPatient(bill.getPatient());
			patientCreditNote.setReference("Lab test canceled");
			patientCreditNote.setStatus("PENDING");
			patientCreditNote.setNo("NA");
			patientCreditNote = patientCreditNoteRepository.save(patientCreditNote);
			patientCreditNote.setNo(patientCreditNote.getId().toString());
			patientCreditNote = patientCreditNoteRepository.save(patientCreditNote);
		}
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
		if(p.isPresent()) {
			paymentRepository.delete(p.get());
		}
		billRepository.delete(bill);
		labTestRepository.delete(labTest);
		
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
		
		Bill bill = billRepository.findById(r.get().getBill().getId()).get();
		
		Optional<Payment> p = paymentRepository.findByBill(bill);
		if(p.isPresent()) {
			
			PatientCreditNote patientCreditNote = new PatientCreditNote();
			patientCreditNote.setAmount(p.get().getAmount());
			patientCreditNote.setPatient(bill.getPatient());
			patientCreditNote.setReference("Radiology canceled");
			patientCreditNote.setStatus("PENDING");
			patientCreditNote.setNo("NA");
			patientCreditNote = patientCreditNoteRepository.save(patientCreditNote);
			patientCreditNote.setNo(patientCreditNote.getId().toString());
			patientCreditNote = patientCreditNoteRepository.save(patientCreditNote);
		}
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
		if(p.isPresent()) {
			paymentRepository.delete(p.get());
		}
		billRepository.delete(bill);
		radiologyRepository.delete(radiology);
		
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
		
		Bill bill = billRepository.findById(pr.get().getBill().getId()).get();
		
		Optional<Payment> p = paymentRepository.findByBill(bill);
		if(p.isPresent()) {
			
			PatientCreditNote patientCreditNote = new PatientCreditNote();
			patientCreditNote.setAmount(p.get().getAmount());
			patientCreditNote.setPatient(bill.getPatient());
			patientCreditNote.setReference("Procedure canceled");
			patientCreditNote.setStatus("PENDING");
			patientCreditNote.setNo("NA");
			patientCreditNote = patientCreditNoteRepository.save(patientCreditNote);
			patientCreditNote.setNo(patientCreditNote.getId().toString());
			patientCreditNote = patientCreditNoteRepository.save(patientCreditNote);
		}
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
		if(p.isPresent()) {
			paymentRepository.delete(p.get());
		}
		billRepository.delete(bill);
		procedureRepository.delete(procedure);
		
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
		
		Bill bill = billRepository.findById(pr.get().getBill().getId()).get();
		
		Optional<Payment> p = paymentRepository.findByBill(bill);
		if(p.isPresent()) {
			
			PatientCreditNote patientCreditNote = new PatientCreditNote();
			patientCreditNote.setAmount(p.get().getAmount());
			patientCreditNote.setPatient(bill.getPatient());
			patientCreditNote.setReference("Prescription canceled");
			patientCreditNote.setStatus("PENDING");
			patientCreditNote.setNo("NA");
			patientCreditNote = patientCreditNoteRepository.save(patientCreditNote);
			patientCreditNote.setNo(patientCreditNote.getId().toString());
			patientCreditNote = patientCreditNoteRepository.save(patientCreditNote);
		}
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
		if(p.isPresent()) {
			paymentRepository.delete(p.get());
		}
		billRepository.delete(bill);
		prescriptionRepository.delete(prescription);
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/delete_prescription").toUriString());
		return ResponseEntity.created(uri).body(true);
	}
	
	
	@GetMapping("/patients/get_lab_outpatient_list") 
	public ResponseEntity<List<Patient>> getLabOutpatientList(){	
		List<String> statusToView = new ArrayList<>();
		statusToView.add("PENDING");
		statusToView.add("ACCEPTED");
		List<LabTest> labTests = labTestRepository.findAllByStatusIn(statusToView);
		List<Patient> patients = new ArrayList<>();		
		for(LabTest t : labTests) {
			if(t.getPatient().getPatientType().equals("OUTPATIENT") && (t.getBill().getStatus().equals("PAID") || t.getBill().getStatus().equals("COVERED"))) {
				patients.add(t.getPatient());
			}
		}
		HashSet<Patient> h = new HashSet<Patient>(patients);
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/get_lab_outpatient_list").toUriString());
		return ResponseEntity.created(uri).body(new ArrayList<Patient>(h));
	}
	
	@GetMapping("/patients/get_lab_tests_by_patient_id") 
	public ResponseEntity<List<LabTestModel>> getLabTestByPatientId(
			@RequestParam(name = "id") Long id){
		Optional<Patient> p = patientRepository.findById(id);
		if(!p.isPresent()) {
			return null;
		}		
		List<String> statuses = new ArrayList<>();
		statuses.add("PENDING");
		statuses.add("ACCEPTED");
		List<LabTest> labTests = labTestRepository.findAllByStatusIn(statuses);	
		List<LabTestModel> labTestsToReturn = new ArrayList<>();
		for(LabTest test : labTests) {
			if(test.getBill().getStatus().equals("PAID") || test.getBill().getStatus().equals("COVERED")) {
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
				t.setBill(test.getBill());
				t.setStatus(test.getStatus());
				t.setVerified("Not Available");;
				labTestsToReturn.add(t);				
			}
		}
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/patients/get_lab_tests_by_patient_id").toUriString());
		return ResponseEntity.created(uri).body(labTestsToReturn);
		//return ResponseEntity.created(uri).body(labTests);
	}
	
	@PostMapping("/patients/save_lab_test_result") 
	public boolean getSaveLabTestResult(
			@RequestBody LLabTest test,
			HttpServletRequest request){
		Optional<LabTest> t = labTestRepository.findById(test.getId());
		if(!t.isPresent()) {
			throw new NotFoundException("Lab Test not found");
		}
		t.get().setResult(test.getResult());
		t.get().setLevel(test.getLevel());
		t.get().setRange(test.getRange());
		t.get().setUnit(test.getUnit());
		labTestRepository.save(t.get());
		return true;
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

