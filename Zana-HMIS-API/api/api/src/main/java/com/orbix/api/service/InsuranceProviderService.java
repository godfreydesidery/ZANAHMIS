/**
 * 
 */
package com.orbix.api.service;

import java.util.List;

import com.orbix.api.domain.InsuranceProvider;

/**
 * @author Godfrey
 *
 */

public interface InsuranceProviderService {
	InsuranceProvider save(InsuranceProvider insuranceProvider);	
	List<InsuranceProvider>getInsuranceProviders(); // return all the insuranceProviders
	InsuranceProvider getInsuranceProviderByName(String name);
	InsuranceProvider getInsuranceProviderById(Long id);
	boolean deleteInsuranceProvider(InsuranceProvider insuranceProvider);
}
