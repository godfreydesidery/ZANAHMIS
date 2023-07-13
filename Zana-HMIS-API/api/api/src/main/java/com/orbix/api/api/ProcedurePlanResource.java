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
import com.orbix.api.domain.ProcedureType;
import com.orbix.api.domain.ProcedureTypePlanPrice;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.domain.ProcedureType;
import com.orbix.api.domain.ProcedureTypePlanPrice;
import com.orbix.api.repositories.InsurancePlanRepository;
import com.orbix.api.repositories.InsuranceProviderRepository;
import com.orbix.api.repositories.ProcedureTypePlanPriceRepository;
import com.orbix.api.repositories.ProcedureTypeRepository;
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
	private final InsuranceProviderRepository insuranceProviderRepository;
	private final ProcedureTypePlanPriceRepository procedureTypePlanPriceRepository;
	private final InsurancePlanRepository insurancePlanRepository;
	private final ProcedureTypeRepository procedureTypeRepository;
	
	@GetMapping("/procedure_type_plan_prices")
	public ResponseEntity<List<ProcedureTypePlanPrice>>getProcedureTypePlanPrices(){
		return ResponseEntity.ok().body(procedureTypePlanPriceRepository.findAll());
	}
	
	@GetMapping("/procedure_type_plan_prices/get")
	public ResponseEntity<ProcedureTypePlanPrice> getProcedureTypePlanPrice(
			@RequestParam(name = "id") Long id){
		return ResponseEntity.ok().body(procedureTypePlanPriceRepository.findById(id).get());
	}
	
	@PostMapping("/procedure_type_plan_prices/save")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<ProcedureTypePlanPrice>save(
			@RequestBody ProcedureTypePlanPrice procedureTypePlan){
		ProcedureTypePlanPrice conPlan = new ProcedureTypePlanPrice();
		conPlan.setId(procedureTypePlan.getId());
		
		InsurancePlan plan = insurancePlanRepository.findByName(procedureTypePlan.getInsurancePlan().getName());
		ProcedureType procedureType = procedureTypeRepository.findByName(procedureTypePlan.getProcedureType().getName());
		conPlan.setInsurancePlan(plan);
		conPlan.setProcedureType(procedureType);
		conPlan.setPrice(procedureTypePlan.getPrice());
		
		if(procedureType.getId() == null) {
			if(procedureTypePlanPriceRepository.findByInsurancePlanAndProcedureType(plan, procedureType).isPresent()) {
				throw new InvalidOperationException("Could not create plan, a similar plan already exist. Please consider ediiting the existing plan");
			}
		}
				
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/procedure_type_plan_prices/save").toUriString());
		return ResponseEntity.created(uri).body(procedureTypePlanPriceRepository.saveAndFlush(conPlan));
	}
	
	@PostMapping("/procedure_type_plan_prices/delete")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<Boolean>delete(
			@RequestParam Long id){
		
		
		ProcedureTypePlanPrice plan = procedureTypePlanPriceRepository.findById(id).get();
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/procedureType_plan_prices/delete").toUriString());
		procedureTypePlanPriceRepository.delete(plan);
		return ResponseEntity.created(uri).body(true);
		
	}
}