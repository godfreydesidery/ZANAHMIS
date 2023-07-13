import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;
@Component({
  selector: 'app-consultation-plan',
  templateUrl: './consultation-plan.component.html',
  styleUrls: ['./consultation-plan.component.scss']
})
export class ConsultationPlanComponent implements OnInit {

  id : any = null
  insurancePlan! : IInsurancePlan
  generalConsultationFee : number = 0
  specialistConsultationFee : number = 0

  insuranceProviderName : string = ''
  insurancePlanName : string = ''

  insuranceProviderNames : string[] = []
  insurancePlanNames : string[] = []

  clinicName : string = ''
  clinicNames : string[] = []

  consultationPlans : IConsultationPlan[] = []



  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadConsultationPlans()
    this.loadInsuranceProviderNames()
    this.loadClinicNames()
  }

  async loadInsuranceProviderNames(){
    this.insuranceProviderNames = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<string[]>(API_URL+'/insurance_providers/get_names', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.insuranceProviderNames.push(element)
        })
      }
    )
    .catch(
      error => {
        alert('Could not load Providers')
      }
    )
  }

  async loadInsurancePlanNamesByProviders(providerName : string){
    this.insurancePlanNames = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<string[]>(API_URL+'/insurance_plans/get_names_by_insurance_provider?provider_name='+providerName, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.insurancePlanNames.push(element)
        })
      }
    )
    .catch(
      error => {
        alert('Could not load Plans')
      }
    )
  }

  async loadConsultationPlans(){
    this.consultationPlans = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IConsultationPlan[]>(API_URL+'/consultation_plan_prices', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.consultationPlans.push(element)
        })
      }
    )
    .catch(
      error => {
        alert('Could not load consultation plans')
      }
    )
  }


  public async saveConsultationPlan(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var consultationPlan = {
      id          : this.id,
      clinic : {
        name : this.clinicName
      },
      insurancePlan          : {
        name : this.insurancePlanName
      },
      generalConsultationFee        : this.generalConsultationFee,
      specialistConsultationFee     : this.specialistConsultationFee
    }
    if(this.id == null || this.id == ''){
      //save a new diagnosisType
      this.spinner.show()
      await this.http.post<IConsultationPlan>(API_URL+'/consultation_plan_prices/save', consultationPlan, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          alert('Consultation plan created successifully')
          this.loadConsultationPlans()
          
        }
      )
      .catch(
        error => {
          alert('Could not create consultation plan')
        }
      )

    }else{
      //update an existing clinic
      this.spinner.show()
      await this.http.post<IConsultationPlan>(API_URL+'/consultation_plan_prices/save', consultationPlan, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          
          alert('Consultation plan updated successifully')
          this.loadConsultationPlans()
        }
      )
      .catch(
        error => {
          alert('Could not update consultation plan')
        }
      )
    }
    this.clear()
  }

  clear(){
    this.id = null
    this.clinicName = ''
    this.insuranceProviderName = ''
    this.insurancePlanName = ''
    this.generalConsultationFee = 0
    this.specialistConsultationFee = 0
  }

  async getConsultationPlan(key: string) {
    if(key == ''){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IConsultationPlan>(API_URL+'/consultation_plan_prices/get?id='+key, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data=>{
        console.log(data)
        this.id                    = data?.id
        this.clinicName            = data!.clinic.name
        this.insuranceProviderName = data!.insurancePlan.insuranceProvider.name
        this.insurancePlanName     = data!.insurancePlan.name
        this.generalConsultationFee       = data!.generalConsultationFee
        this.specialistConsultationFee       = data!.specialistConsultationFee
      }
    )
    .catch(
      error=>{
        console.log(error)        
        alert('Could not find consultation plan')
      }
    )
  }

  async deleteConsultationPlan(key: string) {
    if(key == ''){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.post<IConsultationPlan>(API_URL+'/consultation_plan_prices/delete?id='+key, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data=>{
        console.log(data)
        this.loadConsultationPlans()
      }
    )
    .catch(
      error=>{
        console.log(error)        
        alert('Could not delete consultation plan')
      }
    )
  }

  async loadClinicNames(){
    this.clinicNames = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<string[]>(API_URL+'/clinics/get_names', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.clinicNames.push(element)
        })
      }
    )
    .catch(
      error => {
        alert('Could not load clinics')
      }
    )
  }

}

export interface IConsultationPlan{
  id : any
  clinic : IClinic
  insurancePlan : IInsurancePlan
  generalConsultationFee : number 
  specialistConsultationFee : number 
}

export interface IInsurancePlan{
  name : string
  insuranceProvider : IInsuranceProvider 
}
export interface IInsuranceProvider{
  name : string
}

export interface IClinic{
  name : string
}
