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

  constructor(private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private router : Router) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('consultation-id')
    localStorage.removeItem('consultation-id')
    this.loadConsultation(this.id)
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

}

export interface IConsultation{
  id : any
  status : string
  paymentType : string
  patient : IPatient
  insurancePlan : IInsurancePlan
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
