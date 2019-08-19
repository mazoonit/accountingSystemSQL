//ajax shortcut
function ajaxRequest(path,requestType,contentType,request,callback){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4) {
			callback(this);
			}
	}
	xhr.open(requestType,path, true);
	xhr.setRequestHeader("Content-type",contentType);
	if(contentType=="application/json"){xhr.send(JSON.stringify(request));}
	else{xhr.send(request);}
	}
function ajaxPromise(path,requestType,contentType,request){
	return new Promise(function(resolve,reject){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState==4) {
				resolve(this);
			}
		}
		xhr.open(requestType,path, true);
		xhr.setRequestHeader("Content-type",contentType);
		if(contentType=="application/json"){xhr.send(JSON.stringify(request));}
		else{xhr.send(request);}
		});
}
//get account things
function getAccount(event){
	var accountBetterID=event.target.value;
	var accountInputId=event.target.id;
	var majorAccount=document.getElementById(accountInputId+"Div");
	ajaxRequest('api/account/frontGet',"POST","application/json",{id:accountBetterID},(res)=>{
		if(res.status=="200"){
			res=JSON.parse(res.responseText);
			majorAccount.value=res.name;
		}
		else{
			majorAccount.value="There's no such account!";
		}
	});
	return false;
}
function getCashAccount(event){
	var cashAccountBetterID=event.target.value;
	var cashAccountInputId=event.target.id;
	var cashAccountDiv=document.getElementById(cashAccountInputId+"Div");
	ajaxRequest('api/account/frontGet',"POST","application/json",{id:cashAccountBetterID},(res)=>{
		if(res.status=="200"){
			res=JSON.parse(res.responseText);
			if(res.character=="cash"){
				cashAccountDiv.value=res.name;}
			else{
				cashAccountDiv.value="There's no such cash account!";}
		}
		else{
			console.log(res.responseText);
			cashAccountDiv.value="There's no such cash account!";
		}
	});
	return false;
}
function getBSPAccount(event){
	var supplierAccountBetterID=event.target.value;
	var supplierAccountInputId=event.target.id;
	var supplierAccountDiv=document.getElementById(supplierAccountInputId+"Div");
	ajaxRequest('api/account/frontGet',"POST","application/json",{id:supplierAccountBetterID},(res)=>{
		if(res.status=="200"){
			res=JSON.parse(res.responseText);
			if(res.character.toLowerCase()=="bsp"){
				supplierAccountDiv.value=res.name;}
			else{
				supplierAccountDiv.value="There's no such airline account!";}
		}
		else{
			console.log(res.responseText);
			supplierAccountDiv.value="There's no such airline account!";
		}
	});
	return false;
}
function getLowcostAccount(event){
	var supplierAccountBetterID=event.target.value;
	var supplierAccountInputId=event.target.id;
	var supplierAccountDiv=document.getElementById(supplierAccountInputId+"Div");
	ajaxRequest('api/account/frontGet',"POST","application/json",{id:supplierAccountBetterID},(res)=>{
		if(res.status=="200"){
			res=JSON.parse(res.responseText);
			if(res.character.toLowerCase()=="lowcost"){
				supplierAccountDiv.value=res.name;}
			else{
				supplierAccountDiv.value="There's no such airline account!";}
		}
		else{
			console.log(res.responseText);
			supplierAccountDiv.value="There's no such airline account!";
		}
	});
	return false;
}
function getICAccount(event){
	var supplierAccountBetterID=event.target.value;
	var supplierAccountInputId=event.target.id;
	var supplierAccountDiv=document.getElementById(supplierAccountInputId+"Div");
	ajaxRequest('api/account/frontGet',"POST","application/json",{id:supplierAccountBetterID},(res)=>{
		if(res.status=="200"){
			res=JSON.parse(res.responseText);
			if(res.character.toLowerCase()=="insurancecompany"){
				supplierAccountDiv.value=res.name;}
			else{
				supplierAccountDiv.value="There's no such insurance company account!";}
		}
		else{
			console.log(res.responseText);
			supplierAccountDiv.value="There's no such insurance company account!";
		}
	});
	return false;
}

function getUmrahAccount(event){
	var supplierAccountBetterID=event.target.value;
	var supplierAccountInputId=event.target.id;
	var supplierAccountDiv=document.getElementById(supplierAccountInputId+"Div");
	ajaxRequest('api/account/frontGet',"POST","application/json",{id:supplierAccountBetterID},(res)=>{
		if(res.status=="200"){
			res=JSON.parse(res.responseText);
			if(res.character.toLowerCase()=="umrah"){
				supplierAccountDiv.value=res.name;}
			else{
				supplierAccountDiv.value="There's no such umrah supplier account!";}
		}
		else{
			console.log(res.responseText);
			supplierAccountDiv.value="There's no such umrah supplier account!";
		}
	});
	return false;
}

