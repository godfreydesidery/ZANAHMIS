"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[4226],{4226:(w,E,s)=>{s.r(E),s.d(E,{ConsultationReportComponent:()=>K});var d=s(5861),P=s(553),v=s(775),g=s(9862),A=s(4716),M=s(7069),h=s(206),m=s(6814),_=s(95),t=s(6689),N=s(6466),D=s(1581),O=s(585),R=s(379),U=s(2848);function I(a,u){if(1&a){const n=t.EpF();t.TgZ(0,"option",23),t.NdJ("click",function(){const e=t.CHM(n).$implicit,i=t.oxw(2);return t.KtG(i.getClinician(e.id))}),t._uU(1),t.qZA()}if(2&a){const n=u.$implicit;t.xp6(1),t.lnq("",null==n?null:n.firstName," ",null==n?null:n.middleName," ",null==n?null:n.lastName," ")}}function S(a,u){if(1&a&&(t.TgZ(0,"div",3)(1,"div",4)(2,"select",21),t.YNc(3,I,2,3,"option",22),t.qZA()()()),2&a){const n=t.oxw();t.xp6(3),t.Q6J("ngForOf",n.clinicians)}}function B(a,u){if(1&a){const n=t.EpF();t.TgZ(0,"div",3)(1,"div",24)(2,"h4"),t._uU(3,"From"),t.qZA()(),t.TgZ(4,"div",25)(5,"input",26),t.NdJ("ngModelChange",function(o){t.CHM(n);const e=t.oxw();return t.KtG(e.startDate=o)}),t.qZA()(),t.TgZ(6,"div",24)(7,"h4"),t._uU(8,"To"),t.qZA()(),t.TgZ(9,"div",25)(10,"input",26),t.NdJ("ngModelChange",function(o){t.CHM(n);const e=t.oxw();return t.KtG(e.endDate=o)}),t.qZA()(),t.TgZ(11,"div",25)(12,"button",27),t.NdJ("click",function(){t.CHM(n);const o=t.oxw();return t.KtG(o.loadConsultationReport(o.startDate,o.endDate))}),t._uU(13,"Run Report"),t.qZA()(),t.TgZ(14,"div",24)(15,"button",27),t.NdJ("click",function(){t.CHM(n);const o=t.oxw();return t.KtG(o.clear())}),t._uU(16,"Clear"),t.qZA()()()}if(2&a){const n=t.oxw();t.xp6(5),t.Q6J("ngModel",n.startDate),t.xp6(5),t.Q6J("ngModel",n.endDate)}}function b(a,u){if(1&a&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&a){const n=t.oxw().$implicit;t.xp6(1),t.Oqu(null==n||null==n.insurancePlan?null:n.insurancePlan.name)}}function y(a,u){1&a&&(t.TgZ(0,"span"),t._uU(1,"Cash"),t.qZA())}function k(a,u){if(1&a&&(t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.qZA(),t.TgZ(9,"td"),t.YNc(10,b,2,1,"span",28),t.YNc(11,y,2,0,"span",28),t.qZA(),t.TgZ(12,"td"),t._uU(13),t.ALo(14,"dateOnly"),t.qZA(),t.TgZ(15,"td"),t._uU(16),t.qZA()()),2&a){const n=u.$implicit;t.xp6(2),t.Oqu(null==n?null:n.sn),t.xp6(2),t.lnq("",null==n||null==n.patient?null:n.patient.firstName," ",null==n||null==n.patient?null:n.patient.middleName," ",null==n||null==n.patient?null:n.patient.lastName,""),t.xp6(2),t.Oqu(null==n||null==n.patient?null:n.patient.phoneNo),t.xp6(2),t.Oqu(null==n||null==n.patient?null:n.patient.no),t.xp6(2),t.Q6J("ngIf","COVERED"===(null==n||null==n.patientBill?null:n.patientBill.status)),t.xp6(1),t.Q6J("ngIf","VERIFIED"===(null==n||null==n.patientBill?null:n.patientBill.status)||"PAID"===(null==n||null==n.patientBill?null:n.patientBill.status)||"UNPAID"===(null==n||null==n.patientBill?null:n.patientBill.status)),t.xp6(2),t.Oqu(t.lcZ(14,10,n.createdAt)),t.xp6(3),t.Oqu(null==n?null:n.status)}}var z=s(6236);const L=s(217),C=P.N.apiUrl;let K=(()=>{var a;class u{constructor(l,o,e,i,p,f){var r=this;this.auth=l,this.http=o,this.modalService=e,this.spinner=i,this.msgBox=p,this.data=f,this.report=[],this.filterRecords="",this.consultations=[],this.clinicianLocked=!1,this.clinicianId=null,this.clinicianCode="",this.clinicianName="",this.clinicians=[],this.print=(0,d.Z)(function*(){if(0===r.consultations.length)return void r.msgBox.showErrorMessage3("No data to print");r.documentHeader=yield r.data.getDocumentHeader();var x=[[{text:"SN",fontSize:9,fillColor:"#bdc6c7"},{text:"Patient Name",fontSize:9,fillColor:"#bdc6c7"},{text:"Phone",fontSize:9,fillColor:"#bdc6c7"},{text:"Reg#",fontSize:9,fillColor:"#bdc6c7"},{text:"Mode",fontSize:9,fillColor:"#bdc6c7"},{text:"Date",fontSize:9,fillColor:"#bdc6c7"},{text:"Status",fontSize:9,fillColor:"#bdc6c7"}]];r.consultations.forEach(c=>{var T=[{text:c?.sn.toString(),fontSize:7,fillColor:"#ffffff"},{text:(c?.patient?.firstName+" "+c.patient?.middleName+" "+c.patient?.lastName).toString(),fontSize:7,fillColor:"#ffffff"},{text:c?.patient?.phoneNo.toString(),fontSize:7,fillColor:"#ffffff"},{text:c?.patient?.no.toString(),fontSize:7,fillColor:"#ffffff"},{text:r.getPaymentType(c),fontSize:7,fillColor:"#ffffff"},{text:(new h.c).transform(c?.createdAt),fontSize:7,fillColor:"#ffffff"},{text:c?.status.toString(),fontSize:7,fillColor:"#ffffff"}];x.push(T)});const q={header:"",footer:function(c,T){return c.toString()+" of "+T},content:[{columns:[r.documentHeader]},"  ",{text:"Consultations Report",fontSize:14,bold:!0,alignment:"center"},r.data.getHorizontalLine()," ","Doctor: "+r.clinicianName," ",{layout:"noBorders",table:{widths:[80,80],body:[[{text:"From: "+r.startDate.toString(),fontSize:9},{text:"To: "+r.endDate.toString(),fontSize:9}]]}},"  ",{table:{headerRows:1,widths:[30,135,60,80,50,40,60],body:x}}]};M.createPdf(q).print()}),window.pdfMake.vfs=z.pdfMake.vfs}ngOnInit(){return(0,d.Z)(function*(){})()}loadConsultationReport(l,o){var e=this;return(0,d.Z)(function*(){let i={headers:(new g.WM).set("Authorization","Bearer "+e.auth.user.access_token)};if(void 0!==l&&void 0!==o)if(l>o)e.msgBox.showErrorMessage3("Could not run. Start date must be earlier or equal to end date");else{null===e.clinicianId&&e.msgBox.showErrorMessage3("Could not run. Please select Doctor");var p={from:l,to:o,clinician:{id:e.clinicianId}};e.spinner.show(),yield e.http.post(C+"/reports/consultation_report",p,i).pipe((0,A.x)(()=>e.spinner.hide())).toPromise().then(f=>{e.consultations=f;var r=1;e.consultations.forEach(Z=>{Z.sn=r,r+=1}),console.log(e.consultations)}).catch(f=>{e.msgBox.showErrorMessage(f,"")})}else e.msgBox.showErrorMessage3("Could not run. Please select date range")})()}clear(){this.consultations=[],this.clinicianId=null,this.clinicianName="",this.clinicianCode="",this.clinicians=[],this.clinicianLocked=!1}loadCliniciansLike(l){var o=this;return(0,d.Z)(function*(){if(o.clinicians=[],l.length<2)return;let e={headers:(new g.WM).set("Authorization","Bearer "+o.auth.user.access_token)};yield o.http.get(C+"/clinicians/load_clinicians_like?name_like="+l,e).toPromise().then(i=>{console.log(i),o.clinicians=i}).catch(i=>{o.msgBox.showErrorMessage(i,"")})})()}getClinician(l){var o=this;return(0,d.Z)(function*(){let e={headers:(new g.WM).set("Authorization","Bearer "+o.auth.user.access_token)};o.clinicians=[],o.spinner.show(),yield o.http.get(C+"/clinicians/get?id="+l,e).pipe((0,A.x)(()=>o.spinner.hide())).toPromise().then(i=>{o.clinicianId=i?.id,o.clinicianCode=i.code,o.clinicianName=i.firstName+" "+i.middleName+" "+i.lastName,o.clinicianLocked=!0}).catch(i=>{o.msgBox.showErrorMessage(i,""),console.log(i)})})()}getPaymentType(l){return"COVERED"===l.patientBill.status?l.insurancePlan.name:"Cash"}exportToSpreadsheet(){var l=this;return(0,d.Z)(function*(){let o=new v.Workbook,e=o.addWorksheet("Consultation Report");e.columns=[{header:"Patient Name",key:"PATIENT_NAME"},{header:"Patient Phone",key:"PATIENT_PHONE"},{header:"Registration#",key:"REGISTRATION_NO"},{header:"Payment Mode",key:"PAYMENT_MODE"},{header:"Consultation Date",key:"CONSULTATION_DATE"},{header:"Status",key:"STATUS"}],l.spinner.show(),l.consultations.forEach(i=>{e.addRow({PATIENT_NAME:(i?.patient?.firstName+" "+i.patient?.middleName+" "+i.patient?.lastName).toString(),PATIENT_PHONE:i?.patient?.phoneNo,REGISTRATION_NO:i?.patient?.no,PAYMENT_MODE:i?.insurancePlan?.name,CONSULTATION_DATE:(new h.c).transform(i?.createdAt),STATUS:i?.status},"n")}),l.spinner.hide(),o.xlsx.writeBuffer().then(i=>{let p=new Blob([i],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});L.saveAs(p,"Consultations Report "+l.startDate.toString()+" to "+l.endDate.toString()+".xlsx")})})()}grant(l){var o=!1;return l.forEach(e=>{this.auth.checkPrivilege(e)&&(o=!0)}),o}}return(a=u).\u0275fac=function(l){return new(l||a)(t.Y36(N.e),t.Y36(g.eN),t.Y36(D.FF),t.Y36(O.t2),t.Y36(R.l),t.Y36(U.D))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-consultation-report"]],standalone:!0,features:[t.jDz],decls:49,vars:5,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],["type","button",1,"btn","btn-success","btn-outline",3,"click"],[1,"fa","fa-print"],[1,"panel-body"],[1,"col-sm-3"],[1,"input-group"],["type","text","name","q","placeholder","Search Doctor...",1,"form-control",3,"ngModel","readonly","ngModelChange"],[1,"input-group-btn"],[1,"btn",3,"click"],[1,"fa","fa-times-rectangle"],["class","row",4,"ngIf"],[1,"col-sm-12",2,"height","100%","overflow","scroll"],[1,"table","table-responsive","table-hover","table-striped","table-small"],[2,"font-weight","bold"],[4,"ngFor","ngForOf"],["multiple","multiple",1,"form-control"],["style","height: 1cm; cursor: pointer; font-size: large;",3,"click",4,"ngFor","ngForOf"],[2,"height","1cm","cursor","pointer","font-size","large",3,"click"],[1,"col-sm-1"],[1,"col-sm-2"],["type","date",1,"form-control",3,"ngModel","ngModelChange"],[1,"btn","btn-primary","btn-outline",3,"click"],[4,"ngIf"]],template:function(l,o){1&l&&(t.TgZ(0,"section",0)(1,"div",1)(2,"h1"),t._uU(3,"Consultations Report"),t.qZA()()(),t.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"button",7),t.NdJ("click",function(){return o.print()}),t._UZ(10,"i",8),t._uU(11," Print"),t.qZA()(),t.TgZ(12,"div",9)(13,"div",3)(14,"div",4)(15,"div",3)(16,"div",10)(17,"h4"),t._uU(18,"Doctor Name"),t.qZA(),t.TgZ(19,"div",11)(20,"input",12),t.NdJ("ngModelChange",function(i){return o.clinicianName=i})("ngModelChange",function(i){return o.loadCliniciansLike(i)}),t.qZA(),t.TgZ(21,"span",13)(22,"button",14),t.NdJ("click",function(){return o.clear()}),t._UZ(23,"i",15),t.qZA()()(),t.YNc(24,S,4,1,"div",16),t.qZA()(),t._UZ(25,"hr"),t.YNc(26,B,17,2,"div",16),t.qZA()(),t.TgZ(27,"div",3)(28,"div",17),t._UZ(29,"hr"),t.TgZ(30,"table",18)(31,"thead")(32,"tr",19)(33,"td"),t._uU(34,"SN"),t.qZA(),t.TgZ(35,"td"),t._uU(36,"Patient Name"),t.qZA(),t.TgZ(37,"td"),t._uU(38,"Patient Phone"),t.qZA(),t.TgZ(39,"td"),t._uU(40,"Registration#"),t.qZA(),t.TgZ(41,"td"),t._uU(42,"Payment Mode"),t.qZA(),t.TgZ(43,"td"),t._uU(44,"Consultation Date"),t.qZA(),t.TgZ(45,"td"),t._uU(46,"Status"),t.qZA()()(),t.TgZ(47,"tbody"),t.YNc(48,k,17,12,"tr",20),t.qZA()()()()()()()()()),2&l&&(t.xp6(20),t.Q6J("ngModel",o.clinicianName)("readonly",o.clinicianLocked),t.xp6(4),t.Q6J("ngIf",o.clinicians.length>0),t.xp6(2),t.Q6J("ngIf",null!=o.clinicianId),t.xp6(22),t.Q6J("ngForOf",o.consultations))},dependencies:[m.ez,m.sg,m.O5,_.u5,_.YN,_.Kr,_.Fj,_.JJ,_.On,_.UX,h.c]}),u})()}}]);