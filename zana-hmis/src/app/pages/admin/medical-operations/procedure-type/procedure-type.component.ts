import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-procedure-type',
  templateUrl: './procedure-type.component.html',
  styleUrls: ['./procedure-type.component.scss']
})
export class ProcedureTypeComponent implements OnInit {


  id          : any = null
  code        : string = ''
  name        : string = ''
  description : string = ''
  uom         : string = ''
  price       : number = 0
  active      : boolean = true

  procedureTypes : IProcedureType[] = []

  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadProcedureTypes()
  }

  public async saveProcedureType(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var procedureType = {
      id          : this.id,
      code          : this.code,
      name        : this.name,
      description : this.description,
      uom       : this.uom,
      price       : this.price,
      active      : true
    }
    if(this.id == null || this.id == ''){
      //save a new procedureType
      this.spinner.show()
      await this.http.post<IProcedureType>(API_URL+'/procedure_types/save', procedureType, options)
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
          alert('Procedure Type created successifully')
          this.loadProcedureTypes()
          
        }
      )
      .catch(
        error => {
          alert('Could not create procedure type')
        }
      )

    }else{
      //update an existing clinic
      this.spinner.show()
      await this.http.post<IProcedureType>(API_URL+'/procedure_types/save', procedureType, options)
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
          alert('Procedure Type updated successifully')
          this.loadProcedureTypes()
        }
      )
      .catch(
        error => {
          alert('Could not update procedure type')
        }
      )
    }
    this.clear()
  }

  async loadProcedureTypes(){
    this.procedureTypes = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IProcedureType[]>(API_URL+'/procedure_types', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.procedureTypes.push(element)
        })
      }
    )
    .catch(
      error => {
        alert('Could not load procedure types')
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

  async getProcedureType(key: string) {
    if(key == ''){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IProcedureType>(API_URL+'/procedure_types/get?id='+key, options)
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
        alert('Could not find procedure type')
      }
    )
  }

}

export interface IProcedureType{
  id     : any
  code   : string
  name        : string
  description : string
  uom    : string
  price  : number
  active : boolean
}