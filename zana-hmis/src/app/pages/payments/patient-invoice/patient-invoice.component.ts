import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IPatientBill } from 'src/app/domain/patient-bill';
import { IPatientInvoice } from 'src/app/domain/patient-invoice';
import { IPatientInvoiceDetail } from 'src/app/domain/patient-invoice-detail';
import { ReceiptItem } from 'src/app/domain/receipt-item';
import { AgePipe } from 'src/app/pipes/age.pipe';
import { ShowDateTimePipe } from 'src/app/pipes/date_time.pipe';
import { SearchFilterPipe } from 'src/app/pipes/search-filter-pipe';
import { ShowTimePipe } from 'src/app/pipes/show_time.pipe';
import { ShowUserPipe } from 'src/app/pipes/show_user.pipe';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { PosReceiptPrinterService } from 'src/app/services/pos-receipt-printer.service';
import { environment } from 'src/environments/environment';
import { IBill } from '../lab-test-payment/lab-test-payment.component';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-patient-invoice',
  templateUrl: './patient-invoice.component.html',
  styleUrls: ['./patient-invoice.component.scss'],
  standalone : true,
  imports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchFilterPipe,
    AgePipe,
    ShowUserPipe,
    ShowDateTimePipe,
    ShowTimePipe,
    RouterLink
  ], 
})
export class PatientInvoiceComponent {

  invoiceId : any = null

  invoice! : IPatientInvoice

  constructor(private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private router : Router,
    private msgBox : MsgBoxService,
    private printer : PosReceiptPrinterService) { }

  async ngOnInit(): Promise<void> {

    this.invoiceId = localStorage.getItem('patient-invoice-id')
    localStorage.removeItem('patient-invoice-id')
    this.loadPatientInvoice(this.invoiceId)

  }

  async loadPatientInvoice(id : any){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IPatientInvoice>(API_URL+'/patients/get_patient_invoice?id='+id, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.invoice = data!
        console.log(data)
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
        console.log(error)
      }
    )
  }

  bills : IPatientBill[] = []
  total : number = 0
  amountReceived : number = 0
  listBill(detail : IPatientInvoiceDetail){

    

    if(detail.checked === true){
      var present : boolean = false
      this.bills.forEach(element => {
        if(element.id === detail.patientBill.id){
          present = true
        }
      })
      if(present === false){
        this.bills.push(detail.patientBill)
      }
    }else if(detail.checked === false){
      var tempBills : IPatientBill[] = []
      this.bills.forEach(element => {
        if(element.id != detail.patientBill.id){
          tempBills.push(element)
        }
      })
      this.bills = tempBills      
    }

    this.total = 0
    this.amountReceived = 0
    this.invoice.patientInvoiceDetails.forEach(element => {
      if(element.patientBill.status === 'VERIFIED'){
        this.bills.forEach(e => {
          if(e.id === element.patientBill.id){
            element.checked = true
            this.total = this.total + element.patientBill.amount
          }
        })
      }else{
        element.checked = false
      }
    })
  }

  async confirmBillsPayment(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }

    this.spinner.show()
    await this.http.post<IPatientBill>(API_URL+'/bills/confirm_bills_payment?total_amount='+this.total, this.bills, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.msgBox.showSuccessMessage('Payment successiful')
      }
    )
    .catch(
      error => {
        console.log(error)
        this.msgBox.showErrorMessage('Could not confirm payment')
      }
    )
  }

  printReceipt(){
    var items : ReceiptItem[] = []
    var item : ReceiptItem

    this.bills.forEach(element => {
      item = new ReceiptItem()
      item.code = element.id
      item.name = element.description
      item.amount = element.amount
      item.qty = element.qty
      items.push(item)
    })

    

    this.printer.print(items, 'NA', this.total, this.invoice.patient)

  }

}
