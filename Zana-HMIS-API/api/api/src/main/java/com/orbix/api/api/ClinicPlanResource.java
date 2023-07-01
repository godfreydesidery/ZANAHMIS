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
import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.ClinicPlanPrice;
import com.orbix.api.repositories.ClinicRepository;
import com.orbix.api.service.ClinicService;
import com.orbix.api.service.InsuranceProviderService;
import com.orbix.api.service.ClinicPlanService;

import lombok.RequiredArgsConstructor;

/**
 * @author Godfrey
 *
 */
@RestController
@RequestMapping("/zana-hmis-api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ClinicPlanResource {
	private final InsuranceProviderService insuranceProviderService;
	private final ClinicPlanService clinicPlanService;
	
	@PostMapping("/clinic_plans/save")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<ClinicPlanPrice>save(
			@RequestBody InsurancePlan insurancePlan, 
			@RequestBody Clinic clinic,
			double price){
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/clinic_plans/save").toUriString());
		return ResponseEntity.created(uri).body(clinicPlanService.save(insurancePlan, clinic, price));
	}
}
