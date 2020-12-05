const mongoose = require("mongoose");
const ReportSchema = new mongoose.Schema({
  dataTime: {
    type: Date,
    required: true,
    default: new Date(),
  },
  TTLmoney: {
    type: Number,
    required: true,
  },
  countDiff: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["normal", "almost empty", "full", "exceed the max limit"],
    default: "normal",
  },
  _pump_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("report", ReportSchema);
