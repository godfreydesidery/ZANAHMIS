import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';
//import { IClinician } from '../../admin/personnel/clinician/clinician.component';

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
  membershipNo : string
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
  insurancePlan! : IInsurancePlan

  insurancePlanName : string = ''

  registrationFee : number = 0
  registrationFeeStatus = ''
  cardValidationStatus = ''


  searchKeys : string[] = []
  clinicNames : string[] = []
  clinicianNames : string[] = []

  clinicName : string = ''
  clinicianName : string = ''

  consultationFee : number = 0

  insurancePlanNames : string[] = []

  consultations : IConsultation[] = []

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
    this.membershipNo = ''
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
    this.loadInsurancePlanNames()
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
    this.membershipNo = ''
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
    this.insurancePlanName = ''
    this.registrationFee = 0
    this.registrationFeeStatus = ''
    this.cardValidationStatus = ''
    this.clinicName = ''
    this.clinicianName = ''
    this.consultationFee = 0
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
      membershipNo        : this.membershipNo,
      phoneNo             : this.phoneNo,
      address             : this.address,
      email               : this.email,
      nationality         : this.nationality,
      nationalId          : this.nationalId,
      passportNo          : this.passportNo,
      kinFullName         : this.kinFullName,
      kinRelationship     : this.kinRelationship,
      kinPhoneNo          : this.kinPhoneNo,

      insurancePlan   : {
        name : this.insurancePlanName
      }
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
          this.membershipNo = data!['membershipNo']
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
          
          this.insurancePlanName = data!['insurancePlan']?.name

          this.patientRecordMode = ''


          this.loadActiveConsultation(this.id)
        }
      )
      .catch(
        error => {
          alert(error['error'])
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
      no                  : this.no,
      firstName           : this.firstName,
      middleName          : this.middleName,
      lastName            : this.lastName,
      gender              : this.gender,
      patientType         : this.patientType,
      dateOfBirth         : this.dateOfBirth,
      paymentType         : this.paymentType,
      membershipNo        : this.membershipNo,
      phoneNo             : this.phoneNo,
      address             : this.address,
      email               : this.email,
      nationality         : this.nationality,
      nationalId          : this.nationalId,
      passportNo          : this.passportNo,
      kinFullName         : this.kinFullName,
      kinRelationship     : this.kinRelationship,
      kinPhoneNo          : this.kinPhoneNo,
      insurancePlan : {
        name : this.insurancePlanName
      }
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
        this.membershipNo = data!['membershipNo']
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

        this.insurancePlanName = data!['insurancePlan']?.name
        

        this.patientRecordMode = ''
      }
    )
    .catch(
      error => {
        console.log(error)
        alert(error['error'])
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

  search(){
    alert('Success')
  }

  onInput() {
    var val = this.searchKey
    var opts = this.searchKeys
    for (var i = 0; i < opts.length; i++) {
      if (opts[i] === val) {
        // An item was selected from the list!
        // yourCallbackHere()
        alert(opts[i]);
        break;
      }
    }
  }


  async searchBySearchKey(key : string): Promise<void> {
    var searchElement = ''
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
          this.gender = data!['gender']
          this.dateOfBirth =data!['dateOfBirth']
          this.paymentType = data!['paymentType']
          this.patientType = data!['patientType']
          this.membershipNo = data!['membershipNo']
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

          
          this.insurancePlanName = data!['insurancePlan']?.name


          this.loadActiveConsultation(this.id)
      }
    )
    .catch(
      error => {
        console.log(error)
        this.clear()
        alert(error['error'])
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

  async loadConsultationFee(){//for unpaid registration
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.consultationFee = 0
    if(this.clinicName === ''){
      this.consultationFee = 0
      return
    }
    this.spinner.show()
    await this.http.get<number>(API_URL+'/clinics/get_consultation_fee?clinic_name='+this.clinicName, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.consultationFee = data!
      },
      error => {
        console.log(error)
        alert('Could not get consultation fee')
      }
    )
  }

  async loadActiveConsultation(patient_id : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.consultations = []
    
    this.spinner.show()
    await this.http.get<IConsultation[]>(API_URL+'/patients/get_active_consultations?patient_id='+patient_id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.consultations = data!
      },
      error => {
        console.log(error)
        alert('Could not load active consultations')
      }
    )
  }

  async loadClinicianNames(clinicName : string){
    /**
     * Gets a list of class names
     */
    //this.clinicNames = []
    this.clinicianNames = []   
    this.clinicianName = ''
    if(clinicName == ''){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IClinician[]>(API_URL+'/clinicians/get_by_clinic_name?clinic_name='+this.clinicName, options)
    //await this.http.get<IClinician[]>(API_URL+'/clinicians', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.clinicianNames.push(element.name)
        })
      }
    )
    .catch(
      error => {
        alert('Could not load doctors')
      }
    )
  }

  async loadInsurancePlanNames(){
    this.insurancePlanNames = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<string[]>(API_URL+'/insurance_plans/get_names', options)
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
        alert('Could not load insurance Plans')
      }
    )
  }

  async doConsultation(){
    if(!window.confirm('Send the selected patient to doctor?')){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    this.spinner.show()
    await this.http.post<IPatient>(API_URL+'/patients/do_consultation?patient_id='+this.id+'&clinic_name='+this.clinicName+'&clinician_name='+this.clinicianName, null, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        alert('Patient sent to doctor successifuly')
        var temp = this.searchKey
        this.clear()
        this.searchKey = temp
        this.searchBySearchKey(this.searchKey)
      }
    )
    .catch(
      error => {
        alert(error['error'])
      }
    )

  }

  async cancelConsultation(consultationId : any){
    if(!window.confirm('Cancel this consultation?')){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    this.spinner.show()
    await this.http.post<IPatient>(API_URL+'/patients/cancel_consultation?id='+consultationId, null, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        alert('Consultation canceled successifully')
        var temp = this.searchKey
        this.clear()
        this.searchKey = temp
        this.searchBySearchKey(this.searchKey)
      }
    )
    .catch(
      error => {
        alert(error['error'])
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
  membershipNo : string
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
  insurancePlan : IInsurancePlan 

  registrationFee : number
  registrationFeeStatus : string
  cardValidationStatus : string
}

export interface IInsurancePlan{
  code : string
  name : string
}

interface IConsultation{
  id : any
  status : string
  clinic : IClinic
  clinician : IClinician
}


export  interface IClinician{
  id : any
  no : string
  name : string
  type : string
  active : boolean
  clinics : IClinic[]
}

export interface IClinic{
  id       : any
  name     : string
  assigned : boolean
}
