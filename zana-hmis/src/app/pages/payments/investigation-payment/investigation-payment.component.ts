import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';

const API_URL = environment.apiUrl;
@Component({
  selector: 'app-investigation-payment',
  templateUrl: './investigation-payment.component.html',
  styleUrls: ['./investigation-payment.component.scss']
})
export class InvestigationPaymentComponent implements OnInit {
  searchKeys : string[] = []
  searchKey : string = ''

  id : any
  no : string = ''
  firstName : string = ''
  middleName : string = ''
  lastName : string = ''
  patientType : string = ''
  dateOfBirth! :Date
  gender : string = ''
  paymentType : string = ''
  memberShipNo : string = ''
  phoneNo : string = ''		
	address : string = ''
	email : string = ''
	nationality : string = ''
	nationalId : string = ''	
	passportNo : string = ''
  kinFullName : string = ''
	kinRelationship : string = ''
	kinPhoneNo : string = ''


  patientRecordMode : string = ''
  insurancePlan : string = ''

  registrationFee : number = 0
  registrationFeeStatus = ''
  cardValidationStatus = ''

  registrationBill! : IBill
  
  labTestBills : IBill[] = []
  procedureBills : IBill[] = []
  prescriptionBills : IBill[] = []
  radiologyBills : IBill[] = []

  registrationAmount : number = 0


  total : number = 0

  amountReceived : number = 0

  constructor(
              private auth : AuthService,
              private http : HttpClient,
              private spinner: NgxSpinnerService) 
              { }
  

  ngOnInit(): void {
    this.loadSearchKeys()
  }

  async loadSearchKeys(){//for unpaid registration
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<string[]>(API_URL+'/patients/get_all_search_keys', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.searchKeys = []
        data?.forEach(element => {
          this.searchKeys.push(element)
        })
      },
      error => {
        console.log(error)
        alert('Could not load patients')
      }
    )
  }


  async searchBySearchKey(key : string): Promise<void> {
    
    var searchElement = ''
    this.registrationAmount = 0
    //var val = key
    for (var i = 0; i < this.searchKeys.length; i++) {
      if (this.searchKeys[i] === key) {
        // An item was selected from the list!
        searchElement = key
        break
      }
    }
    if(searchElement.length === 0){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IPatient>(API_URL+'/patients/get_by_search_key?search_key=' + searchElement, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.id = data!['id']
        this.no = data!['no']
        this.firstName = data!['firstName']
        this.middleName = data!['middleName']
        this.lastName = data!['lastName']
        this.dateOfBirth = data!['dateOfBirth']
        this.phoneNo = data!['phoneNo']
        this.address = data!['address']
        this.registrationFeeStatus = data!['registrationFeeStatus']

        this.total = 0
        this.loadRegistrationBill()
        this.loadPrescriptionBills()
        this.loadLabTestBills()
        this.loadProcedureBills()       
        this.loadRadiologyBills()
      }
    )
    .catch(
      error => {
        console.log(error)
        this.clear()
        alert('Could not find patient')
        return
      }
    )
  }

  clear(){
    this.id = null
    this.no = ''
    this.firstName = ''
    this.middleName = ''
    this.lastName = ''
    this.gender = ''
    this.paymentType = ''
    this.memberShipNo = ''
    this.phoneNo = ''
    this.address = ''
    this.email = ''
    this.nationality = ''
    this.nationalId = ''
    this.passportNo = ''
    this.kinFullName = ''
    this.kinRelationship = ''
    this.kinPhoneNo = ''
    this.amountReceived = 0
    this.total = 0
    
  }

  reset(){
    this.searchKey = ''
    this.clear()
  }

  async loadRegistrationBill(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }

    this.spinner.show()
    await this.http.get<IBill>(API_URL+'/bills/get_registration_bill?patient_id='+this.id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.registrationBill = data! 
        if(this.registrationBill != null) {
          this.registrationAmount = this.registrationBill.amount
        }
        this.total = this.total + this.registrationAmount       
      }
    )
    .catch(
      error => {
        console.log(error)
        alert('Could not load registration bill')
      }
    )
  }

  async loadLabTestBills(){
    this.labTestBills = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }

    this.spinner.show()
    await this.http.get<IBill[]>(API_URL+'/bills/get_lab_test_bills?patient_id='+this.id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.labTestBills = data! 
        this.labTestBills.forEach(element => {
          this.total = this.total + element.amount
        })      
      }
    )
    .catch(
      error => {
        console.log(error)
        alert('Could not load lab test bill')
      }
    )
  }

  async loadRadiologyBills(){
    this.radiologyBills = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }

    this.spinner.show()
    await this.http.get<IBill[]>(API_URL+'/bills/get_radiology_bills?patient_id='+this.id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.radiologyBills = data! 
        this.radiologyBills.forEach(element => {
          this.total = this.total + element.amount
        })      
      }
    )
    .catch(
      error => {
        console.log(error)
        alert('Could not load radiology bill')
      }
    )
  }

  async loadPrescriptionBills(){
    this.prescriptionBills = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }

    this.spinner.show()
    await this.http.get<IBill[]>(API_URL+'/bills/get_prescription_bills?patient_id='+this.id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.prescriptionBills = data! 
        this.prescriptionBills.forEach(element => {
          this.total = this.total + element.amount
        })      
      }
    )
    .catch(
      error => {
        console.log(error)
        alert('Could not load prescription bill')
      }
    )
  }

  async loadProcedureBills(){
    this.procedureBills = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }

    this.spinner.show()
    await this.http.get<IBill[]>(API_URL+'/bills/get_procedure_bills?patient_id='+this.id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.procedureBills = data! 
        this.procedureBills.forEach(element => {
          this.total = this.total + element.amount
        })      
      }
    )
    .catch(
      error => {
        console.log(error)
        alert('Could not load procedure bill')
      }
    )
  }

  async confirmBillsPayment(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }

    var bills : IBill[] = []
    /**
     * Add registration bill
     */
    if(this.registrationBill){
      bills.push(this.registrationBill)
    }
    /**
     * Add lab test bills
     */
    this.labTestBills.forEach(element => {
      bills.push(element)
    })
    /**
     * Add procedure bills
     */
     this.procedureBills.forEach(element => {
      bills.push(element)
    })
    /**
     * Add medicine bills
     */
     this.prescriptionBills.forEach(element => {
      bills.push(element)
    })
    /**
     * Add radiology bills
     */
     this.radiologyBills.forEach(element => {
      bills.push(element)
    })

    console.log(bills)

    this.spinner.show()
    await this.http.post<IBill>(API_URL+'/bills/confirm_bills_payment?total_amount='+this.total, bills, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        alert('Payment successiful')
        var temp = this.searchKey
        this.clear()
        this.searchKey = temp
        this.searchBySearchKey(this.searchKey)
        
      }
    )
    .catch(
      error => {
        console.log(error)
        alert('Could not confirm payment')
      }
    )
  }

}

export interface IPatient {
  id : any
  no : string
  firstName : string
  middleName : string
  lastName : string
  dateOfBirth :Date
  gender : string
  patientType : string
  paymentType : string
  memberShipNo : string
  phoneNo : string		
	address : string
	email : string
	nationality : string
	nationalId : string	
	passportNo : string
  kinFullName : string
	kinRelationship : string
	kinPhoneNo : string
  patientRecordMode : string
  paymentMode : string
  insurancePlan : string 

  registrationFee : number
  registrationFeeStatus : string
  cardValidationStatus : string
}

export interface IBill{
  id : any
  qty : number
  amount : number
  description : string
}