//models
const serviceModel = require("../../models/serviceModel");
const userModel = require("../../models/userModel");
const clientModel = require("../../models/clientModel");
const salesPersonModel = require("../../models/salesPersonModel");
const businessCategoryModel = require("../../models/businesscategoryModel");
const bucketModel = require("../../models/bucketModel");
const EmployeeModel = require("../../models/employeeModel");
const invoiceModel = require("../../models/invoiceModel");
const cmsModel = require("../../models/cmsModel");
const subCategoriesModel = require("../../models/subCategoryModel");

const PDFDocument = require("pdfkit");
// const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

//validation
const {
  forgetPasswordValidation,
  verifyOtpValidation,
  changePasswordValidation,
  resetPasswordValidation,
  loginValidation,
} = require("../../helpers/commonValidator");
const {
  singUpValidation,
  updateProfileValidation,
} = require("../../helpers/userValidationSchema");

const bcrypt = require("bcrypt");
const { sendEmail, sendInvoiceMail } = require("../../library/sendEmail");
const { mongoose } = require("mongoose");
const {
  generateTempTokens,
  generateTokens,
} = require("../../helpers/generateTokens");
const {
  clientSingUpValidation,
  clientUpdateProfileValidation,
} = require("../../helpers/clientValidation");
const requestModel = require("../../models/requestModel");

//client auth //

