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

import com.orbix.api.domain.DiagnosisType;
import com.orbix.api.repositories.InsurancePlanRepository;
import com.orbix.api.repositories.DiagnosisTypeRepository;
import com.orbix.api.service.InsurancePlanService;
import com.orbix.api.service.DiagnosisTypeService;

import lombok.RequiredArgsConstructor;

/**
 * @author Godfrey
 *
 */
@RestController
@RequestMapping("/zana-hmis-api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class DiagnosisTypeResource {
	private final DiagnosisTypeRepository diagnosisTypeRepository;
	private final DiagnosisTypeService diagnosisTypeService;
	
	@GetMapping("/diagnosis_types")
	public ResponseEntity<List<DiagnosisType>>getDiagnosisTypes(){
		return ResponseEntity.ok().body(diagnosisTypeService.getDiagnosisTypes());
	}
	
	@GetMapping("/diagnosis_types/get")
	public ResponseEntity<DiagnosisType> getDiagnosisType(
			@RequestParam(name = "id") Long id){
		return ResponseEntity.ok().body(diagnosisTypeService.getDiagnosisTypeById(id));
	}
	
	@GetMapping("/diagnosis_types/get_names")
	public ResponseEntity<List<String>> getDiagnosisTypeNames(){
		List<String> names = new ArrayList<String>();
		names = diagnosisTypeRepository.getNames();
		return ResponseEntity.ok().body(names);
	}
	
	@PostMapping("/diagnosis_types/save")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<DiagnosisType>save(
			@RequestBody DiagnosisType diagnosisType){
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/diagnosis_types/save").toUriString());
		return ResponseEntity.created(uri).body(diagnosisTypeService.save(diagnosisType));
	}
}


