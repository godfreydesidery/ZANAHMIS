import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-doctor-cracking',
  templateUrl: './doctor-cracking.component.html',
  styleUrls: ['./doctor-cracking.component.scss']
})
export class DoctorCrackingComponent implements OnInit {

  id : any

  consultation! : IConsultation

  /**
   *  General Examination, suffix gE
   */
  gEId : any
  gEPressure : string = ''
  gETemperature : string = ''
  gEPulseRate : string = ''
  gEWeight : string = ''
  gEHeight : string = ''
  gEBodyMassIndex : string = ''
  gEBodySurfaceArea : string = ''
  gESaturationOxygen : string = ''
  gERespiratoryRate : string = ''
  gEDescription : string = ''
   /**
   *  Clinical Note, suffix cN
   */
  cNid : any
  cNMainComplain : string = ''
  cNPresentIllnessHistory : string = ''
  cNPastMedicalHistory : string = ''
  cNFamilyAndSocialHistory : string = ''
  cNDrugsAndAllergyHistory : string = ''
  cNReviewOfOtherSystem : string = ''
  cNPhysicalExamination : string = ''
  cNManagementPlan : string = ''
  /**
   * Diagnosis type
   */
  diagnosisTypeName : string = ''

  diagnosisDescription : string = ''

  /**
   * Working Diagnosis, prefix wD
   */
  wDId : any
  

  /**
   * Final Diagnosis, prefix fD
   */
    fDId : any
    



  diagnosisTypeNames : string[] = []
  labTestTypeNames : string[] = []

  workingDiagnosises : IWorkingDiagnosis[] = []
  finalDiagnosises : IFinalDiagnosis[] = []

  labTests : ILabTest[] = []

  labTestTypeName : string = ''

