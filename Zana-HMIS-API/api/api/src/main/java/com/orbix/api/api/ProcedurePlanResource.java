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
import com.orbix.api.domain.ProcedureType;
import com.orbix.api.domain.ProcedureTypePlanPrice;
import com.orbix.api.repositories.InsuranceProviderRepository;
import com.orbix.api.service.InsuranceProviderService;
import com.orbix.api.service.ProcedureTypePlanService;

import lombok.RequiredArgsConstructor;

/**
 * @author Godfrey
 *
 */
@RestController
@RequestMapping("/zana-hmis-api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProcedurePlanResource {
	private final InsuranceProviderService insuranceProviderService;
	private final ProcedureTypePlanService procedureTypePlanService;
	
	@PostMapping("/procedure_type_plans/save")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<ProcedureTypePlanPrice>save(
			@RequestBody InsurancePlan insurancePlan, 
			@RequestBody ProcedureType procedureType,
			double price){
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/procedure_type_plans/save").toUriString());
		return ResponseEntity.created(uri).body(procedureTypePlanService.save(insurancePlan, procedureType, price));
	}
}
