"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[4267],{4267:(L,g,s)=>{s.r(g),s.d(g,{ListFromReceptionComponent:()=>O});var p=s(5861),u=s(6814),d=s(9862),l=s(95),Z=s(8237),m=s(4716),v=s(4185),E=s(553),t=s(6689),A=s(6466),M=s(1581),T=s(585),f=s(379);function U(a,c){if(1&a){const i=t.EpF();t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.qZA(),t.TgZ(9,"td"),t._uU(10),t.qZA(),t.TgZ(11,"td"),t._uU(12),t.qZA(),t.TgZ(13,"td")(14,"a",21),t.NdJ("click",function(){const r=t.CHM(i).$implicit,o=t.oxw(2);return t.KtG(o.postConsultation(r.id))}),t._uU(15,"Attend"),t.qZA()()()}if(2&a){const i=c.$implicit;t.xp6(2),t.Oqu(i.id),t.xp6(2),t.lnq("",i.patient.firstName," ",i.patient.middleName," ",i.patient.lastName,""),t.xp6(2),t.Oqu(i.patient.no),t.xp6(2),t.Oqu(i.paymentType),t.xp6(2),t.Oqu(i.clinician.nickname),t.xp6(2),t.Oqu(i.clinic.name)}}function C(a,c){if(1&a&&(t.TgZ(0,"div",17)(1,"table",18)(2,"thead",19)(3,"tr")(4,"th"),t._uU(5,"ID"),t.qZA(),t.TgZ(6,"th"),t._uU(7,"Name"),t.qZA(),t.TgZ(8,"th"),t._uU(9,"Patient's File No"),t.qZA(),t.TgZ(10,"th"),t._uU(11,"Payment Type"),t.qZA(),t.TgZ(12,"th"),t._uU(13,"Dr. Name"),t.qZA(),t.TgZ(14,"th"),t._uU(15,"Clinic"),t.qZA(),t.TgZ(16,"th"),t._uU(17,"Action"),t.qZA()()(),t.TgZ(18,"tbody"),t.YNc(19,U,16,8,"tr",20),t.ALo(20,"searchFilter"),t.qZA()()()),2&a){const i=t.oxw();t.xp6(19),t.Q6J("ngForOf",t.xi3(20,1,i.consultations,i.filterRecords))}}const h=E.N.apiUrl;let O=(()=>{var a;class c{constructor(n,e,r,o,_,P){this.auth=n,this.http=e,this.modalService=r,this.spinner=o,this.router=_,this.msgBox=P,this.clinicianId=null,this.consultations=[],this.filterRecords=""}ngOnInit(){var n=this;return(0,p.Z)(function*(){yield n.loadClinician(),null!=n.clinicianId?yield n.loadListFromReception(n.clinicianId):n.msgBox.showErrorMessage3("User not found in doctors register")})()}loadClinician(){var n=this;return(0,p.Z)(function*(){var e=localStorage.getItem("username");let r={headers:(new d.WM).set("Authorization","Bearer "+n.auth.user.access_token)};n.spinner.show(),yield n.http.get(h+"/clinicians/load_clinician_by_username?username="+e,r).pipe((0,m.x)(()=>n.spinner.hide())).toPromise().then(o=>{n.clinicianId=o}).catch(o=>{n.msgBox.showErrorMessage(o,"Could not load doctor"),console.log(o)})})()}loadListFromReception(n){var e=this;return(0,p.Z)(function*(){let r={headers:(new d.WM).set("Authorization","Bearer "+e.auth.user.access_token)};e.spinner.show(),yield e.http.get(h+"/patients/load_pending_consultations_by_clinician_id?clinician_id="+n,r).pipe((0,m.x)(()=>e.spinner.hide())).toPromise().then(o=>{e.consultations=o,console.log(o)}).catch(o=>{e.msgBox.showErrorMessage(o,""),console.log(o)})})()}postConsultation(n){var e=this;return(0,p.Z)(function*(){localStorage.setItem("consultation-id",n);let r={headers:(new d.WM).set("Authorization","Bearer "+e.auth.user.access_token)};var o=!1;e.spinner.show(),yield e.http.get(h+"/patients/open_consultation?consultation_id="+n,r).pipe((0,m.x)(()=>e.spinner.hide())).toPromise().then(_=>{o=!0}).catch(_=>{e.msgBox.showErrorMessage(_,""),console.log(_)}),o?e.router.navigate(["doctor-cracking"]):e.msgBox.showErrorMessage3("Could not open")})()}grant(n){var e=!1;return n.forEach(r=>{this.auth.checkPrivilege(r)&&(e=!0)}),e}}return(a=c).\u0275fac=function(n){return new(n||a)(t.Y36(A.e),t.Y36(d.eN),t.Y36(M.FF),t.Y36(T.t2),t.Y36(Z.F0),t.Y36(f.l))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-list-from-reception"]],standalone:!0,features:[t.jDz],decls:29,vars:2,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],[1,"btn-group"],["routerLink","/list-from-reception",1,"btn","btn-primary",2,"margin","1px"],[1,"fa","fa-list"],["routerLink","/my-consultation",1,"btn","btn-primary","btn-outline",2,"margin","1px"],["routerLink","/doctor-inpatient-list",1,"btn","btn-primary","btn-outline",2,"margin","1px"],[1,"panel-body"],[1,"col-sm-12",2,"height","100%","overflow","scroll"],[1,"col-sm-4"],["type","text","placeholder","Search...",1,"form-control","pull-right",2,"max-width","8cm",3,"ngModel","ngModelChange"],["class","table-responsive",4,"ngIf"],[1,"table-responsive"],[1,"table","table-bordered","table-hover"],[1,"success"],[4,"ngFor","ngForOf"],[1,"btn","btn-success",3,"click"]],template:function(n,e){1&n&&(t.TgZ(0,"section",0)(1,"div",1)(2,"h1"),t._uU(3,"List From Reception"),t.qZA()()(),t.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"div",7)(10,"a",8),t._UZ(11,"i",9),t._uU(12,"List From Reception"),t.qZA(),t.TgZ(13,"a",10),t._UZ(14,"i",9),t._uU(15,"My Consultations"),t.qZA(),t.TgZ(16,"a",11),t._UZ(17,"i",9),t._uU(18,"Inpatient List"),t.qZA()()(),t.TgZ(19,"div",12)(20,"div",3)(21,"div",13)(22,"div",3),t._UZ(23,"div",14)(24,"div",14),t.TgZ(25,"div",14)(26,"input",15),t.NdJ("ngModelChange",function(o){return e.filterRecords=o}),t.qZA()()(),t._UZ(27,"br"),t.YNc(28,C,21,4,"div",16),t.qZA()()()()()()()),2&n&&(t.xp6(26),t.Q6J("ngModel",e.filterRecords),t.xp6(2),t.Q6J("ngIf",null!=e.clinicianId))},dependencies:[u.ez,u.sg,u.O5,l.u5,l.Fj,l.JJ,l.On,l.UX,v.G,Z.rH]}),c})()}}]);