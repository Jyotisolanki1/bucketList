const mongoose = require("mongoose");

let BucketSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "services",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    client: {
      type: mongoose.Types.ObjectId,
      ref: "clients",
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
      },
    ],
    catStatus: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const bucketModel = mongoose.model("buckets", BucketSchema);
module.exports = bucketModel;
