/**
 * 
 */
package com.orbix.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.orbix.api.domain.User;

/**
 * @author GODFREY
 *
 */
public interface UserRepository extends JpaRepository<User, Long> {
	User findByUsername(String username);
	
	@Query("SELECT u.nickname FROM User u WHERE u.id =:id")
	String getNickname(Long id);
	/**
	 * @param rollNo
	 * @return
	 */
	Optional<User> findByCode(String c);
}
