/**
 * 
 */
package com.orbix.api.api;

import java.net.URI;
import java.util.List;

import javax.transaction.Transactional;

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
import com.orbix.api.domain.RadiologyType;
import com.orbix.api.domain.RadiologyTypePlanPrice;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.domain.RadiologyType;
import com.orbix.api.domain.RadiologyTypePlanPrice;
import com.orbix.api.repositories.InsurancePlanRepository;
import com.orbix.api.repositories.InsuranceProviderRepository;
import com.orbix.api.repositories.RadiologyTypePlanPriceRepository;
import com.orbix.api.repositories.RadiologyTypeRepository;
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
@Transactional
public class RadiologyPlanResource {
	private final InsuranceProviderService insuranceProviderService;
	private final InsuranceProviderRepository insuranceProviderRepository;
	private final RadiologyTypePlanPriceRepository radiologyTypePlanPriceRepository;
	private final InsurancePlanRepository insurancePlanRepository;
	private final RadiologyTypeRepository radiologyTypeRepository;
	
	@GetMapping("/radiology_type_plan_prices")
	public ResponseEntity<List<RadiologyTypePlanPrice>>getRadiologyTypePlanPrices(){
		return ResponseEntity.ok().body(radiologyTypePlanPriceRepository.findAll());
	}
	
	@GetMapping("/radiology_type_plan_prices/get")
	public ResponseEntity<RadiologyTypePlanPrice> getRadiologyTypePlanPrice(
			@RequestParam(name = "id") Long id){
		return ResponseEntity.ok().body(radiologyTypePlanPriceRepository.findById(id).get());
	}
	
	@PostMapping("/radiology_type_plan_prices/save")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<RadiologyTypePlanPrice>save(
			@RequestBody RadiologyTypePlanPrice radiologyTypePlan){
		RadiologyTypePlanPrice conPlan = new RadiologyTypePlanPrice();
		conPlan.setId(radiologyTypePlan.getId());
		
		InsurancePlan plan = insurancePlanRepository.findByName(radiologyTypePlan.getInsurancePlan().getName()).get();
		RadiologyType radiologyType = radiologyTypeRepository.findByName(radiologyTypePlan.getRadiologyType().getName());
		conPlan.setInsurancePlan(plan);
		conPlan.setRadiologyType(radiologyType);
		conPlan.setPrice(radiologyTypePlan.getPrice());
		
		if(radiologyTypePlan.getId() == null) {
			if(radiologyTypePlanPriceRepository.findByInsurancePlanAndRadiologyType(plan, radiologyType).isPresent()) {
				throw new InvalidOperationException("Could not create plan, a similar plan already exist. Please consider ediiting the existing plan");
			}
		}
				
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/radiology_type_plan_prices/save").toUriString());
		return ResponseEntity.created(uri).body(radiologyTypePlanPriceRepository.saveAndFlush(conPlan));
	}
	
	@PostMapping("/radiology_type_plan_prices/delete")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<Boolean>delete(
			@RequestParam Long id){
		
		
		RadiologyTypePlanPrice plan = radiologyTypePlanPriceRepository.findById(id).get();
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/radiologyType_plan_prices/delete").toUriString());
		radiologyTypePlanPriceRepository.delete(plan);
		return ResponseEntity.created(uri).body(true);
		
	}
}
