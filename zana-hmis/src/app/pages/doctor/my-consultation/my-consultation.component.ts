import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IConsultation } from 'src/app/domain/consultation';
import { MsgBoxService } from 'src/app/services/msg-box.service';
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
    private spinner : NgxSpinnerService,
    private router : Router,
    private msgBox : MsgBoxService) { }

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
        this.msgBox.showErrorMessage('Could not load clinician')
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
        this.msgBox.showErrorMessage(error['error'])
        console.log(error)
      }
    )
  }

  async postConsultation(id : any){
    /**
     * Set a global value consultation id to be accessed accross components
     */
    localStorage.setItem('consultation-id', id)
    this.router.navigate(['doctor-cracking'])    
  }

}
