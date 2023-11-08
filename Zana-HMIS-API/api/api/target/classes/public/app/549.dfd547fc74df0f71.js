"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[549],{549:(y,f,a)=>{a.r(f),a.d(f,{AccessForm:()=>A,AccessManagementComponent:()=>C,PrivilegeForm:()=>Z});var m=a(5861),p=a(9862),d=a(4716),M=a(553),v=a(6814),g=a(95),e=a(6689),b=a(6466),P=a(585);function O(n,c){if(1&n&&(e.TgZ(0,"option"),e._uU(1),e.qZA()),2&n){const l=c.$implicit;e.xp6(1),e.Oqu(l)}}function T(n,c){if(1&n){const l=e.EpF();e.TgZ(0,"button",19)(1,"input",20),e.NdJ("change",function(s){const i=e.CHM(l).$implicit,r=e.oxw().$implicit,h=e.oxw();return e.KtG(h.addOrRemovePrivilege(s,r.object,i))}),e.qZA(),e.TgZ(2,"label"),e._uU(3),e.qZA()()}if(2&n){const l=c.$implicit,t=e.oxw().$implicit,s=e.oxw();e.xp6(1),e.Q6J("checked",s.privilegeChecked(t.object,l)),e.xp6(2),e.Oqu(l)}}function E(n,c){if(1&n&&(e.TgZ(0,"tr")(1,"td",17),e._uU(2),e.qZA(),e.TgZ(3,"td",17),e.YNc(4,T,4,2,"button",18),e.qZA()()),2&n){const l=c.$implicit;e.xp6(2),e.Oqu(l.object),e.xp6(2),e.Q6J("ngForOf",l.operations)}}function U(n,c){if(1&n&&(e.TgZ(0,"tr")(1,"td"),e._uU(2),e.ALo(3,"json"),e.qZA(),e.TgZ(4,"td"),e._uU(5),e.ALo(6,"json"),e.qZA()()),2&n){const l=c.$implicit;e.xp6(2),e.Oqu(e.lcZ(3,2,l.key)),e.xp6(3),e.Oqu(e.lcZ(6,4,l.value))}}const _=M.N.apiUrl;let C=(()=>{var n;class c{constructor(t,s,o){this.http=t,this.auth=s,this.spinner=o,this.keys=[],this.objectKeys=Object.keys,this.privModels=[],this.object="",this.operation="",this.objects=[],this.operations=[],this.roles=[],this.privileges={},this.selectedRole="",this.selectedRoleMessage=""}ngOnInit(){this.getRoles(),this.loadPrivModel()}getAllObjects(){var t=this;return(0,m.Z)(function*(){t.objects=[],t.privileges={};let s={headers:(new p.WM).set("Authorization","Bearer "+t.auth.user.access_token)};t.spinner.show(),yield t.http.get(_+"/objects",s).pipe((0,d.x)(()=>t.spinner.hide())).toPromise().then(o=>{o?.forEach(i=>{t.privileges[i]=[],t.objects.push(i)})}).catch(o=>{console.log(o)})})()}getAllOperations(){var t=this;return(0,m.Z)(function*(){let s={headers:(new p.WM).set("Authorization","Bearer "+t.auth.user.access_token)};t.spinner.show(),yield t.http.get(_+"/operations",s).pipe((0,d.x)(()=>t.spinner.hide())).toPromise().then(o=>{o?.forEach(i=>{t.operations.push(i)})}).catch(o=>{console.log(o)})})()}getRoles(){var t=this;return(0,m.Z)(function*(){let s={headers:(new p.WM).set("Authorization","Bearer "+t.auth.user.access_token)};t.spinner.show(),yield t.http.get(_+"/roles",s).pipe((0,d.x)(()=>t.spinner.hide())).toPromise().then(o=>{o?.forEach(i=>{t.roles.push(i.name)})}).catch(o=>{console.log(o)})})()}selectRole(t){""!=t?(this.selectedRole=t,this.selectedRoleMessage="Update priviledges for "+t,this.loadPrivileges(t)):(this.selectedRole="",this.selectedRoleMessage="Please select a Role to update")}loadPrivileges(t){var s=this;return(0,m.Z)(function*(){s.getAllObjects();let o={headers:(new p.WM).set("Authorization","Bearer "+s.auth.user.access_token)};s.spinner.show(),yield s.http.get(_+"/privileges?role="+t,o).pipe((0,d.x)(()=>s.spinner.hide())).toPromise().then(i=>{i?.forEach(r=>{s.addPrivilege(r.object,r.operation)})}).catch(i=>{console.log(i)})})()}addOrRemovePrivilege(t,s,o){""!=this.selectedRole?1==t.target.checked?this.addPrivilege(s,o):0==t.target.checked&&this.removePrivilege(s,o):alert("Please select role")}clearPrivileges(){this.privileges={}}addPrivilege(t,s){for(const[o,i]of Object.entries(this.privileges))if(o==t){let r=!1;0==i.length&&(i.push(s),r=!0),i.forEach(h=>{h==s&&(r=!0)}),0==r&&i.push(s)}}removePrivilege(t,s){for(const[i,r]of Object.entries(this.privileges))i==t&&r.forEach(h=>{h!=s||r.splice(-1,1)})}privilegeChecked(t,s){var o=!1;for(const[i]of Object.entries(this.privileges))i===t&&this.privileges[i].forEach(r=>{r===s&&(o=!0)});return o}addPrivilegeToRole(t){var s=this;return(0,m.Z)(function*(){if(null==t||""==t)return void alert("Please select Role");var o=new A;o.role=t;var i=s.privileges,r=new Array;for(const[u]of Object.entries(i)){var h=new Z;h.object=u,h.operations=s.privileges[u],r.push(h)}o.privileges=r,console.log(o);let R={headers:(new p.WM).set("Authorization","Bearer "+s.auth.user.access_token)};s.spinner.show(),yield s.http.post(_+"/privileges/addtorole",o,R).pipe((0,d.x)(()=>s.spinner.hide())).toPromise().then(u=>{console.log(u),alert("Updated successifully")}).catch(u=>{console.log(u),alert("Could not update role")})})()}grant(t){var s=!1;return t.forEach(o=>{this.auth.checkPrivilege(o)&&(s=!0)}),s}loadPrivModel(){let t={headers:(new p.WM).set("Authorization","Bearer "+this.auth.user.access_token)};return this.spinner.show(),this.http.get(_+"/load_privilege_model",t).pipe((0,d.x)(()=>this.spinner.hide())).toPromise().then(s=>{this.privModels=s}).catch(s=>{console.log(s)}),!1}}return(n=c).\u0275fac=function(t){return new(t||n)(e.Y36(p.eN),e.Y36(b.e),e.Y36(P.t2))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-access-management"]],standalone:!0,features:[e.jDz],decls:57,vars:7,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],[1,"panel-body"],[2,"width","100%"],[2,"vertical-align","top","height","75vh"],[1,"container-fluid"],[1,"form-control",3,"ngModel","ngModelChange"],[4,"ngFor","ngForOf"],[1,"table","table-bordered"],[1,"table"],[1,"btn","btn-success",3,"click"],[1,"table","table-bordered","table-striped","table-sm"],[2,"vertical-align","top"],["class","btn btn-light","style","margin-left: 1mm; margin-right: 1mm;",4,"ngFor","ngForOf"],[1,"btn","btn-light",2,"margin-left","1mm","margin-right","1mm"],["type","checkbox",2,"height","5mm","width","5mm",3,"checked","change"]],template:function(t,s){1&t&&(e.TgZ(0,"section",0)(1,"div",1)(2,"h1"),e._uU(3,"Access Management"),e.qZA()()(),e.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5),e._UZ(8,"div",6),e.TgZ(9,"div",7)(10,"div",4)(11,"table",8)(12,"tr",8)(13,"td",9)(14,"div",10)(15,"div",3)(16,"div",4)(17,"div")(18,"label"),e._uU(19,"Select Role:"),e.qZA(),e._UZ(20,"br"),e.TgZ(21,"select",11),e.NdJ("ngModelChange",function(i){return s.selectRole(i)}),e._UZ(22,"option"),e.YNc(23,O,2,1,"option",12),e.qZA()(),e._UZ(24,"br"),e.TgZ(25,"label"),e._uU(26),e.qZA(),e._UZ(27,"br"),e.TgZ(28,"table",13)(29,"thead")(30,"tr")(31,"td"),e._uU(32,"Item"),e.qZA(),e.TgZ(33,"td"),e._uU(34,"Priviledges"),e.qZA()()(),e.TgZ(35,"tbody"),e.YNc(36,E,5,2,"tr",12),e.qZA()(),e.TgZ(37,"table",14)(38,"tbody")(39,"tr")(40,"td")(41,"button",15),e.NdJ("click",function(){return s.addPrivilegeToRole(s.selectedRole)}),e._uU(42,"Save"),e.qZA()()()()(),e.TgZ(43,"div")(44,"label"),e._uU(45,"Access Summary"),e.qZA(),e._UZ(46,"br"),e.TgZ(47,"table",16)(48,"thead")(49,"tr")(50,"td"),e._uU(51,"Role"),e.qZA(),e.TgZ(52,"td"),e._uU(53,"Privileges"),e.qZA()()(),e.TgZ(54,"tbody"),e.YNc(55,U,7,6,"tr",12),e.ALo(56,"keyvalue"),e.qZA()()()()()()()()()()()()()()()),2&t&&(e.xp6(21),e.Q6J("ngModel",s.selectedRole),e.xp6(2),e.Q6J("ngForOf",s.roles),e.xp6(3),e.Oqu(s.selectedRoleMessage),e.xp6(10),e.Q6J("ngForOf",s.privModels),e.xp6(19),e.Q6J("ngForOf",e.lcZ(56,5,s.privileges)))},dependencies:[v.ez,v.sg,v.Ts,v.Nd,g.u5,g.YN,g.Kr,g.EJ,g.JJ,g.On,g.UX]}),c})();class A{constructor(){this.role="",this.privileges=new Array}}class Z{constructor(){this.object="",this.operations=[]}}}}]);