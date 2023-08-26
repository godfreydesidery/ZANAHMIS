/**
 * 
 */
package com.orbix.api.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.orbix.api.accessories.Formater;
import com.orbix.api.domain.Item;
import com.orbix.api.domain.ItemMedicineCoefficient;
import com.orbix.api.domain.PharmacyToStoreRO;
import com.orbix.api.domain.PharmacyToStoreRODetail;
import com.orbix.api.domain.StoreToPharmacyTO;
import com.orbix.api.domain.StoreToPharmacyTODetail;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.exceptions.NotFoundException;
import com.orbix.api.models.RecordModel;
import com.orbix.api.models.StoreToPharmacyTODetailModel;
import com.orbix.api.models.StoreToPharmacyTOModel;
import com.orbix.api.repositories.DayRepository;
import com.orbix.api.repositories.ItemMedicineCoefficientRepository;
import com.orbix.api.repositories.ItemRepository;
import com.orbix.api.repositories.MedicineRepository;
import com.orbix.api.repositories.PharmacyRepository;
import com.orbix.api.repositories.PharmacyToStoreRODetailRepository;
import com.orbix.api.repositories.PharmacyToStoreRORepository;
import com.orbix.api.repositories.StoreToPharmacyTODetailRepository;
import com.orbix.api.repositories.StoreToPharmacyTORepository;
import com.orbix.api.repositories.UserRepository;

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
public class StoreToPharmacyTOServiceImpl implements StoreToPharmacyTOService{

	private final UserRepository userRepository;
	private final UserService userService;
	private final DayRepository dayRepository;
	private final DayService dayService;
	private final PharmacyRepository pharmacyRepository;
	private final PharmacyToStoreRORepository pharmacyToStoreRORepository;
	private final PharmacyToStoreRODetailRepository pharmacyToStoreRODetailRepository;
	private final MedicineRepository medicineRepository;
	private final StoreToPharmacyTORepository storeToPharmacyTORepository;
	private final StoreToPharmacyTODetailRepository storeToPharmacyTODetailRepository;
	private final ItemRepository itemRepository;
	private final ItemMedicineCoefficientRepository itemMedicineCoefficientRepository;
	
