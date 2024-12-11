const express = require("express");
const userController = require("../controllers/user/userController");
const clientController = require("../controllers/client/clientController");
const cmsController = require("../controllers/admin/cmsController");
const helpCenterController = require("../controllers/admin/helpCenterController");
const mediaUploads = require("../helpers/mediaUpload");
const router = express.Router();

router.post("/register", userController.singUp);
router.post("/verify-otp", userController.verifyOtp);
router.post("/resend-otp", userController.resendOtpMail);
router.post("/forget-password", userController.forgetPassword);
router.post("/change-password", userController.changePassword);
router.post("/login", userController.login);
router.post("/reset-password", userController.resetPassword);
router.post(
  "/update-profile",
  mediaUploads("user").single("image"),
  userController.updateProfile
);
router.get("/get-profile", userController.getProfile);

//person
router.get("/get-person", clientController.getSalesPerson);

//get service for client
router.get("/get-service-cat", clientController.getService);
router.get("/get-business-category", clientController.getBusinessCategory);

//request management
router.get("/get-all-bucket", userController.getBucket);
router.post(
  "/create-request",
  mediaUploads("user").single("location"),
  userController.createRequest
);

///implement pending
router.get("/send-invoice", userController.sendInvoice);
router.get("/get-bucket-cat", userController.getBucketCat);
router.get("/get-bucket", userController.getBucketByCat);

//create client
router.post("/create-client", userController.clientSingUp);

//cms
router.get("/cms", cmsController.getCMS);

//help-center
router.post("/help-center", helpCenterController.addHelpCenter);
router.get("/get-request", userController.getRequest);
router.get("/get-request-detail", userController.getRequestDetail);
router.get("/get-faq", userController.getFaq);
router.get("/get-invoice", clientController.getInvoice);

//Delete Notification
router.delete("/delete-notification", userController.deleteNotification);

module.exports = router;
