"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[9150],{9150:(b,f,i)=>{i.r(f),i.d(f,{WardComponent:()=>q});var g=i(5861),h=i(6814),p=i(9862),_=i(95),u=i(4716),T=i(4185),Z=i(553),e=i(6689),C=i(6466),w=i(585),A=i(379),M=i(8237);function v(d,l){1&d&&(e.TgZ(0,"span",39),e._uU(1,"Active"),e.qZA())}function y(d,l){1&d&&(e.TgZ(0,"span",39),e._uU(1,"Active"),e.qZA())}function W(d,l){if(1&d){const r=e.EpF();e.TgZ(0,"tr")(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e._uU(8),e.qZA(),e.TgZ(9,"td",32),e._uU(10),e.qZA(),e.TgZ(11,"td",33),e._uU(12),e.ALo(13,"currency"),e.qZA(),e.TgZ(14,"td"),e.YNc(15,v,2,0,"span",34),e.YNc(16,y,2,0,"span",34),e.qZA(),e.TgZ(17,"td")(18,"a",35),e.NdJ("click",function(){const a=e.CHM(r).$implicit,o=e.oxw();return e.KtG(o.getWard(a.id))}),e._UZ(19,"i",36),e._uU(20,"Edit"),e.qZA(),e._uU(21," | "),e.TgZ(22,"a",37),e.NdJ("click",function(){const a=e.CHM(r).$implicit,o=e.oxw();return e.KtG(o.configureWard(a.id))}),e._UZ(23,"i",38),e._uU(24,"Configure"),e.qZA()()()}if(2&d){const r=l.$implicit;e.xp6(2),e.Oqu(r.code),e.xp6(2),e.Oqu(r.name),e.xp6(2),e.Oqu(null==r||null==r.wardCategory?null:r.wardCategory.name),e.xp6(2),e.Oqu(null==r||null==r.wardType?null:r.wardType.name),e.xp6(2),e.Oqu(r.noOfBeds),e.xp6(2),e.Oqu(e.Dn7(13,8,null==r||null==r.wardType?null:r.wardType.price,"","")),e.xp6(3),e.Q6J("ngIf",!0===(null==r?null:r.active)),e.xp6(1),e.Q6J("ngIf",!1===(null==r?null:r.active))}}function U(d,l){1&d&&(e.TgZ(0,"h1",40),e._uU(1,"Add Ward Type"),e.qZA())}function E(d,l){1&d&&(e.TgZ(0,"h1",40),e._uU(1,"Edit Ward Type"),e.qZA())}function O(d,l){if(1&d&&(e.TgZ(0,"option"),e._uU(1),e.qZA()),2&d){const r=l.$implicit;e.xp6(1),e.Oqu(null==r?null:r.name)}}function x(d,l){if(1&d&&(e.TgZ(0,"option"),e._uU(1),e.qZA()),2&d){const r=l.$implicit;e.xp6(1),e.Oqu(null==r?null:r.name)}}function B(d,l){1&d&&(e.TgZ(0,"span"),e._uU(1,"Update"),e.qZA())}function N(d,l){1&d&&(e.TgZ(0,"span"),e._uU(1,"Add"),e.qZA())}const c=Z.N.apiUrl;let q=(()=>{var d;class l{constructor(n,t,a,o,m){this.auth=n,this.http=t,this.spinner=a,this.msgBox=o,this.router=m,this.code="",this.name="",this.noOfBeds=0,this.active=!0,this.wards=[],this.wardTypes=[],this.wardCategories=[],this.wardCategoryName="",this.wardTypeName="",this.filterRecords=""}ngOnInit(){this.loadWards(),this.loadWardTypes(),this.loadWardCategories()}saveWard(){var n=this;return(0,g.Z)(function*(){let t={headers:(new p.WM).set("Authorization","Bearer "+n.auth.user.access_token)};var a=null,o=null;n.wardCategories.forEach(s=>{s.name===n.wardCategoryName&&(a=s.id)}),n.wardTypes.forEach(s=>{s.name===n.wardTypeName&&(o=s.id)});var m={id:n.id,code:n.code,name:n.name,noOfBeds:n.noOfBeds,wardCategory:{id:a},wardType:{id:o},active:!0};null==n.id||""==n.id?(n.spinner.show(),yield n.http.post(c+"/wards/save",m,t).pipe((0,u.x)(()=>n.spinner.hide())).toPromise().then(s=>{n.id=s?.id,n.code=s.code,n.name=s.name,n.noOfBeds=s.noOfBeds,n.msgBox.showSuccessMessage("Ward created successifully"),n.loadWards(),n.clear()}).catch(s=>{n.msgBox.showErrorMessage(s,"Could not create ward")})):(n.spinner.show(),yield n.http.post(c+"/wards/save",m,t).pipe((0,u.x)(()=>n.spinner.hide())).toPromise().then(s=>{n.id=s?.id,n.code=s.code,n.name=s.name,n.noOfBeds=s.noOfBeds,n.msgBox.showSuccessMessage("Ward updated successifully"),n.loadWards()}).catch(s=>{n.msgBox.showErrorMessage(s,"Could not update ward")}))})()}loadWardTypes(){var n=this;return(0,g.Z)(function*(){n.wards=[];let t={headers:(new p.WM).set("Authorization","Bearer "+n.auth.user.access_token)};n.spinner.show(),yield n.http.get(c+"/ward_types",t).pipe((0,u.x)(()=>n.spinner.hide())).toPromise().then(a=>{a?.forEach(o=>{n.wardTypes.push(o)})}).catch(a=>{n.msgBox.showErrorMessage(a,"Could not load ward types")})})()}loadWardCategories(){var n=this;return(0,g.Z)(function*(){n.wards=[];let t={headers:(new p.WM).set("Authorization","Bearer "+n.auth.user.access_token)};n.spinner.show(),yield n.http.get(c+"/ward_categories",t).pipe((0,u.x)(()=>n.spinner.hide())).toPromise().then(a=>{a?.forEach(o=>{n.wardCategories.push(o)})}).catch(a=>{n.msgBox.showErrorMessage(a,"Could not load ward categories")})})()}loadWards(){var n=this;return(0,g.Z)(function*(){n.wards=[];let t={headers:(new p.WM).set("Authorization","Bearer "+n.auth.user.access_token)};n.spinner.show(),yield n.http.get(c+"/wards",t).pipe((0,u.x)(()=>n.spinner.hide())).toPromise().then(a=>{a?.forEach(o=>{n.wards.push(o)})}).catch(a=>{n.msgBox.showErrorMessage(a,"Could not load wards")})})()}clear(){this.id=null,this.code="",this.name="",this.wardTypeName="",this.wardCategoryName="",this.noOfBeds=0}getWard(n){var t=this;return(0,g.Z)(function*(){if(""==n)return;let a={headers:(new p.WM).set("Authorization","Bearer "+t.auth.user.access_token)};t.spinner.show(),yield t.http.get(c+"/wards/get?id="+n,a).pipe((0,u.x)(()=>t.spinner.hide())).toPromise().then(o=>{console.log(o),t.id=o?.id,t.code=o.code,t.name=o.name,t.noOfBeds=o.noOfBeds,t.wardCategoryName=o.wardCategory.name,t.wardTypeName=o.wardType.name}).catch(o=>{console.log(o),t.msgBox.showErrorMessage(o,"")})})()}grant(n){var t=!1;return n.forEach(a=>{this.auth.checkPrivilege(a)&&(t=!0)}),t}configureWard(n){localStorage.setItem("ward-id",n),this.router.navigate(["ward-configuration"])}}return(d=l).\u0275fac=function(n){return new(n||d)(e.Y36(C.e),e.Y36(p.eN),e.Y36(w.t2),e.Y36(A.l),e.Y36(M.F0))},d.\u0275cmp=e.Xpm({type:d,selectors:[["app-ward"]],standalone:!0,features:[e.jDz],decls:88,vars:17,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],[1,"btn"],["type","button","data-toggle","modal","data-target","#add-edit-modal",1,"btn","btn-success","m-r-2","m-b-5",3,"click"],[1,"panel-body"],[1,"col-sm-12",2,"height","100%","overflow","scroll"],[1,"col-sm-4"],["type","text","placeholder","Search...",1,"form-control","pull-right",2,"max-width","8cm",3,"ngModel","ngModelChange"],[1,"table","table-bordered","table-small"],[4,"ngFor","ngForOf"],["id","add-edit-modal","tabindex","-1","role","dialog",1,"modal","fade","modal-success"],["role","document",1,"modal-dialog"],[1,"modal-content"],[1,"modal-header"],["type","button","data-dismiss","modal","aria-label","Close",1,"close"],["aria-hidden","true"],["class","modal-title",4,"ngIf"],[1,"modal-body"],["type","hidden",3,"ngModel","ngModelChange"],[1,"col-xs-12"],["type","text",1,"form-control",3,"ngModel","ngModelChange"],[1,"form-control",3,"ngModel","ngModelChange"],["type","number",1,"form-control",2,"text-align","center",3,"ngModel","ngModelChange"],[1,"modal-footer"],["type","button","data-dismiss","modal",1,"btn","btn-danger"],["type","button","data-dismiss","modal",1,"btn","btn-success",3,"click"],[4,"ngIf"],[2,"text-align","center"],[2,"text-align","right"],["class","label-success label label-default",4,"ngIf"],["data-toggle","modal","data-target","#add-edit-modal",3,"click"],[1,"glyphicon","glyphicon-pencil"],[3,"click"],[1,"glyphicon","glyphicon-cog"],[1,"label-success","label","label-default"],[1,"modal-title"]],template:function(n,t){1&n&&(e.TgZ(0,"section",0)(1,"div",1)(2,"h1"),e._uU(3,"Ward Register"),e.qZA()()(),e.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"div",7)(10,"button",8),e.NdJ("click",function(){return t.clear()}),e._uU(11,"New Ward"),e.qZA()()(),e.TgZ(12,"div",9)(13,"div",10)(14,"div",3),e._UZ(15,"div",11)(16,"div",11),e.TgZ(17,"div",11)(18,"input",12),e.NdJ("ngModelChange",function(o){return t.filterRecords=o}),e.qZA()()(),e._UZ(19,"br"),e.TgZ(20,"table",13)(21,"thead")(22,"tr")(23,"td"),e._uU(24,"Code"),e.qZA(),e.TgZ(25,"td"),e._uU(26,"Name"),e.qZA(),e.TgZ(27,"td"),e._uU(28,"Category"),e.qZA(),e.TgZ(29,"td"),e._uU(30,"Type"),e.qZA(),e.TgZ(31,"td"),e._uU(32,"Beds/Rooms"),e.qZA(),e.TgZ(33,"td"),e._uU(34,"Price@"),e.qZA(),e.TgZ(35,"td"),e._uU(36,"Active Status"),e.qZA(),e.TgZ(37,"td"),e._uU(38,"Action"),e.qZA()()(),e.TgZ(39,"tbody"),e.YNc(40,W,25,12,"tr",14),e.ALo(41,"searchFilter"),e.qZA()()()()()()()(),e.TgZ(42,"div",15)(43,"div",16)(44,"div",17)(45,"div",18)(46,"button",19)(47,"span",20),e._uU(48,"\xd7"),e.qZA()(),e.YNc(49,U,2,0,"h1",21),e.YNc(50,E,2,0,"h1",21),e.qZA(),e.TgZ(51,"div",22)(52,"div",3)(53,"input",23),e.NdJ("ngModelChange",function(o){return t.id=o}),e.qZA(),e.TgZ(54,"div",24)(55,"label"),e._uU(56,"Ward Code*"),e.qZA(),e.TgZ(57,"input",25),e.NdJ("ngModelChange",function(o){return t.code=o}),e.qZA()()(),e.TgZ(58,"div",3)(59,"div",24)(60,"label"),e._uU(61,"Ward Name*"),e.qZA(),e.TgZ(62,"input",25),e.NdJ("ngModelChange",function(o){return t.name=o}),e.qZA()()(),e.TgZ(63,"div",3)(64,"div",24)(65,"label"),e._uU(66,"Category"),e.qZA(),e.TgZ(67,"select",26),e.NdJ("ngModelChange",function(o){return t.wardCategoryName=o}),e._UZ(68,"option"),e.YNc(69,O,2,1,"option",14),e.qZA()()(),e.TgZ(70,"div",3)(71,"div",24)(72,"label"),e._uU(73,"Type"),e.qZA(),e.TgZ(74,"select",26),e.NdJ("ngModelChange",function(o){return t.wardTypeName=o}),e._UZ(75,"option"),e.YNc(76,x,2,1,"option",14),e.qZA()()(),e.TgZ(77,"div",3)(78,"div",24)(79,"label"),e._uU(80,"No of Beds"),e.qZA(),e.TgZ(81,"input",27),e.NdJ("ngModelChange",function(o){return t.noOfBeds=o}),e.qZA()()()(),e.TgZ(82,"div",28)(83,"button",29),e._uU(84,"Close"),e.qZA(),e.TgZ(85,"button",30),e.NdJ("click",function(){return t.saveWard()}),e.YNc(86,B,2,0,"span",31),e.YNc(87,N,2,0,"span",31),e.qZA()()()()()),2&n&&(e.xp6(18),e.Q6J("ngModel",t.filterRecords),e.xp6(22),e.Q6J("ngForOf",e.xi3(41,14,t.wards,t.filterRecords)),e.xp6(9),e.Q6J("ngIf",null===t.id),e.xp6(1),e.Q6J("ngIf",null!=t.id),e.xp6(3),e.Q6J("ngModel",t.id),e.xp6(4),e.Q6J("ngModel",t.code),e.xp6(5),e.Q6J("ngModel",t.name),e.xp6(5),e.Q6J("ngModel",t.wardCategoryName),e.xp6(2),e.Q6J("ngForOf",t.wardCategories),e.xp6(5),e.Q6J("ngModel",t.wardTypeName),e.xp6(2),e.Q6J("ngForOf",t.wardTypes),e.xp6(5),e.Q6J("ngModel",t.noOfBeds),e.xp6(5),e.Q6J("ngIf",null!=t.id),e.xp6(1),e.Q6J("ngIf",null===t.id))},dependencies:[h.ez,h.sg,h.O5,h.H9,_.u5,_.YN,_.Kr,_.Fj,_.wV,_.EJ,_.JJ,_.On,_.UX,T.G]}),l})()}}]);