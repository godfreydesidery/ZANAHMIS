/**
 * 
 */
package com.orbix.api.api;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.orbix.api.domain.RegistrationPlanPrice;
import com.orbix.api.exceptions.InvalidOperationException;
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
@Transactional
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
			@RequestBody RegistrationPlanPrice registrationPlan){
		RegistrationPlanPrice regPlan = new RegistrationPlanPrice();
		regPlan.setId(registrationPlan.getId());
		
		InsurancePlan plan = insurancePlanRepository.findByName(registrationPlan.getInsurancePlan().getName()).get();
		regPlan.setInsurancePlan(plan);
		regPlan.setRegistrationFee(registrationPlan.getRegistrationFee());
		
		if(registrationPlan.getId() == null) {
			if(registrationPlanPriceRepository.findByInsurancePlan(plan).isPresent()) {
				throw new InvalidOperationException("Could not create plan, a similar plan already exist. Please consider ediiting the existing plan");
			}
		}
				
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/registration_plan_prices/save").toUriString());
		return ResponseEntity.created(uri).body(registrationPlanPriceRepository.saveAndFlush(regPlan));
	}
	
	@PostMapping("/registration_plan_prices/delete")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<Boolean>delete(
			@RequestParam Long id){
		
		
		RegistrationPlanPrice plan = registrationPlanPriceRepository.findById(id).get();
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/registration_plan_prices/delete").toUriString());
		registrationPlanPriceRepository.delete(plan);
		return ResponseEntity.created(uri).body(true);
		
	}
}
