"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[4071],{4071:(P,h,s)=>{s.r(h),s.d(h,{ClinicComponent:()=>O});var g=s(5861),r=s(6814),_=s(9862),d=s(95),p=s(4716),m=s(4185),C=s(553),e=s(6689),Z=s(6466),v=s(585),f=s(379);function T(l,a){1&l&&(e.TgZ(0,"span",37),e._uU(1,"Active"),e.qZA())}function M(l,a){1&l&&(e.TgZ(0,"span",38),e._uU(1,"Inactive"),e.qZA())}function A(l,a){if(1&l){const c=e.EpF();e.TgZ(0,"tr")(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td",32),e._uU(8),e.ALo(9,"currency"),e.qZA(),e.TgZ(10,"td"),e.YNc(11,T,2,0,"span",33),e.YNc(12,M,2,0,"span",34),e.qZA(),e.TgZ(13,"td")(14,"a",35),e.NdJ("click",function(){const o=e.CHM(c).$implicit,i=e.oxw();return e.KtG(i.getClinic(o.id))}),e._UZ(15,"i",36),e._uU(16,"Edit"),e.qZA()()()}if(2&l){const c=a.$implicit;e.xp6(2),e.Oqu(c.code),e.xp6(2),e.Oqu(c.name),e.xp6(2),e.Oqu(c.description),e.xp6(2),e.Oqu(e.Dn7(9,6,c.consultationFee,"","")),e.xp6(3),e.Q6J("ngIf",!0===c.active),e.xp6(1),e.Q6J("ngIf",!1===c.active)}}function U(l,a){1&l&&(e.TgZ(0,"h1",39),e._uU(1,"Add Clinic"),e.qZA())}function E(l,a){1&l&&(e.TgZ(0,"h1",39),e._uU(1,"Edit Clinic"),e.qZA())}function b(l,a){1&l&&(e.TgZ(0,"span"),e._uU(1,"Update"),e.qZA())}function x(l,a){1&l&&(e.TgZ(0,"span"),e._uU(1,"Add"),e.qZA())}const u=C.N.apiUrl;let O=(()=>{var l;class a{constructor(n,t,o,i){this.auth=n,this.http=t,this.spinner=o,this.msgBox=i,this.code="",this.name="",this.description="",this.consultationFee=0,this.active=!0,this.clinics=[],this.filterRecords=""}ngOnInit(){this.loadClinics()}saveClinic(){var n=this;return(0,g.Z)(function*(){let t={headers:(new _.WM).set("Authorization","Bearer "+n.auth.user.access_token)};var o={id:n.id,code:n.code,name:n.name,description:n.description,consultationFee:n.consultationFee,active:!0};null==n.id||""==n.id?(n.spinner.show(),yield n.http.post(u+"/clinics/save",o,t).pipe((0,p.x)(()=>n.spinner.hide())).toPromise().then(i=>{n.id=i?.id,n.code=i.code,n.name=i.name,n.description=i.description,n.consultationFee=i.consultationFee,n.active=i.active,n.msgBox.showSuccessMessage("Clinic created successifully"),n.loadClinics(),n.clear()}).catch(i=>{n.msgBox.showErrorMessage(i,"Could not create clinic")})):(n.spinner.show(),yield n.http.post(u+"/clinics/save",o,t).pipe((0,p.x)(()=>n.spinner.hide())).toPromise().then(i=>{n.id=i?.id,n.code=i.code,n.name=i.name,n.description=i.description,n.consultationFee=i.consultationFee,n.active=i.active,n.msgBox.showSuccessMessage("Clinic updated successifully"),n.loadClinics()}).catch(i=>{n.msgBox.showErrorMessage(i,"Could not update clinic")}))})()}loadClinics(){var n=this;return(0,g.Z)(function*(){n.clinics=[];let t={headers:(new _.WM).set("Authorization","Bearer "+n.auth.user.access_token)};n.spinner.show(),yield n.http.get(u+"/clinics",t).pipe((0,p.x)(()=>n.spinner.hide())).toPromise().then(o=>{o?.forEach(i=>{n.clinics.push(i)})}).catch(o=>{n.msgBox.showErrorMessage(o,"Could not load clinics")})})()}clear(){this.id=null,this.code="",this.name="",this.description="",this.consultationFee=0}getClinic(n){var t=this;return(0,g.Z)(function*(){if(""==n)return;let o={headers:(new _.WM).set("Authorization","Bearer "+t.auth.user.access_token)};t.spinner.show(),yield t.http.get(u+"/clinics/get?id="+n,o).pipe((0,p.x)(()=>t.spinner.hide())).toPromise().then(i=>{t.id=i?.id,t.code=i.code,t.name=i.name,t.description=i.description,t.consultationFee=i.consultationFee,t.active=i.active}).catch(i=>{console.log(i),t.msgBox.showErrorMessage(i,"Could not find clinic")})})()}grant(n){var t=!1;return n.forEach(o=>{this.auth.checkPrivilege(o)&&(t=!0)}),t}}return(l=a).\u0275fac=function(n){return new(n||l)(e.Y36(Z.e),e.Y36(_.eN),e.Y36(v.t2),e.Y36(f.l))},l.\u0275cmp=e.Xpm({type:l,selectors:[["app-clinic"]],standalone:!0,features:[e.jDz],decls:81,vars:15,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],[1,"btn"],["type","button","data-toggle","modal","data-target","#add-edit-modal",1,"btn","btn-success","m-r-2","m-b-5",3,"click"],[1,"panel-body"],[1,"col-sm-12",2,"height","100%","overflow","scroll"],[1,"col-sm-4"],["type","text","placeholder","Search...",1,"form-control","pull-right",2,"max-width","8cm",3,"ngModel","ngModelChange"],[1,"table","table-bordered","table-small"],[4,"ngFor","ngForOf"],["id","add-edit-modal","tabindex","-1","role","dialog",1,"modal","fade","modal-success"],["role","document",1,"modal-dialog"],[1,"modal-content"],[1,"modal-header"],["type","button","data-dismiss","modal","aria-label","Close",1,"close"],["aria-hidden","true"],["class","modal-title",4,"ngIf"],[1,"modal-body"],["type","hidden",3,"ngModel","ngModelChange"],[1,"col-xs-12"],["type","text",1,"form-control",3,"ngModel","ngModelChange"],["type","text",1,"form-control",2,"text-align","center",3,"ngModel","ngModelChange"],["type","checkbox",2,"text-align","right",3,"ngModel","ngModelChange"],[1,"modal-footer"],["type","button","data-dismiss","modal",1,"btn","btn-danger"],["type","button","data-dismiss","modal",1,"btn","btn-success",3,"click"],[4,"ngIf"],[2,"text-align","right"],["class","label label-info",4,"ngIf"],["class","label label-danger",4,"ngIf"],["data-toggle","modal","data-target","#add-edit-modal",3,"click"],[1,"glyphicon","glyphicon-pencil"],[1,"label","label-info"],[1,"label","label-danger"],[1,"modal-title"]],template:function(n,t){1&n&&(e.TgZ(0,"section",0)(1,"div",1)(2,"h1"),e._uU(3,"Clinic Register"),e.qZA()()(),e.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"div",7)(10,"button",8),e.NdJ("click",function(){return t.clear()}),e._uU(11,"New Clinic"),e.qZA()()(),e.TgZ(12,"div",9)(13,"div",10)(14,"div",3),e._UZ(15,"div",11)(16,"div",11),e.TgZ(17,"div",11)(18,"input",12),e.NdJ("ngModelChange",function(i){return t.filterRecords=i}),e.qZA()()(),e._UZ(19,"br"),e.TgZ(20,"table",13)(21,"thead")(22,"tr")(23,"td"),e._uU(24,"Code"),e.qZA(),e.TgZ(25,"td"),e._uU(26,"Name"),e.qZA(),e.TgZ(27,"td"),e._uU(28,"Description"),e.qZA(),e.TgZ(29,"td"),e._uU(30,"Price"),e.qZA(),e.TgZ(31,"td"),e._uU(32,"Status"),e.qZA(),e.TgZ(33,"td"),e._uU(34,"Action"),e.qZA()()(),e.TgZ(35,"tbody"),e.YNc(36,A,17,10,"tr",14),e.ALo(37,"searchFilter"),e.qZA()()()()()()()(),e.TgZ(38,"div",15)(39,"div",16)(40,"div",17)(41,"div",18)(42,"button",19)(43,"span",20),e._uU(44,"\xd7"),e.qZA()(),e.YNc(45,U,2,0,"h1",21),e.YNc(46,E,2,0,"h1",21),e.qZA(),e.TgZ(47,"div",22)(48,"div",3)(49,"input",23),e.NdJ("ngModelChange",function(i){return t.id=i}),e.qZA(),e.TgZ(50,"div",24)(51,"label"),e._uU(52,"Clinic Code*"),e.qZA(),e.TgZ(53,"input",25),e.NdJ("ngModelChange",function(i){return t.code=i}),e.qZA()()(),e.TgZ(54,"div",3)(55,"div",24)(56,"label"),e._uU(57,"Clinic Name*"),e.qZA(),e.TgZ(58,"input",25),e.NdJ("ngModelChange",function(i){return t.name=i}),e.qZA()()(),e.TgZ(59,"div",3)(60,"div",24)(61,"label"),e._uU(62,"Description"),e.qZA(),e.TgZ(63,"input",25),e.NdJ("ngModelChange",function(i){return t.description=i}),e.qZA()()(),e.TgZ(64,"div",3)(65,"div",24)(66,"label"),e._uU(67,"Price"),e.qZA(),e.TgZ(68,"b")(69,"input",26),e.NdJ("ngModelChange",function(i){return t.consultationFee=i}),e.qZA()()()(),e.TgZ(70,"div",3)(71,"div",24)(72,"label"),e._uU(73,"Active"),e.qZA(),e.TgZ(74,"input",27),e.NdJ("ngModelChange",function(i){return t.active=i}),e.qZA()()()(),e.TgZ(75,"div",28)(76,"button",29),e._uU(77,"Close"),e.qZA(),e.TgZ(78,"button",30),e.NdJ("click",function(){return t.saveClinic()}),e.YNc(79,b,2,0,"span",31),e.YNc(80,x,2,0,"span",31),e.qZA()()()()()),2&n&&(e.xp6(18),e.Q6J("ngModel",t.filterRecords),e.xp6(18),e.Q6J("ngForOf",e.xi3(37,12,t.clinics,t.filterRecords)),e.xp6(9),e.Q6J("ngIf",null===t.id),e.xp6(1),e.Q6J("ngIf",null!=t.id),e.xp6(3),e.Q6J("ngModel",t.id),e.xp6(4),e.Q6J("ngModel",t.code),e.xp6(5),e.Q6J("ngModel",t.name),e.xp6(5),e.Q6J("ngModel",t.description),e.xp6(6),e.Q6J("ngModel",t.consultationFee),e.xp6(5),e.Q6J("ngModel",t.active),e.xp6(5),e.Q6J("ngIf",null!=t.id),e.xp6(1),e.Q6J("ngIf",null===t.id))},dependencies:[r.ez,r.sg,r.O5,r.H9,d.u5,d.Fj,d.Wl,d.JJ,d.On,d.UX,m.G]}),a})()}}]);