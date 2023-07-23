import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-lab-test-type-range',
  templateUrl: './lab-test-type-range.component.html',
  styleUrls: ['./lab-test-type-range.component.scss']
})
export class LabTestTypeRangeComponent implements OnInit {
  id          : any = null
  name        : string = ''
  active      : boolean = true

  labTestType! : ILabTestType

  labTestTypeRanges : ILabTestTypeRange[] = []

  labTestTypeNames : string[] = []

  labTestTypeName : string = ''

  constructor(
    private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadLabTestTypeRanges()
    this.loadLabTestTypeNames()
  }

  public async saveLabTestTypeRange(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    var labTestTypeRange = {
      id          : this.id,
      name        : this.name,
      labTestType : { name : this.labTestTypeName},
      active      : true
    }
    if(this.id == null || this.id == ''){
      //save a new labTestTypeRange
      this.spinner.show()
      await this.http.post<ILabTestTypeRange>(API_URL+'/lab_test_type_ranges/save', labTestTypeRange, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          this.name = data!.name
          this.active       = data!.active
          alert('Range created successifully')
          this.loadLabTestTypeRanges()
          
        }
      )
      .catch(
        error => {
          alert('Could not create range')
        }
      )

    }else{
      //update an existing clinic
      this.spinner.show()
      await this.http.post<ILabTestTypeRange>(API_URL+'/lab_test_type_ranges/save', labTestTypeRange, options)
      .pipe(finalize(() => this.spinner.hide()))
      .toPromise()
      .then(
        data => {
          this.id           = data?.id
          this.name = data!.name
          this.active       = data!.active
          alert('Range updated successifully')
          this.loadLabTestTypeRanges()
        }
      )
      .catch(
        error => {
          alert('Could not update range')
        }
      )
    }
    this.clear()
  }

  async loadLabTestTypeRanges(){
    this.labTestTypeRanges = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<ILabTestTypeRange[]>(API_URL+'/lab_test_type_ranges', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.labTestTypeRanges.push(element)
        })
      }
    )
    .catch(
      error => {
        alert('Could not load insurance plans')
      }
    )
  }

  clear(){
    this.id = null
    this.name = ''
    this.labTestTypeName = ''
    this.active = false
  }

  async getLabTestTypeRange(key: string) {
    if(key == ''){
      return
    }
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<ILabTestTypeRange>(API_URL+'/lab_test_type_ranges/get?id='+key, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data=>{
        this.id           = data?.id
          this.name = data!.name
          this.labTestTypeName = data!.labTestType.name
          this.active       = data!.active
      }
    )
    .catch(
      error=>{
        console.log(error)        
        alert('Could not find range')
      }
    )
  }

  async loadLabTestTypeNames(){
    this.labTestTypeNames = []
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<string[]>(API_URL+'/lab_test_types/get_names', options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        data?.forEach(element => {
          this.labTestTypeNames.push(element)
        })
      }
    )
    .catch(
      error => {
        alert('Could not load lab tests')
      }
    )
  }

}

export interface ILabTestTypeRange{
  id     : any
  name        : string
  labTestType : ILabTestType
  active : boolean
}

export interface ILabTestType{
  id     : any
  code   : string
  name        : string
  description : string
  active : boolean
}