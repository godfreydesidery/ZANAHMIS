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
import { IPharmacyToStoreRODetail } from 'src/app/domain/pharmacy-to-store-r-o-detail';
import { IStoreToPharmacyTO } from 'src/app/domain/store-to-pharmacy-t-o';

const API_URL = environment.apiUrl;


@Component({
  selector: 'app-pharmacy-to-store-r-o-list',
  templateUrl: './pharmacy-to-store-r-o-list.component.html',
  styleUrls: ['./pharmacy-to-store-r-o-list.component.scss']
})
export class PharmacyToStoreROListComponent {

  id : any = null

  pharmacyToStoreROs : IPharmacyToStoreRO[] = []

  pharmacyToStoreRO! : IPharmacyToStoreRO

  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private router : Router,
    private msgBox : MsgBoxService) { }

  async ngOnInit(): Promise<void> {
    this.loadOrders()
  }


  async loadOrders(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    this.spinner.show()
    await this.http.get<IPharmacyToStoreRO[]>(API_URL+'/pharmacy_to_store_r_os/load_pharmacy_orders', options)
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

  async get(id : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }

    this.id = null
    
    this.spinner.show()
    await this.http.get<IPharmacyToStoreRO>(API_URL+'/pharmacy_to_store_r_os/get?id='+id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.id = id

        /*this.id         = data?.id
        this.no         = data!.no
        this.orderDate  = data!.orderDate
        this.validUntil = data!.validUntil
        this.status     = data!.status
        this.created    = data!.created
        this.verified   = data!.verified
        this.approved   = data!.approved*/

        this.pharmacyToStoreRO = data!

        console.log(data)
      },
      error => {
        console.log(error)
        this.msgBox.showErrorMessage(error['error'])
      }
    )
  }

  async createTransferOrder(id : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var pharmacyToStoreRO = {
      id : id
    }

    this.spinner.show()
    await this.http.post<IStoreToPharmacyTO>(API_URL+'/store_to_pharmacy_t_os/create', pharmacyToStoreRO, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        localStorage.setItem('store-to-pharmacy-t-o-id', data?.id)
        this.router.navigate(['store-to-pharmacy-t-o'])

        /*this.id         = data?.id
        this.no         = data!.no
        this.orderDate  = data!.orderDate
        this.validUntil = data!.validUntil
        this.status     = data!.status
        this.created    = data!.created
        this.verified   = data!.verified
        this.approved   = data!.approved*/

        console.log(data)
      },
      error => {
        console.log(error)
        this.msgBox.showErrorMessage(error['error'])
      }
    )

  }

  async returnOrder(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var order = {
      id  : this.pharmacyToStoreRO?.id,
      no : this.pharmacyToStoreRO?.no,
    }
    this.spinner.show()
    await this.http.post<IPharmacyToStoreRO>(API_URL+'/pharmacy_to_store_r_os/return', order, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      () => {
        this.msgBox.showSuccessMessage('Order returned successifuly')
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )
  }

  async rejectOrder(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var order = {
      id  : this.pharmacyToStoreRO?.id,
      no : this.pharmacyToStoreRO?.no,
    }
    this.spinner.show()
    await this.http.post<IPharmacyToStoreRO>(API_URL+'/pharmacy_to_store_r_os/reject', order, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      () => {
        this.msgBox.showSuccessMessage('Order rejected successifuly')
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )
  }
}
