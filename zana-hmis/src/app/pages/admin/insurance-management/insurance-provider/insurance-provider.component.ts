import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-insurance-provider',
  templateUrl: './insurance-provider.component.html',
  styleUrls: ['./insurance-provider.component.scss']
})
export class InsuranceProviderComponent implements OnInit {

  id          : any = null
  code        : string = ''
  name        : string = ''
  address : string = ''
  phone         : string = ''
  active      : boolean = true

  insuranceProviders : IInsuranceProvider[] = []

  insuranceProviderNames : string[] = []

  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadInsuranceProviders()
  }

  public async saveInsuranceProvider(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var insuranceProvider = {
      id          : this.id,
      code          : this.code,
      name        : this.name,
      address : this.address,
      phone       : this.phone,
      active      : true
    }
    if(this.id == null || this.id == ''){
      //save a new insuranceProvider
      this.spinner.show()
      await this.http.post<IInsuranceProvider>(API_URL+'/insurance_providers/save', insuranceProvider, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          this.code       = data!.code
          this.name = data!.name
          this.address = data!.address
          this.phone = data!.phone
          this.active       = data!.active
          alert('Radiology Type created successifully')
          this.loadInsuranceProviders()
          
        }
      )
      .catch(
        error => {
          alert('Could not create radiology type')
        }
      )

    }else{
      //update an existing clinic
      this.spinner.show()
      await this.http.post<IInsuranceProvider>(API_URL+'/insurance_providers/save', insuranceProvider, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          this.code       = data!.code
          this.name = data!.name
          this.address = data!.address
          this.phone = data!.phone
          this.active       = data!.active
          alert('Radiology Type updated successifully')
          this.loadInsuranceProviders()
        }
      )
      .catch(
        error => {
          alert('Could not update radiology type')
        }
      )
    }
    this.clear()
  }

  async loadInsuranceProviders(){
    this.insuranceProviders = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IInsuranceProvider[]>(API_URL+'/insurance_providers', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.insuranceProviders.push(element)
        })
      }
    )
    .catch(
      error => {
        alert('Could not load radiology types')
      }
    )
  }

  clear(){
    this.id = null
    this.code = ''
    this.name = ''
    this.address = ''
    this.phone = ''
    this.active = false
  }

  async getInsuranceProvider(key: string) {
    if(key == ''){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IInsuranceProvider>(API_URL+'/insurance_providers/get?id='+key, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data=>{
        this.id           = data?.id
          this.code       = data!.code
          this.name = data!.name
          this.address = data!.address
          this.phone = data!.phone
          this.active       = data!.active
      }
    )
    .catch(
      error=>{
        console.log(error)        
        alert('Could not find radiology type')
      }
    )
  }

}

export interface IInsuranceProvider{
  id     : any
  code   : string
  name        : string
  address : string
  phone    : string
  active : boolean
}