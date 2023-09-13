import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IInsurancePlan } from 'src/app/domain/insurance-plan';
import { IMedicine } from 'src/app/domain/medicine';
import { IMedicineInsurancePlan } from 'src/app/domain/medicine-insurance-plan';
import { IMedicinePrice } from 'src/app/domain/medicine-price';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-medicine-price',
  templateUrl: './medicine-price.component.html',
  styleUrls: ['./medicine-price.component.scss']
})
export class MedicinePriceComponent {

  insurancePlanId : any = null
  insurancePlanName : string = ''

  medicines : IMedicine[] = []

  medicinePrices : IMedicinePrice[] = []

  filterRecords : string = ''

  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private msgBox : MsgBoxService
  ) { }

  ngOnInit(): void {
    this.insurancePlanId = localStorage.getItem('insurance_plan_id')!
    this.insurancePlanName = localStorage.getItem('insurance_plan_name')!
    localStorage.removeItem('insurance_plan_id')
    localStorage.removeItem('insurance_plan_name')

    this.loadMedicinesByInsurance(this.insurancePlanId)
  }

  async loadMedicinesByInsurance(insurancePlanId : any){
    this.medicines = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IMedicinePrice[]>(API_URL+'/insurance_plans/get_medicine_prices?insurance_plan_id=' + insurancePlanId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.medicinePrices= data!
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )
  }

  async changeMedicineCoverage(insurancePlanId : any, medicineId : any, covered : boolean){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var coverage = {
      medicine : {
        id : medicineId
      },
      medicineInsurancePlan : {
        insurancePlan : {
          id : insurancePlanId
        },
        covered : covered
      },
    }
    this.spinner.show()
    await this.http.post<IMedicinePrice>(API_URL+'/insurance_plans/change_medicine_coverage', coverage, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.medicinePrices.forEach(element => {
          if(data!.medicine.id === element.medicine.id){
            element.medicineInsurancePlan.covered = data!.medicineInsurancePlan.covered
          }
        })
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )
  }

  async updateMedicinePriceByInsurance(insurancePlanId : any, medicineId : any, price : number){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var update = {
      medicine : {
        id : medicineId
      },
      medicineInsurancePlan : {
        insurancePlan : {
          id : insurancePlanId
        }
      },
      price : price
    }
    this.spinner.show()
    await this.http.post<IMedicinePrice>(API_URL+'/insurance_plans/update_medicine_price_by_insurance', update, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.medicinePrices.forEach(element => {
          if(data!.medicine.id === element.medicine.id){
            element.price = data!.price
            element.covered = data!.covered
          }
        })
        this.msgBox.showSuccessMessage('Price updated successifully')
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )
  }

}
