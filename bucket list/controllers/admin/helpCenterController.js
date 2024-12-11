const helpCenterModel = require("../../models/helpCenterModel");
const { sendQueryValidation } = require("../../helpers/commonValidator");
const { sendEmail } = require("../../library/sendEmail");
const mongoose = require("mongoose");
const userModel = require("../../models/userModel");

const getHelpCenter = async (req, res) => {
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

    let totalQuery = await helpCenterModel.countDocuments(match);
    let helpList = await helpCenterModel.find(
      match,
      {},
      { skip: record * page, limit: record, sort: { createdAt: -1 } }
    );

    return res.json({
      success: true,
      message: "Get query list successfully.",
      data: {
        total: totalQuery,
        page: page,
        record: record,
        totalPages: Math.ceil(totalQuery / record),
        helpList: helpList,
      },
    });
  } catch (err) {
    console.error("getHelpQuery", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const replyHelpCenter = async (req, res) => {
  try {
    if (!req.body.id)
      return res.json({
        success: false,
        message: "Invalid id.",
        data: {},
      });
    let helpList = await helpCenterModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.body.id) },
      { $set: { reply: "true" } }
    );
    if (helpList) {
      return res.json({
        success: true,
        message: "update query  successfully.",
        data: {},
      });
    } else {
      return res.json({
        success: false,
        message: "Query not found",
        data: {},
      });
    }
  } catch (err) {
    console.error("getHelpQuery", err);
    return res.json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};
const sendHelpCenterMail = async (req, res) => {
  try {
    console.log(req.body)
    const user = await userModel.findOne({
      email: req.body.email,
    });
    if(user === null){
      return res.json({
        success: false,
        message: "User not found",
        data: {},
      });
    }
    await sendEmail(
      user.name,
      user.email,
      req.body.subject,
      req.body.message
    );

    const rply = await helpCenterModel.findOneAndUpdate(
      { email: req.body.email },
      {
        $set: {
          reply: "true",
        },
      }
    );

    return res.json({
      success: true,
      message: "Mail have been sent successfully",
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
const addHelpCenter = async (req, res) => {
  try {
    const { error } = sendQueryValidation(req.body);
    if (error)
      return res.status(400).json({
        responseCode: 400,
        success: false,
        message: req.__(error.details[0].message),
        data: {},
      });
    let user_id = req.user ? req.user.id : "";
    const query = await helpCenterModel({
      userInfo: user_id,
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      message: req.body.message,
    }).save();

    return res.status(200).json({
      responseCode: 200,
      success: true,
      message: "Inquiry submitted successfully",
      data: query,
    });
  } catch (err) {
    console.error("sendQueryController", err);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};
module.exports = {
  getHelpCenter,
  replyHelpCenter,
  addHelpCenter,
  sendHelpCenterMail,
};
