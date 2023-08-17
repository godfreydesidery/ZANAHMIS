import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IPrescription } from 'src/app/domain/prescription';
import { IMedicine } from 'src/app/domain/medicine';
import { IPatient } from 'src/app/domain/patient';
import { IPatientBill } from 'src/app/domain/patient-bill';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { environment } from 'src/environments/environment';
import { IPharmacyToStoreRO } from 'src/app/domain/pharmacy-to-store-r-o';

const API_URL = environment.apiUrl;


@Component({
  selector: 'app-pharmacy-to-store-r-o',
  templateUrl: './pharmacy-to-store-r-o.component.html',
  styleUrls: ['./pharmacy-to-store-r-o.component.scss']
})
export class PharmacyToStoreROComponent {

  pharmacyName = localStorage.getItem('selected-pharmacy-name')

  id : any
  no : string = ''
  orderDate! : Date
  validUntil! : Date
  status : string = ''
  created : string = ''
  verified : string = ''
  approved : string = ''

  pharmacyId : any = localStorage.getItem('selected-pharmacy-id')

  pharmacyToStoreRO! : IPharmacyToStoreRO

  noLocked = false

  pharmacyToStoreROs : IPharmacyToStoreRO[] = []


  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private router : Router,
    private msgBox : MsgBoxService) { }

  async ngOnInit(): Promise<void> {
    this.loadOrdersByPharmacy()
  }

  async requestNo(){
    this.clear()
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    this.spinner.show()
    await this.http.get<any>(API_URL+'/pharmacy_to_store_r_os/request_no', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.no = data!['no']
        this.noLocked = true
      }
    )
    .catch(
      error => {
        console.log(error)
        this.msgBox.showErrorMessage(error['error'])
      }
    )
  }

  async saveOrder(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var order = {
      id  : this.id,
      no : this.no,
      pharmacy : {id : this.pharmacyId },
      validUntil : this.validUntil
    }
    this.spinner.show()
    await this.http.post<IPharmacyToStoreRO>(API_URL+'/pharmacy_to_store_r_os/save', order, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.id         = data?.id
        this.no         = data!.no
        this.orderDate  = data!.orderDate
        this.validUntil = data!.validUntil
        this.status     = data!.status
        this.created    = data!.created
        this.verified   = data!.verified
        this.approved   = data!.approved

        this.pharmacyToStoreRO = data!

        
        this.msgBox.showSuccessMessage('Success')
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )
  }

  

  saveDetail(){

  }

  postOrder(){

  }

  cancelOrder(){
    
  }

  lock(){
    this.noLocked = true

  }

  unlock(){
    this.noLocked = false

  }

  async openToEdit(){
    if(this.id == null){
      this.noLocked = false
      this.no = ''
    }else{
      this.noLocked = true
    }
  }

  clear(){
    this.id         = null
    this.no         = ''
    this.orderDate! 
    this.validUntil! 
    this.status     = ''
    this.created    = ''
    this.verified   = ''
    this.approved   = ''
    this.pharmacyToStoreRO!
  }


  async searchOrder(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    this.spinner.show()
    await this.http.get<IPharmacyToStoreRO>(API_URL+'/pharmacy_to_store_r_os/search_by_no?no='+this.no+'&pharmacy_id='+this.pharmacyId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.id         = data?.id
        this.no         = data!.no
        this.orderDate  = data!.orderDate
        this.validUntil = data!.validUntil
        this.status     = data!.status
        this.created    = data!.created
        this.verified   = data!.verified
        this.approved   = data!.approved

        this.pharmacyToStoreRO = data!

        this.lock()
      },
      error => {
        console.log(error)
        this.msgBox.showErrorMessage(error['error'])
      }
    )
  }

  async search(id : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    this.spinner.show()
    await this.http.get<IPharmacyToStoreRO>(API_URL+'/pharmacy_to_store_r_os/search?id='+id+'&pharmacy_id='+this.pharmacyId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.id         = data?.id
        this.no         = data!.no
        this.orderDate  = data!.orderDate
        this.validUntil = data!.validUntil
        this.status     = data!.status
        this.created    = data!.created
        this.verified   = data!.verified
        this.approved   = data!.approved

        this.pharmacyToStoreRO = data!

        this.lock()
      },
      error => {
        console.log(error)
        this.msgBox.showErrorMessage(error['error'])
      }
    )
  }

  async loadOrdersByPharmacy(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    this.spinner.show()
    await this.http.get<IPharmacyToStoreRO[]>(API_URL+'/pharmacy_to_store_r_os/load_pharmacy_orders_by_pharmacy?pharmacy_id='+this.pharmacyId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.pharmacyToStoreROs = data!
      },
      error => {
        console.log(error)
        this.msgBox.showErrorMessage(error['error'])
      }
    )
  }
}
