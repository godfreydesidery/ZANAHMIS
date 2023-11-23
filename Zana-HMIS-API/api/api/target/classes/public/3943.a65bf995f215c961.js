"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[3943],{3943:(Z,s,t)=>{t.r(s),t.d(s,{PatientHistoryMenuComponent:()=>P});var c=t(5861),l=t(6814),_=t(95),m=t(8237),n=(t(553),t(6689)),g=t(6466),p=t(9862),h=t(585),y=t(379);function b(o,r){1&o&&(n.TgZ(0,"a",17),n._UZ(1,"i",18),n._uU(2," Back"),n.qZA())}function E(o,r){1&o&&(n.TgZ(0,"a",19),n._UZ(1,"i",18),n._uU(2," Back"),n.qZA())}let P=(()=>{var o;class r{constructor(i,a,e,M){this.auth=i,this.http=a,this.spinner=e,this.msgBox=M,this.filterRecords="",this.consultationId=null,this.admissionId=null}ngOnInit(){var i=this;return(0,c.Z)(function*(){i.consultationId=localStorage.getItem("consultation-id"),i.admissionId=localStorage.getItem("admission-id")})()}grant(i){var a=!1;return i.forEach(e=>{this.auth.checkPrivilege(e)&&(a=!0)}),a}}return(o=r).\u0275fac=function(i){return new(i||o)(n.Y36(g.e),n.Y36(p.eN),n.Y36(h.t2),n.Y36(y.l))},o.\u0275cmp=n.Xpm({type:o,selectors:[["app-patient-history-menu"]],standalone:!0,features:[n.jDz],decls:26,vars:2,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],["class","btn btn-primary btn-outline","routerLink","/doctor-cracking",4,"ngIf"],["class","btn btn-primary btn-outline","routerLink","/doctor-inpatient",4,"ngIf"],["routerLink","/clinical-note-history",1,"btn","btn-primary","btn-outline"],["routerLink","/general-examination-history",1,"btn","btn-primary","btn-outline"],["routerLink","/final-diagnosis-history",1,"btn","btn-primary","btn-outline"],["routerLink","/lab-test-history",1,"btn","btn-primary","btn-outline"],["routerLink","/radiology-history",1,"btn","btn-primary","btn-outline"],["routerLink","/procedure-history",1,"btn","btn-primary","btn-outline"],["routerLink","/prescription-history",1,"btn","btn-primary","btn-outline"],[1,"panel-body"],["routerLink","/doctor-cracking",1,"btn","btn-primary","btn-outline"],[1,"glyphicon","glyphicon-triangle-left"],["routerLink","/doctor-inpatient",1,"btn","btn-primary","btn-outline"]],template:function(i,a){1&i&&(n.TgZ(0,"section",0)(1,"div",1)(2,"h1"),n._uU(3,"Patient History"),n.qZA()()(),n.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6),n.YNc(9,b,3,0,"a",7),n.YNc(10,E,3,0,"a",8),n.TgZ(11,"a",9),n._uU(12,"Clinical Notes"),n.qZA(),n.TgZ(13,"a",10),n._uU(14,"General Examination"),n.qZA(),n.TgZ(15,"a",11),n._uU(16,"Final Diagnosis"),n.qZA(),n.TgZ(17,"a",12),n._uU(18,"Lab Tests"),n.qZA(),n.TgZ(19,"a",13),n._uU(20,"Radiology Tests"),n.qZA(),n.TgZ(21,"a",14),n._uU(22,"Procedures"),n.qZA(),n.TgZ(23,"a",15),n._uU(24,"Medications"),n.qZA()(),n._UZ(25,"div",16),n.qZA()()()()),2&i&&(n.xp6(9),n.Q6J("ngIf",null!=a.consultationId),n.xp6(1),n.Q6J("ngIf",null!=a.admissionId))},dependencies:[l.ez,l.O5,_.u5,_.UX,m.rH]}),r})()}}]);