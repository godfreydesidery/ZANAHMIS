/**
 * 
 */
package com.orbix.api.service;

import javax.servlet.http.HttpServletRequest;

import com.orbix.api.domain.Medicine;
import com.orbix.api.domain.PharmacyToStoreRO;
import com.orbix.api.domain.PharmacyToStoreRODetail;
import com.orbix.api.models.PharmacyToStoreROModel;
import com.orbix.api.models.RecordModel;

/**
 * @author Godfrey
 *
 */
public interface PharmacyToStoreROService {
	PharmacyToStoreROModel save(PharmacyToStoreRO pharmacyToStoreRO, HttpServletRequest request);
	boolean saveDetail(PharmacyToStoreRODetail pharmacyToStoreRODetail, HttpServletRequest request);

	/**
	 * @return
	 */
	RecordModel requestNo();
}
