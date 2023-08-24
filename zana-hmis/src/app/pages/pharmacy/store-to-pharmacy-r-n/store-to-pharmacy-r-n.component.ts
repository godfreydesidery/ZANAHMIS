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
import { IStoreToPharmacyRN } from 'src/app/domain/store-to-pharmacy-r-n';

const API_URL = environment.apiUrl;


@Component({
  selector: 'app-store-to-pharmacy-r-n',
  templateUrl: './store-to-pharmacy-r-n.component.html',
  styleUrls: ['./store-to-pharmacy-r-n.component.scss']
})
export class StoreToPharmacyRNComponent {

  pharmacyId : any = localStorage.getItem('selected-pharmacy-id')
  pharmacyName = localStorage.getItem('selected-pharmacy-name')


  storeToPharmacyRN! : IStoreToPharmacyRN

  pharmacyToStoreRONo : string = ''

  id : any
  no : string = ''
  orderDate! : Date
  validUntil! : Date
  status : string = ''
  created : string = ''
  verified : string = ''
  approved : string = ''

  roId : any = null

  pharmacyToStoreRO! : IPharmacyToStoreRO

  noLocked = false

  pharmacyToStoreROs : IPharmacyToStoreRO[] = []

  detailId          : any
  detailCode        : string = ''
  detailName        : string = ''
  detailOrderedQty  : number = 0
  detailReceivedQty : number = 0

  medicineNames : string[] = []

  //pharmacyToStoreDetails : IPharmacyToStoreRODetail[] = []


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

  async createGRN(reqOrderId : any, reqOrderNo : string){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var reqOrder = {
      id : reqOrderId,
      no : reqOrderNo,
      pharmacy: { id : this.pharmacyId}
    }

    this.spinner.show()
    await this.http.post<IStoreToPharmacyRN>(API_URL+'/store_to_pharmacy_r_ns/create', reqOrder, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.storeToPharmacyRN = data!
        console.log(data)
      }
    )
    .catch(
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
        console.log(data)
      },
      error => {
        console.log(error)
        this.msgBox.showErrorMessage(error['error'])
      }
    )
  }

  async searchMedicine(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    if(this.detailCode != ''){
      this.spinner.show()
      await this.http.get<IMedicine>(API_URL+'/medicines/get_by_code?code='+this.detailCode, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.clearDetail()
          this.detailCode = data!.code
          this.detailName = data!.name
        },
        error => {
          console.log(error)
          this.msgBox.showErrorMessage(error['error'])
        }
      )
    }else{
      this.spinner.show()
      await this.http.get<IMedicine>(API_URL+'/medicines/get_by_name?name='+this.detailName, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.clearDetail()
          this.detailCode = data!.code
          this.detailName = data!.name
        },
        error => {
          console.log(error)
          this.msgBox.showErrorMessage(error['error'])
        }
      )
    }
    
  }

  clearDetail(){
    this.detailId = null
    this.detailCode = ''
    this.detailName = ''
    this.detailOrderedQty = 0
    this.detailReceivedQty = 0
  }

  
}