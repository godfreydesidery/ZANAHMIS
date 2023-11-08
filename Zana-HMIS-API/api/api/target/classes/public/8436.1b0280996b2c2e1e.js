"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[8436],{8436:(C,d,o)=>{o.r(d),o.d(d,{PatientDirectInvoicesComponent:()=>O});var _=o(5861),h=o(6814),u=o(9862),l=o(95),v=o(8237),g=o(4716),E=o(4185),P=o(553),t=o(6689),D=o(6466),M=o(7140),Z=o(585),A=o(379);function I(r,p){if(1&r){const i=t.EpF();t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td")(8,"span",16),t.NdJ("click",function(){const s=t.CHM(i).$implicit,a=t.oxw();return t.KtG(a.setInvoice(s.id))}),t._uU(9,"Select"),t.qZA()()()}if(2&r){const i=p.$implicit;t.xp6(2),t.Oqu(i.no),t.xp6(2),t.lnq("",null==i||null==i.patient?null:i.patient.firstName," ",null==i||null==i.patient?null:i.patient.middleName," ",null==i||null==i.patient?null:i.patient.lastName,""),t.xp6(2),t.Oqu(null==i||null==i.patient?null:i.patient.no)}}const m=P.N.apiUrl;let O=(()=>{var r;class p{constructor(e,n,s,a,c,f){this.auth=e,this.http=n,this.modalService=s,this.spinner=a,this.router=c,this.msgBox=f,this.invoices=[],this.filterRecords=""}ngOnInit(){var e=this;return(0,_.Z)(function*(){e.loadPatientDirectInvoices()})()}loadPatientDirectInvoices(){var e=this;return(0,_.Z)(function*(){let n={headers:(new u.WM).set("Authorization","Bearer "+e.auth.user.access_token)};e.spinner.show(),yield e.http.get(m+"/patients/get_patient_direct_pending_invoices",n).pipe((0,g.x)(()=>e.spinner.hide())).toPromise().then(s=>{e.invoices=s,console.log(s)}).catch(s=>{e.msgBox.showErrorMessage(s,""),console.log(s)})})()}postConsultation(e){var n=this;return(0,_.Z)(function*(){localStorage.setItem("consultation-id",e);let s={headers:(new u.WM).set("Authorization","Bearer "+n.auth.user.access_token)};var a=!1;n.spinner.show(),yield n.http.get(m+"/patients/open_consultation?consultation_id="+e,s).pipe((0,g.x)(()=>n.spinner.hide())).toPromise().then(c=>{a=!0}).catch(c=>{n.msgBox.showErrorMessage(c,""),console.log(c)}),a?n.router.navigate(["doctor-cracking"]):n.msgBox.showErrorMessage3("Could not open")})()}setInvoice(e){return(0,_.Z)(function*(){localStorage.setItem("patient-invoice-id",e)})()}grant(e){var n=!1;return e.forEach(s=>{this.auth.checkPrivilege(s)&&(n=!0)}),n}}return(r=p).\u0275fac=function(e){return new(e||r)(t.Y36(D.e),t.Y36(u.eN),t.Y36(M.FF),t.Y36(Z.t2),t.Y36(v.F0),t.Y36(A.l))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-patient-direct-invoices"]],standalone:!0,features:[t.jDz],decls:33,vars:5,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],[1,"btn-group"],[1,"panel-body"],[1,"col-sm-12",2,"height","100%","overflow","scroll"],[1,"col-sm-4"],["type","text","placeholder","Search...",1,"form-control","pull-right",2,"max-width","8cm",3,"ngModel","ngModelChange"],[1,"table-responsive"],[1,"table","table-bordered","table-hover","text-small"],[1,"success"],[4,"ngFor","ngForOf"],["routerLink","/patient-invoice",3,"click"]],template:function(e,n){1&e&&(t.TgZ(0,"section",0)(1,"div",1)(2,"h1"),t._uU(3,"Patient Direct Invoices"),t.qZA()()(),t.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6),t._UZ(9,"div",7),t.qZA(),t.TgZ(10,"div",8)(11,"div",9)(12,"div",3),t._UZ(13,"div",10)(14,"div",10),t.TgZ(15,"div",10)(16,"input",11),t.NdJ("ngModelChange",function(a){return n.filterRecords=a}),t.qZA()()(),t._UZ(17,"br"),t.TgZ(18,"div",12)(19,"table",13)(20,"thead",14)(21,"tr")(22,"th"),t._uU(23,"Invoice No"),t.qZA(),t.TgZ(24,"th"),t._uU(25,"Name"),t.qZA(),t.TgZ(26,"th"),t._uU(27,"Patient's File No"),t.qZA(),t.TgZ(28,"th"),t._uU(29,"Action"),t.qZA()()(),t.TgZ(30,"tbody"),t.YNc(31,I,10,5,"tr",15),t.ALo(32,"searchFilter"),t.qZA()()()()()()()()()),2&e&&(t.xp6(16),t.Q6J("ngModel",n.filterRecords),t.xp6(15),t.Q6J("ngForOf",t.xi3(32,2,n.invoices,n.filterRecords)))},dependencies:[h.ez,h.sg,l.u5,l.Fj,l.JJ,l.On,l.UX,E.G,v.rH]}),p})()}}]);