  constructor(private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private router : Router) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('consultation-id')
    localStorage.removeItem('consultation-id')
    this.loadConsultation(this.id)
    this.loadClinicalNoteByConsultationId(this.id)
    this.loadGeneralExaminationByConsultationId(this.id)
    this.loadDiagnosisTypeNames()
    this.loadLabTestTypeNames()
    this.loadWorkingDiagnosis(this.id)
    this.loadFinalDiagnosis(this.id)
    this.loadLabTest(this.id, 0)
  }

  async loadConsultation(id : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IConsultation>(API_URL+'/patients/load_consultation?id='+id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.id = data?.id
        this.consultation = data!
        console.log(data)
      }
    )
    .catch(
      error => {
        alert('Could not load consultation')
        console.log(error)
      }
    )
  }

  async loadClinicalNoteByConsultationId(id : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IClinicalNote>(API_URL+'/patients/load_clinical_note_by_consultation_id?id='+id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.cNid = data?.id
        this.cNid 
        this.cNMainComplain = data!.mainComplain
        this.cNPresentIllnessHistory = data!.presentIllnessHistory
        this.cNPastMedicalHistory = data!.pastMedicalHistory
        this.cNFamilyAndSocialHistory = data!.familyAndSocialHistory
        this.cNDrugsAndAllergyHistory = data!.drugsAndAllergyHistory
        this.cNReviewOfOtherSystem = data!.reviewOfOtherSystem
        this.cNPhysicalExamination = data!.physicalExamination
        this.cNManagementPlan = data!.managementPlan
        console.log(data)
      }
    )
    .catch(
      error => {
        alert('Could not load clinical note')
        console.log(error)
      }
    )
  }

  async loadGeneralExaminationByConsultationId(id : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IGeneralExamination>(API_URL+'/patients/load_general_examination_by_consultation_id?id='+id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {

        this.gEId = data?.id
        this.gEPressure = data!.pressure
        this.gETemperature = data!.temperature
        this.gEPulseRate = data!.pulseRate
        this.gEWeight = data!.weight
        this.gEHeight = data!.height
        this.gEBodyMassIndex = data!.bodyMassIndex
        this.gEBodySurfaceArea = data!.bodySurfaceArea
        this.gESaturationOxygen = data!.saturationOxygen
        this.gERespiratoryRate = data!.respiratoryRate
        this.gEDescription = data!.description
        
        console.log(data)
      }
    )
    .catch(
      error => {
        alert('Could not load general examination')
        console.log(error)
      }
    )
  }

  async saveCG(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var cg : ICG = {
      clinicalNote : {
        id : this.cNid,
        mainComplain : this.cNMainComplain,
        presentIllnessHistory : this.cNPresentIllnessHistory,
        pastMedicalHistory : this.cNPastMedicalHistory,
        familyAndSocialHistory : this.cNFamilyAndSocialHistory,
        drugsAndAllergyHistory : this.cNDrugsAndAllergyHistory,
        reviewOfOtherSystem : this.cNReviewOfOtherSystem,
        physicalExamination : this.cNPhysicalExamination,
        managementPlan : this.cNManagementPlan,
        consultation : this.consultation
      },
      generalExamination : {
        id : this.gEId,
        pressure : this.gEPressure,
        temperature : this.gETemperature,
        weight : this.gEWeight,
        pulseRate : this.gEPulseRate,
        height : this.gEHeight,
        bodyMassIndex : this.gEBodyMassIndex,
        bodySurfaceArea : this.gEBodySurfaceArea,
        saturationOxygen : this.gESaturationOxygen,
        respiratoryRate : this.gERespiratoryRate,
        description : this.gEDescription,
        consultation : this.consultation
      }
    }
    this.spinner.show()
    await this.http.post<ICG>(API_URL+'/patients/save_clinical_note_and_general_examination', cg, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.cNid = data?.clinicalNote.id
        this.cNMainComplain = data!.clinicalNote.mainComplain
        this.cNPresentIllnessHistory = data!.clinicalNote.presentIllnessHistory
        this.cNPastMedicalHistory = data!.clinicalNote.pastMedicalHistory
        this.cNFamilyAndSocialHistory = data!.clinicalNote.familyAndSocialHistory
        this.cNDrugsAndAllergyHistory = data!.clinicalNote.drugsAndAllergyHistory
        this.cNReviewOfOtherSystem = data!.clinicalNote.reviewOfOtherSystem
        this.cNPhysicalExamination = data!.clinicalNote.physicalExamination
        this.cNManagementPlan = data!.clinicalNote.managementPlan

        this.gEId = data?.generalExamination.id
        this.gEPressure = data!.generalExamination.pressure
        this.gETemperature = data!.generalExamination.temperature
        this.gEWeight = data!.generalExamination.weight
        this.gEPulseRate = data!.generalExamination.pulseRate
        this.gEHeight = data!.generalExamination.height
        this.gEBodyMassIndex = data!.generalExamination.bodyMassIndex
        this.gEBodySurfaceArea = data!.generalExamination.bodySurfaceArea
        this.gESaturationOxygen = data!.generalExamination.saturationOxygen
        this.gERespiratoryRate = data!.generalExamination.respiratoryRate
        this.gEDescription = data!.generalExamination.description
        
      
        console.log(data)
      }
    )
    .catch(
      error => {
        alert('Could not save')
        console.log(error)
      }
    )
  }

  async saveWorkingDiagnosis(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var diagnosis : any = {
      description : this.diagnosisDescription,
      diagnosisType : {
        id : null,
        code : '',
        name : this.diagnosisTypeName
      },
      consultation : {
        id : this.id
      }
    }
    this.spinner.show()
    await this.http.post<IWorkingDiagnosis>(API_URL+'/patients/save_working_diagnosis?id='+this.id, diagnosis, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        
      }
    )
    .catch(
      error => {
        alert('Could not save')
        console.log(error)
      }
    )
    this.loadWorkingDiagnosis(this.id)
  }

  async saveFinalDiagnosis(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var diagnosis : any = {
      description : this.diagnosisDescription,
      diagnosisType : {
        id : null,
        code : '',
        name : this.diagnosisTypeName
      },
      consultation : {
        id : this.id
      }
    }
    this.spinner.show()
    await this.http.post<IFinalDiagnosis>(API_URL+'/patients/save_final_diagnosis?id='+this.id, diagnosis, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        
      }
    )
    .catch(
      error => {
        alert('Could not save')
        console.log(error)
      }
    )
    this.loadFinalDiagnosis(this.id)
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
      error => {
        alert('Could not load diagnosis types names')
      }
    )
  }

  async loadWorkingDiagnosis(id : string){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.workingDiagnosises = []
    this.spinner.show()
    await this.http.get<IWorkingDiagnosis[]>(API_URL+'/patients/load_working_diagnosis?id='+id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.workingDiagnosises = data!
      }
    )
    .catch(
      error => {
        alert('Could not load working diagnosises')
      }
    )
    
  }

  async loadFinalDiagnosis(id : string){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.finalDiagnosises = []
    this.spinner.show()
    await this.http.get<IFinalDiagnosis[]>(API_URL+'/patients/load_final_diagnosis?id='+id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.finalDiagnosises = data!
      }
    )
    .catch(
      error => {
        alert('Could not load final diagnosises')
      }
    )
    
  }

  async deleteFinalDiagnosis(diagnosisId : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<boolean>(API_URL+'/patients/delete_final_diagnosis?id='+diagnosisId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        
      }
    )
    .catch(
      error => {
        alert('Could not delete')
      }
    )
    this.loadFinalDiagnosis(this.id)
  }

  async deleteWorkingDiagnosis(diagnosisId : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<boolean>(API_URL+'/patients/delete_working_diagnosis?id='+diagnosisId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        
      }
    )
    .catch(
      error => {
        alert('Could not delete')
      }
    )
    this.loadWorkingDiagnosis(this.id)
  }

  clearDiagnosis(){
    this.diagnosisTypeName = ''
    this.diagnosisDescription = ''
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
      error => {
        alert('Could not load lab test types names')
      }
    )
  }

  async saveLabTest(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var labTest : any = {
      labTestType : {
        id : null,
        code : '',
        name : this.labTestTypeName
      }
    }
    this.spinner.show()
    await this.http.post<ILabTest>(API_URL+'/patients/save_lab_test?consultation_id='+this.id+'&non_consultation_id='+0, labTest, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log('test')
        console.log(data)
        console.log('test')
      }
    )
    .catch(
      error => {
        alert('Could not save')
        console.log(error)
      }
    )
    this.loadLabTest(this.id, 0)
  }

  async loadLabTest(consultationId : any, nonConsultationId : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.labTests = []
    this.spinner.show()
    await this.http.get<ILabTest[]>(API_URL+'/patients/load_lab_test?consultation_id='+consultationId+'&non_consultation_id='+nonConsultationId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.labTests = data!
      }
    )
    .catch(
      error => {
        alert('Could not load lab tests')
      }
    )
    
  }

  async deleteLabTest(labTestId : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<boolean>(API_URL+'/patients/delete_lab_test?id='+labTestId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        
      }
    )
    .catch(
      error => {
        alert('Could not delete')
      }
    )
    this.loadLabTest(this.id, 0)
  }

}

