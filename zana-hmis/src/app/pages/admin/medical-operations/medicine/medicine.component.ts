import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IMedicine } from 'src/app/domain/medicine';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss']
})
export class MedicineComponent implements OnInit {
  id          : any = null
  code        : string = ''
  name        : string = ''
  description : string = ''
  uom         : string = ''
  type        : string = ''
  price       : number = 0
  active      : boolean = true

  medicines : IMedicine[] = []

  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private spinner : NgxSpinnerService,
    private msgBox : MsgBoxService
  ) { }

  ngOnInit(): void {
    this.loadMedicines()
  }

  public async saveMedicine(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var medicine = {
      id          : this.id,
      code        : this.code,
      name        : this.name,
      description : this.description,
      uom         : this.uom,
      type        : this.type,
      price       : this.price,
      active      : true
    }
    if(this.id == null || this.id == ''){
      //save a new medicine
      this.spinner.show()
      await this.http.post<IMedicine>(API_URL+'/medicines/save', medicine, options)
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
          this.type         = data!.type
          this.active       = data!.active
          this.msgBox.showSuccessMessage('Medicine created successifully')
          this.loadMedicines()
          
        }
      )
      .catch(
        error => {
          this.msgBox.showErrorMessage('Could not create Medicine')
        }
      )

    }else{
      //update an existing clinic
      this.spinner.show()
      await this.http.post<IMedicine>(API_URL+'/medicines/save', medicine, options)
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
          this.type         = data!.type
          this.active       = data!.active
          this.msgBox.showSuccessMessage('Medicine updated successifully')
          this.loadMedicines()
        }
      )
      .catch(
        error => {
          this.msgBox.showErrorMessage('Could not update Medicine')
        }
      )
    }
    this.clear()
  }

  async loadMedicines(){
    this.medicines = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IMedicine[]>(API_URL+'/medicines', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.medicines.push(element)
        })
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage('Could not load Medicines')
      }
    )
  }

  clear(){
    this.id           = null
    this.code         = ''
    this.name         = ''
    this.description  = ''
    this.uom          = ''
    this.type         = ''
    this.price        = 0
    this.active       = false
  }

  async getMedicine(key: string) {
    if(key == ''){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IMedicine>(API_URL+'/medicines/get?id='+key, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data=>{
        this.id           = data?.id
        this.code         = data!.code
        this.name         = data!.name
        this.description  = data!.description
        this.price        = data!.price
        this.uom          = data!.uom
        this.type         = data!.type
        this.active       = data!.active
      }
    )
    .catch(
      error=>{
        console.log(error)        
        this.msgBox.showErrorMessage('Could not find Medicine')
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