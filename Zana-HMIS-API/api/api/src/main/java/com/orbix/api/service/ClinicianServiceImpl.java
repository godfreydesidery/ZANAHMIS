/**
 * 
 */
package com.orbix.api.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.orbix.api.domain.Clinic;
import com.orbix.api.domain.Clinician;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.repositories.ClinicRepository;
import com.orbix.api.repositories.ClinicianRepository;
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
public class ClinicianServiceImpl implements ClinicianService{

	private final UserRepository userRepository;
	private final UserService userService;
	private final DayRepository dayRepository;
	private final DayService dayService;
	private final ClinicianRepository clinicianRepository;
	
	@Override
	public Clinician save(Clinician clinician) {
		log.info("Saving new clinic to the database");
		return clinicianRepository.save(clinician);
	}

	@Override
	public List<Clinician> getClinicians() {
		log.info("Fetching all clinicians");
		return clinicianRepository.findAll();
	}

	@Override
	public Clinician getClinicianByName(String name) {
		return clinicianRepository.findByName(name).get();
	}

	@Override
	public Clinician getClinicianById(Long id) {
		return clinicianRepository.findById(id).get();
	}

	@Override
	public boolean deleteClinician(Clinician clinician) {
		/**
		 * Delete a clinician if a clinician is deletable
		 */
		if(allowDeleteClinician(clinician) == false) {
			throw new InvalidOperationException("Deleting this clinician is not allowed");
		}
		clinicianRepository.delete(clinician);
		return true;
	}
	
	private boolean allowDeleteClinician(Clinician clinician) {
		/**
		 * Code to check if a clinician is deletable
		 * Returns false if not
		 */
		return false;
	}
}
