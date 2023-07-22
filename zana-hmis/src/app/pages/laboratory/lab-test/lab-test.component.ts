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
  selector: 'app-lab-test',
  templateUrl: './lab-test.component.html',
  styleUrls: ['./lab-test.component.scss']
})
export class LabTestComponent implements OnInit {

  id : any


  patient! : IPatient

  labTests : ILabTest[] = []

  rs : number[] = [1,2,3.4,5,6]

  constructor(private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private router : Router) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('lab-test-patient-id')
    localStorage.removeItem('lab-test-patient-id')
    this.loadPatient(this.id)
    this.loadLabTestsByPatient(this.id)
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
        alert('Could not load patient')
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
        alert('Could not load lab tests')
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
        alert('Status changed : ACCEPTED')
      }
    )
    .catch(
      error => {
        alert(error['error'])
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
        alert('Status changed : REJECTED')
      }
    )
    .catch(
      error => {
        alert(error['error'])
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
        alert('Status changed : PENDING')
      }
    )
    .catch(
      error => {
        alert(error['error'])
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
        alert('Status changed : COLLECTED')
      }
    )
    .catch(
      error => {
        alert(error['error'])
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
        alert('Status changed : VERIFIED, Saved successifully')
      }
    )
    .catch(
      error => {
        alert(error['error'])
      }
    )
    this.loadLabTestsByPatient(this.id)
  }
}

export interface ILabTest{
  id : any
  result : string
  range : string
  level : string
  unit : string
  status : string
  labTestType : ILabTestType
  bill : IBill
  consultation : null
  verified : string
}

export interface ILabTestType{
  id : any
  name : string
  labTestTypeRanges : ILabTestTypeRange[]
}

export interface ILabTestTypeRange{
  id : any
  name : string
}

export interface IBill{
  id : any
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
