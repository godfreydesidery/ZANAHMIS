import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { DataService } from './services/data.service';
import { PosReceiptPrinterService } from './services/pos-receipt-printer.service';

import * as pdfMake from 'pdfmake/build/pdfmake';
import { ReceiptItem } from './domain/receipt-item';
var pdfFonts = require('pdfmake/build/vfs_fonts.js'); 
const fs = require('file-saver');

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
    private data : DataService,
    private printer : PosReceiptPrinterService) { (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs; }

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

    print1() {

      const docDefinition : any = {
        content : [
          this.pos()
        ]
      }
      const win = window.open('', "tempWinForPdf");
       
    pdfMake.createPdf(docDefinition).print({}, win);
    win!.onfocus = function () { setTimeout(function () { win!.close(); }, 10000); }

    }




    pos() : string{

var COMPANYNAME : string = 'Zana health'




      var space : String = ''
            for (let i = 1; i <= (40 - COMPANYNAME.length)/ 2; i++) {
              space = space + " "
            }
                
            var companyName : string = space + COMPANYNAME
            space = ""
            
            
            var email : string = space + "email"

            var fDateTime : string
            var strOutputData : string = ""
            var CRLF
            var ESC

            fDateTime = Date.now.toString() 

            CRLF = 'Chr(13)' + 'Chr(10)'
            ESC = 'Chr(&H1B)'



            strOutputData = strOutputData + companyName + CRLF


            strOutputData = strOutputData + email + CRLF + CRLF
            strOutputData = strOutputData + "       ***  Sales Receipt  ***" + CRLF

            strOutputData = strOutputData + "TIN:        " + CRLF
            strOutputData = strOutputData + "VRN:        " + CRLF
            strOutputData = strOutputData + "Till No:    " + CRLF
            strOutputData = strOutputData + "Receipt No: " + CRLF

            strOutputData = strOutputData + CRLF

            strOutputData = strOutputData + "CODE        QTY   PRICE@     AMOUNT" + CRLF
            strOutputData = strOutputData + "DESCRIPTION" + CRLF
            strOutputData = strOutputData + "====================================" + CRLF

            /*For i As Integer = 0 To descr.Length - 1
                strOutputData = strOutputData + itemCode(i) + " x " + qty(i) + "  " + price(i) + "  " + amount(i) + CRLF
                strOutputData = strOutputData + descr(i) + CRLF
            Next*/
            strOutputData = strOutputData + "------------------------------------" + CRLF

            strOutputData = strOutputData + "Sub Total                   " + CRLF
            strOutputData = strOutputData + "Tax                         " + CRLF
            strOutputData = strOutputData + "Total Amount                " + CRLF
            strOutputData = strOutputData + "====================================" + CRLF
            strOutputData = strOutputData + "Cash              " + CRLF
            strOutputData = strOutputData + "Balance           " + CRLF
            strOutputData = strOutputData + "====================================" + CRLF
            strOutputData = strOutputData + "        You are Welcomed !" + CRLF
            strOutputData = strOutputData + "Sale Date&Time : " + fDateTime + CRLF + CRLF
            strOutputData = strOutputData + CRLF
            strOutputData = strOutputData + "  Served by: " + CRLF
            strOutputData = strOutputData + '(Chr(&H1D) & "V" & Chr(66) & Chr(0))'




return strOutputData




    }

    print(){
      var items : ReceiptItem[] = []
      var item : ReceiptItem = new ReceiptItem()
      item.code = 'testcode'
      item.name = 'test name'
      item.price = 1000
      item.qty = 2

      items.push(item)

      this.printer.print(items, '5342', 5000)

    }









    
  
}

interface IDayData{
  bussinessDate : String
}

interface ICompanyData{
  companyName : String
}

function jspmWSStatus() {
  throw new Error('Function not implemented.');
}
