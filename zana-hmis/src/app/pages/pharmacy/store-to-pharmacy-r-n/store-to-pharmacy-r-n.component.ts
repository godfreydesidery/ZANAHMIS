import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IMedicine } from 'src/app/domain/medicine';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { environment } from 'src/environments/environment';
import { IPharmacyToStoreRO } from 'src/app/domain/pharmacy-to-store-r-o';
import { IStoreToPharmacyRN } from 'src/app/domain/store-to-pharmacy-r-n';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgePipe } from 'src/app/pipes/age.pipe';
import { SearchFilterPipe } from 'src/app/pipes/search-filter-pipe';

const API_URL = environment.apiUrl;


@Component({
  selector: 'app-store-to-pharmacy-r-n',
  templateUrl: './store-to-pharmacy-r-n.component.html',
  styleUrls: ['./store-to-pharmacy-r-n.component.scss'],
  standalone : true,
  imports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchFilterPipe,
    AgePipe,
    RouterLink
  ],
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

  filterRecords : string = ''


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
        this.msgBox.showErrorMessage(error, '')
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
        this.msgBox.showErrorMessage(error, '')
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
          this.msgBox.showErrorMessage(error, '')
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
          this.msgBox.showErrorMessage(error, '')
        }
      )
    }
    
  }

  clear(){
    this.pharmacyToStoreRONo = ''
    this.storeToPharmacyRN.id = null
    this.storeToPharmacyRN.no = ''
    
    //etc
    this.storeToPharmacyRN!
  }

  clearDetail(){
    this.detailId = null
    this.detailCode = ''
    this.detailName = ''
    this.detailOrderedQty = 0
    this.detailReceivedQty = 0
  }

  async approveReceipt(){
    var valid : number = 1
    this.storeToPharmacyRN.storeToPharmacyRNDetails.forEach(detail => {
      detail.storeToPharmacyBatches.forEach(batch => {
        if(batch.checked === undefined || batch.checked === false){
          this.msgBox.showErrorMessage3('Can not approve receipt. You can not receive less than the supplied goods')
          valid = 0
          return
          //provide logic to send to server for validation later, too cumbersome
        }
      })
    })
    if(valid === 0){
      return
    }

    if(!window.confirm('Confirm receive goods. Confirm?')){
      return
    }

    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }


    var rn = this.storeToPharmacyRN
    console.log(rn)

    this.spinner.show()
    await this.http.post<IStoreToPharmacyRN[]>(API_URL+'/store_to_pharmacy_r_ns/approve_receipt?receive_note_id=' + rn.id, null, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.msgBox.showSuccessMessage('Goods received successifuly')
        console.log(data)
      },
      error => {
        console.log(error)
        this.msgBox.showErrorMessage(error, '')
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