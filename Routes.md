Routes api clarification

***INVOICE***
---
/**
* @action RETURN all INVOICES in []
* @route localhost:3000/invoice
* @method GET
* @input NONE
* @output {serialNb, liter, value, date, companyid.name, fuelid.name, tankid.code}
*/

/**
* @action CREATE NEW INVOICE
* @route localhost:3000/invoice/add
* @method DELETE
* @input req.body{serialNb,date,companyName, fuelType, tankCode, liter, value}
* @output "new invoice added" //if new obj needed we can replace the string text with it
*/

/**
* @action DELETE INVOICE BY params.ID
* @route localhost:3000/invoice/del/:id
* @method DELETE
* @input params.id
* @output {count, ok} of objects deleted with status
*/

/**
* @action DELETE ALL INVOICE RECORDS using req.body.confirm: true
* @route localhost:3000/invoice/del
* @method DELETE
*/
