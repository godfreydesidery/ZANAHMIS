/**
 * 
 */
package com.orbix.api.models;

import java.time.LocalDate;
import java.util.List;

import com.orbix.api.domain.Pharmacy;
import com.orbix.api.domain.PharmacyToStoreRO;
import lombok.Data;

/**
 * @author Godfrey
 *
 */
@Data
public class StoreToPharmacyTOModel {

	public Long id = null;
	public String no = "";
	public LocalDate orderDate = null;		
	public String status = "";
	public String statusDescription = "";
	
	public Pharmacy pharmacy = null;	
	public PharmacyToStoreRO pharmacyToStoreRO = null;
    
    public String created;
    public String verified;
    public String approved;

    private List<StoreToPharmacyTODetailModel> storeToPharmacyTODetails;
}
