/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.PharmacyStockCard;

/**
 * @author Godfrey
 *
 */
public interface PharmacyStockCardRepository extends JpaRepository<PharmacyStockCard, Long> {

}
