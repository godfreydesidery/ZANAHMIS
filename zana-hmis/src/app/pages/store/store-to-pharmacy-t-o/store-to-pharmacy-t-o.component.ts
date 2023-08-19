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
  selector: 'app-store-to-pharmacy-t-o',
  templateUrl: './store-to-pharmacy-t-o.component.html',
  styleUrls: ['./store-to-pharmacy-t-o.component.scss']
})
export class StoreToPharmacyTOComponent {

  //localStorage.setItem('store-to-pharmacy-t-o-id', data?.id)

  id : any

  storeToPharmacyTO! : IStoreToPharmacyTO

  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private router : Router,
    private msgBox : MsgBoxService) { }

  async ngOnInit(): Promise<void> {
    this.id = localStorage.getItem('store-to-pharmacy-t-o-id')
    localStorage.removeItem('store-to-pharmacy-t-o-id')
    this.loadCurrentTransferOrder(this.id)
  }

  async loadCurrentTransferOrder(id : any){
    if(id === null){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    this.spinner.show()
    await this.http.get<IStoreToPharmacyTO>(API_URL+'/store_to_pharmacy_t_os/get?id='+id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.storeToPharmacyTO = data!
        console.log(data)
      },
      error => {
        console.log(error)
        this.msgBox.showErrorMessage(error['error'])
      }
    )
  }

}
