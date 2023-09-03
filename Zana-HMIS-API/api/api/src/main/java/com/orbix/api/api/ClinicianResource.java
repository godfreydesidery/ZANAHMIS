/**
 * 
 */
package com.orbix.api.api;

import java.net.URI;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.orbix.api.api.accessories.Sanitizer;
import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.Clinician;
import com.orbix.api.domain.User;
import com.orbix.api.exceptions.NotFoundException;
import com.orbix.api.repositories.ClinicRepository;
import com.orbix.api.repositories.ClinicianRepository;
import com.orbix.api.repositories.UserRepository;
import com.orbix.api.service.ClinicService;
import com.orbix.api.service.ClinicianService;
import com.orbix.api.service.DayService;
import com.orbix.api.service.UserService;

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
public class ClinicianResource {

	private final ClinicianRepository clinicianRepository;
	private final ClinicRepository clinicRepository;
	private final ClinicianService clinicianService;
	private final ClinicService clinicService;
	private final UserRepository userRepository;
	
	private final UserService userService;
	private final DayService dayService;
	
	@GetMapping("/clinicians")
	public ResponseEntity<List<Clinician>>getClinicians(HttpServletRequest request){
		return ResponseEntity.ok().body(clinicianService.getClinicians(request));
	}
	
	@GetMapping("/clinicians/get")
	public ResponseEntity<Clinician> getClinician(
			@RequestParam(name = "id") Long id,
			HttpServletRequest request){
		return ResponseEntity.ok().body(clinicianService.getClinicianById(id, request));
	}
	
	@PostMapping("/clinicians/save")
	@PreAuthorize("hasAnyAuthority('ADMIN-A')")
	public ResponseEntity<Clinician>save(
			@RequestBody Clinician clinician,
			HttpServletRequest request){
		
		Optional<User> u = userRepository.findByCode(clinician.getCode());
		if(u.isEmpty()) {
			throw new NotFoundException("Could not find user with the given user code");
		}
		
		//clinician.setFirstName(Sanitizer.sanitizeString(clinician.getFirstName()));
		//clinician.setMiddleName(Sanitizer.sanitizeString(clinician.getMiddleName()));
		//clinician.setLastName(Sanitizer.sanitizeString(clinician.getLastName()));
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/clinicians/save").toUriString());
		return ResponseEntity.created(uri).body(clinicianService.save(clinician, request));
	}
	
	@GetMapping("/clinicians/get_by_clinic_name")    // to do later
	public ResponseEntity<List<Clinician>> getClinicianByClinicName(
			@RequestParam(name = "clinic_name") String clinicName,
			HttpServletRequest request){
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
	
	@GetMapping("/clinicians/load_clinician_by_username")    // to do later
	public ResponseEntity<Long> loadClinicianByUsername(
			@RequestParam(name = "username") String username,
			HttpServletRequest request){
		User user = userRepository.findByUsername(username);
		Optional<Clinician> c = clinicianRepository.findByUser(user);
		if(!c.isPresent()) {
			throw new NotFoundException("User Account not associated with clinician");
		}		
		return ResponseEntity.ok().body(c.get().getId());
	}
	
	@PostMapping("/clinicians/assign_user_profile")    // to do later
	public ResponseEntity<Clinician> assignUserProfile(
			@RequestParam(name = "id") Long id,
			@RequestParam(name = "code") String code,
			HttpServletRequest request){
		Optional<Clinician> c = clinicianRepository.findById(id);
		if(!c.isPresent()) {
			throw new NotFoundException("Clinician not found in database");
		}
		Optional<User> u = userRepository.findByCode(code);
		if(!u.isPresent()) {
			throw new NotFoundException("User not found in database");
		}
		Optional<Clinician> cu = clinicianRepository.findByUser(u.get());
		if(cu.isPresent()) {
			throw new NotFoundException("Can not aasign user account to multiple clinicians");
		}
		c.get().setUser(u.get());
		return ResponseEntity.ok().body(clinicianRepository.save(c.get()));
	}
}
