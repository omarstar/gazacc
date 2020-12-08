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

***PUMP***
---
/**
* @action RETURN all Pumps[]
* @route localhost:3000/pump
* @method GET
* @input NONE
* @output [{counter, rate, fuelType}] //static
*/

/**
* @action RETURN ALL PUMPS
* @route localhost:3000/pump/:type
* @method POST
* @input req.params.type (fuel type)
* @output {counter, rate, fuelType}
*/

/**
* @action CREATE NEW PUMP
* @route localhost:3000/pump/add
* @method POST
* @input req.body{rate,counter, fuelType}
* @output "new Pump added"
*/

/**
* @action UPDATE A PUMP RATE OR COUNTER
* @route localhost:3000/pump/edit/:type
* @method PUT
* @input req.params.type (fuel type)
* @output {counter, rate, fuelType}
*/

/**
* @action DELETE PUMP BY PARAMS.ID
* @route localhost:3000/pump/edit/:id
* @method DELETE
* @input req.params.id (pump id)
* @output {n,count,ok}
*/

***TANK***
---
/**
* @action RETURN all TANKS[]
* @route localhost:3000/tank
* @method GET
* @input none
* @output [{code, capacity, fuelLevel, status, fuelTypeId.name}]
*/

/**
* @action RETURN {TANK
* @route localhost:3000/tank
* @method POST
* @input req.body{code}
* @output {code, capacity, fuelLevel, status, fuelTypeId.name}
*/

/**
* @action CREATE NEW TANK
* @route localhost:3000/tank/add
* @method POST
* @input {code, fuelType, capacity, fuelLevel}
* @output "new Tank added"
*/

/**
* @action UPDATE any TANK
* @route localhost:3000/tank/edit/:code
* @method PUT
* @input req.params.code (tank code) req.body{field to be updated}
* @output {code, capacity, fuelLevel, status, fuelTypeId}
*/

/**
* @action UPDATE TANK level by params.CODE when:
* new invoice is created (level increase) OR pump consume volume from tank (level decrease), using above methods
* @body code,fuelLevel,action["INV","PMP"]
* @route localhost:3000/tank/edit/:code
* @method PUT
* @input req.params.code & req.body{fuelLevel, action}
*/

/**
* @action DELETE A TANK BY ID
* @route localhost:3000/tank/del/:id
* @method DELETE
* @input params.id
*/

/**
* @action DELETE ALL TANK RECORDS
* @route localhost:3000/tank/del
* @method DELETE
* @input body{confirm: true}
*/

***COMPANY***
---
/**
* @action GET ALL COMPANIES
* @route localhost:3000/company/
* @method GET
* @input none
* @output [{name, phone}]
*/

/**
* @action CREATE NEW COMPANY by body
* @route localhost:3000/company/add
* @method POST
* @input body{name, phone}
* @output "new company added"
*/

/**
* @action DELETE COMPANY BY params.ID
* @route localhost:3000/company/del/:id
* @method DELETE
* @input params.id
*/
