/**
 * 
 */
package com.orbix.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Bill;
import com.orbix.api.domain.Patient;
import com.orbix.api.domain.Payment;

/**
 * @author Godfrey
 *
 */
public interface PaymentRepository extends JpaRepository<Payment, Long> {

	/**
	 * @param bill
	 * @return
	 */
	Optional<Payment> findByBill(Bill bill);

}
