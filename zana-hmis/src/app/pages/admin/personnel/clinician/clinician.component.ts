import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-clinician',
  templateUrl: './clinician.component.html',
  styleUrls: ['./clinician.component.scss']
})
export class ClinicianComponent implements OnInit {


  id : any
  no : string = ''
  name : string = ''
  type : string = ''
  active : boolean = true

  clinicians : IClinician[] = []

  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadClinicians()
  }

  public async saveClinician(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var clinic = {
      id          : this.id,
      no          : this.no,
      name        : this.name,
      type        : this.type,
      active      : true
    }
    if(this.id == null || this.id == ''){
      //save a new clinic
      this.spinner.show()
      await this.http.post<IClinician>(API_URL+'/clinicians/save', clinic, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          this.no       = data!.no
          this.name = data!.name
          this.type = data!.type
          this.active       = data!.active
          alert('Clinician created successifully')
          this.loadClinicians()
          this.clear()
        }
      )
      .catch(
        error => {
          alert('Could not create clinician')
        }
      )

    }else{
      //update an existing clinic
      this.spinner.show()
      await this.http.post<IClinician>(API_URL+'/clinicians/save', clinic, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          this.no       = data!.no
          this.name = data!.name
          this.type = data!.type
          this.active       = data!.active
          alert('Clinician updated successifully')
          this.loadClinicians()
        }
      )
      .catch(
        error => {
          alert('Could not update clinician')
        }
      )
    }
  }

  async loadClinicians(){
    this.clinicians = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IClinician[]>(API_URL+'/clinicians', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.clinicians.push(element)
        })
      }
    )
    .catch(
      error => {
        alert('Could not load clinicians')
      }
    )
  }

  clear(){
    this.id = null
    this.no = ''
    this.name = ''
    this.type = ''
  }

  async getClinician(key: string) {
    if(key == ''){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IClinician>(API_URL+'/clinicians/get?id='+key, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data=>{
        this.id = data?.id
        this.no = data!.no
        this.name = data!.name
        this.type = data!.type
        this.active = data!.active
      }
    )
    .catch(
      error=>{
        console.log(error)        
        alert('Could not find clinic')
      }
    )
  }

}

export  interface IClinician{
  id : any
  no : string
  name : string
  type : string
  active : boolean
}
