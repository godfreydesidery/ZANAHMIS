import { Time } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IClinicalNote } from 'src/app/domain/clinical-note';
import { IAdmission } from 'src/app/domain/admission';
import { IDiagnosisType } from 'src/app/domain/diagnosis-type';
import { IFinalDiagnosis } from 'src/app/domain/final-diagnosis';
import { IGeneralExamination } from 'src/app/domain/general-examination';
import { ILabTest } from 'src/app/domain/lab-test';
import { ILabTestType } from 'src/app/domain/lab-test-type';
import { IMedicine } from 'src/app/domain/medicine';
import { IPatient } from 'src/app/domain/patient';
import { IPrescription } from 'src/app/domain/prescription';
import { IProcedure } from 'src/app/domain/procedure';
import { IProcedureType } from 'src/app/domain/procedure-type';
import { IRadiology } from 'src/app/domain/radiology';
import { IRadiologyType } from 'src/app/domain/radiology-type';
import { IWard } from 'src/app/domain/ward';
import { IWardBed } from 'src/app/domain/ward-bed';
import { IWardCategory } from 'src/app/domain/ward-category';
import { IWardType } from 'src/app/domain/ward-type';
import { IWorkingDiagnosis } from 'src/app/domain/working-diagnosis';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { environment } from 'src/environments/environment';



const API_URL = environment.apiUrl;

@Component({
  selector: 'app-doctor-inpatient',
  templateUrl: './doctor-inpatient.component.html',
  styleUrls: ['./doctor-inpatient.component.scss']
})
export class DoctorInpatientComponent implements OnInit {

  id : any = null

  admission! : IAdmission

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
  gEBodyMassIndexComment : string = ''
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
  cNReviewOfOtherSystems : string = ''
  cNPhysicalExamination : string = ''
  cNManagementPlan : string = ''
  /**
   * Diagnosis type
   */

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
  radiologyTypeNames : string[] = []
  procedureTypeNames : string[] = []
  medicineNames : string[] = []

  

  workingDiagnosises : IWorkingDiagnosis[] = []
  finalDiagnosises : IFinalDiagnosis[] = []

  
  
  procedures : IProcedure[] = []
  prescriptions : IPrescription[] = []

  labTests : ILabTest[] = []
  labTestId : any
  labTestDiagnosis : string = ''
  labTestDescription : string = ''
  labTestReport : string = ''

  radiologies : IRadiology[] = []
  radiologyId : any
  radiologyDiagnosis : string = ''
  radiologyDescription : string = ''
  radiologyReport : string = ''


  prescriptionUnit        : number = 0
  prescriptionDosage      : string = ''
  prescriptionFrequency   : string = ''
  prescriptionRoute       : string = ''
  prescriptionDays        : string = ''
  prescriptionPrice       : number = 0
  prescriptionQty         : number = 0

  procedureId : any = null
  procedureNote : string = ''
  procedureType : string = ''
  procedureNeedTheatre : boolean = false
  procedureTheatreName : string = ''
  procedureTime! : Time
  procedureDiagnosis : string = ''
  procedureDate! : Date
  procedureHours : number = 0
  procedureMinutes : number = 0

  procedure! : IProcedure

  theatreName : string = ''
  theatreNames : string[] = []

  wardCategories : IWardCategory[] = []
  wardTypes      : IWardType[] = []
  wards          : IWard[] = []
  wardBeds       : IWardBed[] = []

  wardCategoryName : string = ''
  wardTypeName : string = ''
  wardName : string = ''
  wardBedNo : string = ''
  wardBedId : any = null


  filterRecords : string = '' // this is composite

  constructor(private auth : AuthService,
    private http :HttpClient,
    private spinner : NgxSpinnerService,
    private msgBox : MsgBoxService
    ) { }

  async ngOnInit(): Promise<void> {
    this.id = localStorage.getItem('admission-id')
    localStorage.removeItem('admission-id')
    await this.refresh()    
  }

  async setGlobalPatientId(){
    localStorage.setItem('patient-id', this.admission.patient.id)
    localStorage.setItem('admission-id', this.id)
  }

