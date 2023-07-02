import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    PatientRegisterComponent,
    PatientListComponent,
    PatientPaymentComponent,
    RegistrationPaymentComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
      RouterModule.forRoot([
    {path : 'patient-register', component : PatientRegisterComponent},
    {path : 'patient-list', component : PatientListComponent},
    {path : 'patient-payment', component : PatientPaymentComponent},
    {path : 'registration-payment', component : RegistrationPaymentComponent},
    ])
  ],
  providers: [
    DatePipe,
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
