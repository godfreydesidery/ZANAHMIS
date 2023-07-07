import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-lab-test-type',
  templateUrl: './lab-test-type.component.html',
  styleUrls: ['./lab-test-type.component.scss']
})
export class LabTestTypeComponent implements OnInit {


  id          : any = null
  code        : string = ''
  name        : string = ''
  description : string = ''
  uom         : string = ''
  price       : number = 0
  active      : boolean = true

  labTestTypes : ILabTestType[] = []

  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadLabTestTypes()
  }

  public async saveLabTestType(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var labTestType = {
      id          : this.id,
      code          : this.code,
      name        : this.name,
      description : this.description,
      uom       : this.uom,
      price       : this.price,
      active      : true
    }
    if(this.id == null || this.id == ''){
      //save a new labTestType
      this.spinner.show()
      await this.http.post<ILabTestType>(API_URL+'/lab_test_types/save', labTestType, options)
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
          alert('Lab Test Type created successifully')
          this.loadLabTestTypes()
          
        }
      )
      .catch(
        error => {
          alert('Could not create lab test type')
        }
      )

    }else{
      //update an existing clinic
      this.spinner.show()
      await this.http.post<ILabTestType>(API_URL+'/lab_test_types/save', labTestType, options)
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
          alert('Lab Test Type updated successifully')
          this.loadLabTestTypes()
        }
      )
      .catch(
        error => {
          alert('Could not update lab test type')
        }
      )
    }
    this.clear()
  }

  async loadLabTestTypes(){
    this.labTestTypes = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<ILabTestType[]>(API_URL+'/lab_test_types', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.labTestTypes.push(element)
        })
      }
    )
    .catch(
      error => {
        alert('Could not load lab test types')
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

  async getLabTestType(key: string) {
    if(key == ''){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<ILabTestType>(API_URL+'/lab_test_types/get?id='+key, options)
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
        alert('Could not find lab test type')
      }
    )
  }

}

export interface ILabTestType{
  id     : any
  code   : string
  name        : string
  description : string
  uom    : string
  price  : number
  active : boolean
}