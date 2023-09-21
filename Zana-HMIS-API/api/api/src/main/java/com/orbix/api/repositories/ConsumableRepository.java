/**
 * 
 */
package com.orbix.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Consumable;
import com.orbix.api.domain.Medicine;

/**
 * @author Godfrey
 *
 */
public interface ConsumableRepository extends JpaRepository<Consumable, Long> {

	/**
	 * @param medicine
	 * @return
	 */
	List<Consumable> findAllByMedicine(Medicine medicine);


}