function getHajjAccount(event){
	var supplierAccountBetterID=event.target.value;
	var supplierAccountInputId=event.target.id;
	var supplierAccountDiv=document.getElementById(supplierAccountInputId+"Div");
	ajaxRequest('api/account/frontGet',"POST","application/json",{id:supplierAccountBetterID},(res)=>{
		if(res.status=="200"){
			res=JSON.parse(res.responseText);
			if(res.character.toLowerCase()=="hajj"){
				supplierAccountDiv.value=res.name;}
			else{
				supplierAccountDiv.value="There's no such hajj supplier account!";}
		}
		else{
			console.log(res.responseText);
			supplierAccountDiv.value="There's no such hajj supplier account!";
		}
	});
	return false;
}



function getClientAccount(event){
	var clientAccountBetterID=event.target.value;
	var clientAccountInputId=event.target.id;
	var clientAccountDiv=document.getElementById(clientAccountInputId+"Div");
	ajaxRequest('api/account/frontGet',"POST","application/json",{id:clientAccountBetterID},(res)=>{
		if(res.status=="200"){
			res=JSON.parse(res.responseText);
			if(res.character=="client"){
				clientAccountDiv.value=res.name;}
			else{
				clientAccountDiv.value="There's no such client account!";}
		}
		else{
			console.log(res.responseText);
			clientAccountDiv.value="There's no such client account!";
		}
	});
	return false;
}

function getEmployerAccount(event){
	var employerAccountBetterID=event.target.value;
	var employerAccountInputId=event.target.id;
	var employerAccountDiv=document.getElementById(employerAccountInputId+"Div");
	ajaxRequest('api/employer/frontGet',"POST","application/json",{id:employerAccountBetterID},(res)=>{
		if(res.status=="200"){
			res=JSON.parse(res.responseText);
			employerAccountDiv.value=res.name;
		}
		else{
			employerAccountDiv.value="There's no such employer account!";
		}
	});
	return false;
}
function getProfitAccount(event){
	var profitAccountBetterID=event.target.value;
	var profitAccountInputId=event.target.id;
	var profitAccountDiv=document.getElementById(profitAccountInputId+"Div");
	ajaxRequest('api/account/frontGet',"POST","application/json",{id:profitAccountBetterID},(res)=>{
		if(res.status=="200"){
			res=JSON.parse(res.responseText);
			if(res.character=="profit"){
				profitAccountDiv.value=res.name;}
			else{
				profitAccountDiv.value="There's no such profit account!";}
		}
		else{
			profitAccountDiv.value="There's no such profit account!";
		}
	});
	return false;
}

function getExpenseAccount(event){
	var expenseAccountBetterID=event.target.value;
	var expenseAccountInputId=event.target.id;
	var expenseAccountDiv=document.getElementById(expenseAccountInputId+"Div");
	ajaxRequest('api/account/frontGet',"POST","application/json",{id:expenseAccountBetterID},(res)=>{
		if(res.status=="200"){
			res=JSON.parse(res.responseText);
			if(res.type=="expenses"){
				expenseAccountDiv.value=res.name;}
			else{
				expenseAccountDiv.value="There's no such expense account!";}
		}
		else{
			expenseAccountDiv.value="There's no such expense account!";
		}
	});
	return false;
}

function getRevenueAccount(event){
	var revenueAccountBetterID=event.target.value;
	var revenueAccountInputId=event.target.id;
	var revenueAccountDiv=document.getElementById(revenueAccountInputId+"Div");
	ajaxRequest('api/account/frontGet',"POST","application/json",{id:revenueAccountBetterID},(res)=>{
		if(res.status=="200"){
			res=JSON.parse(res.responseText);
			if(res.type=="revenues"){
				revenueAccountDiv.value=res.name;}
			else{
				revenueAccountDiv.value="There's no such revenue account!";}
		}
		else{
			revenueAccountDiv.value="There's no such revenue account!";
		}
	});
	return false;
}

