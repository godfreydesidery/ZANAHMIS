/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.PatientObservationChart;

/**
 * @author Godfrey
 *
 */
public interface PatientObservationChartRepository extends JpaRepository<PatientObservationChart, Long> {

}
