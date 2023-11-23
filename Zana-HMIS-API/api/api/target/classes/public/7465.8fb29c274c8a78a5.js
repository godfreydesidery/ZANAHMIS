"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[7465],{3747:(P,d,e)=>{e.r(d),e.d(d,{RadiologyOutpatientListComponent:()=>L});var c=e(5861),p=e(6814),u=e(9862),r=e(95),g=e(8237),h=e(4716),m=e(4185),O=e(553),t=e(6689),E=e(6466),v=e(1581),Z=e(585),T=e(379);function A(s,l){if(1&s){const i=t.EpF();t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.qZA(),t.TgZ(9,"td")(10,"a",17),t.NdJ("click",function(){const a=t.CHM(i).$implicit,_=t.oxw();return t.KtG(_.attend(a.id))}),t._uU(11,"Attend"),t.qZA()()()}if(2&s){const i=l.$implicit;t.xp6(2),t.Oqu(i.firstName+" "+i.middleName+" "+i.lastName),t.xp6(2),t.Oqu(i.no),t.xp6(2),t.Oqu(i.paymentType),t.xp6(2),t.Oqu(i.gender)}}const M=O.N.apiUrl;let L=(()=>{var s;class l{constructor(n,o,a,_,U,y){this.auth=n,this.http=o,this.modalService=a,this.spinner=_,this.router=U,this.msgBox=y,this.patients=[],this.filterRecords=""}ngOnInit(){this.loadOutpatientList()}attend(n){localStorage.setItem("radiology-patient-id",n),this.router.navigate(["radiology"])}loadOutpatientList(){var n=this;return(0,c.Z)(function*(){n.patients=[];let o={headers:(new u.WM).set("Authorization","Bearer "+n.auth.user.access_token)};n.spinner.show(),yield n.http.get(M+"/patients/get_radiology_outpatient_list",o).pipe((0,h.x)(()=>n.spinner.hide())).toPromise().then(a=>{n.patients=a,console.log(n.patients)}).catch(a=>{n.msgBox.showErrorMessage(a,"Could not load patients")})})()}grant(n){var o=!1;return n.forEach(a=>{this.auth.checkPrivilege(a)&&(o=!0)}),o}}return(s=l).\u0275fac=function(n){return new(n||s)(t.Y36(E.e),t.Y36(u.eN),t.Y36(v.FF),t.Y36(Z.t2),t.Y36(g.F0),t.Y36(T.l))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-radiology-outpatient-list"]],standalone:!0,features:[t.jDz],decls:39,vars:5,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],["routerLink","/radiology-outpatient-list",1,"btn","btn-primary"],["routerLink","/radiology-inpatient-list",1,"btn","btn-primary","btn-outline"],["routerLink","/radiology-outsider-list",1,"btn","btn-primary","btn-outline"],[1,"panel-body"],[1,"col-sm-4"],["type","text","placeholder","Search...",1,"form-control","pull-right",2,"max-width","8cm",3,"ngModel","ngModelChange"],[1,"table-responsive"],[1,"table","table-bordered","table-hover"],[1,"success"],[4,"ngFor","ngForOf"],[1,"btn","btn-success",3,"click"]],template:function(n,o){1&n&&(t.TgZ(0,"section",0)(1,"div",1)(2,"h1"),t._uU(3,"Radiology - Outpatient List"),t.qZA()()(),t.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"button",7),t._uU(10,"Outpatient List"),t.qZA(),t.TgZ(11,"button",8),t._uU(12,"Inpatient List"),t.qZA(),t.TgZ(13,"button",9),t._uU(14,"Outsider List"),t.qZA()(),t.TgZ(15,"div",10)(16,"div",3),t._UZ(17,"div",11)(18,"div",11),t.TgZ(19,"div",11)(20,"input",12),t.NdJ("ngModelChange",function(_){return o.filterRecords=_}),t.qZA()()(),t._UZ(21,"br"),t.TgZ(22,"div",13)(23,"table",14)(24,"thead",15)(25,"tr")(26,"th"),t._uU(27,"Name"),t.qZA(),t.TgZ(28,"th"),t._uU(29,"Patient's File No"),t.qZA(),t.TgZ(30,"th"),t._uU(31,"Payment Type"),t.qZA(),t.TgZ(32,"th"),t._uU(33,"Gender"),t.qZA(),t.TgZ(34,"th"),t._uU(35,"Action"),t.qZA()()(),t.TgZ(36,"tbody"),t.YNc(37,A,12,4,"tr",16),t.ALo(38,"searchFilter"),t.qZA()()()()()()()()),2&n&&(t.xp6(20),t.Q6J("ngModel",o.filterRecords),t.xp6(17),t.Q6J("ngForOf",t.xi3(38,2,o.patients,o.filterRecords)))},dependencies:[p.ez,p.sg,r.u5,r.Fj,r.JJ,r.On,r.UX,m.G,g.rH]}),l})()}}]);