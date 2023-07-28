import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IPatient } from 'src/app/domain/patient';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  patients : IPatient[] = []

  constructor(
    private auth : AuthService,
              private http : HttpClient,
              private modalService: NgbModal,
              private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadPatients()
  }

  async loadPatients(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.patients = []
    this.spinner.show()
    await this.http.get<IPatient[]>(API_URL+'/patients', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(data => {
      data?.forEach(element => {
        console.log(element)
        this.patients.push(element)
      })     
    })
    .catch(error => {
      console.log(error)
      alert('Could not load patients')
    })

  }
}