  async refresh(){
    await this.loadAdmission(this.id)
    //await this.loadClinicalNoteByAdmissionId(this.id)
    //await this.loadGeneralExaminationByAdmissionId(this.id)  
    await this.loadTheatreNames()
    await this.loadWorkingDiagnosis(this.id)
    await this.loadFinalDiagnosis(this.id)
    await this.loadLabTest(0, 0, this.id)
    await this.loadRadiologies(0, 0, this.id)
    await this.loadProcedures(0, 0, this.id)
    await this.loadPrescriptions(0, 0, this.id)  
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

  async loadAdmission(id : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IAdmission>(API_URL+'/patients/load_admission?id='+id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.id = data?.id
        this.admission = data!
        console.log(data)
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage('Could not load admission')
        console.log(error)
      }
    )
  }

  async loadClinicalNoteByAdmissionId(id : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IClinicalNote>(API_URL+'/patients/load_clinical_note_by_admission_id?id='+id, options)
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
        this.cNReviewOfOtherSystems = data!.reviewOfOtherSystems
        this.cNPhysicalExamination = data!.physicalExamination
        this.cNManagementPlan = data!.managementPlan
        console.log(data)
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage('Could not load clinical note')
        console.log(error)
      }
    )
  }

  async loadGeneralExaminationByAdmissionId(id : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IGeneralExamination>(API_URL+'/patients/load_general_examination_by_admission_id?id='+id, options)
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
        this.gEBodyMassIndexComment = data!.bodyMassIndexComment
        this.gEBodySurfaceArea = data!.bodySurfaceArea
        this.gESaturationOxygen = data!.saturationOxygen
        this.gERespiratoryRate = data!.respiratoryRate
        this.gEDescription = data!.description
        
        console.log(data)
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage('Could not load general examination')
        console.log(error)
      }
    )
  }

  async saveCG(){

    return // remove this later

    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    var cg = {
      clinicalNote : {
        id : this.cNid,
        mainComplain : this.cNMainComplain,
        presentIllnessHistory : this.cNPresentIllnessHistory,
        pastMedicalHistory : this.cNPastMedicalHistory,
        familyAndSocialHistory : this.cNFamilyAndSocialHistory,
        drugsAndAllergyHistory : this.cNDrugsAndAllergyHistory,
        reviewOfOtherSystems : this.cNReviewOfOtherSystems,
        physicalExamination : this.cNPhysicalExamination,
        managementPlan : this.cNManagementPlan,
        admission : { id : this.id}
      },
      generalExamination : {
        id : this.gEId,
        pressure : this.gEPressure,
        temperature : this.gETemperature,
        weight : this.gEWeight,
        pulseRate : this.gEPulseRate,
        height : this.gEHeight,
        bodyMassIndex : this.gEBodyMassIndex,
        bodyMassIndexComment : this.gEBodyMassIndexComment,
        bodySurfaceArea : this.gEBodySurfaceArea,
        saturationOxygen : this.gESaturationOxygen,
        respiratoryRate : this.gERespiratoryRate,
        description : this.gEDescription,
        admission : { id : this.id}
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
        this.cNReviewOfOtherSystems = data!.clinicalNote.reviewOfOtherSystems
        this.cNPhysicalExamination = data!.clinicalNote.physicalExamination
        this.cNManagementPlan = data!.clinicalNote.managementPlan

        this.gEId = data?.generalExamination.id
        this.gEPressure = data!.generalExamination.pressure
        this.gETemperature = data!.generalExamination.temperature
        this.gEWeight = data!.generalExamination.weight
        this.gEPulseRate = data!.generalExamination.pulseRate
        this.gEHeight = data!.generalExamination.height
        this.gEBodyMassIndex = data!.generalExamination.bodyMassIndex
        this.gEBodyMassIndexComment = data!.generalExamination.bodyMassIndexComment
        this.gEBodySurfaceArea = data!.generalExamination.bodySurfaceArea
        this.gESaturationOxygen = data!.generalExamination.saturationOxygen
        this.gERespiratoryRate = data!.generalExamination.respiratoryRate
        this.gEDescription = data!.generalExamination.description
        
        this.msgBox.showSuccessMessage('Saved successifully')
      
        console.log(data)
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage('Could not save')
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
        id : this.diagnosisTypeId,
        code : this.diagnosisTypeCode,
        name : this.diagnosisTypeName
      },
      admission : {
        id : this.id
      }
    }
    this.spinner.show()
    await this.http.post<IWorkingDiagnosis>(API_URL+'/patients/save_admission_working_diagnosis?id='+this.id, diagnosis, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      () => {
        this.clearDiagnosis()
        this.msgBox.showSuccessMessage('Working Diagnosis Saved successifully')
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage('Could not save Working Diagnosis')
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
        id : this.diagnosisTypeId,
        code : this.diagnosisTypeCode,
        name : this.diagnosisTypeName
      },
      admission : {
        id : this.id
      }
    }
    this.spinner.show()
    await this.http.post<IFinalDiagnosis>(API_URL+'/patients/save_admission_final_diagnosis?id='+this.id, diagnosis, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      () => {
        this.clearDiagnosis()
        this.msgBox.showSuccessMessage('Saved successifully')
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage('Could not save')
        console.log(error)
      }
    )
    this.loadFinalDiagnosis(this.id)
  }

  async loadWorkingDiagnosis(id : string){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.workingDiagnosises = []
    this.spinner.show()
    await this.http.get<IWorkingDiagnosis[]>(API_URL+'/patients/load_admission_working_diagnosis?id='+id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.workingDiagnosises = data!
      }
    )
    .catch(
      () => {
        this.msgBox.showErrorMessage('Could not load working diagnosises')
      }
    )
    
  }

  async loadFinalDiagnosis(id : string){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.finalDiagnosises = []
    this.spinner.show()
    await this.http.get<IFinalDiagnosis[]>(API_URL+'/patients/load_admission_final_diagnosis?id='+id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.finalDiagnosises = data!
      }
    )
    .catch(
      () => {
        this.msgBox.showErrorMessage('Could not load final diagnosises')
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
      () => {
        this.msgBox.showErrorMessage('Could not delete')
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
      () => {
        this.msgBox.showErrorMessage('Could not delete')
      }
    )
    this.loadWorkingDiagnosis(this.id)
  }

  clearDiagnosis(){
    this.diagnosisTypeId = null
    this.diagnosisTypeCode = ''
    this.diagnosisTypeName = ''
    this.diagnosisDescription = ''
  }

  clearLabTest(){
    this.labTestTypeId = null
    this.labTestTypeCode = ''
    this.labTestTypeName = ''
    
    this.diagnosisTypeId = null
    this.diagnosisTypeCode = ''
    this.diagnosisTypeName = ''
  }

  clearRadiology(){
    this.radiologyTypeId = null
    this.radiologyTypeCode = ''
    this.radiologyTypeName = ''
    this.diagnosisTypeName = ''

    this.diagnosisTypeId = null
    this.diagnosisTypeCode = ''
    this.diagnosisTypeName = ''
  }

  clearProcedure(){
    this.procedureTypeId = null
    this.procedureTypeCode = ''
    this.procedureTypeName = ''
    
    this.diagnosisTypeId = null
    this.diagnosisTypeCode = ''
    this.diagnosisTypeName = ''

    this.procedureNeedTheatre = false
    this.procedureTheatreName = ''
    this.procedureDate!
    this.procedureTime!
    this.procedureHours = 0
    this.procedureMinutes = 0
  }

  clearPrescription(){
    this.medicineId = null
    this.medicineCode = ''
    this.medicineName = ''

    this.prescriptionUnit         = 0
    this.prescriptionDosage       = ''
    this.prescriptionFrequency    = ''
    this.prescriptionRoute        = ''
    this.prescriptionDays         = ''
    this.prescriptionPrice        = 0
    this.prescriptionQty          = 0

  }

  async getMedicineUnit(id : any){
    this.prescriptionUnit = 0
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var medicine = {
      id : id
    }
    this.spinner.show()
    await this.http.post<number>(API_URL+'/medicines/get_available_units', medicine, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.prescriptionUnit = data!
        return data
      }
    )
    .catch(
      () => {
        this.msgBox.showErrorMessage('Could not get units')
        return 0
      }
    )
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

  async saveLabTest(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var labTest  = {
      labTestType : {
        id : this.labTestTypeId,
        code : this.labTestTypeCode,
        name : this.labTestTypeName
      },
      diagnosisType : {
        id : this.diagnosisTypeId,
        code : this.diagnosisTypeCode,
        name : this.diagnosisTypeName
      },   
      description : this.labTestDescription     
    }
    this.spinner.show()
    await this.http.post(API_URL+'/patients/save_lab_test?consultation_id='+0+'&non_consultation_id='+0+'&admission_id='+this.id, labTest, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      () => {
        this.loadLabTest(0, 0, this.id)
        this.clearLabTest()
        this.msgBox.showSuccessMessage('Lab Test Saved successifully')
      }
    )
    .catch(
      error => {
        //this.loadLabTest(0, 0, this.id)
        this.clearLabTest()
        this.msgBox.showErrorMessage(error['error'])
        console.log(error)
      }
    )
  }

  async saveRadiology(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var radiology  = {
      radiologyType : {
        id    : this.radiologyTypeId,
        code  : this.radiologyTypeName,
        name  : this.radiologyTypeName,
      },
      diagnosisType : {
        id    : this.diagnosisTypeId,
        code  : this.diagnosisTypeCode,
        name  : this.diagnosisTypeName},   
      description : this.radiologyDescription       
    }
    this.spinner.show()
    await this.http.post(API_URL+'/patients/save_radiology?consultation_id='+0+'&non_consultation_id='+0+'&admission_id='+this.id, radiology, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      () => {
        this.loadRadiologies(0, 0, this.id)
        this.clearRadiology()
        this.msgBox.showSuccessMessage('Radiology Saved successifully')
      }
    )
    .catch(
      error => {
        this.loadRadiologies(0, 0, this.id)
        this.clearRadiology()
        this.msgBox.showErrorMessage('Could not save Radiology')
        console.log(error)
      }
    )
    
  }

  async addRadiologyReport(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var radiology  = {
      id : this.radiologyId,
      report : this.radiologyReport
    }
    this.spinner.show()
    await this.http.post(API_URL+'/patients/radiologies/add_report', radiology, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      () => {
        this.msgBox.showSuccessMessage('Added successifully')
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
        console.log(error)
      }
    )
    this.loadRadiologies(0, 0, this.id)
  }

  showRadiologyReport(id : any, radiologyTypeName : string, report : string){
    this.radiologyId = id
    this.radiologyTypeName = radiologyTypeName
    this.radiologyReport = report
  }

  async addLabTestReport(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var labTest  = {
      id : this.labTestId,
      report : this.labTestReport
    }
    this.spinner.show()
    await this.http.post(API_URL+'/patients/lab_tests/add_report', labTest, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      () => {
        this.msgBox.showSuccessMessage('Added successifully')
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
        console.log(error)
      }
    )
    this.loadLabTest(0, 0, this.id)
  }

  showLabTestReport(id : any, labTestTypeName : string, report : string){
    this.labTestId = id
    this.labTestTypeName = labTestTypeName
    this.labTestReport = report
  }

  async saveProcedure(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var procedure = {
      procedureType : {
        id    : this.procedureTypeId,
        code  : this.procedureTypeName,
        name  : this.procedureTypeName
      },
      type      : this.procedureType,
      theatre   : { name : this.theatreName },
      diagnosisType : { 
        id   : this.diagnosisTypeId,
        code : this.diagnosisTypeCode,
        name : this.diagnosisTypeName
      },
      time      : this.procedureTime,
      date      : this.procedureDate,
      hours     : this.procedureHours,
      minutes   : this.procedureMinutes
    }
    this.spinner.show()
    await this.http.post<IProcedure>(API_URL+'/patients/save_procedure?consultation_id='+0+'&non_consultation_id='+0+'&admission_id='+this.id, procedure, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      () => {
        this.loadProcedures(0, 0, this.id)
        this.clearProcedure()
        this.msgBox.showSuccessMessage('Procedure Saved successifully')
      }
    )
    .catch(
      error => {
        this.loadProcedures(0, 0, this.id)
        this.clearProcedure()
        this.msgBox.showErrorMessage('Could not save Procedure')
        console.log(error)
      }
    )
  }

  showProcedureNote(id : any, procedureTypeName : string, note : string){
    this.procedureId = id
    this.procedureTypeName = procedureTypeName
    this.procedureNote = note
  }

  async saveProcedureNote(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var procedure  = {
      id : this.procedureId,
      note : this.procedureNote
    }
    this.spinner.show()
    await this.http.post(API_URL+'/patients/procedures/add_note', procedure, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      () => {
        this.msgBox.showSuccessMessage('Added successifully')
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
        console.log(error)
      }
    )
    this.loadProcedures(0, 0, this.id)
  }


  


  async savePrescription(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var prescription = {
      medicine : {
        id : this.medicineId,
        code : this.medicineCode,
        name : this.medicineName
      },
      dosage    : this.prescriptionDosage,
      frequency : this.prescriptionFrequency,
      route     : this.prescriptionRoute,
      days      : this.prescriptionDays,
      price     : this.prescriptionPrice,
      qty       : this.prescriptionQty
    }
    if( prescription.medicine.name === '' || 
        prescription.dosage === '' || 
        prescription.frequency === '' || 
        prescription.route === '' || 
        prescription.days === ''){
      this.msgBox.showErrorMessage('Can not save, please fill in all the required fields')
      return
    }
    this.spinner.show()
    await this.http.post<IPrescription>(API_URL+'/patients/save_prescription?consultation_id='+0+'&non_consultation_id='+0+'&admission_id='+this.id, prescription, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      () => {
        this.loadPrescriptions(0, 0, this.id)
        this.clearPrescription()
        this.msgBox.showSuccessMessage('Prescription Saved successifully')
      }
    )
    .catch(
      error => {
        this.loadPrescriptions(0, 0, this.id)
        this.clearPrescription()
        this.msgBox.showErrorMessage(error['error'])
        console.log(error)
      }
    )
    
  }

  async loadLabTest(consultationId : any, nonConsultationId : any, admissionId : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.labTests = []
    this.spinner.show()
    await this.http.get<ILabTest[]>(API_URL+'/patients/load_lab_tests?consultation_id='+consultationId+'&non_consultation_id='+nonConsultationId+'&admission_id='+admissionId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
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

  async loadRadiologies(consultationId : any, nonConsultationId : any, admissionId : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.radiologies = []
    this.spinner.show()
    await this.http.get<IRadiology[]>(API_URL+'/patients/load_radiologies?consultation_id='+consultationId+'&non_consultation_id='+nonConsultationId+'&admission_id='+admissionId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.radiologies.push(element)
        })
        console.log(this.radiologies)
        
      }
    )
    .catch(
      (error) => {
        console.log(error['error'])
        this.msgBox.showErrorMessage(error['error'])
      }
    )
    
  }

  async loadProcedures(consultationId : any, nonConsultationId : any, admissionId : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.procedures = []
    this.spinner.show()
    await this.http.get<IProcedure[]>(API_URL+'/patients/load_procedures?consultation_id='+consultationId+'&non_consultation_id='+nonConsultationId+'&admission_id='+admissionId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.procedures = data!
      }
    )
    .catch(
      () => {
        this.msgBox.showErrorMessage('Could not load procedures')
      }
    )
    
  }

  async loadPrescriptions(consultationId : any, nonConsultationId : any, admissionId : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.prescriptions = []
    this.spinner.show()
    await this.http.get<IPrescription[]>(API_URL+'/patients/load_prescriptions?consultation_id='+consultationId+'&non_consultation_id='+nonConsultationId+'&admission_id='+admissionId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.prescriptions = data!
      }
    )
    .catch(
      () => {
        this.msgBox.showErrorMessage('Could not load prescriptions')
      }
    )
    
  }

  async deleteLabTest(labTestId : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.post<boolean>(API_URL+'/patients/delete_lab_test?id='+labTestId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.loadLabTest(0, 0, this.id)
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
        this.loadLabTest(0, 0, this.id)

      }
    )
    
  }

  async deleteRadiology(radiologyId : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.post<boolean>(API_URL+'/patients/delete_radiology?id='+radiologyId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )
    this.loadRadiologies(0, 0, this.id)
  }

  async deleteProcedure(procedureId : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.post<boolean>(API_URL+'/patients/delete_procedure?id='+procedureId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )
    this.loadProcedures(0, 0, this.id)
  }

  async deletePrescription(prescriptionId : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.post<boolean>(API_URL+'/patients/delete_prescription?id='+prescriptionId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )
    this.loadPrescriptions(0, 0, this.id)
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
  
  diagnosisTypeId : any =  null
  diagnosisTypeCode : string = ''
  diagnosisTypeName : string = ''
  diagnosisTypes : IDiagnosisType[] = []
  async loadDiagnosisTypesLike(value : string){
    this.diagnosisTypes = []
    if(value.length < 3){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    await this.http.get<IDiagnosisType[]>(API_URL+'/diagnosis_types/load_diagnosis_types_like?name_like='+value, options)
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.diagnosisTypes = data!
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )
  }
  async getDiagnosisType(id : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.diagnosisTypes = []
    this.spinner.show()
    await this.http.get<IProcedureType>(API_URL+'/diagnosis_types/get?id='+id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      (data) => {
        this.diagnosisTypeId = data?.id
        this.diagnosisTypeCode = data!.code
        this.diagnosisTypeName = data!.name
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
        console.log(error)
      }
    )
  }

  labTestTypeId : any =  null
  labTestTypeCode : string = ''
  labTestTypeName : string = ''
  labTestTypes : ILabTestType[] = []
  async loadLabTestTypesLike(value : string){
    if(value.length < 3){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.labTestTypes = []
    await this.http.get<ILabTestType[]>(API_URL+'/lab_test_types/load_lab_test_types_like?name_like='+value, options)
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.labTestTypes = data!
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )
  }
  async getLabTestType(id : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.labTestTypes = []
    this.spinner.show()
    await this.http.get<ILabTestType>(API_URL+'/lab_test_types/get?id='+id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      (data) => {
        this.labTestTypeId    = data?.id
        this.labTestTypeCode  = data!.code
        this.labTestTypeName  = data!.name
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
        console.log(error)
      }
    )
  }


  radiologyTypeId : any =  null
  radiologyTypeCode : string = ''
  radiologyTypeName : string = ''
  radiologyTypes : IRadiologyType[] = []
  async loadRadiologyTypesLike(value : string){
    if(value.length < 3){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.radiologyTypes = []
    await this.http.get<IRadiologyType[]>(API_URL+'/radiology_types/load_radiology_types_like?name_like='+value, options)
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.radiologyTypes = data!
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )
  }
  async getRadiologyType(id : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.radiologyTypes = []
    this.spinner.show()
    await this.http.get<IProcedureType>(API_URL+'/radiology_types/get?id='+id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      (data) => {
        this.radiologyTypeId = data?.id
        this.radiologyTypeCode = data!.code
        this.radiologyTypeName = data!.name
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
        console.log(error)
      }
    )
  }

  procedureTypeId : any =  null
  procedureTypeCode : string = ''
  procedureTypeName : string = ''
  procedureTypes : IProcedureType[] = []
  async loadProcedureTypesLike(value : string){
    this.procedureTypes = []
    if(value.length < 3){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    await this.http.get<IProcedureType[]>(API_URL+'/procedure_types/load_procedure_types_like?name_like='+value, options)
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.procedureTypes = data!
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )
  }
  async getProcedureType(id : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.procedureTypes = []
    this.spinner.show()
    await this.http.get<IProcedureType>(API_URL+'/procedure_types/get?id='+id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      (data) => {
        this.procedureTypeId = data?.id
        this.procedureTypeCode = data!.code
        this.procedureTypeName = data!.name
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
        console.log(error)
      }
    )
  }

  medicineId : any =  null
  medicineCode : string = ''
  medicineName : string = ''
  medicines : IMedicine[] = []
  async loadMedicinesLike(value : string){
    this.medicines = []
    if(value.length < 3){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    await this.http.get<IMedicine[]>(API_URL+'/medicines/load_medicines_like?name_like='+value, options)
    .toPromise()
    .then(
      data => {
        console.log(data)
        //data?.forEach(element => {
          //this.medicines.push(element)
        //})
        this.medicines = data!
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )
  }

  async getMedicine(id : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.medicines = []
    this.spinner.show()
    await this.http.get<IMedicine>(API_URL+'/medicines/get?id='+id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      async (data) => {
        this.medicineId = data?.id
        this.medicineCode = data!.code
        this.medicineName = data!.name

        await this.getMedicineUnit(this.medicineId)
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
        console.log(error)
      }
    )
  }



  async loadWardCategories(){
    this.wardCategories = []
    this.wardCategoryName = ''
    this.wards = []
    this.wardName = ''
    this.wardBeds = []
    this.wardBedNo = ''
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IWardCategory[]>(API_URL+'/ward_categories', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.wardCategories.push(element)
        })
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage('Could not load ward categories')
      }
    )
  }

  async loadWardTypes(){
    this.wardTypes = []
    this.wardTypeName = ''
    this.wards = []
    this.wardName = ''
    this.wardBeds = []
    this.wardBedNo = ''
    
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IWardType[]>(API_URL+'/ward_types', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.wardTypes.push(element)
        })
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage('Could not load ward types')
      }
    )
  }

  async loadWardsByWardCategoryAndWardType(){
    this.wards = []
    this.wardBeds = []
    this.wardName = ''
    this.wardBedNo = ''

    if(this.wardCategoryName === '' || this.wardTypeName === ''){
      return
    }

    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }

    var categoryId : any = null
    this.wardCategories.forEach(element => {
      if(element.name === this.wardCategoryName){
        categoryId = element.id
      }
    })
    var typeId : any = null
    this.wardTypes.forEach(element => {
      if(element.name === this.wardTypeName){
        typeId = element.id
      }
    })

    this.spinner.show()
    await this.http.get<IWard[]>(API_URL+'/wards/get_wards_by_category_and_type?category_id='+categoryId+'&type_id='+typeId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.wards = data!
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage('Could not load wards')
      }
    )
  }

  async loadAvailableWardBedsByWard(){
    this.wardBeds = []
    this.wardBedNo = ''
    if(this.wardName === ''){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }

    var wardId : any = null
    this.wards.forEach(element => {
      if(element.name === this.wardName){
        wardId = element.id
      }
    })
    
    this.spinner.show()
    await this.http.get<IWardBed[]>(API_URL+'/wards/get_available_beds_by_ward?ward_id='+wardId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data!.forEach(element => {
          element.selected = false
          this.wardBeds.push(element)
        })
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage('Could not load Beds/Rooms')
      }
    )
  }

  async selectWardBed(no : string){
    this.wardBeds.forEach(element => {
      if(element.no === no){
        this.wardBedId = element.id
        this.wardBedNo = no
        element.selected = true
      }else{
        element.selected = false
      }
    })
  }

  cancelBed(){
    this.wardBedNo = ''
    this.wardBeds.forEach(element => {
      element.selected = false
    })
  }


  async admitPatient(){

    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }

    var adm = {
      patient : {
        id : this.admission.patient.id
      },
      wardBed: {
        id : this.wardBedId,
        no : this.wardBedNo
      }
    }

    this.spinner.show()
    await this.http.post<IAdmission[]>(API_URL+'/patients/do_admission', adm, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.msgBox.showSuccessMessage('Success')
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )
  }


}



export interface ICG{
  clinicalNote : IClinicalNote
  generalExamination : IGeneralExamination
}

export interface IAdm {
  patient : IPatient
  wardBed : IWardBed
}