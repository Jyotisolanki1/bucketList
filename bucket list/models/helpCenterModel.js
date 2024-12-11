const mongoose = require("mongoose");

let helpCentersSchema = new mongoose.Schema(
  {
    userInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    message: {
      type: String,
    },
    reply: {
      type: String,
      default: "false",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("helpCenters", helpCentersSchema);
