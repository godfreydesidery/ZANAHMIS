/**
 * 
 */
package com.orbix.api.api;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
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

import com.orbix.api.api.accessories.Sanitizer;
import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.Pharmacy;
import com.orbix.api.repositories.PharmacyRepository;
import com.orbix.api.service.PharmacyService;
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
public class PharmacyResource {

	private final PharmacyRepository pharmacyRepository;
	private final PharmacyService pharmacyService;
	

	private final UserService userService;
	private final DayService dayService;
	
	@GetMapping("/pharmacies")
	public ResponseEntity<List<Pharmacy>>getPharmacies(HttpServletRequest request){
		return ResponseEntity.ok().body(pharmacyService.getPharmacies(request));
	}
	
	@GetMapping("/pharmacies/get")
	public ResponseEntity<Pharmacy> getPharmacy(
			@RequestParam(name = "id") Long id,
			HttpServletRequest request){
		return ResponseEntity.ok().body(pharmacyService.getPharmacyById(id, request));
	}
	
	@GetMapping("/pharmacies/get_by_name")
	public ResponseEntity<Pharmacy> getPharmacyByName(
			@RequestParam(name = "name") String name,
			HttpServletRequest request){
		return ResponseEntity.ok().body(pharmacyService.getPharmacyByName(name, request));
	}
	
	@GetMapping("/pharmacies/get_names")
	public ResponseEntity<List<String>> getPharmacyNames(HttpServletRequest request){
		List<String> names = new ArrayList<String>();
		names = pharmacyService.getNames(request);
		return ResponseEntity.ok().body(names);
	}
	
	@PostMapping("/pharmacies/save")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<Pharmacy>save(
			@RequestBody Pharmacy pharmacy,
			HttpServletRequest request){
		pharmacy.setName(Sanitizer.sanitizeString(pharmacy.getName()));
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/pharmacies/save").toUriString());
		return ResponseEntity.created(uri).body(pharmacyService.save(pharmacy, request));
	}
	
	
}
