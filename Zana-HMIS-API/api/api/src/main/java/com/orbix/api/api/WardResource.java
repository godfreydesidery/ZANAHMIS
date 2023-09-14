/**
 * 
 */
package com.orbix.api.api;

import java.net.URI;
import java.util.List;

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

import com.orbix.api.domain.Ward;
import com.orbix.api.repositories.WardRepository;
import com.orbix.api.service.DayService;
import com.orbix.api.service.UserService;
import com.orbix.api.service.WardService;

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
public class WardResource {
	private final WardRepository wardRepository;
	private final WardService wardService;
	

	private final UserService userService;
	private final DayService dayService;
	
	@GetMapping("/wards")
	public ResponseEntity<List<Ward>>getWards(HttpServletRequest request){
		return ResponseEntity.ok().body(wardService.getWards(request));
	}
	
	@GetMapping("/wards/get")
	public ResponseEntity<Ward> getWard(
			@RequestParam(name = "id") Long id,
			HttpServletRequest request){
		return ResponseEntity.ok().body(wardService.getWardById(id, request));
	}
	
	@GetMapping("/wards/get_by_name")
	public ResponseEntity<Ward> getWardByName(
			@RequestParam(name = "name") String name,
			HttpServletRequest request){
		return ResponseEntity.ok().body(wardService.getWardByName(name, request));
	}
	
	@PostMapping("/wards/save")
	@PreAuthorize("hasAnyAuthority('ADMIN-A')")
	public ResponseEntity<Ward>save(
			@RequestBody Ward ward,
			HttpServletRequest request){
		ward.setName(ward.getName());
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/wards/save").toUriString());
		return ResponseEntity.created(uri).body(wardService.save(ward, request));
	}
	
	
	
}
