const express = require("express");

//import controllers
const userController = require("../controllers/user/userController");
const clientController = require("../controllers/client/clientController");

//media
const mediaUploads = require("../helpers/mediaUpload");
const router = express.Router();

router.post("/verify-otp", clientController.verifyOtp);
router.post("/resend-otp", clientController.resendOtpMail);
router.post("/forget-password", clientController.forgetPassword);
router.post("/login", clientController.login);
router.post(
  "/update-profile",
  mediaUploads("client").single("image"),
  clientController.updateProfile
);

router.post("/reset-password", clientController.resetPassword);
router.post("/change-password", clientController.changePassword);
router.get("/get-profile", clientController.getProfile);

//services cat
router.get("/get-service-cat", clientController.getService);

//add service
router.get("/get-bucket-count", clientController.getBucketCount);
router.post("/add-bucket", clientController.addService);
router.post("/update-bucket", clientController.updateService);
router.get("/get-bucket", clientController.getBucket);

//sub category
router.get("/get-sub-catgeory", clientController.getSubCat);
router.post("/delete-sub-category", clientController.deleteSubCategory);
//request management
router.post("/update-request-status", clientController.updateRequestStatus);
router.get("/get-request", clientController.getRequest);
router.get("/get-request-count", clientController.getRequestCount);

//Get clients
router.get("/get-buckets", clientController.getClientServices);
//cms
router.get("/cms", clientController.getCMS);

//help center
router.post("/help-center", clientController.addHelpCenter);

module.exports = router;
