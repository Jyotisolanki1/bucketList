const express = require("express");
const router = express.Router();

//import controllers
const adminController = require("../controllers/admin/adminController");
const cmsController = require("../controllers/admin/cmsController");
const helpCenterController = require("../controllers/admin/helpCenterController");
const faqController = require("../controllers/admin/faqController");
const clientController = require("../controllers/client/clientController");
const employeeController = require("../controllers/admin/employeeController");
///===

const mediaUploads = require("../helpers/mediaUpload");
// ==== admin auth =====  //
router.post("/login", adminController.login);
router.get("/get-profile", adminController.getProfile);
router.post(
  "/update-profile",
  mediaUploads("admin").single("image"),
  adminController.updateProfile
);
router.post("/sendBulkNotification", adminController.sendUsersBulkNotification);
router.post("/forget-password", adminController.forgetPassword);
router.post("/verify-otp", adminController.verifyOtp);
router.post("/reset-password", adminController.resetPassword);
router.post("/change-password", adminController.changePassword);


// ==== cms =====  //
router.get("/cms", cmsController.getCMS);
router.post("/update-cms", cmsController.updateCms);

// ==== help center =====  //
router.get("/help-center", helpCenterController.getHelpCenter);
router.post("/send-helpcenter-mail", helpCenterController.sendHelpCenterMail);

// === user === //
router.get("/get-user", adminController.getUser);
router.get("/get-users-count", adminController.getUserCount);
router.get("/get-all-users", adminController.getAllUser);
router.post("/send-broadcast-mail", adminController.sendUsersBulkMail);
router.post("/send-user-notification", adminController.sendUserNotification);
router.post("/sendBulkNotification", adminController.sendUsersBulkNotification);
router.post('/change-user-status', adminController.changeUserStatus);

//==== faqs === ///
router.get("/faq", faqController.getFaq);
router.get("/faq/:id", faqController.getFaqById);
router.delete("/delete-faq/:id", faqController.deleteFaq);
router.post("/faq", faqController.addFaq);
router.post("/update-faq", faqController.updateFaq);

//===services =====/
// router.post("/add-service", adminController.addService);
router.post("/add-category", adminController.addCategory);
router.get("/get-category" , adminController.getCategory);
router.delete("/delete-category" , adminController.deleteCategory);
router.post("/update-category", adminController.updateCategory);
router.post("/change-service-status", adminController.clientStatus);

//=== add sub category ===//
router.delete("/delete-sub-category" , adminController.deleteSubCategory)
//====

//business catgroy
router.get("/get-service-cat", clientController.getService);
router.post("/business-category", adminController.addBusinessCatgeory);
//sales person
router.post("/sales-person", adminController.addSalesPerson);

//===client === ///
router.post("/approve-client", clientController.approveClient);
router.get("/get-client", clientController.getClient);
router.post("/change-status", clientController.clientStatus);
router.post(
  "/add-client",
  mediaUploads("client").single("image"),
  clientController.addClient
);

router.post(
  "/update-client",
  mediaUploads("client").single("image"),
  clientController.updateAdminClient
);
//===Employee === ///
router.post(
  "/register-employee",
  mediaUploads("employee").single("image"),
  employeeController.registerEmployee
);
router.get("/get-employee", employeeController.getEmployee);
router.post("/update-employee-status", employeeController.employeeStatus);
router.post(
  "/update-employee",
  mediaUploads("employee").single("image"),
  employeeController.updateEmployee
);
router.post(
  "/change-employee-password",
  adminController.changeEmployeePassword
);

//request management
router.get("/get-request", adminController.getRequest);
router.post("/update-request-status", adminController.updateRequest);
router.get("/get-request-company", adminController.getRequestCompany);

module.exports = router;
