const mongoose = require("mongoose");
const TankSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  fuelLevel: {
    type: Number,
    required: [true, "fuel level should be mentioned"],
  },
  status: {
    type: String,
    enum: ["normal", "empty", "full"],
    default: "normal",
  },
  fuelTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "fuelType",
  },
});

module.exports = mongoose.model("tank", TankSchema);
