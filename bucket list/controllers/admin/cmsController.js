const cmsModel = require("../../models/cmsModel");
const {  updateCmsValidation} = require("../../helpers/adminValidationSchema");

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

const updateCms = async (req, res) => {
  try {
    const { error } = updateCmsValidation(req.body);
    if (error)
      return res.json({
        success: false,
        message: error.details[0].message,
        data: {},
      });
    let data = await cmsModel.updateOne(
      { type: req.body.type },
      { content: req.body.content },
      { upsert: true }
    );
    return res.status(200).json({
      success: true,
      message: "Update successfully.",
      data: data,
    });
  } catch (err) {
    console.error("updateStaticContentController", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

module.exports = { getCMS, updateCms };
