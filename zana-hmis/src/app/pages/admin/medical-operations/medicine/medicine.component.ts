import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
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
  category    : string = ''
  price       : number = 0
  active      : boolean = true

  medicines : IMedicine[] = []

  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService
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
      code          : this.code,
      name        : this.name,
      description : this.description,
      uom       : this.uom,
      category   : this.category,
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
          this.code       = data!.code
          this.name = data!.name
          this.description = data!.description
          this.price = data!.price
          this.uom = data!.uom
          this.category = data!.category
          this.active       = data!.active
          alert('Procedure Type created successifully')
          this.loadMedicines()
          
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
      await this.http.post<IMedicine>(API_URL+'/medicines/save', medicine, options)
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
          this.category = data!.category
          this.active       = data!.active
          alert('Procedure Type updated successifully')
          this.loadMedicines()
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
    this.category = ''
    this.price = 0
    this.active = false
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
          this.code       = data!.code
          this.name = data!.name
          this.description = data!.description
          this.price = data!.price
          this.uom = data!.uom
          this.category = data!.category
          this.active       = data!.active
      }
    )
    .catch(
      error=>{
        console.log(error)        
        alert('Could not find medicine')
      }
    )
  }

}

export interface IMedicine{
  id     : any
  code   : string
  name        : string
  description : string
  uom    : string
  category : string
  price  : number
  active : boolean
}