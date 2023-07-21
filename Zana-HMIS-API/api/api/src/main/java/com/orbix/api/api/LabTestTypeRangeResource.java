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

import com.orbix.api.domain.LabTestTypeRange;
import com.orbix.api.domain.LabTestType;
import com.orbix.api.repositories.LabTestTypeRangeRepository;
import com.orbix.api.repositories.LabTestTypeRepository;
import com.orbix.api.service.LabTestTypeRangeService;

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
public class LabTestTypeRangeResource {
	private final LabTestTypeRepository labTestTypeRepository;
	private final LabTestTypeRangeRepository labTestTypeRangeRepository;
	private final LabTestTypeRangeService labTestTypeRangeService;
	
	@GetMapping("/lab_test_type_ranges")
	public ResponseEntity<List<LabTestTypeRange>>getLabTestTypeRanges(){
		return ResponseEntity.ok().body(labTestTypeRangeService.getLabTestTypeRanges());
	}
	
	@GetMapping("/lab_test_type_ranges/get")
	public ResponseEntity<LabTestTypeRange> getLabTestTypeRange(
			@RequestParam(name = "id") Long id){
		return ResponseEntity.ok().body(labTestTypeRangeService.getLabTestTypeRangeById(id));
	}
	
	@GetMapping("/lab_test_type_ranges/get_names")
	public ResponseEntity<List<String>> getLabTestTypeRangeNames(){
		List<String> names = new ArrayList<String>();
		names = labTestTypeRangeRepository.getNames();
		return ResponseEntity.ok().body(names);
	}
	
	@GetMapping("/lab_test_type_ranges/get_names_by_insurance_provider")
	public ResponseEntity<List<String>> getLabTestTypeRangeNames(
			@RequestParam(name = "lab_test_type_name") String providerName){
		List<String> names = new ArrayList<String>();
		LabTestType labTestType = labTestTypeRepository.findByName(providerName).get();
		List<LabTestTypeRange> plans = labTestTypeRangeRepository.findAllByLabTestType(labTestType);
		for(LabTestTypeRange p : plans) {
			names.add(p.getName());
		}
		return ResponseEntity.ok().body(names);
	}
	
	@PostMapping("/lab_test_type_ranges/save")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<LabTestTypeRange>save(
			@RequestBody LabTestTypeRange labTestTypeRange){
		LabTestType labTestType = labTestTypeRepository.findByName(labTestTypeRange.getLabTestType().getName()).get();
		labTestTypeRange.setLabTestType(labTestType);
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/lab_test_type_ranges/save").toUriString());
		return ResponseEntity.created(uri).body(labTestTypeRangeService.save(labTestTypeRange));
	}
}

