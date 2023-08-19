/**
 * 
 */
package com.orbix.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Item;
import com.orbix.api.domain.ItemMedicineCoefficient;
import com.orbix.api.domain.Medicine;

/**
 * @author Godfrey
 *
 */
public interface ItemMedicineCoefficientRepository extends JpaRepository <ItemMedicineCoefficient, Long> {

	/**
	 * @param item
	 * @param medicine
	 * @return
	 */
	Optional<ItemMedicineCoefficient> findByItemAndMedicine(Item item, Medicine medicine);

}
