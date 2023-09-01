import { Time } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IClinicalNote } from 'src/app/domain/clinical-note';
import { IConsultation } from 'src/app/domain/consultation';
import { IDiagnosisType } from 'src/app/domain/diagnosis-type';
import { IFinalDiagnosis } from 'src/app/domain/final-diagnosis';
import { IGeneralExamination } from 'src/app/domain/general-examination';
import { IInsurancePlan } from 'src/app/domain/insurance-plan';
import { ILabTest } from 'src/app/domain/lab-test';
import { ILabTestType } from 'src/app/domain/lab-test-type';
import { IMedicine } from 'src/app/domain/medicine';
import { IPatient } from 'src/app/domain/patient';
import { IPatientBill } from 'src/app/domain/patient-bill';
import { IPrescription } from 'src/app/domain/prescription';
import { IProcedure } from 'src/app/domain/procedure';
import { IProcedureType } from 'src/app/domain/procedure-type';
import { IRadiology } from 'src/app/domain/radiology';
import { IRadiologyType } from 'src/app/domain/radiology-type';
import { IWorkingDiagnosis } from 'src/app/domain/working-diagnosis';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { Byte } from 'src/custom-packages/util';
import { environment } from 'src/environments/environment';



const API_URL = environment.apiUrl;

@Component({
  selector: 'app-patient-history-menu',
  templateUrl: './patient-history-menu.component.html',
  styleUrls: ['./patient-history-menu.component.scss']
})
export class PatientHistoryMenuComponent {

  constructor(private auth : AuthService,
              private http :HttpClient,
              private spinner : NgxSpinnerService,
              private msgBox : MsgBoxService
              ) { }

  async ngOnInit(): Promise<void> {
      
  }       
}
