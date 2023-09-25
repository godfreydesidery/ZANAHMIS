import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { DataService } from './services/data.service';
import { PosReceiptPrinterService } from './services/pos-receipt-printer.service';

import * as pdfMake from 'pdfmake/build/pdfmake';
import { ReceiptItem } from './domain/receipt-item';
import { AuthGuard } from './auth-guard';
import { ClinicComponent } from './pages/admin/medical-units/clinic/clinic.component';
import { PharmacyComponent } from './pages/admin/medical-units/pharmacy/pharmacy.component';
import { ConsultationPlanComponent } from './pages/admin/insurance-management/insurance-plan-pricing/consultation-plan/consultation-plan.component';
import { LabTestPlanComponent } from './pages/admin/insurance-management/insurance-plan-pricing/lab-test-plan/lab-test-plan.component';
import { MedicinePlanComponent } from './pages/admin/insurance-management/insurance-plan-pricing/medicine-plan/medicine-plan.component';
import { ProcedurePlanComponent } from './pages/admin/insurance-management/insurance-plan-pricing/procedure-plan/procedure-plan.component';
import { RadiologyPlanComponent } from './pages/admin/insurance-management/insurance-plan-pricing/radiology-plan/radiology-plan.component';
import { RegistrationPlanComponent } from './pages/admin/insurance-management/insurance-plan-pricing/registration-plan/registration-plan.component';
import { InsurancePlanComponent } from './pages/admin/insurance-management/insurance-plan/insurance-plan.component';
import { InsuranceProviderComponent } from './pages/admin/insurance-management/insurance-provider/insurance-provider.component';
import { DiagnosisTypeComponent } from './pages/admin/medical-operations/diagnosis-type/diagnosis-type.component';
import { LabTestTypeRangeComponent } from './pages/admin/medical-operations/lab-test-type-range/lab-test-type-range.component';
import { LabTestTypeComponent } from './pages/admin/medical-operations/lab-test-type/lab-test-type.component';
import { MedicineComponent } from './pages/admin/medical-operations/medicine/medicine.component';
import { ProcedureTypeComponent } from './pages/admin/medical-operations/procedure-type/procedure-type.component';
import { RadiologyTypeComponent } from './pages/admin/medical-operations/radiology-type/radiology-type.component';
import { TheatreComponent } from './pages/admin/medical-units/theatre/theatre.component';
import { ClinicianComponent } from './pages/admin/personnel/clinician/clinician.component';
import { PharmacistComponent } from './pages/admin/personnel/pharmacist/pharmacist.component';
import { AccessManagementComponent } from './pages/admin/user-and-access/access-management/access-management.component';
import { RoleComponent } from './pages/admin/user-and-access/role/role.component';
import { UserProfileComponent } from './pages/admin/user-and-access/user-profile/user-profile.component';
import { CompanyProfileComponent } from './pages/admin/company/company-profile/company-profile.component';
import { PatientListComponent } from './pages/registration/patient-list/patient-list.component';
import { PatientRegisterComponent } from './pages/registration/patient-register/patient-register.component';
import { LabTestPaymentComponent } from './pages/payments/lab-test-payment/lab-test-payment.component';
import { MedicationPaymentComponent } from './pages/payments/medication-payment/medication-payment.component';
import { PatientPaymentComponent } from './pages/payments/patient-payment/patient-payment.component';
import { ProcedurePaymentComponent } from './pages/payments/procedure-payment/procedure-payment.component';
import { RadiologyPaymentComponent } from './pages/payments/radiology-payment/radiology-payment.component';
import { RegistrationPaymentComponent } from './pages/payments/registration-payment/registration-payment.component';
import { LabInpatientListComponent } from './pages/laboratory/lab-inpatient-list/lab-inpatient-list.component';
import { LabOutpatientListComponent } from './pages/laboratory/lab-outpatient-list/lab-outpatient-list.component';
import { LabOutsiderListComponent } from './pages/laboratory/lab-outsider-list/lab-outsider-list.component';
import { LabTestComponent } from './pages/laboratory/lab-test/lab-test.component';
import { LabSampleCollectionReportComponent } from './pages/laboratory/reports/lab-sample-collection-report/lab-sample-collection-report.component';
import { LabTestReportComponent } from './pages/laboratory/reports/lab-test-report/lab-test-report.component';
import { LabTestStatisticsReportComponent } from './pages/laboratory/reports/lab-test-statistics-report/lab-test-statistics-report.component';
import { RadiologyComponent } from './pages/radiology/radiology/radiology.component';
import { RadiologyInpatientListComponent } from './pages/radiology/radiology-inpatient-list/radiology-inpatient-list.component';
import { RadiologyOutpatientListComponent } from './pages/radiology/radiology-outpatient-list/radiology-outpatient-list.component';
import { RadiologyOutsiderListComponent } from './pages/radiology/radiology-outsider-list/radiology-outsider-list.component';
import { ConsultationPricesComponent } from './pages/price-view/consultation-price/consultation-prices.component';
import { LabTestPriceComponent } from './pages/price-view/lab-test-price/lab-test-price.component';
import { MedicinePricesComponent } from './pages/price-view/medicine-price/medicine-price.component';
import { ProcedurePriceComponent } from './pages/price-view/procedure-price/procedure-price.component';
import { RadiologyPriceComponent } from './pages/price-view/radiology-price/radiology-price.component';
import { RegistrationPricesComponent } from './pages/price-view/registration-price/registration-prices.component';
import { SelectPharmacyComponent } from './pages/pharmacy/select-pharmacy/select-pharmacy.component';
import { PatientPharmacyComponent } from './pages/pharmacy/patient-pharmacy/patient-pharmacy.component';
import { PharmacyInpatientListComponent } from './pages/pharmacy/pharmacy-inpatient-list/pharmacy-inpatient-list.component';
import { PharmacyOutpatientListComponent } from './pages/pharmacy/pharmacy-outpatient-list/pharmacy-outpatient-list.component';
import { PharmacyOutsiderListComponent } from './pages/pharmacy/pharmacy-outsider-list/pharmacy-outsider-list.component';
import { ItemRegisterComponent } from './pages/admin/inventory/item-register/item-register.component';
import { PharmacyToStoreROComponent } from './pages/pharmacy/pharmacy-to-store-r-o/pharmacy-to-store-r-o.component';
import { PharmacyToStoreROListComponent } from './pages/store/pharmacy-to-store-r-o-list/pharmacy-to-store-r-o-list.component';
import { ClinicalNoteHistoryComponent } from './pages/doctor/clinical-note-history/clinical-note-history.component';
import { FinalDiagnosisHistoryComponent } from './pages/doctor/final-diagnosis-history/final-diagnosis-history.component';
import { GeneralExaminationHistoryComponent } from './pages/doctor/general-examination-history/general-examination-history.component';
import { LabTestHistoryComponent } from './pages/doctor/lab-test-history/lab-test-history.component';
import { PatientHistoryMenuComponent } from './pages/doctor/patient-history-menu/patient-history-menu.component';
import { PrescriptionHistoryComponent } from './pages/doctor/prescription-history/prescription-history.component';
import { ProcedureHistoryComponent } from './pages/doctor/procedure-history/procedure-history.component';
import { RadiologyHistoryComponent } from './pages/doctor/radiology-history/radiology-history.component';
import { WorkingDiagnosisHistoryComponent } from './pages/doctor/working-diagnosis-history/working-diagnosis-history.component';
import { NurseComponent } from './pages/admin/personnel/nurse/nurse.component';
import { WardPlanComponent } from './pages/admin/insurance-management/insurance-plan-pricing/ward-plan/ward-plan.component';
import { ConsultationPriceComponent } from './pages/admin/insurance-management/prices/consultation-price/consultation-price.component';
import { LabTestTypePriceComponent } from './pages/admin/insurance-management/prices/lab-test-type-price/lab-test-type-price.component';
import { MedicinePriceComponent } from './pages/admin/insurance-management/prices/medicine-price/medicine-price.component';
import { ProcedureTypePriceComponent } from './pages/admin/insurance-management/prices/procedure-type-price/procedure-type-price.component';
import { RadiologyTypePriceComponent } from './pages/admin/insurance-management/prices/radiology-type-price/radiology-type-price.component';
import { RegistrationPriceComponent } from './pages/admin/insurance-management/prices/registration-price/registration-price.component';
import { WardTypePriceComponent } from './pages/admin/insurance-management/prices/ward-type-price/ward-type-price.component';
import { WardCategoryComponent } from './pages/admin/medical-units/ward-management/ward-category/ward-category.component';
import { WardConfigurationComponent } from './pages/admin/medical-units/ward-management/ward-configuration/ward-configuration.component';
import { WardTypeComponent } from './pages/admin/medical-units/ward-management/ward-type/ward-type.component';
import { WardComponent } from './pages/admin/medical-units/ward-management/ward/ward.component';
import { DoctorInpatientListComponent } from './pages/doctor/doctor-inpatient-list/doctor-inpatient-list.component';
import { NurseInpatientListComponent } from './pages/nurse/nurse-inpatient-list/nurse-inpatient-list.component';
import { NurseOutpatientListComponent } from './pages/nurse/nurse-outpatient-list/nurse-outpatient-list.component';
import { NurseOutsiderListComponent } from './pages/nurse/nurse-outsider-list/nurse-outsider-list.component';
import { DoctorInpatientComponent } from './pages/doctor/doctor-inpatient/doctor-inpatient.component';
import { ConsultationReportComponent } from './pages/admin/reports/consultation-report/consultation-report.component';
import { DoctorToLaboratoryReportComponent } from './pages/admin/reports/doctor-to-laboratory-report/doctor-to-laboratory-report.component';
import { DoctorToRadiologyReportComponent } from './pages/admin/reports/doctor-to-radiology-report/doctor-to-radiology-report.component';
import { ProcedureReportComponent } from './pages/admin/reports/procedure-report/procedure-report.component';
import { StoreToPharmacyRNComponent } from './pages/pharmacy/store-to-pharmacy-r-n/store-to-pharmacy-r-n.component';
import { StoreToPharmacyTOComponent } from './pages/store/store-to-pharmacy-t-o/store-to-pharmacy-t-o.component';
import { InpatientPaymentComponent } from './pages/payments/inpatient-payment/inpatient-payment.component';
import { PharmacyMedicineStockStatusComponent } from './pages/pharmacy/pharmacy-medicine-stock-status/pharmacy-medicine-stock-status.component';
import { ItemMedicineConversionCoefficientComponent } from './pages/store/conversion-coefficients/item-medicine-conversion-coefficient/item-medicine-conversion-coefficient.component';
import { MyConsultationComponent } from './pages/doctor/my-consultation/my-consultation.component';
import { DoctorCrackingComponent } from './pages/doctor/doctor-cracking/doctor-cracking.component';
import { ListFromReceptionComponent } from './pages/doctor/list-from-reception/list-from-reception.component';
import { SupplierRegisterComponent } from './pages/admin/stakeholders/supplier-register/supplier-register.component';
import { ItemInquiryComponent } from './pages/store/item-inquiry/item-inquiry.component';
import { NurseInpatientChartComponent } from './pages/nurse/nurse-inpatient-chart/nurse-inpatient-chart.component';
import { ReportTemplateComponent } from './pages/reports/report-template/report-template.component';
var pdfFonts = require('pdfmake/build/vfs_fonts.js'); 
const fs = require('file-saver');

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zana-hmis';
  isLoggedIn : boolean = false;

  userName : string = ''

  constructor(private router : Router,
    private http  : HttpClient,
    private auth : AuthService,
    private titleService: Title,
    private spinner: NgxSpinnerService,
    private data : DataService,
    private printer : PosReceiptPrinterService) { (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs; }

  ngOnInit(): void {

    
    
    this.ping()
    this.loadCompanyName()

    this.router.navigate(['/dashboard'])//Navigates to home if url is entered on address bar
    var currentUser = null
    if(localStorage.getItem('user-name') != null){
      this.userName = localStorage.getItem('user-name')!
    }else{
      this.userName = ''
    }
    if(localStorage.getItem('current-user') != null){
      currentUser = localStorage.getItem('current-user')
    }
    if(currentUser != null){
      this.isLoggedIn = true
    }else{
      this.isLoggedIn = false
    }
    this.getLogo()
  }

  async ping() {   
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    await this.http.get(API_URL+'/ping', options)
    .toPromise()
    .then(
      ()=>{}
    )
    .catch(
      ()=>{}
    )
  }

  async loadDay(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    await this.http.get<IDayData>(API_URL+'/days/get_bussiness_date', options)
    .toPromise()
    .then(
      data => {
        localStorage.setItem('system-date', data?.bussinessDate!+'')        
      }
    )
    .catch(error => {})
  }

  async loadCompanyName(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    await this.http.get<ICompanyData>(API_URL+'/company_profile/get', options)
    .toPromise()
    .then(
      data => {
        localStorage.setItem('company-name', data?.companyName!+'')        
      }
    )
    .catch(error => {})
  }

  public async logout() : Promise<any>{
    localStorage.removeItem('current-user')
    alert('You have logged out!')
    await this.router.navigate([''])
    window.location.reload()
  }

  selectedFile!: File;
  retrievedImage!: any;
  base64Data: any;
  retrieveResponse: any;
  message!: string;
  imageName: any;
  async getLogo() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    //this.spinner.show()
    await this.http.get(API_URL+'/company_profile/get_logo')
    //.pipe(finalize(() => this.spinner.hide()))
    .toPromise()
      .then(
        res => {
          this.retrieveResponse = res
          this.base64Data = this.retrieveResponse.logo
          this.retrievedImage = 'data:image/png;base64,'+this.base64Data
          console.log(this.retrievedImage)
        }
      )
      .catch(error => {
        console.log(error)
      })  
      
    }


    public grant(privilege : string[]) : boolean{
      /**Allow user to perform an action if the user has that priviledge */
      var granted : boolean = false
      privilege.forEach(
        element => {
          if(this.auth.checkPrivilege(element)){
            granted = true
          }
        }
      )
      return granted
    }

    loadRegistrationModule(){
      this.router.config.push(
        {path : 'patient-register', component : PatientRegisterComponent, canActivate: [AuthGuard]},
        {path : 'patient-list', component : PatientListComponent, canActivate: [AuthGuard]},
      )
    }
    loadClinicModule(){
      this.router.config.push(
        /*{path : 'patient-history-menu', component : PatientHistoryMenuComponent, canActivate: [AuthGuard]},
        {path : 'clinical-note-history', component : ClinicalNoteHistoryComponent, canActivate: [AuthGuard]},
        {path : 'general-examination-history', component : GeneralExaminationHistoryComponent, canActivate: [AuthGuard]},
        {path : 'lab-test-history', component : LabTestHistoryComponent, canActivate: [AuthGuard]},
        {path : 'radiology-history', component : RadiologyHistoryComponent, canActivate: [AuthGuard]},
        {path : 'procedure-history', component : ProcedureHistoryComponent, canActivate: [AuthGuard]},
        {path : 'prescription-history', component : PrescriptionHistoryComponent, canActivate: [AuthGuard]},
        {path : 'working-diagnosis-history', component : WorkingDiagnosisHistoryComponent, canActivate: [AuthGuard]},
        {path : 'final-diagnosis-history', component : FinalDiagnosisHistoryComponent, canActivate: [AuthGuard]},
        {path : 'doctor-inpatient-list', component : DoctorInpatientListComponent},
        {path : 'doctor-inpatient' , component : DoctorInpatientComponent},
        {path : 'my-consultation', component : MyConsultationComponent, canActivate: [AuthGuard]}, 
        {path : 'doctor-cracking', component : DoctorCrackingComponent, canActivate: [AuthGuard]},
        {path : 'list-from-reception', component : ListFromReceptionComponent, canActivate: [AuthGuard]},*/
        
      )
    }
    loadNursingModule(){
      this.router.config.push(
        {path : 'nurse-inpatient-list', component : NurseInpatientListComponent},
        {path : 'nurse-outpatient-list', component : NurseOutpatientListComponent},
        {path : 'nurse-outsider-list', component : NurseOutsiderListComponent},
        {path : 'nurse-inpatient-chart', component : NurseInpatientChartComponent}
      )
    }
    loadLaboratoryModule(){
      this.router.config.push(
        {path : 'lab-test', component : LabTestComponent, canActivate: [AuthGuard]},
        {path : 'lab-outpatient-list', component : LabOutpatientListComponent, canActivate: [AuthGuard]},
        {path : 'lab-inpatient-list', component : LabInpatientListComponent, canActivate: [AuthGuard]},
        {path : 'lab-outsider-list', component : LabOutsiderListComponent, canActivate: [AuthGuard]},
        {path : 'lab-test-report', component : LabTestReportComponent, canActivate: [AuthGuard]},
        {path : 'lab-test-statistics-report', component : LabTestStatisticsReportComponent, canActivate: [AuthGuard]},
        {path : 'lab-sample-collection-report', component : LabSampleCollectionReportComponent, canActivate: [AuthGuard]},
      )
    }
    loadRadiologyModule(){
      this.router.config.push(
        {path : 'radiology', component : RadiologyComponent, canActivate: [AuthGuard]},
        {path : 'radiology-outpatient-list', component : RadiologyOutpatientListComponent, canActivate: [AuthGuard]},
        {path : 'radiology-inpatient-list', component : RadiologyInpatientListComponent, canActivate: [AuthGuard]},
        {path : 'radiology-outsider-list', component : RadiologyOutsiderListComponent, canActivate: [AuthGuard]},

      )
    }
    loadPharmacyModule(){
      this.router.config.push(
        {path : 'select-pharmacy', component : SelectPharmacyComponent, canActivate: [AuthGuard]},
        {path : 'pharmacy-outpatient-list', component : PharmacyOutpatientListComponent, canActivate: [AuthGuard]},
        {path : 'pharmacy-inpatient-list', component : PharmacyInpatientListComponent, canActivate: [AuthGuard]},
        {path : 'pharmacy-outsider-list', component : PharmacyOutsiderListComponent, canActivate: [AuthGuard]},
        {path : 'patient-pharmacy', component : PatientPharmacyComponent, canActivate: [AuthGuard]},
        {path : 'pharmacy-to-store-r-o', component : PharmacyToStoreROComponent, canActivate: [AuthGuard]},
        {path : 'pharmacy-to-store-r-o-list', component : PharmacyToStoreROListComponent, canActivate: [AuthGuard]},
        {path : 'store-to-pharmacy-r-n', component : StoreToPharmacyRNComponent, canActivate: [AuthGuard]},
        {path : 'pharmacy-medicine-stock-status', component : PharmacyMedicineStockStatusComponent, canActivate: [AuthGuard]},
      )
    }
    loadCashierModule(){
      this.router.config.push(
        {path : 'patient-payment', component : PatientPaymentComponent, canActivate: [AuthGuard]},
        {path : 'registration-payment', component : RegistrationPaymentComponent, canActivate: [AuthGuard]},
        {path : 'lab-test-payment', component : LabTestPaymentComponent, canActivate: [AuthGuard]},
        {path : 'radiology-payment', component : RadiologyPaymentComponent, canActivate: [AuthGuard]},
        {path : 'medication-payment', component : MedicationPaymentComponent, canActivate: [AuthGuard]},
        {path : 'procedure-payment', component : ProcedurePaymentComponent, canActivate: [AuthGuard]},

        {path : 'registration-prices', component : RegistrationPricesComponent, canActivate: [AuthGuard]},
        {path : 'consultation-prices', component : ConsultationPricesComponent, canActivate: [AuthGuard]},
        {path : 'lab-test-price', component : LabTestPriceComponent, canActivate: [AuthGuard]},
        {path : 'procedure-price', component : ProcedurePriceComponent, canActivate: [AuthGuard]},
        {path : 'radiology-price', component : RadiologyPriceComponent, canActivate: [AuthGuard]},
        {path : 'medicine-prices', component : MedicinePricesComponent, canActivate: [AuthGuard]},

        {path : 'inpatient-payment', component : InpatientPaymentComponent},
      )
    }
    loadStoreModule(){
      this.router.config.push(
        {path : 'store-to-pharmacy-t-o', component : StoreToPharmacyTOComponent, canActivate: [AuthGuard]},
        {path : 'item-medicine-conversion-coefficient', component : ItemMedicineConversionCoefficientComponent, canActivate: [AuthGuard]},
        {path : 'item-inquiry', component : ItemInquiryComponent, canActivate: [AuthGuard]},
      )
    }
    loadAdminModule(){
      this.router.config.push(
        {path : 'clinic', component : ClinicComponent, canActivate: [AuthGuard]},
        {path : 'pharmacy', component : PharmacyComponent, canActivate: [AuthGuard]},
        {path : 'theatre', component : TheatreComponent, canActivate: [AuthGuard]},
        {path : 'clinician', component : ClinicianComponent, canActivate: [AuthGuard]},
        {path : 'pharmacist', component : PharmacistComponent, canActivate: [AuthGuard]},
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
        {path : 'company-profile', component : CompanyProfileComponent, canActivate: [AuthGuard]},
        {path : 'item-register', component : ItemRegisterComponent, canActivate: [AuthGuard]},

        {path : 'nurse', component : NurseComponent}, 

        {path : 'ward-plan', component : WardPlanComponent},   
        {path : 'lab-test-type-price', component : LabTestTypePriceComponent},
        {path : 'radiology-type-price', component : RadiologyTypePriceComponent},
        {path : 'procedure-type-price', component : ProcedureTypePriceComponent},
        {path : 'medicine-price', component : MedicinePriceComponent},
        {path : 'consultation-price', component : ConsultationPriceComponent},
        {path : 'registration-price', component : RegistrationPriceComponent},
        {path : 'ward-type-price', component : WardTypePriceComponent},
        {path : 'ward', component : WardComponent},
        {path : 'ward-configuration', component : WardConfigurationComponent},
        {path : 'ward-category', component : WardCategoryComponent},
        {path : 'ward-type', component : WardTypeComponent},

        {path : 'consultation-report', component : ConsultationReportComponent},
        {path : 'procedure-report', component : ProcedureReportComponent},
        {path : 'doctor-to-radiology-report', component : DoctorToRadiologyReportComponent},
        {path : 'doctor-to-laboratory-report', component : DoctorToLaboratoryReportComponent},

        {path : 'supplier-register', component : SupplierRegisterComponent, canActivate: [AuthGuard]},
      )
      
    }
    loadReportModule(){
      this.router.config.push(
        {path : 'report-template', component : ReportTemplateComponent, canActivate: [AuthGuard]},
      )
    }

/*

    {path : 'procedure-outpatient-list', component : ProcedureOutpatientListComponent, canActivate: [AuthGuard]},
    {path : 'procedure-inpatient-list', component : ProcedureInpatientListComponent, canActivate: [AuthGuard]},
    {path : 'procedure-outsider-list', component : ProcedureOutsiderListComponent, canActivate: [AuthGuard]},

    
  
    {path : 'patient-procedure', component : PatientProcedureComponent, canActivate: [AuthGuard]},
    
    */
  
}

interface IDayData{
  bussinessDate : String
}

interface ICompanyData{
  companyName : String
}

function jspmWSStatus() {
  throw new Error('Function not implemented.');
}
