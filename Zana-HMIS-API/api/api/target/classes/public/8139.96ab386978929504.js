"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[8139],{8139:(y,i,e)=>{e.r(i),e.d(i,{ReportTemplateComponent:()=>U});var d=e(5861),p=(e(553),e(775)),m=e(6814),c=e(7069),t=e(6689),v=e(6466),u=e(9862),D=e(7140),M=e(585),O=e(379),P=e(2848),R=e(6236);const A=e(217);let U=(()=>{var r;class T{constructor(n,o,a,s,_,C){var l=this;this.auth=n,this.http=o,this.modalService=a,this.spinner=s,this.msgBox=_,this.data=C,this.report=[],this.filterRecords="",this.exportToPdf=(0,d.Z)(function*(){l.documentHeader=yield l.data.getDocumentHeader();var h="Report Template";const g={header:"",footer:function(I,x){return I.toString()+" of "+x},content:[{columns:[l.documentHeader]},"  ","  ",{text:h,fontSize:14,bold:!0,alignment:"center"},l.data.getHorizontalLine(),"  ","  ","  ",{text:h,fontSize:12,bold:!0},"  ",{layout:"noBorders",table:{widths:[75,300],body:[[{text:"From",fontSize:9},{text:"",fontSize:9}],[{text:"To",fontSize:9},{text:"",fontSize:9}],[{text:"Agent/Route",fontSize:9},{text:"",fontSize:9}]]}},"  "]};c.createPdf(g).print()}),window.pdfMake.vfs=R.pdfMake.vfs}ngOnInit(){return(0,d.Z)(function*(){})()}exportToSpreadsheet(){var n=this;return(0,d.Z)(function*(){let o=new p.Workbook,a=o.addWorksheet("Daily Sales Report");a.columns=[{header:"DATE",key:"DATE"},{header:"AMOUNT",key:"AMOUNT"},{header:"DISCOUNT",key:"DISCOUNT"},{header:"TAX",key:"TAX"}],n.spinner.show(),n.report.forEach(s=>{a.addRow({DATE:(0,m.p6)("","yyyy-MM-dd","en-US"),AMOUNT:"",DISCOUNT:"",TAX:""},"n")}),a.addRow({CODE:"",DESCRIPTION:"",QTY:"Total",AMOUNT:""},"n"),n.spinner.hide(),o.xlsx.writeBuffer().then(s=>{let _=new Blob([s],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});A.saveAs(_,"Report Template "+n.from+" to "+n.to+".xlsx")})})()}grant(n){var o=!1;return n.forEach(a=>{this.auth.checkPrivilege(a)&&(o=!0)}),o}}return(r=T).\u0275fac=function(n){return new(n||r)(t.Y36(v.e),t.Y36(u.eN),t.Y36(D.FF),t.Y36(M.t2),t.Y36(O.l),t.Y36(P.D))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-report-template"]],standalone:!0,features:[t.jDz],decls:16,vars:0,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],[1,"panel-body"],["type","button",1,"btn","btn-success","m-r-2","m-b-5","pull-right",3,"click"]],template:function(n,o){1&n&&(t.TgZ(0,"section",0)(1,"div",1)(2,"h1"),t._uU(3,"Report Template"),t.qZA()()(),t.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5),t._UZ(8,"div",6),t.TgZ(9,"div",7),t._UZ(10,"div",4),t.TgZ(11,"div")(12,"button",8),t.NdJ("click",function(){return o.exportToPdf()}),t._uU(13,"Run pdf"),t.qZA(),t.TgZ(14,"button",8),t.NdJ("click",function(){return o.exportToSpreadsheet()}),t._uU(15,"Run spreadsheet"),t.qZA()()()()()()())},dependencies:[m.ez]}),T})()}}]);