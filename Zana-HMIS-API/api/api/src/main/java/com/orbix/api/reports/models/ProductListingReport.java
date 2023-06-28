/**
 * 
 */
package com.orbix.api.reports.models;

import java.time.LocalDate;

import com.orbix.api.domain.Product;

/**
 * @author GODFREY
 *
 */
public interface ProductListingReport {
	LocalDate getDate();
	String getBarcode();
	String getCode();
	String getDescription();
	double getQty();
	double getAmount();
	String getCashier();
	String getReceiptNo();
	String getInvoiceNo();
	String getTillNo();
	//double getDiscount();
	//double getTax();
}
