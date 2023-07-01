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

import com.orbix.api.domain.RadiologyType;
import com.orbix.api.repositories.RadiologyTypeRepository;
import com.orbix.api.service.RadiologyTypeService;

import lombok.RequiredArgsConstructor;

/**
 * @author Godfrey
 *
 */
@RestController
@RequestMapping("/zana-hmis-api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RadiologyTypeResource {
	private final RadiologyTypeRepository radiologyTypeRepository;
	private final RadiologyTypeService radiologyTypeService;
	
	@PostMapping("/radiology_types/save")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<RadiologyType>save(
			@RequestBody RadiologyType radiologyType){
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/radiology_types/save").toUriString());
		return ResponseEntity.created(uri).body(radiologyTypeService.save(radiologyType));
	}
}
