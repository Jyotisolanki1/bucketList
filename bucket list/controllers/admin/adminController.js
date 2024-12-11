//models
const adminModel = require("../../models/adminModel");
const serviceModel = require("../../models/serviceModel");
const salesPersonModel = require("../../models/salesPersonModel");
const businessCategoryModel = require("../../models/businesscategoryModel");
const requestModel = require("../../models/requestModel");
const employeeModel = require("../../models/employeeModel");
const subCategoriesModel = require("../../models/subCategoryModel");

const {
  generateTokens,
  generateTempTokens,
} = require("../../helpers/generateTokens");
const { loginValidation } = require("../../helpers/adminValidationSchema");
const {
  forgetPasswordValidation,
  verifyOtpValidation,
  changePasswordValidation,
  resetPasswordValidation,
} = require("../../helpers/commonValidator");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../../library/sendEmail");
const mongoose = require("mongoose");
const pushNotification = require("../../library/pushNotification");
const bucketModel = require("../../models/bucketModel");

//libraries

// const pushNotification = require('../../library/pushNotification')
// const pushNotification = require('../librarys/pushNotification')

//auth //
const login = async (req, res) => {
  try {
    const { error } = loginValidation(req.body);
    if (error)
      return res.json({
        success: false,
        message: error.details[0].message,
        data: {},
      });
    let result = await adminModel.findOne({ email: req?.body?.email }, {});
    if (result != null) {
      const match = await bcrypt.compare(req.body.password, result.password);
      if (match) {
        params = {
          id: result._id,
          email: result.email,
          name: result.username,
          user_type: result.user_type,
        };

        const token = await generateTokens(params);
        result = JSON.parse(JSON.stringify(result));
        console.log(token);
        result.token = token;
        return res.status(200).json({
          success: true,
          message: "Logged in successfully.",
          data: result,
        });
      } else {
        //401 for unauthorized
        return res.status(401).json({
          success: false,
          message: "Invalid Email or Password.",
          data: {},
        });
      }
    } else {
      //401 for unauthorized
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password.",
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

const forgetPassword = async (req, res) => {
  try {
    const { error } = forgetPasswordValidation(req.body);
    if (error)
      return res.json({
        success: false,
        message: error.details[0].message,
        data: {},
      });

    const admin = await adminModel.findOne({ email: req.body.email });
    if (!admin)
      return res.status(404).json({
        success: false,
        message: "Mail not found",
        data: {},
      });

    let otp = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);
    let tempToken = await generateTempTokens({
      email: req.body.email,
      otp: otp,
      type: "admin",
    });

    await sendEmail(
      admin.name,
      admin.email,
      "OTP verification code",
      `<p>Your OTP to verify the account - ${otp}</p>`
    );
    res.json({
      success: true,
      message: "OTP sent successfully, please check Mail",
      data: { otp: otp, accessToken: tempToken.accessToken },
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
const verifyOtp = async (req, res) => {
  try {
    // Validate the OTP format (e.g., length, type)
    const { error } = verifyOtpValidation(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        data: {},
      });
    }

    // Check if the OTP matches
    if (req.body.otp !== req.userTemp.otp) {
      return res.status(400).json({
        success: false,
        message: "Please enter the valid code",
        data: {},
      });
    }

    // Generate access token if OTP is valid
    const accessToken = await generateTempTokens({
      email: req.userTemp.email,
      otp: req.userTemp.otp,
      type: "admin",
    });

    // Send success response with the generated access token
    if (accessToken) {
      return res.status(200).json({
        success: true,
        message: "OTP verified successfully",
        data: accessToken,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Token generation failed",
        data: {},
      });
    }
  } catch (error) {
    // Handle server errors
    return res.status(500).json({
      success: false,
      message: "Internal server error",
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
    console.log(req.userTemp);
    if (req.userTemp.type != "admin")
      return res.json({
        success: false,
        message: "Invalid token",
        data: {},
      });

    let passwordHash = await bcrypt.hash(
      req.body.password,
      Number(process.env.BCRYPT_SALTROUND)
    );

    await adminModel.updateOne(
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
    const admin = await adminModel.findOne({
      _id: new mongoose.Types.ObjectId(req.user.id),
    });
    const validPassword = await bcrypt.compare(
      req.body.old_password,
      admin.password
    );
    if (!validPassword || !admin)
      return res.json({
        success: false,
        message: "Please enter correct old password",
        data: {},
      });
    let passwordHash = await bcrypt.hash(
      req.body.new_password,
      Number(process.env.BCRYPT_SALTROUND)
    );

    await adminModel.findOneAndUpdate(
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
const getProfile = async (req, res) => {
  try {
    const admin = await adminModel.findById(req.user.id);
    if (admin) {
      return res.status(200).json({
        success: true,
        message: "Profile get successfully",
        data: admin,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
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

const updateProfile = async (req, res) => {
  try {
    const admin = await adminModel.findById(req.body.id);
    console.log("admin", admin);
    console.log("req.body", req?.body?.username);
    if (admin) {
      const adminObj = {
        username: req?.body?.username,
        email: req?.body?.email,
      };

      if (req.file) {
        adminObj.profile_pic = req.file.path;
      }

      const updateAdmin = await adminModel.findByIdAndUpdate(
        req.body.id,
        { $set: adminObj },
        { new: true }
      );

      if (updateAdmin) {
        return res.status(200).json({
          success: true,
          message: "Profile updated successfully",
          data: updateAdmin,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Admin not found",
          data: {},
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
        data: {},
      });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

//user
const getUser = async (req, res) => {
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

    let totalUsers = await userModel.countDocuments(match);
    let List = await userModel.find(
      match,
      {},
      { skip: record * page, limit: record, sort: { createdAt: -1 } }
    );

    return res.status(200).json({
      success: true,
      msg: "User list retrieved successfully.",
      data: { List: List, totalPages: Math.ceil(totalUsers / record) },
    });
  } catch (error) {
    // This is where the error occurs if syntax is off
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const getUserCount = async (req, res) => {
  try {
    const userCount = await userModel.countDocuments();
    console.log(`Number of users: ${userCount}`);

    if (userCount) {
      return res.status(200).json({
        success: true,
        message: "User count get successfully",
        data: userCount,
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

const getAllUser = async (req, res) => {
  try {
    let match = {};

    if (req.query.search) {
      match = {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      };
    }
    let userList = await userModel.find(match);
    if (userList) {
      return res.json({
        success: true,
        message: "Get user list successfully.",
        data: {
          userList: userList,
        },
      });
    } else {
      return res.json({
        success: false,
        message: "No data found",
        data: {},
      });
    }
  } catch (err) {
    console.error("getUser", err);
    return res.json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const sendUsersBulkMail = async (req, res) => {
  try {
    const userIds = req.body.userid;
    const subject = req.body.subject;
    const body = req.body.message;

    console.log("userIds", userIds);
    const objectIds = userIds.map((id) => new mongoose.Types.ObjectId(id));

    const users = await userModel.find(
      {
        _id: { $in: objectIds },
      },
      "name email"
    );
    const emailPromises = users.map((user) => {
      const { firstname, email } = user;
      return sendEmail(firstname, email, subject, body)
        .then(() => {
          console.log(`Email sent to ${email}`);
        })
        .catch((error) => {
          console.error(`Failed to send email to ${email}: ${error.message}`);
        });
    });

    await Promise.all(emailPromises);
    console.log("All emails have been processed.");

    return res.json({
      success: true,
      message: "Mail have been sent successfully",
      data: {},
    });
  } catch (error) {
    console.error("sendUsersBulkMail", error);
    return res.json({
      success: false,
      message: "Internal server error",
      data: {},
    });
  }
};

const sendUsersBulkNotification = async (req, res) => {
  try {
    const userIds = req.body.userid;
    const subject = "Bucket List Notification";
    const body = req.body.message;
    const objectIds = userIds.map((id) => new mongoose.Types.ObjectId(id));

    const users = await userModel.find(
      {
        _id: { $in: objectIds },
      },
      "name email fcmToken _id"
    );

    const emailPromises = users.map((user) => {
      const { fcmToken } = user;
      const notificationData = {
        device_ids: fcmToken,
        userInfo: user._id,
        title: "Bucket List Notification",
        body: req.body.message,
        data: {},
      };
      pushNotification.sendPushNotification(notificationData);
      new notificationModel(notificationData).save();
    });

    await Promise.all(emailPromises);
    console.log("All Notifications have been processed.");

    return res.json({
      success: true,
      message: "Notifications have been sent successfully",
      data: {},
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Internal server error",
      data: {},
    });
  }
};
const changeUserStatus = async (req, res) => {
  try {
    let id = req.body.id;
    let status = req.body.status;
    let client = await userModel.findByIdAndUpdate(id, {
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

const sendUserNotification = async (req, res) => {
  try {
    const user = await userModel.findOne({
      _id: new mongoose.Types.ObjectId(req.body.id),
    });
    if (user.fcmToken == "") {
      return res.json({
        success: true,
        message: "Fcm token not found",
        data: {},
      });
    } else {
      const notificationData = {
        device_ids: user.fcmToken,
        uid: user._id,
        title: "Bestta notification",
        body: req.body.message,
        data: {},
      };
      pushNotification.sendPushNotification(notificationData);
      new notificationModel(notificationData).save();
      return res.json({
        success: true,
        message: "Notification sent successfully",
        data: {},
      });
    }
  } catch (error) {
    return res.status(200).$optionsjson({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};
///service
const addService = async (req, res) => {
  try {
    const result = await serviceModel({ name: req?.body?.name }).save();
    if (result) {
      return res.json({
        success: true,
        message: "Service added successfully.",
        data: {},
      });
    } else {
      return res.json({
        success: false,
        message: "Something went wrong.",
        data: {},
      });
    }
  } catch (error) {
    console.error("updateFaq", err);
    return res.json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};
const addCategory = async (req, res) => {
  try {
    const checkService = await serviceModel.find({ name: req.body.name });
    console.log("checkService.length", checkService.length);
    console.log("checkService", checkService);
    if (checkService.length > 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `${req.body.name} category already exist.`,
        data: {},
      });
    }
    const category = new serviceModel({
      name: req.body.name,
      color: req.body.color,
      subCategories: req.body.subCategories,
    });
    const savedCategory = await category.save();

    if (req.body.subCategories.length > 0) {
      const savedSubcategories = await Promise.all(
        req.body.subCategories.map(async (subcategoryName) => {
          const subcategory = new subCategoriesModel({
            name: subcategoryName,
            category: savedCategory._id, // Link to the saved category
          });
          return subcategory.save();
        })
      );

      savedCategory.subcategories = savedSubcategories.map((sub) => sub._id);
      await savedCategory.save();
    }
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Category added successfully.",
      data: {},
    });
  } catch (error) {
    console.error("updateFaq", error);
    return res.json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const getCategory = async (req, res) => {
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

    // Count the total number of services matching the criteria
    let totalServices = await serviceModel.countDocuments(match);

    // Retrieve the list of services, with subcategories and categories populated
    let List = await serviceModel
      .find(
        match,
        {},
        { skip: record * page, limit: record, sort: { createdAt: -1 } }
      )
      .populate({
        path: "subcategories",
        model: "Subcategory",
        select: "_id name",
      });

    // Return the response
    return res.status(200).json({
      success: true,
      msg: "Service list retrieved successfully.",
      data: { List: List, totalPages: Math.ceil(totalServices / record) },
    });
  } catch (error) {
    console.error("getCategory error:", error); // Log the error
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = req.query.id;

    // Step 1: Delete all subcategories associated with the category
    const deleteSubCat = await subCategoriesModel.deleteMany({ category: id });

    if (!deleteSubCat.deletedCount) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "No subcategories found to delete for this category.",
        data: {},
      });
    }

    // Step 2: Delete the category itself
    const deleteCat = await serviceModel.findByIdAndDelete(id);

    if (!deleteCat) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Category not found.",
        data: {},
      });
    }

    // Step 3: Respond with success
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Category and associated subcategories deleted successfully.",
      data: deleteCat, // Return the deleted category data
    });
  } catch (error) {
    console.error("deleteCategory error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const updateCategory = async (req, res) => {
  const { id, name, color, subcategories } = req.body;

  try {
    const category = await serviceModel.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const categoryName = await serviceModel.findOne({ _id: { $ne: id }, name });
    if (categoryName) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `${categoryName?.name} category already exits`,
        data: {},
      });
    }
    console.log("categoryName", categoryName);
    category.name = name;
    category.color = color;
    // Iterate over subcategories

    for (const subcategory of subcategories) {
      if (!mongoose.Types.ObjectId.isValid(subcategory?._id)) {
        const existingSubcategory = await subCategoriesModel.findOne({
          name: subcategory.name,
          category: category._id, // Assuming you have this field
        });

        // const existingSubcategory = await subCategoriesModel.findOne({ name: subcategory.name });
        if (!existingSubcategory) {
          const newSubcategory = new subCategoriesModel({
            name: subcategory.name,
            category: category._id,
          });
          await newSubcategory.save();
          category.subcategories.push(newSubcategory._id);
        } else {
          return res.status(400).json({
            status: 400,
            success: false,
            message: `${subcategory.name} subcategory already exits`,
            data: {},
          });
        }
      }
    }

    // Save the updated category
    await category.save();

    return res.status(200).json({
      message: "Category updated successfully",
      data: category,
      status: 200,
      success: true,
    });
  } catch (error) {
    console.error("update category error:", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const clientStatus = async (req, res) => {
  try {
    let id = req.body.id;
    console.log("id", id);
    let bucketInfo = await bucketModel.find({ category: id });

    for (item of bucketInfo) {
      const request = await requestModel.find({
        bucketInfo: item._id,
        isStatus: { $ne: "Completed" },
      });
      console.log(request);
      if (request.length > 0) {
        return res.json({
          success: false,
          message: "Service request is in process.",
          data: {},
        });
        break;
      }
    }
    const changeServiceStatus = await serviceModel.findOneAndUpdate(
      { _id: req?.body?.id },
      { $set: { status: req.body.status } }
    );

    if (changeServiceStatus) {
      await bucketModel.updateMany(
        { category: req.body.id },
        {
          $set: {
            catStatus: req.body.status,
          },
        }
      );
      return res.status(200).json({
        statusCode: 200,
        success: true,
        message: "Service status updated successfully.",
        data: {},
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
//subcategory
const addSubCategory = async (req, res) => {
  try {
  } catch (error) {
    console.error("getCategory error:", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    // Validate the subcategory ID
    if (mongoose.Types.ObjectId.isValid(req.query.id)) {
      const subCat = await subCategoriesModel.findById(req.query.id);

      if (subCat) {
        // Step 1: Find the category that the subcategory belongs to
        const category = await serviceModel.findOne({ _id: subCat.category });

        if (category) {
          // Step 2: Remove the subcategory's _id from the category's subcategories array
          category.subcategories = category.subcategories.filter(
            (subCategoryId) => !subCategoryId.equals(subCat._id)
          );

          // Step 3: Save the updated category
          const updatedCategory = await category.save();

          const populatedCategory = await serviceModel
            .findById(updatedCategory._id)
            .populate({
              path: "subcategories", // Name of the field in your model that holds the IDs
              model: "Subcategory", // The model you want to populate from
            });

          // Step 4: Delete the subcategory
          await subCategoriesModel.findByIdAndDelete(req.query.id);
          return res.status(200).json({
            status: 200,
            success: true,
            message: "Subcategory deleted successfully",
            data: populatedCategory,
          });
        } else {
          return res.status(404).json({
            status: 404,
            success: false,
            message: "Category not found",
          });
        }
      } else {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "Subcategory not found",
        });
      }
    }
  } catch (error) {
    console.error("deleteSubCategory error:", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

//business category
const addBusinessCatgeory = async (req, res) => {
  try {
    const result = await businessCategoryModel({
      name: req?.body?.name,
    }).save();
    if (result) {
      return res.json({
        success: true,
        message: "Business category added successfully.",
        data: {},
      });
    } else {
      return res.json({
        success: false,
        message: "Something went wrong.",
        data: {},
      });
    }
  } catch (error) {
    console.error("updateFaq", err);
    return res.json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const changeEmployeePassword = async (req, res) => {
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
    const employee = await employeeModel.findOne({
      _id: new mongoose.Types.ObjectId(req.body.id),
    });
    const validPassword = await bcrypt.compare(
      req.body.old_password,
      employee.password
    );
    if (!validPassword || !employee)
      return res.json({
        success: false,
        message: "Please enter correct old password",
        data: {},
      });
    let passwordHash = await bcrypt.hash(
      req.body.new_password,
      Number(process.env.BCRYPT_SALTROUND)
    );

    await employeeModel.findOneAndUpdate(
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
//sales_person
const addSalesPerson = async (req, res) => {
  try {
    const result = await salesPersonModel({ name: req?.body?.name }).save();
    if (result) {
      return res.json({
        success: true,
        message: "Person added successfully.",
        data: {},
      });
    } else {
      return res.json({
        success: false,
        message: "Something went wrong.",
        data: {},
      });
    }
  } catch (error) {
    console.error("updateFaq", error);
    return res.json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};
//request management
const getRequest = async (req, res) => {
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
          { request_id: { $regex: req.query.search, $options: "i" } },
          { company_name: { $regex: req.query.search, $options: "i" } },
          { company_employee: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      };
    }
    if (req.query.status && req.query.status != "select") {
      match["isStatus"] = req.query.status;
    }
    if (req.query.company && req.query.company != "select") {
      match["company_name"] = req.query.company;
    }
    let totalRequest = await requestModel.countDocuments(match);
    let List = await requestModel
      .find(
        match,
        {},
        { skip: record * page, limit: record, sort: { createdAt: -1 } }
      )
      .populate("bucketInfo")
      .populate("client")
      .populate("userInfo");

    return res.status(200).json({
      success: true,
      msg: "Request list retrieved successfully.",
      data: { List: List, totalPages: Math.ceil(totalRequest / record) },
    });
  } catch (error) {
    // This is where the error occurs if syntax is off
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const updateRequest = async (req, res) => {
  try {
    if (req.body.id) {
      const result = await requestModel.findByIdAndUpdate(
        req.body.id,
        { isStatus: "Approved" },
        { new: true }
      );
      return res.json({
        success: true,
        message: "Request approved successfully.",
        data: result,
      });
    } else {
      return res.json({
        success: false,
        message: "Request id required",
        data: [],
      });
    }
  } catch (error) {
    console.error("updateFaq", error);
    return res.json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};
const getRequestCompany = async (req, res) => {
  try {
    // Use distinct to get unique company names
    const companies = await requestModel.distinct("company_name");
    if (companies.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No companies found.",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Company Names retrieved successfully.",
      data: companies,
    });
  } catch (error) {
    console.error("Error retrieving companies:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

module.exports = {
  getRequestCompany,
  updateProfile,
  login,
  getProfile,
  forgetPassword,
  verifyOtp,
  changePassword,
  resetPassword,
  getUser,
  getUserCount,
  getAllUser,
  sendUsersBulkMail,
  sendUsersBulkNotification,
  addService,
  addSalesPerson,
  addBusinessCatgeory,
  getRequest,
  updateRequest,
  changeEmployeePassword,
  sendUserNotification,
  changeUserStatus,
  addCategory,
  getCategory,
  deleteCategory,
  addSubCategory,
  deleteSubCategory,
  updateCategory,
  clientStatus,
};
