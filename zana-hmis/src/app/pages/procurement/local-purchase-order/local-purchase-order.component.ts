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
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgePipe } from 'src/app/pipes/age.pipe';
import { SearchFilterPipe } from 'src/app/pipes/search-filter-pipe';
import { ILocalPurchaseOrder } from 'src/app/domain/local-purchase-order';
import { ISupplier } from 'src/app/domain/supplier';
import { IItem } from 'src/app/domain/item';

const API_URL = environment.apiUrl;


@Component({
  selector: 'app-local-purchase-order',
  templateUrl: './local-purchase-order.component.html',
  styleUrls: ['./local-purchase-order.component.scss'],
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
export class LocalPurchaseOrderComponent {

  id : any
  no : string = ''
  orderDate! : Date
  validUntil! : Date | string
  status : string = ''
  statusDescription : string = ''
  created : string = ''
  verified : string = ''
  approved : string = ''

  localPurchaseOrder! : ILocalPurchaseOrder

  supplier! : ISupplier

  noLocked = false

  localPurchaseOrders : ILocalPurchaseOrder[] = []

  detailId          : any
  detailItemCode        : string = ''
  detailItemName        : string = ''
  detailItemId : any = null
  detailQty  : number = 0

  itemNames : string[] = []

  //pharmacyToStoreDetails : IPharmacyToStoreRODetail[] = []

  filterRecords : string = ''
  filterOrders : string = ''


  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private router : Router,
    private msgBox : MsgBoxService) { }

  async ngOnInit(): Promise<void> {
    this.loadItemNames()
  }

  async loadOrders(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    this.spinner.show()
    await this.http.get<ILocalPurchaseOrder[]>(API_URL+'/local_purchase_orders', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.localPurchaseOrders = data!
      },
      error => {
        console.log(error)
        this.msgBox.showErrorMessage(error, '')
      }
    )
  }

  async requestNo(){
    this.clear()
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<any>(API_URL+'/local_purchase_orders/request_no', options)
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
        this.msgBox.showErrorMessage(error, '')
      }
    )
    this.localPurchaseOrder.localPurchaseOrderDetails = []
  }

  async saveOrder(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var order = {
      id  : this.id,
      no : this.no,
      supplier : {id : this.supplierId },
      validUntil : this.validUntil
    }
    this.spinner.show()
    await this.http.post<ILocalPurchaseOrder>(API_URL+'/local_purchase_orders/save', order, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.id         = data?.id
        this.no         = data!.no
        this.orderDate  = data!.orderDate
        this.validUntil = data!.validUntil
        this.status     = data!.status
        this.statusDescription = data!.statusDescription
        this.created    = data!.created
        this.verified   = data!.verified
        this.approved   = data!.approved

        this.supplier = data!.supplier

        this.supplierName = this.supplier.name

        this.localPurchaseOrder = data!

        
        this.msgBox.showSuccessMessage('Success')
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error, '')
      }
    )
  }

  

  async saveDetail(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var detail = {
      id                : this.detailId,
      localPurchaseOrder : {id : this.id},
      item          : {id : this.detailItemId},
      qty        : this.detailQty
    }
    this.spinner.show()
    await this.http.post(API_URL+'/local_purchase_orders/save_detail', detail, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.search(this.id)
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error, '')
      }
    )
  }

  async deleteDetail(detailId : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }

    var detail = {
      id : detailId,
      localPurchaseOrder : {id : this.id}
    }
    
    this.spinner.show()
    await this.http.post(API_URL+'/local_purchase_orders/delete_detail', detail, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.search(this.id)
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error, '')
      }
    )
  }

  async verifyOrder(){
    if(!window.confirm('Confirm verify order. Confirm?')){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var order = {
      id  : this.id,
      no : this.no
    }
    this.spinner.show()
    await this.http.post<ILocalPurchaseOrder>(API_URL+'/local_purchase_orders/verify', order, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.id         = data?.id
        this.no         = data!.no
        this.orderDate  = data!.orderDate
        this.validUntil = data!.validUntil
        this.status     = data!.status
        this.statusDescription = data!.statusDescription
        this.created    = data!.created
        this.verified   = data!.verified
        this.approved   = data!.approved

        this.supplier = data!.supplier

        this.supplierName = this.supplier.name

        this.localPurchaseOrder = data!

        this.msgBox.showSuccessMessage('Order verified successifuly')
      }
    )
    .catch(
      error => {
        console.log(error)
        this.msgBox.showErrorMessage(error, '')
      }
    )
  }

  async approveOrder(){
    if(!window.confirm('Confirm approve order. Confirm?')){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var order = {
      id  : this.id,
      no : this.no
    }
    this.spinner.show()
    await this.http.post<ILocalPurchaseOrder>(API_URL+'/local_purchase_orders/approve', order, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.id         = data?.id
        this.no         = data!.no
        this.orderDate  = data!.orderDate
        this.validUntil = data!.validUntil
        this.status     = data!.status
        this.statusDescription = data!.statusDescription
        this.created    = data!.created
        this.verified   = data!.verified
        this.approved   = data!.approved

        this.supplier = data!.supplier

        this.supplierName = this.supplier.name

        this.localPurchaseOrder = data!

        this.msgBox.showSuccessMessage('Order approved successifuly')
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error, '')
      }
    )
  }

  async submitOrder(){
    if(!window.confirm('Confirm submit order. Confirm?')){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var order = {
      id  : this.id,
      no : this.no
    }
    this.spinner.show()
    await this.http.post<ILocalPurchaseOrder>(API_URL+'/local_purchase_orders/submit', order, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.id         = data?.id
        this.no         = data!.no
        this.orderDate  = data!.orderDate
        this.validUntil = data!.validUntil
        this.status     = data!.status
        this.statusDescription = data!.statusDescription
        this.created    = data!.created
        this.verified   = data!.verified
        this.approved   = data!.approved

        this.supplier = data!.supplier

        this.supplierName = this.supplier.name

        this.localPurchaseOrder = data!

        this.msgBox.showSuccessMessage('Order submitted successifuly')
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error, '')
      }
    )
  }

  async loadItemNames(){
    this.itemNames = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<string[]>(API_URL+'/items/get_names', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        data?.forEach(element => {
          this.itemNames.push(element)
        })
      }
    )
    .catch(
      (error) => {
        this.msgBox.showErrorMessage(error, 'Could not load medicine names')
      }
    )
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
    this.orderDate! = new Date()
    this.validUntil!  = ''
    this.status     = ''
    this.statusDescription = ''
    this.created    = ''
    this.verified   = ''
    this.approved   = ''
    this.localPurchaseOrder!

    this.supplierId  =  null
    this.supplierCode  = ''
    this.supplierName  = ''
    this.supplierCodeAndName = ''
  }


  async searchOrder(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    this.spinner.show()
    await this.http.get<ILocalPurchaseOrder>(API_URL+'/local_purchase_orders/search_by_no?no='+this.no, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.id         = data?.id
        this.no         = data!.no
        this.orderDate  = data!.orderDate
        this.validUntil = data!.validUntil
        this.status     = data!.status
        this.statusDescription = data!.statusDescription
        this.created    = data!.created
        this.verified   = data!.verified
        this.approved   = data!.approved

        this.supplier = data!.supplier

        this.supplierName = this.supplier.name

        this.localPurchaseOrder = data!

        this.lock()
        console.log(data)
      },
      error => {
        console.log(error)
        this.msgBox.showErrorMessage(error, '')
      }
    )
  }

  async search(id : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    this.spinner.show()
    await this.http.get<ILocalPurchaseOrder>(API_URL+'/local_purchase_orders/search?id='+id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.id         = data?.id
        this.no         = data!.no
        this.orderDate  = data!.orderDate
        this.validUntil = data!.validUntil
        this.status     = data!.status
        this.statusDescription = data!.statusDescription
        this.created    = data!.created
        this.verified   = data!.verified
        this.approved   = data!.approved

        this.supplier = data!.supplier

        this.supplierName = this.supplier.name

        this.localPurchaseOrder = data!

        this.lock()
        console.log(data)
      },
      error => {
        console.log(error)
        this.msgBox.showErrorMessage(error, '')
      }
    )
  }

  

  async searchItem(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    if(this.detailItemCode != ''){
      this.spinner.show()
      await this.http.get<IItem>(API_URL+'/items/get_by_code?code='+this.detailItemCode, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.clearDetail()
          this.detailItemId = data!.id
          this.detailItemCode = data!.code
          this.detailItemName = data!.name
        },
        error => {
          console.log(error)
          this.msgBox.showErrorMessage(error, '')
        }
      )
    }else{
      this.spinner.show()
      await this.http.get<IMedicine>(API_URL+'/items/get_by_name?name='+this.detailItemName, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.clearDetail()
          this.detailItemId = data!.id
          this.detailItemCode = data!.code
          this.detailItemName = data!.name
        },
        error => {
          console.log(error)
          this.msgBox.showErrorMessage(error, '')
        }
      )
    }
    
  }

  clearDetail(){
    this.detailId = null
    this.detailItemId = null
    this.detailItemCode = ''
    this.detailItemName = ''
    this.detailQty = 0
  }


  supplierId : any =  null
  supplierCode : string = ''
  supplierName : string = ''
  supplierCodeAndName : string = ''
  suppliers : ISupplier[] = []
  async loadSuppliersLike(value : string){
    this.suppliers = []
    if(value.length < 2){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    await this.http.get<ISupplier[]>(API_URL+'/suppliers/load_suppliers_like?name_like='+value, options)
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.suppliers = data!
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error, '')
      }
    )
  }

  async getSupplier(id : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.suppliers = []
    this.spinner.show()
    await this.http.get<ISupplier>(API_URL+'/suppliers/get?id='+id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      (data) => {
        this.supplierId = data?.id
        this.supplierCode = data!.code
        this.supplierName = data!.name
        this.supplierCodeAndName = data!.code +' | '+ data!.name
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error, '')
        console.log(error)
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
