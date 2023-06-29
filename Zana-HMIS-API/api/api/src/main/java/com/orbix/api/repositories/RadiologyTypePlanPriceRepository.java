/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Patient;
import com.orbix.api.domain.RadiologyTypePlanPrice;

/**
 * @author Godfrey
 *
 */
public interface RadiologyTypePlanPriceRepository extends JpaRepository<RadiologyTypePlanPrice, Long> {

}
