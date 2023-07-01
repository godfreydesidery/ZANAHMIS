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
import com.orbix.api.domain.Medicine;
import com.orbix.api.domain.MedicinePlanPrice;
import com.orbix.api.repositories.MedicineRepository;
import com.orbix.api.service.InsuranceProviderService;
import com.orbix.api.service.MedicinePlanService;
import com.orbix.api.service.MedicineService;

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
	private final MedicinePlanService medicinePlanService;
	
	@PostMapping("/medicine_plans/save")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<MedicinePlanPrice>save(
			@RequestBody InsurancePlan insurancePlan, 
			@RequestBody Medicine medicine,
			double price){
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/medicine_plans/save").toUriString());
		return ResponseEntity.created(uri).body(medicinePlanService.save(insurancePlan, medicine, price));
	}
}
