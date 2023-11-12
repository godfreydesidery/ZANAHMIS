/**
 * 
 */
package com.orbix.api.api;

import java.time.LocalDate;
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
import com.orbix.api.domain.Clinician;
import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.DiagnosisType;
import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.LabTest;
import com.orbix.api.domain.LabTestType;
import com.orbix.api.domain.NonConsultation;
import com.orbix.api.domain.Patient;
import com.orbix.api.domain.PatientBill;
import com.orbix.api.domain.PatientInvoiceDetail;
import com.orbix.api.domain.Procedure;
import com.orbix.api.domain.Radiology;
import com.orbix.api.domain.RadiologyType;
import com.orbix.api.domain.User;
import com.orbix.api.exceptions.NotFoundException;
import com.orbix.api.models.LabTestModel;
import com.orbix.api.reports.models.LabTestTypeReport;
import com.orbix.api.repositories.ClinicianRepository;
import com.orbix.api.repositories.ConsultationRepository;
import com.orbix.api.repositories.LabTestRepository;
import com.orbix.api.repositories.LabTestTypeRepository;
import com.orbix.api.repositories.PatientBillRepository;
import com.orbix.api.repositories.PatientInvoiceDetailRepository;
import com.orbix.api.repositories.PatientRepository;
import com.orbix.api.repositories.ProcedureRepository;
import com.orbix.api.repositories.RadiologyRepository;
import com.orbix.api.repositories.UserRepository;
import com.orbix.api.service.DayService;
import com.orbix.api.service.UserService;

import lombok.Data;
import lombok.RequiredArgsConstructor;

/**
 * @author GODFREY
 *
 */
