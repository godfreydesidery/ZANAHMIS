import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { DataService } from './services/data.service';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zana-hmis';
  isLoggedIn : boolean = false;

  userName : string = ''




  constructor(private router : Router,
    private http  : HttpClient,
    private auth : AuthService,
    private titleService: Title,
    private spinner: NgxSpinnerService,
    private data : DataService) { }

  ngOnInit(): void {
    this.ping()
    this.loadCompanyName()

    this.router.navigate([''])//Navigates to home if url is entered on address bar
    var currentUser = null
    if(localStorage.getItem('user-name') != null){
      this.userName = localStorage.getItem('user-name')!
    }else{
      this.userName = ''
    }
    if(localStorage.getItem('current-user') != null){
      currentUser = localStorage.getItem('current-user')
    }
    if(currentUser != null){
      this.isLoggedIn = true
    }else{
      this.isLoggedIn = false
    }
    this.getLogo()
  }

  async ping() {   
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    await this.http.get(API_URL+'/ping', options)
    .toPromise()
    .then(
      ()=>{}
    )
    .catch(
      ()=>{}
    )
  }

  async loadDay(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    await this.http.get<IDayData>(API_URL+'/days/get_bussiness_date', options)
    .toPromise()
    .then(
      data => {
        localStorage.setItem('system-date', data?.bussinessDate!+'')        
      }
    )
    .catch(error => {})
  }

  async loadCompanyName(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    await this.http.get<ICompanyData>(API_URL+'/company_profile/get', options)
    .toPromise()
    .then(
      data => {
        localStorage.setItem('company-name', data?.companyName!+'')        
      }
    )
    .catch(error => {})
  }

  public async logout() : Promise<any>{
    localStorage.removeItem('current-user')
    alert('You have logged out!')
    await this.router.navigate([''])
    window.location.reload()
  }

  selectedFile!: File;
  retrievedImage!: any;
  base64Data: any;
  retrieveResponse: any;
  message!: string;
  imageName: any;
  async getLogo() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    //this.spinner.show()
    await this.http.get(API_URL+'/company_profile/get_logo')
    //.pipe(finalize(() => this.spinner.hide()))
    .toPromise()
      .then(
        res => {
          this.retrieveResponse = res
          this.base64Data = this.retrieveResponse.logo
          this.retrievedImage = 'data:image/png;base64,'+this.base64Data
          console.log(this.retrievedImage)
        }
      )
      .catch(error => {
        console.log(error)
      })  
      
    }
  
}

interface IDayData{
  bussinessDate : String
}

interface ICompanyData{
  companyName : String
}