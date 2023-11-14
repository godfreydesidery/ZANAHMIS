"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[8664],{8664:(I,g,s)=>{s.r(g),s.d(g,{MyConsultationComponent:()=>x});var _=s(5861),d=s(6814),u=s(9862),c=s(95),m=s(8237),p=s(4716),Z=s(4185),M=s(553),t=s(6689),f=s(6466),v=s(1581),C=s(585),T=s(379);function E(a,l){if(1&a){const o=t.EpF();t.TgZ(0,"a",22),t.NdJ("click",function(){t.CHM(o);const n=t.oxw().$implicit,r=t.oxw(2);return t.KtG(r.postConsultation(n.id))}),t._uU(1,"Attend"),t.qZA()}}function A(a,l){if(1&a){const o=t.EpF();t.TgZ(0,"a",22),t.NdJ("click",function(){t.CHM(o);const n=t.oxw().$implicit,r=t.oxw(2);return t.KtG(r.cancelTransfer(n.id))}),t._uU(1,"Cancel Transfer"),t.qZA()}}function U(a,l){if(1&a&&(t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.qZA(),t.TgZ(9,"td"),t._uU(10),t.qZA(),t.TgZ(11,"td"),t._uU(12),t.qZA(),t.TgZ(13,"td"),t._uU(14),t.qZA(),t.TgZ(15,"td"),t.YNc(16,E,2,0,"a",21),t.YNc(17,A,2,0,"a",21),t.qZA()()),2&a){const o=l.$implicit;t.xp6(2),t.Oqu(o.id),t.xp6(2),t.lnq("",o.patient.firstName," ",o.patient.middleName," ",o.patient.lastName,""),t.xp6(2),t.Oqu(o.patient.no),t.xp6(2),t.Oqu(o.paymentType),t.xp6(2),t.Oqu(o.clinician.nickname),t.xp6(2),t.Oqu(o.clinic.name),t.xp6(2),t.Oqu(o.status),t.xp6(2),t.Q6J("ngIf","IN-PROCESS"===(null==o?null:o.status)),t.xp6(1),t.Q6J("ngIf","TRANSFERED"===(null==o?null:o.status))}}function O(a,l){if(1&a&&(t.TgZ(0,"div",17)(1,"table",18)(2,"thead",19)(3,"tr")(4,"th"),t._uU(5,"ID"),t.qZA(),t.TgZ(6,"th"),t._uU(7,"Name"),t.qZA(),t.TgZ(8,"th"),t._uU(9,"Patient's File No"),t.qZA(),t.TgZ(10,"th"),t._uU(11,"Payment Type"),t.qZA(),t.TgZ(12,"th"),t._uU(13,"Dr. Name"),t.qZA(),t.TgZ(14,"th"),t._uU(15,"Clinic"),t.qZA(),t.TgZ(16,"th"),t._uU(17,"Status"),t.qZA(),t.TgZ(18,"th"),t._uU(19,"Action"),t.qZA()()(),t.TgZ(20,"tbody"),t.YNc(21,U,18,11,"tr",20),t.ALo(22,"searchFilter"),t.qZA()()()),2&a){const o=t.oxw();t.xp6(21),t.Q6J("ngForOf",t.xi3(22,1,o.consultations,o.filterRecords))}}const h=M.N.apiUrl;let x=(()=>{var a;class l{constructor(i,n,r,e,y,P){this.auth=i,this.http=n,this.modalService=r,this.spinner=e,this.router=y,this.msgBox=P,this.clinicianId=null,this.consultations=[],this.filterRecords=""}ngOnInit(){var i=this;return(0,_.Z)(function*(){yield i.loadClinician(),null!=i.clinicianId?yield i.loadOpenedList(i.clinicianId):i.msgBox.showErrorMessage3("User not found in doctors register")})()}loadClinician(){var i=this;return(0,_.Z)(function*(){var n=localStorage.getItem("username");let r={headers:(new u.WM).set("Authorization","Bearer "+i.auth.user.access_token)};i.spinner.show(),yield i.http.get(h+"/clinicians/load_clinician_by_username?username="+n,r).pipe((0,p.x)(()=>i.spinner.hide())).toPromise().then(e=>{i.clinicianId=e}).catch(e=>{i.msgBox.showErrorMessage(e,"Could not load doctor")})})()}loadOpenedList(i){var n=this;return(0,_.Z)(function*(){let r={headers:(new u.WM).set("Authorization","Bearer "+n.auth.user.access_token)};n.spinner.show(),yield n.http.get(h+"/patients/load_in_process_consultations_by_clinician_id?clinician_id="+i,r).pipe((0,p.x)(()=>n.spinner.hide())).toPromise().then(e=>{console.log(e),n.consultations=e}).catch(e=>{n.msgBox.showErrorMessage(e,""),console.log(e)})})()}postConsultation(i){var n=this;return(0,_.Z)(function*(){localStorage.setItem("consultation-id",i),n.router.navigate(["doctor-cracking"])})()}cancelTransfer(i){var n=this;return(0,_.Z)(function*(){if(!window.confirm("Confirm canceling this transfer?"))return;let r={headers:(new u.WM).set("Authorization","Bearer "+n.auth.user.access_token)};n.spinner.show(),yield n.http.get(h+"/patients/cancel_consultation_transfer?id="+i,r).pipe((0,p.x)(()=>n.spinner.hide())).toPromise().then(e=>{console.log(e),n.loadOpenedList(n.clinicianId)}).catch(e=>{n.msgBox.showErrorMessage(e,""),console.log(e)})})()}grant(i){var n=!1;return i.forEach(r=>{this.auth.checkPrivilege(r)&&(n=!0)}),n}}return(a=l).\u0275fac=function(i){return new(i||a)(t.Y36(f.e),t.Y36(u.eN),t.Y36(v.FF),t.Y36(C.t2),t.Y36(m.F0),t.Y36(T.l))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-my-consultation"]],standalone:!0,features:[t.jDz],decls:29,vars:2,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],[1,"btn-group"],["routerLink","/list-from-reception",1,"btn","btn-primary","btn-outline",2,"margin","1px"],[1,"fa","fa-list"],["routerLink","/my-consultation",1,"btn","btn-primary",2,"margin","1px"],["routerLink","/doctor-inpatient-list",1,"btn","btn-primary","btn-outline",2,"margin","1px"],[1,"panel-body"],[1,"col-sm-12",2,"height","100%","overflow","scroll"],[1,"col-sm-4"],["type","text","placeholder","Search...",1,"form-control","pull-right",2,"max-width","8cm",3,"ngModel","ngModelChange"],["class","table-responsive",4,"ngIf"],[1,"table-responsive"],[1,"table","table-bordered","table-hover"],[1,"success"],[4,"ngFor","ngForOf"],["class","btn btn-success",3,"click",4,"ngIf"],[1,"btn","btn-success",3,"click"]],template:function(i,n){1&i&&(t.TgZ(0,"section",0)(1,"div",1)(2,"h1"),t._uU(3,"My Consultations"),t.qZA()()(),t.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"div",7)(10,"a",8),t._UZ(11,"i",9),t._uU(12,"List From Reception"),t.qZA(),t.TgZ(13,"a",10),t._UZ(14,"i",9),t._uU(15,"My Consultations"),t.qZA(),t.TgZ(16,"a",11),t._UZ(17,"i",9),t._uU(18,"Inpatient List"),t.qZA()()(),t.TgZ(19,"div",12)(20,"div",3)(21,"div",13)(22,"div",3),t._UZ(23,"div",14)(24,"div",14),t.TgZ(25,"div",14)(26,"input",15),t.NdJ("ngModelChange",function(e){return n.filterRecords=e}),t.qZA()()(),t._UZ(27,"br"),t.YNc(28,O,23,4,"div",16),t.qZA()()()()()()()),2&i&&(t.xp6(26),t.Q6J("ngModel",n.filterRecords),t.xp6(2),t.Q6J("ngIf",null!=n.clinicianId))},dependencies:[d.ez,d.sg,d.O5,c.u5,c.Fj,c.JJ,c.On,c.UX,Z.G,m.rH]}),l})()}}]);