const verifyOtp = async (req, res) => {
  try {
    const { error } = verifyOtpValidation(req.body);
    if (error)
      return res.json({
        success: false,
        message: error.details[0].message,
        data: {},
      });
    // console.log('verifyOtp', req.userTemp, req.user)
    if (req.body.otp != req.userTemp.otp) {
      res.json({
        success: false,
        message: "Please enter the valid code",
        data: {},
      });
    }

    const client = await clientModel.findOneAndUpdate(
      { email: req.userTemp.email },
      { $set: { isStatus: "active" } }
    );

    let accessToken = "";
    if (req.userTemp.type == "signup") {
      accessToken = await generateTokens({
        id: client._id,
        email: client.email,
        phone: client.phone,
        company_name: client.company_name,
        catewgory: client.category,
      });

      await sendEmail(
        client.name,
        client.email,
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
        id: client._id,
        email: client.email,
        phone: client.phone,
        role: client.role,
      });
    }

    res.json({
      success: true,
      message: "OTP verified sucessfully",
      data: accessToken,
    });
  } catch (err) {
    console.error("verifyOtp", err);
    return res.json({
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

    return res.json({
      success: true,
      message: "OTP has been sent to your registered email Id",
      data: { otp: otp, accessToken: tempToken.accessToken },
    });
  } catch (err) {
    console.error("resendOtpMail", err);
    return res.json({
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
      return res.json({
        success: false,
        message: error.details[0].message,
        data: {},
      });

    const user = await clientModel.findOne({ email: req.body.email });
    if (!user)
      return res.json({
        success: false,
        message: "User not found",
        data: {},
      });

    if (user && (user.login_type == "google" || user.login_type == "facebook"))
      return res.json({
        success: false,
        message: "User registered using social login",
        data: {},
      });
    let otp = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);

    let tempToken = await generateTempTokens({
      email: req.body.email,
      otp: otp,
      type: "forgot",
    });

    await sendEmail(
      user.name,
      user.email,
      "OTP verification code",
      `<p>Your OTP to verify the account - ${otp}</p>`
    );
    res.json({
      success: true,
      message: "OTP sent successfully, please check Mail",
      data: { otp: otp, accessToken: tempToken.accessToken },
    });
  } catch (err) {
    console.error("forgetPassword", err);
    return res.json({
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
      return res.json({
        success: false,
        message: error.details[0].message,
        data: {},
      });

    const client = await clientModel.findOne({ email: req.body.email });
    console.log(client);
    if (!client)
      return res.json({
        success: false,
        message: "Invalid email or password",
        data: {},
      });

    const validPassword = await bcrypt.compare(
      req.body.password,
      client.password
    );
    if (!validPassword)
      return res.json({
        success: false,
        message: "Invalid email or password",
        data: {},
      });

    await clientModel.findOneAndUpdate(
      { email: req.body.email },
      { $set: { fcmToken: req.body.fcmToken } }
    );

    if (client.isStatus === "active" && client.isApproved === "true") {
      let accessToken = await generateTokens({
        id: client._id,
        email: client.email,
        name: client.name,
        phone: client.phone,
        company_name: client.company_name,
        category: client.category,
      });

      return res.json({
        success: true,
        message: "Successfully logged in",
        data: {
          accessToken: accessToken.accessToken,
          isStatus: client.isStatus,
          client: client,
        },
      });
    }
    if (client.isStatus === "pending") {
      let otp = (Math.floor(Math.random() * 10000) + 10000)
        .toString()
        .substring(1);
      let tempToken = await generateTempTokens({
        email: req.body.email,
        otp: otp,
        type: "login",
      });
      return res.json({
        success: true,
        message: "Verify your account",
        data: {
          otp: otp,
          accessToken: tempToken.accessToken,
        },
      });
    } else if (client.isStatus === "active" && client.isApproved === "true") {
      console.log("apporove");
      let accessToken = await generateTokens({
        id: client._id,
        email: client.email,
        name: client.name,
        phone: client.phone,
        company_name: client.company_name,
        category: client.category,
      });

      return res.json({
        success: true,
        message: "Successfully logged in",
        data: {
          accessToken: accessToken.accessToken,
          isStatus: client.isStatus,
          client: client,
        },
      });
    } else {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "Your account is not approved by admin, please contact admin.",
        data: {},
      });
    }
  } catch (err) {
    console.error("login", err);
    return res.json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const client = await clientModel.findOne({
      _id: new mongoose.Types.ObjectId(req.user.id),
    });

    return res.json({
      success: true,
      message: "get profile successfully",
      data: {
        client,
      },
    });
  } catch (error) {
    console.error("login", error);
    return res.json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { error } = clientUpdateProfileValidation(req.body);
    if (error)
      return res.json({
        success: false,
        message: error.details[0].message,
        data: {},
      });

    var updateData = {
      name: req.body.name,
      company_name: req.body.company_name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      company_information: req.body.company_information,
      job_title: req.body.job_title,
      category: req.body.category,
      sales_person: req.body.sales_person,
      website: req.body.website,
      city_zip: req.body.city_zip,
    };

    if (req.file) {
      updateData["profile_pic"] = req.file.path;
    }

    const user = await clientModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.user.id) },
      { $set: updateData },
      { new: true }
    );
    if (user) {
      return res.json({
        success: true,
        message: "Profile updated successfully",
        data: user,
      });
    } else {
      return res.json({
        success: false,
        message: "User not found",
        data: user,
      });
    }
  } catch (err) {
    console.error("updateProfile", err);
    return res.json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { error } = resetPasswordValidation(req.body);
    if (error)
      return res.json({
        success: false,
        message: error.details[0].message,
        data: {},
      });

    let passwordHash = await bcrypt.hash(
      req.body.password,
      Number(process.env.BCRYPT_SALTROUND)
    );

    await clientModel.updateOne(
      { email: req.userTemp.email },
      { $set: { password: passwordHash } }
    );

    return res.json({
      success: true,
      message: "Passsword reset successfully",
      data: {},
    });
  } catch (err) {
    console.error("resetPassword", err);
    return res.json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const changePassword = async (req, res) => {
  try {
    if (req.body.old_password == req.body.new_password)
      return res.json({
        success: false,
        message: "New password can not be same as old password.",
        data: {},
      });
    const { error } = changePasswordValidation(req.body);
    if (error)
      return res.json({
        success: false,
        message: error.details[0].message,
        data: {},
      });
    const client = await clientModel.findOne({
      _id: new mongoose.Types.ObjectId(req.user.id),
    });
    const validPassword = await bcrypt.compare(
      req.body.old_password,
      client.password
    );
    if (!validPassword || !client)
      return res.json({
        success: false,
        message: "Please enter correct old password",
        data: {},
      });
    let passwordHash = await bcrypt.hash(
      req.body.new_password,
      Number(process.env.BCRYPT_SALTROUND)
    );

    await clientModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.user.id) },
      { $set: { password: passwordHash } }
    );

    return res.json({
      success: true,
      message: "Your password has been updated successfully",
      data: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};
//user auth end ///

//client crud from admin
const getClient = async (req, res) => {
  try {
    let match = {};
    let page =
      req.query.page && parseInt(req.query.page) > 0
        ? parseInt(req.query.page) - 1
        : 0;
    let record =
      req.query.record && parseInt(req.query.record) > 0
        ? parseInt(req.query.record)
        : 10;
    if (req.query.search) {
      match = {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      };
    }
    let totalClients = await clientModel.countDocuments(match);
    let List = await clientModel
      .find(
        match,
        {},
        { skip: record * page, limit: record, sort: { createdAt: -1 } }
      )
      .populate("category")
      .populate("sales_person");
    return res.status(200).json({
      success: true,
      msg: "Client list getting successfully.",
      data: { List: List, totalPages: Math.ceil(totalClients / record) },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const clientStatus = async (req, res) => {
  try {
    let id = req.body.id;
    let status = req.body.status;
    let client = await clientModel.findByIdAndUpdate(id, {
      isStatus: status,
    });
    return res.json({
      success: true,
      message: "Status updated succefully.",
      data: client,
    });
  } catch (error) {
    console.error("updateProfile", error);
    return res.json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};
const updateAdminClient = async (req, res) => {
  try {
    const { error } = clientUpdateProfileValidation(req.body);
    if (error)
      return res.json({
        success: false,
        message: error.details[0].message,
        data: {},
      });
    const existingEmployee = await clientModel.findOne({
      email: req.body.email,
      _id: { $ne: req.body.id }, // exclude current employee's ID
    });

    if (existingEmployee) {
      return res.json({
        success: false,
        message: "Email is already in use by another client",
        data: {},
      });
    }
    var updateData = {
      name: req.body.name,
      company_name: req.body.company_name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      company_information: req.body.company_information,
      job_title: req.body.job_title,
      category: req.body.category,
      sales_person: req.body.sales_person,
      website: req.body.website,
      city_zip: req.body.city_zip,
    };

    if (req.file) {
      updateData["profile_pic"] = req.file.path;
    }

    const user = await clientModel
      .findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(req.body.id) },
        { $set: updateData },
        { new: true }
      )
      .populate("category")
      .populate("sales_person");
    if (user) {
      return res.json({
        success: true,
        message: "Profile updated successfully",
        data: user,
      });
    } else {
      return res.json({
        success: false,
        message: "User not found",
        data: user,
      });
    }
  } catch (err) {
    console.error("updateProfile", err);
    return res.json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};
const addClient = async (req, res) => {
  try {
    const { error } = clientUpdateProfileValidation(req.body);
    if (error)
      return res.json({
        success: false,
        message: error.details[0].message,
        data: {},
      });

    const client = await clientModel.findOne({ email: req.body.email });
    if (client) {
      return res.json({
        success: false,
        message: "Email already registered",
        data: client,
      });
    }
    let passwordHash = await bcrypt.hash(
      req.body.password,
      Number(process.env.BCRYPT_SALTROUND)
    );
    var Obj = {
      name: req.body.name,
      password: passwordHash,
      company_name: req.body.company_name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      company_information: req.body.company_information,
      job_title: req.body.job_title,
      category: req.body.category,
      sales_person: req.body.sales_person,
      website: req.body.website,
      city_zip: req.body.city_zip,
      isStatus: "active",
    };

    if (req.file) {
      Obj["profile_pic"] = req.file.path;
    }

    const user = await clientModel(Obj).save();
    if (user) {
      await sendEmail(
        user.name,
        user.email,
        "Bucket list Client",
        `<p>Client created successfully. Your mail and password mentioned below<br/>
         Email:- ${user.email}
         Password :- ${req.body.password}
        </p>`
      );
      return res.json({
        success: true,
        message: "Client added successfully",
        data: user,
      });
    } else {
      return res.json({
        success: false,
        message: "Client not found",
        data: user,
      });
    }
  } catch (err) {
    console.error("updateProfile", err);
    return res.json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

//service
const getService = async (req, res) => {
  console.log("tyyutyu");
  try {
    const result = await serviceModel.find();
    if (result) {
      return res.json({
        success: true,
        message: "Service get successfully.",
        data: result,
      });
    } else {
      return res.json({
        success: false,
        message: "Not found.",
        data: user,
      });
    }
  } catch (error) {
    console.error("updateProfile", error);
    return res.json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

//end service

//business catgory
const getBusinessCategory = async (req, res) => {
  try {
    const result = await businessCategoryModel.find();
    if (result) {
      return res.status(200).json({
        responseCode: 200,
        success: true,
        message: "Business category get successfully.",
        data: result,
      });
    } else {
      return res.status(400).json({
        responseCode: 400,
        success: false,
        message: "Not found.",

        data: user,
      });
    }
  } catch (error) {
    console.error("updateProfile", error);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};
//sale peroson
const getSalesPerson = async (req, res) => {
  // try {
  //   const result = await salesPersonModel.find();
  //   if (result) {
  //     return res.json({
  //       success: true,
  //       message: "Person get successfully.",
  //       data: result,
  //     });
  //   } else {
  //     return res.json({
  //       success: false,
  //       message: "Not found.",
  //       data: user,
  //     });
  //   }
  // } catch (error) {
  //   console.error("updateProfile", error);
  //   return res.json({
  //     success: false,
  //     message: "Internal Server Error",
  //     data: {},
  //   });
  // }
  try {
    const result = await EmployeeModel.find({ isStatus: "active" });
    if (result) {
      return res.status(200).json({
        responseCode: 200,
        success: true,
        message: "Person get successfully.",
        data: result,
      });
    } else {
      return res.status(400).json({
        responseCode: 400,
        success: false,
        message: "Not found.",
        data: user,
      });
    }
  } catch (error) {
    console.error("updateProfile", error);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};
//end sale person

//service/bucket

const addService = async (req, res) => {
  const { name, price, description, category, subcategory } = req.body;

  try {
    const bucketColor = await serviceModel.findById({ _id: category });
    const subCatId = [];
    for (item of subcategory) {
      console.log("item.id", item.id);
      subCatId.push(item.id);
    }
    const obj = {
      name,
      price,
      description,
      category,
      client: req.user.id,
      color: bucketColor?.color,
      subcategories: subCatId,
    };
    const result = await bucketModel(obj).save();
    if (result) {
      return res.status(200).json({
        responseCode: 200,
        success: true,
        message: "Bucket added successfully.",
        data: result,
      });
    }
  } catch (error) {
    console.error("updateProfile", error);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const updateService = async (req, res) => {
  const { name, price, description, category, subcategory } = req.body;

  // try {
  //   const bucketColor = await serviceModel.findById({ _id: category });
  //   const subCatId = [];
  //   for (item of subcategory) {
  //     console.log("item.id", item.id);
  //     subCatId.push(item.id);
  //   }
  //   const obj = {
  //     name,
  //     price,
  //     description,
  //     category,
  //     client: req.user.id,
  //     color: bucketColor?.color,
  //     subcategories: subCatId,
  //   };
  //   const result = await bucketModel(obj).save();
  //   if (result) {
  //     return res.status(200).json({
  //       responseCode: 200,
  //       success: true,
  //       message: "Bucket added successfully.",
  //       data: result,
  //     });
  //   }
  // } catch (error) {
  //   console.error("updateProfile", error);
  //   return res.status(500).json({
  //     responseCode: 500,
  //     success: false,
  //     message: "Internal Server Error",
  //     data: {},
  //   });
  // }
};

const getBucket = async (req, res) => {
  try {
    let match = { client: req.user.id };
    let page =
      req.query.page && parseInt(req.query.page) > 0
        ? parseInt(req.query.page) - 1
        : 0;
    let record =
      req.query.record && parseInt(req.query.record) > 0
        ? parseInt(req.query.record)
        : 10;

    if (req.query.search) {
      match["$or"] = [{ name: { $regex: req.query.search, $options: "i" } }];
    }

    if (
      req.query.category &&
      mongoose.Types.ObjectId.isValid(req.query.category)
    ) {
      match["category"] = req.query.category;
    }

    let totalBucket = await bucketModel.countDocuments(match);
    const result = await bucketModel
      .find(match)
      .skip(page * record)
      .limit(record)
      .populate("category")
      .populate({
        path: "subcategories",
        model: "Subcategory",
      });
    // console.log("result",result);
    if (result) {
      return res.json({
        total: totalBucket,
        page: page,
        record: record,
        totalPages: Math.ceil(totalBucket / record),
        success: true,
        message: "Bucket list fetched successfully.",
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

//get sub category

const getSubCat = async (req, res) => {
  try {
    const { id } = req.query;

    // Fetch subcategories based on category id
    const subCat = await subCategoriesModel.find({ category: id });
    console.log(subCat);

    // Check if no subcategories were found (empty array)
    if (subCat.length === 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Sub category not found",
        data: {},
      });
    } else {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Sub category list fetched successfully.",
        data: subCat,
      });
    }
  } catch (error) {
    console.error("Error in getSubCat", error);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const getBucketCount = async (req, res) => {
  try {
    // Count documents where cid matches
    let totalBucket = await bucketModel.countDocuments({ client: req.user.id });

    return res.status(200).json({
      responseCode: 200,
      success: true,
      message: "Bucket count retrieved successfully",
      data: totalBucket,
    });
  } catch (error) {
    console.error("getBucketCount", error);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const approveClient = async (req, res) => {
  try {
    const id = req.body.id;
    if (!id) {
      return res.json({
        success: false,
        message: "id required",
        data: {},
      });
    } else {
      const result = await clientModel
        .findByIdAndUpdate(id, {
          $set: { isApproved: "true" },
        })
        .populate("category")
        .populate("sales_person");
      if (result) {
        return res.json({
          success: true,
          message: "Approved successfully.",
          data: result,
        });
      } else {
        return res.json({
          success: false,
          message: "Something went wrong.",
          data: {},
        });
      }
    }
  } catch (error) {
    console.error("updateProfile", error);
    return res.json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const getRequest = async (req, res) => {
  try {
    let match = {
      client: req.user.id,
      isStatus: { $ne: "Pending" },
    };
    let page =
      req.query.page && parseInt(req.query.page) > 0
        ? parseInt(req.query.page) - 1
        : 0;
    let record =
      req.query.record && parseInt(req.query.record) > 0
        ? parseInt(req.query.record)
        : 10;
    if (req.query.search) {
      match = {
        $and: [
          { client: req.user.id },
          { isStatus: { $ne: "Pending" } },
          {
            $or: [
              {
                request_id: { $regex: req.query.search, $options: "i" },
              },
              { company_name: { $regex: req.query.search, $options: "i" } },
            ],
          },
        ],
      };
    }

    let totalRequest = await requestModel.countDocuments(match);

    let List = await requestModel
      .find(
        match,
        {},
        { skip: record * page, limit: record, sort: { createdAt: -1 } }
      )
      .populate({
        path: "bucketInfo",
        populate: { path: "category" },
      })
      .populate("client")
      .populate("userInfo");

    return res.status(200).json({
      success: true,
      msg: "Request list retrieved successfully.",
      data: { List: List, totalPages: Math.ceil(totalRequest / record) },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

/// invoice functionality
const updateRequestStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    // console.log("Request Body:", req.body);

    if (id && status) {
      // console.log(`Received status: ${status}, id: ${id}`);

      if (status === "Completed") {
        const request = await requestModel
          .findById(id)
          .populate("userInfo")
          .populate("bucketInfo");

        if (request) {
          if (request.userInfo && request.bucketInfo) {
            // console.log(
            //   request.userInfo._id,
            //   request.userInfo.name,
            //   request.userInfo.email,
            //   request.bucketInfo.name,
            //   // request.bucketInfo.price
            // // );

            // Generate PDF dynamically
            const pdfPath = await generateInvoicePdf(
              request.userInfo._id,
              request.userInfo.name,
              request.userInfo.email,
              request._id, // Add request_id here instead of requestId
              request.bucketInfo.name,
              request.bucketInfo.price // Ensure it's price or cost depending on your schema
            );

            // console.log("PDF generated at:", pdfPath);
            const filePath = pdfPath.substring(pdfPath.indexOf("public"));
            if (!pdfPath) {
              console.error("PDF path not generated. Aborting email.");
              return res.status(500).json({
                success: false,
                message: "PDF generation failed.",
              });
            }

            // Send email with PDF attachment
            // console.log("Sending email...");
            const info = await sendInvoiceMail(
              request.userInfo.name,
              request.userInfo.email,
              "Thank you for joining us",
              `<p>Thank you for verifying your account. Please find your PDF attached.</p>`,
              pdfPath
            );
            if (pdfPath && info) {
              // new mongoose.Types.ObjectId(req.user.id)
              console.log("req.user.id", req.user.id);
              const data = {
                userInfo: new mongoose.Types.ObjectId(request.userInfo._id),
                invoice: filePath,
              };
              await invoiceModel(data).save();
            }
            console.log("Email sent info:", info);

            // Delete the generated PDF file after sending the email
            // fs.unlinkSync(pdfPath);
            // console.log("PDF file deleted.");
          } else {
            console.log("User info or bucket info not found in the request.");
            return res.status(404).json({
              success: false,
              message: "User info or bucket info not found.",
            });
          }
        } else {
          console.log("Request not found.");
          return res.status(404).json({
            success: false,
            message: "Request not found.",
          });
        }
      }

      // Update the request status
      const updateStatus = await requestModel.findByIdAndUpdate(id, {
        $set: { isStatus: status },
      });

      if (updateStatus) {
        return res.json({
          success: true,
          message: "Request status updated.",
          data: updateStatus,
        });
      } else {
        return res.json({
          success: false,
          message: "Request not found.",
          data: {},
        });
      }
    } else {
      return res.json({
        success: false,
        message: "Request id or status is required.",
        data: [],
      });
    }
  } catch (error) {
    console.error("updateRequestStatus error:", error);
    return res.json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const generateInvoicePdf = async (
  userId,
  name,
  email,
  requestId,
  bucketName,
  cost
) => {
  return new Promise((resolve, reject) => {
    try {
      // Define the 'public/invoices' directory path dynamically
      const invoicesDir = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "invoices"
      );

      // Ensure the invoices directory exists
      if (!fs.existsSync(invoicesDir)) {
        console.log("Creating invoices directory...");
        fs.mkdirSync(invoicesDir, { recursive: true });
      }

      // Define the file path for the generated PDF
      const filePath = path.join(invoicesDir, `${userId}.pdf`); // Using userId and timestamp for unique names
      console.log("Generated file path:", filePath); // Log the generated file path

      // Create a new PDF document
      const doc = new PDFDocument();

      // Pipe the document to the file (this will save the PDF in the specified file path)
      const writeStream = fs.createWriteStream(filePath);
      doc.pipe(writeStream);

      // Add content to the PDF
      doc.fontSize(25).text("Invoice", { align: "center" });
      doc.moveDown();
      doc.fontSize(16).text(`Name: ${name}`);
      doc.text(`Email: ${email}`);
      doc.text(`Request ID: ${requestId}`);
      doc.text(`Bucket Name: ${bucketName}`);
      doc.text(`Cost: $${cost}`);

      // End the PDF document
      doc.end();

      // Resolve the promise with the file path once the PDF is saved
      writeStream.on("finish", () => {
        console.log("PDF generation finished, filePath:", filePath);
        resolve(filePath); // Return the file path of the generated PDF
      });

      // Handle errors if they occur during PDF generation
      writeStream.on("error", (err) => {
        console.error("Error during write stream:", err);
        reject(err);
      });
    } catch (error) {
      console.error("Error in generateInvoicePdf:", error);
      reject(error);
    }
  });
};

const getInvoice = async (req, res) => {
  try {
    console.log(req.user.id);
    const invoicePaths = await invoiceModel.find({ userInfo: req.user.id });
    console.log(invoicePaths);
    return res.status(200).json({
      message: "Invoice files retrieved successfully",
      data: invoicePaths, // Array of relative file paths
    });
  } catch (err) {
    console.error("Error retrieving invoices:", err);
    return res.status(500).json({
      message: "Failed to retrieve invoices",
      data: [], // Empty array in case of error
    });
  }
};

const getRequestCount = async (req, res) => {
  try {
    let totalRequest = await requestModel.countDocuments({
      client: req.user.id,
      isStatus: { $ne: "Pending" },
    });

    return res.status(200).json({
      responseCode: 200,
      success: true,
      message: "Request count retrieved successfully",
      data: totalRequest,
    });
  } catch (error) {
    console.error("requestcount", error);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const deleteInvoice = async (req, res) => {};

//cms
const getCMS = async (req, res) => {
  try {
    const cms = await cmsModel.find();
    if (cms) {
      return res.status(200).json({
        success: true,
        message: "CMS get successfully",
        data: cms,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "content not found",
        data: {},
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

//get client
const getClientServices = async (req, res) => {
  try {
    const result = await bucketModel.find();
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Buckets get successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Bucket not found",
        data: {},
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};
module.exports = {
  getClientServices,
  verifyOtp,
  resendOtpMail,
  forgetPassword,
  login,
  getProfile,
  updateProfile,
  getService,
  getSalesPerson,
  approveClient,
  getClient,
  resetPassword,
  changePassword,
  clientStatus,
  getBusinessCategory,
  addService,
  getBucket,
  addClient,
  getRequest,
  updateRequestStatus,
  getBucketCount,
  getRequestCount,
  updateAdminClient,
  getInvoice,
  deleteInvoice,
  getCMS,
  getSubCat,
  updateService,
};
