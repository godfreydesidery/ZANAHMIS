"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[1041],{1041:(W,b,n)=>{n.r(b),n.d(b,{LabTestStatisticsReportComponent:()=>x});var h=n(5861),M=n(9862),A=n(553),C=n(775),g=n(6814),O=n(7069),p=n(95),D=n(4716),t=n(6689),y=n(6466),R=n(7140),U=n(585),P=n(379),S=n(2848);function Z(i,m){if(1&i&&(t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA()()),2&i){const _=m.$implicit;t.xp6(2),t.Oqu(_.sn),t.xp6(2),t.Oqu(_.name),t.xp6(2),t.Oqu(_.qty)}}var L=n(6236);const B=n(217),I=A.N.apiUrl;let x=(()=>{var i;class m{constructor(s,o,e,r,T,d){var a=this;this.auth=s,this.http=o,this.modalService=e,this.spinner=r,this.msgBox=T,this.data=d,this.report=[],this.filterRecords="",this.labTests=[],this.labTestTypes=[],this.print=(0,h.Z)(function*(){if(0===a.labTests.length)return void a.msgBox.showErrorMessage3("No data to print");a.documentHeader=yield a.data.getDocumentHeader();var f=[[{text:"SN",fontSize:6,fillColor:"#bdc6c7"},{text:"Lab Test Type",fontSize:6,fillColor:"#bdc6c7"},{text:"Qty",fontSize:6,fillColor:"#bdc6c7"}]];a.labTestTypes.forEach(u=>{var E=[{text:u.sn.toString(),fontSize:6,fillColor:"#ffffff"},{text:u.name,fontSize:6,fillColor:"#ffffff"},{text:u.qty.toString(),fontSize:6,fillColor:"#ffffff"}];f.push(E)});const N={header:"",footer:function(u,E){return u.toString()+" of "+E},content:[{columns:[a.documentHeader]},"  ",{text:"Lab Test Statistics Report",fontSize:14,bold:!0,alignment:"center"},a.data.getHorizontalLine()," ",{layout:"noBorders",table:{widths:[80,80],body:[[{text:"From: "+a.from.toString(),fontSize:9},{text:"To: "+a.to.toString(),fontSize:9}]]}},"  ",{table:{headerRows:1,widths:[30,300,50],body:f}}]};O.createPdf(N).print()}),window.pdfMake.vfs=L.pdfMake.vfs}ngOnInit(){return(0,h.Z)(function*(){})()}loadLabTestReport(s,o){var e=this;return(0,h.Z)(function*(){let r={headers:(new M.WM).set("Authorization","Bearer "+e.auth.user.access_token)};if(void 0!==s&&void 0!==o)if(s>o)e.msgBox.showErrorMessage3("Could not run. Start date must be earlier or equal to end date");else{var T={from:s,to:o};e.spinner.show(),yield e.http.post(I+"/reports/lab_test_statistics_report",T,r).pipe((0,D.x)(()=>e.spinner.hide())).toPromise().then(d=>{console.log(d),e.labTests=d,e.labTestTypes=[],e.labTests.forEach(l=>{var f=!1;if(e.labTestTypes.forEach(c=>{l.labTestType.id===c.id&&(c.qty=c.qty+l.patientBill.qty,f=!0)}),!1===f){var v=l.labTestType;v.qty=l.patientBill.qty,e.labTestTypes.push(v)}}),e.labTestTypes.sort();var a=1;e.labTestTypes.forEach(l=>{l.sn=a,a+=1})}).catch(d=>{console.log(d),e.msgBox.showErrorMessage(d,"")})}else e.msgBox.showErrorMessage3("Could not run. Please select date range")})()}clear(){this.labTests=[],this.labTestTypes=[]}exportToSpreadsheet(){var s=this;return(0,h.Z)(function*(){let o=new C.Workbook,e=o.addWorksheet("Daily Sales Report");e.columns=[{header:"DATE",key:"DATE"},{header:"AMOUNT",key:"AMOUNT"},{header:"DISCOUNT",key:"DISCOUNT"},{header:"TAX",key:"TAX"}],s.spinner.show(),s.report.forEach(r=>{e.addRow({DATE:(0,g.p6)("","yyyy-MM-dd","en-US"),AMOUNT:"",DISCOUNT:"",TAX:""},"n")}),e.addRow({CODE:"",DESCRIPTION:"",QTY:"Total",AMOUNT:""},"n"),s.spinner.hide(),o.xlsx.writeBuffer().then(r=>{let T=new Blob([r],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});B.saveAs(T,"Report Template "+s.from+" to "+s.to+".xlsx")})})()}grant(s){var o=!1;return s.forEach(e=>{this.auth.checkPrivilege(e)&&(o=!0)}),o}}return(i=m).\u0275fac=function(s){return new(s||i)(t.Y36(y.e),t.Y36(M.eN),t.Y36(R.FF),t.Y36(U.t2),t.Y36(P.l),t.Y36(S.D))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-lab-test-statistics-report"]],standalone:!0,features:[t.jDz],decls:46,vars:3,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],["type","button",1,"btn","btn-success","btn-outline",3,"click"],[1,"fa","fa-print"],[1,"panel-body"],[1,"col-sm-1"],[1,"col-sm-2"],["type","date",1,"form-control",3,"ngModel","ngModelChange"],[1,"btn","btn-primary","btn-outline",3,"click"],[1,"table","table-responsive","table-small","table-striped","table-bordered"],[4,"ngFor","ngForOf"]],template:function(s,o){1&s&&(t.TgZ(0,"section",0)(1,"div",1)(2,"h1"),t._uU(3,"Lab Tests Statistics Report"),t.qZA()()(),t.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"button",7),t.NdJ("click",function(){return o.print()}),t._UZ(10,"i",8),t._uU(11," Print"),t.qZA()(),t.TgZ(12,"div",9)(13,"div",3)(14,"div",4)(15,"div",3)(16,"div",10)(17,"h4"),t._uU(18,"From"),t.qZA()(),t.TgZ(19,"div",11)(20,"input",12),t.NdJ("ngModelChange",function(r){return o.from=r}),t.qZA()(),t.TgZ(21,"div",10)(22,"h4"),t._uU(23,"To"),t.qZA()(),t.TgZ(24,"div",11)(25,"input",12),t.NdJ("ngModelChange",function(r){return o.to=r}),t.qZA()(),t.TgZ(26,"div",11)(27,"button",13),t.NdJ("click",function(){return o.loadLabTestReport(o.from,o.to)}),t._uU(28,"Run Report"),t.qZA()(),t.TgZ(29,"div",10)(30,"button",13),t.NdJ("click",function(){return o.clear()}),t._uU(31,"Clear"),t.qZA()()()()(),t.TgZ(32,"div",3),t._UZ(33,"hr"),t.TgZ(34,"div",4)(35,"table",14)(36,"thead")(37,"tr")(38,"td"),t._uU(39,"SN"),t.qZA(),t.TgZ(40,"td"),t._uU(41,"Test Type"),t.qZA(),t.TgZ(42,"td"),t._uU(43,"Qty"),t.qZA()()(),t.TgZ(44,"tbody"),t.YNc(45,Z,7,3,"tr",15),t.qZA()()()()()()()()()),2&s&&(t.xp6(20),t.Q6J("ngModel",o.from),t.xp6(5),t.Q6J("ngModel",o.to),t.xp6(20),t.Q6J("ngForOf",o.labTestTypes))},dependencies:[g.ez,g.sg,p.u5,p.Fj,p.JJ,p.On,p.UX]}),m})()}}]);