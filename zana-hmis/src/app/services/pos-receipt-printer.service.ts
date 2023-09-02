import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import * as pdfMake from 'pdfmake/build/pdfmake';
import { ReceiptItem } from '../domain/receipt-item';
import { DataService } from './data.service';
var pdfFonts = require('pdfmake/build/vfs_fonts.js'); 
const fs = require('file-saver');

@Injectable({
  providedIn: 'root'
})
export class PosReceiptPrinterService {

  constructor(private datePipe : DatePipe,
    private data : DataService) {}

  print1 = async (items : ReceiptItem[], receiptNo :string, cash : number) => {

    var companyName = localStorage.getItem('company-name')!
    var space : String = ''
    for (let i = 1; i <= (40 - companyName.length)/ 2; i++) {
      space = space + ' '
    }
    var fDateTime : string
    var strOutputData : string = ''
    var CRLF : any
    var ESC        
    fDateTime = Date.now().toString()             
    //CRLF = 'Chr(13)' + 'Chr(10)'        
    //ESC = 'Chr(&H1B)'    
    CRLF = '\n'        
    ESC = 'Chr(&H1B)'      
    strOutputData = strOutputData + ".         " + companyName + CRLF       
    strOutputData = strOutputData + CRLF + CRLF        
    strOutputData = strOutputData + "*******************Receipt******************" + CRLF        
    strOutputData = strOutputData + "Receipt No:   " + receiptNo + CRLF
    strOutputData = strOutputData + CRLF 
    strOutputData = strOutputData + "ITEM/SERVICE" + CRLF               
    strOutputData = strOutputData + "QTY                      @PRICE                    AMOUNT" + CRLF
    strOutputData = strOutputData + "====================================" + CRLF 
    var total : number = 0
    items.forEach(element => {
      strOutputData = strOutputData + element.name + CRLF 
      strOutputData = strOutputData + element.qty.toString() + " x " + "  @" + element.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "        " + (element.price * element.qty).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + CRLF
      total = total + (element.price * element.qty)       
    })       
    strOutputData = strOutputData + "====================================" + CRLF
    strOutputData = strOutputData + "Total Amount:                      " + total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + CRLF
    strOutputData = strOutputData + "====================================" + CRLF        
    strOutputData = strOutputData + ".                              Thank You" + CRLF        
    strOutputData = strOutputData + "Sale Date&Time :    " + this.datePipe.transform(new Date(), 'yyyy-MM-dd:HH:MM:ss') + CRLF + CRLF        
    strOutputData = strOutputData + CRLF        
    strOutputData = strOutputData + "  Served by:    "+ localStorage.getItem('user-name') + CRLF        
    //strOutputData = strOutputData + '(Chr(&H1D) + "V" + Chr(66) + Chr(0))'        
     
    const docDefinition : any = {
      content : [
        strOutputData
      ]
    }
    const win = window.open('', "tempWinForPdf")
    pdfMake.createPdf(docDefinition).print({}, win)
    //win!.onfocus = function () { setTimeout(function () { win!.close(); }, 10000); } 
    
  }

  print = async (items : ReceiptItem[], receiptNo :string, cash : number) => {




    var companyName = localStorage.getItem('company-name')!

    var header = ''
    var footer = ''
    var title  = 'Receipt'
    var total : number = 0
    var discount : number = 0
    var tax : number = 0

    var address : any = await this.data.getReceiptHeader(receiptNo)
   
    var receipt = [
      [
        {text : 'SN', fontSize : 8, bold : true}, 
        {text : 'Item', fontSize : 8, bold : true},
        {text : 'Qty', fontSize : 8, bold : true},
        {text : 'Price', fontSize : 8, bold : true},
        {text : 'Amount', fontSize : 8, bold : true},
      ]
    ] 
    
    var sn = 0

    items.forEach((element) => {
      total = total + element.qty * element.price
      sn = sn + 1
      var item = [
        {text : sn.toString(), fontSize : 8, bold : false}, 
        {text : element.name, fontSize : 8, bold : false},
        {text : element.qty.toString(), fontSize : 8, bold : false},
        {text : element.price.toLocaleString('en-US', { minimumFractionDigits: 2 }), fontSize : 8, alignment : 'right', bold : false},
        {text : (element.qty * element.price).toLocaleString('en-US', { minimumFractionDigits: 2 }), fontSize : 8, alignment : 'right', bold : false},
      ]
      receipt.push(item)
    })
    var detailSummary = [
      {text : ' ', fontSize : 8, bold : false},
      {text : 'Total', fontSize : 9, bold : true},
      {text : ' ', fontSize : 8, bold : false},
      {text : ' ', fontSize : 8, bold : false},
      {text : total.toLocaleString('en-US', { minimumFractionDigits: 2 }), fontSize : 9, alignment : 'right', bold : true},
    ]
    receipt.push(detailSummary)
    

    const docDefinition = {
      header: '',
      //watermark : { text : '', color: 'blue', opacity: 0.1, bold: true, italics: false },
        content : [
          {
            layout : 'noBorders',
            table : address
          },   
          
          {
            layout : 'noBorders',
            table : {
              headerRows : 0,
              widths : [210],
              body : [
                [{text : '==============================', alignment : 'center'}],
              ]
            }
          }, 
          {
            layout : 'noBorders',
            table : {
              headerRows : 0,
              widths : [200],
              body : [
                [{text : 'Service Receipt', alignment : 'center', fontSize : 9, bold : true}],
              ]
            }
          },      
          {
            layout : 'noBorders',
            table : {
                headerRows : 1,
                widths : [15, 60, 15, 50, 50],
                body : receipt
            }
          },
          {
            layout : 'noBorders',
            table : {
              headerRows : 0,
              widths : [210],
              body : [
                [{text : '==============================', alignment : 'center'}],
                [{text : 'Served By : '+ localStorage.getItem('user-name'), fontSize : 9, alignment : 'left'}],
                [{text : '@Orbix Systems', fontSize : 10, bold : true, alignment : 'center'}],
                [{text : '***End of Receipt***', fontSize : 9, alignment : 'center'}]
              ]
            }
          },                    
        ]     
      }
    pdfMake.createPdf(docDefinition).open(); 








  }

  
}
