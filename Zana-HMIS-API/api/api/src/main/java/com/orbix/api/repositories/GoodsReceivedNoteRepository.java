/**
 * 
 */
package com.orbix.api.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.orbix.api.domain.GoodsReceivedNote;
import com.orbix.api.domain.LocalPurchaseOrder;

/**
 * @author Godfrey
 *
 */
public interface GoodsReceivedNoteRepository extends JpaRepository<GoodsReceivedNote, Long> {
	
	@Query("SELECT MAX(grn.id) FROM GoodsReceivedNote grn")
	Long getLastId();

	/**
	 * @param statuses
	 * @return
	 */
	List<GoodsReceivedNote> findAllByStatusIn(List<String> statuses);

	/**
	 * @param localPurchaseOrder
	 * @return
	 */
	boolean existsByLocalPurchaseOrder(LocalPurchaseOrder localPurchaseOrder);

	/**
	 * @param localPurchaseOrder
	 * @return
	 */
	Optional<GoodsReceivedNote> findByLocalPurchaseOrder(LocalPurchaseOrder localPurchaseOrder);

	
}
