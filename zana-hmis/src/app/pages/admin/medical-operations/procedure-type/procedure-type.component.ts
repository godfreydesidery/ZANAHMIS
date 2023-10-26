import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/auth.service';
import { IProcedureType } from 'src/app/domain/procedure-type';
import { SearchFilterPipe } from 'src/app/pipes/search-filter-pipe';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-procedure-type',
  standalone : true,
  imports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchFilterPipe,
    RouterLink
  ],
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

  filterRecords : string = ''

  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private msgBox : MsgBoxService
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
      code        : this.code,
      name        : this.name,
      description : this.description,
      uom         : this.uom,
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
          this.code         = data!.code
          this.name         = data!.name
          this.description  = data!.description
          this.price        = data!.price
          this.uom          = data!.uom
          this.active       = data!.active
          this.msgBox.showSuccessMessage('Procedure Type created successifully')
          this.loadProcedureTypes()
          
        }
      )
      .catch(
        error => {
          this.msgBox.showErrorMessage(error, 'Could not create Procedure Type')
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
          this.code         = data!.code
          this.name         = data!.name
          this.description  = data!.description
          this.price        = data!.price
          this.uom          = data!.uom
          this.active       = data!.active
          this.msgBox.showSuccessMessage('Procedure Type updated successifully')
          this.loadProcedureTypes()
        }
      )
      .catch(
        error => {
          this.msgBox.showErrorMessage(error, 'Could not update Procedure Type')
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
        this.msgBox.showErrorMessage(error, 'Could not load Procedure Types')
      }
    )
  }

  clear(){
    this.id           = null
    this.code         = ''
    this.name         = ''
    this.description  = ''
    this.uom          = ''
    this.price        = 0
    this.active       = false
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
        this.id             = data?.id
          this.code         = data!.code
          this.name         = data!.name
          this.description  = data!.description
          this.price        = data!.price
          this.uom          = data!.uom
          this.active       = data!.active
      }
    )
    .catch(
      error=>{
        console.log(error)        
        this.msgBox.showErrorMessage(error, 'Could not find Procedure Type')
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
