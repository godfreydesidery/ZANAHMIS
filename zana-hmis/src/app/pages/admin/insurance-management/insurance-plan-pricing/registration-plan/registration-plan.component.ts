import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;
@Component({
  selector: 'app-registration-plan',
  templateUrl: './registration-plan.component.html',
  styleUrls: ['./registration-plan.component.scss']
})
export class RegistrationPlanComponent implements OnInit {

  id : any = null
  insurancePlan! : IInsurancePlan
  registrationFee : number = 0

  insuranceProviderName : string = ''
  insurancePlanName : string = ''

  insuranceProviderNames : string[] = []
  insurancePlanNames : string[] = []

  registrationPlans : IRegistrationPlan[] = []



  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadRegistrationPlans()
    this.loadInsuranceProviderNames()
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

  async loadRegistrationPlans(){
    this.registrationPlans = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IRegistrationPlan[]>(API_URL+'/registration_plan_prices', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.registrationPlans.push(element)
        })
      }
    )
    .catch(
      error => {
        alert('Could not load registration plans')
      }
    )
  }


  public async saveRegistrationPlan(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var registrationPlan = {
      id          : this.id,
      insurancePlan          : {
        name : this.insurancePlanName
      },
      registrationFee        : this.registrationFee
    }
    if(this.id == null || this.id == ''){
      //save a new diagnosisType
      this.spinner.show()
      await this.http.post<IRegistrationPlan>(API_URL+'/registration_plan_prices/save', registrationPlan, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          alert('Registration plan created successifully')
          this.loadRegistrationPlans()
          
        }
      )
      .catch(
        error => {
          alert('Could not create registration plan')
        }
      )

    }else{
      //update an existing clinic
      this.spinner.show()
      await this.http.post<IRegistrationPlan>(API_URL+'/registration_plan_prices/save', registrationPlan, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          
          alert('Registration plan updated successifully')
          this.loadRegistrationPlans()
        }
      )
      .catch(
        error => {
          alert('Could not update registration plan')
        }
      )
    }
    this.clear()
  }

  clear(){
    this.id = null
    this.insuranceProviderName = ''
    this.insurancePlanName = ''
    this.registrationFee = 0
  }

  async getRegistrationPlan(key: string) {
    if(key == ''){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IRegistrationPlan>(API_URL+'/registration_plan_prices/get?id='+key, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data=>{
        console.log(data)
        this.id                    = data?.id
        this.insuranceProviderName = data!.insurancePlan.insuranceProvider.name
        this.insurancePlanName     = data!.insurancePlan.name
        this.registrationFee       = data!.registrationFee
      }
    )
    .catch(
      error=>{
        console.log(error)        
        alert('Could not find registration plan')
      }
    )
  }

  async deleteRegistrationPlan(key: string) {
    if(key == ''){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.post<IRegistrationPlan>(API_URL+'/registration_plan_prices/delete?id='+key, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data=>{
        console.log(data)
        this.loadRegistrationPlans()
      }
    )
    .catch(
      error=>{
        console.log(error)        
        alert('Could not delete registration plan')
      }
    )
  }

}

export interface IRegistrationPlan{
  id : any
  insurancePlan : IInsurancePlan
  registrationFee : number 
  insuranceProvider : IInsuranceProvider
}

export interface IInsurancePlan{
  name : string
  insuranceProvider : IInsuranceProvider 
}
export interface IInsuranceProvider{
  name : string
}
