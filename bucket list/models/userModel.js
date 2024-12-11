const mongoose = require("mongoose");

let usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Guest",
    },
    company_name: {
      type: String,
      default: "",
    },
    position: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      validate: {
        validator: async (value) => {
          const result = await userModel.countDocuments({
            email: value,
          });
          return result === 0;
        },
        message: "Email must be unique.",
      },
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    password: {
      type: String,
    },
    referral_code: {
      type: String,
    },
    // dob: {
    //   type: String,
    // },
    // age: {
    //   type: String,
    // },
    // billing_address: {
    //   type: String,
    // },
    // postcode: {
    //   type: String,
    // },
    // login_type: {
    //   type: String,
    //   enum: ["app", "facebook", "google"],
    //   default: "app",
    // },
    isStatus: {
      type: String,
      enum: ["pending", "active", "blocked"],
      default: "pending",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    fcmToken: {
      type: String,
      default: "",
    },
    // stripeCustomerId: {
    //   type: String,
    //   default: "",
    // },
    // isPayment: {
    //   type: "String",
    //   default: "true",
    // },
    // isPartnerPayment: {
    //   type: "String",
    //   default: "false",
    // },
    // isPartner: {
    //   type: "String",
    //   default: "false",
    // },
    // webPartner: {
    //   type: String,
    //   default: "true",
    // },
  },
  { timestamps: true, versionKey: false }
);

module.exports = userModel = mongoose.model("users", usersSchema);
