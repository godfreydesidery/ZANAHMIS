import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyProfileComponent } from './pages/admin/company/company-profile/company-profile.component';
import { ConsultationPlanComponent } from './pages/admin/insurance-management/insurance-plan-pricing/consultation-plan/consultation-plan.component';
import { LabTestPlanComponent } from './pages/admin/insurance-management/insurance-plan-pricing/lab-test-plan/lab-test-plan.component';
import { MedicinePlanComponent } from './pages/admin/insurance-management/insurance-plan-pricing/medicine-plan/medicine-plan.component';
import { ProcedurePlanComponent } from './pages/admin/insurance-management/insurance-plan-pricing/procedure-plan/procedure-plan.component';
import { RadiologyPlanComponent } from './pages/admin/insurance-management/insurance-plan-pricing/radiology-plan/radiology-plan.component';
import { RegistrationPlanComponent } from './pages/admin/insurance-management/insurance-plan-pricing/registration-plan/registration-plan.component';
import { InsurancePlanComponent } from './pages/admin/insurance-management/insurance-plan/insurance-plan.component';
import { InsuranceProviderComponent } from './pages/admin/insurance-management/insurance-provider/insurance-provider.component';
import { ItemRegisterComponent } from './pages/admin/inventory/item-register/item-register.component';
import { DiagnosisTypeComponent } from './pages/admin/medical-operations/diagnosis-type/diagnosis-type.component';
import { LabTestTypeRangeComponent } from './pages/admin/medical-operations/lab-test-type-range/lab-test-type-range.component';
import { LabTestTypeComponent } from './pages/admin/medical-operations/lab-test-type/lab-test-type.component';
import { MedicineComponent } from './pages/admin/medical-operations/medicine/medicine.component';
import { ProcedureTypeComponent } from './pages/admin/medical-operations/procedure-type/procedure-type.component';
import { RadiologyTypeComponent } from './pages/admin/medical-operations/radiology-type/radiology-type.component';
import { ClinicComponent } from './pages/admin/medical-units/clinic/clinic.component';
import { PharmacyComponent } from './pages/admin/medical-units/pharmacy/pharmacy.component';
import { TheatreComponent } from './pages/admin/medical-units/theatre/theatre.component';
import { ClinicianComponent } from './pages/admin/personnel/clinician/clinician.component';
import { PharmacistComponent } from './pages/admin/personnel/pharmacist/pharmacist.component';
import { SupplierRegisterComponent } from './pages/admin/stakeholders/supplier-register/supplier-register.component';
import { AccessManagementComponent } from './pages/admin/user-and-access/access-management/access-management.component';
import { RoleComponent } from './pages/admin/user-and-access/role/role.component';
import { UserProfileComponent } from './pages/admin/user-and-access/user-profile/user-profile.component';
import { ClinicalNoteHistoryComponent } from './pages/doctor/clinical-note-history/clinical-note-history.component';
import { DoctorCrackingComponent } from './pages/doctor/doctor-cracking/doctor-cracking.component';
import { FinalDiagnosisHistoryComponent } from './pages/doctor/final-diagnosis-history/final-diagnosis-history.component';
import { GeneralExaminationHistoryComponent } from './pages/doctor/general-examination-history/general-examination-history.component';
import { LabTestHistoryComponent } from './pages/doctor/lab-test-history/lab-test-history.component';
import { ListFromReceptionComponent } from './pages/doctor/list-from-reception/list-from-reception.component';
import { MyConsultationComponent } from './pages/doctor/my-consultation/my-consultation.component';
import { PatientHistoryMenuComponent } from './pages/doctor/patient-history-menu/patient-history-menu.component';
import { PrescriptionHistoryComponent } from './pages/doctor/prescription-history/prescription-history.component';
import { ProcedureHistoryComponent } from './pages/doctor/procedure-history/procedure-history.component';
import { RadiologyHistoryComponent } from './pages/doctor/radiology-history/radiology-history.component';
import { WorkingDiagnosisHistoryComponent } from './pages/doctor/working-diagnosis-history/working-diagnosis-history.component';
import { LabInpatientListComponent } from './pages/laboratory/lab-inpatient-list/lab-inpatient-list.component';
import { LabOutpatientListComponent } from './pages/laboratory/lab-outpatient-list/lab-outpatient-list.component';
import { LabOutsiderListComponent } from './pages/laboratory/lab-outsider-list/lab-outsider-list.component';
import { LabTestComponent } from './pages/laboratory/lab-test/lab-test.component';
import { LabSampleCollectionReportComponent } from './pages/laboratory/reports/lab-sample-collection-report/lab-sample-collection-report.component';
import { LabTestReportComponent } from './pages/laboratory/reports/lab-test-report/lab-test-report.component';
import { LabTestStatisticsReportComponent } from './pages/laboratory/reports/lab-test-statistics-report/lab-test-statistics-report.component';
import { LabTestPaymentComponent } from './pages/payments/lab-test-payment/lab-test-payment.component';
import { MedicationPaymentComponent } from './pages/payments/medication-payment/medication-payment.component';
import { PatientPaymentComponent } from './pages/payments/patient-payment/patient-payment.component';
import { ProcedurePaymentComponent } from './pages/payments/procedure-payment/procedure-payment.component';
import { RadiologyPaymentComponent } from './pages/payments/radiology-payment/radiology-payment.component';
import { RegistrationPaymentComponent } from './pages/payments/registration-payment/registration-payment.component';
import { PatientPharmacyComponent } from './pages/pharmacy/patient-pharmacy/patient-pharmacy.component';
import { PharmacyInpatientListComponent } from './pages/pharmacy/pharmacy-inpatient-list/pharmacy-inpatient-list.component';
import { PharmacyMedicineStockStatusComponent } from './pages/pharmacy/pharmacy-medicine-stock-status/pharmacy-medicine-stock-status.component';
import { PharmacyOutpatientListComponent } from './pages/pharmacy/pharmacy-outpatient-list/pharmacy-outpatient-list.component';
import { PharmacyOutsiderListComponent } from './pages/pharmacy/pharmacy-outsider-list/pharmacy-outsider-list.component';
import { PharmacyToStoreROComponent } from './pages/pharmacy/pharmacy-to-store-r-o/pharmacy-to-store-r-o.component';
import { SelectPharmacyComponent } from './pages/pharmacy/select-pharmacy/select-pharmacy.component';
import { StoreToPharmacyRNComponent } from './pages/pharmacy/store-to-pharmacy-r-n/store-to-pharmacy-r-n.component';
import { ConsultationPricesComponent } from './pages/price-view/consultation-price/consultation-prices.component';
import { LabTestPriceComponent } from './pages/price-view/lab-test-price/lab-test-price.component';
import { MedicinePricesComponent } from './pages/price-view/medicine-price/medicine-price.component';
import { ProcedurePriceComponent } from './pages/price-view/procedure-price/procedure-price.component';
import { RadiologyPriceComponent } from './pages/price-view/radiology-price/radiology-price.component';
import { RegistrationPricesComponent } from './pages/price-view/registration-price/registration-prices.component';
import { PatientProcedureComponent } from './pages/procedure/patient-procedure/patient-procedure.component';
import { ProcedureInpatientListComponent } from './pages/procedure/procedure-inpatient-list/procedure-inpatient-list.component';
import { ProcedureOutpatientListComponent } from './pages/procedure/procedure-outpatient-list/procedure-outpatient-list.component';
import { ProcedureOutsiderListComponent } from './pages/procedure/procedure-outsider-list/procedure-outsider-list.component';
import { RadiologyInpatientListComponent } from './pages/radiology/radiology-inpatient-list/radiology-inpatient-list.component';
import { RadiologyOutpatientListComponent } from './pages/radiology/radiology-outpatient-list/radiology-outpatient-list.component';
import { RadiologyOutsiderListComponent } from './pages/radiology/radiology-outsider-list/radiology-outsider-list.component';
import { RadiologyComponent } from './pages/radiology/radiology/radiology.component';
import { PatientListComponent } from './pages/registration/patient-list/patient-list.component';
import { PatientRegisterComponent } from './pages/registration/patient-register/patient-register.component';
import { ReportTemplateComponent } from './pages/reports/report-template/report-template.component';
import { ItemMedicineConversionCoefficientComponent } from './pages/store/conversion-coefficients/item-medicine-conversion-coefficient/item-medicine-conversion-coefficient.component';
import { ItemInquiryComponent } from './pages/store/item-inquiry/item-inquiry.component';
import { PharmacyToStoreROListComponent } from './pages/store/pharmacy-to-store-r-o-list/pharmacy-to-store-r-o-list.component';
import { StoreToPharmacyTOComponent } from './pages/store/store-to-pharmacy-t-o/store-to-pharmacy-t-o.component';

