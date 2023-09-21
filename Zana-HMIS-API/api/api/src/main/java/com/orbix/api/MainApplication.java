package com.orbix.api;

import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;
import java.util.TimeZone;

import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.annotation.Order;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.multipart.support.MultipartFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.orbix.api.domain.CompanyProfile;
import com.orbix.api.domain.Day;
import com.orbix.api.domain.Privilege;
import com.orbix.api.domain.Role;
import com.orbix.api.domain.User;
import com.orbix.api.repositories.AdmissionRepository;
import com.orbix.api.repositories.CompanyProfileRepository;
import com.orbix.api.repositories.ConsultationRepository;
import com.orbix.api.repositories.DayRepository;
import com.orbix.api.repositories.LabTestRepository;
import com.orbix.api.repositories.NonConsultationRepository;
import com.orbix.api.repositories.PatientBillRepository;
import com.orbix.api.repositories.PrescriptionRepository;
import com.orbix.api.repositories.PrivilegeRepository;
import com.orbix.api.repositories.ProcedureRepository;
import com.orbix.api.repositories.RadiologyRepository;
import com.orbix.api.security.Object_;
import com.orbix.api.security.Operation;
import com.orbix.api.service.CompanyProfileService;
import com.orbix.api.service.DayService;
import com.orbix.api.service.UserService;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication()
@ComponentScan(basePackages={"com.orbix.api"})
@EnableJpaAuditing
@EnableAutoConfiguration
@EnableSwagger2
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Data
@RequiredArgsConstructor
public class MainApplication {
protected ConfigurableApplicationContext springContext;

    DayRepository dayRepository;
    CompanyProfileRepository companyProfileRepository;
    UserService userService;
    private final PrivilegeRepository privilegeRepository;
    
