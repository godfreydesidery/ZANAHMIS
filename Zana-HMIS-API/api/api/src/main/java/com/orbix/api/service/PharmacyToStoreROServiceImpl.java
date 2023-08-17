/**
 * 
 */
package com.orbix.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.orbix.api.accessories.Formater;
import com.orbix.api.domain.Pharmacy;
import com.orbix.api.domain.PharmacyToStoreRO;
import com.orbix.api.domain.PharmacyToStoreRODetail;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.exceptions.NotFoundException;
import com.orbix.api.models.PharmacyToStoreRODetailModel;
import com.orbix.api.models.PharmacyToStoreROModel;
import com.orbix.api.models.RecordModel;
import com.orbix.api.repositories.DayRepository;
import com.orbix.api.repositories.LabTestTypeRepository;
import com.orbix.api.repositories.PharmacyRepository;
import com.orbix.api.repositories.PharmacyToStoreRORepository;
import com.orbix.api.repositories.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * @author Godfrey
 *
 */
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PharmacyToStoreROServiceImpl implements PharmacyToStoreROService {
	
	private final UserRepository userRepository;
	private final UserService userService;
	private final DayRepository dayRepository;
	private final DayService dayService;
	private final PharmacyRepository pharmacyRepository;
	private final PharmacyToStoreRORepository pharmacyToStoreRORepository;
	
	@Override
	public PharmacyToStoreROModel save(PharmacyToStoreRO pharmacyToStoreRO, HttpServletRequest request) {
		
		if(pharmacyToStoreRO.getId() == null) {
			Optional<Pharmacy> pharm = pharmacyRepository.findById(pharmacyToStoreRO.getPharmacy().getId());
			if(pharm.isEmpty()) {
				throw new NotFoundException("Pharmacy not found");
			}
			
			
			
			pharmacyToStoreRO.setCreatedBy(userService.getUser(request).getId());
			pharmacyToStoreRO.setCreatedOn(dayService.getDay().getId());
			pharmacyToStoreRO.setCreatedAt(dayService.getTimeStamp());
			
			pharmacyToStoreRO.setStatus("PENDING");
		}else {
			Optional<PharmacyToStoreRO> pts = pharmacyToStoreRORepository.findById(pharmacyToStoreRO.getId());
			if(pts.isEmpty()) {
				throw new NotFoundException("Order not found");
			}
			if(!pharmacyToStoreRO.getNo().equals(pts.get().getNo())) {
				throw new InvalidOperationException("Editing order no is not allowed");
			}
			if(pharmacyToStoreRO.getPharmacy().getId() != pts.get().getPharmacy().getId()) {
				throw new InvalidOperationException("Editing pharmacy is not allowed");
			}
		}
		PharmacyToStoreRO ro = pharmacyToStoreRORepository.save(pharmacyToStoreRO);
		PharmacyToStoreROModel model = new PharmacyToStoreROModel();
		List<PharmacyToStoreRODetailModel> modelDetails = new ArrayList<>();
		
		model.setId(ro.getId());
		model.setNo(ro.getNo());
		model.setPharmacy(ro.getPharmacy());
		model.setOrderDate(ro.getOrderDate());
		model.setValidUntil(ro.getValidUntil());
		model.setStatus(ro.getStatus());
		if(ro.getPharmacyToStoreRODetails() != null) {
			for(PharmacyToStoreRODetail d : ro.getPharmacyToStoreRODetails()) {
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
		
		if(ro.getCreatedAt() != null) {
			model.setCreated(ro.getCreatedAt().toString()+" | "+userService.getUserById(ro.getCreatedBy()).getNickname());
		}else {
			model.setCreated(null);
		}
		if(ro.getVerifiedAt() != null) {
			model.setVerified(ro.getVerifiedAt().toString()+" | "+userService.getUserById(ro.getVerifiedBy()).getNickname());
		}else {
			model.setVerified(null);
		}
		if(ro.getApprovedAt() != null) {
			model.setApproved(ro.getApprovedAt().toString()+" | "+userService.getUserById(ro.getApprovedBy()).getNickname());
		}else {
			model.setApproved(null);
		}		
		return model;
	}

	@Override
	public RecordModel requestNo() {
		Long id = 1L;
		try {
			id = pharmacyToStoreRORepository.getLastId() + 1;
		}catch(Exception e) {}
		RecordModel model = new RecordModel();
		model.setNo(Formater.formatWithCurrentDate("PHRO",id.toString()));
		return model;
	}	
}
