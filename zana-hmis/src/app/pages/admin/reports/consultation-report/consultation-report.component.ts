import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth.service';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { environment } from 'src/environments/environment';
import { Workbook } from 'exceljs';
import { formatDate } from '@angular/common';
import { DataService } from 'src/app/services/data.service';

import { HttpHeaders } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { IPatient } from 'src/app/domain/patient';


import * as pdfMake from 'pdfmake/build/pdfmake';
import { IConsultation } from 'src/app/domain/consultation';
import { ShowDateOnlyPipe } from 'src/app/pipes/date.pipe';
var pdfFonts = require('pdfmake/build/vfs_fonts.js'); 
const fs = require('file-saver');

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-consultation-report',
  templateUrl: './consultation-report.component.html',
  styleUrls: ['./consultation-report.component.scss']
})
export class ConsultationReportComponent {

  
  logo!    : any
  documentHeader! : any
  address  : any 

  from! : Date
  to!   : Date


  report : string[] = []

  filterRecords : string = ''

  consultations : IConsultation[] = []

  startDate! : Date
  endDate! : Date



  constructor(
    //private shortcut : ShortCutHandlerService,
              private auth : AuthService,
              private http : HttpClient,
              private modalService: NgbModal,
              private spinner: NgxSpinnerService,
              private msgBox : MsgBoxService,
              private data : DataService,
              
  ) {(window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;}


  async ngOnInit(): Promise<void> {
    
  }

  async loadConsultationReport(from : Date, to : Date){   
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }

    if(from === undefined || to === undefined){
      this.msgBox.showErrorMessage('Could not run. Please select date range')
      return
    }

    if(from > to){
      this.msgBox.showErrorMessage('Could not run. Start date must be earlier or equal to end date')
      return
    }

    var args = {
      from : from,
      to   : to
    }

    this.spinner.show()
    await this.http.post<IConsultation[]>(API_URL+'/reports/consultation_report', args, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        
        this.consultations = data!
        console.log(this.consultations)
      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage(error['error'])
      }
    )
  }

  clear(){
    this.consultations = []
  }



  exportToPdf = async () => {

    if(this.consultations.length === 0){
      this.msgBox.showErrorMessage('No data to export')
      return
    }

    this.documentHeader = await this.data.getDocumentHeader()
    var header = ''
    var footer = ''
    var title  = 'Consultations Report'
    var logo : any = ''
    var total : number = 0
    var discount : number = 0
    var tax : number = 0

    var report = [
      [
        {text : 'Patient Name', fontSize : 9, fillColor : '#bdc6c7'},
        {text : 'Phone', fontSize : 9, fillColor : '#bdc6c7'},
        {text : 'Reg#', fontSize : 9, fillColor : '#bdc6c7'},
        {text : 'Mode', fontSize : 9, fillColor : '#bdc6c7'},
        {text : 'Date', fontSize : 9, fillColor : '#bdc6c7'},
        {text : 'Status', fontSize : 9, fillColor : '#bdc6c7'},
      ]
    ]  
    
    this.consultations.forEach((element) => {
      var detail = [
        {text : (element?.patient?.firstName +' '+ element.patient?.middleName +' '+ element.patient?.lastName).toString(), fontSize : 9, fillColor : '#ffffff'}, 
        {text : element?.patient?.phoneNo.toString(), fontSize : 9, fillColor : '#ffffff'}, 
        {text : element?.patient?.no.toString(), fontSize : 9, fillColor : '#ffffff'},  
        {text : element?.insurancePlan?.name.toString(), fontSize : 9, fillColor : '#ffffff'}, 
        {text : new ShowDateOnlyPipe().transform(element?.createdAt), fontSize : 9, fillColor : '#ffffff'}, 
        {text : element?.status.toString(), fontSize : 9, fillColor : '#ffffff'}, 
      ]
      report.push(detail)
    })
   
    const docDefinition : any = {
      header: '',
      footer: function (currentPage: { toString: () => string; }, pageCount: string) {
        return currentPage.toString() + " of " + pageCount;
      },
      //watermark : { text : '', color: 'blue', opacity: 0.1, bold: true, italics: false },
        content : [
          {
            columns : 
            [
              this.documentHeader
            ]
          },
          '  ',
          {text : title, fontSize : 14, bold : true, alignment : 'center'},
          this.data.getHorizontalLine(),
          {
            layout : 'noBorders',
            table : {
              widths : [80, 80],
              body : [
                [
                  {text : 'From: '+this.startDate.toString(), fontSize : 9}, 
                  {text : 'To: '+this.endDate.toString(), fontSize : 9} 
                ],
              ]
            },
          },
          '  ',
          {
            //layout : 'noBorders',
            table : {
                headerRows : 1,
                widths : [120, 80, 100, 50, 50, 80],
                body : report
            }
        }, 
      ]     
    };
    pdfMake.createPdf(docDefinition).open()
  }

  print = async () => {

    if(this.consultations.length === 0){
      this.msgBox.showErrorMessage('No data to export')
      return
    }

    this.documentHeader = await this.data.getDocumentHeader()
    var header = ''
    var footer = ''
    var title  = 'Consultations Report'
    var logo : any = ''
    var total : number = 0
    var discount : number = 0
    var tax : number = 0

    var report = [
      [
        {text : 'Patient Name', fontSize : 9, fillColor : '#bdc6c7'},
        {text : 'Phone', fontSize : 9, fillColor : '#bdc6c7'},
        {text : 'Reg#', fontSize : 9, fillColor : '#bdc6c7'},
        {text : 'Mode', fontSize : 9, fillColor : '#bdc6c7'},
        {text : 'Date', fontSize : 9, fillColor : '#bdc6c7'},
        {text : 'Status', fontSize : 9, fillColor : '#bdc6c7'},
      ]
    ]  
    
    this.consultations.forEach((element) => {
      var detail = [
        {text : (element?.patient?.firstName +' '+ element.patient?.middleName +' '+ element.patient?.lastName).toString(), fontSize : 9, fillColor : '#ffffff'}, 
        {text : element?.patient?.phoneNo.toString(), fontSize : 9, fillColor : '#ffffff'}, 
        {text : element?.patient?.no.toString(), fontSize : 9, fillColor : '#ffffff'},  
        {text : element?.insurancePlan?.name.toString(), fontSize : 9, fillColor : '#ffffff'}, 
        {text : new ShowDateOnlyPipe().transform(element?.createdAt), fontSize : 9, fillColor : '#ffffff'}, 
        {text : element?.status.toString(), fontSize : 9, fillColor : '#ffffff'}, 
      ]
      report.push(detail)
    })
   
    const docDefinition : any = {
      header: '',
      footer: function (currentPage: { toString: () => string; }, pageCount: string) {
        return currentPage.toString() + " of " + pageCount;
      },
      //watermark : { text : '', color: 'blue', opacity: 0.1, bold: true, italics: false },
        content : [
          {
            columns : 
            [
              this.documentHeader
            ]
          },
          '  ',
          {text : title, fontSize : 14, bold : true, alignment : 'center'},
          this.data.getHorizontalLine(),
          {
            layout : 'noBorders',
            table : {
              widths : [80, 80],
              body : [
                [
                  {text : 'From: '+this.startDate.toString(), fontSize : 9}, 
                  {text : 'To: '+this.endDate.toString(), fontSize : 9} 
                ],
              ]
            },
          },
          '  ',
          {
            //layout : 'noBorders',
            table : {
                headerRows : 1,
                widths : [120, 80, 100, 50, 50, 80],
                body : report
            }
        }, 
      ]     
    };
    pdfMake.createPdf(docDefinition).print()
  }

  async exportToSpreadsheet() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Consultation Report')
   
    worksheet.columns = [
      { header: 'Patient Name', key: 'PATIENT_NAME'},
      { header: 'Patient Phone', key: 'PATIENT_PHONE'},
      { header: 'Registration#', key: 'REGISTRATION_NO'},
      { header: 'Payment Mode', key: 'PAYMENT_MODE'},
      { header: 'Consultation Date', key: 'CONSULTATION_DATE'},
      { header: 'Status', key: 'STATUS'},
      
    ];
    this.spinner.show()
    this.consultations.forEach(element => {
      worksheet.addRow(
        {
          PATIENT_NAME        : (element?.patient?.firstName +' '+ element.patient?.middleName +' '+ element.patient?.lastName).toString(),
          PATIENT_PHONE       : element?.patient?.phoneNo,
          REGISTRATION_NO     : element?.patient?.no,
          PAYMENT_MODE        : element?.insurancePlan?.name,
          CONSULTATION_DATE   : new ShowDateOnlyPipe().transform(element?.createdAt),
          STATUS              : element?.status
        },"n"
      )
    })
    
    this.spinner.hide()
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Consultations Report '+this.startDate.toString()+' to '+this.endDate.toString()+'.xlsx');
    })
   
  }

  public grant(privilege : string[]) : boolean{
    /**Allow user to perform an action if the user has that priviledge */
    var granted : boolean = false
    privilege.forEach(
      element => {
        if(this.auth.checkPrivilege(element)){
          granted = true
        }
      }
    )
    return granted
  }


}
