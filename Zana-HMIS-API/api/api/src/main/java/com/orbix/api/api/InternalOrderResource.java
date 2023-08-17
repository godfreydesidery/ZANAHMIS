/**
 * 
 */
package com.orbix.api.api;

import java.net.URI;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.orbix.api.api.accessories.Sanitizer;
import com.orbix.api.domain.Item;
import com.orbix.api.domain.PharmacyToStoreRO;
import com.orbix.api.repositories.InsuranceProviderRepository;
import com.orbix.api.service.DayService;
import com.orbix.api.service.InsuranceProviderService;
import com.orbix.api.service.PharmacyToStoreROService;
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
public class InternalOrderResource {
	
	private final PharmacyToStoreROService pharmacyToStoreROService;

	
	@PostMapping("/pharmacy_to_store_r_o/save")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<PharmacyToStoreRO>savePharmacyToStoreRO(
			@RequestBody PharmacyToStoreRO ro,
			HttpServletRequest request){

		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/pharmacy_to_store_r_o/create").toUriString());
		return ResponseEntity.created(uri).body(pharmacyToStoreROService.save(ro, request));
	}
}
