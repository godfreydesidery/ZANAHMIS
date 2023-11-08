"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[8356],{8356:(K,c,i)=>{i.r(c),i.d(c,{DischargeListComponent:()=>S});var u=i(5861),g=i(6814),h=i(9862),d=i(95),p=i(7069),f=i(4716),D=i(977),E=i(4185),M=i(553),t=i(6689),P=i(6466),A=i(7140),O=i(585),x=i(8237),Z=i(379),T=i(2848);function U(l,m){if(1&l){const e=t.EpF();t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.qZA(),t.TgZ(9,"td"),t._uU(10),t.qZA(),t.TgZ(11,"td")(12,"button",16),t.NdJ("click",function(){const a=t.CHM(e).$implicit,r=t.oxw();return t.KtG(r.getDischargeSummary(a.id))}),t._uU(13,"Print Discharge Summary"),t.qZA()()()}if(2&l){const e=m.$implicit;t.xp6(2),t.lnq("",null==e||null==e.admission||null==e.admission.patient?null:e.admission.patient.firstName," ",null==e||null==e.admission||null==e.admission.patient?null:e.admission.patient.middleName," ",null==e||null==e.admission||null==e.admission.patient?null:e.admission.patient.lastName,""),t.xp6(2),t.Oqu(null==e||null==e.admission||null==e.admission.patient?null:e.admission.patient.no),t.xp6(2),t.Oqu(null==e||null==e.admission||null==e.admission.patient?null:e.admission.patient.address),t.xp6(2),t.Oqu(null==e||null==e.admission||null==e.admission.patient?null:e.admission.patient.phoneNo),t.xp6(2),t.Oqu(null==e?null:e.status)}}var C=i(6236);const v=M.N.apiUrl;let S=(()=>{var l;class m{constructor(o,n,a,r,L,z,B){var _=this;this.auth=o,this.http=n,this.modalService=a,this.spinner=r,this.router=L,this.msgBox=z,this.data=B,this.dischargePlans=[],this.filterRecords="",this.print=function(){var b=(0,u.Z)(function*(s){if(null===s)return void _.msgBox.showErrorMessage3("No data to publish");_.documentHeader=yield _.data.getDocumentHeader();const R={header:"",footer:function(I,W){return I.toString()+" of "+W},content:[{columns:[_.documentHeader]},"  ",{text:"Discharge Summary",fontSize:14,bold:!0,alignment:"center"},_.data.getHorizontalLine(),{columns:[{width:200,layout:"noBorders",table:{widths:[200],body:[[{text:"Name: "+s?.admission?.patient?.firstName.toString()+" "+s?.admission?.patient?.middleName?.toString()+" "+s?.admission?.patient?.lastName?.toString(),fontSize:9}],[{text:"File No: "+s?.admission?.patient?.no.toString(),fontSize:9}],[{text:"Address: "+s?.admission?.patient?.address.toString(),fontSize:9}],[{text:"Phone No: "+s?.admission?.patient?.phoneNo.toString(),fontSize:9}]]}},{width:100,layout:"noBorders",table:{widths:[100],body:[[{text:"",fontSize:9}]]}},{width:200,layout:"noBorders",table:{widths:[200],body:[[{text:"Discharged At: "+(new D.$).transform(s.createdAt),fontSize:9}]]}}]}," "," ",{text:"Brief History & Patient Examination",fontSize:12,bold:!0},{text:s?.history,fontSize:9,bold:!1}," ",{text:"Investigation Done",fontSize:12,bold:!0},{text:s?.investigation,fontSize:9,bold:!1}," ",{text:"Inpatient Management",fontSize:12,bold:!0},{text:s?.management,fontSize:9,bold:!1}," ",{text:"Operation Done Note",fontSize:12,bold:!0},{text:s?.operationNote,fontSize:9,bold:!1}," ",{text:"ICU Admission Note",fontSize:12,bold:!0},{text:s?.icuAdmissionNote,fontSize:9,bold:!1}," ",{text:"General Recommendation and condition at Discharge",fontSize:12,bold:!0},{text:s?.generalRecommendation,fontSize:9,bold:!1}]};p.createPdf(R).print()});return function(s){return b.apply(this,arguments)}}(),window.pdfMake.vfs=C.pdfMake.vfs}ngOnInit(){var o=this;return(0,u.Z)(function*(){o.loadDischargeList()})()}loadDischargeList(){var o=this;return(0,u.Z)(function*(){let n={headers:(new h.WM).set("Authorization","Bearer "+o.auth.user.access_token)};o.spinner.show(),yield o.http.get(v+"/patients/load_discharge_list",n).pipe((0,f.x)(()=>o.spinner.hide())).toPromise().then(a=>{o.dischargePlans=a,console.log(a)}).catch(a=>{o.msgBox.showErrorMessage(a,""),console.log(a)})})()}getDischargeSummary(o){var n=this;return(0,u.Z)(function*(){if(!window.confirm("Confirm get Discharge summary. Confirm?"))return;let a={headers:(new h.WM).set("Authorization","Bearer "+n.auth.user.access_token)};n.spinner.show(),yield n.http.get(v+"/patients/get_discharge_summary?discharge_plan_id="+o,a).pipe((0,f.x)(()=>n.spinner.hide())).toPromise().then(r=>{n.dischargePlan=r,console.log(r),n.print(n.dischargePlan)}).catch(r=>{n.msgBox.showErrorMessage(r,""),console.log(r)})})()}grant(o){var n=!1;return o.forEach(a=>{this.auth.checkPrivilege(a)&&(n=!0)}),n}}return(l=m).\u0275fac=function(o){return new(o||l)(t.Y36(P.e),t.Y36(h.eN),t.Y36(A.FF),t.Y36(O.t2),t.Y36(x.F0),t.Y36(Z.l),t.Y36(T.D))},l.\u0275cmp=t.Xpm({type:l,selectors:[["app-discharge-list"]],standalone:!0,features:[t.jDz],decls:37,vars:5,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],[1,"btn-group"],[1,"panel-body"],[1,"col-sm-12",2,"height","100%","overflow","scroll"],[1,"col-sm-4"],["type","text","placeholder","Search...",1,"form-control","pull-right",2,"max-width","8cm",3,"ngModel","ngModelChange"],[1,"table-responsive"],[1,"table","table-bordered","table-hover","text-small"],[1,"success"],[4,"ngFor","ngForOf"],[1,"btn","btn-primary",3,"click"]],template:function(o,n){1&o&&(t.TgZ(0,"section",0)(1,"div",1)(2,"h1"),t._uU(3,"Discharge List"),t.qZA()()(),t.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6),t._UZ(9,"div",7),t.qZA(),t.TgZ(10,"div",8)(11,"div",9)(12,"div",3),t._UZ(13,"div",10)(14,"div",10),t.TgZ(15,"div",10)(16,"input",11),t.NdJ("ngModelChange",function(r){return n.filterRecords=r}),t.qZA()()(),t._UZ(17,"br"),t.TgZ(18,"div",12)(19,"table",13)(20,"thead",14)(21,"tr")(22,"th"),t._uU(23,"Name"),t.qZA(),t.TgZ(24,"th"),t._uU(25,"Patient's File No"),t.qZA(),t.TgZ(26,"th"),t._uU(27,"Address"),t.qZA(),t.TgZ(28,"th"),t._uU(29,"Phone No"),t.qZA(),t.TgZ(30,"th"),t._uU(31,"Status"),t.qZA(),t.TgZ(32,"th"),t._uU(33,"Action"),t.qZA()()(),t.TgZ(34,"tbody"),t.YNc(35,U,14,7,"tr",15),t.ALo(36,"searchFilter"),t.qZA()()()()()()()()()),2&o&&(t.xp6(16),t.Q6J("ngModel",n.filterRecords),t.xp6(19),t.Q6J("ngForOf",t.xi3(36,2,n.dischargePlans,n.filterRecords)))},dependencies:[g.ez,g.sg,d.u5,d.Fj,d.JJ,d.On,d.UX,E.G]}),m})()}}]);