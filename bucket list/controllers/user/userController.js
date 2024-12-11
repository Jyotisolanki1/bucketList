const {
  singUpValidation,
  updateProfileValidation,
  changePasswordValidation,
  resetPasswordValidation,
  createRequestValidation,
} = require("../../helpers/userValidationSchema");
const {
  clientSingUpValidation,
  clientUpdateProfileValidation,
} = require("../../helpers/clientValidation");
const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../../library/sendEmail");
const { mongoose } = require("mongoose");
const {
  generateTempTokens,
  generateTokens,
} = require("../../helpers/generateTokens");
const {
  verifyOtpValidation,
  forgetPasswordValidation,
  loginValidation,
} = require("../../helpers/commonValidator");
const bucketModel = require("../../models/bucketModel");
const bucketCatModel = require("../../models/serviceModel");
const requestModel = require("../../models/requestModel");
const FaqModel = require("../../models/faqModel");
const notificationModel = require("../../models/notificationModel");

//user auth //
const singUp = async (req, res) => {
  try {
    const { error } = singUpValidation(req.body);
    if (error)
      return res.status(400).json({
        responseCode: 400,
        success: false,
        message: error.details[0].message,
        data: {},
      });

    const exist = await userModel.findOne({ email: req.body.email });
    if (exist && exist.isStatus !== "pending") {
      return res.status(401).json({
        responseCode: 401,
        success: false,
        message: `User with ${req.body.email} already exists`,
        data: {},
      });
    } else {
      await userModel.deleteOne({ email: req.body.email });
    }

    let passwordHash = await bcrypt.hash(
      req.body.password,
      Number(process.env.BCRYPT_SALTROUND)
    );

    let otp = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);
    console.log(otp);
    let userObj = {
      name: req.body.name,
      company_name: req.body.company_name,
      position: req.body.position,
      email: req.body.email,
      phone: req.body.phone,
      password: passwordHash,
      referral_code: req.body.referral_code,
      fcmToken: req.body.fcmToken,
    };

    await userModel(userObj).save();
    await sendEmail(
      req.body.name,
      req.body.email,
      "OTP verification code",
      `<p>Your OTP to verify the account - ${otp}</p>`
    );

    let tempToken = await generateTempTokens({
      email: req.body.email,
      otp: otp,
      type: "signup",
    });
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully on the email",
      data: { otp: otp, accessToken: tempToken.accessToken },
    });
  } catch (err) {
    console.error("singUp", err);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { error } = verifyOtpValidation(req.body);
    if (error)
      return res.status(400).json({
        responseCode: 400,
        success: false,
        message: error.details[0].message,
        data: {},
      });
    // console.log('verifyOtp', req.userTemp, req.user)
    if (req.body.otp != req.userTemp.otp) {
      return res.status(400).json({
        responseCode: 400,
        success: false,
        message: "Please enter the valid code",
        data: {},
      });
    }

    const user = await userModel.findOneAndUpdate(
      { email: req.userTemp.email },
      { $set: { isStatus: "active" } }
    );

    let accessToken = "";
    if (req.userTemp.type == "signup") {
      accessToken = await generateTokens({
        id: user._id,
        email: user.email,
        phone: user.phone,
        position: user.position,
        company_name: user.company_name,
        referral_code: user.referral_code,
        role: user.role,
      });

      await sendEmail(
        user.name,
        user.email,
        "Thankyou for join with us",
        `<p>Thankyou for verify your account</p>`
      );
    } else if (req.userTemp.type == "forgot") {
      accessToken = await generateTempTokens({
        email: req.userTemp.email,
        otp: req.userTemp.otp,
        type: "forgot",
      });
    } else {
      accessToken = await generateTokens({
        id: user._id,
        email: user.email,
        phone: user.phone,
        role: user.role,
      });
    }

    return res.status(200).json({
      responseCode: 200,
      success: true,
      message: "OTP verified sucessfully",
      data: accessToken,
    });
  } catch (err) {
    console.error("verifyOtp", err);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};
