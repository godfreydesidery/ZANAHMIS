"use strict";(self.webpackChunkzana_hmis=self.webpackChunkzana_hmis||[]).push([[8023],{8023:(y,u,m)=>{m.r(u),m.d(u,{ItemMedicineConversionCoefficientComponent:()=>U});var a=m(5861),f=m(6814),c=m(9862),_=m(95),l=m(4716),C=m(4185),M=m(553),e=m(6689),v=m(6466),Z=m(585),T=m(379);function A(s,r){if(1&s&&(e.TgZ(0,"option",26),e._uU(1),e.qZA()),2&s){const d=r.$implicit;e.Q6J("ngValue",d),e.xp6(1),e.Oqu(d)}}function N(s,r){if(1&s&&(e.TgZ(0,"option",26),e._uU(1),e.qZA()),2&s){const d=r.$implicit;e.Q6J("ngValue",d),e.xp6(1),e.Oqu(d)}}function I(s,r){if(1&s){const d=e.EpF();e.TgZ(0,"tr")(1,"td",27),e._uU(2,"1"),e.qZA(),e.TgZ(3,"td")(4,"i"),e._uU(5),e.qZA()(),e.TgZ(6,"td"),e._uU(7),e.qZA(),e.TgZ(8,"td"),e._uU(9,"="),e.qZA(),e.TgZ(10,"td",27),e._uU(11),e.qZA(),e.TgZ(12,"td")(13,"i"),e._uU(14),e.qZA()(),e.TgZ(15,"td"),e._uU(16),e.qZA(),e.TgZ(17,"td",27)(18,"span",28),e.NdJ("click",function(){const o=e.CHM(d).$implicit,t=e.oxw();return e.KtG(t.getCoefficient(o.id))}),e._uU(19,"Edit"),e.qZA()()()}if(2&s){const d=r.$implicit;e.xp6(5),e.Oqu(d.item.code),e.xp6(2),e.Oqu(d.item.name),e.xp6(4),e.Oqu(d.coefficient),e.xp6(3),e.Oqu(d.medicine.code),e.xp6(2),e.Oqu(d.medicine.name)}}const h=M.N.apiUrl;let U=(()=>{var s;class r{constructor(i,n,o,t){this.auth=i,this.http=n,this.spinner=o,this.msgBox=t,this.itemNames=[],this.medicineNames=[],this.itemCode="",this.itemBarcode="",this.itemName="",this.itemQty=0,this.medicineCode="",this.medicineBarcode="",this.medicineName="",this.medicineQty=0,this.itemMedicineCoefficients=[],this.filterRecords=""}ngOnInit(){this.loadItemNames(),this.loadMedicineNames(),this.loadCoefficients()}loadItemNames(){var i=this;return(0,a.Z)(function*(){let n={headers:(new c.WM).set("Authorization","Bearer "+i.auth.user.access_token)};i.spinner.show(),yield i.http.get(h+"/items/get_names",n).pipe((0,l.x)(()=>i.spinner.hide())).toPromise().then(o=>{console.log(o),i.itemNames=[],o?.forEach(t=>{i.itemNames.push(t)})},o=>{console.log(o),i.msgBox.showErrorMessage(o,"Could not load item names")})})()}loadMedicineNames(){var i=this;return(0,a.Z)(function*(){i.medicineNames=[];let n={headers:(new c.WM).set("Authorization","Bearer "+i.auth.user.access_token)};i.spinner.show(),yield i.http.get(h+"/medicines/get_names",n).pipe((0,l.x)(()=>i.spinner.hide())).toPromise().then(o=>{console.log(o),o?.forEach(t=>{i.medicineNames.push(t)})}).catch(o=>{i.msgBox.showErrorMessage(o,"Could not load medicine names")})})()}searchItem(){var i=this;return(0,a.Z)(function*(){let n={headers:(new c.WM).set("Authorization","Bearer "+i.auth.user.access_token)};var o=i.itemCode,t=i.itemBarcode,g=i.itemName;""!=o&&(t="",g=""),""!=t&&(g=""),i.spinner.show(),yield i.http.get(h+"/items/search?code="+o+"&barcode="+t+"&name="+g,n).pipe((0,l.x)(()=>i.spinner.hide())).toPromise().then(p=>{i.itemId=p?.id,i.itemCode=p.code,i.itemBarcode=p.barcode,i.itemName=p.name},p=>{console.log(p),i.msgBox.showErrorMessage(p,"")})})()}searchMedicine(){var i=this;return(0,a.Z)(function*(){let n={headers:(new c.WM).set("Authorization","Bearer "+i.auth.user.access_token)};i.spinner.show(),yield i.http.get(h+"/medicines/get_by_name?name="+i.medicineName,n).pipe((0,l.x)(()=>i.spinner.hide())).toPromise().then(o=>{i.medicineId=o?.id,i.medicineCode=o.code,i.medicineName=o.name}).catch(o=>{console.log(o),i.msgBox.showErrorMessage(o,"Could not find Medicine")})})()}saveCoefficient(){var i=this;return(0,a.Z)(function*(){let n={headers:(new c.WM).set("Authorization","Bearer "+i.auth.user.access_token)};var o={id:i.id,coefficient:0,item:{name:i.itemName},medicine:{name:i.medicineName},itemQty:i.itemQty,medicineQty:i.medicineQty};i.spinner.show(),yield i.http.post(h+"/item_medicine_coefficients/save",o,n).pipe((0,l.x)(()=>i.spinner.hide())).toPromise().then(t=>{i.id=t?.id,i.itemId=t.item.id,i.itemCode=t.item.code,i.itemName=t.item.name,i.itemQty=t.itemQty,i.medicineId=t.medicine.id,i.medicineCode=t.medicine.code,i.medicineName=t.medicine.name,i.medicineQty=t.medicineQty,i.loadCoefficients()}).catch(t=>{console.log(t),i.msgBox.showErrorMessage(t,"")})})()}clear(){this.id=null,this.itemId=null,this.itemCode="",this.itemName="",this.itemQty=0,this.medicineId=null,this.medicineCode="",this.medicineName="",this.medicineQty=0}loadCoefficients(){var i=this;return(0,a.Z)(function*(){i.itemMedicineCoefficients=[];let n={headers:(new c.WM).set("Authorization","Bearer "+i.auth.user.access_token)};i.spinner.show(),yield i.http.get(h+"/item_medicine_coefficients",n).pipe((0,l.x)(()=>i.spinner.hide())).toPromise().then(o=>{o?.forEach(t=>{i.itemMedicineCoefficients.push(t)})}).catch(o=>{i.msgBox.showErrorMessage(o,"")})})()}getCoefficient(i){var n=this;return(0,a.Z)(function*(){let o={headers:(new c.WM).set("Authorization","Bearer "+n.auth.user.access_token)};n.spinner.show(),yield n.http.get(h+"/item_medicine_coefficients/get?id="+i,o).pipe((0,l.x)(()=>n.spinner.hide())).toPromise().then(t=>{n.id=t?.id,n.itemId=t.item.id,n.itemCode=t.item.code,n.itemName=t.item.name,n.itemQty=t.itemQty,n.medicineId=t.medicine.id,n.medicineCode=t.medicine.code,n.medicineName=t.medicine.name,n.medicineQty=t.medicineQty}).catch(t=>{n.msgBox.showErrorMessage(t,"")})})()}grant(i){var n=!1;return i.forEach(o=>{this.auth.checkPrivilege(o)&&(n=!0)}),n}}return(s=r).\u0275fac=function(i){return new(i||s)(e.Y36(v.e),e.Y36(c.eN),e.Y36(Z.t2),e.Y36(T.l))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-item-medicine-conversion-coefficient"]],standalone:!0,features:[e.jDz],decls:111,vars:15,consts:[[1,"content-header"],[1,"header-title"],[1,"content"],[1,"row"],[1,"col-sm-12"],[1,"panel","panel-bd","lobidrag"],[1,"panel-heading"],[1,"btn"],["type","button",1,"btn","btn-success","m-r-2","m-b-5",3,"click"],[1,"panel-body"],[1,"col-sm-6"],["type","hidden",3,"ngModel","ngModelChange"],[1,"col-sm-4"],[1,"col-sm-8"],["type","text",1,"form-control",3,"ngModel","ngModelChange"],[1,"btn","btn-primary",3,"click"],["type","text","list","itemNames",1,"form-control",3,"ngModel","ngModelChange"],["id","itemNames",2,"padding","0px"],[3,"ngValue",4,"ngFor","ngForOf"],["type","text","list","medicineNames",1,"form-control",3,"ngModel","ngModelChange"],["id","medicineNames",2,"padding","0px"],[1,"col-sm-12",2,"text-align","center"],["type","text","placeholder","Search...",1,"form-control","pull-right",2,"max-width","8cm",3,"ngModel","ngModelChange"],[1,"table","table-responsive","table-bordered","table-striped"],[2,"font-weight","bold"],[4,"ngFor","ngForOf"],[3,"ngValue"],[2,"text-align","center"],[1,"glyphicon","glyphicon-pencil",3,"click"]],template:function(i,n){1&i&&(e.TgZ(0,"section",0)(1,"div",1)(2,"h1"),e._uU(3,"Item-Medicine Conversion Coefficients"),e.qZA()()(),e.TgZ(4,"section",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"div",7)(10,"button",8),e.NdJ("click",function(){return n.clear()}),e._uU(11,"New"),e.qZA()()(),e.TgZ(12,"div",9)(13,"div",3)(14,"div",10)(15,"div",3)(16,"div",4)(17,"h3"),e._uU(18,"Item Details"),e.qZA()()(),e.TgZ(19,"div",3)(20,"input",11),e.NdJ("ngModelChange",function(t){return n.itemId=t}),e.qZA(),e.TgZ(21,"div",12)(22,"h4"),e._uU(23,"Code"),e.qZA()(),e.TgZ(24,"div",13)(25,"div",3)(26,"div",13)(27,"input",14),e.NdJ("ngModelChange",function(t){return n.itemCode=t}),e.qZA()(),e.TgZ(28,"div",12)(29,"button",15),e.NdJ("click",function(){return n.searchItem()}),e._uU(30,"Search"),e.qZA()()()()(),e.TgZ(31,"div",3)(32,"div",12)(33,"h4"),e._uU(34,"Name"),e.qZA()(),e.TgZ(35,"div",13)(36,"input",16),e.NdJ("ngModelChange",function(t){return n.itemName=t}),e.qZA(),e.TgZ(37,"datalist",17),e.YNc(38,A,2,2,"option",18),e.qZA()()(),e.TgZ(39,"div",3)(40,"div",12)(41,"h4"),e._uU(42,"Qty"),e.qZA()(),e.TgZ(43,"div",13)(44,"input",14),e.NdJ("ngModelChange",function(t){return n.itemQty=t}),e.qZA()()()(),e.TgZ(45,"div",10)(46,"div",3)(47,"div",4)(48,"h3"),e._uU(49,"Medicine Equivalent"),e.qZA()()(),e.TgZ(50,"div",3)(51,"input",11),e.NdJ("ngModelChange",function(t){return n.medicineId=t}),e.qZA(),e.TgZ(52,"div",12)(53,"h4"),e._uU(54,"Code"),e.qZA()(),e.TgZ(55,"div",13)(56,"div",3)(57,"div",13)(58,"input",14),e.NdJ("ngModelChange",function(t){return n.medicineCode=t}),e.qZA()(),e.TgZ(59,"div",12)(60,"button",15),e.NdJ("click",function(){return n.searchMedicine()}),e._uU(61,"Search"),e.qZA()()()()(),e.TgZ(62,"div",3)(63,"div",12)(64,"h4"),e._uU(65,"Name"),e.qZA()(),e.TgZ(66,"div",13)(67,"input",19),e.NdJ("ngModelChange",function(t){return n.medicineName=t}),e.qZA(),e.TgZ(68,"datalist",20),e.YNc(69,N,2,2,"option",18),e.qZA()()(),e.TgZ(70,"div",3)(71,"div",12)(72,"h4"),e._uU(73,"Qty"),e.qZA()(),e.TgZ(74,"div",13)(75,"input",14),e.NdJ("ngModelChange",function(t){return n.medicineQty=t}),e.qZA()()()()(),e.TgZ(76,"div",3),e._UZ(77,"hr"),e.TgZ(78,"div",21)(79,"button",15),e.NdJ("click",function(){return n.saveCoefficient()}),e._uU(80,"Save"),e.qZA()()(),e.TgZ(81,"div",3),e._UZ(82,"hr"),e.TgZ(83,"div",4)(84,"div",3),e._UZ(85,"div",12)(86,"div",12),e.TgZ(87,"div",12)(88,"input",22),e.NdJ("ngModelChange",function(t){return n.filterRecords=t}),e.qZA()()(),e._UZ(89,"br"),e.TgZ(90,"table",23)(91,"thead")(92,"tr",24)(93,"td"),e._uU(94,"Unit Qty"),e.qZA(),e.TgZ(95,"td"),e._uU(96,"Item Code"),e.qZA(),e.TgZ(97,"td"),e._uU(98,"Item Name"),e.qZA(),e._UZ(99,"td"),e.TgZ(100,"td"),e._uU(101,"Qty"),e.qZA(),e.TgZ(102,"td"),e._uU(103,"Medicine Code"),e.qZA(),e.TgZ(104,"td"),e._uU(105,"Medicine Name"),e.qZA(),e.TgZ(106,"td"),e._uU(107,"Action"),e.qZA()()(),e.TgZ(108,"tbody"),e.YNc(109,I,20,5,"tr",25),e.ALo(110,"searchFilter"),e.qZA()()()()()()()()()),2&i&&(e.xp6(20),e.Q6J("ngModel",n.itemId),e.xp6(7),e.Q6J("ngModel",n.itemCode),e.xp6(9),e.Q6J("ngModel",n.itemName),e.xp6(2),e.Q6J("ngForOf",n.itemNames),e.xp6(6),e.Q6J("ngModel",n.itemQty),e.xp6(7),e.Q6J("ngModel",n.medicineId),e.xp6(7),e.Q6J("ngModel",n.medicineCode),e.xp6(9),e.Q6J("ngModel",n.medicineName),e.xp6(2),e.Q6J("ngForOf",n.medicineNames),e.xp6(6),e.Q6J("ngModel",n.medicineQty),e.xp6(13),e.Q6J("ngModel",n.filterRecords),e.xp6(21),e.Q6J("ngForOf",e.xi3(110,12,n.itemMedicineCoefficients,n.filterRecords)))},dependencies:[f.ez,f.sg,_.u5,_.YN,_.Kr,_.Fj,_.JJ,_.On,_.UX,C.G]}),r})()}}]);