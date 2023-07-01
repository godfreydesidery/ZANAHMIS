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

import com.orbix.api.domain.LabTestType;
import com.orbix.api.repositories.LabTestTypeRepository;
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
	
	@PostMapping("/lab_test_types/save")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<LabTestType>save(
			@RequestBody LabTestType labTestType){
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/lab_test_types/save").toUriString());
		return ResponseEntity.created(uri).body(labTestTypeService.save(labTestType));
	}
}
