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
import com.orbix.api.domain.InsuranceProvider;
import com.orbix.api.domain.LabTestType;
import com.orbix.api.domain.LabTestTypePlanPrice;
import com.orbix.api.repositories.InsuranceProviderRepository;
import com.orbix.api.service.InsuranceProviderService;
import com.orbix.api.service.LabTestTypePlanService;

import lombok.RequiredArgsConstructor;

/**
 * @author Godfrey
 *
 */
@RestController
@RequestMapping("/zana-hmis-api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LabTestPlanResource {
	private final InsuranceProviderRepository insuranceProviderRepository;
	private final InsuranceProviderService insuranceProviderService;
	private final LabTestTypePlanService labTestTypePlanService;
	
	@PostMapping("/lab_test_type_plans/save")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<LabTestTypePlanPrice>save(
			@RequestBody InsurancePlan insurancePlan, 
			@RequestBody LabTestType labTestType,
			double price){
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/lab_test_type_plans/save").toUriString());
		return ResponseEntity.created(uri).body(labTestTypePlanService.save(insurancePlan, labTestType, price));
	}
}
