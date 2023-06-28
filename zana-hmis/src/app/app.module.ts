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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    PatientRegisterComponent,
    PatientListComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
      RouterModule.forRoot([
    {path : 'patient-register', component : PatientRegisterComponent},
    {path : 'patient-list', component : PatientListComponent},
    ])
  ],
  providers: [
    DatePipe,
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
