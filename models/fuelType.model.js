const { Schema, model } = require("mongoose");

const FuelTypeSchema = new Schema({
  name: String,
});

module.exports = model("fuelType", FuelTypeSchema);
