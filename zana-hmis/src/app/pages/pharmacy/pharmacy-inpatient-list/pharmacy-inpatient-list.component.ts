import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IConsultation } from 'src/app/domain/consultation';
import { IPatient } from 'src/app/domain/patient';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-pharmacy-inpatient-list',
  templateUrl: './pharmacy-inpatient-list.component.html',
  styleUrls: ['./pharmacy-inpatient-list.component.scss']
})
export class PharmacyInpatientListComponent {

  pharmacistId : any

  patients : IPatient[] = []

  pharmacyName = localStorage.getItem('selected-pharmacy-name')

  constructor(private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private router : Router,
    private msgBox : MsgBoxService) { }

  async ngOnInit(): Promise<void> {
    await this.loadPharmacist()
    await this.loadInpatientList()
  }

  async loadPharmacist(){    
    var username = localStorage.getItem('username')!
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<any>(API_URL+'/pharmacists/load_pharmacist_by_username?username='+username, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.pharmacistId = data
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage('Could not load pharmacist')
      }
    )
  }

  async loadInpatientList(){    
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IPatient[]>(API_URL+'/patients/get_pharmacy_inpatient_list', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        data?.forEach(element => {
          this.patients.push(element)
        })
        
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
        console.log(error)
      }
    )
  }

  attend(id : any){
    localStorage.setItem('pharmacy-patient-id', id)
    this.router.navigate(['patient-pharmacy'])
  }
}
