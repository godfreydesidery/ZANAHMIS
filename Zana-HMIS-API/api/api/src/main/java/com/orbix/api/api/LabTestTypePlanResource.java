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

import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.LabTestTypePlanPrice;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.InsuranceProvider;
import com.orbix.api.domain.LabTestType;
import com.orbix.api.domain.LabTestTypePlanPrice;
import com.orbix.api.repositories.ClinicRepository;
import com.orbix.api.repositories.LabTestTypePlanPriceRepository;
import com.orbix.api.repositories.LabTestTypeRepository;
import com.orbix.api.repositories.InsurancePlanRepository;
import com.orbix.api.repositories.InsuranceProviderRepository;
import com.orbix.api.repositories.LabTestTypePlanPriceRepository;
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
@Transactional
public class LabTestTypePlanResource {
	private final InsuranceProviderService insuranceProviderService;
	private final InsuranceProviderRepository insuranceProviderRepository;
	private final LabTestTypePlanPriceRepository labTestTypePlanPriceRepository;
	private final InsurancePlanRepository insurancePlanRepository;
	private final LabTestTypeRepository labTestTypeRepository;
	
	@GetMapping("/lab_test_type_plan_prices")
	public ResponseEntity<List<LabTestTypePlanPrice>>getLabTestTypePlanPrices(){
		return ResponseEntity.ok().body(labTestTypePlanPriceRepository.findAll());
	}
	
	@GetMapping("/lab_test_type_plan_prices/get")
	public ResponseEntity<LabTestTypePlanPrice> getLabTestTypePlanPrice(
			@RequestParam(name = "id") Long id){
		return ResponseEntity.ok().body(labTestTypePlanPriceRepository.findById(id).get());
	}
	
	@PostMapping("/lab_test_type_plan_prices/save")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<LabTestTypePlanPrice>save(
			@RequestBody LabTestTypePlanPrice labTestTypePlan){
		LabTestTypePlanPrice conPlan = new LabTestTypePlanPrice();
		conPlan.setId(labTestTypePlan.getId());
		
		InsurancePlan plan = insurancePlanRepository.findByName(labTestTypePlan.getInsurancePlan().getName()).get();
		LabTestType labTestType = labTestTypeRepository.findByName(labTestTypePlan.getLabTestType().getName()).get();
		conPlan.setInsurancePlan(plan);
		conPlan.setLabTestType(labTestType);
		conPlan.setPrice(labTestTypePlan.getPrice());
		
		if(labTestTypePlan.getId() == null) {
			if(labTestTypePlanPriceRepository.findByInsurancePlanAndLabTestType(plan, labTestType).isPresent()) {
				throw new InvalidOperationException("Could not create plan, a similar plan already exist. Please consider ediiting the existing plan");
			}
		}
				
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/lab_test_type_plan_prices/save").toUriString());
		return ResponseEntity.created(uri).body(labTestTypePlanPriceRepository.saveAndFlush(conPlan));
	}
	
	@PostMapping("/lab_test_type_plan_prices/delete")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<Boolean>delete(
			@RequestParam Long id){
		
		
		LabTestTypePlanPrice plan = labTestTypePlanPriceRepository.findById(id).get();
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/labTestType_plan_prices/delete").toUriString());
		labTestTypePlanPriceRepository.delete(plan);
		return ResponseEntity.created(uri).body(true);
		
	}
}
