/**
 * 
 */
package com.orbix.api.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.orbix.api.domain.Pharmacy;
import com.orbix.api.domain.PharmacyToStoreRO;

/**
 * @author Godfrey
 *
 */
public interface PharmacyToStoreRORepository extends JpaRepository<PharmacyToStoreRO, Long> {
	
	@Query("SELECT MAX(p.id) FROM PharmacyToStoreRO p")
	Long getLastId();

	/**
	 * @param no
	 * @return
	 */
	Optional<PharmacyToStoreRO> findByNo(String no);

	/**
	 * @param pharmacy
	 * @param statuses
	 * @return
	 */
	List<PharmacyToStoreRO> findByPharmacyAndStatusIn(Pharmacy pharmacy, List<String> statuses);
}
