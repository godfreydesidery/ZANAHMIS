/**
 * 
 */
package com.orbix.api.security;

/**
 * @author GODFREY
 *
 */
public class Object_ {
	
	/**
	 * List of authorities not allowed
	 * ACCESS ALL CREATE READ UPDATE DELETE ACTIVATE APPROVE VERIFY CANCEL
	 * C R U D T V Y X
	 * Format: OBJECT-LIST OF NOT ALLOWED AUTHORITIES
	 */
	
	public static String USER = "USER-ALL CREATE READ UPDATE";
	public static String ADMIN = "ADMIN-ACCESS";	
	public static String ROLE = "ROLE-ALL CREATE READ UPDATE";
	
	public static String PATIENT = "PATIENT-ALL CREATE READ UPDATE";
	public static String CONSULTATION = "CONSULTATION-ALL CREATE READ UPDATE";
	public static String ADMISSION = "ADMISSION-ALL CREATE READ UPDATE";
	public static String WARD = "WARD-ALL CREATE READ UPDATE";
	public static String BILL = "BILL-ALL CREATE";
	
	public static String CLINIC_SERVICE = "CLINIC_SERVICE-ACCESS";
	public static String LAB_SERVICE = "LAB_SERVICE-ACCESS";
	public static String RADIOLOGY_SERVICE = "RADIOLOGY_SERVICE-ACCESS";
	public static String PHARMACY_SERVICE = "PHARMACY_SERVICE-ACCESS";
	public static String THEATRE_SERVICE = "THEATRE_SERVICE-ACCESS";
	public static String NURSING_SERVICE = "NURSING_SERVICE-ACCESS";
	
	public static String LAB_TEST = "LAB_TEST-ALL CREATE READ UPDATE DELETE REJECT COLLECT VERIFY APPROVE";
	public static String RADIOLOGY = "RADIOLOGY-ALL CREATE READ UPDATE DELETE REJECT COLLECT VERIFY APPROVE";
	public static String PROCEDURE = "PROCEDURE-ALL CREATE READ UPDATE DELETE REJECT COLLECT VERIFY APPROVE";
	public static String PRESCRIPTION = "PRESCRIPTION-ALL CREATE READ UPDATE DELETE APPROVE";
	
	public static String STORE_SERVICE = "STORE_SERVICE-ACCESS";
	
	public static String STORE_ORDER = "STORE_ORDER-ALL CREATE READ UPDATE DELETE CANCEL VERIFY APPROVE ARCHIVE";
	public static String PHARMACY_ORDER = "PHARMACY_ORDER-ALL CREATE READ UPDATE DELETE CANCEL VERIFY APPROVE ARCHIVE";
	
	public static String PROCUREMENT_ORDER = "PROCUREMENT_ORDER-ALL CREATE READ UPDATE DELETE CANCEL VERIFY APPROVE ARCHIVE";
	
	public static String MANAGEMENT_GENERAL = "MANAGEMENT_GENERAL-ACCESS";
	public static String MANAGEMENT_FINANCE = "MANAGEMENT_FINANCE-ACCESS";
	public static String MANAGEMENT_OPERATIONS = "MANAGEMENT_OPERATIONS-ACCESS";
	
	public static String REPORT_SERVICE = "REPORT_SERVICE-ACCESS";
	
	
	
	
	
	
	public static String NURSING = "NURSING";
	
	
	public static String PHARMACY_GRN = "PHARMACY_GRN";
	
	public static String DEMAND_ORDER = "DEMAND_ORDER";
	public static String GRN = "GRN";
	
	public static String LPO = "LPO";
	
	public static String COMPANY_PROFILE = "COMPANY_PROFILE";
	public static String DAY = "DAY";
	public static String SUPPLIER = "SUPPLIER";
	
}
