const router = require("express").Router();
let Company = require("../models/company.model");

// get all companies
// create new company
// delete company by id

/**
 * @action GET ALL COMPANIES
 * @route localhost:3000/company/
 * @method GET
 */
router.route("/").get((req, res) => {
  Company.find()
    .lean()
    .then((company) => res.json(company))
    .catch((err) => res.status(400).json("Error" + err));
});
/**
 * @action CREATE NEW COMPANY by body
 * @route localhost:3000/company/add
 * @method POST
 */
router.route("/add").post(async (req, res) => {
  const name = req.body.name;
  const phone = Number(req.body.phone);

  const newCompany = new Company({
    name,
    phone,
  });
  console.log("new one: ", newCompany);

  await newCompany
    .save()
    .then(() => res.json("new company added"))
    .catch((err) => res.status(400).json("Error" + err));
});
/**
 * @action DELETE COMPANY BY params.ID
 * @route localhost:3000/company/del/:id
 * @method DELETE
 */
router.route("/del/:id").delete(async (req, res) => {
  const del = await Company.deleteOne({ _id: req.params.id });
  res.send(del);
});

module.exports = router;
