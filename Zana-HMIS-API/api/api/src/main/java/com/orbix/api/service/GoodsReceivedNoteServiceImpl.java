/**
 * 
 */
package com.orbix.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.orbix.api.accessories.Formater;
import com.orbix.api.domain.GoodsReceivedNote;
import com.orbix.api.domain.GoodsReceivedNoteDetail;
import com.orbix.api.domain.LocalPurchaseOrder;
import com.orbix.api.domain.LocalPurchaseOrderDetail;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.models.RecordModel;
import com.orbix.api.repositories.DayRepository;
import com.orbix.api.repositories.GoodsReceivedNoteDetailRepository;
import com.orbix.api.repositories.GoodsReceivedNoteRepository;
import com.orbix.api.repositories.InsurancePlanRepository;
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
public class GoodsReceivedNoteServiceImpl implements GoodsReceivedNoteService {
	
	private final GoodsReceivedNoteRepository goodsReceivedNoteRepository;
	private final GoodsReceivedNoteDetailRepository goodsReceivedNoteDetailRepository;
	private final UserRepository userRepository;
	private final UserService userService;
	private final DayRepository dayRepository;
	private final DayService dayService;
	
	@Override
	public GoodsReceivedNote create(LocalPurchaseOrder localPurchaseOrder, HttpServletRequest request) {
		Optional<GoodsReceivedNote> goodsReceivedNote_ = goodsReceivedNoteRepository.findByLocalPurchaseOrder(localPurchaseOrder);
		if(goodsReceivedNote_.isPresent()) {
			throw new InvalidOperationException("Can not create GRN by the given LPO. GRN with the given LPO already exist");
		}
		if(goodsReceivedNoteRepository.existsByLocalPurchaseOrder(localPurchaseOrder)) {
			throw new InvalidOperationException("Can not create GRN by the given LPO. GRN with the given LPO already exist");
		}
		GoodsReceivedNote goodsReceivedNote = new GoodsReceivedNote();
		goodsReceivedNote.setNo("NA");
		goodsReceivedNote.setLocalPurchaseOrder(localPurchaseOrder);
		goodsReceivedNote.setStore(localPurchaseOrder.getStore());
		goodsReceivedNote.setStatus("PENDING");
		goodsReceivedNote.setStatusDescription("GRN Pending for verification");
		
		goodsReceivedNote.setCreatedBy(userService.getUser(request).getId());
		goodsReceivedNote.setCreatedOn(dayService.getDay().getId());
		goodsReceivedNote.setCreatedAt(dayService.getTimeStamp());
		
		goodsReceivedNote = goodsReceivedNoteRepository.save(goodsReceivedNote);
		
		goodsReceivedNote.setNo(this.requestRequestGrnNo().getNo());
		
		goodsReceivedNote = goodsReceivedNoteRepository.save(goodsReceivedNote);
		
		List<LocalPurchaseOrderDetail> localPurchaseOrderDetails =  localPurchaseOrder.getLocalPurchaseOrderDetails();
		List<GoodsReceivedNoteDetail> goodsReceivedNoteDetails = new ArrayList<>();
		for(LocalPurchaseOrderDetail lpoDetail : localPurchaseOrderDetails) {
			GoodsReceivedNoteDetail grnDetail = new GoodsReceivedNoteDetail();
			grnDetail.setItem(lpoDetail.getItem());
			grnDetail.setOrderedQty(lpoDetail.getQty());
			grnDetail.setReceivedQty(0);
			grnDetail.setGoodsReceivedNote(goodsReceivedNote);
	
			grnDetail = goodsReceivedNoteDetailRepository.save(grnDetail);
			
			goodsReceivedNoteDetails.add(grnDetail);
		}
		goodsReceivedNote.setGoodsReceivedNoteDetails(goodsReceivedNoteDetails);
		
		return goodsReceivedNoteRepository.save(goodsReceivedNote);
	}
	
	
	
	
	//@Override
	public RecordModel requestRequestGrnNo() {
		Long id = 1L;
		try {
			id = goodsReceivedNoteRepository.getLastId() + 1;
		}catch(Exception e) {}
		RecordModel model = new RecordModel();
		model.setNo(Formater.formatWithCurrentDate("GRN",id.toString()));
		return model;
	}
}
