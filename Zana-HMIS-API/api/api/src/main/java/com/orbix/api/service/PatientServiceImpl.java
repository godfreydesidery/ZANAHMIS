/**
 * 
 */
package com.orbix.api.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.orbix.api.domain.Patient;
import com.orbix.api.repositories.DayRepository;
import com.orbix.api.repositories.PatientRepository;
import com.orbix.api.repositories.ProductRepository;

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
public class PatientServiceImpl implements PatientService {
	
	private final PatientRepository patientRepository;
	private final DayRepository dayRepository;
	
	@Override
	public Patient register(Patient patient) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Patient update(Patient patient) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Patient> getBySearchKey(String searchKey) {
		// TODO Auto-generated method stub
		return null;
	}

}
