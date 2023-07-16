/**
 * 
 */
package com.orbix.api.api;

import java.time.LocalDate;

import javax.transaction.Transactional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.Data;
import lombok.RequiredArgsConstructor;

/**
 * @author GODFREY
 *
 */
@RestController
@RequestMapping("/zana-hmis-api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Transactional
public class ReportResource {
	

}

@Data
class DailySalesReportArgs {
	LocalDate from;
	LocalDate to;
	String salesAgentName;
}

@Data
class TotalSalesReportArgs {
	LocalDate from;
	LocalDate to;
	String tillNo;
}

@Data
class DailyPurchaseReportArgs {
	LocalDate from;
	LocalDate to;
	
}

@Data
class DailySummaryReportArgs {
	LocalDate from;
	LocalDate to;
	
}

@Data
class PurchasesAndSalesSummaryReportArgs {
	LocalDate from;
	LocalDate to;
	
}

@Data
class NegativeStockReportArgs {
	LocalDate from;
	LocalDate to;
	
}







@Data
class ProductionReportArgs {
	LocalDate from;
	LocalDate to;
}

@Data
class FastMovingProductsReportArgs {
	LocalDate from;
	LocalDate to;
}

@Data
class SlowMovingProductsReportArgs {
	LocalDate from;
	LocalDate to;
}

@Data
class ProductListingReportArgs {
	LocalDate from;
	LocalDate to;
	String tillNo;
}





@Data
class PurchaseSummaryReportArgs{
	LocalDate from;
	LocalDate to;
}

@Data
class SalesSummaryReportArgs{
	LocalDate from;
	LocalDate to;
}

@Data
class ProductStockSummaryReportArgs{
	LocalDate from;
	LocalDate to;
}

@Data
class DebtTrackerReportArgs{
	LocalDate from;
	LocalDate to;
}

