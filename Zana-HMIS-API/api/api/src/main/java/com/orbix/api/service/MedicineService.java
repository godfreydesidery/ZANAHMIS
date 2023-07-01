/**
 * 
 */
package com.orbix.api.service;

import java.util.List;

import com.orbix.api.domain.Medicine;

/**
 * @author Godfrey
 *
 */
public interface MedicineService {
	Medicine save(Medicine medicine);	
	List<Medicine>getMedicines(); // return all the medicines
	Medicine getMedicineByName(String name);
	Medicine getMedicineById(Long id);
	boolean deleteMedicine(Medicine medicine);
}
