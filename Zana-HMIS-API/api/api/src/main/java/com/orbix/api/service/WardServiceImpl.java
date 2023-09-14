/**
 * 
 */
package com.orbix.api.service;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.orbix.api.domain.Ward;
import com.orbix.api.domain.WardCategory;
import com.orbix.api.domain.WardType;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.exceptions.NotFoundException;
import com.orbix.api.repositories.WardCategoryRepository;
import com.orbix.api.repositories.WardRepository;
import com.orbix.api.repositories.WardTypeRepository;

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
public class WardServiceImpl implements WardService {
	private final UserService userService;
	private final DayService dayService;
	private final WardRepository wardRepository;
	private final WardCategoryRepository wardCategoryRepository;
	private final WardTypeRepository wardTypeRepository;
	
	@Override
	public Ward save(Ward ward, HttpServletRequest request) {
		
		ward.setName(ward.getName());
		if(ward.getNoOfBeds() < 0) {
			throw new InvalidOperationException("Invalid no of beds. No of beds can not be negative");
		}
		
		Optional<WardCategory> wc = wardCategoryRepository.findById(ward.getWardCategory().getId());
		if(wc.isEmpty()) {
			throw new NotFoundException("Category not found");
		}
		
		Optional<WardType> wt = wardTypeRepository.findById(ward.getWardType().getId());
		if(wc.isEmpty()) {
			throw new NotFoundException("Category not found");
		}
		
		if(ward.getId() == null) {
			ward.setCreatedby(userService.getUser(request).getId());
			ward.setCreatedOn(dayService.getDay().getId());
			ward.setCreatedAt(dayService.getTimeStamp());
			
		}
			
		log.info("Saving new ward to the database");
		return wardRepository.save(ward);
	}

	@Override
	public List<Ward> getWards(HttpServletRequest request) {
		log.info("Fetching all wardCategories");
		return wardRepository.findAll();
	}
	
	@Override
	public Ward getWardById(Long id, HttpServletRequest request) {
		return wardRepository.findById(id).get();
	}
	
	@Override
	public Ward getWardByName(String name, HttpServletRequest request) {
		return wardRepository.findByName(name).get();
	}


	@Override
	public boolean deleteWard(Ward ward, HttpServletRequest request) {
		/**
		 * Delete a ward if a ward is deletable
		 */
		if(allowDeleteWard(ward) == false) {
			throw new InvalidOperationException("Deleting this ward is not allowed");
		}
		wardRepository.delete(ward);
		return true;
	}
	
	private boolean allowDeleteWard(Ward ward) {
		/**
		 * Code to check if a ward is deletable
		 * Returns false if not
		 */
		return false;
	}
}
