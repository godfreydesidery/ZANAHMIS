import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { MsgBoxService } from 'src/app/services/msg-box.service';
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
  type : string = ''
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

  searchKeys : string[] = []
  clinicNames : string[] = []
  clinicianNames : string[] = []

  clinicName : string = ''
  clinicianName : string = ''

  consultationFee : number = 0

  insurancePlanNames : string[] = []

  consultations : IConsultation[] = []

  lastVisitDate! : Date


  editType : string = ''

  editPaymentType : string = ''
  editInsurancePlanName : string = ''
  editMembershipNo : string = ''


  constructor(
    //private shortcut : ShortCutHandlerService,
              private auth : AuthService,
              private http : HttpClient,
              private modalService: NgbModal,
              private spinner: NgxSpinnerService,
              private msgBox : MsgBoxService
  ) {
    this.id = null
    this.no = ''
    this.searchKey = ''
    this.firstName = ''
    this.middleName = ''
    this.lastName = ''
    this.type = ''
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
    this.type = ''
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
    this.insurancePlanName = ''
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

  clearEditType(){
    this.editType = ''
  }

  changePaymentType(paymentType : string){
    this.paymentType = paymentType
  }

  changeEditPaymentType(paymentType : string){
    this.editPaymentType = paymentType
  }

  clearEditPaymentType(){
    this.editPaymentType = ''
  }

  clearEditInsurancePlanName(){
    this.editInsurancePlanName = ''
  }

  clearEditMembershipNo(){
    this.editMembershipNo = ''
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
      type         : this.type,
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
          //swal.fire()
          this.msgBox.showSuccessMessage('Patient Registered successifully. Please note patients File No')

          this.id = data!['id']
          this.no = data!['no']
          this.firstName = data!['firstName']
          this.middleName = data!['middleName']
          this.lastName = data!['lastName']
          this.gender = data!['gender']
          this.paymentType = data!['paymentType']
          this.type = data!['type']
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

          
          
          this.insurancePlanName = data!['insurancePlan']?.name

          this.patientRecordMode = ''


          this.loadActiveConsultation(this.id)
        }
      )
      .catch(
        error => {
          this.msgBox.showErrorMessage(error['error'])
        }
      )

    }
  }

  async updatePatient() : Promise<boolean>{
    var updated : boolean = false
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
      type         : this.type,
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
        this.msgBox.showSuccessMessage('Patient updated successifully. Please note patients File No')

        this.id = data!['id']
        this.no = data!['no']
        this.firstName = data!['firstName']
        this.middleName = data!['middleName']
        this.lastName = data!['lastName']
        this.gender = data!['gender']
        this.paymentType = data!['paymentType']
        this.type = data!['type']
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

       

        this.insurancePlanName = data!['insurancePlan']?.name
        

        this.patientRecordMode = ''

        updated = true
      }
    )
    .catch(
      error => {
        console.log(error)
        this.msgBox.showErrorMessage(error['error'])
        updated = false
      }
      
    )

    return updated
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
        this.msgBox.showErrorMessage('Could not load patients')
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
        //alert(opts[i]);
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
          this.type = data!['type']
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

          

          
          this.insurancePlanName = data!['insurancePlan']?.name


          this.loadActiveConsultation(this.id)
          this.getLastVisitDate()
      }
    )
    .catch(
      error => {
        console.log(error)
        this.clear()
        this.msgBox.showErrorMessage(error['error'])
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
        this.msgBox.showErrorMessage('Could not load clinics')
      }
    )
  }

  async loadConsultationFee(){//for unpaid registration
    if(this.paymentType === 'INSURANCE'){
      return
    }
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
        this.msgBox.showErrorMessage('Could not get consultation fee')
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
        this.msgBox.showErrorMessage('Could not load active consultations')
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
        this.msgBox.showErrorMessage('Could not load doctors')
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
        this.msgBox.showErrorMessage('Could not load insurance Plans')
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
    var paymentType : IPaymentType = {
      name: this.paymentType,
      insurancePlanName: this.insurancePlanName,
      insuranceMembershipNo: this.membershipNo
    }
    this.spinner.show()
    await this.http.post<IPatient>(API_URL+'/patients/do_consultation?patient_id='+this.id+'&clinic_name='+this.clinicName+'&clinician_name='+this.clinicianName, paymentType, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.msgBox.showSuccessMessage('Patient sent to doctor successifuly')
        var temp = this.searchKey
        this.clear()
        this.searchKey = temp
        this.searchBySearchKey(this.searchKey)
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
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
        this.msgBox.showSuccessMessage('Consultation canceled successifully')
        var temp = this.searchKey
        this.clear()
        this.searchKey = temp
        this.searchBySearchKey(this.searchKey)
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )

  }

  async getLastVisitDate(){
  
    var date : Date 
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    this.spinner.show()
    await this.http.get<Date>(API_URL+'/patients/last_visit_date?patient_id='+this.id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.lastVisitDate = data!
        
      }
    )
    .catch(
      error => {
       console.log(error)
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
  type : string
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
export interface IPaymentType{
  name : string
  insurancePlanName : string
  insuranceMembershipNo : string
}
