/**
 * 
 */
package com.orbix.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.Ward;

/**
 * @author Godfrey
 *
 */
public interface WardRepository extends JpaRepository <Ward, Long>{

	/**
	 * @param name
	 * @return
	 */
	Optional<Ward> findByName(String name);

}
