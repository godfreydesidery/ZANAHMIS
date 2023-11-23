"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[8249],{8249:(M,d,a)=>{a.r(d),a.d(d,{PatientListComponent:()=>T});var h=a(5861),p=a(6814),c=a(9862),_=a(95),u=a(8237),g=a(4716),m=a(4185),E=a(553),t=a(6689),P=a(6466),v=a(1581),f=a(585);function L(r,l){if(1&r&&(t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.qZA()()),2&r){const i=l.$implicit;t.xp6(2),t.Oqu(i.no),t.xp6(2),t.Oqu(i.firstName+" "+i.middleName+" "+i.lastName),t.xp6(2),t.Oqu(i.gender),t.xp6(2),t.Oqu(i.dateOfBirth)}}const O=E.N.apiUrl;let T=(()=>{var r;class l{constructor(e,n,o,s){this.auth=e,this.http=n,this.modalService=o,this.spinner=s,this.patients=[],this.patientsToShow=[],this.filterValue="",this.filterRecords=""}ngOnInit(){this.loadPatients()}loadPatients(){var e=this;return(0,h.Z)(function*(){let n={headers:(new c.WM).set("Authorization","Bearer "+e.auth.user.access_token)};e.patients=[],e.spinner.show(),yield e.http.get(O+"/patients",n).pipe((0,g.x)(()=>e.spinner.hide())).toPromise().then(o=>{o?.forEach(s=>{console.log(s),e.patients.push(s)})}).catch(o=>{console.log(o),alert("Could not load patients")})})()}applyFilter(e){var n=this;return(0,h.Z)(function*(){let o=e.toLowerCase();""===e?n.patientsToShow=n.patients:(n.patientsToShow=[],n.patients.forEach(s=>{(s.no.toLocaleLowerCase().includes(o)||s.firstName.toLocaleLowerCase().includes(o)||s.middleName.toLocaleLowerCase().includes(o)||s.lastName.toLocaleLowerCase().includes(o))&&n.patientsToShow.push(s)}))})()}grant(e){var n=!1;return e.forEach(o=>{this.auth.checkPrivilege(o)&&(n=!0)}),n}}return(r=l).\u0275fac=function(e){return new(e||r)(t.Y36(P.e),t.Y36(c.eN),t.Y36(v.FF),t.Y36(f.t2))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-patient-list"]],standalone:!0,features:[t.jDz],decls:34,vars:5,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],[1,"btn"],["routerLink","/patient-register",1,"btn","btn-primary"],[1,"panel-body"],[1,"col-sm-4"],["type","text","placeholder","Search...",1,"form-control","pull-right",2,"max-width","8cm",3,"ngModel","ngModelChange"],[1,"table-responsive"],[1,"table","table-bordered","table-hover"],[1,"success"],[4,"ngFor","ngForOf"]],template:function(e,n){1&e&&(t.TgZ(0,"section",0)(1,"div",1)(2,"h1"),t._uU(3,"Patient List"),t.qZA()()(),t.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"div",7)(10,"a",8),t._uU(11,"Add Patient"),t.qZA()()(),t.TgZ(12,"div",9)(13,"div",3),t._UZ(14,"div",10)(15,"div",10),t.TgZ(16,"div",10)(17,"input",11),t.NdJ("ngModelChange",function(s){return n.filterRecords=s}),t.qZA()()(),t._UZ(18,"br"),t.TgZ(19,"div",12)(20,"table",13)(21,"thead",14)(22,"tr")(23,"th"),t._uU(24,"File No"),t.qZA(),t.TgZ(25,"th"),t._uU(26,"Name"),t.qZA(),t.TgZ(27,"th"),t._uU(28,"Sex"),t.qZA(),t.TgZ(29,"th"),t._uU(30,"Date of Birth"),t.qZA()()(),t.TgZ(31,"tbody"),t.YNc(32,L,9,4,"tr",15),t.ALo(33,"searchFilter"),t.qZA()()()()()()()()),2&e&&(t.xp6(17),t.Q6J("ngModel",n.filterRecords),t.xp6(15),t.Q6J("ngForOf",t.xi3(33,2,n.patients,n.filterRecords)))},dependencies:[p.ez,p.sg,_.u5,_.Fj,_.JJ,_.On,_.UX,m.G,u.rH]}),l})()}}]);