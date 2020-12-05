const mongoose = require("mongoose");
const InvoiceSchema = new mongoose.Schema({
  serialNb: {
    type: String,
    required: true,
  },
  liter: {
    type: Number,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  companyid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company",
  },
  fuelid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "fuelType",
  },
  tankid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tank",
  },
});

module.exports = mongoose.model("invoice", InvoiceSchema);
