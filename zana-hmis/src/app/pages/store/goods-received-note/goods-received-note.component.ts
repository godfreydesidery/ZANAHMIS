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
import { IGoodsReceivedNoteDetail } from 'src/app/domain/goods-received-note-detail';
import { IGoodsReceivedNoteDetailBatch } from 'src/app/domain/goods-received-note-detail-batch';
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

  currentDetail : IGoodsReceivedNoteDetail | undefined
  batchNo : string = ''
  manufacturedDate : Date | undefined
  expiryDate : Date | undefined
  currentBatchQty : number = 0

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

  async loadGRNsByStore(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    this.spinner.show()
    await this.http.get<IGoodsReceivedNote[]>(API_URL+'/goods_received_notes?store_id='+this.selectedStoreId, options)
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

  setBatchValues(detail : IGoodsReceivedNoteDetail){
    this.currentDetail = detail
    this.batchNo = ''
    this.manufacturedDate = undefined
    this.expiryDate = undefined
    this.currentBatchQty = 0
  }

  async saveBatch(){

    if(this.currentBatchQty <= 0){
      this.msgBox.showSimpleErrorMessage('Invalid quantity value. Quantity must be more than zero')
      return
    }

    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }


    var batch = {
      no : this.batchNo,
      goodsReceivedNoteDetail : {id : this.currentDetail?.id},
      manufacturedDate : this.manufacturedDate,
      expiryDate : this.expiryDate,
      qty : this.currentBatchQty
    }

    this.spinner.show()
    await this.http.post<IGoodsReceivedNoteDetail>(API_URL+'/goods_received_notes/add_batch', batch, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {

      }
    )
    .catch(error => {
      this.msgBox.showErrorMessage(error, '')
    })
    this.search(this.id)
  }

  async deleteBatch(b : IGoodsReceivedNoteDetailBatch){

    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }

    var batch = {
      id : b.id
    }

    this.spinner.show()
    await this.http.post<IGoodsReceivedNoteDetail>(API_URL+'/goods_received_notes/delete_batch', batch, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {

      }
    )
    .catch(error => {
      this.msgBox.showErrorMessage(error, '')
    })
    this.search(this.id)
  }


  async create(){
    if(this.lpoNo === ''){
      this.msgBox.showSimpleErrorMessage('Please enter LPO No')
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

  async saveGRNDetailReceivedQty(id : any, orderedQty : number, receivedQty : number){
    if(receivedQty < 0){
      this.msgBox.showSimpleErrorMessage('Can not save. Qty must not be negative')
      this.search(this.id)
      return
    }
    if(receivedQty > orderedQty){
      this.msgBox.showSimpleErrorMessage('Can not save. Received Qty can not exceed ordered qty')
      this.search(this.id)
      return
    }

    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }

    var detail = {
      id : id,
      orderedQty : orderedQty,
      receivedQty : receivedQty,
      goodsReceivedNote : {id : this.id}
    }

    this.spinner.show()
    await this.http.post<IGoodsReceivedNoteDetail>(API_URL+'/goods_received_notes/save_detail_qty', detail, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.goodsReceivedNote.goodsReceivedNoteDetails.forEach(element => {
          if(element.id === data?.id){
            element.receivedQty = data!.receivedQty
            element.status = data!.status
          }
        })
        this.msgBox.showSuccessMessage('Recorded')
      },
      error => {
        this.msgBox.showErrorMessage(error, '')
        this.search(this.id)
      }
    )
  }

  async verifyGRNDetailReceivedQty(id : any, orderedQty : number, receivedQty : number){
    if(receivedQty < 0){
      this.msgBox.showSimpleErrorMessage('Can not verify. Qty must not be negative')
      this.search(this.id)
      return
    }
    if(receivedQty > orderedQty){
      this.msgBox.showSimpleErrorMessage('Can not verify. Received Qty can not exceed ordered qty')
      this.search(this.id)
      return
    }
    if(!window.confirm('Verify received qty. Confirm?')){
      return
    }

    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }

    var detail = {
      id : id,
      orderedQty : orderedQty,
      receivedQty : receivedQty,
      goodsReceivedNote : {id : this.id}
    }

    this.spinner.show()
    await this.http.post<IGoodsReceivedNoteDetail>(API_URL+'/goods_received_notes/verify_detail_qty', detail, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.goodsReceivedNote.goodsReceivedNoteDetails.forEach(element => {
          if(element.id === data?.id){
            element.receivedQty = data!.receivedQty
            element.status = data!.status
          }
        })
        this.msgBox.showSuccessMessage('Verified')
      },
      error => {
        this.msgBox.showErrorMessage(error, '')
      }
    )
    this.search(this.id)
  }

  async approveGRN(){

    if(!window.confirm('Approve GRN. Confirm?')){
      return
    }

    this.goodsReceivedNote.goodsReceivedNoteDetails.forEach(element => {
      if(element.status != 'VERIFIED'){
        this.msgBox.showSimpleErrorMessage('Please verify all items before approving')
        return
      }
    })

    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }

    this.spinner.show()
    await this.http.post<IGoodsReceivedNote>(API_URL+'/goods_received_notes/approve', this.goodsReceivedNote, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.search(this.id)
        this.msgBox.showSuccessMessage('Approved successifully')
      },
      error => {
        this.msgBox.showErrorMessage(error, '')
        this.search(this.id)
      }
    )

    

  }
}
