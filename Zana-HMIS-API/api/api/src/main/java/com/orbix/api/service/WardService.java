/**
 * 
 */
package com.orbix.api.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.orbix.api.domain.Ward;

/**
 * @author Godfrey
 *
 */
public interface WardService {
	Ward save(Ward ward, HttpServletRequest request);	
	List<Ward>getWards(HttpServletRequest request); // return all the wards
	Ward getWardById(Long id, HttpServletRequest request);
	Ward getWardByName(String name, HttpServletRequest request);	
	boolean deleteWard(Ward ward, HttpServletRequest request);
}
