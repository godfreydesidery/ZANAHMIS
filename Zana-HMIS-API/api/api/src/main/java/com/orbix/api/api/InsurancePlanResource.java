/**
 * 
 */
package com.orbix.api.api;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.orbix.api.api.accessories.Sanitizer;
import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.domain.InsuranceProvider;
import com.orbix.api.domain.LabTestType;
import com.orbix.api.domain.LabTestTypeInsurancePlan;
import com.orbix.api.domain.Medicine;
import com.orbix.api.domain.MedicineInsurancePlan;
import com.orbix.api.domain.ProcedureType;
import com.orbix.api.domain.ProcedureTypeInsurancePlan;
import com.orbix.api.domain.RadiologyType;
import com.orbix.api.domain.RadiologyTypeInsurancePlan;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.exceptions.NotFoundException;
import com.orbix.api.domain.InsurancePlan;
import com.orbix.api.repositories.InsurancePlanRepository;
import com.orbix.api.repositories.InsuranceProviderRepository;
import com.orbix.api.repositories.LabTestTypeInsurancePlanRepository;
import com.orbix.api.repositories.LabTestTypeRepository;
import com.orbix.api.repositories.MedicineInsurancePlanRepository;
import com.orbix.api.repositories.MedicineRepository;
import com.orbix.api.repositories.ProcedureTypeInsurancePlanRepository;
import com.orbix.api.repositories.ProcedureTypeRepository;
import com.orbix.api.repositories.RadiologyTypeInsurancePlanRepository;
import com.orbix.api.repositories.RadiologyTypeRepository;
import com.orbix.api.repositories.InsurancePlanRepository;
import com.orbix.api.service.DayService;
import com.orbix.api.service.InsurancePlanService;
import com.orbix.api.service.UserService;
import com.orbix.api.service.InsurancePlanService;

import lombok.Data;
import lombok.RequiredArgsConstructor;

/**
 * @author Godfrey
 *
 */
