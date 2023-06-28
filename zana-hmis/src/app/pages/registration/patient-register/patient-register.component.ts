import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.scss']
})
export class PatientRegisterComponent implements OnInit {

  id : any
  no : string
  firstName : string
  secondName : string
  lastName : string

  patientRecordMode : string = ''
  paymentMode : string = ''

  constructor() {
    this.id = null
    this.no = ''
    this.firstName = ''
    this.secondName = ''
    this.lastName = ''
  }

  ngOnInit(): void {
  }

  clear(){
    this.id = null
    this.no = ''
    this.firstName = ''
    this.secondName = ''
    this.lastName = ''
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

  changePaymentMode(mode : string){
    this.paymentMode = mode
  }

  searchPatient(regNo : string){
    this.id = 1
  }

  registerPatient(){
    this.id = 1
    this.patientRecordMode = ''
  }

}
