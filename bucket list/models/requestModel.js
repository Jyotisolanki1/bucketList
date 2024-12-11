const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

let requestSchema = new mongoose.Schema(
  {
    company_name: { type: String },
    company_employee: { type: String },
    job_title: { type: String },
    email: { type: String },
    phone: { type: String },
    work_scope: { type: String },
    location: { type: String },
    cost_code: { type: String },
    bucketInfo: {
      type: mongoose.Types.ObjectId,
      ref: "buckets",
      required: true,
    },
    userInfo: { type: mongoose.Types.ObjectId, ref: "users" },
    client: { type: mongoose.Types.ObjectId, ref: "clients" },
    request_id_pre: { type: Number, unique: true },
    request_id: { type: String, unique: true },
    requested_date: {
      type: Date,
      required: true,
    },
    isStatus: {
      type: String,
      enum: ["Pending", "Approved", "In Process", "Completed"],
      default: "Pending",
    },
    purchase_order: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

requestSchema.plugin(AutoIncrement, { inc_field: "request_id_pre" });

requestSchema.post("save", async function (doc, next) {
  if (doc.request_id_pre != null) {
    doc.request_id = `REQ_ID-${doc.request_id_pre}`;
    await doc.updateOne({ request_id: doc.request_id });
    next();
  } else {
    next();
  }
});

// Ensure virtuals are included when converting the document to JSON
requestSchema.set("toJSON", { virtuals: true });
requestSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("requests", requestSchema);
