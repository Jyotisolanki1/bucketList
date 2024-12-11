const mongoose = require("mongoose");

let businessCategorySchema = new mongoose.Schema(
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

const businessCategoryModel = mongoose.model(
  "businessCategories",
  businessCategorySchema
);

module.exports = businessCategoryModel;
