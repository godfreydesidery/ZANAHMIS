/**
 * 
 */
package com.orbix.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Bill;
import com.orbix.api.domain.InvoiceDetail;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface InvoiceDetailRepository extends JpaRepository<InvoiceDetail, Long> {

	/**
	 * @param bill
	 * @return
	 */
	Optional<InvoiceDetail> findByBill(Bill bill);

}
