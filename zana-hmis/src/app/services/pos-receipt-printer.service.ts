import { Injectable } from '@angular/core';

import * as pdfMake from 'pdfmake/build/pdfmake';
import { ReceiptItem } from '../domain/receipt-item';
var pdfFonts = require('pdfmake/build/vfs_fonts.js'); 
const fs = require('file-saver');

@Injectable({
  providedIn: 'root'
})
export class PosReceiptPrinterService {

  constructor() {}

  print = async (items : ReceiptItem[], receiptNo :string, cash : number) => {

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
    strOutputData = strOutputData + companyName + CRLF       
    strOutputData = strOutputData + CRLF + CRLF        
    strOutputData = strOutputData + "       ***  Receipt  ***" + CRLF        
    strOutputData = strOutputData + "Receipt No: " + receiptNo + CRLF
    strOutputData = strOutputData + CRLF        
    strOutputData = strOutputData + "CODE        QTY   PRICE@     AMOUNT" + CRLF
    strOutputData = strOutputData + "ITEM/SERVICE" + CRLF        
    strOutputData = strOutputData + "====================================" + CRLF 
    var total : number = 0
    items.forEach(element => {
      strOutputData = strOutputData + element.code + " x " + element.qty.toString() + "  " + element.price.toString() + "  " + (element.price * element.qty).toString() + CRLF
      strOutputData = strOutputData + element.name + CRLF   
      total = total + (element.price * element.qty)       
    })       
    strOutputData = strOutputData + "------------------------------------" + CRLF
    strOutputData = strOutputData + "Total Amount                " + total + CRLF
    strOutputData = strOutputData + "====================================" + CRLF        
    strOutputData = strOutputData + "Cash              " + cash + CRLF        
    strOutputData = strOutputData + "Balance           " + (cash - total).toString() + CRLF        
    strOutputData = strOutputData + "====================================" + CRLF        
    strOutputData = strOutputData + "        Thank You" + CRLF        
    strOutputData = strOutputData + "Sale Date&Time : " + fDateTime + CRLF + CRLF        
    strOutputData = strOutputData + CRLF        
    strOutputData = strOutputData + "  Served by: " + CRLF        
    strOutputData = strOutputData + '(Chr(&H1D) + "V" + Chr(66) + Chr(0))'        
     
    const docDefinition : any = {
      content : [
        strOutputData
      ]
    }
    const win = window.open('', "tempWinForPdf")
    pdfMake.createPdf(docDefinition).print({}, win)
    win!.onfocus = function () { setTimeout(function () { win!.close(); }, 10000); } 
    
  }
}
