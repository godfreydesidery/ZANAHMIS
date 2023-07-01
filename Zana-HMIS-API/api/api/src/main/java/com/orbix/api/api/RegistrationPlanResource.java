/**
 * 
 */
package com.orbix.api.api;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.RegistrationPlanPrice;
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
	
	@PostMapping("/registration_plans/save")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<RegistrationPlanPrice>save(
			@RequestBody InsurancePlan insurancePlan, 
			double price){
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/registration_plans/save").toUriString());
		return ResponseEntity.created(uri).body(registrationPlanService.save(insurancePlan, price));
	}
}
