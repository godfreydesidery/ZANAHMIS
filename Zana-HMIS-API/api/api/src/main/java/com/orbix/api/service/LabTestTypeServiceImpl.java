/**
 * 
 */
package com.orbix.api.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.orbix.api.domain.LabTestType;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.repositories.LabTestTypeRepository;
import com.orbix.api.repositories.DayRepository;
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
public class LabTestTypeServiceImpl implements LabTestTypeService{
	private final UserRepository userRepository;
	private final UserService userService;
	private final DayRepository dayRepository;
	private final DayService dayService;
	private final LabTestTypeRepository labTestTypeRepository;
	
	@Override
	public LabTestType save(LabTestType labTestType) {
		log.info("Saving new labTestType to the database");
		return labTestTypeRepository.save(labTestType);
	}

	@Override
	public List<LabTestType> getLabTestTypes() {
		log.info("Fetching all labTestTypes");
		return labTestTypeRepository.findAll();
	}

	@Override
	public LabTestType getLabTestTypeByName(String name) {
		return labTestTypeRepository.findByName(name).get();
	}

	@Override
	public LabTestType getLabTestTypeById(Long id) {
		return labTestTypeRepository.findById(id).get();
	}

	@Override
	public boolean deleteLabTestType(LabTestType labTestType) {
		/**
		 * Delete a labTestType if a labTestType is deletable
		 */
		if(allowDeleteLabTestType(labTestType) == false) {
			throw new InvalidOperationException("Deleting this labTestType is not allowed");
		}
		labTestTypeRepository.delete(labTestType);
		return true;
	}
	
	private boolean allowDeleteLabTestType(LabTestType labTestType) {
		/**
		 * Code to check if a labTestType is deletable
		 * Returns false if not
		 */
		return false;
	}
}
