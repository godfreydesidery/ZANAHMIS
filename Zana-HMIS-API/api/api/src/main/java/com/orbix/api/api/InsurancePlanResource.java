/**
 * 
 */
package com.orbix.api.api;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.orbix.api.api.accessories.Sanitizer;
import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.InsuranceProvider;
import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.repositories.InsurancePlanRepository;
import com.orbix.api.repositories.InsuranceProviderRepository;
import com.orbix.api.repositories.InsurancePlanRepository;
import com.orbix.api.service.DayService;
import com.orbix.api.service.InsurancePlanService;
import com.orbix.api.service.UserService;
import com.orbix.api.service.InsurancePlanService;

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
public class InsurancePlanResource {
	private final InsuranceProviderRepository insuranceProviderRepository;
	private final InsurancePlanRepository insurancePlanRepository;
	private final InsurancePlanService insurancePlanService;
	private final UserService userService;
	private final DayService dayService;
	
	
	@GetMapping("/insurance_plans")
	public ResponseEntity<List<InsurancePlan>>getInsurancePlans(HttpServletRequest request){
		return ResponseEntity.ok().body(insurancePlanService.getInsurancePlans(request));
	}
	
	@GetMapping("/insurance_plans/get")
	public ResponseEntity<InsurancePlan> getInsurancePlan(
			@RequestParam(name = "id") Long id,
			HttpServletRequest request){
		return ResponseEntity.ok().body(insurancePlanService.getInsurancePlanById(id, request));
	}
	
	@GetMapping("/insurance_plans/get_names")
	public ResponseEntity<List<String>> getInsurancePlanNames(HttpServletRequest request){
		List<String> names = new ArrayList<String>();
		names = insurancePlanRepository.getNames();
		return ResponseEntity.ok().body(names);
	}
	
	@GetMapping("/insurance_plans/get_names_by_insurance_provider")
	public ResponseEntity<List<String>> getInsurancePlanNames(
			@RequestParam(name = "provider_name") String providerName,
			HttpServletRequest request){
		List<String> names = new ArrayList<String>();
		InsuranceProvider insuranceProvider = insuranceProviderRepository.findByName(providerName);
		List<InsurancePlan> plans = insurancePlanRepository.findAllByInsuranceProvider(insuranceProvider);
		for(InsurancePlan p : plans) {
			names.add(p.getName());
		}
		return ResponseEntity.ok().body(names);
	}
	
	@PostMapping("/insurance_plans/save")
	@PreAuthorize("hasAnyAuthority('ADMIN-A')")
	public ResponseEntity<InsurancePlan>save(
			@RequestBody InsurancePlan insurancePlan,
			HttpServletRequest request){
		InsuranceProvider insuranceProvider = insuranceProviderRepository.findByName(insurancePlan.getInsuranceProvider().getName());
		insurancePlan.setInsuranceProvider(insuranceProvider);
		insurancePlan.setName(insurancePlan.getName());
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/insurance_plans/save").toUriString());
		return ResponseEntity.created(uri).body(insurancePlanService.save(insurancePlan, request));
	}
}

