"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[8360],{8360:(q,g,a)=>{a.r(g),a.d(g,{LabTestTypeComponent:()=>E});var u=a(5861),r=a(6814),_=a(9862),d=a(95),c=a(4716),m=a(4185),h=a(553),e=a(6689),b=a(6466),Z=a(585),y=a(379);function v(s,p){1&s&&(e.TgZ(0,"span",37),e._uU(1,"Active"),e.qZA())}function f(s,p){1&s&&(e.TgZ(0,"span",38),e._uU(1,"Inactive"),e.qZA())}function M(s,p){if(1&s){const l=e.EpF();e.TgZ(0,"tr")(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e._uU(8),e.qZA(),e.TgZ(9,"td",32),e._uU(10),e.ALo(11,"currency"),e.qZA(),e.TgZ(12,"td"),e.YNc(13,v,2,0,"span",33),e.YNc(14,f,2,0,"span",34),e.qZA(),e.TgZ(15,"td")(16,"a",35),e.NdJ("click",function(){const i=e.CHM(l).$implicit,n=e.oxw();return e.KtG(n.getLabTestType(i.id))}),e._UZ(17,"i",36),e._uU(18,"Edit"),e.qZA()()()}if(2&s){const l=p.$implicit;e.xp6(2),e.Oqu(l.code),e.xp6(2),e.Oqu(l.name),e.xp6(2),e.Oqu(l.description),e.xp6(2),e.Oqu(l.uom),e.xp6(2),e.Oqu(e.Dn7(11,7,l.price,"","")),e.xp6(3),e.Q6J("ngIf",!0===l.active),e.xp6(1),e.Q6J("ngIf",!1===l.active)}}function C(s,p){1&s&&(e.TgZ(0,"h1",39),e._uU(1,"Add Lab Test Type"),e.qZA())}function A(s,p){1&s&&(e.TgZ(0,"h1",39),e._uU(1,"Edit Lab Test Type"),e.qZA())}function L(s,p){1&s&&(e.TgZ(0,"span"),e._uU(1,"Update"),e.qZA())}function U(s,p){1&s&&(e.TgZ(0,"span"),e._uU(1,"Add"),e.qZA())}const T=h.N.apiUrl;let E=(()=>{var s;class p{constructor(t,o,i,n){this.auth=t,this.http=o,this.spinner=i,this.msgBox=n,this.id=null,this.code="",this.name="",this.description="",this.uom="",this.price=0,this.active=!0,this.labTestTypes=[],this.filterRecords=""}ngOnInit(){this.loadLabTestTypes()}saveLabTestType(){var t=this;return(0,u.Z)(function*(){let o={headers:(new _.WM).set("Authorization","Bearer "+t.auth.user.access_token)};var i={id:t.id,code:t.code,name:t.name,description:t.description,uom:t.uom,price:t.price,active:!0};null==t.id||""==t.id?(t.spinner.show(),yield t.http.post(T+"/lab_test_types/save",i,o).pipe((0,c.x)(()=>t.spinner.hide())).toPromise().then(n=>{t.id=n?.id,t.code=n.code,t.name=n.name,t.description=n.description,t.price=n.price,t.uom=n.uom,t.active=n.active,t.msgBox.showSuccessMessage("Lab Test Type created successifully"),t.loadLabTestTypes()}).catch(n=>{t.msgBox.showErrorMessage(n,"Could not create Lab Test Type")})):(t.spinner.show(),yield t.http.post(T+"/lab_test_types/save",i,o).pipe((0,c.x)(()=>t.spinner.hide())).toPromise().then(n=>{t.id=n?.id,t.code=n.code,t.name=n.name,t.description=n.description,t.price=n.price,t.uom=n.uom,t.active=n.active,t.msgBox.showSuccessMessage("Lab Test Type updated successifully"),t.loadLabTestTypes()}).catch(n=>{t.msgBox.showErrorMessage(n,"Could not update Lab Test Type")})),t.clear()})()}loadLabTestTypes(){var t=this;return(0,u.Z)(function*(){t.labTestTypes=[];let o={headers:(new _.WM).set("Authorization","Bearer "+t.auth.user.access_token)};t.spinner.show(),yield t.http.get(T+"/lab_test_types",o).pipe((0,c.x)(()=>t.spinner.hide())).toPromise().then(i=>{i?.forEach(n=>{t.labTestTypes.push(n)})}).catch(i=>{t.msgBox.showErrorMessage(i,"Could not load Lab Test Types")})})()}clear(){this.id=null,this.code="",this.name="",this.description="",this.uom="",this.price=0,this.active=!1}getLabTestType(t){var o=this;return(0,u.Z)(function*(){if(""==t)return;let i={headers:(new _.WM).set("Authorization","Bearer "+o.auth.user.access_token)};o.spinner.show(),yield o.http.get(T+"/lab_test_types/get?id="+t,i).pipe((0,c.x)(()=>o.spinner.hide())).toPromise().then(n=>{o.id=n?.id,o.code=n.code,o.name=n.name,o.description=n.description,o.price=n.price,o.uom=n.uom,o.active=n.active}).catch(n=>{console.log(n),o.msgBox.showErrorMessage(n,"Could not find Lab Test Type")})})()}grant(t){var o=!1;return t.forEach(i=>{this.auth.checkPrivilege(i)&&(o=!0)}),o}}return(s=p).\u0275fac=function(t){return new(t||s)(e.Y36(b.e),e.Y36(_.eN),e.Y36(Z.t2),e.Y36(y.l))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-lab-test-type"]],standalone:!0,features:[e.jDz],decls:87,vars:16,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],[1,"btn"],["type","button","data-toggle","modal","data-target","#add-edit-modal",1,"btn","btn-success","m-r-2","m-b-5",3,"click"],[1,"panel-body"],[1,"col-sm-12",2,"height","100%","overflow","scroll"],[1,"col-sm-4"],["type","text","placeholder","Search...",1,"form-control","pull-right",2,"max-width","8cm",3,"ngModel","ngModelChange"],[1,"table","table-bordered","table-small"],[4,"ngFor","ngForOf"],["id","add-edit-modal","tabindex","-1","role","dialog",1,"modal","fade","modal-success"],["role","document",1,"modal-dialog"],[1,"modal-content"],[1,"modal-header"],["type","button","data-dismiss","modal","aria-label","Close",1,"close"],["aria-hidden","true"],["class","modal-title",4,"ngIf"],[1,"modal-body"],["type","hidden",3,"ngModel","ngModelChange"],[1,"col-xs-12"],["type","text",1,"form-control",3,"ngModel","ngModelChange"],["type","text",1,"form-control",2,"text-align","center",3,"ngModel","ngModelChange"],["type","checkbox",2,"text-align","right",3,"ngModel","ngModelChange"],[1,"modal-footer"],["type","button","data-dismiss","modal",1,"btn","btn-danger"],["type","button","data-dismiss","modal",1,"btn","btn-success",3,"click"],[4,"ngIf"],[2,"text-align","right"],["class","label label-info",4,"ngIf"],["class","label label-danger",4,"ngIf"],["data-toggle","modal","data-target","#add-edit-modal",3,"click"],[1,"glyphicon","glyphicon-pencil"],[1,"label","label-info"],[1,"label","label-danger"],[1,"modal-title"]],template:function(t,o){1&t&&(e.TgZ(0,"section",0)(1,"div",1)(2,"h1"),e._uU(3,"Lab Test Type"),e.qZA()()(),e.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"div",7)(10,"button",8),e.NdJ("click",function(){return o.clear()}),e._uU(11,"New Lab Test"),e.qZA()()(),e.TgZ(12,"div",9)(13,"div",10)(14,"div",3),e._UZ(15,"div",11)(16,"div",11),e.TgZ(17,"div",11)(18,"input",12),e.NdJ("ngModelChange",function(n){return o.filterRecords=n}),e.qZA()()(),e._UZ(19,"br"),e.TgZ(20,"table",13)(21,"thead")(22,"tr")(23,"td"),e._uU(24,"Code"),e.qZA(),e.TgZ(25,"td"),e._uU(26,"Name"),e.qZA(),e.TgZ(27,"td"),e._uU(28,"Description"),e.qZA(),e.TgZ(29,"td"),e._uU(30,"Uom"),e.qZA(),e.TgZ(31,"td"),e._uU(32,"Price"),e.qZA(),e.TgZ(33,"td"),e._uU(34,"Active"),e.qZA(),e.TgZ(35,"td"),e._uU(36,"Action"),e.qZA()()(),e.TgZ(37,"tbody"),e.YNc(38,M,19,11,"tr",14),e.ALo(39,"searchFilter"),e.qZA()()()()()()()(),e.TgZ(40,"div",15)(41,"div",16)(42,"div",17)(43,"div",18)(44,"button",19)(45,"span",20),e._uU(46,"\xd7"),e.qZA()(),e.YNc(47,C,2,0,"h1",21),e.YNc(48,A,2,0,"h1",21),e.qZA(),e.TgZ(49,"div",22)(50,"div",3)(51,"input",23),e.NdJ("ngModelChange",function(n){return o.id=n}),e.qZA(),e.TgZ(52,"div",24)(53,"label"),e._uU(54,"Code*"),e.qZA(),e.TgZ(55,"input",25),e.NdJ("ngModelChange",function(n){return o.code=n}),e.qZA()()(),e.TgZ(56,"div",3)(57,"div",24)(58,"label"),e._uU(59,"Lab Test Type Name*"),e.qZA(),e.TgZ(60,"input",25),e.NdJ("ngModelChange",function(n){return o.name=n}),e.qZA()()(),e.TgZ(61,"div",3)(62,"div",24)(63,"label"),e._uU(64,"Description"),e.qZA(),e.TgZ(65,"input",25),e.NdJ("ngModelChange",function(n){return o.description=n}),e.qZA()()(),e.TgZ(66,"div",3)(67,"div",24)(68,"label"),e._uU(69,"UOM"),e.qZA(),e.TgZ(70,"input",25),e.NdJ("ngModelChange",function(n){return o.uom=n}),e.qZA()()(),e.TgZ(71,"div",3)(72,"div",24)(73,"label"),e._uU(74,"Price"),e.qZA(),e.TgZ(75,"input",26),e.NdJ("ngModelChange",function(n){return o.price=n}),e.qZA()()(),e.TgZ(76,"div",3)(77,"div",24)(78,"label"),e._uU(79,"Active"),e.qZA(),e.TgZ(80,"input",27),e.NdJ("ngModelChange",function(n){return o.active=n}),e.qZA()()()(),e.TgZ(81,"div",28)(82,"button",29),e._uU(83,"Close"),e.qZA(),e.TgZ(84,"button",30),e.NdJ("click",function(){return o.saveLabTestType()}),e.YNc(85,L,2,0,"span",31),e.YNc(86,U,2,0,"span",31),e.qZA()()()()()),2&t&&(e.xp6(18),e.Q6J("ngModel",o.filterRecords),e.xp6(20),e.Q6J("ngForOf",e.xi3(39,13,o.labTestTypes,o.filterRecords)),e.xp6(9),e.Q6J("ngIf",null===o.id),e.xp6(1),e.Q6J("ngIf",null!=o.id),e.xp6(3),e.Q6J("ngModel",o.id),e.xp6(4),e.Q6J("ngModel",o.code),e.xp6(5),e.Q6J("ngModel",o.name),e.xp6(5),e.Q6J("ngModel",o.description),e.xp6(5),e.Q6J("ngModel",o.uom),e.xp6(5),e.Q6J("ngModel",o.price),e.xp6(5),e.Q6J("ngModel",o.active),e.xp6(5),e.Q6J("ngIf",null!=o.id),e.xp6(1),e.Q6J("ngIf",null===o.id))},dependencies:[r.ez,r.sg,r.O5,r.H9,d.u5,d.Fj,d.Wl,d.JJ,d.On,d.UX,m.G]}),p})()}}]);