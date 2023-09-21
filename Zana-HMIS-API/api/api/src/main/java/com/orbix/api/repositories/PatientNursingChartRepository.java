/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.PatientNursingChart;

/**
 * @author Godfrey
 *
 */
public interface PatientNursingChartRepository extends JpaRepository<PatientNursingChart, Long> {

}
