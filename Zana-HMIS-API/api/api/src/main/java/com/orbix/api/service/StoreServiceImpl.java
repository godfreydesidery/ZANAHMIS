/**
 * 
 */
package com.orbix.api.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.orbix.api.domain.Item;
import com.orbix.api.domain.Store;
import com.orbix.api.domain.StoreItem;
import com.orbix.api.domain.StoreStockCard;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.repositories.DayRepository;
import com.orbix.api.repositories.ItemRepository;
import com.orbix.api.repositories.StoreItemRepository;
import com.orbix.api.repositories.StoreRepository;
import com.orbix.api.repositories.StoreStockCardRepository;
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
public class StoreServiceImpl implements StoreService {
	private final UserRepository userRepository;
	private final UserService userService;
	private final DayRepository dayRepository;
	private final DayService dayService;
	private final StoreRepository storeRepository;
	private final ItemRepository itemRepository;
	private final StoreItemRepository storeItemRepository;
	private final StoreStockCardRepository storeStockCardRepository;
	
	@Override
	public Store save(Store store, HttpServletRequest request) {
		
		store.setName(store.getName());
		
		if(store.getId() == null) {
			store.setCreatedby(userService.getUser(request).getId());
			store.setCreatedOn(dayService.getDay().getId());
			store.setCreatedAt(dayService.getTimeStamp());
			
			store.setActive(true);
		}
		
		if(!(store.getCategory().equals("INPATIENT") || store.getCategory().equals("OUTPATIENT") || store.getCategory().equals("ALL"))) {
			throw new InvalidOperationException("Invalid category name");
		}
		
		if(store.getId() == null) {
			store = storeRepository.save(store);
			List<Item> items = itemRepository.findAll();
			for(Item item : items) {
				StoreItem pm = new StoreItem();
				pm.setItem(item);
				pm.setStore(store);
				pm.setStock(0);
				storeItemRepository.save(pm);
				
				StoreStockCard storeStockCard = new StoreStockCard();
				storeStockCard.setItem(item);
				storeStockCard.setStore(store);
				storeStockCard.setQtyIn(pm.getStock());
				storeStockCard.setQtyOut(0);
				storeStockCard.setBalance(0);
				storeStockCard.setReference("Opening stock, store registration");
				
				storeStockCard.setCreatedBy(userService.getUserId(request));
				storeStockCard.setCreatedOn(dayService.getDayId());
				storeStockCard.setCreatedAt(dayService.getTimeStamp());
				
				storeStockCardRepository.save(storeStockCard);
			}			
		}		
		log.info("Saving new store to the database");
		return storeRepository.save(store);
	}

	@Override
	public List<Store> getPharmacies(HttpServletRequest request) {
		log.info("Fetching all pharmacies");
		return storeRepository.findAll();
	}

	@Override
	public Store getStoreByName(String name, HttpServletRequest request) {
		return storeRepository.findByName(name).get();
	}

	@Override
	public Store getStoreById(Long id, HttpServletRequest request) {
		return storeRepository.findById(id).get();
	}

	@Override
	public boolean deleteStore(Store store, HttpServletRequest request) {
		/**
		 * Delete a store if a store is deletable
		 */
		if(allowDeleteStore(store) == false) {
			throw new InvalidOperationException("Deleting this store is not allowed");
		}
		storeRepository.delete(store);
		return true;
	}
	
	private boolean allowDeleteStore(Store store) {
		/**
		 * Code to check if a store is deletable
		 * Returns false if not
		 */
		return false;
	}
	
	@Override
	public List<String> getNames(HttpServletRequest request) {
		return storeRepository.getNames();	
	}

	@Override
	public Store getByName(String storeName, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return storeRepository.findByName(storeName).get();
	}

}
