"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[9432],{9432:(L,C,l)=>{l.r(C),l.d(C,{PatientResultsComponent:()=>D});var _=l(5861),g=l(6814),p=l(9862),u=l(95),T=l(4716),M=l(553),P=l(7069),t=l(6689),x=l(6466),Z=l(585),b=l(379),E=l(7857),A=l(2848);function R(r,d){if(1&r){const s=t.EpF();t.TgZ(0,"button",15),t.NdJ("click",function(){t.CHM(s);const e=t.oxw();return t.KtG(e.print())}),t._UZ(1,"i",16),t._uU(2," Print"),t.qZA()}}function S(r,d){if(1&r){const s=t.EpF();t.TgZ(0,"option",19),t.NdJ("click",function(){const o=t.CHM(s).$implicit,n=t.oxw(2);return t.KtG(n.getPatient(o.id))}),t.TgZ(1,"b"),t._uU(2),t.qZA(),t._uU(3," FileNo: "),t.TgZ(4,"b"),t._uU(5),t.qZA()()}if(2&r){const s=d.$implicit;t.xp6(2),t.lnq("",s.firstName," ",s.middleName," ",s.lastName," | "),t.xp6(3),t.Oqu(s.no)}}function k(r,d){if(1&r&&(t.TgZ(0,"div",3)(1,"div",4)(2,"select",17),t.YNc(3,S,6,4,"option",18),t.qZA()()()),2&r){const s=t.oxw();t.xp6(3),t.Q6J("ngForOf",s.patients)}}function U(r,d){if(1&r){const s=t.EpF();t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.qZA(),t.TgZ(9,"td"),t._uU(10),t.qZA(),t.TgZ(11,"td"),t._uU(12),t.qZA(),t.TgZ(13,"td")(14,"input",26),t.NdJ("ngModelChange",function(e){const n=t.CHM(s).$implicit;return t.KtG(n.checked=e)})("click",function(){const o=t.CHM(s).$implicit,n=t.oxw(2);return t.KtG(n.check(o.id))}),t.qZA()()()}if(2&r){const s=d.$implicit;t.xp6(2),t.Oqu(null==s||null==s.labTestType?null:s.labTestType.name),t.xp6(2),t.Oqu(null==s?null:s.result),t.xp6(2),t.Oqu(null==s?null:s.range),t.xp6(2),t.Oqu(null==s?null:s.level),t.xp6(2),t.Oqu(null==s?null:s.unit),t.xp6(2),t.Oqu(null==s?null:s.verified),t.xp6(2),t.Q6J("ngModel",s.checked)}}function O(r,d){if(1&r){const s=t.EpF();t.TgZ(0,"div",3),t._UZ(1,"hr"),t.TgZ(2,"div",4)(3,"div",3)(4,"div",20)(5,"h4"),t._uU(6,"From"),t.qZA(),t.TgZ(7,"input",21),t.NdJ("ngModelChange",function(e){t.CHM(s);const o=t.oxw();return t.KtG(o.from=e)}),t.qZA()(),t.TgZ(8,"div",20)(9,"h4"),t._uU(10,"To"),t.qZA(),t.TgZ(11,"input",21),t.NdJ("ngModelChange",function(e){t.CHM(s);const o=t.oxw();return t.KtG(o.to=e)}),t.qZA()(),t.TgZ(12,"div",20),t._UZ(13,"br")(14,"br"),t.TgZ(15,"button",22),t.NdJ("click",function(){t.CHM(s);const e=t.oxw();return t.KtG(e.loadLabTestsByDate(e.from,e.to))}),t._uU(16,"Run Report"),t.qZA()()()(),t.TgZ(17,"div",4),t._UZ(18,"hr"),t.TgZ(19,"table",23)(20,"thead")(21,"tr",24)(22,"td"),t._uU(23,"Test"),t.qZA(),t.TgZ(24,"td"),t._uU(25,"Results"),t.qZA(),t.TgZ(26,"td"),t._uU(27,"Range"),t.qZA(),t.TgZ(28,"td"),t._uU(29,"Level"),t.qZA(),t.TgZ(30,"td"),t._uU(31,"Unit"),t.qZA(),t.TgZ(32,"td"),t._uU(33,"Verified"),t.qZA(),t.TgZ(34,"td"),t._uU(35,"Check to Print"),t.qZA()()(),t.TgZ(36,"tbody"),t.YNc(37,U,15,7,"tr",25),t.qZA()()()()}if(2&r){const s=t.oxw();t.xp6(7),t.Q6J("ngModel",s.from),t.xp6(4),t.Q6J("ngModel",s.to),t.xp6(26),t.Q6J("ngForOf",s.labTests)}}var K=l(6236);l(217);const f=M.N.apiUrl;let D=(()=>{var r;class d{constructor(i,e,o,n,m,a){var h=this;this.auth=i,this.http=e,this.spinner=o,this.msgBox=n,this.printer=m,this.data=a,this.searchKey="",this.id=null,this.no="",this.firstName="",this.middleName="",this.lastName="",this.patientType="",this.gender="",this.paymentType="",this.memberShipNo="",this.phoneNo="",this.address="",this.email="",this.nationality="",this.nationalId="",this.passportNo="",this.kinFullName="",this.kinRelationship="",this.kinPhoneNo="",this.patientRecordMode="",this.insurancePlan="",this.registrationFee=0,this.registrationFeeStatus="",this.cardValidationStatus="",this.registrationAmount=0,this.consultationAmount=0,this.total=0,this.amountReceived=0,this.lockSearchKey=!1,this.filterRecords="",this.labTests=[],this.searchKeysToDisplay=[],this.searchKeys=[],this.patientId=null,this.patientNo="",this.patientFirstName="",this.patientMiddleName="",this.patientLastName="",this.patientPhoneNo="",this.patients=[],this.labTestsToPrint=[],this.print=(0,_.Z)(function*(){if(0===h.labTestsToPrint.length)return void h.msgBox.showErrorMessage3("No data to print. Please check items to print");h.documentHeader=yield h.data.getDocumentHeader();var y=[[{text:"SN",fontSize:9,fillColor:"#bdc6c7"},{text:"Test",fontSize:9,fillColor:"#bdc6c7"},{text:"Result",fontSize:9,fillColor:"#bdc6c7"},{text:"Range",fontSize:9,fillColor:"#bdc6c7"},{text:"Level",fontSize:9,fillColor:"#bdc6c7"},{text:"Unit",fontSize:9,fillColor:"#bdc6c7"},{text:"Verified",fontSize:9,fillColor:"#bdc6c7"}]],v=1;h.labTestsToPrint.forEach(c=>{c.sn=v,v+=1}),h.labTestsToPrint.forEach(c=>{var N=[{text:c?.sn.toString(),fontSize:9,fillColor:"#ffffff"},{text:c?.labTestType?.name,fontSize:9,fillColor:"#ffffff"},{text:c?.result,fontSize:9,fillColor:"#ffffff"},{text:c?.range,fontSize:9,fillColor:"#ffffff"},{text:c?.level,fontSize:9,fillColor:"#ffffff"},{text:c?.unit,fontSize:9,fillColor:"#ffffff"},{text:c?.verified,fontSize:9,fillColor:"#ffffff"}];y.push(N)});const z={header:"",footer:function(c,N){return c.toString()+" of "+N},content:[{columns:[h.documentHeader]},"  ",{text:"Patient Lab Test Results",fontSize:14,bold:!0,alignment:"center"},h.data.getHorizontalLine(),{text:"Name: "+h.firstName.toString()+" "+h.middleName?.toString()+" "+h.lastName?.toString(),fontSize:9},{text:"File No: "+h.no.toString(),fontSize:9},{text:"Date of Birth: "+(0,g.p6)(h.dateOfBirth,"yyyy-MM-dd","en-US"),fontSize:9},{text:"Mobile: "+h.phoneNo.toString(),fontSize:9}," ",{layout:"noBorders",table:{widths:[80,80],body:[[{text:"From: "+h.from.toString(),fontSize:9},{text:"To: "+h.to.toString(),fontSize:9}]]}},"  ",{table:{headerRows:1,widths:[20,100,80,50,50,50,100],body:y}}," ","Printed By",localStorage.getItem("user-name")," "," ","..................................................."]};P.createPdf(z).print()}),window.pdfMake.vfs=K.pdfMake.vfs}ngOnInit(){}loadSearchKeys(){var i=this;return(0,_.Z)(function*(){let e={headers:(new p.WM).set("Authorization","Bearer "+i.auth.user.access_token)};i.spinner.show(),yield i.http.get(f+"/patients/get_all_search_keys",e).pipe((0,T.x)(()=>i.spinner.hide())).toPromise().then(o=>{console.log(o),i.searchKeys=[],o?.forEach(n=>{i.searchKeys.push(n)})},o=>{console.log(o),i.msgBox.showErrorMessage(o,"Could not load patients")})})()}filterSearchKeys(i){this.searchKeysToDisplay=[],!(i.length<4)&&this.searchKeys.forEach(e=>{var o=e.toLowerCase(),n=i.toLowerCase();o.includes(n)&&this.searchKeysToDisplay.push(e)})}searchBySearchKey(i){var e=this;return(0,_.Z)(function*(){var o="";e.registrationAmount=0,e.consultationAmount=0;for(var n=0;n<e.searchKeys.length;n++)if(e.searchKeys[n]===i){o=i;break}if(0===o.length)return;let m={headers:(new p.WM).set("Authorization","Bearer "+e.auth.user.access_token)};e.spinner.show(),yield e.http.get(f+"/patients/get_by_search_key?search_key="+o,m).pipe((0,T.x)(()=>e.spinner.hide())).toPromise().then(a=>{e.searchKey=i,e.id=a.id,e.no=a.no,e.firstName=a.firstName,e.middleName=a.middleName,e.lastName=a.lastName,e.dateOfBirth=a.dateOfBirth,e.phoneNo=a.phoneNo,e.address=a.address,e.lockSearchKey=!0,e.total=0}).catch(a=>{console.log(a),e.clear(),e.msgBox.showErrorMessage(a,"Could not find patient")})})()}clear(){this.id=null,this.no="",this.firstName="",this.middleName="",this.lastName="",this.gender="",this.paymentType="",this.memberShipNo="",this.phoneNo="",this.address="",this.email="",this.nationality="",this.nationalId="",this.passportNo="",this.kinFullName="",this.kinRelationship="",this.kinPhoneNo="",this.amountReceived=0,this.total=0,this.lockSearchKey=!1,this.patients=[]}reset(){this.searchKey="",this.clear(),this.labTests=[],this.labTestsToPrint=[]}grant(i){var e=!1;return i.forEach(o=>{this.auth.checkPrivilege(o)&&(e=!0)}),e}loadPatientsLike(i){var e=this;return(0,_.Z)(function*(){if(e.patients=[],i.length<3)return;let o={headers:(new p.WM).set("Authorization","Bearer "+e.auth.user.access_token)};yield e.http.get(f+"/patients/load_patients_like?name_like="+i,o).toPromise().then(n=>{console.log(n),e.patients=n}).catch(n=>{e.msgBox.showErrorMessage(n,"")})})()}getPatient(i){var e=this;return(0,_.Z)(function*(){let o={headers:(new p.WM).set("Authorization","Bearer "+e.auth.user.access_token)};e.patients=[],e.spinner.show(),yield e.http.get(f+"/patients/get?id="+i,o).pipe((0,T.x)(()=>e.spinner.hide())).toPromise().then(n=>{e.patientId=n?.id,e.patientNo=n.no,e.patientFirstName=n.firstName,e.patientMiddleName=n.middleName,e.patientLastName=n.lastName,e.patientPhoneNo=n.phoneNo,e.searchKey="Name: "+e.patientFirstName+" "+e.patientMiddleName+" "+e.patientLastName+" File No: "+e.patientNo,e.id=n.id,e.no=n.no,e.firstName=n.firstName,e.middleName=n.middleName,e.lastName=n.lastName,e.gender=n.gender,e.dateOfBirth=n.dateOfBirth,e.paymentType=n.paymentType,e.phoneNo=n.phoneNo,e.address=n.address,e.email=n.email,e.nationality=n.nationality,e.nationalId=n.nationalId,e.passportNo=n.passportNo,e.kinFullName=n.kinFullName,e.kinRelationship=n.kinRelationship,e.kinPhoneNo=n.kinPhoneNo,e.lockSearchKey=!0,e.total=0}).catch(n=>{e.clear(),e.msgBox.showErrorMessage(n,""),console.log(n)})})()}loadLabTestsByDate(i,e){var o=this;return(0,_.Z)(function*(){let n={headers:(new p.WM).set("Authorization","Bearer "+o.auth.user.access_token)};if(void 0!==i&&void 0!==e)if(i>e)o.msgBox.showErrorMessage3("Could not run. Start date must be earlier or equal to end date");else{var m={patient:{id:o.patientId},from:i,to:e};o.spinner.show(),yield o.http.post(f+"/reports/get_lab_tests_by_date",m,n).pipe((0,T.x)(()=>o.spinner.hide())).toPromise().then(a=>{console.log(a),o.labTests=a}).catch(a=>{console.log(a),o.msgBox.showErrorMessage(a,"")})}else o.msgBox.showErrorMessage3("Could not run. Please select date range")})()}check(i){this.labTests.forEach(e=>{e.id===i&&(e.checked=!0!==e.checked)}),this.labTestsToPrint=[],this.labTests.forEach(e=>{!0===e.checked&&this.labTestsToPrint.push(e)})}getAmount(i){return"COVERED"===i.status?"Covered":i.amount.toLocaleString("en-US",{minimumFractionDigits:2})}getBillTo(i){return"COVERED"===i.status?i?.insurancePlan?.name:"Client"}getTotal(i){return 0===i?"Covered":i.toLocaleString("en-US",{minimumFractionDigits:2})}}return(r=d).\u0275fac=function(i){return new(i||r)(t.Y36(x.e),t.Y36(p.eN),t.Y36(Z.t2),t.Y36(b.l),t.Y36(E.r),t.Y36(A.D))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-patient-results"]],standalone:!0,features:[t.jDz],decls:28,vars:5,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],["type","button","class","btn btn-success btn-outline",3,"click",4,"ngIf"],[1,"panel-body"],[1,"col-xs-8"],[1,"text-primary"],["type","text","placeholder","Search...",1,"form-control",2,"max-width","15cm",3,"ngModel","readonly","ngModelChange"],["class","row",4,"ngIf"],[1,"col-xs-4"],[1,"btn","btn-deafult","btn-outline",3,"click"],["type","button",1,"btn","btn-success","btn-outline",3,"click"],[1,"fa","fa-print"],["multiple","multiple",1,"form-control",2,"max-width","15cm"],["style","height: 1cm; cursor: pointer; font-size: large;",3,"click",4,"ngFor","ngForOf"],[2,"height","1cm","cursor","pointer","font-size","large",3,"click"],[1,"col-sm-3"],["type","date",1,"form-control",3,"ngModel","ngModelChange"],[1,"btn","btn-primary",3,"click"],[1,"table","table-responsive","table-striped","table-small"],[2,"font-weight","bold"],[4,"ngFor","ngForOf"],["type","checkbox",3,"ngModel","ngModelChange","click"]],template:function(i,e){1&i&&(t.TgZ(0,"section",0)(1,"div",1)(2,"h1"),t._uU(3,"Patient Results"),t.qZA()()(),t.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6),t.YNc(9,R,3,0,"button",7),t.qZA(),t.TgZ(10,"div",8)(11,"div",3)(12,"div",4)(13,"div",3)(14,"div",4)(15,"div",3)(16,"div",9)(17,"h4",10)(18,"b"),t._uU(19,"Search Patient(Enter 3 characters)Name, File No or Phone"),t.qZA()(),t.TgZ(20,"input",11),t.NdJ("ngModelChange",function(n){return e.searchKey=n})("ngModelChange",function(n){return e.loadPatientsLike(n)}),t.qZA(),t.YNc(21,k,4,1,"div",12),t.qZA(),t.TgZ(22,"div",13),t._UZ(23,"br")(24,"br"),t.TgZ(25,"button",14),t.NdJ("click",function(){return e.reset()}),t._uU(26,"Reset"),t.qZA()()()()()()(),t.YNc(27,O,38,3,"div",12),t.qZA()()()()()),2&i&&(t.xp6(9),t.Q6J("ngIf",e.labTestsToPrint.length>0),t.xp6(11),t.Q6J("ngModel",e.searchKey)("readonly",e.lockSearchKey),t.xp6(1),t.Q6J("ngIf",!1===e.lockSearchKey&&e.patients.length>0),t.xp6(6),t.Q6J("ngIf",null!=e.id))},dependencies:[g.ez,g.sg,g.O5,u.u5,u.YN,u.Kr,u.Fj,u.Wl,u.JJ,u.On,u.UX]}),d})()}}]);