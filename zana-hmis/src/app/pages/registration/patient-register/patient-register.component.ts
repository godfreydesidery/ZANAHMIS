import { Time } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IClinician } from 'src/app/domain/clinician';
import { IConsultation } from 'src/app/domain/consultation';
import { IInsurancePlan } from 'src/app/domain/insurance-plan';
import { ILabTest } from 'src/app/domain/lab-test';
import { IPatient } from 'src/app/domain/patient';
import { IProcedure } from 'src/app/domain/procedure';
import { IRadiology } from 'src/app/domain/radiology';
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
  searchKeysToDisplay : string[] = []
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

  lockSearchKey : boolean = false

  nonConsultationId : number = 0

  labTests : ILabTest[] = []
  labTestTypeNames : string[] = []
  labTestTypeName : string = ''
  
  radiologies : IRadiology[] = []
  radiologyTypeNames : string[] = []
  radiologyTypeName : string = ''

  procedures : IProcedure[] = []
  procedureTypeNames : string[] = []
  procedureTypeName : string = ''

  diagnosisTypeName : string = ''
  diagnosisTypeNames : string[] = []


  labTotal : number = 0
  radiologyTotal : number = 0
  procedureTotal : number = 0

  procedureId : any
  procedureNote : string = ''
  procedureType : string = ''
  procedureNeedTheatre : boolean = false
  procedureTheatreName : string = ''
  procedureTime! : Time
  procedureDiagnosis : string = ''
  procedureDate! : Date
  procedureHours : number = 0
  procedureMinutes : number = 0

  theatreName : string = ''
  theatreNames : string[] = []
  
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
    this.loadLabTestTypeNames()
    this.loadRadiologyTypeNames()
    this.loadProcedureTypeNames()
    this.loadDiagnosisTypeNames()
    this.loadTheatreNames()
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
    this.lockSearchKey = false

    this.nonConsultationId = 0

    this.labTests = []
    this.labTestTypeName = ''
    this.procedures = []
    this.procedureTypeName = ''
    this.radiologies = []
    this.radiologyTypeName = ''

    this.labTotal = 0
    this.radiologyTotal = 0
    this.procedureTotal  = 0

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
      type                : this.type,
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


          if(this.type === 'OUTPATIENT'){
            this.loadActiveConsultation(this.id)
          }else if(this.type === 'OUTSIDER'){
            this.loadNonConsultationId(this.id)
          }
          
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

    if(this.type === 'OUTPATIENT'){
      this.loadActiveConsultation(this.id)
    }else if(this.type === 'OUTSIDER'){
      this.loadNonConsultationId(this.id)
    }

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

        this.searchKey = key

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

        this.lockSearchKey = true
      }
    )
    .catch(
      error => {
        console.log(error)
        this.clear()
        this.msgBox.showErrorMessage(error['error'])
      }
    )
    if(this.type === 'OUTPATIENT'){
      await this.loadActiveConsultation(this.id)
    }else if(this.type === 'OUTSIDER'){
      await this.loadNonConsultationId(this.id)
      await this.loadLabTest(0, this.nonConsultationId)
      await this.loadRadiologies(0, this.nonConsultationId)
      await this.loadProcedures(0, this.nonConsultationId)
    }
    await this.getLastVisitDate()   
  }

  async deleteLabTest(labTestId : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.post<boolean>(API_URL+'/patients/delete_lab_test?id='+labTestId, null, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.loadLabTest(0, this.nonConsultationId)
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
        this.loadLabTest(0, this.nonConsultationId)
      }
    )    
  }

  async deleteRadiology(radiologyId : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.post<boolean>(API_URL+'/patients/delete_radiology?id='+radiologyId, null, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.loadRadiologies(0, this.nonConsultationId)
      }
    )
    .catch(
      error => {
        this.loadRadiologies(0, this.nonConsultationId)
        this.msgBox.showErrorMessage(error['error'])
      }
    )
    
  }

  async deleteProcedure(procedureId : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.post<boolean>(API_URL+'/patients/delete_procedure?id='+procedureId, null, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.loadProcedures(0, this.nonConsultationId)
      }
    )
    .catch(
      error => {
        this.loadProcedures(0, this.nonConsultationId)
        this.msgBox.showErrorMessage(error['error'])
      }
    )
    
  }

  async loadRadiologies(consultationId : any, nonConsultationId : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.radiologies = []
    this.radiologyTotal = 0
    this.spinner.show()
    await this.http.get<IRadiology[]>(API_URL+'/patients/load_radiologies?consultation_id='+consultationId+'&non_consultation_id='+nonConsultationId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.radiologyTotal = this.radiologyTotal + element.patientBill.amount
          this.radiologies.push(element)
        })
        console.log(this.radiologies)
        
      }
    )
    .catch(
      (error) => {
        console.log(error['error'])
        this.msgBox.showErrorMessage('Could not load radiologies')
      }
    )
    
  }

  async loadProcedures(consultationId : any, nonConsultationId : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.procedures = []
    this.procedureTotal = 0
    this.spinner.show()
    await this.http.get<IProcedure[]>(API_URL+'/patients/load_procedures?consultation_id='+consultationId+'&non_consultation_id='+nonConsultationId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.procedureTotal = this.procedureTotal + element.patientBill!.amount
          this.procedures.push(element)
        })
        console.log(this.procedures)
        
      }
    )
    .catch(
      (error) => {
        console.log(error['error'])
        this.msgBox.showErrorMessage('Could not load procedures')
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
          this.clinicianNames.push(element.nickname)
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

  async changeType(type : string){
  
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }

    var patient = {
      id : this.id
    }
    
    this.spinner.show()
    await this.http.post(API_URL+'/patients/change_type?type='+type, patient, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {        
        var temp = this.searchKey
        this.clear()
        this.searchKey = temp
        this.searchBySearchKey(this.searchKey) 
        this.msgBox.showSuccessMessage('Status changed: '+type)       
      }
    )
    .catch(
      error => {
        console.log(error)
        this.msgBox.showErrorMessage(error['error'])
      }
    )
  }

  async loadProcedureTypeNames(){
    this.procedureTypeNames = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<string[]>(API_URL+'/procedure_types/get_names', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        data?.forEach(element => {
          this.procedureTypeNames.push(element)
        })
      }
    )
    .catch(
      () => {
        this.msgBox.showErrorMessage('Could not load procedure types names')
      }
    )
  }


  async saveLabTest(){
    if(this.type != 'OUTSIDER'){
      this.msgBox.showErrorMessage('Only allowed for outsiders')
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var labTest  = {
      labTestType : {
        id : null,
        code : '',
        name : this.labTestTypeName,
      },
      diagnosisType : {name : this.diagnosisTypeName}
    }
    this.spinner.show()
    await this.http.post(API_URL+'/patients/save_lab_test?consultation_id='+0+'&non_consultation_id='+this.nonConsultationId, labTest, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      () => {
        this.loadLabTest(0, this.nonConsultationId)
        this.msgBox.showSuccessMessage('Lab Test Saved successifully')
      }
    )
    .catch(
      error => {
        this.loadLabTest(0, this.nonConsultationId)
        this.msgBox.showErrorMessage('Could not save Lab Test')
        console.log(error)
      }
    )
    
  }

  async saveProcedure(){
    if(this.type != 'OUTSIDER'){
      this.msgBox.showErrorMessage('Only allowed for outsiders')
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var procedure  = {
      procedureType : {
        id : null,
        code : '',
        name : this.procedureTypeName
      },
      type      : this.procedureType,
      theatre   : { name : this.theatreName },
      diagnosisType : { name : this.diagnosisTypeName},
      time      : this.procedureTime,
      date      : this.procedureDate,
      hours     : this.procedureHours,
      minutes   : this.procedureMinutes
    }
    this.spinner.show()
    await this.http.post(API_URL+'/patients/save_procedure?consultation_id='+0+'&non_consultation_id='+this.nonConsultationId, procedure, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      () => {
        this.loadProcedures(0, this.nonConsultationId)
        this.msgBox.showSuccessMessage('Procedure Saved successifully')
      }
    )
    .catch(
      error => {
        //this.loadProcedures(0, this.nonConsultationId)
        this.msgBox.showErrorMessage('Could not save Procedure')
        console.log(error)
      }
    )
    
  }

  async loadLabTest(consultationId : any, nonConsultationId : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.labTests = []
    this.labTotal = 0
    this.spinner.show()
    await this.http.get<ILabTest[]>(API_URL+'/patients/load_lab_tests?consultation_id='+consultationId+'&non_consultation_id='+nonConsultationId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.labTotal = this.labTotal + element.patientBill.amount
          this.labTests.push(element)
        })
        console.log(data)
        
      }
    )
    .catch(
      () => {
        this.msgBox.showErrorMessage('Could not load lab tests')
      }
    )   
  }

  async saveRadiology(){
    if(this.type != 'OUTSIDER'){
      this.msgBox.showErrorMessage('Only allowed for outsiders')
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var radiology  = {
      radiologyType : {
        id : null,
        code : '',
        name : this.radiologyTypeName
      },
      diagnosisType : {name : this.diagnosisTypeName}
    }
    this.spinner.show()
    await this.http.post(API_URL+'/patients/save_radiology?consultation_id='+0+'&non_consultation_id='+this.nonConsultationId, radiology, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      () => {
        this.loadRadiology(0, this.nonConsultationId)
        this.msgBox.showSuccessMessage('Radiology Saved successifully')
      }
    )
    .catch(
      error => {
        this.loadRadiology(0, this.nonConsultationId)
        this.msgBox.showErrorMessage('Could not save Radiology')
        console.log(error)
      }
    )
    
  }

  async loadRadiology(consultationId : any, nonConsultationId : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.radiologies = []
    this.radiologyTotal = 0
    this.spinner.show()
    await this.http.get<IRadiology[]>(API_URL+'/patients/load_radiologies?consultation_id='+consultationId+'&non_consultation_id='+nonConsultationId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.radiologyTotal = this.radiologyTotal + element.patientBill.amount
          this.radiologies.push(element)
        })
        console.log(data)
        
      }
    )
    .catch(
      () => {
        this.msgBox.showErrorMessage('Could not load radiologies')
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
        console.log(data)
        data?.forEach(element => {
          this.radiologyTypeNames.push(element)
        })
      }
    )
    .catch(
      () => {
        this.msgBox.showErrorMessage('Could not load radiology types names')
      }
    )
  }

  async loadNonConsultationId(patientId : any){
    if(this.type != 'OUTSIDER'){
      this.nonConsultationId = 0
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.nonConsultationId = 0
    this.spinner.show()
    await this.http.get<number>(API_URL+'/patients/load_non_consultation_id?patient_id='+patientId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.nonConsultationId = data!
      }
        
    )
    .catch(
      (error) => {
        this.msgBox.showErrorMessage(error['error'])
      }
    ) 

  }

  async loadLabTestTypeNames(){
    this.labTestTypeNames = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<string[]>(API_URL+'/lab_test_types/get_names', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        data?.forEach(element => {
          this.labTestTypeNames.push(element)
        })
      }
    )
    .catch(
      () => {
        this.msgBox.showErrorMessage('Could not load lab test types names')
      }
    )
  }

  async loadDiagnosisTypeNames(){
    this.diagnosisTypeNames = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<string[]>(API_URL+'/diagnosis_types/get_names', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        data?.forEach(element => {
          this.diagnosisTypeNames.push(element)
        })
      }
    )
    .catch(
      () => {
        this.msgBox.showErrorMessage('Could not load diagnosis types names')
      }
    )
  }

  clearTests(){
    this.labTestTypeName = ''
    this.diagnosisTypeName = ''
    this.radiologyTypeName = ''
    this.procedureTypeName = ''
  }

  async loadTheatreNames(){
    this.theatreNames = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<string[]>(API_URL+'/theatres/get_names', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        data?.forEach(element => {
          this.theatreNames.push(element)
        })
      }
    )
    .catch(
      () => {
        this.msgBox.showErrorMessage('Could not load theatre names')
      }
    )
  }

  toggleTheatre(){
    if(this.procedureNeedTheatre === false){
      this.procedureNeedTheatre = true
      this.procedureType = 'THEATRE'
    }else{
      this.procedureNeedTheatre =false
      this.procedureTheatreName = ''
      this.procedureDate!
      this.procedureTime!
      this.procedureHours = 0
      this.procedureMinutes = 0
      this.procedureType = 'NON-THEATRE'
    }
  }

  filterSearchKeys(value : string){

    this.searchKeysToDisplay = []
    if(value.length < 4){
      return
    }

    this.searchKeys.forEach(element => {
      var elementToLower = element.toLowerCase()
      var valueToLower = value.toLowerCase()
      if(elementToLower.includes(valueToLower)){
        this.searchKeysToDisplay.push(element)
      }
    })
  }

  public grant(privilege : string[]) : boolean{
    /**Allow user to perform an action if the user has that priviledge */
    var granted : boolean = false
    privilege.forEach(
      element => {
        if(this.auth.checkPrivilege(element)){
          granted = true
        }
      }
    )
    return granted
  }

}

export interface IPaymentType{
  name : string
  insurancePlanName : string
  insuranceMembershipNo : string
}
