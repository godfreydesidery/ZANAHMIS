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

import com.orbix.api.domain.ProcedureType;
import com.orbix.api.repositories.ProcedureTypeRepository;
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
public class ProcedureTypeResource {
	private final ProcedureTypeRepository procedureTypeRepository;
	private final ProcedureTypeService procedureTypeService;
	
	@PostMapping("/procedure_types/save")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<ProcedureType>save(
			@RequestBody ProcedureType procedureType){
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/procedure_types/save").toUriString());
		return ResponseEntity.created(uri).body(procedureTypeService.save(procedureType));
	}
}
