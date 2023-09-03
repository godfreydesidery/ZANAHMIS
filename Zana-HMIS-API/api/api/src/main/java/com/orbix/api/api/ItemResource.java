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

import com.orbix.api.api.accessories.Sanitizer;
import com.orbix.api.domain.Item;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.exceptions.NotFoundException;
import com.orbix.api.repositories.ItemRepository;
import com.orbix.api.repositories.DiagnosisTypeRepository;
import com.orbix.api.service.ItemService;
import com.orbix.api.service.DayService;
import com.orbix.api.service.DiagnosisTypeService;
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
public class ItemResource {

	private final ItemRepository itemRepository;
	private final ItemService itemService;
	

	private final UserService userService;
	private final DayService dayService;
	
	@GetMapping("/items")
	public ResponseEntity<List<Item>>getItems(HttpServletRequest request){
		return ResponseEntity.ok().body(itemService.getItems(request));
	}
	
	@GetMapping("/items/get")
	public ResponseEntity<Item> getItem(
			@RequestParam(name = "id") Long id,
			HttpServletRequest request){
		return ResponseEntity.ok().body(itemService.getItemById(id, request));
	}
	
	@GetMapping("/items/search")
	public ResponseEntity<Item> searchItem(
			@RequestParam(name = "code") String code,
			@RequestParam(name = "barcode") String barcode,
			@RequestParam(name = "name") String name,
			HttpServletRequest request){
		Optional<Item> i;
		if(!code.equals("")) {
			i = itemRepository.findByCode(code);
			if(i.isEmpty()) {
				throw new NotFoundException("Item not found");
			}
		}else if(!barcode.equals("")) {
			i = itemRepository.findByBarcode(barcode);
			if(i.isEmpty()) {
				throw new NotFoundException("Item not found");
			}
		}else if(!name.equals("")) {
			i = itemRepository.findByName(name);
			if(i.isEmpty()) {
				throw new NotFoundException("Item not found");
			}
		}else {
			throw new InvalidOperationException("No search key specified");
		}
		return ResponseEntity.ok().body(i.get());
	}
	
	@GetMapping("/items/get_names")
	public ResponseEntity<List<String>> getItemNames(HttpServletRequest request){
		List<String> names = new ArrayList<String>();
		names = itemService.getNames(request);
		return ResponseEntity.ok().body(names);
	}
	
	@PostMapping("/items/save")
	@PreAuthorize("hasAnyAuthority('ADMIN-A')")
	public ResponseEntity<Item>save(
			@RequestBody Item item,
			HttpServletRequest request){
		item.setName(Sanitizer.sanitizeString(item.getName()));
		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/zana-hmis-api/items/save").toUriString());
		return ResponseEntity.created(uri).body(itemService.save(item, request));
	}
}
