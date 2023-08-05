import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IPharmacy } from 'src/app/domain/pharmacy';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss']
})
export class PharmacyComponent {


  id              : any
  code            : string = ''
  name            : string = ''
  description     : string = ''
  active          : boolean = true

  pharmacies : IPharmacy[] = []

  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private spinner : NgxSpinnerService,
    private msgBox : MsgBoxService
  ) { }

  ngOnInit(): void {
    this.loadPharmacies()
  }

  public async savePharmacy(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var pharmacy = {
      id              : this.id,
      code            : this.code,
      name            : this.name,
      description     : this.description,
      active          : true
    }
    if(this.id == null || this.id == ''){
      //save a new pharmacy
      this.spinner.show()
      await this.http.post<IPharmacy>(API_URL+'/pharmacies/save', pharmacy, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          this.code         = data!.code
          this.name         = data!.name
          this.description  = data!.description
          this.active       = data!.active
          this.msgBox.showSuccessMessage('Pharmacy created successifully')
          this.loadPharmacies()
          this.clear()
        }
      )
      .catch(
        error => {
          this.msgBox.showErrorMessage('Could not create pharmacy')
        }
      )

    }else{
      //update an existing pharmacy
      this.spinner.show()
      await this.http.post<IPharmacy>(API_URL+'/pharmacies/save', pharmacy, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          this.code         = data!.code
          this.name         = data!.name
          this.description  = data!.description
          this.active       = data!.active
          this.msgBox.showSuccessMessage('Pharmacy updated successifully')
          this.loadPharmacies()
        }
      )
      .catch(
        error => {
          this.msgBox.showErrorMessage('Could not update pharmacy')
        }
      )
    }
  }

  async loadPharmacies(){
    this.pharmacies = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IPharmacy[]>(API_URL+'/pharmacies', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.pharmacies.push(element)
        })
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage('Could not load pharmacies')
      }
    )
  }

  clear(){
    this.id           = null
    this.code         = ''
    this.name         = ''
    this.description  = ''
  }

  async getPharmacy(key: string) {
    if(key == ''){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IPharmacy>(API_URL+'/pharmacies/get?id='+key, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data=>{
        this.id           = data?.id
        this.code         = data!.code
        this.name         = data!.name
        this.description  = data!.description
        this.active       = data!.active
      }
    )
    .catch(
      error=>{
        console.log(error)        
        this.msgBox.showErrorMessage('Could not find pharmacy')
      }
    )
  }

}
