/**
 * 
 */
package com.orbix.api.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.orbix.api.accessories.Formater;
import com.orbix.api.domain.Product;
import com.orbix.api.exceptions.InvalidEntryException;
import com.orbix.api.exceptions.InvalidOperationException;
import com.orbix.api.exceptions.MissingInformationException;
import com.orbix.api.exceptions.NotFoundException;
import com.orbix.api.models.RecordModel;
import com.orbix.api.repositories.DayRepository;
import com.orbix.api.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * @author GODFREY
 *
 */
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ProductServiceImpl implements ProductService {
	
	private final ProductRepository productRepository;

	private final DayRepository dayRepository;


	@Override
	public Product save(Product p) {
		if(p.getBarcode() == null){
			p.setBarcode("");
		}
		if(!p.getBarcode().equals("") && p.getBarcode().contains(" ")) {//validate barcode, reject barcode with spaces
			p.setBarcode(p.getBarcode().replace(" ", ""));	
		}
		p.setDescription(p.getDescription().trim().replaceAll("\\s+", " "));
		Product product;
		boolean isNew = false;
		
		if(p.getId() == null) {
			isNew = true;			
			if(!p.getBarcode().equals("")) {
				Optional<Product> pr = productRepository.findByBarcode(p.getBarcode());				
				if(!pr.isEmpty()) {
					throw new InvalidEntryException("Could not save. A product with similar barcode already exists");															
				}
			}
			
			/**
			 * Add a new Product
			 */
			product = p;
			product.setDescription(product.getDescription().replace("+", " "));
			/**
			 * Validate pricing information
			 */
			if(product.getVat() < 0 || product.getVat() > 100) {
				throw new InvalidEntryException("Invalid VAT % value. VAT should between 0 and 100");
			}
			if(product.getDiscount() < 0 || product.getDiscount() > 100) {
				throw new InvalidEntryException("Invalid Discount % value. Discount should between 0 and 100");
			}
			if(product.getProfitMargin() < 0 ) {
				throw new InvalidEntryException("Invalid Profit Margin % value. Profit Margin should 0 or more");
			}
			
			product.setCostPriceVatIncl(Math.round(product.getCostPriceVatIncl() *100.0)/100.0);
			product.setCostPriceVatExcl(Math.round(((p.getCostPriceVatIncl() * 100) / (100 + p.getVat())) *100.0)/100.0);
			product.setSellingPriceVatIncl(Math.round(product.getSellingPriceVatIncl() *100.0)/100.0);
			product.setSellingPriceVatExcl(Math.round(((p.getSellingPriceVatIncl() * 100) / (100 + p.getVat())) *100.0)/100.0);
			
			

		}else {
			if(!p.getBarcode().equals("")) {
				Optional<Product> pr = productRepository.findByBarcode(p.getBarcode());				
				if(!pr.isEmpty()) {
					if(pr.get().getBarcode().equals(p.getBarcode()) && pr.get().getId() != p.getId()) {
						throw new InvalidEntryException("Could not save. A product with similar barcode already exists");
					}										
				}
			}
			/**
			 * Update an existing Product
			 */
			product = productRepository.findById(p.getId()).get();
			product.setId(p.getId());
			product.setBarcode(p.getBarcode());
			product.setCode(p.getCode().replace(" ", ""));
			product.setDescription(p.getDescription().replace("+", "Plus"));
			product.setShortDescription(p.getShortDescription().trim().replaceAll("\\s+", " "));
			product.setCommonName(p.getCommonName().trim().replaceAll("\\s+", " "));
			product.setSellable(p.isSellable());
			product.setActive(p.isActive());
		}
				
		product = productRepository.saveAndFlush(product);
		if(product.getCode().equals("NA")) {
			product.setCode(Formater.formatSix(product.getId().toString()));
			product = productRepository.saveAndFlush(product);
		}
		
		
		return product;		
	}
	
	@Override
	public Product updateInventory(Product p) {
		Product product;
		Optional<Product> prod = productRepository.findById(p.getId());
		double initialStock = prod.get().getStock();
		prod.get().setUom(p.getUom());
		prod.get().setPackSize(p.getPackSize());
		prod.get().setStock(p.getStock());
		prod.get().setMinimumInventory(p.getMinimumInventory());
		prod.get().setMaximumInventory(p.getMaximumInventory());
		prod.get().setDefaultReorderLevel(p.getDefaultReorderLevel());
		prod.get().setDefaultReorderQty(p.getDefaultReorderQty());
		
		product = productRepository.saveAndFlush(prod.get());
		
		
		return product;		
	}
	
	
	
	@Override
	public Product updatePrices(Product p) {		
		Product product;
		double originalDiscount = 0;
		double originalVat = 0;
		String originalVatGroup = "";
		double originalProfitMargin = 0;
		double originalCostPriceVatIncl = 0;
		double originalCostPriceVatExcl = 0;
		double originalSellingPriceVatIncl = 0;
		double originalSellingPriceVatExcl = 0;
		double finalDiscount = 0;
		double finalVat = 0;
		String finalVatGroup = "";
		double finalProfitMargin = 0;
		double finalCostPriceVatIncl = 0;
		double finalCostPriceVatExcl = 0;
		double finalSellingPriceVatIncl = 0;
		double finalSellingPriceVatExcl = 0;
		
		String vatGroup = "";
		
		Product pr = productRepository.findById(p.getId()).get();
		originalDiscount = pr.getDiscount();
		originalVat = pr.getVat();
		originalVatGroup = pr.getVatGroup();
		originalProfitMargin = pr.getProfitMargin();
		originalCostPriceVatIncl = Math.round(pr.getCostPriceVatIncl() *100.0)/100.0;
		originalCostPriceVatExcl = Math.round(pr.getCostPriceVatExcl() *100.0)/100.0;
		originalSellingPriceVatIncl = Math.round(pr.getSellingPriceVatIncl() *100.0)/100.0;
		originalSellingPriceVatExcl = Math.round(pr.getSellingPriceVatExcl() *100.0)/100.0;
		
				
		finalDiscount = p.getDiscount();
		finalVat = p.getVat();
		finalVatGroup = p.getVatGroup();
		finalProfitMargin = p.getProfitMargin();
		finalCostPriceVatIncl = Math.round(p.getCostPriceVatIncl() *100.0)/100.0;
		finalCostPriceVatExcl = Math.round(((p.getCostPriceVatIncl() * 100) / (100 + p.getVat())) *100.0)/100.0;
		finalSellingPriceVatIncl = Math.round(p.getSellingPriceVatIncl() *100.0)/100.0;		
		finalSellingPriceVatExcl = Math.round(((p.getSellingPriceVatIncl() * 100) / (100 + p.getVat())) *100.0)/100.0;
		
		pr.setDiscount(finalDiscount);
		pr.setVat(finalVat);
		pr.setVatGroup(finalVatGroup);
		pr.setProfitMargin(finalProfitMargin);
		pr.setCostPriceVatIncl(finalCostPriceVatIncl);
		pr.setCostPriceVatExcl(finalCostPriceVatExcl);
		pr.setSellingPriceVatIncl(finalSellingPriceVatIncl);
		pr.setSellingPriceVatExcl(finalSellingPriceVatExcl);
		
		/**
		 * Validate pricing information
		 */
		if(finalVat < 0 || finalVat > 100) {
			throw new InvalidEntryException("Invalid VAT % value. VAT should between 0 and 100");
		}
		if(finalDiscount < 0 || finalDiscount > 100) {
			throw new InvalidEntryException("Invalid Discount % value. Discount should between 0 and 100");
		}
		if(finalProfitMargin < 0 ) {
			throw new InvalidEntryException("Invalid Profit Margin % value. Profit Margin should 0 or more");
		}
		
		product = productRepository.saveAndFlush(pr);
		
		
		return product;		
	}
	
	
	
	

	@Override
	public Product get(Long id) {
		return productRepository.findById(id).get();
	}

	@Override
	public Product getByBarcode(String barcode) {
		Optional<Product> p = productRepository.findByBarcode(barcode);
		if(!p.isPresent()) {
			throw new NotFoundException("Product not found");
		}
		return p.get();
	}

	@Override
	public Product getByCode(String code) {
		Optional<Product> p = productRepository.findByCode(code);
		if(!p.isPresent()) {
			throw new NotFoundException("Product not found");
		}
		return p.get();
	}

	@Override
	public Product getByDescription(String description) {
		Optional<Product> p = productRepository.findByDescription(description);
		if(!p.isPresent()) {
			throw new NotFoundException("Product not found");
		}
		return p.get();
	}

	@Override
	public Product getByCommonName(String commonName) {
		Optional<Product> p = productRepository.findByCommonName(commonName);
		if(!p.isPresent()) {
			throw new NotFoundException("Product not found");
		}
		return p.get();
	}

	@Override
	public boolean delete(Product product) {
		if(!allowDelete(product)) {
			throw new InvalidOperationException("Deleting this product is not allowed");
		}
		//productRepository.delete(product);
		return true;
	}

	@Override
	public List<Product> getAll() {
		return productRepository.findAll();
	}
	
	private boolean validate(Product product) {
		if(product.getCode().equals("")) {
			throw new MissingInformationException("Product Code required");
		}
		if(product.getDescription().equals("")) {
			throw new MissingInformationException("Product Description required");
		}
		
		if(product.getDiscount() < 0 || product.getDiscount() > 100) {
			throw new InvalidEntryException("Discount ratio should be between 0 and 100");
		}
		if(product.getVat() < 0 || product.getVat() > 100) {
			throw new InvalidEntryException("VAT ratio should be between 0 and 100");
		}
		if(product.getProfitMargin() < 0 ) {
			throw new InvalidEntryException("Profit margin should be more than 0");
		}
		return true;
	}
	
	private boolean allowDelete(Product product) {
		/**
		 * Check product if it can be deleted
		 */
		return false;
	}

	@Override
	public List<String> getSellableDescriptions() {
		return productRepository.getSellableProductDescriptions();	
	}
	
	@Override
	public RecordModel requestProductCode() {
		Long id = 1L;
		try {
			id = productRepository.getLastId() + 1;
		}catch(Exception e) {}
		RecordModel model = new RecordModel();
		model.setCode("P"+id.toString());		
		return model;
	}	
}
