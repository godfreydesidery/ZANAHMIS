/**
 * 
 */
package com.orbix.api.service;

import java.util.List;

import com.orbix.api.domain.DiagnosisType;

/**
 * @author Godfrey
 *
 */
public interface DiagnosisTypeService {
	DiagnosisType save(DiagnosisType diagnosisType);	
	List<DiagnosisType>getDiagnosisTypes(); // return all the diagnosisTypes
	DiagnosisType getDiagnosisTypeByName(String name);
	DiagnosisType getDiagnosisTypeById(Long id);
	boolean deleteDiagnosisType(DiagnosisType diagnosisType);
}
