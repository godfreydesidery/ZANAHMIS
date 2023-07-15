/**
 * 
 */
package com.orbix.api.api;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.ConsultationPlanPrice;
import com.orbix.api.repositories.InsurancePlanRepository;
import com.orbix.api.repositories.InsuranceProviderRepository;
import com.orbix.api.repositories.ClinicRepository;
import com.orbix.api.repositories.ConsultationPlanPriceRepository;
import com.orbix.api.service.InsuranceProviderService;

import lombok.RequiredArgsConstructor;

/**
 * @author Godfrey
 *
 */
@RestController
@RequestMapping("/zana-hmis-api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ConsultationPlanResource {
	private final InsuranceProviderService insuranceProviderService;
	private final InsuranceProviderRepository insuranceProviderRepository;
	private final ConsultationPlanPriceRepository consultationPlanPriceRepository;
	private final InsurancePlanRepository insurancePlanRepository;
	private final ClinicRepository clinicRepository;
	
	@GetMapping("/consultation_plan_prices")
	public ResponseEntity<List<ConsultationPlanPrice>>getConsultationPlanPrices(){
		return ResponseEntity.ok().body(consultationPlanPriceRepository.findAll());
	}
	
	@GetMapping("/consultation_plan_prices/get")
	public ResponseEntity<ConsultationPlanPrice> getConsultationPlanPrice(
			@RequestParam(name = "id") Long id){
		return ResponseEntity.ok().body(consultationPlanPriceRepository.findById(id).get());
	}
	
	@PostMapping("/consultation_plan_prices/save")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<ConsultationPlanPrice>save(
			@RequestBody ConsultationPlanPrice consultationPlan){
		ConsultationPlanPrice conPlan = new ConsultationPlanPrice();
		conPlan.setId(consultationPlan.getId());
		
		InsurancePlan plan = insurancePlanRepository.findByName(consultationPlan.getInsurancePlan().getName()).get();
		Clinic clinic = clinicRepository.findByName(consultationPlan.getClinic().getName()).get();
		conPlan.setInsurancePlan(plan);
		conPlan.setClinic(clinic);
		conPlan.setConsultationFee(consultationPlan.getConsultationFee());
		
		if(consultationPlan.getId() == null) {
			if(consultationPlanPriceRepository.findByInsurancePlanAndClinic(plan, clinic).isPresent()) {
				throw new InvalidOperationException("Could not create plan, a similar plan already exist. Please consider ediiting the existing plan");
			}
		}
				
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/consultation_plan_prices/save").toUriString());
		return ResponseEntity.created(uri).body(consultationPlanPriceRepository.saveAndFlush(conPlan));
	}
	
	@PostMapping("/consultation_plan_prices/delete")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<Boolean>delete(
			@RequestParam Long id){
		
		
		ConsultationPlanPrice plan = consultationPlanPriceRepository.findById(id).get();
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/consultation_plan_prices/delete").toUriString());
		consultationPlanPriceRepository.delete(plan);
		return ResponseEntity.created(uri).body(true);
		
	}
}
