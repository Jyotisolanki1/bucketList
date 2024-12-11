const mongoose = require("mongoose");

let InvoiceSchema = new mongoose.Schema(
  {
    invoice: {
      type: String,
      required: true,
    },
    userInfo: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const invoiceModel = mongoose.model("invoices", InvoiceSchema);

module.exports = invoiceModel;
