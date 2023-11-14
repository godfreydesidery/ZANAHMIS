"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[4363],{4363:(K,p,s)=>{s.r(p),s.d(p,{DeceasedListComponent:()=>S});var c=s(5861),g=s(6814),m=s(9862),u=s(95),f=s(7069),v=s(4716),E=s(4185),M=s(553),t=s(6689),P=s(6466),Z=s(1581),A=s(585),O=s(8237),T=s(379),x=s(2848);function C(l,h){if(1&l){const e=t.EpF();t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.qZA(),t.TgZ(9,"td"),t._uU(10),t.qZA(),t.TgZ(11,"td")(12,"button",16),t.NdJ("click",function(){const a=t.CHM(e).$implicit,i=t.oxw();return t.KtG(i.getDeceasedSummary(a.id))}),t._uU(13,"Print Deceased Summary"),t.qZA()()()}if(2&l){const e=h.$implicit;t.xp6(2),t.lnq("",null==e||null==e.patient?null:e.patient.firstName," ",null==e||null==e.patient?null:e.patient.middleName," ",null==e||null==e.patient?null:e.patient.lastName,""),t.xp6(2),t.Oqu(null==e||null==e.patient?null:e.patient.no),t.xp6(2),t.Oqu(null==e||null==e.patient?null:e.patient.address),t.xp6(2),t.Oqu(null==e||null==e.patient?null:e.patient.phoneNo),t.xp6(2),t.Oqu(null==e?null:e.status)}}var U=s(6236);const D=M.N.apiUrl;let S=(()=>{var l;class h{constructor(o,n,a,i,L,y,B){var _=this;this.auth=o,this.http=n,this.modalService=a,this.spinner=i,this.router=L,this.msgBox=y,this.data=B,this.deceasedNotes=[],this.filterRecords="",this.print=function(){var N=(0,c.Z)(function*(r){if(null===r)return void _.msgBox.showErrorMessage3("No data to publish");var d;if(null!=r.admission)d=r.admission.patient;else{if(null==r.consultation)return void _.msgBox.showErrorMessage3("Patient information missing");d=r.consultation.patient}_.documentHeader=yield _.data.getDocumentHeader();const R={header:"",footer:function(I,W){return I.toString()+" of "+W},content:[{columns:[_.documentHeader]},"  ",{text:"Death Summary",fontSize:14,bold:!0,alignment:"center"},_.data.getHorizontalLine(),{columns:[{width:200,layout:"noBorders",table:{widths:[200],body:[[{text:"Name: "+d?.firstName.toString()+" "+d?.middleName?.toString()+" "+d?.lastName?.toString(),fontSize:9}],[{text:"File No: "+d?.no.toString(),fontSize:9}],[{text:"Address: "+d?.address.toString(),fontSize:9}],[{text:"Phone No: "+d?.phoneNo.toString(),fontSize:9}]]}},{width:100,layout:"noBorders",table:{widths:[100],body:[[{text:"",fontSize:9}]]}},{width:200,layout:"noBorders",table:{widths:[200],body:[[{text:"",fontSize:9}]]}}]}," "," ",{text:"Patient Summary",fontSize:12,bold:!0},{text:r?.patientSummary,fontSize:9,bold:!1}," ",{text:"Cause of Death",fontSize:12,bold:!0},{text:r?.causeOfDeath,fontSize:9,bold:!1}," ",{text:"Date & Time of death",fontSize:12,bold:!0},{text:r?.date,fontSize:9,bold:!1},{text:r?.time,fontSize:9,bold:!1}]};f.createPdf(R).print()});return function(r){return N.apply(this,arguments)}}(),window.pdfMake.vfs=U.pdfMake.vfs}ngOnInit(){var o=this;return(0,c.Z)(function*(){o.loadDischargeList()})()}loadDischargeList(){var o=this;return(0,c.Z)(function*(){let n={headers:(new m.WM).set("Authorization","Bearer "+o.auth.user.access_token)};o.spinner.show(),yield o.http.get(D+"/patients/load_deceased_list",n).pipe((0,v.x)(()=>o.spinner.hide())).toPromise().then(a=>{o.deceasedNotes=a,console.log(a)}).catch(a=>{o.msgBox.showErrorMessage(a,""),console.log(a)})})()}getDeceasedSummary(o){var n=this;return(0,c.Z)(function*(){if(!window.confirm("Confirm get Discharge summary. Confirm?"))return;let a={headers:(new m.WM).set("Authorization","Bearer "+n.auth.user.access_token)};n.spinner.show(),yield n.http.get(D+"/patients/get_deceased_summary?deceased_note_id="+o,a).pipe((0,v.x)(()=>n.spinner.hide())).toPromise().then(i=>{n.deceasedNote=i,console.log(i),n.print(n.deceasedNote)}).catch(i=>{n.msgBox.showErrorMessage(i,""),console.log(i)})})()}grant(o){var n=!1;return o.forEach(a=>{this.auth.checkPrivilege(a)&&(n=!0)}),n}}return(l=h).\u0275fac=function(o){return new(o||l)(t.Y36(P.e),t.Y36(m.eN),t.Y36(Z.FF),t.Y36(A.t2),t.Y36(O.F0),t.Y36(T.l),t.Y36(x.D))},l.\u0275cmp=t.Xpm({type:l,selectors:[["app-deceased-list"]],standalone:!0,features:[t.jDz],decls:37,vars:5,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],[1,"btn-group"],[1,"panel-body"],[1,"col-sm-12",2,"height","100%","overflow","scroll"],[1,"col-sm-4"],["type","text","placeholder","Search...",1,"form-control","pull-right",2,"max-width","8cm",3,"ngModel","ngModelChange"],[1,"table-responsive"],[1,"table","table-bordered","table-hover","text-small"],[1,"success"],[4,"ngFor","ngForOf"],[1,"btn","btn-primary",3,"click"]],template:function(o,n){1&o&&(t.TgZ(0,"section",0)(1,"div",1)(2,"h1"),t._uU(3,"Deceased List"),t.qZA()()(),t.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6),t._UZ(9,"div",7),t.qZA(),t.TgZ(10,"div",8)(11,"div",9)(12,"div",3),t._UZ(13,"div",10)(14,"div",10),t.TgZ(15,"div",10)(16,"input",11),t.NdJ("ngModelChange",function(i){return n.filterRecords=i}),t.qZA()()(),t._UZ(17,"br"),t.TgZ(18,"div",12)(19,"table",13)(20,"thead",14)(21,"tr")(22,"th"),t._uU(23,"Name"),t.qZA(),t.TgZ(24,"th"),t._uU(25,"Patient's File No"),t.qZA(),t.TgZ(26,"th"),t._uU(27,"Address"),t.qZA(),t.TgZ(28,"th"),t._uU(29,"Phone No"),t.qZA(),t.TgZ(30,"th"),t._uU(31,"Status"),t.qZA(),t.TgZ(32,"th"),t._uU(33,"Action"),t.qZA()()(),t.TgZ(34,"tbody"),t.YNc(35,C,14,7,"tr",15),t.ALo(36,"searchFilter"),t.qZA()()()()()()()()()),2&o&&(t.xp6(16),t.Q6J("ngModel",n.filterRecords),t.xp6(19),t.Q6J("ngForOf",t.xi3(36,2,n.deceasedNotes,n.filterRecords)))},dependencies:[g.ez,g.sg,u.u5,u.Fj,u.JJ,u.On,u.UX,E.G]}),h})()}}]);