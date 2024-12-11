const mongoose = require("mongoose");

let NotificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const notificationModel = mongoose.model("notifications", NotificationSchema);

module.exports = notificationModel;
