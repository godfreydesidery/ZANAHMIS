import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;
@Component({
  selector: 'app-my-consultation',
  templateUrl: './my-consultation.component.html',
  styleUrls: ['./my-consultation.component.scss']
})
export class MyConsultationComponent implements OnInit {

  clinicianId : any

  consultations : IConsultation[] = []

  constructor(private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService) { }

  async ngOnInit(): Promise<void> {
    await this.loadClinician()
    this.loadListFromReception(this.clinicianId)
  }

  async loadClinician(){    
    var username = localStorage.getItem('username')!
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<any>(API_URL+'/clinicians/load_clinician_by_username?username='+username, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.clinicianId = data
      }
    )
    .catch(
      error => {
        alert('Could not load clinician')
      }
    )
  }

  async loadListFromReception(clinicianIid : any){    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IConsultation[]>(API_URL+'/patients/load_in_process_consultations_by_clinician_id?clinician_id='+clinicianIid, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.consultations = data!
        console.log(data)
      }
    )
    .catch(
      error => {
        alert(error['error'])
        console.log(error)
      }
    )
  }

}

export interface IConsultation{  
  id : any
  paymentType : string
  patient : IPatient
  clinic : IClinic
  clinician : IClinician
}

export interface IPatient{
  id : any
  no : string
  firstName : string
  middleName : string
  lastName : string
}

export interface IClinic{
  id : any
  name : string
}

export interface IClinician{
  id : any
  name : string
}