	@Override
	public StoreToPharmacyTOModel createOrder(PharmacyToStoreRO pharmacyToStoreRO, HttpServletRequest request) {
		
		Optional<PharmacyToStoreRO> ro = pharmacyToStoreRORepository.findById(pharmacyToStoreRO.getId());
		
		Optional<StoreToPharmacyTO> to = storeToPharmacyTORepository.findByPharmacyToStoreRO(pharmacyToStoreRO);
		StoreToPharmacyTO order = new StoreToPharmacyTO();
		if(to.isEmpty()) {
			if(ro.get().getStatus().equals("SUBMITTED")) {
				ro.get().setStatus("IN-PROCESS");
				ro.get().setStatusDescription("Order under process");
				pharmacyToStoreRORepository.save(ro.get());
			}else {
				throw new InvalidOperationException("Could not create transfer order. Can only create transfer order for submitted requests");
			}
			order.setNo(this.requestTransferOrderNo().getNo());
			order.setOrderDate(LocalDate.now());
			order.setPharmacyToStoreRO(pharmacyToStoreRO);
			order.setPharmacy(pharmacyToStoreRO.getPharmacy());
			order.setStatus("PENDING");
			order.setStatusDescription("Order awaiting for verification");
			
			order.setCreatedBy(userService.getUser(request).getId());
			order.setCreatedOn(dayService.getDay().getId());
			order.setCreatedAt(dayService.getTimeStamp());
			
			order = storeToPharmacyTORepository.save(order);
			
			for(PharmacyToStoreRODetail d : pharmacyToStoreRO.getPharmacyToStoreRODetails()) {
				StoreToPharmacyTODetail orderDetail = new StoreToPharmacyTODetail();
				orderDetail.setStoreToPharmacyTO(order);
				orderDetail.setMedicine(d.getMedicine());
				orderDetail.setOrderedPharmacySKUQty(d.getOrderedQty());
				orderDetail.setStatus("PENDING");
				
				orderDetail.setCreatedBy(userService.getUser(request).getId());
				orderDetail.setCreatedOn(dayService.getDay().getId());
				orderDetail.setCreatedAt(dayService.getTimeStamp());
				
				storeToPharmacyTODetailRepository.save(orderDetail);
				
			}
			order = storeToPharmacyTORepository.findByPharmacyToStoreRO(pharmacyToStoreRO).get();
		}else {
			order = to.get();
		}
		
		
		/*StoreToPharmacyTOModel model = new StoreToPharmacyTOModel();
		List<StoreToPharmacyTODetailModel> modelDetails = new ArrayList<>();
		
		model.setId(order.getId());
		model.setNo(order.getNo());
		model.setPharmacy(order.getPharmacy());
		model.setPharmacyToStoreRO(order.getPharmacyToStoreRO());
		model.setOrderDate(order.getOrderDate());
		model.setStatus(order.getStatus());
		if(order.getStoreToPharmacyTODetails() != null) {
			for(StoreToPharmacyTODetail d : order.getStoreToPharmacyTODetails()) {
				StoreToPharmacyTODetailModel modelDetail = new StoreToPharmacyTODetailModel();
				modelDetail.setId(d.getId());
				modelDetail.setMedicine(d.getMedicine());
				modelDetail.setOrderedPharmacySKUQty(d.getOrderedPharmacySKUQty());
				modelDetail.setStoreToPharmacyTO(d.getStoreToPharmacyTO());

				if(d.getCreatedAt() != null) {
					modelDetail.setCreated(d.getCreatedAt().toString()+" | "+userService.getUserById(d.getCreatedBy()).getNickname());
				}else {
					modelDetail.setCreated(null);
				}
				modelDetails.add(modelDetail);
			}
			model.setStoreToPharmacyTODetails(modelDetails);
		}
		
		if(order.getCreatedAt() != null) {
			model.setCreated(order.getCreatedAt().toString()+" | "+userService.getUserById(order.getCreatedBy()).getNickname());
		}else {
			model.setCreated(null);
		}
		if(order.getVerifiedAt() != null) {
			model.setVerified(order.getVerifiedAt().toString()+" | "+userService.getUserById(order.getVerifiedBy()).getNickname());
		}else {
			model.setVerified(null);
		}
		if(order.getApprovedAt() != null) {
			model.setApproved(order.getApprovedAt().toString()+" | "+userService.getUserById(order.getApprovedBy()).getNickname());
		}else {
			model.setApproved(null);
		}		
		return model;
		*/
		return showOrder(order);
	}
	
	
	@Override
	public StoreToPharmacyTOModel verify(StoreToPharmacyTO storeToPharmacyTO, HttpServletRequest request) {
		
		Optional<StoreToPharmacyTO> to = storeToPharmacyTORepository.findById(storeToPharmacyTO.getId());
		if(to.isEmpty()) {
			throw new NotFoundException("Transfer order not found");
		}
		if(!to.get().getStatus().equals("PENDING")) {
			throw new InvalidOperationException("Could not verify. Only Pending Transfer Order can be verified");
		}
		to.get().setStatus("VERIFIED");
		to.get().setStatusDescription("Order awaiting for approval");
		
		to.get().setVerifiedBy(userService.getUser(request).getId());
		to.get().setVerifiedOn(dayService.getDay().getId());
		to.get().setVerifiedAt(dayService.getTimeStamp());
		 
		StoreToPharmacyTO order = storeToPharmacyTORepository.save(to.get());
		
		return showOrder(order);
	}
	
	@Override
	public StoreToPharmacyTOModel approve(StoreToPharmacyTO storeToPharmacyTO, HttpServletRequest request) {
		
		Optional<StoreToPharmacyTO> to = storeToPharmacyTORepository.findById(storeToPharmacyTO.getId());
		if(to.isEmpty()) {
			throw new NotFoundException("Transfer order not found");
		}
		if(!to.get().getStatus().equals("VERIFIED")) {
			throw new InvalidOperationException("Could not approve. Only verified Transfer Order can be approved");
		}
		to.get().setStatus("APPROVED");
		to.get().setStatusDescription("Order submitted for goods issuing");
		
		to.get().setApprovedBy(userService.getUser(request).getId());
		to.get().setApprovedOn(dayService.getDay().getId());
		to.get().setApprovedAt(dayService.getTimeStamp());
		 
		StoreToPharmacyTO order = storeToPharmacyTORepository.save(to.get());
		
		return showOrder(order);
	}
	