const resendOtpMail = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.userTemp.email });
    let otp = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);
    console.log(otp);
    let tempToken = await generateTempTokens({
      email: req.userTemp.email,
      otp: otp,
      type: req.userTemp.type,
    });

    await sendEmail(
      user.name,
      user.email,
      "OTP verification code",
      `<p>Your OTP to verify the account - ${otp}</p>`
    );

    return res.status(200).json({
      responseCode: 200,
      success: true,
      message: "OTP has been sent to your registered email Id",
      data: { otp: otp, accessToken: tempToken.accessToken },
    });
  } catch (err) {
    console.error("resendOtpMail", err);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};
const resetPassword = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(400).json({
        responseCode: 400,
        success: false,
        message: "Password required",
        data: {},
      });
    }

    let passwordHash = await bcrypt.hash(
      req.body.password,
      Number(process.env.BCRYPT_SALTROUND)
    );

    await userModel.updateOne(
      { email: req.userTemp.email },
      { $set: { password: passwordHash } }
    );

    return res.status(200).json({
      responseCode: 200,
      success: true,
      message: "Passsword reset successfully",
      data: {},
    });
  } catch (err) {
    console.error("resetPassword", err);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};
const forgetPassword = async (req, res) => {
  try {
    const { error } = forgetPasswordValidation(req.body);
    if (error)
      return res.status(400).json({
        responseCode: 400,
        success: false,
        message: error.details[0].message,
        data: {},
      });

    const user = await userModel.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({
        responseCode: 400,
        success: false,
        message: "User not found",
        data: {},
      });

    if (user && (user.login_type == "google" || user.login_type == "facebook"))
      return res.json({
        success: false,
        message: req.__("User registered using social login"),
        data: {},
      });
    let otp = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);
    console.log(otp);
    let tempToken = await generateTempTokens({
      email: req.body.email,
      otp: otp,
      type: "forgot",
    });

    const resultCheck = await sendEmail(
      user.name,
      user.email,
      "OTP verification code",
      `<p>Your OTP to verify the account - ${otp}</p>`
    );
    console.log("ADJSNKJD ", resultCheck);
    res.status(200).json({
      responseCode: 200,
      success: true,
      message: "OTP sent successfully, please check Mail",
      data: { otp: otp, accessToken: tempToken.accessToken },
    });
  } catch (err) {
    console.error("forgetPassword", err);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const login = async (req, res) => {
  try {
    const { error } = loginValidation(req.body);
    if (error)
      return res.status(400).json({
        responseCode: 400,
        success: false,
        message: error.details[0].message,
        data: {},
      });

    const user = await userModel.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).json({
        responseCode: 401,
        success: false,
        message: "Invalid email or password",
        data: {},
      });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).json({
        responseCode: 401,
        success: false,
        message: "Invalid email or password",
        data: {},
      });

    await userModel.findOneAndUpdate(
      { email: req.body.email },
      { $set: { fcmToken: req.body.fcmToken } }
    );
    switch (user.isStatus) {
      case "pending":
        let otp = (Math.floor(Math.random() * 10000) + 10000)
          .toString()
          .substring(1);
        console.log(otp);
        let tempToken = await generateTempTokens({
          email: req.body.email,
          otp: otp,
          type: "login",
        });
        return res.status(200).json({
          responseCode: 200,
          success: true,
          message: "Verify your account",
          data: {
            otp: otp,
            accessToken: tempToken.accessToken,
          },
        });

      case "active":
        let accessToken = await generateTokens({
          id: user._id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          company_name: user.company_name,
          position: user.position,
          role: user.role,
        });

        return res.status(200).json({
          responseCode: 200,
          success: true,
          message: "Successfully logged in",
          data: {
            accessToken: accessToken.accessToken,
            isStatus: user.isStatus,
          },
        });

      case "deleted":
        return res.status(401).json({
          responseCode: 401,
          success: false,
          message: "Your account has been deleted.",
          data: {},
        });

      case "blocked":
      default:
        return res.status(401).json({
          responseCode: 401,
          success: false,
          message:
            "Your account is deactivated by admin, please contact admin.",
          data: {},
        });
    }
  } catch (err) {
    console.error("login", err);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await userModel.findOne({
      _id: new mongoose.Types.ObjectId(req.user.id),
    });

    return res.status(200).json({
      responseCode: 200,
      success: true,
      message: "get profile successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("login", error);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { error } = updateProfileValidation(req.body);
    if (error)
      return res.status(400).json({
        responseCode: 400,
        success: false,
        message: error.details[0].message,
        data: {},
      });

    var updateData = {
      name: req.body.name,
      company_name: req.body.company_name,
      email: req.body.email,
      phone: req.body.phone,
      position: req.body.position,
    };
    if (req.file) {
      updateData["image"] = req.file.path;
    }
    console.log(req.user.id);
    const user = await userModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.user.id) },
      { $set: updateData },
      { new: true }
    );
    console.log(user);
    if (user) {
      return res.status(200).json({
        responseCode: 200,
        success: true,
        message: "Profile updated successfully",
        data: user,
      });
    } else {
      return res.status(400).json({
        responseCode: 400,
        success: false,
        message: "User not found",
        data: user,
      });
    }
  } catch (err) {
    console.error("updateProfile", err);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const changePassword = async (req, res) => {
  try {
    if (req.body.old_password == req.body.new_password)
      return res.status(400).json({
        responseCode: 400,
        success: false,
        message: "New password can not be same as old password.",
        data: {},
      });
    const { error } = changePasswordValidation(req.body);
    if (error)
      return res.status(400).json({
        responseCode: 400,
        success: false,
        message: error.details[0].message,
        data: {},
      });

    const user = await userModel.findOne({
      _id: new mongoose.Types.ObjectId(req.user.id),
    });
    const validPassword = await bcrypt.compare(
      req.body.old_password,
      user.password
    );
    if (!validPassword || !user)
      return res.status(400).json({
        responseCode: 400,
        success: false,
        message: "Please enter correct old password",
        data: {},
      });
    let passwordHash = await bcrypt.hash(
      req.body.new_password,
      Number(process.env.BCRYPT_SALTROUND)
    );

    await userModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.user.id) },
      { $set: { password: passwordHash } }
    );

    return res.status(200).json({
      responseCode: 200,
      success: true,
      message: "Your password has been updated successfully",
      data: {},
    });
  } catch (err) {
    console.error("changePassword", err);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

//user auth end ///

//order management
const getBucket = async (req, res) => {
  try {
    const result = await bucketModel
      .find({ catStatus: { $nq: "Inactive" } })
      .populate("category")
      .populate("client");
    if (result) {
      return res.status(200).json({
        responseCode: 200,
        success: true,
        message: "Bucket list fetched successfully.",
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const createRequest = async (req, res) => {
  try {
    console.log("req.body", req.user);
    const { error } = createRequestValidation(req.body);
    if (error)
      return res.status(400).json({
        responseCode: 400,
        success: false,
        message: error.details[0].message,
        data: {},
      });
    if (!req.body.bucketInfo || req.body.bucketInfo.length === 0) {
      return res.status(400).json({
        responseCode: 400,
        success: false,
        message: "Bucket ids are required.",
        data: { bucketIds: [] },
      });
    }

    let bucketArr;
    try {
      bucketArr = JSON.parse(req.body.bucketInfo);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        responseCode: 500,
        success: false,
        message: "Internal server error",
        data: {},
      });
    }
    console.log("bucketArr", bucketArr);
    // Set file location if provided
    let location = req.file ? req.file.path : undefined;

    // Iterate over each bucket id and create a request
    const createBucketPromises = bucketArr.map(async (id) => {
      try {
        const objectId = new mongoose.Types.ObjectId(id);
        const bucket = await bucketModel.findById(objectId);

        return requestModel({
          bucketInfo: id,
          company_name: req.body.company_name,
          company_employee: req.body.company_employee,
          job_title: req.body.job_title,
          email: req.body.email,
          phone: req.body.phone,
          work_scope: req.body.work_scope,
          location,
          cost_code: req.body.cost_code,
          requested_date: req.body.requested_date,
          userInfo: req.user.id,
          client: bucket?.client,
          purchase_order: req.body.purchase_order,
        }).save();
      } catch (err) {
        console.error(`Failed to process bucket with id ${id}:`, err);
        throw err;
      }
    });
    if (createBucketPromises) {
      return res.status(200).json({
        responseCode: 200,
        success: true,
        message: "Request Submitted successfully.",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const sendInvoice = async (req, res) => {
  try {
    if (req.user.id) {
      const request = await requestModel
        .find({ userInfo: req.user.id })
        .populate("bucketInfo");
      if (request) {
        return res.status(200).json({
          responseCode: 200,
          success: true,
          message: "Invoice get successfully.",
          data: request,
        });
      } else {
        return res.status(400).json({
          responseCode: 400,
          success: false,
          message: "No request found.",
          data: request,
        });
      }
    }
  } catch (error) {
    console.error("singUp", err);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const getBucketCat = async (req, res) => {
  try {
    const bucketCat = await bucketCatModel.find({ status: "Active" });
    if (bucketCat) {
      return res.status(200).json({
        responseCode: 200,
        success: true,
        message: "Bucket categories list fetched successfully.",
        data: bucketCat,
      });
    } else {
      return res.status(400).json({
        responseCode: 400,
        success: true,
        message: "Bucket category not found.",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};
const getBucketByCat = async (req, res) => {
  try {
    // Extract id and search from query parameters
    const { id, search } = req.query;
    console.log("search", search);
    // Define the base filter object
    let filter = { catStatus: "Active" };

    // Apply category filter if id is provided and valid
    if (id) {
      if (id === "msa") {
        const bucketmsa = await requestModel
          .find({ userInfo: req.user.id, isStatus: "Approved" })
          .populate({
            path: "bucketInfo",
            populate: [{ path: "category" }, { path: "client" }],
          });

        const bucketIds = bucketmsa.map((item) => item.bucketInfo);

        // Return the populated bucketmsa list if found
        return bucketIds.length > 0
          ? res.status(200).json({
              responseCode: 200,
              success: true,
              message: "Bucket MSA list fetched successfully.",
              data: bucketIds,
            })
          : res.status(400).json({
              responseCode: 400,
              success: false,
              message: "No active buckets found for msa.",
              data: [],
            });
      }

      // Validate id for other cases
      if (mongoose.Types.ObjectId.isValid(id)) {
        filter.category = new mongoose.Types.ObjectId(id);
      } else {
        return res.status(400).json({
          responseCode: 400,
          success: false,
          message: "Invalid category id",
          data: [],
        });
      }
    }

    // Apply search filter if provided
    if (search) {
      // Use regex to perform a case-insensitive partial match
      filter.name = { $regex: search, $options: "i" };
    }

    // Fetch buckets based on filters
    const buckets = await bucketModel
      .find(filter)
      .populate("client")
      .populate("category")
      .populate({
        path: "subcategories",
        model: "Subcategory",
        select: "_id name",
      });

    // Return the fetched bucket list if found
    return buckets && buckets.length > 0
      ? res.status(200).json({
          responseCode: 200,
          success: true,
          message: "Buckets fetched successfully.",
          data: buckets,
        })
      : res.status(400).json({
          responseCode: 400,
          success: false,
          message: "No buckets found for the given criteria.",
          data: [],
        });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

// const getBucketByCat = async (req, res) => {
//   try {
//     if (req?.query?.id) {
//       if (req?.query?.id === "msa") {
//         console.log("Fetching MSA buckets");
//         const bucketmsa = await requestModel
//           .find({ userInfo: req.user.id, isStatus: "Approved" })
//           .populate({
//             path: "bucketInfo",
//             populate: [{ path: "category" }, { path: "client" }],
//           });

//         const bucketIds = bucketmsa.map((item) => item.bucketInfo);

//         // Return the populated bucketmsa list if found
//         if (bucketIds.length > 0) {
//           return res.status(200).json({
//             responseCode: 200,
//             success: true,
//             message: "Bucket MSA list fetched successfully.",
//             data: bucketIds,
//           });
//         } else {
//           return res.status(400).json({
//             responseCode: 400,
//             success: false,
//             message: "No active buckets found for msa.",
//             data: [],
//           });
//         }
//       }
//       const bucket = await bucketModel
//         .find({
//           category: new mongoose.Types.ObjectId(req.query.id),
//         })
//         .populate("client")
//         .populate("category");

//       // Return the fetched bucket list if found
//       if (bucket && bucket.length > 0) {
//         return res.status(200).json({
//           responseCode: 200,
//           success: true,
//           message: "Bucket categories list fetched successfully.",
//           data: bucket,
//         });
//       } else {
//         return res.status(400).json({
//           responseCode: 400,
//           success: false,
//           message: "No buckets found for the given category.",
//           data: [],
//         });
//       }
//     } else {
//       // If no id is provided in the query
//       return res.status(400).json({
//         responseCode: 400,
//         success: false,
//         message: "Category id is required",
//         data: {},
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       responseCode: 500,
//       success: false,
//       message: "Internal Server Error",
//       data: {},
//     });
//   }
// };

///client management
const clientSingUp = async (req, res) => {
  console.log(req.body);
  try {
    const { error } = clientSingUpValidation(req.body);
    if (error)
      return res.status(400).json({
        responseCode: 400,
        success: false,
        message: error.details[0].message,
        data: {},
      });

    let passwordHash = await bcrypt.hash(
      req.body.password,
      Number(process.env.BCRYPT_SALTROUND)
    );
    const isExist = await clientModel.findOne({ email: req.body.email });
    console.log("isExist", isExist);
    if (isExist) {
      return res.status(400).json({
        responseCode: 400,
        success: false,
        message: "Email must be unique.",
        data: {},
      });
    }
    let clientObj = {
      name: req.body.name,
      company_name: req.body.company_name,
      email: req.body.email,
      phone: req.body.phone,
      password: passwordHash,
      address: req.body.address,
      company_information: req.body.company_information,
      job_title: req.body.job_title,
      category: req.body.category,
      sales_person: req.body.sales_person,
      website: req.body.website,
      city_zip: req.body.city_zip,
      fcmToken: req.body.fcmToken,
      isStatus: "active",
    };

    const client = await clientModel(clientObj).save();
    if (client) {
      return res.status(200).json({
        responseCode: 200,
        success: true,
        message: "Client created successfully.",
        data: client,
      });
    }
    await sendEmail(
      req.body.name,
      req.body.email,
      "OTP verification code",
      `<p>Your OTP to verify the account </p>`
    );
  } catch (err) {
    console.error("singUp", err);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const getRequest = async (req, res) => {
  try {
    if (req.user) {
      const requsets = await requestModel.find({
        userInfo: req.user.id,
      });
      return res.status(200).json({
        responseCode: 200,
        success: true,
        message: "Requests get successfully",
        data: requsets,
      });
    } else {
      return res.status(400).json({
        responseCode: 400,
        success: false,
        message: "User not found",
        data: {},
      });
    }
  } catch (error) {
    console.error("singUp", err);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};
const getRequestDetail = async (req, res) => {
  try {
    if (req.user) {
      const requsets = await requestModel
        .findOne({
          userInfo: req.user.id,
          _id: req.query.id,
        })
        .populate("client")
        .populate("bucketInfo");
      return res.status(200).json({
        responseCode: 200,
        success: true,
        message: "Request detail get successfully",
        data: requsets,
      });
    } else {
      return res.status(400).json({
        responseCode: 400,
        success: false,
        message: "Request not found",
        data: {},
      });
    }
  } catch (error) {
    console.error("singUp", err);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

///faq
const getFaq = async (req, res) => {
  try {
    const faq = await FaqModel.find();
    return res.status(200).json({
      responseCode: 200,
      success: true,
      message: "FAQ get successfully",
      data: faq,
    });
  } catch (error) {
    console.error("singUp", err);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

//Notification
//Notification functionality
const deleteNotification = async (req, res) => {
  try {
    if (req.query.id === "") {
      await notificationModel.deleteMany({});
      return res.status(200).json({
        responseCode: 200,
        success: true,
        message: "Notifications deleted successfully",
        data: {},
      });
    }
    await notificationModel.deleteOne({ _id: req.query.id });
    return res.status(200).json({
      responseCode: 200,
      success: true,
      message: "Notification deleted successfully",
      data: {},
    });
  } catch (err) {
    console.error("requestcount", err);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};
module.exports = {
  singUp,
  verifyOtp,
  resendOtpMail,
  forgetPassword,
  login,
  getProfile,
  updateProfile,
  getBucket,
  createRequest,
  getBucketByCat,
  getBucketCat,
  clientSingUp,
  sendInvoice,
  changePassword,
  getRequest,
  resetPassword,
  getRequestDetail,
  getFaq,
  deleteNotification,
};
