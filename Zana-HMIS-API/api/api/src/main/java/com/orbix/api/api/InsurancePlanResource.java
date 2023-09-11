/**
 * 
 */
package com.orbix.api.api;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
import com.orbix.api.domain.LabTestType;
import com.orbix.api.domain.LabTestTypeInsurancePlan;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.exceptions.NotFoundException;
import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.repositories.InsurancePlanRepository;
import com.orbix.api.repositories.InsuranceProviderRepository;
import com.orbix.api.repositories.LabTestTypeInsurancePlanRepository;
import com.orbix.api.repositories.LabTestTypeRepository;
import com.orbix.api.repositories.InsurancePlanRepository;
import com.orbix.api.service.DayService;
import com.orbix.api.service.InsurancePlanService;
import com.orbix.api.service.UserService;
import com.orbix.api.service.InsurancePlanService;

import lombok.Data;
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
	private final LabTestTypeRepository labTestTypeRepository;
	private final LabTestTypeInsurancePlanRepository labTestTypeInsurancePlanRepository;
	
	
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
	
	@GetMapping("/insurance_plans/get_lab_test_type_cash_prices")
	public ResponseEntity<List<LabTestType>> getLabTestTypeCashPrices(
			HttpServletRequest request){
		return ResponseEntity.ok().body(labTestTypeRepository.findAll());
	}
	
	@GetMapping("/insurance_plans/get_lab_test_type_prices")
	public ResponseEntity<List<LLabTestTypePrice>> getLabTestTypePrices(
			@RequestParam(name = "insurance_plan_id") Long insurancePlanId,
			HttpServletRequest request){
		List<LLabTestTypePrice> labTestTypePrices = new ArrayList<>();
		List<LabTestType> labTestTypes = labTestTypeRepository.findAll();
		for(LabTestType t : labTestTypes) {
			LLabTestTypePrice labTestTypePrice = new LLabTestTypePrice();
			labTestTypePrice.setLabTestType(t);
			if(insurancePlanId == 0) {
				labTestTypePrice.setPrice(t.getPrice());
			}else if(insurancePlanId > 0) {
				Optional<InsurancePlan> i = insurancePlanRepository.findById(insurancePlanId);
				if(i.isEmpty()) {
					throw new NotFoundException("Insurance plan package not found");
				}
				Optional<LabTestTypeInsurancePlan> p = labTestTypeInsurancePlanRepository.findByLabTestTypeAndInsurancePlan(t, i.get());
				LabTestTypeInsurancePlan plan;
				if(p.isEmpty()) {
					//create
					plan = new LabTestTypeInsurancePlan();
					plan.setActive(true);
					plan.setCovered(false);
					plan.setPrice(0);
					plan.setInsurancePlan(i.get());
					plan.setLabTestType(t);
					
					plan.setCreatedby(userService.getUserId(request));
					plan.setCreatedOn(dayService.getDayId());
					plan.setCreatedAt(LocalDateTime.now());
					
					plan = labTestTypeInsurancePlanRepository.save(plan);
				}else {
					plan = p.get();
				}
				labTestTypePrice.setLabTestTypeInsurancePlan(plan);
				labTestTypePrice.setPrice(plan.getPrice());
			}else {
				throw new InvalidOperationException("Invalid plan package selected");
			}
			labTestTypePrices.add(labTestTypePrice);
		}
		return ResponseEntity.ok().body(labTestTypePrices);
	}
	
	@PostMapping("/insurance_plans/change_lab_test_type_coverage")
	public ResponseEntity<LLabTestTypePrice> changeLabTestTypeCoverage(
			@RequestBody LLabTestTypePrice labTestTypePrice,
			HttpServletRequest request){
		Optional<LabTestType> tt = labTestTypeRepository.findById(labTestTypePrice.getLabTestType().getId());
		if(tt.isEmpty()) {
			throw new NotFoundException("Could not find lab test");
		}
		Optional<InsurancePlan> ip = insurancePlanRepository.findById(labTestTypePrice.getLabTestTypeInsurancePlan().getInsurancePlan().getId());
		if(ip.isEmpty()) {
			throw new NotFoundException("Could not find insurance plan");
		}
		boolean covered = labTestTypePrice.getLabTestTypeInsurancePlan().isCovered();
		Optional<LabTestTypeInsurancePlan> lttip = labTestTypeInsurancePlanRepository.findByInsurancePlanAndLabTestType(ip.get(), tt.get());
		if(lttip.isEmpty()) {
			throw new NotFoundException("Test Type insurance plan not found");
		}
		if(covered == true) {
			if(lttip.get().getPrice() <= 0) {
				throw new InvalidOperationException("Could not change coverage. Invalid price value. Price should be more than zero");
			}
		}
		lttip.get().setCovered(covered);
		LabTestTypeInsurancePlan plan = labTestTypeInsurancePlanRepository.save(lttip.get());
		
		LLabTestTypePrice coverage = new LLabTestTypePrice();
		coverage.setLabTestType(tt.get());
		coverage.setLabTestTypeInsurancePlan(plan);
		coverage.setPrice(plan.getPrice());
		
		
		return ResponseEntity.ok().body(coverage);
	}
	
	@PostMapping("/insurance_plans/update_lab_test_type_price_by_insurance")
	public ResponseEntity<LLabTestTypePrice> updateLabTestTypePriceByInsurance(
			@RequestBody LLabTestTypePrice labTestTypePrice,
			HttpServletRequest request){
		Optional<LabTestType> tt = labTestTypeRepository.findById(labTestTypePrice.getLabTestType().getId());
		if(tt.isEmpty()) {
			throw new NotFoundException("Could not find lab test");
		}
		Optional<InsurancePlan> ip = insurancePlanRepository.findById(labTestTypePrice.getLabTestTypeInsurancePlan().getInsurancePlan().getId());
		if(ip.isEmpty()) {
			throw new NotFoundException("Could not find insurance plan");
		}
		double price = labTestTypePrice.getLabTestTypeInsurancePlan().getPrice();
		Optional<LabTestTypeInsurancePlan> lttip = labTestTypeInsurancePlanRepository.findByInsurancePlanAndLabTestType(ip.get(), tt.get());
		if(lttip.isEmpty()) {
			throw new NotFoundException("Test Type insurance plan not found");
		}
		if(price == 0) {
			lttip.get().setCovered(false);
		}else if(price < 0) {
			throw new InvalidOperationException("Invalid Price value. Price should not be less than zero");
		}
		lttip.get().setPrice(price);
		
		LabTestTypeInsurancePlan plan = labTestTypeInsurancePlanRepository.save(lttip.get());
		
		LLabTestTypePrice coverage = new LLabTestTypePrice();
		coverage.setLabTestType(tt.get());
		coverage.setLabTestTypeInsurancePlan(plan);
		coverage.setPrice(plan.getPrice());
		
		return ResponseEntity.ok().body(coverage);
	}
	
}

@Data
class LLabTestTypePrice{
	LabTestType labTestType = null;
	LabTestTypeInsurancePlan labTestTypeInsurancePlan = null;
	double price;
}

