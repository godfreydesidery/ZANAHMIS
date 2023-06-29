/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.MedicinePlanPrice;
import com.orbix.api.domain.Patient;

/**
 * @author Godfrey
 *
 */
public interface MedicinePlanPriceRepository extends JpaRepository<MedicinePlanPrice, Long> {

}
