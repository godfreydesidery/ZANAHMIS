import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth.service';
import { MsgBoxService } from 'src/app/services/msg-box.service';

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


  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private router : Router,
    private msgBox : MsgBoxService) { }

  async ngOnInit(): Promise<void> {
    
  }

  saveOrder(){

  }

  saveDetail(){

  }

  postOrder(){

  }

  cancelOrder(){
    
  }
}
