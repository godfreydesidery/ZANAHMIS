/**
 * 
 */
package com.orbix.api.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.orbix.api.domain.Item;

/**
 * @author Godfrey
 *
 */
public interface ItemRepository extends JpaRepository <Item, Long> {

	/**
	 * @param itemName
	 * @return
	 */
	Optional<Item> findByName(String itemName);


	@Query("SELECT i.name FROM Item i")
	List<String> getNames();
}
