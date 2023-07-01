/**
 * 
 */
package com.orbix.api.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.orbix.api.domain.RadiologyType;
import com.orbix.api.repositories.DayRepository;
import com.orbix.api.repositories.RadiologyTypeRepository;
import com.orbix.api.repositories.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * @author Godfrey
 *
 */
public interface RadiologyTypeService {
	RadiologyType save(RadiologyType radiologyType);	
	List<RadiologyType>getRadiologyTypes(); // return all the radiologyTypes
	RadiologyType getRadiologyTypeByName(String name);
	RadiologyType getRadiologyTypeById(Long id);
	boolean deleteRadiologyType(RadiologyType radiologyType);
}
