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
	 * CREATE READ UPDATE DELETE ACTIVATE APPROVE VERIFY CANCEL
	 * C R U D T V Y X
	 * Format: OBJECT-LIST OF NOT ALLOWED AUTHORITIES
	 */
	
	/**
	 * Admin
	 */
	
	/**
	 * Patient Services
	 */
	public static String PATIENT = "PATIENT";
	/**
	 * Bill Services
	 */
	public static String BILL = "BILL";
	/**
	 * Clinic Services
	 */
	public static String CLINIC_SERVICE = "CLINIC_SERVICE";
	public static String CONSULTATION = "CONSULTATION";
	public static String PROCEDURE = "PROCEDURE";
	/**
	 * Radiology Services
	 */
	public static String RADIOLOGY_SERVICE = "RADIOLOGY_SERVICE";
	public static String RADIOLOGY = "RADIOLOGY";
	/**
	 * Lab Services
	 */
	public static String LAB_SERVICE = "LAB_SERVICE";
	public static String LAB_TEST = "LAB_TEST";
	/**
	 * Pharmacy Services
	 */
	public static String PHARMACY_SERVICE = "PHARMACY_SERVICE";
	public static String PRESCRIPTION = "PRESCRIPTION";
	public static String PHARMACY_ORDER = "PHARMACY_ORDER";
	public static String PHARMACY_GRN = "PHARMACY_GRN";
	/**
	 * Store Services
	 */
	public static String STORE_SERVICE = "STORE_SERVICE";
	public static String STORE_ORDER = "STORE_ORDER";
	public static String DEMAND_ORDER = "DEMAND_ORDER";
	public static String GRN = "GRN";
	/**
	 * Procurement Services
	 */
	public static String LPO = "LPO";
	/**
	 * Report Services
	 */
	public static String REPORT_SERVICE = "REPORT_SERVICE";
	
	/**
	 * Management Services
	 */
	public static String MANAGEMENT_GENERAL = "MANAGEMENT_GENERAL";
	public static String MANAGEMENT_FINANCE = "MANAGEMENT_FINANCE";
	public static String MANAGEMENT_OPERATIONS = "MANAGEMENT_OPERATIONS";
	
	/**
	 * Admin Services
	 */
	public static String ADMIN = "ADMIN";
	public static String USER = "USER";
	public static String ROLE = "ROLE";
	public static String COMPANY_PROFILE = "COMPANY_PROFILE";
	public static String DAY = "DAY";
	public static String SUPPLIER = "SUPPLIER";
	
}
