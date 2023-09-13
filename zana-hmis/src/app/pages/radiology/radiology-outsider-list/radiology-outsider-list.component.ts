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
  selector: 'app-radiology-outsider-list',
  templateUrl: './radiology-outsider-list.component.html',
  styleUrls: ['./radiology-outsider-list.component.scss']
})
export class RadiologyOutsiderListComponent {

  patients : IPatient[] = []

  filterRecords : string = ''
  
  constructor(private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private router : Router,
    private msgBox : MsgBoxService) { }


    ngOnInit(): void {
      this.loadOutsiderList()
    }
  
    attend(id : any){
      localStorage.setItem('radiology-patient-id', id)
      this.router.navigate(['radiology'])
    }
  
    async loadOutsiderList(){   
      this.patients = [] 
      let options = {
        headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
      }
      this.spinner.show()
      await this.http.get<IPatient[]>(API_URL+'/patients/get_radiology_outsider_list', options)
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

    public grant(privilege : string[]) : boolean{
      /**Allow user to perform an action if the user has that priviledge */
      var granted : boolean = false
      privilege.forEach(
        element => {
          if(this.auth.checkPrivilege(element)){
            granted = true
          }
        }
      )
      return granted
    }
}
