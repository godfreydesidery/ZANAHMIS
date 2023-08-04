import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IPatient } from 'src/app/domain/patient';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;


@Component({
  selector: 'app-radiology-outpatient-list',
  templateUrl: './radiology-outpatient-list.component.html',
  styleUrls: ['./radiology-outpatient-list.component.scss']
})
export class RadiologyOutpatientListComponent {

  patients : IPatient[] = []
  
  constructor(private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private router : Router,
    private msgBox : MsgBoxService) { }


    ngOnInit(): void {
      this.loadOutpatientList()
    }
  
    attend(id : any){
      localStorage.setItem('radiology-patient-id', id)
      this.router.navigate(['radiology'])
    }
  
    async loadOutpatientList(){   
      this.patients = [] 
      let options = {
        headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
      }
      this.spinner.show()
      await this.http.get<IPatient[]>(API_URL+'/patients/get_radiology_outpatient_list', options)
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
          this.msgBox.showErrorMessage('Could not load patients')
        }
      )
    }  
}