	@Override
	public StoreToPharmacyTOModel issue(StoreToPharmacyTO storeToPharmacyTO, HttpServletRequest request) {
		
		Optional<StoreToPharmacyTO> to = storeToPharmacyTORepository.findById(storeToPharmacyTO.getId());
		if(to.isEmpty()) {
			throw new NotFoundException("Transfer order not found");
		}
		if(!to.get().getStatus().equals("APPROVED")) {
			throw new InvalidOperationException("Could not issue. Only approved Transfer Order can issue goods");
		}
		to.get().setStatus("GOODS-ISSUED");
		to.get().setStatusDescription("Goods issued");
		
		//to.get().setApprovedBy(userService.getUser(request).getId());
		//to.get().setApprovedOn(dayService.getDay().getId());
		//to.get().setApprovedAt(dayService.getTimeStamp());
		 
		StoreToPharmacyTO order = storeToPharmacyTORepository.save(to.get());
		
		PharmacyToStoreRO ro = order.getPharmacyToStoreRO();
		ro.setStatus("GOODS-ISSUED");
		ro.setStatusDescription("Goods issued by store");
		pharmacyToStoreRORepository.save(ro);
		
		/**
		 * Put here goods issue bussiness logic, should update store stocks
		 */
		
		return showOrder(order);
	}
	
	
	StoreToPharmacyTOModel showOrder(StoreToPharmacyTO order) {
		
		StoreToPharmacyTOModel model = new StoreToPharmacyTOModel();
		List<StoreToPharmacyTODetailModel> modelDetails = new ArrayList<>();
		
		model.setId(order.getId());
		model.setNo(order.getNo());
		model.setPharmacy(order.getPharmacy());
		model.setPharmacyToStoreRO(order.getPharmacyToStoreRO());
		model.setOrderDate(order.getOrderDate());
		model.setStatus(order.getStatus());
		model.setStatusDescription(order.getStatusDescription());
		if(order.getStoreToPharmacyTODetails() != null) {
			for(StoreToPharmacyTODetail d : order.getStoreToPharmacyTODetails()) {
				StoreToPharmacyTODetailModel modelDetail = new StoreToPharmacyTODetailModel();
				modelDetail.setId(d.getId());
				modelDetail.setMedicine(d.getMedicine());
				modelDetail.setOrderedPharmacySKUQty(d.getOrderedPharmacySKUQty());
				modelDetail.setStoreToPharmacyTO(d.getStoreToPharmacyTO());
				
				//modelDetail.setStoreToPharmacyBatches(d.getStoreToPharmacyBatches());

				if(d.getCreatedAt() != null) {
					modelDetail.setCreated(d.getCreatedAt().toString()+" | "+userService.getUserById(d.getCreatedBy()).getNickname());
				}else {
					modelDetail.setCreated(null);
				}
				modelDetails.add(modelDetail);
			}
			model.setStoreToPharmacyTODetails(modelDetails);
		}
		
		if(order.getCreatedAt() != null) {
			model.setCreated(order.getCreatedAt().toString()+" | "+userService.getUserById(order.getCreatedBy()).getNickname());
		}else {
			model.setCreated(null);
		}
		if(order.getVerifiedAt() != null) {
			model.setVerified(order.getVerifiedAt().toString()+" | "+userService.getUserById(order.getVerifiedBy()).getNickname());
		}else {
			model.setVerified(null);
		}
		if(order.getApprovedAt() != null) {
			model.setApproved(order.getApprovedAt().toString()+" | "+userService.getUserById(order.getApprovedBy()).getNickname());
		}else {
			model.setApproved(null);
		}		
		return model;
	}
	
	
	@Override
	public boolean saveDetail(StoreToPharmacyTODetail detail, HttpServletRequest request) {
		
		Optional<StoreToPharmacyTODetail> d = storeToPharmacyTODetailRepository.findById(detail.getId());
		if(d.isEmpty()) {
			throw new NotFoundException("Detail not found");
		}
		Optional<Item> i = itemRepository.findByName(detail.getItem().getName());
		if(i.isEmpty()) {
			throw new NotFoundException("Item not found");
		}
		//find item coefficient
		Optional<ItemMedicineCoefficient> imc = itemMedicineCoefficientRepository.findByItemAndMedicine(i.get(), d.get().getMedicine());
		if(imc.isEmpty()) {
			throw new NotFoundException("Item to medicine conversion factor does not exist. Please specify conversion factor for this item");
		}
		
		d.get().setItem(i.get());
		d.get().setTransferedStoreSKUQty(detail.getTransferedStoreSKUQty());
		d.get().setTransferedPharmacySKUQty(detail.getTransferedStoreSKUQty() * imc.get().getCoefficient());
		
		storeToPharmacyTODetailRepository.save(d.get());
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
		return true;
	}

	@Override
	public RecordModel requestTransferOrderNo() {
		Long id = 1L;
		try {
			id = storeToPharmacyTORepository.getLastId() + 1;
		}catch(Exception e) {}
		RecordModel model = new RecordModel();
		model.setNo(Formater.formatWithCurrentDate("SPT",id.toString()));
		return model;
	}	
}
