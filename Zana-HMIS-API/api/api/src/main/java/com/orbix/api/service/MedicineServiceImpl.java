/**
 * 
 */
package com.orbix.api.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.orbix.api.domain.Medicine;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.repositories.DayRepository;
import com.orbix.api.repositories.MedicineRepository;
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
public class MedicineServiceImpl implements MedicineService{
	private final UserRepository userRepository;
	private final UserService userService;
	private final DayRepository dayRepository;
	private final DayService dayService;
	private final MedicineRepository medicineRepository;
	
	@Override
	public Medicine save(Medicine medicine) {
		log.info("Saving new medicine to the database");
		return medicineRepository.save(medicine);
	}

	@Override
	public List<Medicine> getMedicines() {
		log.info("Fetching all medicines");
		return medicineRepository.findAll();
	}

	@Override
	public Medicine getMedicineByName(String name) {
		return medicineRepository.findByName(name).get();
	}

	@Override
	public Medicine getMedicineById(Long id) {
		return medicineRepository.findById(id).get();
	}

	@Override
	public boolean deleteMedicine(Medicine medicine) {
		/**
		 * Delete a medicine if a medicine is deletable
		 */
		if(allowDeleteMedicine(medicine) == false) {
			throw new InvalidOperationException("Deleting this medicine is not allowed");
		}
		medicineRepository.delete(medicine);
		return true;
	}
	
	private boolean allowDeleteMedicine(Medicine medicine) {
		/**
		 * Code to check if a medicine is deletable
		 * Returns false if not
		 */
		return false;
	}
}
