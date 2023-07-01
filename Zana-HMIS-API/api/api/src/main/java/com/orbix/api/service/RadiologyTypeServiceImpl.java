/**
 * 
 */
package com.orbix.api.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.orbix.api.domain.RadiologyType;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.repositories.DayRepository;
import com.orbix.api.repositories.RadiologyTypeRepository;
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
public class RadiologyTypeServiceImpl implements RadiologyTypeService{
	private final UserRepository userRepository;
	private final UserService userService;
	private final DayRepository dayRepository;
	private final DayService dayService;
	private final RadiologyTypeRepository radiologyTypeRepository;
	
	@Override
	public RadiologyType save(RadiologyType radiologyType) {
		log.info("Saving new radiologyType to the database");
		return radiologyTypeRepository.save(radiologyType);
	}

	@Override
	public List<RadiologyType> getRadiologyTypes() {
		log.info("Fetching all radiologyTypes");
		return radiologyTypeRepository.findAll();
	}

	@Override
	public RadiologyType getRadiologyTypeByName(String name) {
		return radiologyTypeRepository.findByName(name);
	}

	@Override
	public RadiologyType getRadiologyTypeById(Long id) {
		return radiologyTypeRepository.findById(id).get();
	}

	@Override
	public boolean deleteRadiologyType(RadiologyType radiologyType) {
		/**
		 * Delete a radiologyType if a radiologyType is deletable
		 */
		if(allowDeleteRadiologyType(radiologyType) == false) {
			throw new InvalidOperationException("Deleting this radiologyType is not allowed");
		}
		radiologyTypeRepository.delete(radiologyType);
		return true;
	}
	
	private boolean allowDeleteRadiologyType(RadiologyType radiologyType) {
		/**
		 * Code to check if a radiologyType is deletable
		 * Returns false if not
		 */
		return false;
	}
}
