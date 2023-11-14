"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[8091],{8091:(x,m,d)=>{d.r(m),d.d(m,{ProcedureTypeComponent:()=>q});var g=d(5861),l=d(6814),a=d(9862),c=d(95),u=d(4716),h=d(4185),T=d(553),e=d(6689),Z=d(6466),v=d(1581),y=d(585),P=d(379);function f(i,p){1&i&&(e.TgZ(0,"span",37),e._uU(1,"Active"),e.qZA())}function M(i,p){1&i&&(e.TgZ(0,"span",38),e._uU(1,"Inactive"),e.qZA())}function A(i,p){if(1&i){const s=e.EpF();e.TgZ(0,"tr")(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e._uU(8),e.qZA(),e.TgZ(9,"td"),e._uU(10),e.qZA(),e.TgZ(11,"td",32),e._uU(12),e.ALo(13,"currency"),e.qZA(),e.TgZ(14,"td"),e.YNc(15,f,2,0,"span",33),e.YNc(16,M,2,0,"span",34),e.qZA(),e.TgZ(17,"td")(18,"a",35),e.NdJ("click",function(){const r=e.CHM(s).$implicit,o=e.oxw();return e.KtG(o.getProcedureType(r.id))}),e._UZ(19,"i",36),e._uU(20,"Edit"),e.qZA()()()}if(2&i){const s=p.$implicit;e.xp6(2),e.Oqu(s.id),e.xp6(2),e.Oqu(s.code),e.xp6(2),e.Oqu(s.name),e.xp6(2),e.Oqu(s.description),e.xp6(2),e.Oqu(s.uom),e.xp6(2),e.Oqu(e.Dn7(13,8,s.price,"","")),e.xp6(3),e.Q6J("ngIf",!0===s.active),e.xp6(1),e.Q6J("ngIf",!1===s.active)}}function C(i,p){1&i&&(e.TgZ(0,"h1",39),e._uU(1,"Add Procedure Type"),e.qZA())}function U(i,p){1&i&&(e.TgZ(0,"h1",39),e._uU(1,"Edit Procedure Type"),e.qZA())}function E(i,p){1&i&&(e.TgZ(0,"span"),e._uU(1,"Update"),e.qZA())}function b(i,p){1&i&&(e.TgZ(0,"span"),e._uU(1,"Add"),e.qZA())}const _=T.N.apiUrl;let q=(()=>{var i;class p{constructor(n,t,r,o,O){this.auth=n,this.http=t,this.modalService=r,this.spinner=o,this.msgBox=O,this.id=null,this.code="",this.name="",this.description="",this.uom="",this.price=0,this.active=!0,this.procedureTypes=[],this.filterRecords=""}ngOnInit(){this.loadProcedureTypes()}saveProcedureType(){var n=this;return(0,g.Z)(function*(){let t={headers:(new a.WM).set("Authorization","Bearer "+n.auth.user.access_token)};var r={id:n.id,code:n.code,name:n.name,description:n.description,uom:n.uom,price:n.price,active:!0};null==n.id||""==n.id?(n.spinner.show(),yield n.http.post(_+"/procedure_types/save",r,t).pipe((0,u.x)(()=>n.spinner.hide())).toPromise().then(o=>{n.id=o?.id,n.code=o.code,n.name=o.name,n.description=o.description,n.price=o.price,n.uom=o.uom,n.active=o.active,n.msgBox.showSuccessMessage("Procedure Type created successifully"),n.loadProcedureTypes()}).catch(o=>{n.msgBox.showErrorMessage(o,"Could not create Procedure Type")})):(n.spinner.show(),yield n.http.post(_+"/procedure_types/save",r,t).pipe((0,u.x)(()=>n.spinner.hide())).toPromise().then(o=>{n.id=o?.id,n.code=o.code,n.name=o.name,n.description=o.description,n.price=o.price,n.uom=o.uom,n.active=o.active,n.msgBox.showSuccessMessage("Procedure Type updated successifully"),n.loadProcedureTypes()}).catch(o=>{n.msgBox.showErrorMessage(o,"Could not update Procedure Type")})),n.clear()})()}loadProcedureTypes(){var n=this;return(0,g.Z)(function*(){n.procedureTypes=[];let t={headers:(new a.WM).set("Authorization","Bearer "+n.auth.user.access_token)};n.spinner.show(),yield n.http.get(_+"/procedure_types",t).pipe((0,u.x)(()=>n.spinner.hide())).toPromise().then(r=>{r?.forEach(o=>{n.procedureTypes.push(o)})}).catch(r=>{n.msgBox.showErrorMessage(r,"Could not load Procedure Types")})})()}clear(){this.id=null,this.code="",this.name="",this.description="",this.uom="",this.price=0,this.active=!1}getProcedureType(n){var t=this;return(0,g.Z)(function*(){if(""==n)return;let r={headers:(new a.WM).set("Authorization","Bearer "+t.auth.user.access_token)};t.spinner.show(),yield t.http.get(_+"/procedure_types/get?id="+n,r).pipe((0,u.x)(()=>t.spinner.hide())).toPromise().then(o=>{t.id=o?.id,t.code=o.code,t.name=o.name,t.description=o.description,t.price=o.price,t.uom=o.uom,t.active=o.active}).catch(o=>{console.log(o),t.msgBox.showErrorMessage(o,"Could not find Procedure Type")})})()}grant(n){var t=!1;return n.forEach(r=>{this.auth.checkPrivilege(r)&&(t=!0)}),t}}return(i=p).\u0275fac=function(n){return new(n||i)(e.Y36(Z.e),e.Y36(a.eN),e.Y36(v.FF),e.Y36(y.t2),e.Y36(P.l))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-procedure-type"]],standalone:!0,features:[e.jDz],decls:89,vars:16,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],[1,"btn"],["type","button","data-toggle","modal","data-target","#add-edit-modal",1,"btn","btn-success","m-r-2","m-b-5",3,"click"],[1,"panel-body"],[1,"col-sm-12",2,"height","100%","overflow","scroll"],[1,"col-sm-4"],["type","text","placeholder","Search...",1,"form-control","pull-right",2,"max-width","8cm",3,"ngModel","ngModelChange"],[1,"table","table-bordered","table-small"],[4,"ngFor","ngForOf"],["id","add-edit-modal","tabindex","-1","role","dialog",1,"modal","fade","modal-success"],["role","document",1,"modal-dialog"],[1,"modal-content"],[1,"modal-header"],["type","button","data-dismiss","modal","aria-label","Close",1,"close"],["aria-hidden","true"],["class","modal-title",4,"ngIf"],[1,"modal-body"],["type","hidden",3,"ngModel","ngModelChange"],[1,"col-xs-12"],["type","text",1,"form-control",3,"ngModel","ngModelChange"],["type","text",1,"form-control",2,"text-align","center",3,"ngModel","ngModelChange"],["type","checkbox",2,"text-align","right",3,"ngModel","ngModelChange"],[1,"modal-footer"],["type","button","data-dismiss","modal",1,"btn","btn-danger"],["type","button","data-dismiss","modal",1,"btn","btn-success",3,"click"],[4,"ngIf"],[2,"text-align","right"],["class","label label-info",4,"ngIf"],["class","label label-danger",4,"ngIf"],["data-toggle","modal","data-target","#add-edit-modal",3,"click"],[1,"glyphicon","glyphicon-pencil"],[1,"label","label-info"],[1,"label","label-danger"],[1,"modal-title"]],template:function(n,t){1&n&&(e.TgZ(0,"section",0)(1,"div",1)(2,"h1"),e._uU(3,"Procedure Type"),e.qZA()()(),e.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"div",7)(10,"button",8),e.NdJ("click",function(){return t.clear()}),e._uU(11,"New"),e.qZA()()(),e.TgZ(12,"div",9)(13,"div",10)(14,"div",3),e._UZ(15,"div",11)(16,"div",11),e.TgZ(17,"div",11)(18,"input",12),e.NdJ("ngModelChange",function(o){return t.filterRecords=o}),e.qZA()()(),e._UZ(19,"br"),e.TgZ(20,"table",13)(21,"thead")(22,"tr")(23,"td"),e._uU(24,"ID"),e.qZA(),e.TgZ(25,"td"),e._uU(26,"Code"),e.qZA(),e.TgZ(27,"td"),e._uU(28,"Name"),e.qZA(),e.TgZ(29,"td"),e._uU(30,"Description"),e.qZA(),e.TgZ(31,"td"),e._uU(32,"Uom"),e.qZA(),e.TgZ(33,"td"),e._uU(34,"Price"),e.qZA(),e.TgZ(35,"td"),e._uU(36,"Active"),e.qZA(),e.TgZ(37,"td"),e._uU(38,"Action"),e.qZA()()(),e.TgZ(39,"tbody"),e.YNc(40,A,21,12,"tr",14),e.ALo(41,"searchFilter"),e.qZA()()()()()()()(),e.TgZ(42,"div",15)(43,"div",16)(44,"div",17)(45,"div",18)(46,"button",19)(47,"span",20),e._uU(48,"\xd7"),e.qZA()(),e.YNc(49,C,2,0,"h1",21),e.YNc(50,U,2,0,"h1",21),e.qZA(),e.TgZ(51,"div",22)(52,"div",3)(53,"input",23),e.NdJ("ngModelChange",function(o){return t.id=o}),e.qZA(),e.TgZ(54,"div",24)(55,"label"),e._uU(56,"Code*"),e.qZA(),e.TgZ(57,"input",25),e.NdJ("ngModelChange",function(o){return t.code=o}),e.qZA()()(),e.TgZ(58,"div",3)(59,"div",24)(60,"label"),e._uU(61,"Procedure Type Name*"),e.qZA(),e.TgZ(62,"input",25),e.NdJ("ngModelChange",function(o){return t.name=o}),e.qZA()()(),e.TgZ(63,"div",3)(64,"div",24)(65,"label"),e._uU(66,"Description"),e.qZA(),e.TgZ(67,"input",25),e.NdJ("ngModelChange",function(o){return t.description=o}),e.qZA()()(),e.TgZ(68,"div",3)(69,"div",24)(70,"label"),e._uU(71,"UOM"),e.qZA(),e.TgZ(72,"input",25),e.NdJ("ngModelChange",function(o){return t.uom=o}),e.qZA()()(),e.TgZ(73,"div",3)(74,"div",24)(75,"label"),e._uU(76,"Price"),e.qZA(),e.TgZ(77,"input",26),e.NdJ("ngModelChange",function(o){return t.price=o}),e.qZA()()(),e.TgZ(78,"div",3)(79,"div",24)(80,"label"),e._uU(81,"Active"),e.qZA(),e.TgZ(82,"input",27),e.NdJ("ngModelChange",function(o){return t.active=o}),e.qZA()()()(),e.TgZ(83,"div",28)(84,"button",29),e._uU(85,"Close"),e.qZA(),e.TgZ(86,"button",30),e.NdJ("click",function(){return t.saveProcedureType()}),e.YNc(87,E,2,0,"span",31),e.YNc(88,b,2,0,"span",31),e.qZA()()()()()),2&n&&(e.xp6(18),e.Q6J("ngModel",t.filterRecords),e.xp6(22),e.Q6J("ngForOf",e.xi3(41,13,t.procedureTypes,t.filterRecords)),e.xp6(9),e.Q6J("ngIf",null===t.id),e.xp6(1),e.Q6J("ngIf",null!=t.id),e.xp6(3),e.Q6J("ngModel",t.id),e.xp6(4),e.Q6J("ngModel",t.code),e.xp6(5),e.Q6J("ngModel",t.name),e.xp6(5),e.Q6J("ngModel",t.description),e.xp6(5),e.Q6J("ngModel",t.uom),e.xp6(5),e.Q6J("ngModel",t.price),e.xp6(5),e.Q6J("ngModel",t.active),e.xp6(5),e.Q6J("ngIf",null!=t.id),e.xp6(1),e.Q6J("ngIf",null===t.id))},dependencies:[l.ez,l.sg,l.O5,l.H9,c.u5,c.Fj,c.Wl,c.JJ,c.On,c.UX,h.G]}),p})()}}]);