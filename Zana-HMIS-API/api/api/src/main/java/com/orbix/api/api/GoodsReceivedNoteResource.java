/**
 * 
 */
package com.orbix.api.api;

import java.net.URI;
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

import com.orbix.api.domain.GoodsReceivedNote;
import com.orbix.api.domain.GoodsReceivedNoteDetail;
import com.orbix.api.domain.LocalPurchaseOrder;
import com.orbix.api.domain.LocalPurchaseOrderDetail;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.exceptions.NotFoundException;
import com.orbix.api.models.GoodsReceivedNoteDetailModel;
import com.orbix.api.models.GoodsReceivedNoteModel;
import com.orbix.api.models.LocalPurchaseOrderDetailModel;
import com.orbix.api.models.LocalPurchaseOrderModel;
import com.orbix.api.repositories.GoodsReceivedNoteRepository;
import com.orbix.api.repositories.LocalPurchaseOrderDetailRepository;
import com.orbix.api.repositories.LocalPurchaseOrderRepository;
import com.orbix.api.service.GoodsReceivedNoteService;
import com.orbix.api.service.LocalPurchaseOrderService;
import com.orbix.api.service.UserService;

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
public class GoodsReceivedNoteResource {
	
	private final GoodsReceivedNoteService goodsReceivedNoteService;
	private final LocalPurchaseOrderService localPurchaseOrderService;
	private final LocalPurchaseOrderRepository localPurchaseOrderRepository;
	private final LocalPurchaseOrderDetailRepository localPurchaseOrderDetailRepository;
	private final UserService userService;
	private final GoodsReceivedNoteRepository goodsReceivedNoteRepository;
	
	@GetMapping("/goods_received_notes")
	//@PreAuthorize("hasAnyAuthority('GOO-ALL')")
	public ResponseEntity<List<GoodsReceivedNote>> getVisibleGoodsReceivedNotes(
			HttpServletRequest request){
		
		List<String> statuses = new ArrayList<>();
		statuses.add("PENDING");
		statuses.add("VERIFIED");
		statuses.add("APPROVED");
		statuses.add("REJECTED");
		statuses.add("SUBMITTED");
		statuses.add("RETURNED");
		
		List<GoodsReceivedNote> grns = goodsReceivedNoteRepository.findAllByStatusIn(statuses);
		
		

		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/goods_received_notes").toUriString());
		return ResponseEntity.created(uri).body(grns);
	}
	
	@PostMapping("/goods_received_notes/create")
	@PreAuthorize("hasAnyAuthority('GOODS_RECEIVED_NOTE-ALL','GOODS_RECEIVED_NOTE-CREATE')")
	public ResponseEntity<GoodsReceivedNote>saveGoodsReceivedNote(
			@RequestBody LocalPurchaseOrderModel localPurchaseOrder,
			HttpServletRequest request){
		
		Optional<LocalPurchaseOrder> localPurchaseOrder_ = localPurchaseOrderRepository.findByNo(localPurchaseOrder.getNo());
		if(localPurchaseOrder_.isEmpty()) {
			throw new NotFoundException("Local Purchase Order not found");
		}
		
		if(localPurchaseOrder.getStore().getId() != localPurchaseOrder_.get().getStore().getId()) {
			throw new InvalidOperationException("Order not designated to the selected store");
		}
		
		if(!localPurchaseOrder_.get().getStatus().equals("SUBMITTED")) {
			throw new InvalidOperationException("Could not create GRN. Local Purchase Order not submitted");
		}
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/goods_received_notes/create").toUriString());
		return ResponseEntity.created(uri).body(goodsReceivedNoteService.create(localPurchaseOrder_.get(), request));
	}
	
	@GetMapping("/goods_received_notes/search")
	//@PreAuthorize("hasAnyAuthority('LOCAL_PURCHASE_ORDER-ALL')")
	public ResponseEntity<GoodsReceivedNoteModel> searchSupplierOrderAndSupplier(
			@RequestParam(name = "id") Long id,
			HttpServletRequest request){
		Optional<GoodsReceivedNote> grn_ = goodsReceivedNoteRepository.findById(id);
		if(grn_.isEmpty()) {
			throw new NotFoundException("GRN not found");
		}		
		
		GoodsReceivedNoteModel model = new GoodsReceivedNoteModel();
		List<GoodsReceivedNoteDetailModel> modelDetails = new ArrayList<>();
		
		model.setId(grn_.get().getId());
		model.setNo(grn_.get().getNo());
		model.setStatus(grn_.get().getStatus());
		model.setStatusDescription(grn_.get().getStatusDescription());
		model.setLocalPurchaseOrder(grn_.get().getLocalPurchaseOrder());
		if(grn_.get().getGoodsReceivedNoteDetails() != null) {
			for(GoodsReceivedNoteDetail d : grn_.get().getGoodsReceivedNoteDetails()) {
				GoodsReceivedNoteDetailModel modelDetail = new GoodsReceivedNoteDetailModel();
				modelDetail.setId(d.getId());
				modelDetail.setItem(d.getItem());
				modelDetail.setOrderedQty(d.getOrderedQty());
				modelDetail.setReceivedQty(d.getReceivedQty());
				//modelDetail.setPrice(d.getPrice());
				
				modelDetails.add(modelDetail);
			}
			model.setGoodsReceivedNoteDetails(modelDetails);
		}
		
		if(grn_.get().getCreatedAt() != null) {
			model.setCreated(grn_.get().getCreatedAt().toString()+" | "+userService.getUserById(grn_.get().getCreatedBy()).getNickname());
		}else {
			model.setCreated(null);
		}
		if(grn_.get().getVerifiedAt() != null) {
			model.setVerified(grn_.get().getVerifiedAt().toString()+" | "+userService.getUserById(grn_.get().getVerifiedBy()).getNickname());
		}else {
			model.setVerified(null);
		}
		if(grn_.get().getApprovedAt() != null) {
			model.setApproved(grn_.get().getApprovedAt().toString()+" | "+userService.getUserById(grn_.get().getApprovedBy()).getNickname());
		}else {
			model.setApproved(null);
		}		
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/goods_received_notes/search").toUriString());
		return ResponseEntity.created(uri).body(model);
		
	}
}
