const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
let employeeSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    employee_id_pre: { type: Number, unique: true }, // Auto-increment field
    employee_id: { type: String, unique: true }, // Prefixed field
    email: {
      type: String,
      validate: {
        validator: async (value) => {
          const result = await employeeModel.countDocuments({
            email: value,
          });
          return result === 0;
        },
        message: "Email must be unique.",
      },
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    profile_pic: {
      type: String,
      default: "",
    },
    isStatus: {
      type: String,
      enum: ["pending", "active", "blocked"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


employeeSchema.post("save", async function (doc, next) {
  if (doc.employee_id_pre != null) {
    doc.employee_id = `EMP_ID-${doc.employee_id_pre}`;
    await doc.updateOne({employee_id:doc.employee_id})
    next();
  } else {
    next();
  }
});

// Ensure virtuals are included when converting the document to JSON
employeeSchema.set("toJSON", { virtuals: true });
employeeSchema.set("toObject", { virtuals: true });
employeeSchema.plugin(AutoIncrement, { inc_field: "employee_id_pre" });
module.exports = employeeModel = mongoose.model("employees", employeeSchema);
