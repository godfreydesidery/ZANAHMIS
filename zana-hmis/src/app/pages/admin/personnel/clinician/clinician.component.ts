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

  public clinics           : IClinic[]


  clinicians : IClinician[] = []

  clinicianClinics : IClinic[] = []

  rollNo : string = ''

  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService
  ) {
    this.clinics           = []
  }

  ngOnInit(): void {
    this.loadClinicians()
    this.loadClinics()
  }

  public async saveClinician(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var clinicianClinics : IClinic[] = []
    this.clinics.forEach(clinic => { /**Get the roles */
      if(clinic.assigned == true){
        clinicianClinics.push(clinic)
      }
    })
    var clinic = {
      id          : this.id,
      no          : this.no,
      name        : this.name,
      type        : this.type,
      clinics     : clinicianClinics,
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
          this.clinics = data!.clinics
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
    this.rollNo = ''
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
        console.log(data)
        this.id = data?.id
        this.no = data!.no
        this.name = data!.name
        this.type = data!.type
        this.active = data!.active

        this.showUserRoles(this.clinics, data!['clinics'])
        
      }
    )
    .catch(
      error=>{
        console.log(error)        
        alert('Could not find clinic')
      }
    )
  }

  showClinicianClinics(clinics : IClinic[], clinicianClinics : IClinic[]){
    /**
     * Display user roles, the roles for that particular user are checked
     * args: roles-global user roles, userRoles-roles for a specific user
     */
    /** First uncheck all roles */
    this.clearClinics()
    /** Now, check the respective  roles */
    clinicianClinics.forEach(clinicianClinic => {
      clinics.forEach(clinic => {        
        if(clinic.name === clinicianClinic.name){
          clinic.assigned = true
        }
      })
    })
    this.clinics = clinics
  }

 

  showUserRoles(clinics : IClinic[], clinicianClinics : IClinic[]){
    /**
     * Display user roles, the roles for that particular user are checked
     * args: roles-global user roles, userRoles-roles for a specific user
     */
    /** First uncheck all roles */
    this.clearClinics()
    /** Now, check the respective  roles */
    clinicianClinics.forEach(clinicianClinic => {
      clinics.forEach(clinic => {        
        if(clinic.name === clinicianClinic.name){
          clinic.assigned = true
        }
      })
    })
    this.clinics = clinics
  }

  clearClinics(){
    /**Uncheck all roles */
    this.clinics.forEach(clinic => {
      clinic.assigned = false
    })
  }

  async loadClinics(){  
    /**Get all roles */
     let options = {
       headers : new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
     }
     this.spinner.show()
     await this.http.get<IClinic[]>(API_URL+'/clinics', options)
     .pipe(finalize(() => this.spinner.hide()))
     .toPromise()
     .then(
       data => {
         data?.forEach(
           element => {
             this.clinics.push(element)
           }
         )
       }
     )
     .catch(error => {
       console.log(error)
     })
   }

   public async assignUserProfile(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    
    if(this.id != null){
      this.spinner.show()
      await this.http.post<IClinician>(API_URL+'/clinicians/assign_user_profile?id='+this.id+'&roll_no='+this.rollNo, null, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          this.no       = data!.no
          this.name = data!.name
          this.type = data!.type
          this.clinics = data!.clinics
          this.active       = data!.active
          alert('Saved successifully')
          this.loadClinicians()
          this.clear()
        }
      )
      .catch(
        error => {
          alert(error['error'])
        }
      )

    }
  }
  
}

export  interface IClinician{
  id : any
  no : string
  name : string
  type : string
  active : boolean
  clinics : IClinic[]
}

export interface IClinic{
  id       : any
  name     : string
  assigned : boolean
}
