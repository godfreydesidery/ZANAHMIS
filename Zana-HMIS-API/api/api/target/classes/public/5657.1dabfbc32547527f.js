"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[5657],{5657:(L,p,i)=>{i.r(p),i.d(p,{NurseInpatientListComponent:()=>O});var u=i(5861),h=i(6814),d=i(9862),o=i(95),m=i(8237),c=i(4716),Z=i(4185),v=i(553),t=i(6689),E=i(6466),A=i(1581),T=i(585),U=i(379);function M(l,_){if(1&l){const e=t.EpF();t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.qZA(),t.TgZ(9,"td"),t._uU(10),t.qZA(),t.TgZ(11,"td"),t._uU(12),t.qZA(),t.TgZ(13,"td")(14,"a",20),t.NdJ("click",function(){const r=t.CHM(e).$implicit,a=t.oxw();return t.KtG(a.postAdmission(r.id))}),t._uU(15,"Attend"),t.qZA()()()}if(2&l){const e=_.$implicit;t.xp6(2),t.Oqu((null==e||null==e.patient?null:e.patient.firstName)+" "+(null==e||null==e.patient?null:e.patient.middleName)+" "+(null==e||null==e.patient?null:e.patient.lastName)),t.xp6(2),t.Oqu(null==e||null==e.patient?null:e.patient.no),t.xp6(2),t.Oqu(null==e||null==e.patient?null:e.patient.paymentType),t.xp6(2),t.Oqu(null==e||null==e.patient?null:e.patient.gender),t.xp6(2),t.Oqu(null==e||null==e.wardBed||null==e.wardBed.ward?null:e.wardBed.ward.name),t.xp6(2),t.Oqu(null==e||null==e.wardBed?null:e.wardBed.no)}}const g=v.N.apiUrl;let O=(()=>{var l;class _{constructor(n,s,r,a,I,f){this.auth=n,this.http=s,this.modalService=r,this.spinner=a,this.router=I,this.msgBox=f,this.nurseId=null,this.admissions=[],this.filterRecords=""}ngOnInit(){var n=this;return(0,u.Z)(function*(){yield n.loadNurse(),null!=n.nurseId?n.loadInpatientList():n.msgBox.showErrorMessage3("User not found in nurse register")})()}loadInpatientList(){var n=this;return(0,u.Z)(function*(){n.admissions=[];let s={headers:(new d.WM).set("Authorization","Bearer "+n.auth.user.access_token)};n.spinner.show(),yield n.http.get(g+"/patients/get_nurse_inpatient_list",s).pipe((0,c.x)(()=>n.spinner.hide())).toPromise().then(r=>{n.admissions=r,console.log(n.admissions)}).catch(r=>{n.msgBox.showErrorMessage(r,"Could not load patients")})})()}loadNurse(){var n=this;return(0,u.Z)(function*(){var s=localStorage.getItem("username");let r={headers:(new d.WM).set("Authorization","Bearer "+n.auth.user.access_token)};n.spinner.show(),yield n.http.get(g+"/nurses/load_nurse_by_username?username="+s,r).pipe((0,c.x)(()=>n.spinner.hide())).toPromise().then(a=>{n.nurseId=a}).catch(a=>{n.msgBox.showErrorMessage(a,"Could not load nurse")})})()}postAdmission(n){var s=this;return(0,u.Z)(function*(){localStorage.setItem("admission-id",n),localStorage.setItem("nurse-id",s.nurseId),s.router.navigate(["nurse-inpatient-chart"])})()}grant(n){var s=!1;return n.forEach(r=>{this.auth.checkPrivilege(r)&&(s=!0)}),s}}return(l=_).\u0275fac=function(n){return new(n||l)(t.Y36(E.e),t.Y36(d.eN),t.Y36(A.FF),t.Y36(T.t2),t.Y36(m.F0),t.Y36(U.l))},l.\u0275cmp=t.Xpm({type:l,selectors:[["app-nurse-inpatient-list"]],standalone:!0,features:[t.jDz],decls:48,vars:5,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],[1,"btn-group"],["routerLink","/nurse-outpatient-list",1,"btn","btn-primary","btn-outline",2,"margin","1px"],[1,"fa","fa-list"],["routerLink","/nurse-inpatient-list",1,"btn","btn-primary",2,"margin","1px"],["routerLink","/nurse-outsider-list",1,"btn","btn-primary","btn-outline",2,"margin","1px"],[1,"panel-body"],[1,"col-sm-12",2,"height","100%","overflow","scroll"],[1,"col-sm-4"],["type","text","placeholder","Search...",1,"form-control","pull-right",2,"max-width","8cm",3,"ngModel","ngModelChange"],[1,"table-responsive"],[1,"table","table-bordered","table-hover","text-small"],[1,"success"],[4,"ngFor","ngForOf"],[1,"btn","btn-success",3,"click"]],template:function(n,s){1&n&&(t.TgZ(0,"section",0)(1,"div",1)(2,"h1"),t._uU(3,"Nurse - Inpatient List"),t.qZA()()(),t.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"div",7)(10,"a",8),t._UZ(11,"i",9),t._uU(12,"Outpatient List"),t.qZA(),t.TgZ(13,"a",10),t._UZ(14,"i",9),t._uU(15,"Inpatient List"),t.qZA(),t.TgZ(16,"a",11),t._UZ(17,"i",9),t._uU(18,"Outsider List"),t.qZA()()(),t.TgZ(19,"div",12)(20,"div",13)(21,"div",3),t._UZ(22,"div",14)(23,"div",14),t.TgZ(24,"div",14)(25,"input",15),t.NdJ("ngModelChange",function(a){return s.filterRecords=a}),t.qZA()()(),t._UZ(26,"br"),t.TgZ(27,"div",16)(28,"table",17)(29,"thead",18)(30,"tr")(31,"th"),t._uU(32,"Name"),t.qZA(),t.TgZ(33,"th"),t._uU(34,"Patient's File No"),t.qZA(),t.TgZ(35,"th"),t._uU(36,"Payment Type"),t.qZA(),t.TgZ(37,"th"),t._uU(38,"Gender"),t.qZA(),t.TgZ(39,"th"),t._uU(40,"Ward"),t.qZA(),t.TgZ(41,"th"),t._uU(42,"Bed/Room"),t.qZA(),t.TgZ(43,"th"),t._uU(44,"Action"),t.qZA()()(),t.TgZ(45,"tbody"),t.YNc(46,M,16,6,"tr",19),t.ALo(47,"searchFilter"),t.qZA()()()()()()()()()),2&n&&(t.xp6(25),t.Q6J("ngModel",s.filterRecords),t.xp6(21),t.Q6J("ngForOf",t.xi3(47,2,s.admissions,s.filterRecords)))},dependencies:[h.ez,h.sg,o.u5,o.Fj,o.JJ,o.On,o.UX,Z.G,m.rH]}),_})()}}]);