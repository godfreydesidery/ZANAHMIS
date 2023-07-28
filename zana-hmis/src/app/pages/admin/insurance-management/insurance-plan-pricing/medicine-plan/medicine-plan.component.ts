import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IInsurancePlan } from 'src/app/domain/insurance-plan';
import { IMedicineInsurancePlan } from 'src/app/domain/medicine-insurance-plan';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-medicine-plan',
  templateUrl: './medicine-plan.component.html',
  styleUrls: ['./medicine-plan.component.scss']
})
export class MedicineInsurancePlanComponent implements OnInit {
  id : any = null
  insurancePlan! : IInsurancePlan
  price : number = 0

  insuranceProviderName : string = ''
  insurancePlanName : string = ''

  insuranceProviderNames : string[] = []
  insurancePlanNames : string[] = []

 medicineName : string = ''
 medicineNames : string[] = []

 medicinePlans : IMedicineInsurancePlan[] = []



  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private spinner : NgxSpinnerService,
    private msgBox : MsgBoxService
  ) { }

  ngOnInit(): void {
    this.loadMedicineInsurancePlans()
    this.loadInsuranceProviderNames()
    this.loadMedicineNames()
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

  async loadMedicineInsurancePlans(){
    this.medicinePlans = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IMedicineInsurancePlan[]>(API_URL+'/medicine_insurance_plans', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.medicinePlans.push(element)
        })
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage('Could not load Medicines')
      }
    )
  }


  public async saveMedicineInsurancePlan(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var medicinePlan = {
      id          : this.id,
     medicine : {
        name : this.medicineName
      },
      insurancePlan          : {
        name : this.insurancePlanName
      },
      price        : this.price
    }
    if(this.id == null || this.id == ''){
      //save a new diagnosisType
      this.spinner.show()
      await this.http.post<IMedicineInsurancePlan>(API_URL+'/medicine_insurance_plans/save',medicinePlan, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          this.msgBox.showSuccessMessage('Medicine plan created successifully')
          this.loadMedicineInsurancePlans()
          
        }
      )
      .catch(
        error => {
          this.msgBox.showErrorMessage('Could not createmedicine plan')
        }
      )

    }else{
      //update an existingmedicine
      this.spinner.show()
      await this.http.post<IMedicineInsurancePlan>(API_URL+'/medicine_insurance_plans/save',medicinePlan, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          
          this.msgBox.showSuccessMessage('Medicine plan updated successifully')
          this.loadMedicineInsurancePlans()
        }
      )
      .catch(
        error => {
          this.msgBox.showErrorMessage('Could not updatemedicine plan')
        }
      )
    }
    this.clear()
  }

  clear(){
    this.id = null
    this.medicineName = ''
    this.insuranceProviderName = ''
    this.insurancePlanName = ''
    this.price = 0
  }

  async getMedicineInsurancePlan(key: string) {
    if(key == ''){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IMedicineInsurancePlan>(API_URL+'/medicine_insurance_plans/get?id='+key, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data=>{
        console.log(data)
        this.id                    = data?.id
        this.medicineName            = data!.medicine.name
        this.insuranceProviderName = data!.insurancePlan.insuranceProvider.name
        this.insurancePlanName     = data!.insurancePlan.name
        this.price       = data!.price
      }
    )
    .catch(
      error=>{
        console.log(error)        
        this.msgBox.showErrorMessage('Could not findmedicine plan')
      }
    )
  }

  async deleteMedicineInsurancePlan(key: string) {
    if(key == ''){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.post<IMedicineInsurancePlan>(API_URL+'/medicine_insurance_plans/delete?id='+key, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data=>{
        console.log(data)
        this.loadMedicineInsurancePlans()
      }
    )
    .catch(
      error=>{
        console.log(error)        
        this.msgBox.showErrorMessage('Could not deletemedicine plan')
      }
    )
  }

  async loadMedicineNames(){
    this.medicineNames = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<string[]>(API_URL+'/medicines/get_names', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.medicineNames.push(element)
        })
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage('Could not load medicines')
      }
    )
  }

}

