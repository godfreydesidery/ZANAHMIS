/**
 * 
 */
package com.orbix.api.api;

import java.net.URI;
import java.util.ArrayList;
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

import com.orbix.api.domain.Medicine;
import com.orbix.api.domain.Medicine;
import com.orbix.api.repositories.InsurancePlanRepository;
import com.orbix.api.repositories.MedicineRepository;
import com.orbix.api.repositories.MedicineRepository;
import com.orbix.api.service.InsurancePlanService;
import com.orbix.api.service.MedicineService;
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
@Transactional
public class MedicineResource {
	private final MedicineRepository medicineRepository;
	private final MedicineService medicineService;
	
	@GetMapping("/medicines")
	public ResponseEntity<List<Medicine>>getMedicines(){
		return ResponseEntity.ok().body(medicineService.getMedicines());
	}
	
	@GetMapping("/medicines/get")
	public ResponseEntity<Medicine> getMedicine(
			@RequestParam(name = "id") Long id){
		return ResponseEntity.ok().body(medicineService.getMedicineById(id));
	}
	
	@GetMapping("/medicines/get_names")
	public ResponseEntity<List<String>> getMedicineNames(){
		List<String> names = new ArrayList<String>();
		names = medicineRepository.getNames();
		return ResponseEntity.ok().body(names);
	}
	
	@PostMapping("/medicines/save")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<Medicine>save(
			@RequestBody Medicine medicine){
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/medicines/save").toUriString());
		return ResponseEntity.created(uri).body(medicineService.save(medicine));
	}
}
