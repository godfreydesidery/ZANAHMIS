/**
 * 
 */
package com.orbix.api.service;

import java.util.List;

import com.orbix.api.domain.Patient;
import com.orbix.api.domain.Product;

/**
 * @author Godfrey
 *
 */
public interface PatientService {
	Patient register(Patient patient);
	Patient update(Patient patient);
	List<Patient>getBySearchKey(String searchKey);
}
