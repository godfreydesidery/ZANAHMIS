/**
 * 
 */
package com.orbix.api.service;

import java.util.List;

import com.orbix.api.domain.ProcedureType;

/**
 * @author Godfrey
 *
 */
public interface ProcedureTypeService {
	ProcedureType save(ProcedureType procedureType);	
	List<ProcedureType>getProcedureTypes(); // return all the procedureTypes
	ProcedureType getProcedureTypeByName(String name);
	ProcedureType getProcedureTypeById(Long id);
	boolean deleteProcedureType(ProcedureType procedureType);
}
