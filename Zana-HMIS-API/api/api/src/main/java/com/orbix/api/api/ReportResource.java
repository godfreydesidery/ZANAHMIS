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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orbix.api.domain.Admission;
import com.orbix.api.domain.Clinician;
import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.DiagnosisType;
import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.LabTest;
import com.orbix.api.domain.NonConsultation;
import com.orbix.api.domain.Patient;
import com.orbix.api.domain.PatientBill;
import com.orbix.api.domain.PatientInvoiceDetail;
import com.orbix.api.domain.Procedure;
import com.orbix.api.domain.Radiology;
import com.orbix.api.domain.RadiologyType;
import com.orbix.api.domain.User;
import com.orbix.api.repositories.ClinicianRepository;
import com.orbix.api.repositories.ConsultationRepository;
import com.orbix.api.repositories.LabTestRepository;
import com.orbix.api.repositories.PatientInvoiceDetailRepository;
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
	
	@PostMapping("/reports/consultation_report")
	public ResponseEntity<List<Consultation>>getConsultationReport(
			@RequestBody ConsultationReportArgs args,
			HttpServletRequest request){
		
		List<Consultation> consultations = consultationRepository.findAllByCreatedAtBetween(args.getFrom().atStartOfDay(), args.getTo().atStartOfDay().plusDays(1));
		
		
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
		
		List<Procedure> procedures = procedureRepository.findAllByCreatedAtBetween(args.getFrom().atStartOfDay(), args.getTo().atStartOfDay().plusDays(1));
		
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
	
	@PostMapping("/reports/doctor_to_radiology_report")
	public ResponseEntity<List<Radiology>>getDoctorToRadiologyReport(
			@RequestBody RadiologyReportArgs args,
			HttpServletRequest request){
		
		List<Radiology> radiologies = radiologyRepository.findAllByCreatedAtBetween(args.getFrom().atStartOfDay(), args.getTo().atStartOfDay().plusDays(1));
		
		List<Radiology> doctorRadiologies = new ArrayList<>();
		
		for(Radiology radiology : radiologies) {
			User user = userRepository.findById(radiology.getCreatedby()).get();
			Optional<Clinician> c = clinicianRepository.findByUser(user);
			
			PatientBill patientBill = radiology.getPatientBill();
			Optional<PatientInvoiceDetail> pid = patientInvoiceDetailRepository.findByPatientBill(patientBill);
			if(pid.isPresent()) {
				radiology.setInsurancePlan(pid.get().getPatientInvoice().getInsurancePlan());
			}else {
				radiology.setInsurancePlan(null);
			}
			
			
			if(c.isPresent()) {
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
		
		List<LabTest> labTests = labTestRepository.findAllByCreatedAtBetween(args.getFrom().atStartOfDay(), args.getTo().atStartOfDay().plusDays(1));
		
		List<LabTest> doctorLabTests = new ArrayList<>();
		
		for(LabTest labTest : labTests) {
			User user = userRepository.findById(labTest.getCreatedby()).get();
			Optional<Clinician> c = clinicianRepository.findByUser(user);
			
			PatientBill patientBill = labTest.getPatientBill();
			Optional<PatientInvoiceDetail> pid = patientInvoiceDetailRepository.findByPatientBill(patientBill);
			if(pid.isPresent()) {
				labTest.setInsurancePlan(pid.get().getPatientInvoice().getInsurancePlan());
			}else {
				labTest.setInsurancePlan(null);
			}
			
			if(c.isPresent()) {
				doctorLabTests.add(labTest); //deactivate this snippet later, activate the below
			}
			
		}
		
		return ResponseEntity.ok().body(doctorLabTests);
	}
	
}

@Data
class ConsultationReportArgs {
	LocalDate from;
	LocalDate to;
}

@Data
class ProcedureReportArgs {
	LocalDate from;
	LocalDate to;
}

@Data
class RadiologyReportArgs {
	LocalDate from;
	LocalDate to;
}

@Data
class LabTestReportArgs {
	LocalDate from;
	LocalDate to;
}






