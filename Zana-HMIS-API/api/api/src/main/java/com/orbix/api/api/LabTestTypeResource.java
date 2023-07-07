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

import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.LabTestType;
import com.orbix.api.repositories.ClinicRepository;
import com.orbix.api.repositories.LabTestTypeRepository;
import com.orbix.api.service.ClinicService;
import com.orbix.api.service.LabTestTypeService;

import lombok.RequiredArgsConstructor;

/**
 * @author Godfrey
 *
 */
@RestController
@RequestMapping("/zana-hmis-api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LabTestTypeResource {
	private final LabTestTypeRepository labTestTypeRepository;
	private final LabTestTypeService labTestTypeService;
	
	@GetMapping("/lab_test_types")
	public ResponseEntity<List<LabTestType>>getLabTestTypes(){
		return ResponseEntity.ok().body(labTestTypeService.getLabTestTypes());
	}
	
	@GetMapping("/lab_test_types/get")
	public ResponseEntity<LabTestType> getLabTestType(
			@RequestParam(name = "id") Long id){
		return ResponseEntity.ok().body(labTestTypeService.getLabTestTypeById(id));
	}
	
	@GetMapping("/lab_test_types/get_names")
	public ResponseEntity<List<String>> getLabTestTypeNames(){
		List<String> names = new ArrayList<String>();
		names = labTestTypeRepository.getNames();
		return ResponseEntity.ok().body(names);
	}
	
	@PostMapping("/lab_test_types/save")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<LabTestType>save(
			@RequestBody LabTestType labTestType){
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/lab_test_types/save").toUriString());
		return ResponseEntity.created(uri).body(labTestTypeService.save(labTestType));
	}	
}
