/**
 * 
 */
package com.orbix.api.api.accessories;

/**
 * @author Godfrey
 *
 */
public class Sanitizer {
	public static String sanitizeString(String stringToSanitize) {
		String s = stringToSanitize;
		s = s.replace("+", " ");
		s = s.trim().replaceAll("\\s+", " ");		
		return s;
	}
}
