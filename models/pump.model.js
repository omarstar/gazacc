const mongoose = require("mongoose");
const fuelTypeModel = require("./fuelType.model");

const PumpSchema = new mongoose.Schema({
  counter: {
    type: Number,
    required: true,
  },
  fuelType: { type: String, required: true },
});

module.exports = mongoose.model("pump", PumpSchema);
