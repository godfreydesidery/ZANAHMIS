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
import { ILabTestType } from 'src/app/domain/lab-test-type';
import { ILabTestTypeRange } from 'src/app/domain/lab-test-type-range';
import { ISupplierItemPrice } from 'src/app/domain/supplier-item-price';
import { ISupllierItemPriceList } from 'src/app/domain/supplier-item-price-list';

const API_URL = environment.apiUrl;


@Component({
  selector: 'app-supplier-item-price-list',
  templateUrl: './supplier-item-price-list.component.html',
  styleUrls: ['./supplier-item-price-list.component.scss'],
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
export class SupplierItemPriceListComponent {
  
  name        : string = ''
  active      : boolean = true

  supplier! : ISupplier

  suppliers : ISupplier[] = []

  supplierItemPriceList! : ISupllierItemPriceList

  //supplierItemPrice : ISupplierItemPrice[] = []

  //supplierName : string = ''

  filterRecords : string = ''
  filterItems : string = ''


  detailId     : any = null
  detailItemId : any = null
  detailItemCode : string = ''
  detailItemName : string = ''
  
  detailItemCodeAndName : string = ''
  detailPrice : number = 0
  detailTerms : string =''

  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private spinner : NgxSpinnerService,
    private msgBox : MsgBoxService
  ) { }

  ngOnInit(): void {
    this.loadSuppliers()
    //this.loadLabTestTypeRanges()
  }

  async loadSuppliers(){
    this.suppliers = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<ISupplier[]>(API_URL+'/suppliers', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.suppliers = data!
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error, 'Could not Suppliers')
      }
    )
  }

  supplierItemPrice : ISupplierItemPrice[] = []
  async getSupplierItems(supplierId : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<ISupllierItemPriceList>(API_URL+'/supplier_item_prices/get_item_price_list_by_supplier?supplier_id='+supplierId, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.supplierItemPriceList = data!
          this.supplier = this.supplierItemPriceList.supplier
          console.log(this.supplierItemPriceList)
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
    var supplierItemPrice = {
      id: this.detailId,
      price: this.detailPrice,
      terms: this.detailTerms,
      supplier: {id : this.supplier.id},
      item: {id : this.detailItemId, code : this.detailItemCode}
    }
    this.spinner.show()
    await this.http.post<ISupllierItemPriceList>(API_URL+'/supplier_item_prices/save', supplierItemPrice, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.supplierItemPriceList = data!
        this.supplier= this.supplierItemPriceList.supplier
        console.log(this.supplierItemPriceList)
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error, '')
      }
    )
  }

  locked : boolean = false

  

  

  

  clear(){
    this.detailId = null
    this.detailItemId = null
    this.detailItemCode = ''
    this.detailItemName = ''
    this.detailItemCodeAndName = ''
    this.detailPrice = 0
    this.detailTerms = ''
  }


  
  items : IItem[] = []
  async loadItemsLike(value : string){
    this.items = []
    if(value.length < 3){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    await this.http.get<IItem[]>(API_URL+'/items/load_items_like?name_like='+value, options)
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.items = data!
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error, '')
      }
    )
  }


  item! : IItem
  async getItem(id : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.items = []
    this.spinner.show()
    await this.http.get<IItem>(API_URL+'/items/get?id='+id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      (data) => {
        this.detailItemId = data?.id
        this.detailItemCode = data!.code
        this.detailItemName = data!.name
        this.detailItemCodeAndName = data!.code +' | '+ data!.name
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error, '')
        console.log(error)
      }
    )
  }

  async getDetail(id : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    this.clear()
    await this.http.get<ISupplierItemPrice>(API_URL+'/supplier_item_prices/get?id='+id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      (data) => {
        this.detailId = data!.id
        this.detailItemId = data?.item.id
        this.detailItemCode = data!.item.code
        this.detailItemName = data!.item.name
        this.detailPrice = data!.price
        this.detailTerms = data!.terms
        this.detailItemCodeAndName = this.detailItemCode +' | '+ this.detailItemName
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error, '')
        console.log(error)
      }
    )

  }

  async deleteDetail(id : any, itemId : any){
    if(!window.confirm('Deleting item. Confirm?')){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }

    var supplierItemPrice = {
      id: id,
      item: {id : itemId}
    }
    this.spinner.show()
    this.clear()
    await this.http.post(API_URL+'/supplier_item_prices/delete', supplierItemPrice, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      (data) => {
        this.msgBox.showSuccessMessage('Deleted')
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error, '')
        console.log(error)
      }
    )
    this.getSupplierItems(this.supplier.id)
  }

  

  

  
  public grant(privilege : string[]) : boolean{
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

