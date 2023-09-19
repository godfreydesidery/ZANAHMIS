import { Time } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IAdmission } from 'src/app/domain/admission';
import { IClinicalNote } from 'src/app/domain/clinical-note';
import { IConsultation } from 'src/app/domain/consultation';
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
  selector: 'app-nurse-inpatient-chart',
  templateUrl: './nurse-inpatient-chart.component.html',
  styleUrls: ['./nurse-inpatient-chart.component.scss']
})
export class NurseInpatientChartComponent {

  id : any = null

  admission! : IAdmission

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

  async refresh(){
    await this.loadAdmission(this.id)
  }

  async setGlobalPatientId(){
    localStorage.setItem('patient-id', this.admission.patient.id)
    localStorage.setItem('admission-id', this.id)
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

}
