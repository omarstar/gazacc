const router = require("express").Router();
//let Tank = require("../models/Tank.model");
let db = require("../models/index");

//display all tank info on tank page
//find tank by body.code
//create new tank
//via invoice => update tank level and status on any pump counter change using req.action="INV"
//via pump => update tank level and status on any invoice volume change using req.action="PMP"
//delete tank:id
//delete all tanks (testing purposes)

/**
 * @action RETURN all TANKS[]
 * @route localhost:3000/tank
 * @method GET
 */
router.route("/").get((req, res) => {
  db.Tank.find({})
    .lean()
    .populate("fuelTypeId", "name -_id")
    .then((Tank) => res.json(Tank))
    .catch((err) => res.status(400).json("Error" + err));
});
/**
 * @action RETURN {TANK} by body.CODE | including fuelType.name
 * @route localhost:3000/tank
 * @method POST
 */
router.route("/").post(async (req, res) => {
  try {
    const tank = await db.Tank.findOne({ code: req.body.code })
      .lean()
      .populate("fuelTypeId", "name -_id", db.Fuel);
    res.send(tank);
  } catch (err) {
    res.status(500).send(err);
  }
});
/**
 * @action CREATE NEW TANK | where fuelType: fuel_id
 * @route localhost:3000/tank/add
 * @method POST
 */
router.route("/add").post(async (req, res) => {
  //define from req.body.keys to match model.keys
  const { code, fuelType } = req.body;
  const capacity = Number(req.body.capacity);
  const fuelLevel = Number(req.body.fuelLevel);
  //get the fuel id from the req.body.fuelType
  try {
    await db.Fuel.findOne({ name: fuelType }, async (err, docFuel) => {
      if (err) {
        console.log("err finding fuel type: ", err);
      } else {
        console.log("document Fuel: ", docFuel);
        //create and validate a new tank model having fuel id
        const newTank = new db.Tank({
          code,
          fuelTypeId: docFuel._id,
          fuelLevel,
          capacity,
        });
        console.log("new one: ", newTank);
        //save the new tank
        try {
          await newTank
            .save()
            .then(() => res.json("new Tank added"))
            .catch((err) => res.status(400).json("Error" + err));
        } catch (error) {
          res.status(500).send(error);
        }
      }
    }).lean();
  } catch (error) {
    res.status(500).send(error);
  }
});
/**
 * @action UPDATE any TANK detail (req.body) by params.CODE
 * @route localhost:3000/tank/edit/:code
 * @method PUT
 */
router.route("/edit/:code").put(async (req, res) => {
  try {
    const updated = await db.Tank.updateOne(
      { code: req.params.code },
      req.body,
      {}
    );
    res.send(updated);
  } catch (err) {
    res.status(500).send(err);
  }
});
//UPDATE : the status during level change
//method!!
const getStatus = (lvl, max) => {
  if (lvl >= max) {
    return "full";
  } else if (lvl < 10) {
    return "empty";
  } else {
    return "normal";
  }
};
//UPDATE : the tank level
//!!!! it is returning the find before updating
const updateVolume = async (code, level, rule) => {
  try {
    // const tank =
    await db.Tank.findOne({ code }, async (err, docTank) => {
      if (err) return err;
      //calculation
      let newLevel = Number(docTank.fuelLevel);
      switch (rule) {
        case "INV":
          newLevel += Number(level);
          break;
        case "PMP":
          newLevel -= Number(level);
          break;
      }

      const sts = getStatus(newLevel, docTank.capacity);
      docTank.set({ status: sts });
      docTank.set({ fuelLevel: newLevel });
      await docTank.save();
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
    // return tank;
  } catch (err) {
    console.log("error in method: ", err);
  }
};
/**
 * @action UPDATE TANK level by params.CODE when:
 *  new invoice is created (level increase) OR pump consume volume from tank (level decrease), using above methods
 * @body code,fuelLevel,action["INV","PMP"]
 * @route localhost:3000/tank/edit/:code
 * @method PUT
 */
router.route("/editinv/:code").put((req, res) => {
  updateVolume(req.params.code, req.body.fuelLevel, req.body.action)
    .then(() => res.json("tank updated as well!"))
    .catch((err) => res.json(err));
});
//still need to update editDec volume at pump low
/**
 * @action DELETE A TANK BY ID
 * @route localhost:3000/tank/del/:id
 * @method DELETE
 */
router.route("/del/:id").delete(async (req, res) => {
  const del = await db.Tank.deleteOne({ _id: req.params.id });
  res.send(del);
});
/**
 * @action DELETE ALL TANK RECORDS
 * @route localhost:3000/tank/del
 * @method DELETE
 */
router.route("/del/").delete(async (req, res) => {
  if (req.body.confirm) {
    try {
      const del = await db.Tank.deleteMany({});
      res.send(del);
    } catch (error) {
      res.json("something went wrong while deleting all ", error);
    }
  }
});

module.exports = router;
