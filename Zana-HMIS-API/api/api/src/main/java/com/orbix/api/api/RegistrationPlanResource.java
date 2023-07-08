/**
 * 
 */
package com.orbix.api.api;

import java.net.URI;
import java.util.ArrayList;
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

import com.orbix.api.domain.RegistrationPlanPrice;
import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.InsuranceProvider;
import com.orbix.api.repositories.RegistrationPlanPriceRepository;
import com.orbix.api.repositories.InsurancePlanRepository;
import com.orbix.api.repositories.InsuranceProviderRepository;
import com.orbix.api.service.InsuranceProviderService;
import com.orbix.api.service.RegistrationPlanService;

import lombok.RequiredArgsConstructor;

/**
 * @author Godfrey
 *
 */
@RestController
@RequestMapping("/zana-hmis-api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RegistrationPlanResource {
	private final InsuranceProviderService insuranceProviderService;
	private final RegistrationPlanService registrationPlanService;
	private final InsuranceProviderRepository insuranceProviderRepository;
	private final RegistrationPlanPriceRepository registrationPlanPriceRepository;
	private final InsurancePlanRepository insurancePlanRepository;
	
	@GetMapping("/registration_plan_prices")
	public ResponseEntity<List<RegistrationPlanPrice>>getRegistrationPlanPrices(){
		return ResponseEntity.ok().body(registrationPlanPriceRepository.findAll());
	}
	
	@GetMapping("/registration_plan_prices/get")
	public ResponseEntity<RegistrationPlanPrice> getRegistrationPlanPrice(
			@RequestParam(name = "id") Long id){
		return ResponseEntity.ok().body(registrationPlanPriceRepository.findById(id).get());
	}
	
	@PostMapping("/registration_plan_prices/save")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<RegistrationPlanPrice>save(
			@RequestBody RegistrationPlanPrice registrationPlanPrice, 
			@RequestBody InsurancePlan insurancePlan, 
			@RequestBody double registrationFee){
		
		InsurancePlan plan = insurancePlanRepository.findByName(insurancePlan.getName());
		registrationPlanPrice.setInsurancePlan(plan);
		registrationPlanPrice.setRegistrationFee(registrationFee);
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/registration_plan_prices/save").toUriString());
		return ResponseEntity.created(uri).body(registrationPlanPriceRepository.save(registrationPlanPrice));
	}
}
