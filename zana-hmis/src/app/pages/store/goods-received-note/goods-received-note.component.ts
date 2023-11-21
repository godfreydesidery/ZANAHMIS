import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AgePipe } from 'src/app/pipes/age.pipe';
import { SearchFilterPipe } from 'src/app/pipes/search-filter-pipe';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IClinic } from 'src/app/domain/clinic';
import { IClinician } from 'src/app/domain/clinician';
import { IItem } from 'src/app/domain/item';
import { IItemMedicineCoefficient } from 'src/app/domain/item-medicine-coefficient';
import { IMedicine } from 'src/app/domain/medicine';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { environment } from 'src/environments/environment';
import { ILocalPurchaseOrder } from 'src/app/domain/local-purchase-order';
import { ISupplier } from 'src/app/domain/supplier';
import { IGoodsReceivedNote } from 'src/app/domain/goods-received-note';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
var pdfFonts = require('pdfmake/build/vfs_fonts.js'); 

const API_URL = environment.apiUrl;


@Component({
  selector: 'app-goods-received-note',
  templateUrl: './goods-received-note.component.html',
  styleUrls: ['./goods-received-note.component.scss'],
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
export class GoodsReceivedNoteComponent {

  id : any = null
  no : string = ''
  status : string = ''
  statusDescription : string = ''
  created : string = ''
  verified : string = ''
  approved : string = ''

  localPurchaseOrder! : ILocalPurchaseOrder

  supplier! : ISupplier

  noLocked = false

  localPurchaseOrders : ILocalPurchaseOrder[] = []

  goodsReceivedNote! : IGoodsReceivedNote
  goodsReceivedNotes : IGoodsReceivedNote[] = []

  itemNames : string[] = []

  //pharmacyToStoreDetails : IPharmacyToStoreRODetail[] = []

  filterRecords : string = ''
  filterOrders : string = ''

  selectedStoreId : any
  selectedStoreCode : string = ''
  selectedStoreName : string = ''

  lpoNo : string = ''

  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private router : Router,
    private msgBox : MsgBoxService,
    private data : DataService) 
    {(window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;}

  async ngOnInit(): Promise<void> {
    if(localStorage.getItem('selected-store-id') != null){
      this.selectedStoreId = localStorage.getItem('selected-store-id')
    }
    if(localStorage.getItem('selected-store-code') != null){
      this.selectedStoreCode = localStorage.getItem('selected-store-code')!.toString()
    }
    if(localStorage.getItem('selected-store-name') != null){
      this.selectedStoreName = localStorage.getItem('selected-store-name')!.toString()
    }  
  }

  async loadGRNs(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    this.spinner.show()
    await this.http.get<IGoodsReceivedNote[]>(API_URL+'/goods_received_notes', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.goodsReceivedNotes = data!
      },
      error => {
        console.log(error)
        this.msgBox.showErrorMessage(error, '')
      }
    )
  }


  async create(){
    if(this.lpoNo === ''){
      this.msgBox.showErrorMessage3('Please enter LPO No')
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var localPurchaseOrder = {
      no : this.lpoNo,
      store : {id : this.selectedStoreId}
    }
    this.spinner.show()
    await this.http.post<IGoodsReceivedNote>(API_URL+'/goods_received_notes/create', localPurchaseOrder, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.id         = data?.id
        this.no         = data!.no
        this.status     = data!.status
        this.statusDescription = data!.statusDescription
        this.created    = data!.created
        this.verified   = data!.verified
        this.approved   = data!.approved

        this.goodsReceivedNote = data!

        
        this.msgBox.showSuccessMessage('Success')
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error, '')
      }
    )
  }

  clear(){
    this.id = null

    this.lpoNo = ''
  }

  async search(id : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    this.spinner.show()
    await this.http.get<IGoodsReceivedNote>(API_URL+'/goods_received_notes/search?id='+id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.id         = data?.id
        this.no         = data!.no
        this.status     = data!.status
        this.statusDescription = data!.statusDescription
        this.created    = data!.created
        this.verified   = data!.verified
        this.approved   = data!.approved

        this.lpoNo = data!.localPurchaseOrder?.no

        this.goodsReceivedNote = data!

        this.lock()
        console.log(data)
      },
      error => {
        console.log(error)
        this.msgBox.showErrorMessage(error, '')
      }
    )
  }

  lock(){
    this.noLocked = true

  }
}
