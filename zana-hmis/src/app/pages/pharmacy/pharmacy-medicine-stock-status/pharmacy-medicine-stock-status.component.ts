import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IPharmacyMedicine } from 'src/app/domain/pharmacy-medicine';
import { AgePipe } from 'src/app/pipes/age.pipe';
import { SearchFilterPipe } from 'src/app/pipes/search-filter-pipe';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-pharmacy-medicine-stock-status',
  templateUrl: './pharmacy-medicine-stock-status.component.html',
  styleUrls: ['./pharmacy-medicine-stock-status.component.scss'],
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
export class PharmacyMedicineStockStatusComponent {

  id : any = null
  pharmacyMedicineCode : string = ''
  pharmacyMedicineName : string = ''
  pharmacyMedicineStock : number = 0



  pharmacyName = localStorage.getItem('selected-pharmacy-name')

  pharmacyMedicines : IPharmacyMedicine[] = []

  filterRecords : string = ''

  constructor(private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private router : Router,
    private msgBox : MsgBoxService) { }

  async ngOnInit(): Promise<void> {
    await this.loadPharmacyMedicines()
  }

  async loadPharmacyMedicines(){    
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    this.spinner.show()
    await this.http.get<IPharmacyMedicine[]>(API_URL+'/pharmacies/get_pharmacy_medicine_list?pharmacy_name='+this.pharmacyName, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        console.log(data)
        this.pharmacyMedicines = []
        data?.forEach(element => {
          this.pharmacyMedicines.push(element)
        })
        
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
        console.log(error)
      }
    )
  }

  setValues(id : any, code : string, name : string, stock : number){
    this.id = id
    this.pharmacyMedicineCode = code
    this.pharmacyMedicineName = name
    this.pharmacyMedicineStock = stock
  }

  async updateStock(){    
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }

    var pm = {
      id : this.id,
      stock : this.pharmacyMedicineStock
    }
    this.spinner.show()
    await this.http.post(API_URL+'/pharmacies/update_stock', pm, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.msgBox.showSuccessMessage('Updated successifully')
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
        console.log(error)
      }
    )
    this.loadPharmacyMedicines()
  }

}
