"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[6497],{6497:(H,T,a)=>{a.r(T),a.d(T,{PatientInvoiceComponent:()=>F});var _=a(5861),p=a(6814),v=a(9862),d=a(95),P=a(7069),C=a(4716),E=a(5614),m=a(977),I=a(553),t=a(6689),b=a(6466),M=a(1581),x=a(585),D=a(8237),O=a(379),B=a(7857),q=a(2848);function S(o,r){if(1&o&&(t.TgZ(0,"div")(1,"address")(2,"strong"),t._uU(3),t.qZA(),t._UZ(4,"br"),t.TgZ(5,"div"),t._uU(6),t.qZA(),t.TgZ(7,"div"),t._uU(8),t.qZA(),t.TgZ(9,"div"),t._uU(10),t.qZA()()()),2&o){const i=t.oxw();t.xp6(3),t.lnq("",null==i.invoice||null==i.invoice.patient?null:i.invoice.patient.firstName," ",null==i.invoice||null==i.invoice.patient?null:i.invoice.patient.middleName," ",null==i.invoice||null==i.invoice.patient?null:i.invoice.patient.lastName,""),t.xp6(3),t.Oqu(null==i.invoice||null==i.invoice.patient?null:i.invoice.patient.no),t.xp6(2),t.Oqu(null==i.invoice||null==i.invoice.patient?null:i.invoice.patient.address),t.xp6(2),t.Oqu(null==i.invoice||null==i.invoice.patient?null:i.invoice.patient.phoneNo)}}function y(o,r){if(1&o&&(t.TgZ(0,"div")(1,"div"),t._uU(2),t.qZA(),t.TgZ(3,"div"),t._uU(4),t.qZA()()),2&o){const i=t.oxw();t.xp6(2),t.hij("Provider: ",null==i.invoice||null==i.invoice.insurancePlan||null==i.invoice.insurancePlan.insuranceProvider?null:i.invoice.insurancePlan.insuranceProvider.name,""),t.xp6(2),t.hij("Plan: ",null==i.invoice||null==i.invoice.insurancePlan?null:i.invoice.insurancePlan.name,"")}}function N(o,r){if(1&o){const i=t.EpF();t.TgZ(0,"input",34),t.NdJ("ngModelChange",function(n){t.CHM(i);const l=t.oxw().$implicit;return t.KtG(l.checked=n)})("ngModelChange",function(){t.CHM(i);const n=t.oxw().$implicit,l=t.oxw();return t.KtG(l.listBill(n))}),t.qZA()}if(2&o){const i=t.oxw().$implicit;t.Q6J("ngModel",i.checked)}}function z(o,r){if(1&o&&(t.TgZ(0,"tr")(1,"td"),t._uU(2),t.ALo(3,"dateTime"),t.qZA(),t.TgZ(4,"td"),t._uU(5),t.qZA(),t.TgZ(6,"td"),t._uU(7),t.qZA(),t.TgZ(8,"td",32),t._uU(9),t.ALo(10,"currency"),t.qZA(),t.TgZ(11,"td"),t._uU(12),t.qZA(),t.TgZ(13,"td"),t.YNc(14,N,1,1,"input",33),t.qZA()()),2&o){const i=r.$implicit;t.xp6(2),t.Oqu(t.lcZ(3,6,i.patientBill.createdAt)),t.xp6(3),t.Oqu(null==i||null==i.patientBill?null:i.patientBill.description),t.xp6(2),t.Oqu(null==i||null==i.patientBill?null:i.patientBill.qty),t.xp6(2),t.Oqu(t.Dn7(10,8,null==i||null==i.patientBill?null:i.patientBill.amount,"","")),t.xp6(3),t.Oqu(null==i||null==i.patientBill?null:i.patientBill.status),t.xp6(2),t.Q6J("ngIf","VERIFIED"===(null==i||null==i.patientBill?null:i.patientBill.status))}}function R(o,r){if(1&o&&(t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td",32),t._uU(4),t.ALo(5,"currency"),t.qZA()()),2&o){const i=r.$implicit;t.xp6(2),t.Oqu(null==i?null:i.description),t.xp6(2),t.Oqu(t.Dn7(5,2,null==i?null:i.amount,"",""))}}function L(o,r){if(1&o&&(t.TgZ(0,"div",3),t._UZ(1,"div",35),t.TgZ(2,"div",35)(3,"div"),t._uU(4,"Selected Bills Summary"),t.qZA(),t.TgZ(5,"table",36)(6,"thead")(7,"tr")(8,"th"),t._uU(9,"Item"),t.qZA(),t.TgZ(10,"th"),t._uU(11,"Amount"),t.qZA()()(),t.TgZ(12,"tbody"),t.YNc(13,R,6,6,"tr",16),t.qZA(),t.TgZ(14,"tfoot")(15,"tr")(16,"th"),t._uU(17,"Total"),t.qZA(),t.TgZ(18,"th",32),t._uU(19),t.ALo(20,"currency"),t.qZA()()()(),t.TgZ(21,"div",3)(22,"div",4)(23,"button",37),t._uU(24,"Confirm Payment"),t.qZA()()()(),t._UZ(25,"div",35),t.qZA()),2&o){const i=t.oxw();t.xp6(13),t.Q6J("ngForOf",i.bills),t.xp6(6),t.Oqu(t.Dn7(20,2,i.total,"",""))}}function K(o,r){if(1&o){const i=t.EpF();t.TgZ(0,"button",38),t.NdJ("click",function(){t.CHM(i);const n=t.oxw();return t.KtG(n.printReceipt())})("click",function(){t.CHM(i);const n=t.oxw();return t.KtG(n.confirmBillsPayment())}),t._uU(1,"Confirm"),t.qZA()}}var W=a(6236);const U=I.N.apiUrl;let F=(()=>{var o;class r{constructor(e,n,l,s,g,w,J,Y){var u=this;this.auth=e,this.http=n,this.modalService=l,this.spinner=s,this.router=g,this.msgBox=w,this.printer=J,this.data=Y,this.invoiceId=null,this.bills=[],this.total=0,this.amountReceived=0,this.print=(0,_.Z)(function*(){if(0===u.invoice.patientInvoiceDetails.length)return void u.msgBox.showErrorMessage3("No data to export");u.documentHeader=yield u.data.getDocumentHeader();var f=0,h=[[{text:"SN",fontSize:9,fillColor:"#bdc6c7"},{text:"Date-Time",fontSize:9,fillColor:"#bdc6c7"},{text:"Service/Item",fontSize:9,fillColor:"#bdc6c7"},{text:"Qty",fontSize:9,fillColor:"#bdc6c7"},{text:"Amount/Cov",fontSize:9,fillColor:"#bdc6c7"},{text:"Status",fontSize:9,fillColor:"#bdc6c7"}]],Z=1;f=0,u.invoice.patientInvoiceDetails.forEach(c=>{var A=[{text:Z.toString(),fontSize:9,fillColor:"#ffffff"},{text:(new m.$).transform(c?.patientBill.createdAt),fontSize:9,fillColor:"#ffffff"},{text:c?.patientBill.description,fontSize:9,fillColor:"#ffffff"},{text:c?.patientBill.qty.toString(),fontSize:9,fillColor:"#ffffff"},{text:u.getAmount(c.patientBill),fontSize:9,alignment:"right",fillColor:"#ffffff"},{text:c?.patientBill.status,fontSize:9,fillColor:"#ffffff"}];Z+=1,f+=c.patientBill.amount,h.push(A)});var Q=[{text:"",fontSize:9,fillColor:"#ffffff"},{text:"",fontSize:9,fillColor:"#ffffff"},{text:"",fontSize:9,fillColor:"#ffffff"},{text:"Total",fontSize:9,fillColor:"#ffffff"},{text:u.getTotal(f),fontSize:9,alignment:"right",bold:!0,fillColor:"#ffffff"},{text:"",fontSize:9,fillColor:"#ffffff"}];h.push(Q);const j={header:"",footer:function(c,A){return c.toString()+" of "+A},content:[{columns:[u.documentHeader]},"  ",{text:"Invoice",fontSize:14,bold:!0,alignment:"center"},u.data.getHorizontalLine(),{columns:[{width:200,layout:"noBorders",table:{widths:[200],body:[[{text:"Name: "+u.invoice?.patient?.firstName.toString()+" "+u.invoice?.patient?.middleName?.toString()+" "+u.invoice?.patient?.lastName?.toString(),fontSize:9}],[{text:"File No: "+u.invoice?.patient?.no.toString(),fontSize:9}],[{text:"Address: "+u.invoice?.patient?.address.toString(),fontSize:9}],[{text:"Phone No: "+u.invoice?.patient?.phoneNo.toString(),fontSize:9}]]}},{width:100,layout:"noBorders",table:{widths:[100],body:[[" "]]}},{width:200,layout:"noBorders",table:{widths:[220],body:[[{text:"Invoice#: "+u.invoice?.no.toString(),fontSize:12,bold:!0}],[{text:"Created: "+(new m.$).transform(u.invoice.createdAt),fontSize:9}],[{text:"Bill To",fontSize:9}],[{text:u.getBillTo(u.invoice),fontSize:9}]]}}]},"  ",{table:{headerRows:1,widths:[20,90,200,30,60,40],body:h}}]};P.createPdf(j).print()}),window.pdfMake.vfs=W.pdfMake.vfs}ngOnInit(){var e=this;return(0,_.Z)(function*(){e.invoiceId=localStorage.getItem("patient-invoice-id"),localStorage.removeItem("patient-invoice-id"),e.loadPatientInvoice(e.invoiceId)})()}loadPatientInvoice(e){var n=this;return(0,_.Z)(function*(){let l={headers:(new v.WM).set("Authorization","Bearer "+n.auth.user.access_token)};n.spinner.show(),yield n.http.get(U+"/patients/get_patient_invoice?id="+e,l).pipe((0,C.x)(()=>n.spinner.hide())).toPromise().then(s=>{n.invoice=s,console.log(s)}).catch(s=>{n.msgBox.showErrorMessage(s,""),console.log(s)})})()}listBill(e){if(!0===e.checked){var n=!1;this.bills.forEach(s=>{s.id===e.patientBill.id&&(n=!0)}),!1===n&&this.bills.push(e.patientBill)}else if(!1===e.checked){var l=[];this.bills.forEach(s=>{s.id!=e.patientBill.id&&l.push(s)}),this.bills=l}this.total=0,this.amountReceived=0,this.invoice.patientInvoiceDetails.forEach(s=>{"VERIFIED"===s.patientBill.status?this.bills.forEach(g=>{g.id===s.patientBill.id&&(s.checked=!0,this.total=this.total+s.patientBill.amount)}):s.checked=!1})}confirmBillsPayment(){var e=this;return(0,_.Z)(function*(){let n={headers:(new v.WM).set("Authorization","Bearer "+e.auth.user.access_token)};e.spinner.show(),yield e.http.post(U+"/bills/confirm_bills_payment?total_amount="+e.total,e.bills,n).pipe((0,C.x)(()=>e.spinner.hide())).toPromise().then(l=>{console.log(l),e.msgBox.showSuccessMessage("Payment successiful")}).catch(l=>{console.log(l),e.msgBox.showErrorMessage(l,"Could not confirm payment")})})()}printReceipt(){var n,e=[];this.bills.forEach(l=>{(n=new E.$).code=l.id,n.name=l.description,n.amount=l.amount,n.qty=l.qty,e.push(n)}),this.printer.print(e,"NA",this.total,this.invoice.patient)}getAmount(e){return e.amount.toLocaleString("en-US",{minimumFractionDigits:2})}getTotal(e){return e.toLocaleString("en-US",{minimumFractionDigits:2})}getBillTo(e){return null===e.insurancePlan?e?.patient?.firstName+" "+e?.patient?.middleName+" "+e?.patient?.lastName+" "+e?.patient?.no+" "+e?.patient?.address+" "+e?.patient?.phoneNo:e?.insurancePlan?.name+" | "+e?.insurancePlan?.insuranceProvider?.name}}return(o=r).\u0275fac=function(e){return new(e||o)(t.Y36(b.e),t.Y36(v.eN),t.Y36(M.FF),t.Y36(x.t2),t.Y36(D.F0),t.Y36(O.l),t.Y36(B.r),t.Y36(q.D))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-patient-invoice"]],standalone:!0,features:[t.jDz],decls:104,vars:28,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd"],[1,"panel-heading"],["type","button",1,"btn","btn-success","btn-outline",3,"click"],[1,"fa","fa-print"],[1,"panel-body"],[1,"col-sm-6"],[1,"col-sm-6","text-left"],[1,"m-t-0"],[4,"ngIf"],[1,"table-responsive","m-b-20"],[1,"table","table-striped"],[4,"ngFor","ngForOf"],["class","row",4,"ngIf"],["id","confirm-payment-modal","tabindex","-1","role","dialog",1,"modal","fade","modal-success"],["role","document",1,"modal-dialog","modal-sm"],[1,"modal-content"],[1,"modal-header"],["type","button","data-dismiss","modal","aria-label","Close",1,"close"],["aria-hidden","true"],[1,"modal-title"],[1,"modal-body"],[1,"col-sm-6",2,"text-align","right"],[1,"form-control",2,"text-align","right"],["type","text",1,"form-control",2,"text-align","center",3,"ngModel","ngModelChange"],[1,"modal-footer"],["type","button","data-dismiss","modal",1,"btn","btn-danger"],["type","button","class","btn btn-success","data-dismiss","modal",3,"click",4,"ngIf"],[2,"text-align","right"],["type","checkbox",3,"ngModel","ngModelChange",4,"ngIf"],["type","checkbox",3,"ngModel","ngModelChange"],[1,"col-sm-4"],[1,"table","table-small"],["data-toggle","modal","data-target","#confirm-payment-modal",1,"btn","btn-success"],["type","button","data-dismiss","modal",1,"btn","btn-success",3,"click"]],template:function(e,n){1&e&&(t.TgZ(0,"section",0)(1,"div",1)(2,"h1"),t._uU(3,"Invoice"),t.qZA()()(),t.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"button",7),t.NdJ("click",function(){return n.print()}),t._UZ(10,"i",8),t._uU(11," Print"),t.qZA()(),t.TgZ(12,"div",9)(13,"div",3)(14,"div",10)(15,"address")(16,"strong"),t._uU(17),t.qZA(),t._UZ(18,"br"),t.TgZ(19,"div"),t._uU(20),t.qZA(),t.TgZ(21,"div"),t._uU(22),t.qZA(),t.TgZ(23,"div"),t._uU(24),t.qZA(),t._UZ(25,"br"),t.TgZ(26,"div"),t._uU(27),t.qZA(),t.TgZ(28,"div"),t._uU(29),t.qZA(),t.TgZ(30,"div"),t._uU(31,"Due:"),t.qZA()()(),t.TgZ(32,"div",11)(33,"h1",12),t._uU(34),t.qZA(),t.TgZ(35,"div"),t._uU(36),t.ALo(37,"dateTime"),t.qZA(),t.TgZ(38,"address")(39,"div"),t._uU(40,"Bill To"),t.qZA(),t.YNc(41,S,11,6,"div",13),t.YNc(42,y,5,2,"div",13),t.qZA()()(),t._UZ(43,"hr"),t.TgZ(44,"div",14)(45,"table",15)(46,"thead")(47,"tr")(48,"th"),t._uU(49,"Date-Time"),t.qZA(),t.TgZ(50,"th"),t._uU(51,"Item"),t.qZA(),t.TgZ(52,"th"),t._uU(53,"Quantity"),t.qZA(),t.TgZ(54,"th"),t._uU(55,"Amount"),t.qZA(),t.TgZ(56,"th"),t._uU(57,"Status"),t.qZA(),t.TgZ(58,"th"),t._uU(59,"Check to Pay"),t.qZA()()(),t.TgZ(60,"tbody"),t.YNc(61,z,15,12,"tr",16),t.qZA()(),t._UZ(62,"hr"),t.YNc(63,L,26,6,"div",17),t.qZA()()()()()(),t.TgZ(64,"div",18)(65,"div",19)(66,"div",20)(67,"div",21)(68,"button",22)(69,"span",23),t._uU(70,"\xd7"),t.qZA()(),t.TgZ(71,"h2",24),t._uU(72,"Confirm Payment"),t.qZA()(),t.TgZ(73,"div",25)(74,"div",3)(75,"div",26)(76,"span"),t._uU(77,"Total Amount"),t.qZA()(),t.TgZ(78,"div",10)(79,"span",27)(80,"b"),t._uU(81),t.ALo(82,"currency"),t.qZA()()()(),t._UZ(83,"br"),t.TgZ(84,"div",3)(85,"div",26)(86,"span"),t._uU(87,"Amount Received"),t.qZA()(),t.TgZ(88,"div",10)(89,"input",28),t.NdJ("ngModelChange",function(s){return n.amountReceived=s}),t.qZA()()(),t._UZ(90,"hr"),t.TgZ(91,"div",3)(92,"div",26)(93,"span"),t._uU(94,"Change"),t.qZA()(),t.TgZ(95,"div",10)(96,"span",27)(97,"b"),t._uU(98),t.ALo(99,"currency"),t.qZA()()()()(),t.TgZ(100,"div",29)(101,"button",30),t._uU(102,"Close"),t.qZA(),t.YNc(103,K,2,0,"button",31),t.qZA()()()()),2&e&&(t.xp6(17),t.lnq("",null==n.invoice||null==n.invoice.patient?null:n.invoice.patient.firstName," ",null==n.invoice||null==n.invoice.patient?null:n.invoice.patient.middleName," ",null==n.invoice||null==n.invoice.patient?null:n.invoice.patient.lastName,""),t.xp6(3),t.Oqu(null==n.invoice||null==n.invoice.patient?null:n.invoice.patient.no),t.xp6(2),t.Oqu(null==n.invoice||null==n.invoice.patient?null:n.invoice.patient.address),t.xp6(2),t.Oqu(null==n.invoice||null==n.invoice.patient?null:n.invoice.patient.phoneNo),t.xp6(3),t.hij("Paid: ",null==n.invoice?null:n.invoice.amountPaid,""),t.xp6(2),t.hij("Allocated: ",null==n.invoice?null:n.invoice.amountAllocated,""),t.xp6(5),t.hij("Invoice# ",null==n.invoice?null:n.invoice.no,""),t.xp6(2),t.hij("Issued: ",t.lcZ(37,18,n.invoice.createdAt),""),t.xp6(5),t.Q6J("ngIf",null===n.invoice.insurancePlan),t.xp6(1),t.Q6J("ngIf",null!=n.invoice.insurancePlan),t.xp6(19),t.Q6J("ngForOf",n.invoice.patientInvoiceDetails),t.xp6(2),t.Q6J("ngIf",n.bills.length>0),t.xp6(18),t.Oqu(t.Dn7(82,20,n.total,"","")),t.xp6(8),t.Q6J("ngModel",n.amountReceived),t.xp6(9),t.Oqu(t.Dn7(99,24,n.amountReceived-n.total,"","")),t.xp6(5),t.Q6J("ngIf",n.amountReceived-n.total>=0))},dependencies:[p.ez,p.sg,p.O5,p.H9,d.u5,d.Fj,d.Wl,d.JJ,d.On,d.UX,m.$]}),r})()}}]);