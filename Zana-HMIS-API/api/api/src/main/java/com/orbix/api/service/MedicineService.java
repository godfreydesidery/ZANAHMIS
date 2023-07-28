/**
 * 
 */
package com.orbix.api.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.orbix.api.domain.Medicine;

/**
 * @author Godfrey
 *
 */
public interface MedicineService {
	Medicine save(Medicine medicine, HttpServletRequest request);	
	List<Medicine>getMedicines(HttpServletRequest request); // return all the medicines
	Medicine getMedicineByName(String name, HttpServletRequest request);
	Medicine getMedicineById(Long id, HttpServletRequest request);
	boolean deleteMedicine(Medicine medicine, HttpServletRequest request);
}
