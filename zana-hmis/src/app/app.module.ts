import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PatientRegisterComponent } from './pages/registration/patient-register/patient-register.component';
import { RouterModule } from '@angular/router';
import { PatientListComponent } from './pages/registration/patient-list/patient-list.component';
import { PatientPaymentComponent } from './pages/payments/patient-payment/patient-payment.component';
import { RegistrationPaymentComponent } from './pages/payments/registration-payment/registration-payment.component';
import { ClinicComponent } from './pages/admin/medical-units/clinic/clinic.component';
import { ClinicianComponent } from './pages/admin/personnel/clinician/clinician.component';
import { MyConsultationComponent } from './pages/doctor/my-consultation/my-consultation.component';
import { DoctorCrackingComponent } from './pages/doctor/doctor-cracking/doctor-cracking.component';
import { ListFromReceptionComponent } from './pages/doctor/list-from-reception/list-from-reception.component';
import { DiagnosisTypeComponent } from './pages/admin/medical-operations/diagnosis-type/diagnosis-type.component';
import { LabTestTypeComponent } from './pages/admin/medical-operations/lab-test-type/lab-test-type.component';
import { ProcedureTypeComponent } from './pages/admin/medical-operations/procedure-type/procedure-type.component';
import { RadiologyTypeComponent } from './pages/admin/medical-operations/radiology-type/radiology-type.component';
import { InsuranceProviderComponent } from './pages/admin/insurance-management/insurance-provider/insurance-provider.component';
import { InsurancePlanComponent } from './pages/admin/insurance-management/insurance-plan/insurance-plan.component';
import { RegistrationPlanComponent } from './pages/admin/insurance-management/insurance-plan-pricing/registration-plan/registration-plan.component';
import { ConsultationPlanComponent } from './pages/admin/insurance-management/insurance-plan-pricing/consultation-plan/consultation-plan.component';
import { LabTestPlanComponent } from './pages/admin/insurance-management/insurance-plan-pricing/lab-test-plan/lab-test-plan.component';
import { ProcedurePlanComponent } from './pages/admin/insurance-management/insurance-plan-pricing/procedure-plan/procedure-plan.component';
import { RadiologyPlanComponent } from './pages/admin/insurance-management/insurance-plan-pricing/radiology-plan/radiology-plan.component';
import { MedicinePlanComponent } from './pages/admin/insurance-management/insurance-plan-pricing/medicine-plan/medicine-plan.component';
import { UserProfileComponent } from './pages/admin/user-and-access/user-profile/user-profile.component';
import { RoleComponent } from './pages/admin/user-and-access/role/role.component';
import { AccessManagementComponent } from './pages/admin/user-and-access/access-management/access-management.component';
import { MedicineComponent } from './pages/admin/medical-operations/medicine/medicine.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InvestigationPaymentComponent } from './pages/payments/investigation-payment/investigation-payment.component';
import { LabTestComponent } from './pages/laboratory/lab-test/lab-test.component';
import { LabPatientListComponent } from './pages/laboratory/lab-patient-list/lab-patient-list.component';
import { LabOutpatientListComponent } from './pages/laboratory/lab-outpatient-list/lab-outpatient-list.component';
import { LabInpatientListComponent } from './pages/laboratory/lab-inpatient-list/lab-inpatient-list.component';
import { LabOutsiderListComponent } from './pages/laboratory/lab-outsider-list/lab-outsider-list.component';
import { LabTestTypeRangeComponent } from './pages/admin/medical-operations/lab-test-type-range/lab-test-type-range.component';
import { LabTestPaymentComponent } from './pages/payments/lab-test-payment/lab-test-payment.component';
import { RadiologyPaymentComponent } from './pages/payments/radiology-payment/radiology-payment.component';
import { MedicationPaymentComponent } from './pages/payments/medication-payment/medication-payment.component';
import { ProcedurePaymentComponent } from './pages/payments/procedure-payment/procedure-payment.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    PatientRegisterComponent,
    PatientListComponent,
    PatientPaymentComponent,
    RegistrationPaymentComponent,
    ClinicComponent,
    ClinicianComponent,
    MyConsultationComponent,
    DoctorCrackingComponent,
    ListFromReceptionComponent,
    DiagnosisTypeComponent,
    LabTestTypeComponent,
    ProcedureTypeComponent,
    RadiologyTypeComponent,
    InsuranceProviderComponent,
    InsurancePlanComponent,
    RegistrationPlanComponent,
    ConsultationPlanComponent,
    LabTestPlanComponent,
    ProcedurePlanComponent,
    RadiologyPlanComponent,
    MedicinePlanComponent,
    UserProfileComponent,
    RoleComponent,
    AccessManagementComponent,
    MedicineComponent,
    MainPageComponent,
    InvestigationPaymentComponent,
    LabTestComponent,
    LabPatientListComponent,
    LabOutpatientListComponent,
    LabInpatientListComponent,
    LabOutsiderListComponent,
    LabTestTypeRangeComponent,
    LabTestPaymentComponent,
    RadiologyPaymentComponent,
    MedicationPaymentComponent,
    ProcedurePaymentComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgxSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
      RouterModule.forRoot([
    {path : 'patient-register', component : PatientRegisterComponent},
    {path : 'patient-list', component : PatientListComponent},
    {path : 'patient-payment', component : PatientPaymentComponent},
    {path : 'registration-payment', component : RegistrationPaymentComponent},
    {path : 'lab-test-payment', component : LabTestPaymentComponent},
    {path : 'radiology-payment', component : RadiologyPaymentComponent},
    {path : 'medication-payment', component : MedicationPaymentComponent},
    {path : 'procedure-payment', component : ProcedurePaymentComponent},
    {path : 'clinic', component : ClinicComponent},
    {path : 'clinician', component : ClinicianComponent},
    {path : 'my-consultation', component : MyConsultationComponent},
    {path : 'doctor-cracking', component : DoctorCrackingComponent},
    {path : 'list-from-reception', component : ListFromReceptionComponent},
    {path : 'diagnosis-type', component : DiagnosisTypeComponent},
    {path : 'lab-test-type', component : LabTestTypeComponent},
    {path : 'lab-test-type-range', component : LabTestTypeRangeComponent},
    {path : 'procedure-type', component : ProcedureTypeComponent},
    {path : 'radiology-type', component : RadiologyTypeComponent},
    {path : 'insurance-provider', component : InsuranceProviderComponent},
    {path : 'insurance-plan', component : InsurancePlanComponent},
    {path : 'registration-plan', component : RegistrationPlanComponent},
    {path : 'consultation-plan', component : ConsultationPlanComponent},
    {path : 'lab-test-plan', component : LabTestPlanComponent},
    {path : 'procedure-plan', component : ProcedurePlanComponent},
    {path : 'radiology-plan', component : RadiologyPlanComponent},
    {path : 'medicine-plan', component : MedicinePlanComponent},
    {path : 'user-profile', component : UserProfileComponent},
    {path : 'role', component : RoleComponent},
    {path : 'access-management', component : AccessManagementComponent},
    {path : 'medicine', component : MedicineComponent},
    {path : 'lab-test', component : LabTestComponent},
    {path : 'lab-outpatient-list', component : LabOutpatientListComponent},
    {path : 'lab-inpatient-list', component : LabInpatientListComponent},
    {path : 'lab-outsider-list', component : LabOutsiderListComponent},
    ])
  ],
  schemas: [ 
    //CUSTOM_ELEMENTS_SCHEMA
    NO_ERRORS_SCHEMA
   ],
  providers: [
    DatePipe,
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
