const mongoose = require("mongoose");

let categrorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("categories", categrorySchema);
