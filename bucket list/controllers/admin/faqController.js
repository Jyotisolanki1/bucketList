const mongoose = require("mongoose");
const faqModel = require("../../models/faqModel");

const getFaq = async (req, res) => {
  try {
    let match = {};
    if (req.query.search) {
      match = {
        $or: [
          { question: { $regex: req.query.search, $options: "i" } },
          { answer: { $regex: req.query.search, $options: "i" } },
        ],
      };
    }
    let faqList = await faqModel.find(match, {}, { sort: { createdAt: -1 } });
    return res.json({
      success: true,
      message: "Get faq list successfully.",
      data: faqList,
    });
  } catch (err) {
    console.error("getFaq", err);
    return res.json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const getFaqById = async (req, res) => {
  try {
    let faqList = await faqModel.findOne({
      _id: new mongoose.Types.ObjectId(req.params.id),
    });
    return res.json({
      success: true,
      message: "Get faq successfully.",
      data: faqList,
    });
  } catch (err) {
    console.error("getFaqById", err);
    return res.json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};
const deleteFaq = async (req, res) => {
  try {
    await faqModel.deleteOne({
      _id: new mongoose.Types.ObjectId(req.params.id),
    });
    return res.json({
      success: true,
      message: "Faq deleted successfully.",
      data: {},
    });
  } catch (err) {
    return res.json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const addFaq = async (req, res) => {
  try {
    console.log(req.body);
    let faqObj = {
      question: req.body.question,
      answer: req.body.answer,
    };
    await faqModel(faqObj).save();
    return res.json({
      success: true,
      message: "FAQ added successfully.",
      data: {},
    });
  } catch (err) {
    console.error("addFaq", err);
    return res.json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const updateFaq = async (req, res) => {
  try {
    console.log("req.body", req.body);
    let faqObj = {
      question: req.body.question,
      answer: req.body.answer,
    };

    const result = await faqModel.updateOne(
      { _id: new mongoose.Types.ObjectId(req.body.id) },
      { $set: faqObj }
    );
    if (result) {
      return res.json({
        success: true,
        message: "FAQ updated successfully.",
        data: {},
      });
    } else {
      return res.json({
        success: false,
        message: "Something went wrong.",
        data: {},
      });
    }
  } catch (err) {
    console.error("updateFaq", err);
    return res.json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

module.exports = {
  getFaq,
  getFaqById,
  addFaq,
  updateFaq,
  deleteFaq,
};
