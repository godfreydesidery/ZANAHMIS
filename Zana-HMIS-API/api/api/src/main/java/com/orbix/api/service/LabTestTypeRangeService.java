/**
 * 
 */
package com.orbix.api.service;

import java.util.List;

import com.orbix.api.domain.LabTestTypeRange;

/**
 * @author Godfrey
 *
 */
public interface LabTestTypeRangeService {
	LabTestTypeRange save(LabTestTypeRange labTestTypeRange);	
	List<LabTestTypeRange>getLabTestTypeRanges(); // return all the labTestTypeRanges
	LabTestTypeRange getLabTestTypeRangeByName(String name);
	LabTestTypeRange getLabTestTypeRangeById(Long id);
	boolean deleteLabTestTypeRange(LabTestTypeRange labTestTypeRange);
}
