import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-radiology-plan',
  templateUrl: './radiology-plan.component.html',
  styleUrls: ['./radiology-plan.component.scss']
})
export class RadiologyPlanComponent implements OnInit {
  id : any = null
  insurancePlan! : IInsurancePlan
  price : number = 0

  insuranceProviderName : string = ''
  insurancePlanName : string = ''

  insuranceProviderNames : string[] = []
  insurancePlanNames : string[] = []

 radiologyTypeName : string = ''
 radiologyTypeNames : string[] = []

 radiologyTypePlans : IRadiologyTypePlan[] = []



  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadRadiologyTypePlans()
    this.loadInsuranceProviderNames()
    this.loadRadiologyTypeNames()
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

  async loadRadiologyTypePlans(){
    this.radiologyTypePlans = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IRadiologyTypePlan[]>(API_URL+'/radiology_type_plan_prices', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.radiologyTypePlans.push(element)
        })
      }
    )
    .catch(
      error => {
        alert('Could not loadradiologyType plans')
      }
    )
  }


  public async saveRadiologyTypePlan(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var radiologyTypePlan = {
      id          : this.id,
     radiologyType : {
        name : this.radiologyTypeName
      },
      insurancePlan          : {
        name : this.insurancePlanName
      },
      price        : this.price
    }
    if(this.id == null || this.id == ''){
      //save a new diagnosisType
      this.spinner.show()
      await this.http.post<IRadiologyTypePlan>(API_URL+'/radiology_type_plan_prices/save',radiologyTypePlan, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          alert('RadiologyType plan created successifully')
          this.loadRadiologyTypePlans()
          
        }
      )
      .catch(
        error => {
          alert('Could not createradiologyType plan')
        }
      )

    }else{
      //update an existingradiologyType
      this.spinner.show()
      await this.http.post<IRadiologyTypePlan>(API_URL+'/radiology_type_plan_prices/save',radiologyTypePlan, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          
          alert('RadiologyType plan updated successifully')
          this.loadRadiologyTypePlans()
        }
      )
      .catch(
        error => {
          alert('Could not updateradiologyType plan')
        }
      )
    }
    this.clear()
  }

  clear(){
    this.id = null
    this.radiologyTypeName = ''
    this.insuranceProviderName = ''
    this.insurancePlanName = ''
    this.price = 0
  }

  async getRadiologyTypePlan(key: string) {
    if(key == ''){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IRadiologyTypePlan>(API_URL+'/radiology_type_plan_prices/get?id='+key, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data=>{
        console.log(data)
        this.id                    = data?.id
        this.radiologyTypeName            = data!.radiologyType.name
        this.insuranceProviderName = data!.insurancePlan.insuranceProvider.name
        this.insurancePlanName     = data!.insurancePlan.name
        this.price       = data!.price
      }
    )
    .catch(
      error=>{
        console.log(error)        
        alert('Could not findradiologyType plan')
      }
    )
  }

  async deleteRadiologyTypePlan(key: string) {
    if(key == ''){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.post<IRadiologyTypePlan>(API_URL+'/radiology_type_plan_prices/delete?id='+key, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data=>{
        console.log(data)
        this.loadRadiologyTypePlans()
      }
    )
    .catch(
      error=>{
        console.log(error)        
        alert('Could not deleteradiologyType plan')
      }
    )
  }

  async loadRadiologyTypeNames(){
    this.radiologyTypeNames = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<string[]>(API_URL+'/radiology_types/get_names', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.radiologyTypeNames.push(element)
        })
      }
    )
    .catch(
      error => {
        alert('Could not load radiology_types')
      }
    )
  }

}

export interface IRadiologyTypePlan{
  id : any
 radiologyType : IRadiologyType
  insurancePlan : IInsurancePlan
  price : number 
}

export interface IInsurancePlan{
  name : string
  insuranceProvider : IInsuranceProvider 
}
export interface IInsuranceProvider{
  name : string
}

export interface IRadiologyType{
  name : string
}
