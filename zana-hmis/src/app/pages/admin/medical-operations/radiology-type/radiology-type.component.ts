import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-radiology-type',
  templateUrl: './radiology-type.component.html',
  styleUrls: ['./radiology-type.component.scss']
})
export class RadiologyTypeComponent implements OnInit {


  id          : any = null
  code        : string = ''
  name        : string = ''
  description : string = ''
  uom         : string = ''
  price       : number = 0
  active      : boolean = true

  radiologyTypes : IRadiologyType[] = []

  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadRadiologyTypes()
  }

  public async saveRadiologyType(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var radiologyType = {
      id          : this.id,
      code          : this.code,
      name        : this.name,
      description : this.description,
      uom       : this.uom,
      price       : this.price,
      active      : true
    }
    if(this.id == null || this.id == ''){
      //save a new radiologyType
      this.spinner.show()
      await this.http.post<IRadiologyType>(API_URL+'/radiology_types/save', radiologyType, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          this.code       = data!.code
          this.name = data!.name
          this.description = data!.description
          this.price = data!.price
          this.uom = data!.uom
          this.active       = data!.active
          alert('Radiology Type created successifully')
          this.loadRadiologyTypes()
          
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
      await this.http.post<IRadiologyType>(API_URL+'/radiology_types/save', radiologyType, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          this.code       = data!.code
          this.name = data!.name
          this.description = data!.description
          this.price = data!.price
          this.uom = data!.uom
          this.active       = data!.active
          alert('Radiology Type updated successifully')
          this.loadRadiologyTypes()
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

  async loadRadiologyTypes(){
    this.radiologyTypes = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IRadiologyType[]>(API_URL+'/radiology_types', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.radiologyTypes.push(element)
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
    this.description = ''
    this.uom = ''
    this.price = 0
    this.active = false
  }

  async getRadiologyType(key: string) {
    if(key == ''){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IRadiologyType>(API_URL+'/radiology_types/get?id='+key, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data=>{
        this.id           = data?.id
          this.code       = data!.code
          this.name = data!.name
          this.description = data!.description
          this.price = data!.price
          this.uom = data!.uom
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

export interface IRadiologyType{
  id     : any
  code   : string
  name        : string
  description : string
  uom    : string
  price  : number
  active : boolean
}