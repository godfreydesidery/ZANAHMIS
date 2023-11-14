"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[8572],{8572:(A,p,r)=>{r.r(p),r.d(p,{RegistrationPlanComponent:()=>B});var h=r(5861),g=r(6814),a=r(9862),P=r(95),m=r(8237),o=r(4716),v=r(553),t=r(6689),E=r(6466),M=r(1581),f=r(585),C=r(379);function R(c,_){if(1&c){const u=t.EpF();t.TgZ(0,"div",9)(1,"button",10),t.NdJ("click",function(){const i=t.CHM(u).$implicit,s=t.oxw();return t.KtG(s.setInsurancePlanId(i.id,i.name))}),t._uU(2),t.qZA()()}if(2&c){const u=_.$implicit;t.xp6(2),t.Oqu(u.name)}}const l=v.N.apiUrl;let B=(()=>{var c;class _{constructor(n,e,i,s,d){this.auth=n,this.http=e,this.modalService=i,this.spinner=s,this.msgBox=d,this.id=null,this.registrationFee=0,this.insuranceProviderName="",this.insurancePlanName="",this.insuranceProviderNames=[],this.insurancePlanNames=[],this.registrationPlans=[],this.insurancePlans=[],this.filterRecords=""}ngOnInit(){this.loadInsurancePlans()}loadInsuranceProviderNames(){var n=this;return(0,h.Z)(function*(){n.insuranceProviderNames=[];let e={headers:(new a.WM).set("Authorization","Bearer "+n.auth.user.access_token)};n.spinner.show(),yield n.http.get(l+"/insurance_providers/get_names",e).pipe((0,o.x)(()=>n.spinner.hide())).toPromise().then(i=>{i?.forEach(s=>{n.insuranceProviderNames.push(s)})}).catch(i=>{n.msgBox.showErrorMessage(i,"Could not load Providers")})})()}loadInsurancePlans(){var n=this;return(0,h.Z)(function*(){n.insurancePlans=[];let e={headers:(new a.WM).set("Authorization","Bearer "+n.auth.user.access_token)};n.spinner.show(),yield n.http.get(l+"/insurance_plans",e).pipe((0,o.x)(()=>n.spinner.hide())).toPromise().then(i=>{n.insurancePlans=i}).catch(i=>{n.msgBox.showErrorMessage(i,"")})})()}loadInsurancePlanNamesByProviders(n){var e=this;return(0,h.Z)(function*(){e.insurancePlanNames=[];let i={headers:(new a.WM).set("Authorization","Bearer "+e.auth.user.access_token)};e.spinner.show(),yield e.http.get(l+"/insurance_plans/get_names_by_insurance_provider?provider_name="+n,i).pipe((0,o.x)(()=>e.spinner.hide())).toPromise().then(s=>{s?.forEach(d=>{e.insurancePlanNames.push(d)})}).catch(s=>{e.msgBox.showErrorMessage(s,"Could not load Plans")})})()}loadRegistrationPlans(){var n=this;return(0,h.Z)(function*(){n.registrationPlans=[];let e={headers:(new a.WM).set("Authorization","Bearer "+n.auth.user.access_token)};n.spinner.show(),yield n.http.get(l+"/registration_insurance_plans",e).pipe((0,o.x)(()=>n.spinner.hide())).toPromise().then(i=>{i?.forEach(s=>{n.registrationPlans.push(s)})}).catch(i=>{n.msgBox.showErrorMessage(i,"Could not load registration plans")})})()}saveRegistrationPlan(){var n=this;return(0,h.Z)(function*(){let e={headers:(new a.WM).set("Authorization","Bearer "+n.auth.user.access_token)};var i={id:n.id,insurancePlan:{name:n.insurancePlanName},registrationFee:n.registrationFee};null==n.id||""==n.id?(n.spinner.show(),yield n.http.post(l+"/registration_insurance_plans/save",i,e).pipe((0,o.x)(()=>n.spinner.hide())).toPromise().then(s=>{n.id=s?.id,n.msgBox.showSuccessMessage("Registration plan created successifully"),n.loadRegistrationPlans()}).catch(s=>{n.msgBox.showErrorMessage(s,"Could not create registration plan")})):(n.spinner.show(),yield n.http.post(l+"/registration_insurance_plans/save",i,e).pipe((0,o.x)(()=>n.spinner.hide())).toPromise().then(s=>{n.id=s?.id,n.msgBox.showSuccessMessage("Registration plan updated successifully"),n.loadRegistrationPlans()}).catch(s=>{n.msgBox.showErrorMessage(s,"Could not update registration plan")})),n.clear()})()}clear(){this.id=null,this.insuranceProviderName="",this.insurancePlanName="",this.registrationFee=0}getRegistrationPlan(n){var e=this;return(0,h.Z)(function*(){if(""==n)return;let i={headers:(new a.WM).set("Authorization","Bearer "+e.auth.user.access_token)};e.spinner.show(),yield e.http.get(l+"/registration_insurance_plans/get?id="+n,i).pipe((0,o.x)(()=>e.spinner.hide())).toPromise().then(s=>{console.log(s),e.id=s?.id,e.insuranceProviderName=s.insurancePlan.insuranceProvider.name,e.insurancePlanName=s.insurancePlan.name,e.registrationFee=s.registrationFee}).catch(s=>{console.log(s),e.msgBox.showErrorMessage(s,"Could not find registration plan")})})()}deleteRegistrationPlan(n){var e=this;return(0,h.Z)(function*(){if(""==n||!window.confirm("Delete this plan? Plan ID: "+n))return;let i={headers:(new a.WM).set("Authorization","Bearer "+e.auth.user.access_token)};e.spinner.show(),yield e.http.post(l+"/registration_insurance_plans/delete?id="+n,i).pipe((0,o.x)(()=>e.spinner.hide())).toPromise().then(s=>{console.log(s),e.loadRegistrationPlans()}).catch(s=>{console.log(s),e.msgBox.showErrorMessage(s,"Could not delete registration plan")})})()}grant(n){var e=!1;return n.forEach(i=>{this.auth.checkPrivilege(i)&&(e=!0)}),e}setInsurancePlanId(n,e){localStorage.setItem("insurance_plan_id",n),localStorage.setItem("insurance_plan_name",e)}}return(c=_).\u0275fac=function(n){return new(n||c)(t.Y36(E.e),t.Y36(a.eN),t.Y36(M.FF),t.Y36(f.t2),t.Y36(C.l))},c.\u0275cmp=t.Xpm({type:c,selectors:[["app-registration-plan"]],standalone:!0,features:[t.jDz],decls:18,vars:1,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],[1,"text-primary"],[1,"panel-body"],[1,"col-sm-2"],["routerLink","/registration-price",1,"btn","btn-transparent","btn-primary","btn-outline","form-control",2,"border-radius","0px",3,"click"],["class","col-sm-2",4,"ngFor","ngForOf"]],template:function(n,e){1&n&&(t.TgZ(0,"section",0)(1,"div",1)(2,"h1"),t._uU(3,"Registration Plan"),t.qZA()()(),t.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"h4",7),t._uU(10,"Select Package"),t.qZA()(),t.TgZ(11,"div",8)(12,"div",4)(13,"div",3)(14,"div",9)(15,"button",10),t.NdJ("click",function(){return e.setInsurancePlanId(0,"CASH")}),t._uU(16,"CASH"),t.qZA()(),t.YNc(17,R,3,1,"div",11),t.qZA()()()()()()()),2&n&&(t.xp6(17),t.Q6J("ngForOf",e.insurancePlans))},dependencies:[g.ez,g.sg,P.u5,P.UX,m.rH]}),_})()}}]);