@RestController
@RequestMapping("/zana-hmis-api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Transactional
public class ReportResource {
	
	private final UserService userService;
	private final DayService dayService;
	private final UserRepository userRepository;
	
	private final ConsultationRepository consultationRepository;
	private final ProcedureRepository procedureRepository;
	private final RadiologyRepository radiologyRepository;
	private final ClinicianRepository clinicianRepository;
	private final LabTestRepository labTestRepository;
	private final PatientInvoiceDetailRepository patientInvoiceDetailRepository;
	private final PatientRepository patientRepository;
	private final PatientBillRepository patientBillRepository;
	private final LabTestTypeRepository labTestTypeRepository;
	
	@PostMapping("/reports/consultation_report")
	public ResponseEntity<List<Consultation>>getConsultationReport(
			@RequestBody ConsultationReportArgs args,
			HttpServletRequest request){
		
		Optional<Clinician> c = clinicianRepository.findById(args.getClinician().getId());
		if(c.isEmpty()) {
			throw new NotFoundException("Clinician not found");
		}
		
		List<Consultation> consultations = consultationRepository.findAllByClinicianAndCreatedAtBetween(c.get(), args.getFrom().atStartOfDay(), args.getTo().atStartOfDay().plusDays(1));
		
		
		for(Consultation consultation : consultations) {
			
			PatientBill patientBill = consultation.getPatientBill();
			Optional<PatientInvoiceDetail> pid = patientInvoiceDetailRepository.findByPatientBill(patientBill);
			if(pid.isPresent()) {
				consultation.setInsurancePlan(pid.get().getPatientInvoice().getInsurancePlan());
			}else {
				consultation.setInsurancePlan(null);
			}
		}
		
		return ResponseEntity.ok().body(consultations);
	}
	
	@PostMapping("/reports/procedure_report")
	public ResponseEntity<List<Procedure>>getProcedureReport(
			@RequestBody ProcedureReportArgs args,
			HttpServletRequest request){
		
		Optional<Clinician> c = clinicianRepository.findById(args.getClinician().getId());
		if(c.isEmpty()) {
			throw new NotFoundException("Clinician not found");
		}
		
		List<Procedure> procedures = procedureRepository.findAllByClinicianAndCreatedAtBetween(c.get(), args.getFrom().atStartOfDay(), args.getTo().atStartOfDay().plusDays(1));
		
		for(Procedure procedure : procedures) {
			
			PatientBill patientBill = procedure.getPatientBill();
			Optional<PatientInvoiceDetail> pid = patientInvoiceDetailRepository.findByPatientBill(patientBill);
			if(pid.isPresent()) {
				procedure.setInsurancePlan(pid.get().getPatientInvoice().getInsurancePlan());
			}else {
				procedure.setInsurancePlan(null);
			}
		}
		
		return ResponseEntity.ok().body(procedures);
	}
	
	@PostMapping("/reports/lab_test_report")
	public ResponseEntity<List<LabTest>>getLabTestReport(
			@RequestBody LabTestReportArgs args,
			HttpServletRequest request){
		
		Optional<LabTestType> tt = labTestTypeRepository.findById(args.getLabTestType().getId());
		if(tt.isEmpty()) {
			throw new NotFoundException("Lab Test Type not found");
		}
		
		List<LabTest> labTests = labTestRepository.findAllByLabTestTypeAndCreatedAtBetween(tt.get(), args.getFrom().atStartOfDay(), args.getTo().atStartOfDay().plusDays(1));
		
		return ResponseEntity.ok().body(labTests);
	}
	
	@PostMapping("/reports/get_lab_tests_by_date")
	public ResponseEntity<List<LabTestModel>>getLabTestByDateCheckLaater(
			@RequestBody LabTestReportArgs args,
			HttpServletRequest request){
		
		Optional<Patient> p = patientRepository.findById(args.getPatient().getId());
		if(p.isEmpty()) {
			throw new NotFoundException("Patient not found");
		}
		
		List<String> statuses = new ArrayList<>();
		statuses.add("VERIFIED");
		
		List<LabTest> labTests = labTestRepository.findAllByPatientAndStatusInAndCreatedAtBetween(p.get(), statuses, args.getFrom().atStartOfDay(), args.getTo().atStartOfDay().plusDays(1));
		List<LabTestModel> models = new ArrayList<>();
		for(LabTest l : labTests) {
			LabTestModel model = new LabTestModel();
			model.setId(l.getId());
			model.setResult(l.getResult());
			model.setReport(l.getReport());
			model.setDescription(l.getDescription());
			model.setLabTestType(l.getLabTestType());
			model.setPatientBill(l.getPatientBill());
			model.setRange(l.getRange());
			model.setLevel(l.getLevel());
			model.setUnit(l.getUnit());
			model.setStatus(l.getStatus());
			model.setPatient(l.getPatient());

			if(l.getCreatedAt() != null) {
				model.setCreated(l.getCreatedAt().toString()+" | "+userService.getUserById(l.getCreatedBy()).getNickname());
			}else {
				model.setCreated("");
			}
			if(l.getOrderedAt() != null) {
				model.setOrdered(l.getOrderedAt().toString()+" | "+userService.getUserById(l.getOrderedBy()).getNickname());
			}else {
				model.setOrdered("");
			}
			if(l.getRejectedAt() != null) {
				model.setRejected(l.getRejectedAt().toString()+" | "+userService.getUserById(l.getRejectedBy()).getNickname() + " | "+l.getRejectComment());
			}else {
				model.setRejected("");
			}
			model.setRejectComment(l.getRejectComment());			
			if(l.getAcceptedAt() != null) {
				model.setAccepted(l.getAcceptedAt().toString()+" | "+userService.getUserById(l.getAcceptedBy()).getNickname());
			}else {
				model.setAccepted("");
			}
			if(l.getHeldAt() != null) {
				model.setHeld(l.getHeldAt().toString()+" | "+userService.getUserById(l.getHeldBy()).getNickname());
			}else {
				model.setHeld("");
			}
			if(l.getCollectedAt() != null) {
				model.setCollected(l.getCollectedAt().toString()+" | "+userService.getUserById(l.getCollectedBy()).getNickname());
			}else {
				model.setCollected("");
			}
			
			if(l.getVerifiedAt() != null) {
				model.setVerified(l.getVerifiedAt().toString()+" | "+userService.getUserById(l.getVerifiedBy()).getNickname());
			}else {
				model.setVerified("");
			}
			
			models.add(model);
		}
		
		return ResponseEntity.ok().body(models);
	}
	
	@PostMapping("/reports/lab_test_statistics_report")
	public ResponseEntity<List<LabTest>>getLabTestStatisticsReport(
			@RequestBody LabTestReportArgs args,
			HttpServletRequest request){
		
		List<String> statuses = new ArrayList<>();
		statuses.add("VERIFIED");
		
		List<LabTest> labTests = labTestRepository.findAllByStatusInAndCreatedAtBetween(statuses, args.getFrom().atStartOfDay(), args.getTo().atStartOfDay().plusDays(1));
		
		return ResponseEntity.ok().body(labTests);
	}
	
	@PostMapping("/reports/lab_sample_collection_report")
	public ResponseEntity<List<LabTestModel>>getLabSampleCollectionReport(
			@RequestBody LabTestTypeReportArgs args,
			HttpServletRequest request){
		
		List<LabTest> labTests = labTestRepository.findAllByCreatedAtBetween(args.getFrom().atStartOfDay(), args.getTo().atStartOfDay().plusDays(1));
		
		List<LabTestModel> models = new ArrayList<>();
		for(LabTest l : labTests) {
			LabTestModel model = new LabTestModel();
			model.setId(l.getId());
			model.setResult(l.getResult());
			model.setReport(l.getReport());
			model.setDescription(l.getDescription());
			model.setLabTestType(l.getLabTestType());
			model.setPatientBill(l.getPatientBill());
			model.setRange(l.getRange());
			model.setLevel(l.getLevel());
			model.setUnit(l.getUnit());
			model.setStatus(l.getStatus());
			model.setPatient(l.getPatient());

			if(l.getCreatedAt() != null) {
				model.setCreated(l.getCreatedAt().toString()+" | "+userService.getUserById(l.getCreatedBy()).getNickname());
			}else {
				model.setCreated("");
			}
			if(l.getOrderedAt() != null) {
				model.setOrdered(l.getOrderedAt().toString()+" | "+userService.getUserById(l.getOrderedBy()).getNickname());
			}else {
				model.setOrdered("");
			}
			if(l.getRejectedAt() != null) {
				model.setRejected(l.getRejectedAt().toString()+" | "+userService.getUserById(l.getRejectedBy()).getNickname() + " | "+l.getRejectComment());
			}else {
				model.setRejected("");
			}
			model.setRejectComment(l.getRejectComment());			
			if(l.getAcceptedAt() != null) {
				model.setAccepted(l.getAcceptedAt().toString()+" | "+userService.getUserById(l.getAcceptedBy()).getNickname());
			}else {
				model.setAccepted("");
			}
			if(l.getHeldAt() != null) {
				model.setHeld(l.getHeldAt().toString()+" | "+userService.getUserById(l.getHeldBy()).getNickname());
			}else {
				model.setHeld("");
			}
			if(l.getCollectedAt() != null) {
				model.setCollected(l.getCollectedAt().toString()+" | "+userService.getUserById(l.getCollectedBy()).getNickname());
			}else {
				model.setCollected("");
			}
			
			if(l.getVerifiedAt() != null) {
				model.setVerified(l.getVerifiedAt().toString()+" | "+userService.getUserById(l.getVerifiedBy()).getNickname());
			}else {
				model.setVerified("");
			}
			
			models.add(model);
		}
		
		return ResponseEntity.ok().body(models);
	}
	
	@PostMapping("/reports/doctor_to_radiology_report")
	public ResponseEntity<List<Radiology>>getDoctorToRadiologyReport(
			@RequestBody RadiologyReportArgs args,
			HttpServletRequest request){
		
		Optional<Clinician> c = clinicianRepository.findById(args.getClinician().getId());
		if(c.isEmpty()) {
			throw new NotFoundException("Clinician not found");
		}
		
		List<Radiology> radiologies = radiologyRepository.findAllByClinicianAndCreatedAtBetween(c.get(), args.getFrom().atStartOfDay(), args.getTo().atStartOfDay().plusDays(1));
		
		List<Radiology> doctorRadiologies = new ArrayList<>();
		
		for(Radiology radiology : radiologies) {
			User user = userRepository.findById(radiology.getCreatedby()).get();
			Optional<Clinician> cl = clinicianRepository.findByUser(user);
			
			PatientBill patientBill = radiology.getPatientBill();
			Optional<PatientInvoiceDetail> pid = patientInvoiceDetailRepository.findByPatientBill(patientBill);
			if(pid.isPresent()) {
				radiology.setInsurancePlan(pid.get().getPatientInvoice().getInsurancePlan());
			}else {
				radiology.setInsurancePlan(null);
			}
			
			
			if(cl.isPresent()) {
				doctorRadiologies.add(radiology); //deactivate this snippet later, activate the below
			}
			
			if(radiology.getClinician() != null) {
				//doctorRadiologies.add(radiology); activate this snippet latter, deactivete the above
			}			
		}
		
		return ResponseEntity.ok().body(doctorRadiologies);
	}
	
	@PostMapping("/reports/doctor_to_laboratory_report")
	public ResponseEntity<List<LabTest>>getDoctorTolabReport(
			@RequestBody LabTestReportArgs args,
			HttpServletRequest request){
		
		Optional<Clinician> c = clinicianRepository.findById(args.getClinician().getId());
		if(c.isEmpty()) {
			throw new NotFoundException("Clinician not found");
		}
		
		List<LabTest> labTests = labTestRepository.findAllByClinicianAndCreatedAtBetween(c.get(), args.getFrom().atStartOfDay(), args.getTo().atStartOfDay().plusDays(1));
		
		List<LabTest> doctorLabTests = new ArrayList<>();
		
		for(LabTest labTest : labTests) {
			User user = userRepository.findById(labTest.getCreatedBy()).get();
			Optional<Clinician> cl = clinicianRepository.findByUser(user);
			
			PatientBill patientBill = labTest.getPatientBill();
			Optional<PatientInvoiceDetail> pid = patientInvoiceDetailRepository.findByPatientBill(patientBill);
			if(pid.isPresent()) {
				labTest.setInsurancePlan(pid.get().getPatientInvoice().getInsurancePlan());
			}else {
				labTest.setInsurancePlan(null);
			}
			
			if(cl.isPresent()) {
				doctorLabTests.add(labTest); //deactivate this snippet later, activate the below
			}
			
		}
		
		return ResponseEntity.ok().body(doctorLabTests);
	}
	
	@PostMapping("/reports/get_patient_bills_by_date")
	public ResponseEntity<List<PatientBill>> getPatientBillsByDate(
			@RequestBody PatientBillReportArgs args,
			HttpServletRequest request){	
		Optional<Patient> p = patientRepository.findById(args.getPatient().getId());
		List<String> statuses = new ArrayList<>();
		statuses.add("PAID");
		statuses.add("UNPAID");
		statuses.add("COVERED");
		statuses.add("VERIFIED");
		if(p.isEmpty()) {
			throw new NotFoundException("Patient not found");
		}
		
		List<PatientBill> bills = new ArrayList<>();
		
		bills = patientBillRepository.findAllByPatientAndCreatedAtBetweenAndStatusIn(p.get(), args.from.atStartOfDay(), args.to.atStartOfDay().plusDays(1), statuses);
		
		
		
		return ResponseEntity.ok().body(bills);
	}
	
}

@Data
class ConsultationReportArgs {
	LocalDate from;
	LocalDate to;
	Clinician clinician;
}

@Data
class ProcedureReportArgs {
	LocalDate from;
	LocalDate to;
	Clinician clinician;
}

@Data
class RadiologyReportArgs {
	LocalDate from;
	LocalDate to;
	Clinician clinician;
}

@Data
class LabTestReportArgs {
	LocalDate from;
	LocalDate to;
	LabTestType labTestType;
	Patient patient;
	Clinician clinician;
}

@Data
class LabTestTypeReportArgs {
	LocalDate from;
	LocalDate to;
}

@Data
class PatientBillReportArgs {
	Patient patient;
	LocalDate from;
	LocalDate to;
}






