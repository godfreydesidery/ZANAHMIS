import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IInsurancePlan } from 'src/app/domain/insurance-plan';
import { ILabTestType } from 'src/app/domain/lab-test-type';
import { ILabTestTypeInsurancePlan } from 'src/app/domain/lab-test-type-insurance-plan';
import { ILabTestTypePrice } from 'src/app/domain/lab-test-type-price';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-lab-test-type-price',
  templateUrl: './lab-test-type-price.component.html',
  styleUrls: ['./lab-test-type-price.component.scss']
})
export class LabTestTypePriceComponent {

  insurancePlanId : any = null
  insurancePlanName : string = ''

  labTestTypes : ILabTestType[] = []

  labTestTypePrices : ILabTestTypePrice[] = []

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

    this.loadLabTestTypesByInsurance(this.insurancePlanId)
  }

  async loadLabTestTypesByInsurance(insurancePlanId : any){
    this.labTestTypes = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<ILabTestTypePrice[]>(API_URL+'/insurance_plans/get_lab_test_type_prices?insurance_plan_id=' + insurancePlanId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.labTestTypePrices= data!
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )
  }

  async changeLabTestTypeCoverage(insurancePlanId : any, labTestTypeId : any, covered : boolean){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var coverage = {
      labTestType : {
        id : labTestTypeId
      },
      labTestTypeInsurancePlan : {
        insurancePlan : {
          id : insurancePlanId
        },
        covered : covered
      },
    }
    this.spinner.show()
    await this.http.post<ILabTestTypePrice>(API_URL+'/insurance_plans/change_lab_test_type_coverage', coverage, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.labTestTypePrices.forEach(element => {
          if(data!.labTestType.id === element.labTestType.id){
            element.labTestTypeInsurancePlan.covered = data!.labTestTypeInsurancePlan.covered
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

  async updateLabTestTypePriceByInsurance(insurancePlanId : any, labTestTypeId : any, price : number){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var update = {
      labTestType : {
        id : labTestTypeId
      },
      labTestTypeInsurancePlan : {
        insurancePlan : {
          id : insurancePlanId
        }
      },
      price : price
    }
    this.spinner.show()
    await this.http.post<ILabTestTypePrice>(API_URL+'/insurance_plans/update_lab_test_type_price_by_insurance', update, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.labTestTypePrices.forEach(element => {
          if(data!.labTestType.id === element.labTestType.id){
            element.price = data!.price
            element.covered = data!.covered
          }
        })
        this.msgBox.showSuccessMessage('Price updated successifully')
      }
    )
    .catch(
      error => {
        console.log(error)
        this.msgBox.showErrorMessage(error['error'])
      }
    )
  }

}
