import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IPrescription } from 'src/app/domain/prescription';
import { IMedicine } from 'src/app/domain/medicine';
import { IPatient } from 'src/app/domain/patient';
import { IPatientBill } from 'src/app/domain/patient-bill';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;


@Component({
  selector: 'app-patient-pharmacy',
  templateUrl: './patient-pharmacy.component.html',
  styleUrls: ['./patient-pharmacy.component.scss']
})
export class PatientPharmacyComponent {

  id : any

  patient! : IPatient

  prescriptions : IPrescription[] = []

  pharmacyName = localStorage.getItem('selected-pharmacy-name')
  pharmacyId = localStorage.getItem('selected-pharmacy-id')



  constructor(private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private router : Router,
    private msgBox : MsgBoxService) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('pharmacy-patient-id')
    localStorage.removeItem('pharmacy-patient-id')
    this.loadPatient(this.id)
    this.loadPrescriptionsByPatientAndPharmacy(this.id, this.pharmacyId)
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

  async loadPrescriptionsByPatientAndPharmacy(id : any, pharmacyId : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IPrescription[]>(API_URL+'/patients/get_prescriptions_by_patient_id?patient_id='+id+'&pharmacy_id='+pharmacyId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        
        this.prescriptions = data!
        this.prescriptions.forEach(element => {
          element.checked = false
        })
        console.log(this.prescriptions)
      }
    )
    .catch(
      error => {
        this.prescriptions = []
        this.msgBox.showErrorMessage('Could not load prescriptions')
      }
    )
  }

  async acceptPrescription(prescription : IPrescription){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    this.spinner.show()
    await this.http.post<boolean>(API_URL+'/patients/accept_prescription', prescription, options)
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
    this.loadPrescriptionsByPatientAndPharmacy(this.id, this.pharmacyId)
  }

  async rejectPrescription(prescription : IPrescription){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    this.spinner.show()
    await this.http.post<boolean>(API_URL+'/patients/reject_prescription', prescription, options)
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
    this.loadPrescriptionsByPatientAndPharmacy(this.id, this.pharmacyId)
  }

  async holdPrescription(prescription : IPrescription){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    this.spinner.show()
    await this.http.post<boolean>(API_URL+'/patients/hold_prescription', prescription, options)
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
    this.loadPrescriptionsByPatientAndPharmacy(this.id, this.pharmacyId)
  }

  async collectPrescription(prescription : IPrescription){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    this.spinner.show()
    await this.http.post<boolean>(API_URL+'/patients/collect_prescription', prescription, options)
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
    this.loadPrescriptionsByPatientAndPharmacy(this.id, this.pharmacyId)
  }

  async verifyPrescription(prescription : IPrescription){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    this.spinner.show()
    await this.http.post<boolean>(API_URL+'/patients/verify_prescription', prescription, options)
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
    this.loadPrescriptionsByPatientAndPharmacy(this.id, this.pharmacyId)
  }

  async issueMedicine(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }

    var prescriptions : IPrescription[] = []
    this.prescriptions.forEach(prescription => {
      if(prescription.checked === true){
        if(prescription.issued <= 0){
          this.msgBox.showErrorMessage('Invalid value at '+prescription.medicine.name)
          return
        }
        prescriptions.push(prescription)
      }
    })
    this.spinner.show()
    await this.http.post<boolean>(API_URL+'/patients/issue_medicine', prescriptions, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.msgBox.showSuccessMessage('Medicine issued successifully')
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )
    this.loadPrescriptionsByPatientAndPharmacy(this.id, this.pharmacyId)
  }

  clearIssued(id : any){
    this.prescriptions.forEach(element => {
      if(element.id === id){
        element.issued = 0
      }
    })
  }
}