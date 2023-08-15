import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IClinic } from 'src/app/domain/clinic';
import { IClinician } from 'src/app/domain/clinician';
import { IItem } from 'src/app/domain/item';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-item-register',
  templateUrl: './item-register.component.html',
  styleUrls: ['./item-register.component.scss']
})
export class ItemRegisterComponent {

  id                  : any
	code                : string = ''
  barcode             : string = ''
	name         : string = ''
	shortName    : string = ''
	commonName          : string = ''
	vat                 : number = 0
	uom                 : string = ''
	packSize            : number = 0
	stock               : number = 0
	minimumInventory    : number = 0
	maximumInventory    : number = 0
	defaultReorderQty   : number = 0
	defaultReorderLevel : number = 0
	active              : boolean = false
	ingredients         : string = ''


  item! : IItem

  names : string[] = []


  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private spinner : NgxSpinnerService,
    private msgBox : MsgBoxService
  ) {}

  ngOnInit(): void {
    this.loadItemNames()
  }


  public async saveItem(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    
    var item = {
      id                  : this.id,
      code                : this.code,
      barcode             : this.barcode,
      name         : this.name,
      shortName    : this.shortName,
      commonName          : this.commonName,
      vat                 : this.vat,
      uom                 : this.uom,
      packSize            : this.packSize,
      stock               : this.stock,
      minimumInventory    : this.minimumInventory,
      maximumInventory    : this.maximumInventory,
      defaultReorderQty   : this.defaultReorderQty,
      defaultReorderLevel : this.defaultReorderLevel,
      active              : this.active,
      ingredients         : this.ingredients
    }
    if(this.id == null || this.id == ''){
      //save a new clinic
      this.spinner.show()
      await this.http.post<IItem>(API_URL+'/items/save', item, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id                 = data?.id
          this.code               = data!.code
          this.barcode            = data!.barcode
          this.name        = data!.name
          this.shortName   = data!.shortName
          this.commonName         = data!.commonName
          this.vat                = data!.vat
          this.uom                = data!.uom
          this.packSize           = data!.packSize
          this.stock              = data!.stock
          this.minimumInventory   = data!.minimumInventory
          this.maximumInventory   = data!.maximumInventory
          this.defaultReorderQty  = data!.defaultReorderQty
          this.defaultReorderLevel = data!.defaultReorderLevel
          this.active             = data!.active
          this.ingredients        = data!.ingredients
          this.msgBox.showSuccessMessage('Item created successifully')
        }
      )
      .catch(
        error => {
          this.msgBox.showErrorMessage('Could not create item')
        }
      )

    }else{
      //update an existing item
      this.spinner.show()
      await this.http.post<IItem>(API_URL+'/items/save', item, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id                 = data?.id
          this.code               = data!.code
          this.barcode            = data!.barcode
          this.name        = data!.name
          this.shortName   = data!.shortName
          this.commonName         = data!.commonName
          this.vat                = data!.vat
          this.uom                = data!.uom
          this.packSize           = data!.packSize
          this.stock              = data!.stock
          this.minimumInventory   = data!.minimumInventory
          this.maximumInventory   = data!.maximumInventory
          this.defaultReorderQty  = data!.defaultReorderQty
          this.defaultReorderLevel = data!.defaultReorderLevel
          this.active             = data!.active
          this.ingredients        = data!.ingredients
          this.msgBox.showSuccessMessage('Item updated successifully')
        }
      )
      .catch(
        error => {
          this.msgBox.showErrorMessage('Could not update item')
        }
      )
    }
  }

  clear(){
    this.id                 = null
    this.code               = ''
    this.barcode            = ''
    this.name        = ''
    this.shortName   = ''
    this.commonName         = ''
    this.vat                = 0
    this.uom                = ''
    this.packSize           = 0
    this.stock              = 0
    this.minimumInventory   = 0
    this.maximumInventory   = 0
    this.defaultReorderQty  = 0
    this.defaultReorderLevel = 0
    this.active             = false
    this.ingredients        = ''
  }

  async loadItemNames(){
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
        this.names = []
        data?.forEach(element => {
          this.names.push(element)
        })
      },
      error => {
        console.log(error)
        this.msgBox.showErrorMessage('Could not load item names')
      }
    )
  }
}
