"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[5938],{5938:(M,p,o)=>{o.r(p),o.d(p,{SelectPharmacyComponent:()=>b});var i=o(5861),h=o(6814),_=o(9862),l=o(95),g=o(8237),d=o(4716),y=o(553),e=o(6689),P=o(6466),v=o(585),f=o(379);function Z(n,s){1&n&&(e.TgZ(0,"div",12)(1,"button",13),e._uU(2,"Outpatient List"),e.qZA(),e.TgZ(3,"button",14),e._uU(4,"Inpatient List"),e.qZA(),e.TgZ(5,"button",15),e._uU(6,"Stock Status"),e.qZA(),e._uU(7," | "),e.TgZ(8,"button",16),e._uU(9,"Store Requisition Order"),e.qZA(),e.TgZ(10,"button",17),e._uU(11,"Store Receiving Note"),e.qZA()())}function I(n,s){if(1&n&&(e.TgZ(0,"div")(1,"div",4)(2,"h4"),e._uU(3),e.qZA(),e._UZ(4,"br")(5,"br"),e.TgZ(6,"h5"),e._uU(7,"To switch pharmacy, please log in afresh"),e.qZA()()()),2&n){const c=e.oxw();e.xp6(3),e.hij("Selected Pharmacy: ",c.selectedPharmacyName,"")}}function E(n,s){if(1&n&&(e.TgZ(0,"option"),e._uU(1),e.qZA()),2&n){const c=s.$implicit;e.xp6(1),e.Oqu(c.name)}}function T(n,s){if(1&n){const c=e.EpF();e.TgZ(0,"button",24),e.NdJ("click",function(){e.CHM(c);const t=e.oxw(2);return e.KtG(t.selectPharmacy(t.pharmacyName))}),e._uU(1,"Select"),e.qZA()}}function C(n,s){if(1&n){const c=e.EpF();e.TgZ(0,"button",25),e.NdJ("click",function(){e.CHM(c);const t=e.oxw(2);return e.KtG(t.clear())}),e._uU(1,"Cancel"),e.qZA()}}function S(n,s){if(1&n){const c=e.EpF();e.TgZ(0,"div")(1,"div",4)(2,"h2",18),e._uU(3,"Please Select Pharmacy"),e.qZA(),e.TgZ(4,"select",19),e.NdJ("ngModelChange",function(t){e.CHM(c);const m=e.oxw();return e.KtG(m.pharmacyName=t)}),e._UZ(5,"option"),e.YNc(6,E,2,1,"option",20),e.qZA(),e._UZ(7,"hr"),e.qZA(),e.TgZ(8,"div",21),e.YNc(9,T,2,0,"button",22),e.qZA(),e.TgZ(10,"div",21),e.YNc(11,C,2,0,"button",23),e.qZA()()}if(2&n){const c=e.oxw();e.xp6(4),e.Q6J("ngModel",c.pharmacyName),e.xp6(2),e.Q6J("ngForOf",c.pharmacies),e.xp6(3),e.Q6J("ngIf",""!=c.pharmacyName),e.xp6(2),e.Q6J("ngIf",""!=c.pharmacyName)}}const u=y.N.apiUrl;let b=(()=>{var n;class s{constructor(a,t,m,r){this.auth=a,this.http=t,this.spinner=m,this.msgBox=r,this.pharmacies=[],this.pharmacyName="",this.selectedPharmacyCode="",this.selectedPharmacyName="",this.filterRecords=""}ngOnInit(){var a=this;return(0,i.Z)(function*(){null!=localStorage.getItem("selected-pharmacy-id")&&(a.selectedPharmacyId=localStorage.getItem("selected-pharmacy-id")),null!=localStorage.getItem("selected-pharmacy-code")&&(a.selectedPharmacyCode=localStorage.getItem("selected-pharmacy-code").toString()),null!=localStorage.getItem("selected-pharmacy-name")&&(a.selectedPharmacyName=localStorage.getItem("selected-pharmacy-name").toString()),a.loadPharmacies()})()}loadPharmacies(){var a=this;return(0,i.Z)(function*(){a.pharmacies=[];let t={headers:(new _.WM).set("Authorization","Bearer "+a.auth.user.access_token)};a.spinner.show(),yield a.http.get(u+"/pharmacies",t).pipe((0,d.x)(()=>a.spinner.hide())).toPromise().then(m=>{m?.forEach(r=>{a.pharmacies.push(r)})}).catch(m=>{a.msgBox.showErrorMessage(m,"Could not load pharmacies")})})()}clear(){this.pharmacyName=""}selectPharmacy(a){var t=this;return(0,i.Z)(function*(){let m={headers:(new _.WM).set("Authorization","Bearer "+t.auth.user.access_token)};localStorage.removeItem("selected-pharmacy-id"),localStorage.removeItem("selected-pharmacy-code"),localStorage.removeItem("selected-pharmacy-name"),t.spinner.show(),yield t.http.get(u+"/pharmacies/get_by_name?name="+a,m).pipe((0,d.x)(()=>t.spinner.hide())).toPromise().then(r=>{localStorage.setItem("selected-pharmacy-id",r?.id),localStorage.setItem("selected-pharmacy-code",r.code),localStorage.setItem("selected-pharmacy-name",r.name),t.selectedPharmacyId=r?.id,t.selectedPharmacyCode=r.code,t.selectedPharmacyName=r.name}).catch(r=>{localStorage.setItem("selected-pharmacy-id",t.selectedPharmacyId),localStorage.setItem("selected-pharmacy-code",t.selectedPharmacyCode),localStorage.setItem("selected-pharmacy-name",t.selectedPharmacyName),t.msgBox.showErrorMessage(r,""),console.log(r)})})()}grant(a){var t=!1;return a.forEach(m=>{this.auth.checkPrivilege(m)&&(t=!0)}),t}}return(n=s).\u0275fac=function(a){return new(a||n)(e.Y36(P.e),e.Y36(_.eN),e.Y36(v.t2),e.Y36(f.l))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-select-pharmacy"]],standalone:!0,features:[e.jDz],decls:18,vars:4,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],["class","panel-heading",4,"ngIf"],[1,"panel-body"],[1,"row",2,"margin-top","5%"],[1,"col-sm-3"],[1,"col-sm-6","jumbotron"],[4,"ngIf"],[1,"panel-heading"],["routerLink","/pharmacy-outpatient-list",1,"btn","btn-primary","btn-outline"],["routerLink","/pharmacy-inpatient-list",1,"btn","btn-primary","btn-outline"],["routerLink","/pharmacy-medicine-stock-status",1,"btn","btn-primary","btn-outline"],["routerLink","/pharmacy-to-store-r-o",1,"btn","btn-primary","btn-outline"],["routerLink","/store-to-pharmacy-r-n",1,"btn","btn-primary","btn-outline"],[1,"text-primary"],[1,"form-control",2,"font-size","x-large","height","2cm",3,"ngModel","ngModelChange"],[4,"ngFor","ngForOf"],[1,"col-xs-6"],["class","btn btn-primary form-control",3,"click",4,"ngIf"],["class","btn btn-default form-control",3,"click",4,"ngIf"],[1,"btn","btn-primary","form-control",3,"click"],[1,"btn","btn-default","form-control",3,"click"]],template:function(a,t){1&a&&(e.TgZ(0,"section",0)(1,"div",1)(2,"h1"),e._uU(3),e.qZA()()(),e.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5),e.YNc(8,Z,12,0,"div",6),e.TgZ(9,"div",7)(10,"section",2)(11,"div",8),e._UZ(12,"div",9),e.TgZ(13,"div",10)(14,"div",3),e.YNc(15,I,8,1,"div",11),e.YNc(16,S,12,4,"div",11),e.qZA()(),e._UZ(17,"div",9),e.qZA()()()()()()()),2&a&&(e.xp6(3),e.hij("Pharmacy - ",t.selectedPharmacyName,""),e.xp6(5),e.Q6J("ngIf",""!=t.selectedPharmacyName),e.xp6(7),e.Q6J("ngIf",""!=t.selectedPharmacyName),e.xp6(1),e.Q6J("ngIf",""===t.selectedPharmacyName))},dependencies:[h.ez,h.sg,h.O5,l.u5,l.YN,l.Kr,l.EJ,l.JJ,l.On,l.UX,g.rH]}),s})()}}]);