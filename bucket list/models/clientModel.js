const mongoose = require("mongoose");

let clientsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Guest",
    },
    company_name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "services",
      required: true,
    },
    job_title: {
      type: String,
      default: "",
    },
    password: {
      type: String,
    },
    city_zip: {
      type: String,
    },
    company_information: {
      type: String,
    },
    isApproved: {
      type: String,
      Defualt: "false",
    },
    sales_person: {
      type: mongoose.Types.ObjectId,
      ref: "employees",
    },
    address: {
      type: String,
    },
    isStatus: {
      type: String,
      enum: ["pending", "active", "blocked"],
      default: "pending",
    },
    profile_pic: {
      type: String,
      default: "",
    },
    isApproved: {
      type: String,
      default: "false",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = clientModel = mongoose.model("clients", clientsSchema);
