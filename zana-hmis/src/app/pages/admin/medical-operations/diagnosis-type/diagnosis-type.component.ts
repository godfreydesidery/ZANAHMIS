import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IDiagnosisType } from 'src/app/domain/diagnosis-type';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-diagnosis-type',
  templateUrl: './diagnosis-type.component.html',
  styleUrls: ['./diagnosis-type.component.scss']
})
export class DiagnosisTypeComponent implements OnInit {


  id          : any = null
  code        : string = ''
  name        : string = ''
  description : string = ''
  active      : boolean = true

  diagnosisTypes : IDiagnosisType[] = []

  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private spinner : NgxSpinnerService,
    private msgBox : MsgBoxService
  ) { }

  ngOnInit(): void {
    this.loadDiagnosisTypes()
  }

  public async saveDiagnosisType(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var diagnosisType = {
      id          : this.id,
      code        : this.code,
      name        : this.name,
      description : this.description,
      active      : true
    }
    if(this.id == null || this.id == ''){
      //save a new diagnosisType
      this.spinner.show()
      await this.http.post<IDiagnosisType>(API_URL+'/diagnosis_types/save', diagnosisType, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          this.code         = data!.code
          this.name         = data!.name
          this.description  = data!.description
          this.active       = data!.active
          this.msgBox.showSuccessMessage('Diagnosis Type created successifully')
          this.loadDiagnosisTypes()
          
        }
      )
      .catch(
        error => {
          this.msgBox.showErrorMessage('Could not create Diagnosis Type')
        }
      )

    }else{
      //update an existing clinic
      this.spinner.show()
      await this.http.post<IDiagnosisType>(API_URL+'/diagnosis_types/save', diagnosisType, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          this.code         = data!.code
          this.name         = data!.name
          this.description  = data!.description
          this.active       = data!.active
          this.msgBox.showSuccessMessage('Diagnosis Type updated successifully')
          this.loadDiagnosisTypes()
        }
      )
      .catch(
        error => {
          this.msgBox.showErrorMessage('Could not update Diagnosis Type')
        }
      )
    }
    this.clear()
  }

  async loadDiagnosisTypes(){
    this.diagnosisTypes = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IDiagnosisType[]>(API_URL+'/diagnosis_types', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.diagnosisTypes.push(element)
        })
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage('Could not load Diagnosis Types')
      }
    )
  }

  clear(){
    this.id           = null
    this.code         = ''
    this.name         = ''
    this.description  = ''
    this.active       = false
  }

  async getDiagnosisType(key: string) {
    if(key == ''){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IDiagnosisType>(API_URL+'/diagnosis_types/get?id='+key, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data=>{
        this.id             = data?.id
          this.code         = data!.code
          this.name         = data!.name
          this.description  = data!.description
          this.active       = data!.active
      }
    )
    .catch(
      error=>{
        console.log(error)        
        this.msgBox.showErrorMessage('Could not find diagnosis type')
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
