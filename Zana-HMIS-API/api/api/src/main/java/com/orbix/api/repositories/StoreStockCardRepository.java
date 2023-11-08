/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.StoreStockCard;

/**
 * @author Godfrey
 *
 */
public interface StoreStockCardRepository extends JpaRepository<StoreStockCard, Long> {

}
