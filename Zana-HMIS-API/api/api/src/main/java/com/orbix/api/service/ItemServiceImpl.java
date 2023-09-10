/**
 * 
 */
package com.orbix.api.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.orbix.api.api.accessories.Sanitizer;
import com.orbix.api.domain.Item;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.repositories.ItemRepository;
import com.orbix.api.repositories.DayRepository;
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
public class ItemServiceImpl implements ItemService {

	private final UserRepository userRepository;
	private final UserService userService;
	private final DayRepository dayRepository;
	private final DayService dayService;
	private final ItemRepository itemRepository;
	
	@Override
	public Item save(Item item, HttpServletRequest request) {
		
		item.setCode(item.getCode().replace(" ", ""));
		item.setName(item.getName());
		
		if(item.getId() == null) {
			item.setCreatedBy(userService.getUser(request).getId());
			item.setCreatedOn(dayService.getDay().getId());
			item.setCreatedAt(dayService.getTimeStamp());
			
			item.setActive(true);
		}
		
		
		log.info("Saving new item to the database");
		return itemRepository.save(item);
	}

	@Override
	public List<Item> getItems(HttpServletRequest request) {
		log.info("Fetching all items");
		return itemRepository.findAll();
	}

	@Override
	public Item getItemByName(String name, HttpServletRequest request) {
		return itemRepository.findByName(name).get();
	}

	@Override
	public Item getItemById(Long id, HttpServletRequest request) {
		return itemRepository.findById(id).get();
	}

	@Override
	public boolean deleteItem(Item item, HttpServletRequest request) {
		/**
		 * Delete a item if a item is deletable
		 */
		if(allowDeleteItem(item) == false) {
			throw new InvalidOperationException("Deleting this item is not allowed");
		}
		itemRepository.delete(item);
		return true;
	}
	
	private boolean allowDeleteItem(Item item) {
		/**
		 * Code to check if a item is deletable
		 * Returns false if not
		 */
		return false;
	}
	
	@Override
	public List<String> getNames(HttpServletRequest request) {
		return itemRepository.getNames();	
	}

	@Override
	public Item getByName(String itemName, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return itemRepository.findByName(itemName).get();
	}
}
