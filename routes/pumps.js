const router = require("express").Router();
let db = require("../models/index");

//create new pump(initial Counter:0, set Rate, define fuelType) //for 1 time
//display pumps (total counter, each pump details)
//delete

/**
 * @action RETURN all Pumps[]
 * @route localhost:3000/pump
 * @method GET
 */
router.route("/").get((req, res) => {
  db.Pump.find({})
    .lean()
    // .populate("fuelTypeId", "name -_id")
    .then((Pump) => res.json(Pump))
    .catch((err) => res.status(400).json("Error" + err));
});
/**
 * @action RETURN ALL PUMPS BY FUEL TYPE in req.params
 * @route localhost:3000/pump
 * @method POST
 */
router.route("/:type").get(async (req, res) => {
  try {
    // const fuel = await db.Fuel.findone({ name: req.body.type }).lean();
    await db.Pump.find({ fuelType: req.params.type })
      .then((Pump) => res.json(Pump))
      .catch((err) => res.status(400).json("Error" + err));
  } catch (err) {
    res.status(500).send(err);
  }
});
/**
 * @action CREATE NEW PUMP with rate and counter
 * @route localhost:3000/pump/add
 * @method POST
 */
router.route("/add").post(async (req, res) => {
  const { fuelType } = req.body;
  const counter = Number(req.body.counter);
  const rate = Number(req.body.rate);

  // const fuel = await db.Fuel.findOne({ name: fuelType }).lean();

  const newPump = new db.Pump({
    counter,
    fuelType,
    rate,
  });
  console.log("new pump: ", newPump); //

  await newPump
    .save()
    .then(() => res.json("new Pump added"))
    .catch((err) => res.status(400).json("Error" + err));
});
/**
 * @action UPDATE A PUMP RATE OR COUNTER by req.params WHERE FUELTYPE
 * @route localhost:3000/pump/edit/:type
 * @method PUT
 */
router.route("/edit/:type").put(async (req, res) => {
  try {
    // const fuel = await db.Fuel.findone({ name: req.params.type }).lean();
    const updated = await db.Pump.updateOne(
      { fuelType: req.params.type },
      req.body,
      {}
    );
    res.send(updated);
  } catch (err) {
    res.status(500).send(err);
  }
});
/**
 * @action DELETE PUMP BY PARAMS.ID
 * @route localhost:3000/pump/edit/:type
 * @method DELETE
 */
router.route("/del/:id").delete(async (req, res) => {
  const del = await db.Pump.deleteOne({ _id: req.params.id });
  res.send(del);
});

module.exports = router;
