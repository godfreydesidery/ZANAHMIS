"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[7348],{7348:(q,u,r)=>{r.r(u),r.d(u,{PharmacistComponent:()=>E});var p=r(5861),g=r(6814),c=r(9862),d=r(95),h=r(4716),Z=r(4185),f=r(553),e=r(6689),C=r(6466),v=r(585),M=r(379);function T(o,m){if(1&o){const l=e.EpF();e.TgZ(0,"tr")(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e._uU(8),e.qZA(),e.TgZ(9,"td"),e._uU(10),e.qZA(),e.TgZ(11,"td")(12,"button",33),e.NdJ("click",function(){const s=e.CHM(l).$implicit,n=e.oxw();return e.KtG(n.getPharmacist(s.id))}),e._uU(13,"Edit"),e.qZA()()()}if(2&o){const l=m.$implicit;e.xp6(2),e.Oqu(l.code),e.xp6(2),e.Oqu(l.firstName),e.xp6(2),e.Oqu(l.middleName),e.xp6(2),e.Oqu(l.lastName),e.xp6(2),e.Oqu(l.type)}}function N(o,m){1&o&&(e.TgZ(0,"h1",31),e._uU(1,"Add Pharmacist"),e.qZA())}function P(o,m){1&o&&(e.TgZ(0,"h1",31),e._uU(1,"Edit Pharmacist"),e.qZA())}function A(o,m){1&o&&(e.TgZ(0,"span"),e._uU(1,"Update"),e.qZA())}function U(o,m){1&o&&(e.TgZ(0,"span"),e._uU(1,"Add"),e.qZA())}const _=f.N.apiUrl;let E=(()=>{var o;class m{constructor(t,i,s,n){this.auth=t,this.http=i,this.spinner=s,this.msgBox=n,this.code="",this.firstName="",this.middleName="",this.lastName="",this.type="",this.active=!0,this.pharmacists=[],this.userCode="",this.filterRecords="",this.clinics=[]}ngOnInit(){this.loadPharmacists(),this.loadClinics()}savePharmacist(){var t=this;return(0,p.Z)(function*(){let i={headers:(new c.WM).set("Authorization","Bearer "+t.auth.user.access_token)};var s=[];t.clinics.forEach(a=>{1==a.assigned&&s.push(a)});var n={id:t.id,code:t.code,firstName:t.firstName,middleName:t.middleName,lastName:t.lastName,type:t.type,clinics:s,active:!0};null==t.id||""==t.id?(t.spinner.show(),yield t.http.post(_+"/pharmacists/save",n,i).pipe((0,h.x)(()=>t.spinner.hide())).toPromise().then(a=>{t.id=a?.id,t.code=a.code,t.firstName=a.firstName,t.middleName=a.middleName,t.lastName=a.lastName,t.type=a.type,t.active=a.active,t.msgBox.showSuccessMessage("Pharmacist created successifully"),t.loadPharmacists(),t.clear()}).catch(a=>{t.msgBox.showErrorMessage(a,"")})):(t.spinner.show(),yield t.http.post(_+"/pharmacists/save",n,i).pipe((0,h.x)(()=>t.spinner.hide())).toPromise().then(a=>{t.id=a?.id,t.code=a.code,t.firstName=a.firstName,t.middleName=a.middleName,t.lastName=a.lastName,t.type=a.type,t.active=a.active,t.msgBox.showSuccessMessage("Pharmacist updated successifully"),t.loadPharmacists()}).catch(a=>{t.msgBox.showErrorMessage(a,"")}))})()}loadPharmacists(){var t=this;return(0,p.Z)(function*(){t.pharmacists=[];let i={headers:(new c.WM).set("Authorization","Bearer "+t.auth.user.access_token)};t.spinner.show(),yield t.http.get(_+"/pharmacists/get_all_active",i).pipe((0,h.x)(()=>t.spinner.hide())).toPromise().then(s=>{s?.forEach(n=>{t.pharmacists.push(n)})}).catch(s=>{t.msgBox.showErrorMessage(s,"Could not load pharmacists")})})()}clear(){this.id=null,this.code="",this.firstName="",this.middleName="",this.lastName="",this.type="",this.active=!1}getPharmacist(t){var i=this;return(0,p.Z)(function*(){if(""==t)return;let s={headers:(new c.WM).set("Authorization","Bearer "+i.auth.user.access_token)};i.spinner.show(),yield i.http.get(_+"/pharmacists/get?id="+t,s).pipe((0,h.x)(()=>i.spinner.hide())).toPromise().then(n=>{console.log(n),i.id=n?.id,i.code=n.code,i.firstName=n.firstName,i.middleName=n.middleName,i.lastName=n.lastName,i.type=n.type,i.active=n.active}).catch(n=>{console.log(n),i.msgBox.showErrorMessage(n,"Could not find Doctor")})})()}showPharmacistClinics(t,i){this.clearClinics(),i.forEach(s=>{t.forEach(n=>{n.name===s.name&&(n.assigned=!0)})}),this.clinics=t}showUserRoles(t,i){this.clearClinics(),i.forEach(s=>{t.forEach(n=>{n.name===s.name&&(n.assigned=!0)})}),this.clinics=t}clearClinics(){this.clinics.forEach(t=>{t.assigned=!1})}loadClinics(){var t=this;return(0,p.Z)(function*(){let i={headers:(new c.WM).set("Authorization","Bearer "+t.auth.user.access_token)};t.spinner.show(),yield t.http.get(_+"/clinics",i).pipe((0,h.x)(()=>t.spinner.hide())).toPromise().then(s=>{s?.forEach(n=>{console.log(n),t.clinics.push(n)})}).catch(s=>{console.log(s)})})()}clearUser(){this.userCode=""}assignUserProfile(){var t=this;return(0,p.Z)(function*(){let i={headers:(new c.WM).set("Authorization","Bearer "+t.auth.user.access_token)};null!=t.id&&(t.spinner.show(),yield t.http.post(_+"/pharmacists/assign_user_profile?id="+t.id+"&code="+t.userCode,null,i).pipe((0,h.x)(()=>t.spinner.hide())).toPromise().then(s=>{t.id=s?.id,t.code=s.code,t.firstName=s.firstName,t.middleName=s.middleName,t.lastName=s.lastName,t.type=s.type,t.active=s.active,t.msgBox.showSuccessMessage("Saved successifully"),t.loadPharmacists(),t.clear()}).catch(s=>{t.msgBox.showErrorMessage(s,"")}))})()}grant(t){var i=!1;return t.forEach(s=>{this.auth.checkPrivilege(s)&&(i=!0)}),i}}return(o=m).\u0275fac=function(t){return new(t||o)(e.Y36(C.e),e.Y36(c.eN),e.Y36(v.t2),e.Y36(M.l))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-pharmacist"]],standalone:!0,features:[e.jDz],decls:123,vars:21,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],[1,"btn"],[1,"panel-body"],[1,"col-sm-12",2,"height","100%","overflow","scroll"],[1,"col-sm-4"],["type","text","placeholder","Search...",1,"form-control","pull-right",2,"max-width","8cm",3,"ngModel","ngModelChange"],[1,"table","table-bordered","table-small"],[4,"ngFor","ngForOf"],["id","add-edit-modal","tabindex","-1","role","dialog",1,"modal","fade","modal-success"],["role","document",1,"modal-dialog"],[1,"modal-content"],[1,"modal-header"],["type","button","data-dismiss","modal","aria-label","Close",1,"close"],["aria-hidden","true"],["class","modal-title",4,"ngIf"],[1,"modal-body"],["type","hidden",3,"ngModel","ngModelChange"],[1,"col-xs-12"],["type","text","readonly","",1,"form-control",3,"ngModel","ngModelChange"],[1,"form-control",3,"ngModel","ngModelChange"],[1,"modal-footer"],["type","button","data-dismiss","modal",1,"btn","btn-danger"],["type","button","data-dismiss","modal",1,"btn","btn-success",3,"click"],[4,"ngIf"],["id","assign-user-profile","tabindex","-1","role","dialog",1,"modal","fade","modal-success"],[1,"modal-title"],["type","text",1,"form-control",3,"ngModel","ngModelChange"],["data-toggle","modal","data-target","#add-edit-modal",1,"btn","btn-primary",2,"margin","1px",3,"click"]],template:function(t,i){1&t&&(e.TgZ(0,"section",0)(1,"div",1)(2,"h1"),e._uU(3,"Pharmacist Register"),e.qZA()()(),e.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6),e._UZ(9,"div",7),e.qZA(),e.TgZ(10,"div",8)(11,"div",9)(12,"div",3),e._UZ(13,"div",10)(14,"div",10),e.TgZ(15,"div",10)(16,"input",11),e.NdJ("ngModelChange",function(n){return i.filterRecords=n}),e.qZA()()(),e._UZ(17,"br"),e.TgZ(18,"table",12)(19,"thead")(20,"tr")(21,"td"),e._uU(22,"Code"),e.qZA(),e.TgZ(23,"td"),e._uU(24,"First Name"),e.qZA(),e.TgZ(25,"td"),e._uU(26,"Middle Name"),e.qZA(),e.TgZ(27,"td"),e._uU(28,"Last Name"),e.qZA(),e.TgZ(29,"td"),e._uU(30,"Type"),e.qZA(),e.TgZ(31,"td"),e._uU(32,"Action"),e.qZA()()(),e.TgZ(33,"tbody"),e.YNc(34,T,14,5,"tr",13),e.ALo(35,"searchFilter"),e.qZA()()()()()()()(),e.TgZ(36,"div",14)(37,"div",15)(38,"div",16)(39,"div",17)(40,"button",18)(41,"span",19),e._uU(42,"\xd7"),e.qZA()(),e.YNc(43,N,2,0,"h1",20),e.YNc(44,P,2,0,"h1",20),e.qZA(),e.TgZ(45,"div",21)(46,"div",3)(47,"input",22),e.NdJ("ngModelChange",function(n){return i.id=n}),e.qZA(),e.TgZ(48,"div",23)(49,"label"),e._uU(50,"Code*"),e.qZA(),e.TgZ(51,"input",24),e.NdJ("ngModelChange",function(n){return i.code=n}),e.qZA()()(),e.TgZ(52,"div",3)(53,"div",23)(54,"label"),e._uU(55,"First Name*"),e.qZA(),e.TgZ(56,"input",24),e.NdJ("ngModelChange",function(n){return i.firstName=n}),e.qZA()()(),e.TgZ(57,"div",3)(58,"div",23)(59,"label"),e._uU(60,"Middle Name"),e.qZA(),e.TgZ(61,"input",24),e.NdJ("ngModelChange",function(n){return i.middleName=n}),e.qZA()()(),e.TgZ(62,"div",3)(63,"div",23)(64,"label"),e._uU(65,"Last Name*"),e.qZA(),e.TgZ(66,"input",24),e.NdJ("ngModelChange",function(n){return i.lastName=n}),e.qZA()()(),e.TgZ(67,"div",3)(68,"div",23)(69,"label"),e._uU(70,"Type"),e.qZA(),e.TgZ(71,"select",25),e.NdJ("ngModelChange",function(n){return i.type=n}),e._UZ(72,"option"),e.TgZ(73,"option"),e._uU(74,"General Pharmacist"),e.qZA()()()(),e._UZ(75,"hr"),e.qZA(),e.TgZ(76,"div",26)(77,"button",27),e._uU(78,"Close"),e.qZA(),e.TgZ(79,"button",28),e.NdJ("click",function(){return i.savePharmacist()}),e.YNc(80,A,2,0,"span",29),e.YNc(81,U,2,0,"span",29),e.qZA()()()()(),e.TgZ(82,"div",30)(83,"div",15)(84,"div",16)(85,"div",17)(86,"button",18)(87,"span",19),e._uU(88,"\xd7"),e.qZA()(),e.TgZ(89,"h1",31),e._uU(90,"Assign User Profile to Pharmacist"),e.qZA()(),e.TgZ(91,"div",21)(92,"div",3)(93,"input",22),e.NdJ("ngModelChange",function(n){return i.id=n}),e.qZA(),e.TgZ(94,"div",23)(95,"label"),e._uU(96,"Pharmacist Code*"),e.qZA(),e.TgZ(97,"input",24),e.NdJ("ngModelChange",function(n){return i.code=n}),e.qZA()()(),e.TgZ(98,"div",3)(99,"div",23)(100,"label"),e._uU(101,"First Name*"),e.qZA(),e.TgZ(102,"input",32),e.NdJ("ngModelChange",function(n){return i.firstName=n}),e.qZA()()(),e.TgZ(103,"div",3)(104,"div",23)(105,"label"),e._uU(106,"Middle Name"),e.qZA(),e.TgZ(107,"input",32),e.NdJ("ngModelChange",function(n){return i.middleName=n}),e.qZA()()(),e.TgZ(108,"div",3)(109,"div",23)(110,"label"),e._uU(111,"Last Name*"),e.qZA(),e.TgZ(112,"input",32),e.NdJ("ngModelChange",function(n){return i.lastName=n}),e.qZA()()(),e.TgZ(113,"div",3)(114,"div",23)(115,"label"),e._uU(116,"User Code"),e.qZA(),e.TgZ(117,"input",32),e.NdJ("ngModelChange",function(n){return i.userCode=n}),e.qZA()()()(),e.TgZ(118,"div",26)(119,"button",27),e._uU(120,"Close"),e.qZA(),e.TgZ(121,"button",28),e.NdJ("click",function(){return i.assignUserProfile()}),e._uU(122,"Save"),e.qZA()()()()()),2&t&&(e.xp6(16),e.Q6J("ngModel",i.filterRecords),e.xp6(18),e.Q6J("ngForOf",e.xi3(35,18,i.pharmacists,i.filterRecords)),e.xp6(9),e.Q6J("ngIf",null===i.id),e.xp6(1),e.Q6J("ngIf",null!=i.id),e.xp6(3),e.Q6J("ngModel",i.id),e.xp6(4),e.Q6J("ngModel",i.code),e.xp6(5),e.Q6J("ngModel",i.firstName),e.xp6(5),e.Q6J("ngModel",i.middleName),e.xp6(5),e.Q6J("ngModel",i.lastName),e.xp6(5),e.Q6J("ngModel",i.type),e.xp6(9),e.Q6J("ngIf",null!=i.id),e.xp6(1),e.Q6J("ngIf",null===i.id),e.xp6(12),e.Q6J("ngModel",i.id),e.xp6(4),e.Q6J("ngModel",i.code),e.xp6(5),e.Q6J("ngModel",i.firstName),e.xp6(5),e.Q6J("ngModel",i.middleName),e.xp6(5),e.Q6J("ngModel",i.lastName),e.xp6(5),e.Q6J("ngModel",i.userCode))},dependencies:[g.ez,g.sg,g.O5,d.u5,d.YN,d.Kr,d.Fj,d.EJ,d.JJ,d.On,d.UX,Z.G]}),m})()}}]);