function getCurrency(event){
	var currencyCode=event.target.value;
	var currencyInputId=event.target.id;
	var currencyName=document.getElementById(currencyInputId+"Div");
	ajaxRequest('/api/currency/frontGet',"POST","application/json",{id:currencyCode},(res)=>{
		if(res.status=="200"){
			res=JSON.parse(res.responseText);
			currencyName.value=res.name;
		}
		else{
			currencyName.value="There's no such currency!";
		}
	});
	return false;
}
function showCash(){
	var obj={};
	ajaxRequest('/account/getAll',"POST","application/json",obj,(res)=>{
		if(res!="false"){
			res=JSON.parse(res);
			var cashAccounts=[];
			for(var i=0;i<res.length;i++){
				if(res[i].type=="cash"){cashAccounts.push({name:res[i].name,id:res[i].betterId});}
			}
			console.log(cashAccounts);
		}
	});


	return false;
}
function showAccounts(){
	var obj={date:new Date()};
	var showAccountsDiv=document.getElementById("showAccountsDiv");

	ajaxRequest('api/account',"GET","application/json",obj,(res)=>{
		var accounts=JSON.parse(res.responseText);
		showAccountsDiv.style.display="block";
		var a={};
		for(var i=0;i<accounts.length;i++){
			var type=accounts[i].type;
			var major=accounts[i].major;
			if(a[type]){
				if(a[type][major]){
					a[type][major].push(accounts[i]);
				}
				else{
					a[type][major]=[accounts[i]];
				}
			}
			else{
				a[type]={};
				a[type][major]=[accounts[i]];
			}

		}
		var show=document.getElementById("showAccountsTable");
		show.innerHTML="<tr><td>Account Name</td><td>Account ID</td></tr>";
		//hardcode .-.
		var tr=document.createElement("tr");
		var td=document.createElement("td");
		var typeHead=document.createElement("td");
		typeHead.innerHTML="Assets";
		tr.appendChild(typeHead);
		tr.appendChild(td);
		show.appendChild(tr);
		var tr=document.createElement("tr");
		var td=document.createElement("td");
		var minorTypeHead=document.createElement("td");
		minorTypeHead.innerHTML="Current Assets";
		tr.appendChild(minorTypeHead);
		tr.appendChild(td);
		show.appendChild(tr);
		if(a.currentAssets){
			var keys=Object.keys(a.currentAssets);
			for(var j=0;j<keys.length;j++){
				var tr=document.createElement("tr");
				var td=document.createElement("td");
				var majorHead=document.createElement("td");
				majorHead.innerHTML=keys[j];
				tr.appendChild(majorHead);
				tr.appendChild(td);
				show.appendChild(tr);
				var m=a.currentAssets[keys[j]];
				for(var k=0;k<m.length;k++){
					var tr=document.createElement("tr");
					var accountName=document.createElement("td");
					var accountNumber=document.createElement("td");
					accountNumber.innerHTML=m[k].id;
					accountName.innerHTML=m[k].name;
					tr.appendChild(accountName);
					tr.appendChild(accountNumber);
					show.appendChild(tr);
				}
			}
		}
		var tr=document.createElement("tr");
		var td=document.createElement("td");
		var minorTypeHead=document.createElement("td");
		minorTypeHead.innerHTML="Non Current Assets";
		tr.appendChild(minorTypeHead);
		tr.appendChild(td);
		show.appendChild(tr);
		if(a.nonCurrentAssets){
			var keys=Object.keys(a.nonCurrentAssets);
			for(var j=0;j<keys.length;j++){
				var tr=document.createElement("tr");
				var td=document.createElement("td");
				var majorHead=document.createElement("td");
				majorHead.innerHTML=keys[j];
				tr.appendChild(majorHead);
				tr.appendChild(td);
				show.appendChild(tr);
				var m=a.nonCurrentAssets[keys[j]];
				for(var k=0;k<m.length;k++){
					var tr=document.createElement("tr");
					var accountName=document.createElement("td");
					var accountNumber=document.createElement("td");
					accountNumber.innerHTML=m[k].id;
					accountName.innerHTML=m[k].name;
					tr.appendChild(accountName);
					tr.appendChild(accountNumber);
					show.appendChild(tr);
				}
			}
		}

		var tr=document.createElement("tr");
		var td=document.createElement("td");
		var typeHead=document.createElement("td");
		typeHead.innerHTML="Liabilities";
		tr.appendChild(typeHead);
		tr.appendChild(td);
		show.appendChild(tr);
		var tr=document.createElement("tr");
		var td=document.createElement("td");
		var minorTypeHead=document.createElement("td");
		minorTypeHead.innerHTML="Current Liabilities";
		tr.appendChild(minorTypeHead);
		tr.appendChild(td);
		show.appendChild(tr);
		if(a.currentLiabilities){
			var keys=Object.keys(a.currentLiabilities);
			for(var j=0;j<keys.length;j++){
				var tr=document.createElement("tr");
				var td=document.createElement("td");
				var majorHead=document.createElement("td");
				majorHead.innerHTML=keys[j];
				tr.appendChild(majorHead);
				tr.appendChild(td);
				show.appendChild(tr);
				var m=a.currentLiabilities[keys[j]];
				for(var k=0;k<m.length;k++){
					var tr=document.createElement("tr");
					var accountName=document.createElement("td");
					var accountNumber=document.createElement("td");
					accountNumber.innerHTML=m[k].id;
					accountName.innerHTML=m[k].name;
					tr.appendChild(accountName);
					tr.appendChild(accountNumber);
					show.appendChild(tr);
				}
			}
		}

		var tr=document.createElement("tr");
		var td=document.createElement("td");
		var minorTypeHead=document.createElement("td");
		minorTypeHead.innerHTML="Non Current Liabilities";
		tr.appendChild(minorTypeHead);
		tr.appendChild(td);
		show.appendChild(tr);
		if(a.nonCurrentLiabilities){
			var keys=Object.keys(a.nonCurrentLiabilities);
			for(var j=0;j<keys.length;j++){
				var tr=document.createElement("tr");
				var td=document.createElement("td");
				var majorHead=document.createElement("td");
				majorHead.innerHTML=keys[j];
				tr.appendChild(majorHead);
				tr.appendChild(td);
				show.appendChild(tr);
				var m=a.nonCurrentLiabilities[keys[j]];
				for(var k=0;k<m.length;k++){
					var tr=document.createElement("tr");
					var accountName=document.createElement("td");
					var accountNumber=document.createElement("td");
					accountNumber.innerHTML=m[k].id;
					accountName.innerHTML=m[k].name;
					tr.appendChild(accountName);
					tr.appendChild(accountNumber);
					show.appendChild(tr);
				}
			}
		}
		var tr=document.createElement("tr");
		var td=document.createElement("td");
		var minorTypeHead=document.createElement("td");
		minorTypeHead.innerHTML="Shareholders Equity";
		tr.appendChild(minorTypeHead);
		tr.appendChild(td);
		show.appendChild(tr);
		if(a.shareholdersEquity){
			var keys=Object.keys(a.shareholdersEquity);
			for(var j=0;j<keys.length;j++){
				var tr=document.createElement("tr");
				var td=document.createElement("td");
				var majorHead=document.createElement("td");
				majorHead.innerHTML=keys[j];
				tr.appendChild(majorHead);
				tr.appendChild(td);
				show.appendChild(tr);
				var m=a.shareholdersEquity[keys[j]];
				for(var k=0;k<m.length;k++){
					var tr=document.createElement("tr");
					var accountName=document.createElement("td");
					var accountNumber=document.createElement("td");
					accountNumber.innerHTML=m[k].id;
					accountName.innerHTML=m[k].name;
					tr.appendChild(accountName);
					tr.appendChild(accountNumber);
					show.appendChild(tr);
				}
			}
		}


		var tr=document.createElement("tr");
		var td=document.createElement("td");
		var typeHead=document.createElement("td");
		typeHead.innerHTML="Revenues";
		tr.appendChild(typeHead);
		tr.appendChild(td);
		show.appendChild(tr);
		if(a.revenues){
			var keys=Object.keys(a.revenues);
			for(var j=0;j<keys.length;j++){
				var tr=document.createElement("tr");
				var td=document.createElement("td");
				var majorHead=document.createElement("td");
				majorHead.innerHTML=keys[j];
				tr.appendChild(majorHead);
				tr.appendChild(td);
				show.appendChild(tr);
				var m=a.revenues[keys[j]];
				for(var k=0;k<m.length;k++){
					var tr=document.createElement("tr");
					var accountName=document.createElement("td");
					var accountNumber=document.createElement("td");
					accountNumber.innerHTML=m[k].id;
					accountName.innerHTML=m[k].name;
					tr.appendChild(accountName);
					tr.appendChild(accountNumber);
					show.appendChild(tr);
				}
			}
		}
		var tr=document.createElement("tr");
		var td=document.createElement("td");
		var typeHead=document.createElement("td");
		typeHead.innerHTML="Expenses";
		tr.appendChild(typeHead);
		tr.appendChild(td);
		show.appendChild(tr);
		if(a.expenses){
			var keys=Object.keys(a.expenses);
			for(var j=0;j<keys.length;j++){
				var tr=document.createElement("tr");
				var td=document.createElement("td");
				var majorHead=document.createElement("td");
				majorHead.innerHTML=keys[j];
				tr.appendChild(majorHead);
				tr.appendChild(td);
				show.appendChild(tr);
				var m=a.expenses[keys[j]];
				for(var k=0;k<m.length;k++){
					var tr=document.createElement("tr");
					var accountName=document.createElement("td");
					var accountNumber=document.createElement("td");
					accountNumber.innerHTML=m[k].id;
					accountName.innerHTML=m[k].name;
					tr.appendChild(accountName);
					tr.appendChild(accountNumber);
					show.appendChild(tr);
				}
			}
		}

	});
	return false;
}
function showAccountsClose(){
	var showAccountsDiv=document.getElementById("showAccountsDiv");
	showAccountsDiv.style.display="none";

}
//sidebar things

var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
	  this.classList.toggle("active");
	  var dropdownContent = this.nextElementSibling;
	  dropdownContent.classList.remove("unactive");
	  if (dropdownContent.style.display === "block") {
		  dropdownContent.style.display = "none";

	  } else {
	  dropdownContent.style.display = "block";
	  }
  });
}
