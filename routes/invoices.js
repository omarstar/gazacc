const router = require("express").Router();
let db = require("../models/index");

//get all invoices
//create new invoice using req.body
//delete invoice by params:id
//delete all invoices //testing purposes

/**
 * @action RETURN all INVOICES[]
 * @route localhost:3000/invoice
 * @method GET
 * @input NONE
 * @output {serialNb, liter, value, date, companyid.name, fuelid.name, tankid.code}
 */
router.route("/").get((req, res) => {
  db.Invoice.find()
    .populate("tankid", "code -_id")
    .populate("companyid", "name -_id")
    .populate("fuelid", "name -_id")
    .then((obj) => res.json(obj))
    .catch((err) => res.status(400).json("Error" + err));
});
/**
 * @action CREATE NEW INVOICE by body
 * @route localhost:3000/invoice/add
 * @method POST
 */
router.route("/add").post(async (req, res) => {
  console.log("req.body: ", req.body);

  const { serialNb, date, companyName, fuelType, tankCode } = req.body;
  const liter = Number(req.body.liter);
  const value = Number(req.body.value);

  try {
    const fuel = await db.Fuel.findOne({ name: fuelType }).lean();
    const company = await db.Company.findOne({ name: companyName }).lean();
    const tank = await db.Tank.findOne({ code: tankCode }).lean();

    console.log("tank ", tank);
    console.log("company ", company);
    console.log("fuel ", fuel);

    const newInvoice = new db.Invoice({
      serialNb,
      date,
      liter,
      value,
      fuelid: fuel._id,
      companyid: company._id,
      tankid: tank._id,
    });

    console.log("new invoice: ", newInvoice);

    try {
      await newInvoice
        .save()
        .then(() => res.json("new invoice added"))
        .catch((err) => res.status(400).json("Error" + err));
    } catch (error) {
      res.status(500).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
/**
 * @action DELETE INVOICE BY params.ID
 * @route localhost:3000/invoice/del/:id
 * @method DELETE
 * @input params.id
 * @output {count, ok} of objects deleted with status
 */
router.route("/del/:id").delete(async (req, res) => {
  await db.Invoice.deleteOne({ _id: req.params.id })
    .then((obj) => res.send(obj))
    .catch((err) => console.log(err));
});
/**
 * @action DELETE ALL INVOICE RECORDS using req.body.confirm: true
 * @route localhost:3000/invoice/del
 * @method DELETE
 * @input req.body{confirm: true}
 * @output
 */
router.route("/del/").delete(async (req, res) => {
  if (req.body.confirm) {
    try {
      const delInvoice = await db.Invoice.deleteMany({}).lean();
      res.send(delInvoice);
    } catch (error) {
      res.json("something went wrong while deleting all ", error);
    }
  } else res.send("no confirmed by admin!");
});
module.exports = router;
