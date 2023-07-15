/**
 * 
 */
package com.orbix.api.api;

import java.net.URI;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

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
import com.orbix.api.repositories.ClinicRepository;
import com.orbix.api.repositories.ClinicianRepository;
import com.orbix.api.service.ClinicService;
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
	private final ClinicRepository clinicRepository;
	private final ClinicianService clinicianService;
	private final ClinicService clinicService;
	
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
	
	@GetMapping("/clinicians/get_by_clinic_name")    // to do later
	public ResponseEntity<List<Clinician>> getClinicianByClinicName(
			@RequestParam(name = "clinic_name") String clinicName){
		Clinic d = clinicRepository.findByName(clinicName).get();
		List<Clinician> cs = clinicianRepository.findAll();
		List<Clinician> cst = new ArrayList<>();
		for(Clinician c : cs) {
			Collection<Clinic> cls = c.getClinics();
			for(Clinic cl : cls) {
				if(cl.getName().equals(d.getName())) {
					cst.add(c);
				}
			}
		}
		
		
		return ResponseEntity.ok().body(cst);
	}
}
