/**
 * 
 */
package com.orbix.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Medicine;
import com.orbix.api.domain.Pharmacy;
import com.orbix.api.domain.PharmacyMedicine;

/**
 * @author Godfrey
 *
 */
public interface PharmacyMedicineRepository extends JpaRepository <PharmacyMedicine, Long> {

	/**
	 * @param pharmacy
	 * @param medicine
	 * @return
	 */
	Optional<PharmacyMedicine> findByPharmacyAndMedicine(Pharmacy pharmacy, Medicine medicine);

}
