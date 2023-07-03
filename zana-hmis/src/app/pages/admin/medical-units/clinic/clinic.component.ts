import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {


  id : any
  no : string = ''
  name : string = ''
  description : string = ''
  consultationFee : number = 0
  active : boolean = true

  clinics : IClinic[] = []

  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadClinics()
  }

  public async saveClinic(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var clinic = {
      id          : this.id,
      no          : this.no,
      name        : this.name,
      description : this.description,
      consultationFee       : this.consultationFee,
      active      : true
    }
    if(this.id == null || this.id == ''){
      //save a new clinic
      this.spinner.show()
      await this.http.post<IClinic>(API_URL+'/clinics/save', clinic, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          this.no       = data!.no
          this.name = data!.name
          this.description = data!.description
          this.consultationFee = data!.consultationFee
          this.active       = data!.active
          alert('Clinic created successifully')
          this.loadClinics()
          this.clear()
        }
      )
      .catch(
        error => {
          alert('Could not create clinic')
        }
      )

    }else{
      //update an existing clinic
      this.spinner.show()
      await this.http.post<IClinic>(API_URL+'/clinics/save', clinic, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          this.no       = data!.no
          this.name = data!.name
          this.description = data!.description
          this.consultationFee = data!.consultationFee
          this.active       = data!.active
          alert('Clinic updated successifully')
          this.loadClinics()
        }
      )
      .catch(
        error => {
          alert('Could not update clinic')
        }
      )
    }
  }

  async loadClinics(){
    this.clinics = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IClinic[]>(API_URL+'/clinics', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.clinics.push(element)
        })
      }
    )
    .catch(
      error => {
        alert('Could not load clinics')
      }
    )
  }

  clear(){
    this.id = null
    this.no = ''
    this.name = ''
    this.description = ''
    this.consultationFee = 0
  }

  async getClinic(key: string) {
    if(key == ''){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IClinic>(API_URL+'/clinics/get?id='+key, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data=>{
        this.id = data?.id
        this.no = data!.no
        this.name = data!.name
        this.description = data!.description
        this.consultationFee = data!.consultationFee
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

export  interface IClinic{
  id : any
  no : string
  name : string
  description : string
  consultationFee : number
  active : boolean
}