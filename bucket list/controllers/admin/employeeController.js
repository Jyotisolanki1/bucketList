const mongoose = require("mongoose");
const employeeModel = require("../../models/employeeModel");
const {
  registerEmployeeValidation,
  updateEmployeeProfileValidation,
} = require("../../helpers/adminValidationSchema");
const bcrypt = require("bcrypt");

const getEmployee = async (req, res) => {
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
      const searchRegex = { $regex: req.query.search, $options: "i" };

      match = {
        $or: [
          { email: searchRegex }, // And email
          { employee_id: searchRegex },
          {
            $expr: {
              $regexMatch: {
                input: { $concat: ["$firstname", " ", "$lastname"] }, // Concatenate firstname and lastname
                regex: req.query.search,
                options: "i",
              },
            },
          },
        ],
      };
    }

    let totalEmployees = await employeeModel.countDocuments(match);
    let List = await employeeModel.find(
      match,
      {},
      { skip: record * page, limit: record, sort: { createdAt: -1 } }
    );

    return res.status(200).json({
      success: true,
      message: "Employees list getting successfully.",
      data: { List: List, totalPages: Math.ceil(totalEmployees / record) },
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

const registerEmployee = async (req, res) => {
  console.log("hhe");
  try {
    const { error } = registerEmployeeValidation(req.body);
    if (error)
      return res.json({
        success: false,
        message: error.details[0].message,
        data: {},
      });

    const employee = await employeeModel.findOne({ email: req.body.email });
    if (employee) {
      return res.json({
        success: false,
        message: "Email already registered",
        data: employee,
      });
    }
    let passwordHash = await bcrypt.hash(
      req.body.password,
      Number(process.env.BCRYPT_SALTROUND)
    );

    var Obj = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      password: passwordHash,
      isStatus: "active",
    };

    if (req.file) {
      Obj["profile_pic"] = req.file.path;
    }
    console.log("passwordHash oooo", Obj);
    const employeeData = await employeeModel(Obj).save();
    console.log("employeeData", employeeData);
    if (employeeData) {
      return res.json({
        success: true,
        message: "Employee added successfully",
        data: employeeData,
      });
    } else {
      return res.json({
        success: false,
        message: "Employee not found",
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

const updateEmployee = async (req, res) => {
  try {
    const { error } = updateEmployeeProfileValidation(req.body);
    if (error) {
      return res.json({
        success: false,
        message: error.details[0].message,
        data: {},
      });
    }

    // Check if email is unique (excluding the current employee)
    const existingEmployee = await employeeModel.findOne({
      email: req.body.email,
      _id: { $ne: req.body.id }, // exclude current employee's ID
    });

    if (existingEmployee) {
      return res.json({
        success: false,
        message: "Email is already in use by another employee",
        data: {},
      });
    }

    // Prepare update data
    var updateData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      isStatus: "active",
    };

    if (req.file) {
      updateData["profile_pic"] = req.file.path;
    }

    // Update employee
    const employee = await employeeModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.body.id) },
      { $set: updateData },
      { new: true }
    );

    if (employee) {
      return res.json({
        success: true,
        message: "Employee profile updated successfully",
        data: employee,
      });
    } else {
      return res.json({
        success: false,
        message: "Employee not found",
        data: {},
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

const employeeStatus = async (req, res) => {
  try {
    let id = req.body.id;
    let status = req.body.status;
    let client = await employeeModel.findByIdAndUpdate(id, {
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
module.exports = {
  getEmployee,
  registerEmployee,
  updateEmployee,
  employeeStatus,
};
