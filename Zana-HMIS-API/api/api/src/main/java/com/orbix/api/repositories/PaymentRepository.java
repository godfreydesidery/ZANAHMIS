/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Patient;
import com.orbix.api.domain.Payment;

/**
 * @author Godfrey
 *
 */
public interface PaymentRepository extends JpaRepository<Payment, Long> {

}