    private final ConsultationRepository consultationRepository;
	private final NonConsultationRepository nonConsultationRepository;
	private final AdmissionRepository admissionRepository;
	private final PatientBillRepository patientBillRepository;
	private final LabTestRepository labTestRepository;
	private final RadiologyRepository radiologyRepository;
	private final ProcedureRepository procedureRepository;
	private final PrescriptionRepository prescriptionRepository;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Bean
    public CorsFilter corsFilter() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        // Don't do this in production, use a proper list  of allowed origins
        config.setAllowedOrigins(Collections.singletonList("*"));
        config.setAllowedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "OPTIONS", "DELETE", "PATCH"));
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
    
	@PostConstruct
	void started() {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		
	}
	
	@PostConstruct
	  public void setUp() {
	    objectMapper.registerModule(new JavaTimeModule());
	  }
	
	public static void main(String[] args) throws Throwable {
		SpringApplication.run(MainApplication.class, args);
		
		
		
	}
	
	@Bean
	void updateRecords() {
		//thread to update patient records periodically
		UpdatePatient updatePatient = new UpdatePatient(
				consultationRepository, 
				nonConsultationRepository, 
				admissionRepository, 
				patientBillRepository,
				labTestRepository, 
				radiologyRepository, 
				procedureRepository, 
				prescriptionRepository);
	    Thread updatePatientThread = new Thread(updatePatient);
	    updatePatientThread.start();
	}
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	CommandLineRunner run(UserService userService, DayService dayService, CompanyProfileService companyProfileService) {
		return args -> {
			if(!companyProfileService.hasData()) {
				log.info("Creating mock company");
				CompanyProfile company = new CompanyProfile(null, "Company Name","Contact Name", null, "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "", "", 0);
				companyProfileService.saveCompanyProfile(company);
			}
			
			if(!dayService.hasData()) {
				/**
				 * Creating the first day
				 */
				log.info("Creating the first day "+(new Day()).toString());
				dayService.saveDay(new Day());
			}
			try {
				userService.saveRole(new Role(null, "ROOT", null), null);
			}catch(Exception e) {}	
			try {
				userService.saveUser(new User(null, "ROOT", "Root", "Root", "Root", "Root@Root", "root", "r00tpA55", true, new ArrayList<>(), null, null, LocalDateTime.now()), null);
			}catch(Exception e) {}		
			try {
				userService.addRoleToUser("root", "ROOT", null);
			}catch(Exception e) {}		
			
			Field[] objectFields = Object_.class.getDeclaredFields();
			Field[] operationFields = Operation.class.getDeclaredFields();
			for(int i = 0; i < objectFields.length; i++) {
				String objectWithProhibition = objectFields[i].get(objectFields[i].getName()).toString();
				String prohibitedSequence = "";
				String object = "";
				if(objectWithProhibition.contains("-")) {								        
					prohibitedSequence = objectWithProhibition.substring(objectWithProhibition.lastIndexOf("-") + 1);
				}else {
					prohibitedSequence = "";
				}
				if(prohibitedSequence.equals("")) {
					object = objectWithProhibition;
				}else {
					object = objectWithProhibition.substring(0, objectWithProhibition.indexOf("-"));
				}
				List<String> prohibitedOperations = new ArrayList<>();
				Scanner sc = new Scanner(prohibitedSequence);
				if(!prohibitedSequence.equals("")) {
					while (sc.hasNext()) {
						prohibitedOperations.add(sc.next());						
					}
					sc.close();
				}
				for(int j = 0; j < operationFields.length; j++) {
					Privilege privilege = new Privilege();
					
					//privilege.setName(objectFields[i].getName()+"-"+operationFields[j].getName());
					if(!prohibitedOperations.contains(operationFields[j].getName().toString())) {
						privilege.setName(object+"-"+operationFields[j].getName());
						try {
							if(!privilegeRepository.existsByName(privilege.getName())) {
								userService.savePrivilege(privilege, null);
							}
						}catch(Exception e) {
							System.out.println("Could not save privilege");
						}
					}										
				}
			}
			try {
				userService.addPrivilegeToRole("ROOT", "ADMIN-A");
				userService.addPrivilegeToRole("ROOT", "ADMIN-C");
				userService.addPrivilegeToRole("ROOT", "ADMIN-R");
				userService.addPrivilegeToRole("ROOT", "ADMIN-U");
				userService.addPrivilegeToRole("ROOT", "ADMIN-D");
				
				userService.addPrivilegeToRole("ROOT", "USER-A");
				userService.addPrivilegeToRole("ROOT", "USER-C");
				userService.addPrivilegeToRole("ROOT", "USER-R");
				userService.addPrivilegeToRole("ROOT", "USER-U");
				userService.addPrivilegeToRole("ROOT", "USER-D");
				
				userService.addPrivilegeToRole("ROOT", "ROLE-A");
				userService.addPrivilegeToRole("ROOT", "ROLE-C");
				userService.addPrivilegeToRole("ROOT", "ROLE-R");
				userService.addPrivilegeToRole("ROOT", "ROLE-U");
				userService.addPrivilegeToRole("ROOT", "ROLE-D");
				userService.addPrivilegeToRole("ROOT", "ROLE-T");
					
			}catch(Exception e) {}			
		};
	}
	
	@Bean
   public Docket erpApi() {
      return new Docket(DocumentationType.SWAGGER_2).select()
         .apis(RequestHandlerSelectors.basePackage("com.orbix.api")).build();
   }
	
	@Bean
	public CommonsMultipartResolver multipartResolver() {
	    CommonsMultipartResolver multipart = new CommonsMultipartResolver();
	    multipart.setMaxUploadSize(3 * 1024 * 1024);
	    return multipart;
	}

	@Bean
	@Order(0)
	public MultipartFilter multipartFilter() {
	    MultipartFilter multipartFilter = new MultipartFilter();
	    multipartFilter.setMultipartResolverBeanName("multipartResolver");
	    return multipartFilter;
	}
}
