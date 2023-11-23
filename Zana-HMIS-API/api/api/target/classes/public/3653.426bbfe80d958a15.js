"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[3653],{3653:(q,m,r)=>{r.r(m),r.d(m,{PharmacyComponent:()=>b});var h=r(5861),g=r(6814),d=r(9862),l=r(95),_=r(4716),u=r(4185),Z=r(553),e=r(6689),y=r(6466),T=r(585),v=r(379);function f(i,c){1&i&&(e.TgZ(0,"span",36),e._uU(1,"Active"),e.qZA())}function C(i,c){1&i&&(e.TgZ(0,"span",37),e._uU(1,"Inactive"),e.qZA())}function P(i,c){if(1&i){const s=e.EpF();e.TgZ(0,"tr")(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e._uU(8),e.qZA(),e.TgZ(9,"td"),e.YNc(10,f,2,0,"span",32),e.YNc(11,C,2,0,"span",33),e.qZA(),e.TgZ(12,"td")(13,"a",34),e.NdJ("click",function(){const o=e.CHM(s).$implicit,t=e.oxw();return e.KtG(t.getPharmacy(o.id))}),e._UZ(14,"i",35),e._uU(15,"Edit"),e.qZA()()()}if(2&i){const s=c.$implicit;e.xp6(2),e.Oqu(s.code),e.xp6(2),e.Oqu(s.name),e.xp6(2),e.Oqu(s.description),e.xp6(2),e.Oqu(s.category),e.xp6(2),e.Q6J("ngIf",!0===s.active),e.xp6(1),e.Q6J("ngIf",!1===s.active)}}function M(i,c){1&i&&(e.TgZ(0,"h1",38),e._uU(1,"Add Pharmacy"),e.qZA())}function A(i,c){1&i&&(e.TgZ(0,"h1",38),e._uU(1,"Edit Pharmacy"),e.qZA())}function U(i,c){1&i&&(e.TgZ(0,"span"),e._uU(1,"Update"),e.qZA())}function E(i,c){1&i&&(e.TgZ(0,"span"),e._uU(1,"Add"),e.qZA())}const p=Z.N.apiUrl;let b=(()=>{var i;class c{constructor(n,a,o,t){this.auth=n,this.http=a,this.spinner=o,this.msgBox=t,this.code="",this.name="",this.description="",this.location="",this.category="",this.active=!0,this.pharmacies=[],this.filterRecords=""}ngOnInit(){this.loadPharmacies()}savePharmacy(){var n=this;return(0,h.Z)(function*(){let a={headers:(new d.WM).set("Authorization","Bearer "+n.auth.user.access_token)};var o={id:n.id,code:n.code,name:n.name,description:n.description,location:n.location,category:n.category,active:!0};null==n.id||""==n.id?(n.spinner.show(),yield n.http.post(p+"/pharmacies/save",o,a).pipe((0,_.x)(()=>n.spinner.hide())).toPromise().then(t=>{n.id=t?.id,n.code=t.code,n.name=t.name,n.description=t.description,n.location=t.location,n.category=t.category,n.active=t.active,n.msgBox.showSuccessMessage("Pharmacy created successifully"),n.loadPharmacies(),n.clear()}).catch(t=>{n.msgBox.showErrorMessage(t,"Could not create pharmacy")})):(n.spinner.show(),yield n.http.post(p+"/pharmacies/save",o,a).pipe((0,_.x)(()=>n.spinner.hide())).toPromise().then(t=>{n.id=t?.id,n.code=t.code,n.name=t.name,n.description=t.description,n.location=t.location,n.category=t.category,n.active=t.active,n.msgBox.showSuccessMessage("Pharmacy updated successifully"),n.loadPharmacies()}).catch(t=>{n.msgBox.showErrorMessage(t,"Could not update pharmacy")}))})()}loadPharmacies(){var n=this;return(0,h.Z)(function*(){n.pharmacies=[];let a={headers:(new d.WM).set("Authorization","Bearer "+n.auth.user.access_token)};n.spinner.show(),yield n.http.get(p+"/pharmacies",a).pipe((0,_.x)(()=>n.spinner.hide())).toPromise().then(o=>{o?.forEach(t=>{n.pharmacies.push(t)})}).catch(o=>{n.msgBox.showErrorMessage(o,"Could not load pharmacies")})})()}clear(){this.id=null,this.code="",this.name="",this.description="",this.location="",this.category=""}getPharmacy(n){var a=this;return(0,h.Z)(function*(){if(""==n)return;let o={headers:(new d.WM).set("Authorization","Bearer "+a.auth.user.access_token)};a.spinner.show(),yield a.http.get(p+"/pharmacies/get?id="+n,o).pipe((0,_.x)(()=>a.spinner.hide())).toPromise().then(t=>{a.id=t?.id,a.code=t.code,a.name=t.name,a.description=t.description,a.location=t.location,a.category=t.category,a.active=t.active}).catch(t=>{console.log(t),a.msgBox.showErrorMessage(t,"Could not find pharmacy")})})()}grant(n){var a=!1;return n.forEach(o=>{this.auth.checkPrivilege(o)&&(a=!0)}),a}}return(i=c).\u0275fac=function(n){return new(n||i)(e.Y36(y.e),e.Y36(d.eN),e.Y36(T.t2),e.Y36(v.l))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-pharmacy"]],standalone:!0,features:[e.jDz],decls:92,vars:16,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],[1,"btn"],["type","button","data-toggle","modal","data-target","#add-edit-modal",1,"btn","btn-success","m-r-2","m-b-5",3,"click"],[1,"panel-body"],[1,"col-sm-12",2,"height","100%","overflow","scroll"],[1,"col-sm-4"],["type","text","placeholder","Search...",1,"form-control","pull-right",2,"max-width","8cm",3,"ngModel","ngModelChange"],[1,"table","table-bordered","table-small"],[4,"ngFor","ngForOf"],["id","add-edit-modal","tabindex","-1","role","dialog",1,"modal","fade","modal-success"],["role","document",1,"modal-dialog"],[1,"modal-content"],[1,"modal-header"],["type","button","data-dismiss","modal","aria-label","Close",1,"close"],["aria-hidden","true"],["class","modal-title",4,"ngIf"],[1,"modal-body"],["type","hidden",3,"ngModel","ngModelChange"],[1,"col-xs-12"],["type","text",1,"form-control",3,"ngModel","ngModelChange"],[1,"form-control",3,"ngModel","ngModelChange"],["type","checkbox",2,"text-align","right",3,"ngModel","ngModelChange"],[1,"modal-footer"],["type","button","data-dismiss","modal",1,"btn","btn-danger"],["type","button","data-dismiss","modal",1,"btn","btn-success",3,"click"],[4,"ngIf"],["class","label label-info",4,"ngIf"],["class","label label-danger",4,"ngIf"],["data-toggle","modal","data-target","#add-edit-modal",3,"click"],[1,"glyphicon","glyphicon-pencil"],[1,"label","label-info"],[1,"label","label-danger"],[1,"modal-title"]],template:function(n,a){1&n&&(e.TgZ(0,"section",0)(1,"div",1)(2,"h1"),e._uU(3,"Pharmacy Register"),e.qZA()()(),e.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"div",7)(10,"button",8),e.NdJ("click",function(){return a.clear()}),e._uU(11,"New Pharmacy"),e.qZA()()(),e.TgZ(12,"div",9)(13,"div",10)(14,"div",3),e._UZ(15,"div",11)(16,"div",11),e.TgZ(17,"div",11)(18,"input",12),e.NdJ("ngModelChange",function(t){return a.filterRecords=t}),e.qZA()()(),e._UZ(19,"br"),e.TgZ(20,"table",13)(21,"thead")(22,"tr")(23,"td"),e._uU(24,"Code"),e.qZA(),e.TgZ(25,"td"),e._uU(26,"Name"),e.qZA(),e.TgZ(27,"td"),e._uU(28,"Description"),e.qZA(),e.TgZ(29,"td"),e._uU(30,"Category"),e.qZA(),e.TgZ(31,"td"),e._uU(32,"Status"),e.qZA(),e.TgZ(33,"td"),e._uU(34,"Action"),e.qZA()()(),e.TgZ(35,"tbody"),e.YNc(36,P,16,6,"tr",14),e.ALo(37,"searchFilter"),e.qZA()()()()()()()(),e.TgZ(38,"div",15)(39,"div",16)(40,"div",17)(41,"div",18)(42,"button",19)(43,"span",20),e._uU(44,"\xd7"),e.qZA()(),e.YNc(45,M,2,0,"h1",21),e.YNc(46,A,2,0,"h1",21),e.qZA(),e.TgZ(47,"div",22)(48,"div",3)(49,"input",23),e.NdJ("ngModelChange",function(t){return a.id=t}),e.qZA(),e.TgZ(50,"div",24)(51,"label"),e._uU(52,"Pharmacy Code*"),e.qZA(),e.TgZ(53,"input",25),e.NdJ("ngModelChange",function(t){return a.code=t}),e.qZA()()(),e.TgZ(54,"div",3)(55,"div",24)(56,"label"),e._uU(57,"Pharmacy Name*"),e.qZA(),e.TgZ(58,"input",25),e.NdJ("ngModelChange",function(t){return a.name=t}),e.qZA()()(),e.TgZ(59,"div",3)(60,"div",24)(61,"label"),e._uU(62,"Description"),e.qZA(),e.TgZ(63,"input",25),e.NdJ("ngModelChange",function(t){return a.description=t}),e.qZA()()(),e.TgZ(64,"div",3)(65,"div",24)(66,"label"),e._uU(67,"Location"),e.qZA(),e.TgZ(68,"input",25),e.NdJ("ngModelChange",function(t){return a.location=t}),e.qZA()()(),e.TgZ(69,"div",3)(70,"div",4)(71,"label"),e._uU(72,"Select Category"),e.qZA(),e.TgZ(73,"select",26),e.NdJ("ngModelChange",function(t){return a.category=t}),e._UZ(74,"option"),e.TgZ(75,"option"),e._uU(76,"INPATIENT"),e.qZA(),e.TgZ(77,"option"),e._uU(78,"OUTPATIENT"),e.qZA(),e.TgZ(79,"option"),e._uU(80,"ALL"),e.qZA()()()(),e.TgZ(81,"div",3)(82,"div",24)(83,"label"),e._uU(84,"Active"),e.qZA(),e.TgZ(85,"input",27),e.NdJ("ngModelChange",function(t){return a.active=t}),e.qZA()()()(),e.TgZ(86,"div",28)(87,"button",29),e._uU(88,"Close"),e.qZA(),e.TgZ(89,"button",30),e.NdJ("click",function(){return a.savePharmacy()}),e.YNc(90,U,2,0,"span",31),e.YNc(91,E,2,0,"span",31),e.qZA()()()()()),2&n&&(e.xp6(18),e.Q6J("ngModel",a.filterRecords),e.xp6(18),e.Q6J("ngForOf",e.xi3(37,13,a.pharmacies,a.filterRecords)),e.xp6(9),e.Q6J("ngIf",null===a.id),e.xp6(1),e.Q6J("ngIf",null!=a.id),e.xp6(3),e.Q6J("ngModel",a.id),e.xp6(4),e.Q6J("ngModel",a.code),e.xp6(5),e.Q6J("ngModel",a.name),e.xp6(5),e.Q6J("ngModel",a.description),e.xp6(5),e.Q6J("ngModel",a.location),e.xp6(5),e.Q6J("ngModel",a.category),e.xp6(12),e.Q6J("ngModel",a.active),e.xp6(5),e.Q6J("ngIf",null!=a.id),e.xp6(1),e.Q6J("ngIf",null===a.id))},dependencies:[g.ez,g.sg,g.O5,l.u5,l.YN,l.Kr,l.Fj,l.Wl,l.EJ,l.JJ,l.On,l.UX,u.G]}),c})()}}]);