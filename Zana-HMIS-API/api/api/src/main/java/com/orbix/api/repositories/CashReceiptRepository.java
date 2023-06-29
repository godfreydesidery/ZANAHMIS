/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.CashReceipt;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface CashReceiptRepository extends JpaRepository<CashReceipt, Long> {

}