export interface IConsultation{
  id : any
  status : string
  paymentType : string
  patient : IPatient
  insurancePlan : IInsurancePlan
}

export interface IBill{
  id : any

  description : string
	qty : number
	amount : number
	paid : number
	balance : number
	status : string
}


export interface IPatient{
  id : any
  no : string
  firstName : string
  middleName : string
  lastName : string
  dateOfBirth : Date
  gender : string
  paymentType : string
  membershipNo : string
} 

export interface IInsurancePlan{
  id : any
  name : string
}

export interface IDiagnosisType{
  id : any
  code : string
  name : string
}

export interface IWorkingDiagnosis{
  id : any
  description : string
  diagnosisType : IDiagnosisType
  consultation : IConsultation
}

export interface IFinalDiagnosis{
  id : any
  description : string
  diagnosisType : IDiagnosisType
  consultation : IConsultation
}

export interface IClinicalNote{
  id : any

  mainComplain : string
	presentIllnessHistory : string
	pastMedicalHistory : string
	familyAndSocialHistory : string
	drugsAndAllergyHistory : string
	reviewOfOtherSystem : string
	physicalExamination : string

  consultation : IConsultation
}

export interface IGeneralExamination{
  id : any
	
	pressure : string
	temperature : string
	pulseRate : string
	weight : string
	height : string
	bodyMassIndex : string
	bodySurfaceArea : string
	saturationOxygen : string
	respiratoryRate : string
	description : string

  consultation : IConsultation
}

export interface IClinicalNote{
  id : any
  mainComplain : string
	presentIllnessHistory : string
	pastMedicalHistory : string
	familyAndSocialHistory : string
	drugsAndAllergyHistory : string
	reviewOfOtherSystem : string
	physicalExamination : string
  managementPlan : string

  consultation : IConsultation
}

export interface ILabTestType{
  id : any
  code : string
	name : string
	description : string
	uom  : string
	price : number
	active : boolean
}

export interface ILabTest{
  id : any
  result : string
  status : string
  labTestType : ILabTestType
  bill : IBill
  consultation : IConsultation
}

export interface IRadiologyType{
  id : any
  code : string
	name : string
	description : string
	uom  : string
	price : number
	active : boolean
}

export interface IRadiology{
  id : any
  result : string
  status : string
  radiologyType : IRadiologyType
  bill : IBill
  consultation : IConsultation
}

export interface IMedicine{
  id : any
  code : string
	name : string
	description : string
	uom  : string
	price : number
	active : boolean
}

export interface IPrescription{
  id : any
  result : string
  status : string
  medicine : IMedicine
  bill : IBill
  consultation : IConsultation
}

export interface IProcedureType{
  id : any
  code : string
	name : string
	description : string
	uom  : string
	price : number
	active : boolean
}

export interface IProcedure{
  id : any
  result : string
  status : string
  procedureType : IProcedureType
  bill : IBill
  consultation : IConsultation
}

export interface ICG{
  clinicalNote : IClinicalNote
  generalExamination : IGeneralExamination
}
