const mongoose = require("mongoose");
const InvoiceSchema = new mongoose.Schema({
  serialnbr: {
    type: String,
    required: true,
  },
  litre: {
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
