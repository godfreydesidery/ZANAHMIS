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
  selector: 'app-lab-outpatient-list',
  templateUrl: './lab-outpatient-list.component.html',
  styleUrls: ['./lab-outpatient-list.component.scss']
})
export class LabOutpatientListComponent implements OnInit {

  patients : IPatient[] = []

  constructor(private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private router : Router) { }

  ngOnInit(): void {
    this.loadOutpatientList()
  }

  attend(id : any){
    localStorage.setItem('lab-test-patient-id', id)
    this.router.navigate(['lab-test'])
  }

  async loadOutpatientList(){   
    this.patients = [] 
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IPatient[]>(API_URL+'/patients/get_lab_outpatient_list', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        
        this.patients = data!
        console.log(this.patients)
      }
    )
    .catch(
      error => {
        alert('Could not load patients')
      }
    )
  }

}

export interface IPatient {
  id : any
  no : string
  firstName : string
  middleName : string
  lastName : string
  dateOfBirth :Date
  gender : string
  paymentType : string
  /*memberShipNo : string
  phoneNo : string		
	address : string
	email : string
	nationality : string
	nationalId : string	
	passportNo : string
  kinFullName : string
	kinRelationship : string
	kinPhoneNo : string
  patientRecordMode : string
  paymentMode : string
  insurancePlan : string 

  registrationFee : number
  registrationFeeStatus : string
  cardValidationStatus : string*/
}
