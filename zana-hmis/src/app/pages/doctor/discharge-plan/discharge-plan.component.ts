import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth.service';
import { AgePipe } from 'src/app/pipes/age.pipe';
import { ShowDateTimePipe } from 'src/app/pipes/date_time.pipe';
import { SearchFilterPipe } from 'src/app/pipes/search-filter-pipe';
import { ShowTimePipe } from 'src/app/pipes/show_time.pipe';
import { ShowUserPipe } from 'src/app/pipes/show_user.pipe';
import { MsgBoxService } from 'src/app/services/msg-box.service';

import { Time } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { finalize } from 'rxjs';
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
import { environment } from 'src/environments/environment';
import { IDischargePlan } from 'src/app/domain/discharge-plan';



const API_URL = environment.apiUrl;


@Component({
  selector: 'app-discharge-plan',
  templateUrl: './discharge-plan.component.html',
  styleUrls: ['./discharge-plan.component.scss'],
  standalone : true,
  imports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchFilterPipe,
    AgePipe,
    ShowTimePipe,
    ShowUserPipe,
    ShowDateTimePipe,
    RouterLink
  ],
})
export class DischargePlanComponent {

  id : any = null

  history : string = ''
  investigation : string = ''
  management : string = ''
  operationNote : string = ''
  icuAdmissionNote : string = ''
  generalRecommendation : string = ''


  admissionId : any = null

  admission! : IAdmission

  dischargePlan! : IDischargePlan


  constructor(private auth : AuthService,
    private http :HttpClient,
    private spinner : NgxSpinnerService,
    private msgBox : MsgBoxService
    ) { }

  async ngOnInit(): Promise<void> {
    this.admissionId = localStorage.getItem('admission-id')
    localStorage.removeItem('admission-id')
    await this.loadAdmission(this.admissionId) 
    await this.loadDischargePlan(this.admission.id)

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

  async loadDischargePlan(admissionId : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IDischargePlan>(API_URL+'/patients/load_discharge_plan?admission_id='+admissionId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.dischargePlan = data!
        this.id = data!.id
        this.history = data!.history
        this.investigation = data!.investigation
        this.management = data!.management
        this.operationNote = data!.operationNote
        this.icuAdmissionNote = data!.icuAdmissionNote
        this.generalRecommendation = data!.generalRecommendation
        console.log(data)
      }
    )
    .catch(
      error => {
        //this.msgBox.showErrorMessage('Could not load admission')
        console.log(error)
      }
    )
  }

  async saveDischargePlan(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    if(this.history === '' || this.investigation === '' || this.management === ''){
      this.msgBox.showErrorMessage('The fields marked with * are required fields')
      return
    }

    if(this.id === null){
      if(!window.confirm('Confirm submitting discharge plan. Confirm?')){
        this.id = null
        this.history = ''
        this.investigation = ''
        this.management = ''
        this.operationNote = ''
        this.icuAdmissionNote = ''
        this.generalRecommendation = ''
        return
      }
    }
    
    var plan = {
      history: this.history,
      investigation: this.investigation,
      management: this.management,
      operationNote: this.operationNote,
      icuAdmissionNote: this.icuAdmissionNote,
      generalRecommendation: this.generalRecommendation,
      admission: {id : this.admissionId}
    }
    this.spinner.show()
    await this.http.post<IDischargePlan>(API_URL+'/patients/save_discharge_plan', plan, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      (data) => {
        this.dischargePlan = data!
        this.id = data!.id
        this.history = data!.history
        this.investigation = data!.investigation
        this.management = data!.management
        this.operationNote = data!.operationNote
        this.icuAdmissionNote = data!.icuAdmissionNote
        this.generalRecommendation = data!.generalRecommendation

        this.msgBox.showSuccessMessage('Saved successifully')
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage('Could not save')
        console.log(error)
      }
    )
  }
}
