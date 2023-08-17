/**
 * 
 */
package com.orbix.api.service;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.orbix.api.domain.Pharmacy;
import com.orbix.api.domain.PharmacyToStoreRO;
import com.orbix.api.exceptions.NotFoundException;
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
	public PharmacyToStoreRO save(PharmacyToStoreRO pharmacyToStoreRO, HttpServletRequest request) {
		
		if(pharmacyToStoreRO.getId() == null) {
			Optional<Pharmacy> pharm = pharmacyRepository.findById(pharmacyToStoreRO.getPharmacy().getId());
			if(pharm.isEmpty()) {
				throw new NotFoundException("Pharmacy not found");
			}
			
			pharmacyToStoreRO.setCreatedBy(userService.getUser(request).getId());
			pharmacyToStoreRO.setCreatedOn(dayService.getDay().getId());
			pharmacyToStoreRO.setCreatedAt(dayService.getTimeStamp());
			
			pharmacyToStoreRO.setStatus("PENDING");
		}
		return pharmacyToStoreRORepository.save(pharmacyToStoreRO);
	}

}
