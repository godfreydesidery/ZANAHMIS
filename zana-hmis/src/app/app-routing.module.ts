import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { config } from 'process';
import { AuthGuard } from './authGuard';
import { PatientRegisterComponent } from './pages/registration/patient-register/patient-register.component';

const routes: Routes = [
  
];
//const config = {useHash:false,enableTracing:false};
@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
