"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[4400],{4400:(D,m,s)=>{s.r(m),s.d(m,{PharmacyToStoreROListComponent:()=>M});var _=s(5861),p=s(9862),h=s(4716),O=s(553),d=s(6814),T=s(95),g=s(4185),t=s(6689),Z=s(6466),y=s(7140),R=s(585),f=s(8237),A=s(379);function S(n,c){if(1&n){const r=t.EpF();t.TgZ(0,"button",17),t.NdJ("click",function(){t.CHM(r);const o=t.oxw();return t.KtG(o.returnOrder())}),t._UZ(1,"span",18),t._uU(2,"Return Order"),t.qZA()}}function v(n,c){if(1&n){const r=t.EpF();t.TgZ(0,"button",17),t.NdJ("click",function(){t.CHM(r);const o=t.oxw();return t.KtG(o.rejectOrder())}),t._UZ(1,"span",19),t._uU(2,"Reject Order"),t.qZA()}}function U(n,c){if(1&n){const r=t.EpF();t.TgZ(0,"tr")(1,"td")(2,"small"),t._uU(3),t.qZA()(),t.TgZ(4,"td")(5,"small"),t._uU(6),t.ALo(7,"date"),t.qZA()(),t.TgZ(8,"td")(9,"small"),t._uU(10),t.ALo(11,"date"),t.qZA()(),t.TgZ(12,"td")(13,"small"),t._uU(14),t.qZA()(),t.TgZ(15,"td")(16,"span",20),t.NdJ("click",function(){const a=t.CHM(r).$implicit,i=t.oxw();return t.KtG(i.get(a.id))}),t.TgZ(17,"small"),t._uU(18,"[Select]"),t.qZA()()()()}if(2&n){const r=c.$implicit;t.xp6(3),t.Oqu(r.no),t.xp6(3),t.Oqu(t.lcZ(7,4,r.orderDate)),t.xp6(4),t.Oqu(t.lcZ(11,6,r.validUntil)),t.xp6(4),t.Oqu(r.status)}}function x(n,c){if(1&n&&(t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.qZA()()),2&n){const r=c.$implicit;t.xp6(2),t.Oqu(r.medicine.code),t.xp6(2),t.Oqu(r.medicine.name),t.xp6(2),t.Oqu(r.orderedQty),t.xp6(2),t.Oqu(r.receivedQty)}}function P(n,c){if(1&n){const r=t.EpF();t.TgZ(0,"button",23),t.NdJ("click",function(){t.CHM(r);const o=t.oxw(2);return t.KtG(o.createTransferOrder(o.id))}),t._uU(1,"Transfer Order"),t.qZA()}}function E(n,c){if(1&n&&(t.TgZ(0,"div")(1,"h4",10),t._uU(2,"Order"),t.qZA(),t.TgZ(3,"h5"),t._uU(4),t.qZA(),t.TgZ(5,"h5"),t._uU(6),t.qZA(),t.TgZ(7,"h5"),t._uU(8),t.ALo(9,"date"),t.qZA(),t.TgZ(10,"h5"),t._uU(11),t.ALo(12,"date"),t.qZA(),t.TgZ(13,"h5"),t._uU(14),t.qZA(),t.TgZ(15,"h5"),t._uU(16),t.qZA(),t.TgZ(17,"h5"),t._uU(18),t.qZA(),t.TgZ(19,"h5"),t._uU(20),t.qZA(),t.TgZ(21,"h5"),t._uU(22),t.qZA(),t.TgZ(23,"table",21)(24,"thead")(25,"tr")(26,"td"),t._uU(27,"Code"),t.qZA(),t.TgZ(28,"td"),t._uU(29,"Name"),t.qZA(),t.TgZ(30,"td"),t._uU(31,"Ordered Qty"),t.qZA(),t.TgZ(32,"td"),t._uU(33,"Received Qty"),t.qZA()()(),t.TgZ(34,"tbody"),t.YNc(35,x,9,4,"tr",14),t.ALo(36,"searchFilter"),t.qZA()(),t._UZ(37,"hr"),t.YNc(38,P,2,0,"button",22),t.qZA()),2&n){const r=t.oxw();t.xp6(4),t.hij("Pharmacy: ",null==r.pharmacyToStoreRO||null==r.pharmacyToStoreRO.pharmacy?null:r.pharmacyToStoreRO.pharmacy.name,""),t.xp6(2),t.hij("Order#: ",null==r.pharmacyToStoreRO?null:r.pharmacyToStoreRO.no,""),t.xp6(2),t.hij("Order Date: ",t.lcZ(9,11,null==r.pharmacyToStoreRO?null:r.pharmacyToStoreRO.orderDate),""),t.xp6(3),t.hij("Valid Until: ",t.lcZ(12,13,null==r.pharmacyToStoreRO?null:r.pharmacyToStoreRO.validUntil),""),t.xp6(3),t.hij("Status: ",null==r.pharmacyToStoreRO?null:r.pharmacyToStoreRO.status,""),t.xp6(2),t.hij("Status Description: ",null==r.pharmacyToStoreRO?null:r.pharmacyToStoreRO.statusDescription,""),t.xp6(2),t.hij("Created: ",null==r.pharmacyToStoreRO?null:r.pharmacyToStoreRO.created,""),t.xp6(2),t.hij("Verified: ",null==r.pharmacyToStoreRO?null:r.pharmacyToStoreRO.verified,""),t.xp6(2),t.hij("Approved: ",null==r.pharmacyToStoreRO?null:r.pharmacyToStoreRO.approved,""),t.xp6(13),t.Q6J("ngForOf",t.xi3(36,15,null==r.pharmacyToStoreRO?null:r.pharmacyToStoreRO.pharmacyToStoreRODetails,r.filterRecords)),t.xp6(3),t.Q6J("ngIf",r.pharmacyToStoreRO.pharmacyToStoreRODetails.length>0)}}const u=O.N.apiUrl;let M=(()=>{var n;class c{constructor(e,o,a,i,l,C){this.auth=e,this.http=o,this.modalService=a,this.spinner=i,this.router=l,this.msgBox=C,this.id=null,this.pharmacyToStoreROs=[],this.filterRecords=""}ngOnInit(){var e=this;return(0,_.Z)(function*(){e.loadOrders()})()}loadOrders(){var e=this;return(0,_.Z)(function*(){let o={headers:(new p.WM).set("Authorization","Bearer "+e.auth.user.access_token)};e.spinner.show(),yield e.http.get(u+"/pharmacy_to_store_r_os/load_pharmacy_orders",o).pipe((0,h.x)(()=>e.spinner.hide())).toPromise().then(a=>{e.pharmacyToStoreROs=a},a=>{console.log(a),e.msgBox.showErrorMessage(a,"")})})()}get(e){var o=this;return(0,_.Z)(function*(){let a={headers:(new p.WM).set("Authorization","Bearer "+o.auth.user.access_token)};o.id=null,o.spinner.show(),yield o.http.get(u+"/pharmacy_to_store_r_os/get?id="+e,a).pipe((0,h.x)(()=>o.spinner.hide())).toPromise().then(i=>{o.id=e,o.pharmacyToStoreRO=i,console.log(i)},i=>{console.log(i),o.msgBox.showErrorMessage(i,"")})})()}createTransferOrder(e){var o=this;return(0,_.Z)(function*(){if(!window.confirm("Greate / Go to Transfer Order. Confirm?"))return;let a={headers:(new p.WM).set("Authorization","Bearer "+o.auth.user.access_token)};var i={id:e};o.spinner.show(),yield o.http.post(u+"/store_to_pharmacy_t_os/create",i,a).pipe((0,h.x)(()=>o.spinner.hide())).toPromise().then(l=>{localStorage.setItem("store-to-pharmacy-t-o-id",l?.id),o.router.navigate(["store-to-pharmacy-t-o"]),console.log(l)},l=>{console.log(l),o.msgBox.showErrorMessage(l,"")})})()}returnOrder(){var e=this;return(0,_.Z)(function*(){if(!window.confirm("Confirm return order for correction. Confirm?"))return;let o={headers:(new p.WM).set("Authorization","Bearer "+e.auth.user.access_token)};var a={id:e.pharmacyToStoreRO?.id,no:e.pharmacyToStoreRO?.no};e.spinner.show(),yield e.http.post(u+"/pharmacy_to_store_r_os/return",a,o).pipe((0,h.x)(()=>e.spinner.hide())).toPromise().then(()=>{e.msgBox.showSuccessMessage("Order returned successifuly")}).catch(i=>{e.msgBox.showErrorMessage(i,"")})})()}rejectOrder(){var e=this;return(0,_.Z)(function*(){if(!window.confirm("Confirm reject order. Confirm?"))return;let o={headers:(new p.WM).set("Authorization","Bearer "+e.auth.user.access_token)};var a={id:e.pharmacyToStoreRO?.id,no:e.pharmacyToStoreRO?.no};e.spinner.show(),yield e.http.post(u+"/pharmacy_to_store_r_os/reject",a,o).pipe((0,h.x)(()=>e.spinner.hide())).toPromise().then(()=>{e.msgBox.showSuccessMessage("Order rejected successifuly")}).catch(i=>{e.msgBox.showErrorMessage(i,"")})})()}grant(e){var o=!1;return e.forEach(a=>{this.auth.checkPrivilege(a)&&(o=!0)}),o}}return(n=c).\u0275fac=function(e){return new(e||n)(t.Y36(Z.e),t.Y36(p.eN),t.Y36(y.FF),t.Y36(R.t2),t.Y36(f.F0),t.Y36(A.l))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-pharmacy-to-store-r-o-list"]],standalone:!0,features:[t.jDz],decls:38,vars:4,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],["class","btn btn-primary btn-outline",3,"click",4,"ngIf"],[1,"panel-body"],[1,"col-sm-4","jumbotron"],[1,"text-primary"],[1,"table","table-bordered"],[2,"position","sticky","top","0"],[1,"table-dark"],[4,"ngFor","ngForOf"],[1,"col-sm-8"],[4,"ngIf"],[1,"btn","btn-primary","btn-outline",3,"click"],[1,"glyphicon","glyphicon-arrow-left"],[1,"glyphicon","glyphicon-remove-sign"],["data-dismiss","modal",2,"cursor","pointer",3,"click"],[1,"table","table-responsive","table","striped","table-bordered"],["class","btn btn-primary",3,"click",4,"ngIf"],[1,"btn","btn-primary",3,"click"]],template:function(e,o){1&e&&(t.TgZ(0,"section",0)(1,"div",1)(2,"h1"),t._uU(3,"Pharmacy To Store Requisition Order List"),t.qZA()()(),t.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6),t.YNc(9,S,3,0,"button",7),t.YNc(10,v,3,0,"button",7),t.qZA(),t.TgZ(11,"div",8)(12,"div",3)(13,"div",9)(14,"h4",10),t._uU(15,"Order List"),t.qZA(),t.TgZ(16,"table",11)(17,"thead",12)(18,"tr",13)(19,"td")(20,"small"),t._uU(21,"Order#"),t.qZA()(),t.TgZ(22,"td")(23,"small"),t._uU(24,"Order Date"),t.qZA()(),t.TgZ(25,"td")(26,"small"),t._uU(27,"Valid Until"),t.qZA()(),t.TgZ(28,"td")(29,"small"),t._uU(30,"Status"),t.qZA()(),t.TgZ(31,"td")(32,"small"),t._uU(33,"Select"),t.qZA()()()(),t.TgZ(34,"tbody"),t.YNc(35,U,19,8,"tr",14),t.qZA()()(),t.TgZ(36,"div",15),t.YNc(37,E,39,18,"div",16),t.qZA()()()()()()()),2&e&&(t.xp6(9),t.Q6J("ngIf",null!=o.id),t.xp6(1),t.Q6J("ngIf",null!=o.id),t.xp6(25),t.Q6J("ngForOf",o.pharmacyToStoreROs),t.xp6(2),t.Q6J("ngIf",null!=o.pharmacyToStoreRO))},dependencies:[d.ez,d.sg,d.O5,d.uU,T.u5,T.UX,g.G]}),c})()}}]);