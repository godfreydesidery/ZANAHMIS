/**
 * 
 */
package com.orbix.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbix.api.domain.PatientPrescriptionChart;

/**
 * @author Godfrey
 *
 */
public interface PatientPrescriptionChartRepository extends JpaRepository<PatientPrescriptionChart, Long> {

}
