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


  detailId          : any
  detailItemCode        : string = ''
  detailItemName        : string = ''
  detailItemId : any = null
  detailItemCodeAndName : string = ''
  detailQty  : number = 0

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

  saveDetail(){
    
  }

  locked : boolean = false

  

  

  

  clear(){
    this.detailItemId = null
    this.detailItemCode = ''
    this.detailItemName = ''
    this.detailItemCodeAndName = ''
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

