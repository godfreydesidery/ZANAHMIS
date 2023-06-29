/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.InvoiceDetail;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface InvoiceDetailRepository extends JpaRepository<InvoiceDetail, Long> {

}
