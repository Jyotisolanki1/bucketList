const mongoose = require("mongoose");

let sales_personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const salesPersonModel = mongoose.model("salesPersons", sales_personSchema);

module.exports = salesPersonModel;
