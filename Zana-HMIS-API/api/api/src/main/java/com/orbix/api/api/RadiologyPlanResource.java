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
import com.orbix.api.domain.RadiologyType;
import com.orbix.api.domain.RadiologyTypePlanPrice;
import com.orbix.api.service.InsuranceProviderService;
import com.orbix.api.service.RadiologyTypePlanService;

import lombok.RequiredArgsConstructor;

/**
 * @author Godfrey
 *
 */
@RestController
@RequestMapping("/zana-hmis-api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RadiologyPlanResource {
	private final InsuranceProviderService insuranceProviderService;
	private final RadiologyTypePlanService radiologyTypePlanService;
	
	@PostMapping("/radiology_type_plans/save")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<RadiologyTypePlanPrice>save(
			@RequestBody InsurancePlan insurancePlan, 
			@RequestBody RadiologyType radiologyType,
			double price){
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/radiology_type_plans/save").toUriString());
		return ResponseEntity.created(uri).body(radiologyTypePlanService.save(insurancePlan, radiologyType, price));
	}
}
