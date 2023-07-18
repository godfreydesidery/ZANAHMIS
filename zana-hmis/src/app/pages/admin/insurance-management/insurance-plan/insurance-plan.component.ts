import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;
@Component({
  selector: 'app-insurance-plan',
  templateUrl: './insurance-plan.component.html',
  styleUrls: ['./insurance-plan.component.scss']
})
export class InsurancePlanComponent implements OnInit {
  id          : any = null
  code        : string = ''
  name        : string = ''
  description : string = ''
  active      : boolean = true

  insuranceProvider! : IInsuranceProvider

  insurancePlans : IInsurancePlan[] = []

  insuranceProviderNames : string[] = []

  insuranceProviderName : string = ''

  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadInsurancePlans()
    this.loadInsuranceProviderNames()
  }

  public async saveInsurancePlan(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var insurancePlan = {
      id          : this.id,
      code          : this.code,
      name        : this.name,
      description : this.description,
      insuranceProvider : { name : this.insuranceProviderName},
      active      : true
    }
    if(this.id == null || this.id == ''){
      //save a new insurancePlan
      this.spinner.show()
      await this.http.post<IInsurancePlan>(API_URL+'/insurance_plans/save', insurancePlan, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          this.code       = data!.code
          this.name = data!.name
          this.description = data!.description
          this.active       = data!.active
          alert('Insurance Plan created successifully')
          this.loadInsurancePlans()
          
        }
      )
      .catch(
        error => {
          alert('Could not create insurance plan')
        }
      )

    }else{
      //update an existing clinic
      this.spinner.show()
      await this.http.post<IInsurancePlan>(API_URL+'/insurance_plans/save', insurancePlan, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          this.code       = data!.code
          this.name = data!.name
          this.description = data!.description
          this.active       = data!.active
          alert('Insurance Plan updated successifully')
          this.loadInsurancePlans()
        }
      )
      .catch(
        error => {
          alert('Could not update insurance plan')
        }
      )
    }
    this.clear()
  }

  async loadInsurancePlans(){
    this.insurancePlans = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IInsurancePlan[]>(API_URL+'/insurance_plans', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.insurancePlans.push(element)
        })
      }
    )
    .catch(
      error => {
        alert('Could not load insurance plans')
      }
    )
  }

  clear(){
    this.id = null
    this.code = ''
    this.name = ''
    this.insuranceProviderName = ''
    this.description = ''
    this.active = false
  }

  async getInsurancePlan(key: string) {
    if(key == ''){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IInsurancePlan>(API_URL+'/insurance_plans/get?id='+key, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data=>{
        this.id           = data?.id
          this.code       = data!.code
          this.name = data!.name
          this.insuranceProviderName = data!.insuranceProvider.name
          this.description = data!.description
          this.active       = data!.active
      }
    )
    .catch(
      error=>{
        console.log(error)        
        alert('Could not find insurance plan')
      }
    )
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

}

export interface IInsurancePlan{
  id     : any
  code   : string
  name        : string
  description : string
  insuranceProvider : IInsuranceProvider
  active : boolean
}

export interface IInsuranceProvider{
  id     : any
  code   : string
  name        : string
  description : string
  phone    : string
  active : boolean
}