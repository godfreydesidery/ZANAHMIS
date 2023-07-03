import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.scss']
})
export class PatientRegisterComponent implements OnInit {


  id : any
  no : string
  searchKey : string
  firstName : string
  middleName : string
  lastName : string
  patientType : string = ''
  dateOfBirth! :Date
  gender : string
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


  patientRecordMode : string = ''
  insurancePlan : string = ''

  registrationFee : number = 0
  registrationFeeStatus = ''
  cardValidationStatus = ''


  searchKeys : string[] = []
  clinicNames : string[] = []

  constructor(
    //private shortcut : ShortCutHandlerService,
              private auth : AuthService,
              private http : HttpClient,
              private modalService: NgbModal,
              private spinner: NgxSpinnerService
  ) {
    this.id = null
    this.no = ''
    this.searchKey = ''
    this.firstName = ''
    this.middleName = ''
    this.lastName = ''
    this.patientType = ''
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
  }

  ngOnInit(): void {
    this.loadSearchKeys()
    this.loadClinicNames()
  }

  clear(){
    this.id = null
    this.no = ''
    this.searchKey = ''
    this.firstName = ''
    this.middleName = ''
    this.lastName = ''
    this.patientType = ''
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
    this.registrationFeeStatus = ''
  }

  

  newPatientPrompt(){
    this.patientRecordMode = 'new'
    this.id = null
    this.clear()
  }

  existingPatientPrompt(){
    this.patientRecordMode = ''
    this.clear()
  }

  changePaymentType(paymentType : string){
    this.paymentType = paymentType
  }

  searchPatient(regNo : string){
    this.id = 1
  }

  async registerPatient(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var patient = {
      id                  : this.id,
      no                  : this.no,
      searchKey           : "NA",
      firstName           : this.firstName,
      middleName          : this.middleName,
      lastName            : this.lastName,
      gender              : this.gender,
      patientType         : this.patientType,
      dateOfBirth         : this.dateOfBirth,
      paymentType         : this.paymentType,
      memberShipNo        : this.memberShipNo,
      phoneNo             : this.phoneNo,
      address             : this.address,
      email               : this.email,
      nationality         : this.nationality,
      nationalId          : this.nationalId,
      passportNo          : this.passportNo,
      kinFullName         : this.kinFullName,
      kinRelationship     : this.kinRelationship,
      kinPhoneNo          : this.kinPhoneNo,
    }

    if(this.id == null || this.id == ''){
      if(this.no == ''){
        this.no = 'NA'
      }
      /**
       * Save a new record
       */
      this.spinner.show()
      await this.http.post<IPatient>(API_URL+'/patients/register', patient, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          alert('Patient Registered successifully. Please note patients File No')

          this.id = data!['id']
          this.no = data!['no']
          this.firstName = data!['firstName']
          this.middleName = data!['middleName']
          this.lastName = data!['lastName']
          this.gender = data!['gender']
          this.paymentType = data!['paymentType']
          this.patientType = data!['patientType']
          this.memberShipNo = data!['memberShipNo']
          this.phoneNo = data!['phoneNo']
          this.address = data!['address']
          this.email = data!['email']
          this.nationality = data!['nationality']
          this.nationalId = data!['nationalId']
          this.passportNo = data!['passportNo']
          this.kinFullName = data!['kinFullName']
          this.kinRelationship = data!['kinRelationship']
          this.kinPhoneNo = data!['kinPhoneNo']

          this.registrationFeeStatus = data!['registrationFeeStatus']
          this.cardValidationStatus = data!['cardValidationStatus']
          

          this.patientRecordMode = ''
        }
      )
      .catch(
        error => {
          console.log(error)
          alert('Could not register patient')
        }
      )

    }
  }

  async updatePatient(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var patient = {
      id                  : this.id,
      firstName           : this.firstName,
      middleName          : this.middleName,
      lastName            : this.lastName,
      gender              : this.gender,
      patientType         : this.patientType,
      dateOfBirth         : this.dateOfBirth,
      paymentType         : this.paymentType,
      memberShipNo        : this.memberShipNo,
      phoneNo             : this.phoneNo,
      address             : this.address,
      email               : this.email,
      nationality         : this.nationality,
      nationalId          : this.nationalId,
      passportNo          : this.passportNo,
      kinFullName         : this.kinFullName,
      kinRelationship     : this.kinRelationship,
      kinPhoneNo          : this.kinPhoneNo,
    }
    /**
     * Update
     */
    this.spinner.show()
    await this.http.post<IPatient>(API_URL+'/patients/update', patient, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        alert('Patient updated successifully. Please note patients File No')

        this.id = data!['id']
        this.no = data!['no']
        this.firstName = data!['firstName']
        this.middleName = data!['middleName']
        this.lastName = data!['lastName']
        this.gender = data!['gender']
        this.paymentType = data!['paymentType']
        this.patientType = data!['patientType']
        this.memberShipNo = data!['memberShipNo']
        this.phoneNo = data!['phoneNo']
        this.address = data!['address']
        this.email = data!['email']
        this.nationality = data!['nationality']
        this.nationalId = data!['nationalId']
        this.passportNo = data!['passportNo']
        this.kinFullName = data!['kinFullName']
        this.kinRelationship = data!['kinRelationship']
        this.kinPhoneNo = data!['kinPhoneNo']

        this.registrationFeeStatus = data!['registrationFeeStatus']
        this.cardValidationStatus = data!['cardValidationStatus']
        

        this.patientRecordMode = ''
      }
    )
    .catch(
      error => {
        console.log(error)
        alert('Could not update patient record')
      }
    )
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
    if(this.searchKey == ''){
      alert('Please enter key to search')
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IPatient>(API_URL+'/patients/get_by_search_key?search_key=' + key, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.id = data!['id']
          this.no = data!['no']
          this.firstName = data!['firstName']
          this.middleName = data!['middleName']
          this.lastName = data!['lastName']
          this.gender = data!['gender']
          this.dateOfBirth =data!['dateOfBirth']
          this.paymentType = data!['paymentType']
          this.patientType = data!['patientType']
          this.memberShipNo = data!['memberShipNo']
          this.phoneNo = data!['phoneNo']
          this.address = data!['address']
          this.email = data!['email']
          this.nationality = data!['nationality']
          this.nationalId = data!['nationalId']
          this.passportNo = data!['passportNo']
          this.kinFullName = data!['kinFullName']
          this.kinRelationship = data!['kinRelationship']
          this.kinPhoneNo = data!['kinPhoneNo']

          this.registrationFeeStatus = data!['registrationFeeStatus']
          this.cardValidationStatus = data!['cardValidationStatus']
      }
    )
    .catch(
      error => {
        console.log(error)
        this.clear()
        alert('Could not find patient')
      }
    )
  }

  async loadClinicNames(){//for unpaid registration
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<string[]>(API_URL+'/clinics/get_names', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.clinicNames = []
        data?.forEach(element => {
          this.clinicNames.push(element)
        })
      },
      error => {
        console.log(error)
        alert('Could not load clinics')
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