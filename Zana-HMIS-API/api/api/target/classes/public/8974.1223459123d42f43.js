"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[8974],{8974:(q,h,r)=>{r.r(h),r.d(h,{StoreComponent:()=>y});var p=r(5861),u=r(6814),c=r(9862),d=r(95),_=r(4716),m=r(4185),Z=r(553),e=r(6689),v=r(6466),f=r(585),T=r(379);function C(s,l){1&s&&(e.TgZ(0,"span",36),e._uU(1,"Active"),e.qZA())}function M(s,l){1&s&&(e.TgZ(0,"span",37),e._uU(1,"Inactive"),e.qZA())}function A(s,l){if(1&s){const a=e.EpF();e.TgZ(0,"tr")(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e._uU(8),e.qZA(),e.TgZ(9,"td"),e.YNc(10,C,2,0,"span",32),e.YNc(11,M,2,0,"span",33),e.qZA(),e.TgZ(12,"td")(13,"a",34),e.NdJ("click",function(){const i=e.CHM(a).$implicit,o=e.oxw();return e.KtG(o.getStore(i.id))}),e._UZ(14,"i",35),e._uU(15,"Edit"),e.qZA()()()}if(2&s){const a=l.$implicit;e.xp6(2),e.Oqu(a.code),e.xp6(2),e.Oqu(a.name),e.xp6(2),e.Oqu(a.description),e.xp6(2),e.Oqu(a.category),e.xp6(2),e.Q6J("ngIf",!0===a.active),e.xp6(1),e.Q6J("ngIf",!1===a.active)}}function U(s,l){1&s&&(e.TgZ(0,"h1",38),e._uU(1,"Add Store"),e.qZA())}function S(s,l){1&s&&(e.TgZ(0,"h1",38),e._uU(1,"Edit Store"),e.qZA())}function E(s,l){1&s&&(e.TgZ(0,"span"),e._uU(1,"Update"),e.qZA())}function b(s,l){1&s&&(e.TgZ(0,"span"),e._uU(1,"Add"),e.qZA())}const g=Z.N.apiUrl;let y=(()=>{var s;class l{constructor(t,n,i,o){this.auth=t,this.http=n,this.spinner=i,this.msgBox=o,this.code="",this.name="",this.description="",this.location="",this.category="",this.active=!0,this.stores=[],this.filterRecords=""}ngOnInit(){this.loadStores()}saveStore(){var t=this;return(0,p.Z)(function*(){let n={headers:(new c.WM).set("Authorization","Bearer "+t.auth.user.access_token)};var i={id:t.id,code:t.code,name:t.name,description:t.description,location:t.location,category:t.category,active:!0};null==t.id||""==t.id?(t.spinner.show(),yield t.http.post(g+"/stores/save",i,n).pipe((0,_.x)(()=>t.spinner.hide())).toPromise().then(o=>{t.id=o?.id,t.code=o.code,t.name=o.name,t.description=o.description,t.location=o.location,t.category=o.category,t.active=o.active,t.msgBox.showSuccessMessage("Store created successifully"),t.loadStores(),t.clear()}).catch(o=>{t.msgBox.showErrorMessage(o,"Could not create store")})):(t.spinner.show(),yield t.http.post(g+"/stores/save",i,n).pipe((0,_.x)(()=>t.spinner.hide())).toPromise().then(o=>{t.id=o?.id,t.code=o.code,t.name=o.name,t.description=o.description,t.location=o.location,t.category=o.category,t.active=o.active,t.msgBox.showSuccessMessage("Store updated successifully"),t.loadStores()}).catch(o=>{t.msgBox.showErrorMessage(o,"Could not update store")}))})()}loadStores(){var t=this;return(0,p.Z)(function*(){t.stores=[];let n={headers:(new c.WM).set("Authorization","Bearer "+t.auth.user.access_token)};t.spinner.show(),yield t.http.get(g+"/stores",n).pipe((0,_.x)(()=>t.spinner.hide())).toPromise().then(i=>{i?.forEach(o=>{t.stores.push(o)})}).catch(i=>{t.msgBox.showErrorMessage(i,"Could not load stores")})})()}clear(){this.id=null,this.code="",this.name="",this.description="",this.location="",this.category=""}getStore(t){var n=this;return(0,p.Z)(function*(){if(""==t)return;let i={headers:(new c.WM).set("Authorization","Bearer "+n.auth.user.access_token)};n.spinner.show(),yield n.http.get(g+"/stores/get?id="+t,i).pipe((0,_.x)(()=>n.spinner.hide())).toPromise().then(o=>{n.id=o?.id,n.code=o.code,n.name=o.name,n.description=o.description,n.location=o.location,n.category=o.category,n.active=o.active}).catch(o=>{console.log(o),n.msgBox.showErrorMessage(o,"Could not find store")})})()}grant(t){var n=!1;return t.forEach(i=>{this.auth.checkPrivilege(i)&&(n=!0)}),n}}return(s=l).\u0275fac=function(t){return new(t||s)(e.Y36(v.e),e.Y36(c.eN),e.Y36(f.t2),e.Y36(T.l))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-store"]],standalone:!0,features:[e.jDz],decls:88,vars:16,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],[1,"btn"],["type","button","data-toggle","modal","data-target","#add-edit-modal",1,"btn","btn-success","m-r-2","m-b-5",3,"click"],[1,"panel-body"],[1,"col-sm-12",2,"height","100%","overflow","scroll"],[1,"col-sm-4"],["type","text","placeholder","Search...",1,"form-control","pull-right",2,"max-width","8cm",3,"ngModel","ngModelChange"],[1,"table","table-bordered","table-small"],[4,"ngFor","ngForOf"],["id","add-edit-modal","tabindex","-1","role","dialog",1,"modal","fade","modal-success"],["role","document",1,"modal-dialog"],[1,"modal-content"],[1,"modal-header"],["type","button","data-dismiss","modal","aria-label","Close",1,"close"],["aria-hidden","true"],["class","modal-title",4,"ngIf"],[1,"modal-body"],["type","hidden",3,"ngModel","ngModelChange"],[1,"col-xs-12"],["type","text",1,"form-control",3,"ngModel","ngModelChange"],[1,"form-control",3,"ngModel","ngModelChange"],["type","checkbox",2,"text-align","right",3,"ngModel","ngModelChange"],[1,"modal-footer"],["type","button","data-dismiss","modal",1,"btn","btn-danger"],["type","button","data-dismiss","modal",1,"btn","btn-success",3,"click"],[4,"ngIf"],["class","label label-info",4,"ngIf"],["class","label label-danger",4,"ngIf"],["data-toggle","modal","data-target","#add-edit-modal",3,"click"],[1,"glyphicon","glyphicon-pencil"],[1,"label","label-info"],[1,"label","label-danger"],[1,"modal-title"]],template:function(t,n){1&t&&(e.TgZ(0,"section",0)(1,"div",1)(2,"h1"),e._uU(3,"Store Register"),e.qZA()()(),e.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"div",7)(10,"button",8),e.NdJ("click",function(){return n.clear()}),e._uU(11,"New Store"),e.qZA()()(),e.TgZ(12,"div",9)(13,"div",10)(14,"div",3),e._UZ(15,"div",11)(16,"div",11),e.TgZ(17,"div",11)(18,"input",12),e.NdJ("ngModelChange",function(o){return n.filterRecords=o}),e.qZA()()(),e._UZ(19,"br"),e.TgZ(20,"table",13)(21,"thead")(22,"tr")(23,"td"),e._uU(24,"Code"),e.qZA(),e.TgZ(25,"td"),e._uU(26,"Name"),e.qZA(),e.TgZ(27,"td"),e._uU(28,"Description"),e.qZA(),e.TgZ(29,"td"),e._uU(30,"Category"),e.qZA(),e.TgZ(31,"td"),e._uU(32,"Status"),e.qZA(),e.TgZ(33,"td"),e._uU(34,"Action"),e.qZA()()(),e.TgZ(35,"tbody"),e.YNc(36,A,16,6,"tr",14),e.ALo(37,"searchFilter"),e.qZA()()()()()()()(),e.TgZ(38,"div",15)(39,"div",16)(40,"div",17)(41,"div",18)(42,"button",19)(43,"span",20),e._uU(44,"\xd7"),e.qZA()(),e.YNc(45,U,2,0,"h1",21),e.YNc(46,S,2,0,"h1",21),e.qZA(),e.TgZ(47,"div",22)(48,"div",3)(49,"input",23),e.NdJ("ngModelChange",function(o){return n.id=o}),e.qZA(),e.TgZ(50,"div",24)(51,"label"),e._uU(52,"Store Code*"),e.qZA(),e.TgZ(53,"input",25),e.NdJ("ngModelChange",function(o){return n.code=o}),e.qZA()()(),e.TgZ(54,"div",3)(55,"div",24)(56,"label"),e._uU(57,"Store Name*"),e.qZA(),e.TgZ(58,"input",25),e.NdJ("ngModelChange",function(o){return n.name=o}),e.qZA()()(),e.TgZ(59,"div",3)(60,"div",24)(61,"label"),e._uU(62,"Description"),e.qZA(),e.TgZ(63,"input",25),e.NdJ("ngModelChange",function(o){return n.description=o}),e.qZA()()(),e.TgZ(64,"div",3)(65,"div",24)(66,"label"),e._uU(67,"Location"),e.qZA(),e.TgZ(68,"input",25),e.NdJ("ngModelChange",function(o){return n.location=o}),e.qZA()()(),e.TgZ(69,"div",3)(70,"div",4)(71,"label"),e._uU(72,"Select Category"),e.qZA(),e.TgZ(73,"select",26),e.NdJ("ngModelChange",function(o){return n.category=o}),e._UZ(74,"option"),e.TgZ(75,"option"),e._uU(76,"ALL"),e.qZA()()()(),e.TgZ(77,"div",3)(78,"div",24)(79,"label"),e._uU(80,"Active"),e.qZA(),e.TgZ(81,"input",27),e.NdJ("ngModelChange",function(o){return n.active=o}),e.qZA()()()(),e.TgZ(82,"div",28)(83,"button",29),e._uU(84,"Close"),e.qZA(),e.TgZ(85,"button",30),e.NdJ("click",function(){return n.saveStore()}),e.YNc(86,E,2,0,"span",31),e.YNc(87,b,2,0,"span",31),e.qZA()()()()()),2&t&&(e.xp6(18),e.Q6J("ngModel",n.filterRecords),e.xp6(18),e.Q6J("ngForOf",e.xi3(37,13,n.stores,n.filterRecords)),e.xp6(9),e.Q6J("ngIf",null===n.id),e.xp6(1),e.Q6J("ngIf",null!=n.id),e.xp6(3),e.Q6J("ngModel",n.id),e.xp6(4),e.Q6J("ngModel",n.code),e.xp6(5),e.Q6J("ngModel",n.name),e.xp6(5),e.Q6J("ngModel",n.description),e.xp6(5),e.Q6J("ngModel",n.location),e.xp6(5),e.Q6J("ngModel",n.category),e.xp6(8),e.Q6J("ngModel",n.active),e.xp6(5),e.Q6J("ngIf",null!=n.id),e.xp6(1),e.Q6J("ngIf",null===n.id))},dependencies:[u.ez,u.sg,u.O5,d.u5,d.YN,d.Kr,d.Fj,d.Wl,d.EJ,d.JJ,d.On,d.UX,m.G]}),l})()}}]);