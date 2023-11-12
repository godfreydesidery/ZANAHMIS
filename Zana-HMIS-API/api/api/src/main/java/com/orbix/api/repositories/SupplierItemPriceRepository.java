/**
 * 
 */
package com.orbix.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Supplier;
import com.orbix.api.domain.SupplierItemPrice;

/**
 * @author Godfrey
 *
 */
public interface SupplierItemPriceRepository extends JpaRepository<SupplierItemPrice, Long> {

	/**
	 * @param supplier
	 * @return
	 */
	List<SupplierItemPrice> findAllBySupplier(Supplier supplier);

}
