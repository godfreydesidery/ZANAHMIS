/**
 * 
 */
package com.orbix.api.api;

import java.net.URI;
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
import com.orbix.api.domain.Clinician;
import com.orbix.api.repositories.ClinicianRepository;
import com.orbix.api.service.ClinicianService;

import lombok.RequiredArgsConstructor;

/**
 * @author Godfrey
 *
 */
@RestController
@RequestMapping("/zana-hmis-api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ClinicianResource {

	private final ClinicianRepository clinicianRepository;
	private final ClinicianService clinicianService;
	
	@GetMapping("/clinicians")
	public ResponseEntity<List<Clinician>>getClinicians(){
		return ResponseEntity.ok().body(clinicianService.getClinicians());
	}
	
	@GetMapping("/clinicians/get")
	public ResponseEntity<Clinician> getClinician(
			@RequestParam(name = "id") Long id){
		return ResponseEntity.ok().body(clinicianService.getClinicianById(id));
	}
	
	@PostMapping("/clinicians/save")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<Clinician>save(
			@RequestBody Clinician clinician){
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/clinicians/save").toUriString());
		return ResponseEntity.created(uri).body(clinicianService.save(clinician));
	}
}