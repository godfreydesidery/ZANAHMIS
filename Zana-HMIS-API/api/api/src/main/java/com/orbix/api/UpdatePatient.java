/**
 * 
 */
package com.orbix.api;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.orbix.api.domain.Consultation;
import com.orbix.api.domain.NonConsultation;
import com.orbix.api.repositories.AdmissionRepository;
import com.orbix.api.repositories.ConsultationRepository;
import com.orbix.api.repositories.DayRepository;
import com.orbix.api.repositories.MedicineInsurancePlanRepository;
import com.orbix.api.repositories.NonConsultationRepository;
import com.orbix.api.repositories.UserRepository;
import com.orbix.api.service.DayService;
import com.orbix.api.service.MedicinePlanServiceImpl;
import com.orbix.api.service.UserService;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * @author Godfrey
 *
 */
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
@Data
public class UpdatePatient implements Runnable{

	private final ConsultationRepository consultationRepository;
	private final NonConsultationRepository nonConsultationRepository;
	private final AdmissionRepository admissionRepository;
	
	@Override
	public void run() {
		
		while(true) {
			try {
				try {
					Thread.sleep(300000);///waits for 5 minutes
					//Thread.sleep(5000);//to use for testing
				}catch(Exception e) {}				
				/**
				 * Update consultations
				 */
				List<String> conStatuses = new ArrayList<>();
				conStatuses.add("PENDING");
				conStatuses.add("IN-PROCESS");
				conStatuses.add("TRANSFERED");
				List<Consultation> cs = consultationRepository.findAllByStatusIn(conStatuses);
				
				for(Consultation c : cs) {
					long difference = ChronoUnit.HOURS.between(c.getCreatedAt(), LocalDateTime.now());
					if(difference >= 24) {
						//
						c.setStatus("SIGNED-OUT");
						consultationRepository.save(c);
					}
				}
				
				List<NonConsultation> ncs = nonConsultationRepository.findAllByStatusIn(conStatuses);
				
				for(NonConsultation c : ncs) {
					long difference = ChronoUnit.HOURS.between(c.getCreatedAt(), LocalDateTime.now());
					if(difference >= 24) {
						//
						c.setStatus("SIGNED-OUT");
						nonConsultationRepository.save(c);
					}
				}
			}catch(Exception e) {}	
		}
	}
}
