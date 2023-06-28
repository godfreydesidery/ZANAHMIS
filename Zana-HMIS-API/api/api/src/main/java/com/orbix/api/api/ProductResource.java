/**
 * 
 */
package com.orbix.api.api;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.orbix.api.domain.Product;
import com.orbix.api.exceptions.NotFoundException;
import com.orbix.api.models.RecordModel;
import com.orbix.api.repositories.ProductRepository;
import com.orbix.api.service.ProductService;
import lombok.RequiredArgsConstructor;

/**
 * @author GODFREY
 *
 */
@RestController
@RequestMapping("/zana-hmis-api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductResource {
	
private final 	ProductService productService;
private final ProductRepository productRepository;
	
	@GetMapping("/products")
	public ResponseEntity<List<Product>>getProducts(){
		return ResponseEntity.ok().body(productService.getAll());		
	}
	
	@GetMapping("/products/get_descriptions")
	public ResponseEntity<List<String>> getSellableDescriptions(){
		List<String> descriptions = new ArrayList<String>();
		descriptions = productService.getSellableDescriptions();
		return ResponseEntity.ok().body(descriptions);
	}
	
	@GetMapping("/products/get")
	public ResponseEntity<Product> getProduct(
			@RequestParam(name = "id") Long id){
		return ResponseEntity.ok().body(productService.get(id));
	}
	
	@GetMapping("/products/get_by_barcode")
	public ResponseEntity<Product> getProductByBarcode(
			@RequestParam(name = "barcode") String barcode){
		return ResponseEntity.ok().body(productService.getByBarcode(barcode));
		
		
	}
	
	
	@GetMapping("/products/request_code")
	public ResponseEntity<RecordModel> requestCode(){
		return ResponseEntity.ok().body(productService.requestProductCode());
	}
	
	@GetMapping("/products/get_by_code")
	public ResponseEntity<Product> getProductByCode(
			@RequestParam(name = "code") String code){
		return ResponseEntity.ok().body(productService.getByCode(code));
	}
	
	@GetMapping("/products/get_by_description")
	public ResponseEntity<Product> getProductByDescription(
			@RequestParam(name = "description") String description){
		return ResponseEntity.ok().body(productService.getByDescription(description));
	}
	
	@GetMapping("/products/get_by_common_name")
	public ResponseEntity<Product> getProductByCommonName(
			@RequestParam(name = "common_name") String common_name){
		return ResponseEntity.ok().body(productService.getByCommonName(common_name));
	}
	
	@PostMapping("/products/create")
	@PreAuthorize("hasAnyAuthority('PRODUCT-CREATE')")
	public ResponseEntity<Product>createProduct(
			@RequestBody Product product){
		if(product.getCode().equals("") || product.getCode().equals("NA")) {
			product.setCode("NA");
		}
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/products/create").toUriString());
		return ResponseEntity.created(uri).body(productService.save(product));
	}
		
	@PutMapping("/products/update")
	@PreAuthorize("hasAnyAuthority('PRODUCT-CREATE','PRODUCT-UPDATE')")
	public ResponseEntity<Product>updateProduct(
			@RequestBody Product product, 			
			HttpServletRequest request){		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/products/update").toUriString());
		return ResponseEntity.created(uri).body(productService.save(product));
	}
	
	@PutMapping("/products/update_prices")
	@PreAuthorize("hasAnyAuthority('PRODUCT-UPDATE')")
	public ResponseEntity<Product>updateProductPrices(
			@RequestBody Product product, 			
			HttpServletRequest request){		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/products/update_prices").toUriString());
		return ResponseEntity.created(uri).body(productService.updatePrices(product));
	}
	
	@PutMapping("/products/update_prices_by_code")
	@PreAuthorize("hasAnyAuthority('PRODUCT-UPDATE')")
	public ResponseEntity<Product>updateProductPricesByCode(
			@RequestBody Product product, 			
			HttpServletRequest request){
		Optional<Product> prod = productRepository.findByCode(product.getCode());
		if(prod.isPresent()) {
			product.setId(prod.get().getId());
		}else {
			throw new NotFoundException("Product not found");
		}
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/products/update_prices_by_code").toUriString());
		return ResponseEntity.created(uri).body(productService.updatePrices(product));
	}
	
	@PutMapping("/products/update_inventory")
	@PreAuthorize("hasAnyAuthority('PRODUCT-UPDATE')")
	public ResponseEntity<Product>updateProductInventory(
			@RequestBody Product product, 			
			HttpServletRequest request){		
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/products/update_inventory").toUriString());
		return ResponseEntity.created(uri).body(productService.updateInventory(product));
	}
	
	@PutMapping("/products/update_inventory_by_code")
	@PreAuthorize("hasAnyAuthority('PRODUCT-UPDATE')")
	public ResponseEntity<Product>updateProductInventoryByCode(
			@RequestBody Product product, 			
			HttpServletRequest request){
		Optional<Product> prod = productRepository.findByCode(product.getCode());
		if(prod.isPresent()) {
			product.setId(prod.get().getId());
		}else {
			throw new NotFoundException("Product not found");
		}
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/products/update_prices").toUriString());
		return ResponseEntity.created(uri).body(productService.updateInventory(product));
	}
	
	@PutMapping("/products/update_by_code")
	@PreAuthorize("hasAnyAuthority('PRODUCT-UPDATE')")
	public ResponseEntity<Product>updateProductByCode(
			@RequestBody Product product, 
			HttpServletRequest request){
		Optional<Product> prod = productRepository.findByCode(product.getCode());
		if(prod.isPresent()) {
			product.setId(prod.get().getId());
		}else {
			throw new NotFoundException("Product not found");
		}
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/products/update").toUriString());
		return ResponseEntity.created(uri).body(productService.save(product));
	}
	
	@DeleteMapping("/products/delete")
	@PreAuthorize("hasAnyAuthority('PRODUCT-DELETE')")
	public ResponseEntity<Boolean> deleteProduct(
			@RequestParam(name = "id") Long id){
		Product product = productService.get(id);
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/products/delete").toUriString());
		return ResponseEntity.created(uri).body(productService.delete(product));
	}
}
