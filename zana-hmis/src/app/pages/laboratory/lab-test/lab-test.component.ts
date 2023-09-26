import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { ILabTest } from 'src/app/domain/lab-test';
import { IPatient } from 'src/app/domain/patient';
import { AgePipe } from 'src/app/pipes/age.pipe';
import { SearchFilterPipe } from 'src/app/pipes/search-filter-pipe';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;


@Component({
  selector: 'app-lab-test',
  templateUrl: './lab-test.component.html',
  styleUrls: ['./lab-test.component.scss'],
  standalone : true,
  imports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchFilterPipe,
    AgePipe
  ],
})
export class LabTestComponent implements OnInit {

  id : any


  patient! : IPatient

  labTests : ILabTest[] = []

  rs : number[] = [1,2,3.4,5,6]

  filterRecords : string = ''

  constructor(private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private router : Router,
    private msgBox : MsgBoxService) { }

  async ngOnInit(): Promise<void> {
    this.id = localStorage.getItem('lab-test-patient-id')
    localStorage.removeItem('lab-test-patient-id')
    await this.loadPatient(this.id)
    await this.loadLabTestsByPatient(this.id)
  }

  async loadPatient(id : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IPatient>(API_URL+'/patients/get?id='+id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.id = data?.id
        this.patient = data!
        console.log(data)
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage('Could not load patient')
        console.log(error)
      }
    )
  }

  async loadLabTestsByPatient(id : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<ILabTest[]>(API_URL+'/patients/get_lab_tests_by_patient_id?id='+id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        
        this.labTests = data!
        console.log(this.labTests)
      }
    )
    .catch(
      error => {
        this.labTests = []
        this.msgBox.showErrorMessage('Could not load lab tests')
      }
    )
  }

  async acceptLabTest(labTest : ILabTest){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var test  = {
      id : labTest.id,
      result : labTest.result,
      range : labTest.range,
      level : labTest.level,
      unit : labTest.unit
    }
    this.spinner.show()
    await this.http.post<boolean>(API_URL+'/patients/accept_lab_test', test, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.msgBox.showSuccessMessage('Status changed : ACCEPTED')
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )
    this.loadLabTestsByPatient(this.id)
  }

  async rejectLabTest(labTest : ILabTest){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var test  = {
      id : labTest.id,
      result : labTest.result,
      range : labTest.range,
      level : labTest.level,
      unit : labTest.unit
    }
    this.spinner.show()
    await this.http.post<boolean>(API_URL+'/patients/reject_lab_test', test, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.msgBox.showSuccessMessage('Status changed : REJECTED')
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )
    this.loadLabTestsByPatient(this.id)
  }

  async holdLabTest(labTest : ILabTest){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var test  = {
      id : labTest.id,
      result : labTest.result,
      range : labTest.range,
      level : labTest.level,
      unit : labTest.unit
    }
    this.spinner.show()
    await this.http.post<boolean>(API_URL+'/patients/hold_lab_test', test, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.msgBox.showSuccessMessage('Status changed : PENDING')
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )
    this.loadLabTestsByPatient(this.id)
  }

  async collectLabTest(labTest : ILabTest){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var test  = {
      id : labTest.id,
      result : labTest.result,
      range : labTest.range,
      level : labTest.level,
      unit : labTest.unit
    }
    this.spinner.show()
    await this.http.post<boolean>(API_URL+'/patients/collect_lab_test', test, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.msgBox.showSuccessMessage('Status changed : COLLECTED')
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )
    this.loadLabTestsByPatient(this.id)
  }

  async verifyLabTest(labTest : ILabTest){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var test  = {
      id : labTest.id,
      result : labTest.result,
      range : labTest.range,
      level : labTest.level,
      unit : labTest.unit
    }
    this.spinner.show()
    await this.http.post<boolean>(API_URL+'/patients/verify_lab_test', test, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.msgBox.showSuccessMessage('Status changed : VERIFIED, Saved successifully')
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )
    this.loadLabTestsByPatient(this.id)
  }

  async saveReasonForRejection(id : any, reason : string){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var test  = {
      id          : id,
      rejectComment : reason
    }
    this.spinner.show()
    await this.http.post<boolean>(API_URL+'/patients/lab_tests/save_reason_for_rejection', test, options)
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






