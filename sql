insert into `accounts` (name,accountNature,type,major,debit,credit,exchangeRate,`character`,currencyId) values ('account',0,'assets','majorAccount',10.2,10.3,1.3,'bsp',2)


INSERT INTO `receipts`(`amount`, `descriptionFromTo`, `description`, `type`, `status`, `exchangeRate`,`userId`, `cashAccount`, `accountId`, `currencyId`) VALUES (1000,"descft","desc","paymentReceipt","pending",1.3,1,2,2,1)

{
	"userId":1,
	"clientAccount":1,
	"supplierAccount":1,
	"expenseAccount":1,
	"revenueAccount":1,
	"employerId":1,
	"currencyId":1,
	"exchangeRate":1,
	"delegateName":"mazen",
	"journey":"bla",
	"islamicDate":"1441",
	"productObj":{
		"sellingPrice":1000,
		"total":2000,
		"description":"notes"
	},
	"productType":"typeC"
	
}
