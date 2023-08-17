/**
 * 
 */
package com.orbix.api.service;

import javax.servlet.http.HttpServletRequest;

import com.orbix.api.domain.Medicine;
import com.orbix.api.domain.PharmacyToStoreRO;

/**
 * @author Godfrey
 *
 */
public interface PharmacyToStoreROService {
	PharmacyToStoreRO save(PharmacyToStoreRO pharmacyToStoreRO, HttpServletRequest request);
}
