/**
 * 
 */
package com.orbix.api.service;

import java.util.List;

import com.orbix.api.domain.LabTestType;

/**
 * @author Godfrey
 *
 */
public interface LabTestTypeService {
	LabTestType save(LabTestType labTestType);	
	List<LabTestType>getLabTestTypes(); // return all the labTestTypes
	LabTestType getLabTestTypeByName(String name);
	LabTestType getLabTestTypeById(Long id);
	boolean deleteLabTestType(LabTestType labTestType);
}
