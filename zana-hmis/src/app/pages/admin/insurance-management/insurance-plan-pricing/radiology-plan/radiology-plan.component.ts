import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IInsurancePlan } from 'src/app/domain/insurance-plan';
import { IRadiologyTypeInsurancePlan } from 'src/app/domain/radiology-type-insurance-plan';
import { MsgBoxService } from 'src/app/services/msg-box.service';
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

 radiologyTypeInsurancePlans : IRadiologyTypeInsurancePlan[] = []



  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private msgBox : MsgBoxService
  ) { }

  ngOnInit(): void {
    this.loadRadiologyTypeInsurancePlans()
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
        this.msgBox.showErrorMessage('Could not load Providers')
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
        this.msgBox.showErrorMessage('Could not load Plans')
      }
    )
  }

  async loadRadiologyTypeInsurancePlans(){
    this.radiologyTypeInsurancePlans = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IRadiologyTypeInsurancePlan[]>(API_URL+'/radiology_type_insurance_plans', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.radiologyTypeInsurancePlans.push(element)
        })
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage('Could not load Radiology Type Plans')
      }
    )
  }


  public async saveRadiologyTypeInsurancePlan(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var radiologyTypeInsurancePlan = {
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
      await this.http.post<IRadiologyTypeInsurancePlan>(API_URL+'/radiology_type_insurance_plans/save',radiologyTypeInsurancePlan, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          this.msgBox.showSuccessMessage('Radiology Type Plan created successifully')
          this.loadRadiologyTypeInsurancePlans()
          
        }
      )
      .catch(
        error => {
          this.msgBox.showErrorMessage('Could not create Radiology Type Plan')
        }
      )

    }else{
      //update an existingradiologyType
      this.spinner.show()
      await this.http.post<IRadiologyTypeInsurancePlan>(API_URL+'/radiology_type_insurance_plans/save', radiologyTypeInsurancePlan, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          
          this.msgBox.showSuccessMessage('RadiologyType plan updated successifully')
          this.loadRadiologyTypeInsurancePlans()
        }
      )
      .catch(
        error => {
          this.msgBox.showErrorMessage('Could not updateradiologyType plan')
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

  async getRadiologyTypeInsurancePlan(key: string) {
    if(key == ''){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IRadiologyTypeInsurancePlan>(API_URL+'/radiology_type_insurance_plans/get?id='+key, options)
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
        this.msgBox.showErrorMessage('Could not findradiologyType plan')
      }
    )
  }

  async deleteRadiologyTypeInsurancePlan(key: string) {
    if(key == ''){
      return
    }
    if(!window.confirm('Delete this plan? Plan ID: '+key)){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.post<IRadiologyTypeInsurancePlan>(API_URL+'/radiology_type_insurance_plans/delete?id='+key, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data=>{
        console.log(data)
        this.loadRadiologyTypeInsurancePlans()
      }
    )
    .catch(
      error=>{
        console.log(error)        
        this.msgBox.showErrorMessage('Could not deleteradiologyType plan')
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
        this.msgBox.showErrorMessage('Could not load radiology_types')
      }
    )
  }

}
