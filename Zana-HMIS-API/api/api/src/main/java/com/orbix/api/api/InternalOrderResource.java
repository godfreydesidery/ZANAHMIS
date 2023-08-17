/**
 * 
 */
package com.orbix.api.api;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
import com.orbix.api.domain.Item;
import com.orbix.api.domain.Pharmacy;
import com.orbix.api.domain.PharmacyToStoreRO;
import com.orbix.api.domain.PharmacyToStoreRODetail;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.exceptions.NotFoundException;
import com.orbix.api.models.PharmacyToStoreRODetailModel;
import com.orbix.api.models.PharmacyToStoreROModel;
import com.orbix.api.models.RecordModel;
import com.orbix.api.repositories.InsuranceProviderRepository;
import com.orbix.api.repositories.PharmacyRepository;
import com.orbix.api.repositories.PharmacyToStoreRORepository;
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
	private final PharmacyToStoreRORepository pharmacyToStoreRORepository;
	private final UserService userService;
	private final PharmacyRepository pharmacyRepository;

	
	@PostMapping("/pharmacy_to_store_r_os/save")
	//@PreAuthorize("hasAnyAuthority('ROLE-CREATE')")
	public ResponseEntity<PharmacyToStoreROModel>savePharmacyToStoreRO(
			@RequestBody PharmacyToStoreRO ro,
			HttpServletRequest request){

		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/pharmacy_to_store_r_o/create").toUriString());
		return ResponseEntity.created(uri).body(pharmacyToStoreROService.save(ro, request));
	}
	
	@GetMapping("/pharmacy_to_store_r_os/load_pharmacy_orders_by_pharmacy")
	public List<PharmacyToStoreRO> loadPharmacyOrders(
			@RequestParam(name = "pharmacy_id") Long pharmacyId){
		Optional<Pharmacy> pharm = pharmacyRepository.findById(pharmacyId);
		if(pharm.isEmpty()) {
			throw new NotFoundException("Pharmacy not found");
		}
		List<String> statuses = new ArrayList<>();
		statuses.add("PENDING");
		statuses.add("VERIFIED");
		statuses.add("APPROVED");
		
		return pharmacyToStoreRORepository.findByPharmacyAndStatusIn(pharm.get(), statuses);
	}
	
	@GetMapping("/pharmacy_to_store_r_os/request_no")
	public RecordModel requestNo(){
		return pharmacyToStoreROService.requestNo();
	}
	
	@GetMapping("/pharmacy_to_store_r_os/search")
	public ResponseEntity<PharmacyToStoreROModel> searchPharmacyOrderAndPharmacy(
			@RequestParam(name = "id") Long id,
			@RequestParam(name = "pharmacy_id") Long pharmacyId,
			HttpServletRequest request){
		Optional<PharmacyToStoreRO> ro = pharmacyToStoreRORepository.findById(id);
		if(ro.isEmpty()) {
			throw new NotFoundException("Order not found");
		}
		if(ro.get().getPharmacy().getId() != pharmacyId) {
			throw new InvalidOperationException("Order does not belong to this pharmacy");
		}
		
		PharmacyToStoreROModel model = new PharmacyToStoreROModel();
		List<PharmacyToStoreRODetailModel> modelDetails = new ArrayList<>();
		
		model.setId(ro.get().getId());
		model.setNo(ro.get().getNo());
		model.setPharmacy(ro.get().getPharmacy());
		model.setOrderDate(ro.get().getOrderDate());
		model.setValidUntil(ro.get().getValidUntil());
		model.setStatus(ro.get().getStatus());
		if(ro.get().getPharmacyToStoreRODetails() != null) {
			for(PharmacyToStoreRODetail d : ro.get().getPharmacyToStoreRODetails()) {
				PharmacyToStoreRODetailModel modelDetail = new PharmacyToStoreRODetailModel();
				modelDetail.setId(d.getId());
				modelDetail.setMedicine(d.getMedicine());
				modelDetail.setOrderedQty(d.getOrderedQty());
				modelDetail.setReceivedQty(d.getReceivedQty());
				if(d.getCreatedAt() != null) {
					modelDetail.setCreated(d.getCreatedAt().toString()+" | "+userService.getUserById(d.getCreatedBy()).getNickname());
				}else {
					modelDetail.setCreated(null);
				}
				modelDetails.add(modelDetail);
			}
			model.setPharmacyToStoreRODetailModels(modelDetails);
		}
		
		if(ro.get().getCreatedAt() != null) {
			model.setCreated(ro.get().getCreatedAt().toString()+" | "+userService.getUserById(ro.get().getCreatedBy()).getNickname());
		}else {
			model.setCreated(null);
		}
		if(ro.get().getVerifiedAt() != null) {
			model.setVerified(ro.get().getVerifiedAt().toString()+" | "+userService.getUserById(ro.get().getVerifiedBy()).getNickname());
		}else {
			model.setVerified(null);
		}
		if(ro.get().getApprovedAt() != null) {
			model.setApproved(ro.get().getApprovedAt().toString()+" | "+userService.getUserById(ro.get().getApprovedBy()).getNickname());
		}else {
			model.setApproved(null);
		}		
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/pharmacy_to_store_r_os/search_by_no").toUriString());
		return ResponseEntity.created(uri).body(model);
		
	}
	
	@GetMapping("/pharmacy_to_store_r_os/search_by_no")
	public ResponseEntity<PharmacyToStoreROModel> searchPharmacyOrderByNoAndPharmacy(
			@RequestParam(name = "no") String no,
			@RequestParam(name = "pharmacy_id") Long pharmacyId,
			HttpServletRequest request){
		Optional<PharmacyToStoreRO> ro = pharmacyToStoreRORepository.findByNo(no);
		if(ro.isEmpty()) {
			throw new NotFoundException("Order not found");
		}
		if(ro.get().getPharmacy().getId() != pharmacyId) {
			throw new InvalidOperationException("Order does not belong to this pharmacy");
		}
		
		PharmacyToStoreROModel model = new PharmacyToStoreROModel();
		List<PharmacyToStoreRODetailModel> modelDetails = new ArrayList<>();
		
		model.setId(ro.get().getId());
		model.setNo(ro.get().getNo());
		model.setPharmacy(ro.get().getPharmacy());
		model.setOrderDate(ro.get().getOrderDate());
		model.setValidUntil(ro.get().getValidUntil());
		model.setStatus(ro.get().getStatus());
		if(ro.get().getPharmacyToStoreRODetails() != null) {
			for(PharmacyToStoreRODetail d : ro.get().getPharmacyToStoreRODetails()) {
				PharmacyToStoreRODetailModel modelDetail = new PharmacyToStoreRODetailModel();
				modelDetail.setId(d.getId());
				modelDetail.setMedicine(d.getMedicine());
				modelDetail.setOrderedQty(d.getOrderedQty());
				modelDetail.setReceivedQty(d.getReceivedQty());
				if(d.getCreatedAt() != null) {
					modelDetail.setCreated(d.getCreatedAt().toString()+" | "+userService.getUserById(d.getCreatedBy()).getNickname());
				}else {
					modelDetail.setCreated(null);
				}
				modelDetails.add(modelDetail);
			}
			model.setPharmacyToStoreRODetailModels(modelDetails);
		}
		
		if(ro.get().getCreatedAt() != null) {
			model.setCreated(ro.get().getCreatedAt().toString()+" | "+userService.getUserById(ro.get().getCreatedBy()).getNickname());
		}else {
			model.setCreated(null);
		}
		if(ro.get().getVerifiedAt() != null) {
			model.setVerified(ro.get().getVerifiedAt().toString()+" | "+userService.getUserById(ro.get().getVerifiedBy()).getNickname());
		}else {
			model.setVerified(null);
		}
		if(ro.get().getApprovedAt() != null) {
			model.setApproved(ro.get().getApprovedAt().toString()+" | "+userService.getUserById(ro.get().getApprovedBy()).getNickname());
		}else {
			model.setApproved(null);
		}		
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/pharmacy_to_store_r_os/search_by_no").toUriString());
		return ResponseEntity.created(uri).body(model);
		
	}
}
