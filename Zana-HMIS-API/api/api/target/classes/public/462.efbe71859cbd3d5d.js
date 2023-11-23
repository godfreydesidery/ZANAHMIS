"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[462],{462:(I,d,r)=>{r.r(d),r.d(d,{LabTestPlanComponent:()=>f});var c=r(5861),m=r(6814),i=r(9862),P=r(95),T=r(8237),o=r(4716),g=r(553),a=r(6689),v=r(6466),y=r(1581),b=r(585),E=r(379);function M(p,h){if(1&p){const u=a.EpF();a.TgZ(0,"div",9)(1,"button",10),a.NdJ("click",function(){const t=a.CHM(u).$implicit,s=a.oxw();return a.KtG(s.setInsurancePlanId(t.id,t.name))}),a._uU(2),a.qZA()()}if(2&p){const u=h.$implicit;a.xp6(2),a.Oqu(u.name)}}const l=g.N.apiUrl;let f=(()=>{var p;class h{constructor(e,n,t,s,_){this.auth=e,this.http=n,this.modalService=t,this.spinner=s,this.msgBox=_,this.id=null,this.price=0,this.insuranceProviderName="",this.insurancePlanName="",this.insuranceProviderNames=[],this.insurancePlanNames=[],this.labTestTypeName="",this.labTestTypeNames=[],this.labTestTypeInsurancePlans=[],this.insurancePlans=[],this.filterRecords=""}ngOnInit(){this.loadInsurancePlans()}loadInsuranceProviderNames(){var e=this;return(0,c.Z)(function*(){e.insuranceProviderNames=[];let n={headers:(new i.WM).set("Authorization","Bearer "+e.auth.user.access_token)};e.spinner.show(),yield e.http.get(l+"/insurance_providers/get_names",n).pipe((0,o.x)(()=>e.spinner.hide())).toPromise().then(t=>{t?.forEach(s=>{e.insuranceProviderNames.push(s)})}).catch(t=>{e.msgBox.showErrorMessage(t,"Could not load Providers")})})()}loadInsurancePlans(){var e=this;return(0,c.Z)(function*(){e.insurancePlans=[];let n={headers:(new i.WM).set("Authorization","Bearer "+e.auth.user.access_token)};e.spinner.show(),yield e.http.get(l+"/insurance_plans",n).pipe((0,o.x)(()=>e.spinner.hide())).toPromise().then(t=>{e.insurancePlans=t}).catch(t=>{e.msgBox.showErrorMessage(t,"")})})()}loadInsurancePlanNamesByProviders(e){var n=this;return(0,c.Z)(function*(){n.insurancePlanNames=[];let t={headers:(new i.WM).set("Authorization","Bearer "+n.auth.user.access_token)};n.spinner.show(),yield n.http.get(l+"/insurance_plans/get_names_by_insurance_provider?provider_name="+e,t).pipe((0,o.x)(()=>n.spinner.hide())).toPromise().then(s=>{s?.forEach(_=>{n.insurancePlanNames.push(_)})}).catch(s=>{n.msgBox.showErrorMessage(s,"Could not load Plans")})})()}loadLabTestTypeInsurancePlans(){var e=this;return(0,c.Z)(function*(){e.labTestTypeInsurancePlans=[];let n={headers:(new i.WM).set("Authorization","Bearer "+e.auth.user.access_token)};e.spinner.show(),yield e.http.get(l+"/lab_test_type_insurance_plans",n).pipe((0,o.x)(()=>e.spinner.hide())).toPromise().then(t=>{t?.forEach(s=>{e.labTestTypeInsurancePlans.push(s)})}).catch(t=>{e.msgBox.showErrorMessage(t,"Could not load labTestType plans")})})()}saveLabTestTypeInsurancePlan(){var e=this;return(0,c.Z)(function*(){let n={headers:(new i.WM).set("Authorization","Bearer "+e.auth.user.access_token)};var t={id:e.id,labTestType:{name:e.labTestTypeName},insurancePlan:{name:e.insurancePlanName},price:e.price};null==e.id||""==e.id?(e.spinner.show(),yield e.http.post(l+"/lab_test_type_insurance_plans/save",t,n).pipe((0,o.x)(()=>e.spinner.hide())).toPromise().then(s=>{e.id=s?.id,e.msgBox.showSuccessMessage("LabTestType plan created successifully"),e.loadLabTestTypeInsurancePlans()}).catch(s=>{e.msgBox.showErrorMessage(s,"Could not create labTestType plan")})):(e.spinner.show(),yield e.http.post(l+"/lab_test_type_insurance_plans/save",t,n).pipe((0,o.x)(()=>e.spinner.hide())).toPromise().then(s=>{e.id=s?.id,e.msgBox.showSuccessMessage("LabTestType plan updated successifully"),e.loadLabTestTypeInsurancePlans()}).catch(s=>{e.msgBox.showErrorMessage(s,"Could not update labTestType plan")})),e.clear()})()}clear(){this.id=null,this.labTestTypeName="",this.insuranceProviderName="",this.insurancePlanName="",this.price=0}getLabTestTypeInsurancePlan(e){var n=this;return(0,c.Z)(function*(){if(""==e)return;let t={headers:(new i.WM).set("Authorization","Bearer "+n.auth.user.access_token)};n.spinner.show(),yield n.http.get(l+"/lab_test_type_insurance_plans/get?id="+e,t).pipe((0,o.x)(()=>n.spinner.hide())).toPromise().then(s=>{console.log(s),n.id=s?.id,n.labTestTypeName=s.labTestType.name,n.insuranceProviderName=s.insurancePlan.insuranceProvider.name,n.insurancePlanName=s.insurancePlan.name,n.price=s.price}).catch(s=>{console.log(s),n.msgBox.showErrorMessage(s,"Could not find labTestType plan")})})()}deleteLabTestTypeInsurancePlan(e){var n=this;return(0,c.Z)(function*(){if(""==e||!window.confirm("Delete this plan? Plan ID: "+e))return;let t={headers:(new i.WM).set("Authorization","Bearer "+n.auth.user.access_token)};n.spinner.show(),yield n.http.post(l+"/lab_test_type_insurance_plans/delete?id="+e,t).pipe((0,o.x)(()=>n.spinner.hide())).toPromise().then(s=>{console.log(s),n.loadLabTestTypeInsurancePlans()}).catch(s=>{console.log(s),n.msgBox.showErrorMessage(s,"Could not delete labTestType plan")})})()}loadLabTestTypeNames(){var e=this;return(0,c.Z)(function*(){e.labTestTypeNames=[];let n={headers:(new i.WM).set("Authorization","Bearer "+e.auth.user.access_token)};e.spinner.show(),yield e.http.get(l+"/lab_test_types/get_names",n).pipe((0,o.x)(()=>e.spinner.hide())).toPromise().then(t=>{t?.forEach(s=>{e.labTestTypeNames.push(s)})}).catch(t=>{e.msgBox.showErrorMessage(t,"Could not load lab_test_types")})})()}grant(e){var n=!1;return e.forEach(t=>{this.auth.checkPrivilege(t)&&(n=!0)}),n}setInsurancePlanId(e,n){localStorage.setItem("insurance_plan_id",e),localStorage.setItem("insurance_plan_name",n)}}return(p=h).\u0275fac=function(e){return new(e||p)(a.Y36(v.e),a.Y36(i.eN),a.Y36(y.FF),a.Y36(b.t2),a.Y36(E.l))},p.\u0275cmp=a.Xpm({type:p,selectors:[["app-lab-test-plan"]],standalone:!0,features:[a.jDz],decls:18,vars:1,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],[1,"text-primary"],[1,"panel-body"],[1,"col-sm-2"],["routerLink","/lab-test-type-price",1,"btn","btn-transparent","btn-primary","btn-outline","form-control",2,"border-radius","0px",3,"click"],["class","col-sm-2",4,"ngFor","ngForOf"]],template:function(e,n){1&e&&(a.TgZ(0,"section",0)(1,"div",1)(2,"h1"),a._uU(3,"Lab Test Type Plan"),a.qZA()()(),a.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"h4",7),a._uU(10,"Select Package"),a.qZA()(),a.TgZ(11,"div",8)(12,"div",4)(13,"div",3)(14,"div",9)(15,"button",10),a.NdJ("click",function(){return n.setInsurancePlanId(0,"CASH")}),a._uU(16,"CASH"),a.qZA()(),a.YNc(17,M,3,1,"div",11),a.qZA()()()()()()()),2&e&&(a.xp6(17),a.Q6J("ngForOf",n.insurancePlans))},dependencies:[m.ez,m.sg,P.u5,P.UX,T.rH]}),h})()}}]);