const routes: Routes = [
  {path : 'dashboard', component : DashboardComponent, canActivate: [AuthGuard]},
  {path : 'company-profile', component : CompanyProfileComponent, canActivate: [AuthGuard]},
    {path : 'patient-register', component : PatientRegisterComponent, canActivate: [AuthGuard]},
    {path : 'patient-list', component : PatientListComponent, canActivate: [AuthGuard]},
    {path : 'patient-payment', component : PatientPaymentComponent, canActivate: [AuthGuard]},
    {path : 'registration-payment', component : RegistrationPaymentComponent, canActivate: [AuthGuard]},
    {path : 'lab-test-payment', component : LabTestPaymentComponent, canActivate: [AuthGuard]},
    {path : 'radiology-payment', component : RadiologyPaymentComponent, canActivate: [AuthGuard]},
    {path : 'medication-payment', component : MedicationPaymentComponent, canActivate: [AuthGuard]},
    {path : 'procedure-payment', component : ProcedurePaymentComponent, canActivate: [AuthGuard]},
    {path : 'clinic', component : ClinicComponent, canActivate: [AuthGuard]},
    {path : 'pharmacy', component : PharmacyComponent, canActivate: [AuthGuard]},
    {path : 'theatre', component : TheatreComponent, canActivate: [AuthGuard]},
    {path : 'clinician', component : ClinicianComponent, canActivate: [AuthGuard]},
    {path : 'pharmacist', component : PharmacistComponent, canActivate: [AuthGuard]},
    {path : 'my-consultation', component : MyConsultationComponent, canActivate: [AuthGuard]},
    {path : 'doctor-cracking', component : DoctorCrackingComponent, canActivate: [AuthGuard]},
    {path : 'list-from-reception', component : ListFromReceptionComponent, canActivate: [AuthGuard]},
    {path : 'diagnosis-type', component : DiagnosisTypeComponent, canActivate: [AuthGuard]},
    {path : 'lab-test-type', component : LabTestTypeComponent, canActivate: [AuthGuard]},
    {path : 'lab-test-type-range', component : LabTestTypeRangeComponent, canActivate: [AuthGuard]},
    {path : 'procedure-type', component : ProcedureTypeComponent, canActivate: [AuthGuard]},
    {path : 'radiology-type', component : RadiologyTypeComponent, canActivate: [AuthGuard]},
    {path : 'insurance-provider', component : InsuranceProviderComponent, canActivate: [AuthGuard]},
    {path : 'insurance-plan', component : InsurancePlanComponent, canActivate: [AuthGuard]},
    {path : 'registration-plan', component : RegistrationPlanComponent, canActivate: [AuthGuard]},
    {path : 'consultation-plan', component : ConsultationPlanComponent, canActivate: [AuthGuard]},
    {path : 'lab-test-plan', component : LabTestPlanComponent, canActivate: [AuthGuard]},
    {path : 'procedure-plan', component : ProcedurePlanComponent, canActivate: [AuthGuard]},
    {path : 'radiology-plan', component : RadiologyPlanComponent, canActivate: [AuthGuard]},
    {path : 'medicine-plan', component : MedicinePlanComponent, canActivate: [AuthGuard]},
    {path : 'user-profile', component : UserProfileComponent, canActivate: [AuthGuard]},
    {path : 'role', component : RoleComponent, canActivate: [AuthGuard]},
    {path : 'access-management', component : AccessManagementComponent, canActivate: [AuthGuard]},
    {path : 'medicine', component : MedicineComponent, canActivate: [AuthGuard]},
    {path : 'lab-test', component : LabTestComponent, canActivate: [AuthGuard]},
    {path : 'radiology', component : RadiologyComponent, canActivate: [AuthGuard]},
    {path : 'lab-outpatient-list', component : LabOutpatientListComponent, canActivate: [AuthGuard]},
    {path : 'lab-inpatient-list', component : LabInpatientListComponent, canActivate: [AuthGuard]},
    {path : 'lab-outsider-list', component : LabOutsiderListComponent, canActivate: [AuthGuard]},
    {path : 'lab-test-report', component : LabTestReportComponent, canActivate: [AuthGuard]},
    {path : 'lab-test-statistics-report', component : LabTestStatisticsReportComponent, canActivate: [AuthGuard]},
    {path : 'lab-sample-collection-report', component : LabSampleCollectionReportComponent, canActivate: [AuthGuard]},
    {path : 'radiology-outpatient-list', component : RadiologyOutpatientListComponent, canActivate: [AuthGuard]},
    {path : 'radiology-inpatient-list', component : RadiologyInpatientListComponent, canActivate: [AuthGuard]},
    {path : 'radiology-outsider-list', component : RadiologyOutsiderListComponent, canActivate: [AuthGuard]},
    {path : 'procedure-outpatient-list', component : ProcedureOutpatientListComponent, canActivate: [AuthGuard]},
    {path : 'procedure-inpatient-list', component : ProcedureInpatientListComponent, canActivate: [AuthGuard]},
    {path : 'procedure-outsider-list', component : ProcedureOutsiderListComponent, canActivate: [AuthGuard]},
    {path : 'registration-prices', component : RegistrationPricesComponent, canActivate: [AuthGuard]},
    {path : 'consultation-prices', component : ConsultationPricesComponent, canActivate: [AuthGuard]},
    {path : 'lab-test-price', component : LabTestPriceComponent, canActivate: [AuthGuard]},
    {path : 'procedure-price', component : ProcedurePriceComponent, canActivate: [AuthGuard]},
    {path : 'radiology-price', component : RadiologyPriceComponent, canActivate: [AuthGuard]},
    {path : 'medicine-prices', component : MedicinePricesComponent, canActivate: [AuthGuard]},
    {path : 'select-pharmacy', component : SelectPharmacyComponent, canActivate: [AuthGuard]},
    {path : 'pharmacy-outpatient-list', component : PharmacyOutpatientListComponent, canActivate: [AuthGuard]},
    {path : 'pharmacy-inpatient-list', component : PharmacyInpatientListComponent, canActivate: [AuthGuard]},
    {path : 'pharmacy-outsider-list', component : PharmacyOutsiderListComponent, canActivate: [AuthGuard]},
    {path : 'patient-pharmacy', component : PatientPharmacyComponent, canActivate: [AuthGuard]},
    {path : 'patient-procedure', component : PatientProcedureComponent, canActivate: [AuthGuard]},
    {path : 'supplier-register', component : SupplierRegisterComponent, canActivate: [AuthGuard]},
    {path : 'item-register', component : ItemRegisterComponent, canActivate: [AuthGuard]},
    {path : 'item-inquiry', component : ItemInquiryComponent, canActivate: [AuthGuard]},
    {path : 'pharmacy-to-store-r-o', component : PharmacyToStoreROComponent, canActivate: [AuthGuard]},
    {path : 'pharmacy-to-store-r-o-list', component : PharmacyToStoreROListComponent, canActivate: [AuthGuard]},
    {path : 'store-to-pharmacy-t-o', component : StoreToPharmacyTOComponent, canActivate: [AuthGuard]},
    {path : 'store-to-pharmacy-r-n', component : StoreToPharmacyRNComponent, canActivate: [AuthGuard]},
    {path : 'pharmacy-medicine-stock-status', component : PharmacyMedicineStockStatusComponent, canActivate: [AuthGuard]},
    {path : 'item-medicine-conversion-coefficient', component : ItemMedicineConversionCoefficientComponent, canActivate: [AuthGuard]},
    {path : 'report-template', component : ReportTemplateComponent, canActivate: [AuthGuard]},
    {path : 'patient-history-menu', component : PatientHistoryMenuComponent, canActivate: [AuthGuard]},
    {path : 'clinical-note-history', component : ClinicalNoteHistoryComponent, canActivate: [AuthGuard]},
    {path : 'general-examination-history', component : GeneralExaminationHistoryComponent, canActivate: [AuthGuard]},
    {path : 'lab-test-history', component : LabTestHistoryComponent, canActivate: [AuthGuard]},
    {path : 'radiology-history', component : RadiologyHistoryComponent, canActivate: [AuthGuard]},
    {path : 'procedure-history', component : ProcedureHistoryComponent, canActivate: [AuthGuard]},
    {path : 'prescription-history', component : PrescriptionHistoryComponent, canActivate: [AuthGuard]},
    {path : 'working-diagnosis-history', component : WorkingDiagnosisHistoryComponent, canActivate: [AuthGuard]},
    {path : 'final-diagnosis-history', component : FinalDiagnosisHistoryComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