@RestController
@RequestMapping("/zana-hmis-api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Transactional
public class InsurancePlanResource {
	private final InsuranceProviderRepository insuranceProviderRepository;
	private final InsurancePlanRepository insurancePlanRepository;
	private final InsurancePlanService insurancePlanService;
	private final UserService userService;
	private final DayService dayService;
	
	private final LabTestTypeRepository labTestTypeRepository;
	private final LabTestTypeInsurancePlanRepository labTestTypeInsurancePlanRepository;
	
	private final ProcedureTypeRepository procedureTypeRepository;
	private final ProcedureTypeInsurancePlanRepository procedureTypeInsurancePlanRepository;
	
	private final RadiologyTypeRepository radiologyTypeRepository;
	private final RadiologyTypeInsurancePlanRepository radiologyTypeInsurancePlanRepository;
	
	private final MedicineRepository medicineRepository;
	private final MedicineInsurancePlanRepository medicineInsurancePlanRepository;
	
	
	@GetMapping("/insurance_plans")
	public ResponseEntity<List<InsurancePlan>>getInsurancePlans(HttpServletRequest request){
		return ResponseEntity.ok().body(insurancePlanService.getInsurancePlans(request));
	}
	
	@GetMapping("/insurance_plans/get")
	public ResponseEntity<InsurancePlan> getInsurancePlan(
			@RequestParam(name = "id") Long id,
			HttpServletRequest request){
		return ResponseEntity.ok().body(insurancePlanService.getInsurancePlanById(id, request));
	}
	
	@GetMapping("/insurance_plans/get_names")
	public ResponseEntity<List<String>> getInsurancePlanNames(HttpServletRequest request){
		List<String> names = new ArrayList<String>();
		names = insurancePlanRepository.getNames();
		return ResponseEntity.ok().body(names);
	}
	
	@GetMapping("/insurance_plans/get_names_by_insurance_provider")
	public ResponseEntity<List<String>> getInsurancePlanNames(
			@RequestParam(name = "provider_name") String providerName,
			HttpServletRequest request){
		List<String> names = new ArrayList<String>();
		InsuranceProvider insuranceProvider = insuranceProviderRepository.findByName(providerName);
		List<InsurancePlan> plans = insurancePlanRepository.findAllByInsuranceProvider(insuranceProvider);
		for(InsurancePlan p : plans) {
			names.add(p.getName());
		}
		return ResponseEntity.ok().body(names);
	}
	
	@PostMapping("/insurance_plans/save")
	@PreAuthorize("hasAnyAuthority('ADMIN-A')")
	public ResponseEntity<InsurancePlan>save(
			@RequestBody InsurancePlan insurancePlan,
			HttpServletRequest request){
		InsuranceProvider insuranceProvider = insuranceProviderRepository.findByName(insurancePlan.getInsuranceProvider().getName());
		insurancePlan.setInsuranceProvider(insuranceProvider);
		insurancePlan.setName(insurancePlan.getName());
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/insurance_plans/save").toUriString());
		return ResponseEntity.created(uri).body(insurancePlanService.save(insurancePlan, request));
	}
	
	@GetMapping("/insurance_plans/get_lab_test_type_cash_prices")
	public ResponseEntity<List<LabTestType>> getLabTestTypeCashPrices(
			HttpServletRequest request){
		return ResponseEntity.ok().body(labTestTypeRepository.findAll());
	}
	
	@GetMapping("/insurance_plans/get_lab_test_type_prices")
	public ResponseEntity<List<LLabTestTypePrice>> getLabTestTypePrices(
			@RequestParam(name = "insurance_plan_id") Long insurancePlanId,
			HttpServletRequest request){
		List<LLabTestTypePrice> labTestTypePrices = new ArrayList<>();
		List<LabTestType> labTestTypes = labTestTypeRepository.findAll();
		for(LabTestType t : labTestTypes) {
			LLabTestTypePrice labTestTypePrice = new LLabTestTypePrice();
			labTestTypePrice.setLabTestType(t);
			if(insurancePlanId == 0) {
				labTestTypePrice.setPrice(t.getPrice());
			}else if(insurancePlanId > 0) {
				Optional<InsurancePlan> i = insurancePlanRepository.findById(insurancePlanId);
				if(i.isEmpty()) {
					throw new NotFoundException("Insurance package not found");
				}
				Optional<LabTestTypeInsurancePlan> p = labTestTypeInsurancePlanRepository.findByLabTestTypeAndInsurancePlan(t, i.get());
				LabTestTypeInsurancePlan plan;
				if(p.isEmpty()) {
					//create
					plan = new LabTestTypeInsurancePlan();
					plan.setActive(true);
					plan.setCovered(false);
					plan.setPrice(0);
					plan.setInsurancePlan(i.get());
					plan.setLabTestType(t);
					
					plan.setCreatedby(userService.getUserId(request));
					plan.setCreatedOn(dayService.getDayId());
					plan.setCreatedAt(LocalDateTime.now());
					
					plan = labTestTypeInsurancePlanRepository.save(plan);
				}else {
					plan = p.get();
				}
				labTestTypePrice.setLabTestTypeInsurancePlan(plan);
				labTestTypePrice.setPrice(plan.getPrice());
			}else {
				throw new InvalidOperationException("Invalid package type selected");
			}
			labTestTypePrices.add(labTestTypePrice);
		}
		return ResponseEntity.ok().body(labTestTypePrices);
	}
	
	@PostMapping("/insurance_plans/change_lab_test_type_coverage")
	public ResponseEntity<LLabTestTypePrice> changeLabTestTypeCoverage(
			@RequestBody LLabTestTypePrice labTestTypePrice,
			HttpServletRequest request){
		Optional<LabTestType> tt = labTestTypeRepository.findById(labTestTypePrice.getLabTestType().getId());
		if(tt.isEmpty()) {
			throw new NotFoundException("Selected lab test type not found");
		}
		Optional<InsurancePlan> ip = insurancePlanRepository.findById(labTestTypePrice.getLabTestTypeInsurancePlan().getInsurancePlan().getId());
		if(ip.isEmpty()) {
			throw new NotFoundException("Selected plan not found");
		}
		boolean covered = labTestTypePrice.getLabTestTypeInsurancePlan().isCovered();
		Optional<LabTestTypeInsurancePlan> lttip = labTestTypeInsurancePlanRepository.findByInsurancePlanAndLabTestType(ip.get(), tt.get());
		if(lttip.isEmpty()) {
			throw new NotFoundException("Selected package not found");
		}
		if(covered == true) {
			if(lttip.get().getPrice() <= 0) {
				throw new InvalidOperationException("Could not change coverage. Invalid price value. Should not be equal or less than zero");
			}
		}
		lttip.get().setCovered(covered);
		LabTestTypeInsurancePlan plan = labTestTypeInsurancePlanRepository.save(lttip.get());
		
		LLabTestTypePrice coverage = new LLabTestTypePrice();
		coverage.setLabTestType(tt.get());
		coverage.setLabTestTypeInsurancePlan(plan);
		coverage.setPrice(plan.getPrice());
		
		
		return ResponseEntity.ok().body(coverage);
	}
	
	@PostMapping("/insurance_plans/update_lab_test_type_price_by_insurance")
	public ResponseEntity<LLabTestTypePrice> updateLabTestTypePriceByInsurance(
			@RequestBody LLabTestTypePrice labTestTypePrice,
			HttpServletRequest request){
		Optional<LabTestType> tt = labTestTypeRepository.findById(labTestTypePrice.getLabTestType().getId());
		if(tt.isEmpty()) {
			throw new NotFoundException("Selected test type not found");
		}
		Optional<InsurancePlan> ip = insurancePlanRepository.findById(labTestTypePrice.getLabTestTypeInsurancePlan().getInsurancePlan().getId());
		if(ip.isEmpty()) {
			throw new NotFoundException("Selected plan not found");
		}
		double price = labTestTypePrice.getLabTestTypeInsurancePlan().getPrice();
		Optional<LabTestTypeInsurancePlan> lttip = labTestTypeInsurancePlanRepository.findByInsurancePlanAndLabTestType(ip.get(), tt.get());
		if(lttip.isEmpty()) {
			throw new NotFoundException("Selected package not found");
		}
		if(price == 0) {
			lttip.get().setCovered(false);
		}else if(price < 0) {
			throw new InvalidOperationException("Invalid Price value. Price should not be less than zero");
		}
		lttip.get().setPrice(price);
		
		LabTestTypeInsurancePlan plan = labTestTypeInsurancePlanRepository.save(lttip.get());
		
		LLabTestTypePrice coverage = new LLabTestTypePrice();
		coverage.setLabTestType(tt.get());
		coverage.setLabTestTypeInsurancePlan(plan);
		coverage.setPrice(plan.getPrice());
		
		return ResponseEntity.ok().body(coverage);
	}
	
	
	@GetMapping("/insurance_plans/get_procedure_type_prices")
	public ResponseEntity<List<LProcedureTypePrice>> getProcedureTypePrices(
			@RequestParam(name = "insurance_plan_id") Long insurancePlanId,
			HttpServletRequest request){
		List<LProcedureTypePrice> procedureTypePrices = new ArrayList<>();
		List<ProcedureType> procedureTypes = procedureTypeRepository.findAll();
		for(ProcedureType t : procedureTypes) {
			LProcedureTypePrice procedureTypePrice = new LProcedureTypePrice();
			procedureTypePrice.setProcedureType(t);
			if(insurancePlanId == 0) {
				procedureTypePrice.setPrice(t.getPrice());
			}else if(insurancePlanId > 0) {
				Optional<InsurancePlan> i = insurancePlanRepository.findById(insurancePlanId);
				if(i.isEmpty()) {
					throw new NotFoundException("Insurance package not found");
				}
				Optional<ProcedureTypeInsurancePlan> p = procedureTypeInsurancePlanRepository.findByProcedureTypeAndInsurancePlan(t, i.get());
				ProcedureTypeInsurancePlan plan;
				if(p.isEmpty()) {
					//create
					plan = new ProcedureTypeInsurancePlan();
					plan.setActive(true);
					plan.setCovered(false);
					plan.setPrice(0);
					plan.setInsurancePlan(i.get());
					plan.setProcedureType(t);
					
					plan.setCreatedby(userService.getUserId(request));
					plan.setCreatedOn(dayService.getDayId());
					plan.setCreatedAt(LocalDateTime.now());
					
					plan = procedureTypeInsurancePlanRepository.save(plan);
				}else {
					plan = p.get();
				}
				procedureTypePrice.setProcedureTypeInsurancePlan(plan);
				procedureTypePrice.setPrice(plan.getPrice());
			}else {
				throw new InvalidOperationException("Invalid package type selected");
			}
			procedureTypePrices.add(procedureTypePrice);
		}
		return ResponseEntity.ok().body(procedureTypePrices);
	}
	
	@PostMapping("/insurance_plans/change_procedure_type_coverage")
	public ResponseEntity<LProcedureTypePrice> changeProcedureTypeCoverage(
			@RequestBody LProcedureTypePrice procedureTypePrice,
			HttpServletRequest request){
		Optional<ProcedureType> tt = procedureTypeRepository.findById(procedureTypePrice.getProcedureType().getId());
		if(tt.isEmpty()) {
			throw new NotFoundException("Selected procedure type not found");
		}
		Optional<InsurancePlan> ip = insurancePlanRepository.findById(procedureTypePrice.getProcedureTypeInsurancePlan().getInsurancePlan().getId());
		if(ip.isEmpty()) {
			throw new NotFoundException("Selected plan not found");
		}
		boolean covered = procedureTypePrice.getProcedureTypeInsurancePlan().isCovered();
		Optional<ProcedureTypeInsurancePlan> lttip = procedureTypeInsurancePlanRepository.findByInsurancePlanAndProcedureType(ip.get(), tt.get());
		if(lttip.isEmpty()) {
			throw new NotFoundException("Selected package not found");
		}
		if(covered == true) {
			if(lttip.get().getPrice() <= 0) {
				throw new InvalidOperationException("Could not change coverage. Invalid price value. Should not be equal or less than zero");
			}
		}
		lttip.get().setCovered(covered);
		ProcedureTypeInsurancePlan plan = procedureTypeInsurancePlanRepository.save(lttip.get());
		
		LProcedureTypePrice coverage = new LProcedureTypePrice();
		coverage.setProcedureType(tt.get());
		coverage.setProcedureTypeInsurancePlan(plan);
		coverage.setPrice(plan.getPrice());
		
		
		return ResponseEntity.ok().body(coverage);
	}
	
	@PostMapping("/insurance_plans/update_procedure_type_price_by_insurance")
	public ResponseEntity<LProcedureTypePrice> updateProcedureTypePriceByInsurance(
			@RequestBody LProcedureTypePrice procedureTypePrice,
			HttpServletRequest request){
		Optional<ProcedureType> tt = procedureTypeRepository.findById(procedureTypePrice.getProcedureType().getId());
		if(tt.isEmpty()) {
			throw new NotFoundException("Selected procedure not found");
		}
		Optional<InsurancePlan> ip = insurancePlanRepository.findById(procedureTypePrice.getProcedureTypeInsurancePlan().getInsurancePlan().getId());
		if(ip.isEmpty()) {
			throw new NotFoundException("Selected plan not found");
		}
		double price = procedureTypePrice.getProcedureTypeInsurancePlan().getPrice();
		Optional<ProcedureTypeInsurancePlan> lttip = procedureTypeInsurancePlanRepository.findByInsurancePlanAndProcedureType(ip.get(), tt.get());
		if(lttip.isEmpty()) {
			throw new NotFoundException("Selected package not found");
		}
		if(price == 0) {
			lttip.get().setCovered(false);
		}else if(price < 0) {
			throw new InvalidOperationException("Invalid Price value. Price should not be less than zero");
		}
		lttip.get().setPrice(price);
		
		ProcedureTypeInsurancePlan plan = procedureTypeInsurancePlanRepository.save(lttip.get());
		
		LProcedureTypePrice coverage = new LProcedureTypePrice();
		coverage.setProcedureType(tt.get());
		coverage.setProcedureTypeInsurancePlan(plan);
		coverage.setPrice(plan.getPrice());
		
		return ResponseEntity.ok().body(coverage);
	}
	
	
	@GetMapping("/insurance_plans/get_radiology_type_prices")
	public ResponseEntity<List<LRadiologyTypePrice>> getRadiologyTypePrices(
			@RequestParam(name = "insurance_plan_id") Long insurancePlanId,
			HttpServletRequest request){
		List<LRadiologyTypePrice> radiologyTypePrices = new ArrayList<>();
		List<RadiologyType> radiologyTypes = radiologyTypeRepository.findAll();
		for(RadiologyType t : radiologyTypes) {
			LRadiologyTypePrice radiologyTypePrice = new LRadiologyTypePrice();
			radiologyTypePrice.setRadiologyType(t);
			if(insurancePlanId == 0) {
				radiologyTypePrice.setPrice(t.getPrice());
			}else if(insurancePlanId > 0) {
				Optional<InsurancePlan> i = insurancePlanRepository.findById(insurancePlanId);
				if(i.isEmpty()) {
					throw new NotFoundException("Insurance package not found");
				}
				Optional<RadiologyTypeInsurancePlan> p = radiologyTypeInsurancePlanRepository.findByRadiologyTypeAndInsurancePlan(t, i.get());
				RadiologyTypeInsurancePlan plan;
				if(p.isEmpty()) {
					//create
					plan = new RadiologyTypeInsurancePlan();
					plan.setActive(true);
					plan.setCovered(false);
					plan.setPrice(0);
					plan.setInsurancePlan(i.get());
					plan.setRadiologyType(t);
					
					plan.setCreatedby(userService.getUserId(request));
					plan.setCreatedOn(dayService.getDayId());
					plan.setCreatedAt(LocalDateTime.now());
					
					plan = radiologyTypeInsurancePlanRepository.save(plan);
				}else {
					plan = p.get();
				}
				radiologyTypePrice.setRadiologyTypeInsurancePlan(plan);
				radiologyTypePrice.setPrice(plan.getPrice());
			}else {
				throw new InvalidOperationException("Invalid package type selected");
			}
			radiologyTypePrices.add(radiologyTypePrice);
		}
		return ResponseEntity.ok().body(radiologyTypePrices);
	}
	
	@PostMapping("/insurance_plans/change_radiology_type_coverage")
	public ResponseEntity<LRadiologyTypePrice> changeRadiologyTypeCoverage(
			@RequestBody LRadiologyTypePrice radiologyTypePrice,
			HttpServletRequest request){
		Optional<RadiologyType> tt = radiologyTypeRepository.findById(radiologyTypePrice.getRadiologyType().getId());
		if(tt.isEmpty()) {
			throw new NotFoundException("Selected radiology type not found");
		}
		Optional<InsurancePlan> ip = insurancePlanRepository.findById(radiologyTypePrice.getRadiologyTypeInsurancePlan().getInsurancePlan().getId());
		if(ip.isEmpty()) {
			throw new NotFoundException("Selected plan not found");
		}
		boolean covered = radiologyTypePrice.getRadiologyTypeInsurancePlan().isCovered();
		Optional<RadiologyTypeInsurancePlan> lttip = radiologyTypeInsurancePlanRepository.findByInsurancePlanAndRadiologyType(ip.get(), tt.get());
		if(lttip.isEmpty()) {
			throw new NotFoundException("Selected package not found");
		}
		if(covered == true) {
			if(lttip.get().getPrice() <= 0) {
				throw new InvalidOperationException("Could not change coverage. Invalid price value. Should not be equal or less than zero");
			}
		}
		lttip.get().setCovered(covered);
		RadiologyTypeInsurancePlan plan = radiologyTypeInsurancePlanRepository.save(lttip.get());
		
		LRadiologyTypePrice coverage = new LRadiologyTypePrice();
		coverage.setRadiologyType(tt.get());
		coverage.setRadiologyTypeInsurancePlan(plan);
		coverage.setPrice(plan.getPrice());
		
		
		return ResponseEntity.ok().body(coverage);
	}
	
	@PostMapping("/insurance_plans/update_radiology_type_price_by_insurance")
	public ResponseEntity<LRadiologyTypePrice> updateRadiologyTypePriceByInsurance(
			@RequestBody LRadiologyTypePrice radiologyTypePrice,
			HttpServletRequest request){
		Optional<RadiologyType> tt = radiologyTypeRepository.findById(radiologyTypePrice.getRadiologyType().getId());
		if(tt.isEmpty()) {
			throw new NotFoundException("Selected radiology not found");
		}
		Optional<InsurancePlan> ip = insurancePlanRepository.findById(radiologyTypePrice.getRadiologyTypeInsurancePlan().getInsurancePlan().getId());
		if(ip.isEmpty()) {
			throw new NotFoundException("Selected plan not found");
		}
		double price = radiologyTypePrice.getRadiologyTypeInsurancePlan().getPrice();
		Optional<RadiologyTypeInsurancePlan> lttip = radiologyTypeInsurancePlanRepository.findByInsurancePlanAndRadiologyType(ip.get(), tt.get());
		if(lttip.isEmpty()) {
			throw new NotFoundException("Selected package not found");
		}
		if(price == 0) {
			lttip.get().setCovered(false);
		}else if(price < 0) {
			throw new InvalidOperationException("Invalid Price value. Price should not be less than zero");
		}
		lttip.get().setPrice(price);
		
		RadiologyTypeInsurancePlan plan = radiologyTypeInsurancePlanRepository.save(lttip.get());
		
		LRadiologyTypePrice coverage = new LRadiologyTypePrice();
		coverage.setRadiologyType(tt.get());
		coverage.setRadiologyTypeInsurancePlan(plan);
		coverage.setPrice(plan.getPrice());
		
		return ResponseEntity.ok().body(coverage);
	}
	
	
	@GetMapping("/insurance_plans/get_medicine_prices")
	public ResponseEntity<List<LMedicinePrice>> getMedicinePrices(
			@RequestParam(name = "insurance_plan_id") Long insurancePlanId,
			HttpServletRequest request){
		List<LMedicinePrice> medicinePrices = new ArrayList<>();
		List<Medicine> medicines = medicineRepository.findAll();
		for(Medicine t : medicines) {
			LMedicinePrice medicinePrice = new LMedicinePrice();
			medicinePrice.setMedicine(t);
			if(insurancePlanId == 0) {
				medicinePrice.setPrice(t.getPrice());
			}else if(insurancePlanId > 0) {
				Optional<InsurancePlan> i = insurancePlanRepository.findById(insurancePlanId);
				if(i.isEmpty()) {
					throw new NotFoundException("Insurance package not found");
				}
				Optional<MedicineInsurancePlan> p = medicineInsurancePlanRepository.findByMedicineAndInsurancePlan(t, i.get());
				MedicineInsurancePlan plan;
				if(p.isEmpty()) {
					//create
					plan = new MedicineInsurancePlan();
					plan.setActive(true);
					plan.setCovered(false);
					plan.setPrice(0);
					plan.setInsurancePlan(i.get());
					plan.setMedicine(t);
					
					plan.setCreatedby(userService.getUserId(request));
					plan.setCreatedOn(dayService.getDayId());
					plan.setCreatedAt(LocalDateTime.now());
					
					plan = medicineInsurancePlanRepository.save(plan);
				}else {
					plan = p.get();
				}
				medicinePrice.setMedicineInsurancePlan(plan);
				medicinePrice.setPrice(plan.getPrice());
			}else {
				throw new InvalidOperationException("Invalid package type selected");
			}
			medicinePrices.add(medicinePrice);
		}
		return ResponseEntity.ok().body(medicinePrices);
	}
	
	@PostMapping("/insurance_plans/change_medicine_coverage")
	public ResponseEntity<LMedicinePrice> changeMedicineCoverage(
			@RequestBody LMedicinePrice medicinePrice,
			HttpServletRequest request){
		Optional<Medicine> tt = medicineRepository.findById(medicinePrice.getMedicine().getId());
		if(tt.isEmpty()) {
			throw new NotFoundException("Selected medicine type not found");
		}
		Optional<InsurancePlan> ip = insurancePlanRepository.findById(medicinePrice.getMedicineInsurancePlan().getInsurancePlan().getId());
		if(ip.isEmpty()) {
			throw new NotFoundException("Selected plan not found");
		}
		boolean covered = medicinePrice.getMedicineInsurancePlan().isCovered();
		Optional<MedicineInsurancePlan> lttip = medicineInsurancePlanRepository.findByInsurancePlanAndMedicine(ip.get(), tt.get());
		if(lttip.isEmpty()) {
			throw new NotFoundException("Selected package not found");
		}
		if(covered == true) {
			if(lttip.get().getPrice() <= 0) {
				throw new InvalidOperationException("Could not change coverage. Invalid price value. Should not be equal or less than zero");
			}
		}
		lttip.get().setCovered(covered);
		MedicineInsurancePlan plan = medicineInsurancePlanRepository.save(lttip.get());
		
		LMedicinePrice coverage = new LMedicinePrice();
		coverage.setMedicine(tt.get());
		coverage.setMedicineInsurancePlan(plan);
		coverage.setPrice(plan.getPrice());
		
		
		return ResponseEntity.ok().body(coverage);
	}
	
	@PostMapping("/insurance_plans/update_medicine_price_by_insurance")
	public ResponseEntity<LMedicinePrice> updateMedicinePriceByInsurance(
			@RequestBody LMedicinePrice medicinePrice,
			HttpServletRequest request){
		Optional<Medicine> tt = medicineRepository.findById(medicinePrice.getMedicine().getId());
		if(tt.isEmpty()) {
			throw new NotFoundException("Selected medicine not found");
		}
		Optional<InsurancePlan> ip = insurancePlanRepository.findById(medicinePrice.getMedicineInsurancePlan().getInsurancePlan().getId());
		if(ip.isEmpty()) {
			throw new NotFoundException("Selected plan not found");
		}
		double price = medicinePrice.getMedicineInsurancePlan().getPrice();
		Optional<MedicineInsurancePlan> lttip = medicineInsurancePlanRepository.findByInsurancePlanAndMedicine(ip.get(), tt.get());
		if(lttip.isEmpty()) {
			throw new NotFoundException("Selected package not found");
		}
		if(price == 0) {
			lttip.get().setCovered(false);
		}else if(price < 0) {
			throw new InvalidOperationException("Invalid Price value. Price should not be less than zero");
		}
		lttip.get().setPrice(price);
		
		MedicineInsurancePlan plan = medicineInsurancePlanRepository.save(lttip.get());
		
		LMedicinePrice coverage = new LMedicinePrice();
		coverage.setMedicine(tt.get());
		coverage.setMedicineInsurancePlan(plan);
		coverage.setPrice(plan.getPrice());
		
		return ResponseEntity.ok().body(coverage);
	}
	
}

@Data
class LLabTestTypePrice{
	LabTestType labTestType = null;
	LabTestTypeInsurancePlan labTestTypeInsurancePlan = null;
	double price;
}

@Data
class LProcedureTypePrice{
	ProcedureType procedureType = null;
	ProcedureTypeInsurancePlan procedureTypeInsurancePlan = null;
	double price;
}

@Data
class LRadiologyTypePrice{
	RadiologyType radiologyType = null;
	RadiologyTypeInsurancePlan radiologyTypeInsurancePlan = null;
	double price;
}

@Data
class LMedicinePrice{
	Medicine medicine = null;
	MedicineInsurancePlan medicineInsurancePlan = null;
	double price;
}

