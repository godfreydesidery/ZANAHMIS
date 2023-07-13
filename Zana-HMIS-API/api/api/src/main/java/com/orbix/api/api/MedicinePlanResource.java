/**
 * 
 */
package com.orbix.api.api;

import java.net.URI;
import java.util.ArrayList;
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
import com.orbix.api.domain.Medicine;
import com.orbix.api.domain.MedicinePlanPrice;
import com.orbix.api.domain.ProcedureType;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.domain.Medicine;
import com.orbix.api.domain.MedicinePlanPrice;
import com.orbix.api.repositories.InsurancePlanRepository;
import com.orbix.api.repositories.InsuranceProviderRepository;
import com.orbix.api.repositories.MedicineRepository;
import com.orbix.api.repositories.ProcedureTypeRepository;
import com.orbix.api.repositories.MedicinePlanPriceRepository;
import com.orbix.api.repositories.MedicineRepository;
import com.orbix.api.service.InsuranceProviderService;
import com.orbix.api.service.MedicinePlanService;
import com.orbix.api.service.MedicineService;
import com.orbix.api.service.ProcedureTypeService;

import lombok.RequiredArgsConstructor;

/**
 * @author Godfrey
 *
 */
@RestController
@RequestMapping("/zana-hmis-api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MedicinePlanResource {
	private final InsuranceProviderService insuranceProviderService;
	private final InsuranceProviderRepository insuranceProviderRepository;
	private final MedicinePlanPriceRepository medicinePlanPriceRepository;
	private final InsurancePlanRepository insurancePlanRepository;
	private final MedicineRepository medicineRepository;
	
	@GetMapping("/medicine_plan_prices")
	public ResponseEntity<List<MedicinePlanPrice>>getMedicinePlanPrices(){
		return ResponseEntity.ok().body(medicinePlanPriceRepository.findAll());
	}
	
	@GetMapping("/medicine_plan_prices/get")
	public ResponseEntity<MedicinePlanPrice> getMedicinePlanPrice(
			@RequestParam(name = "id") Long id){
		return ResponseEntity.ok().body(medicinePlanPriceRepository.findById(id).get());
	}
	
	@PostMapping("/medicine_plan_prices/save")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<MedicinePlanPrice>save(
			@RequestBody MedicinePlanPrice medicinePlan){
		MedicinePlanPrice conPlan = new MedicinePlanPrice();
		conPlan.setId(medicinePlan.getId());
		
		InsurancePlan plan = insurancePlanRepository.findByName(medicinePlan.getInsurancePlan().getName());
		Medicine medicine = medicineRepository.findByName(medicinePlan.getMedicine().getName());
		conPlan.setInsurancePlan(plan);
		conPlan.setMedicine(medicine);
		conPlan.setPrice(medicinePlan.getPrice());
		
		if(medicinePlan.getId() == null) {
			if(medicinePlanPriceRepository.findByInsurancePlanAndMedicine(plan, medicine).isPresent()) {
				throw new InvalidOperationException("Could not create plan, a similar plan already exist. Please consider ediiting the existing plan");
			}
		}
				
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/medicine_plan_prices/save").toUriString());
		return ResponseEntity.created(uri).body(medicinePlanPriceRepository.saveAndFlush(conPlan));
	}
	
	@PostMapping("/medicine_plan_prices/delete")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<Boolean>delete(
			@RequestParam Long id){
		
		
		MedicinePlanPrice plan = medicinePlanPriceRepository.findById(id).get();
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/medicine_plan_prices/delete").toUriString());
		medicinePlanPriceRepository.delete(plan);
		return ResponseEntity.created(uri).body(true);
		
	}
}
