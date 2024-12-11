const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const clientModel = require("../models/clientModel");
const skipAuthPath = [
  "/user/login",
  "/user/forget-password",
  "/user/register",
  "/user/get-service-cat",
  "/user/create-client",
  "/user/get-person",
  "/clientapi/register",
  "/clientapi/cms",
  "/clientapi/login",
  "/admin/forget-password",
  "/clientapi/forget-password",
  "/admin/login",
  "/admin/register",
  "/user/get-business-category",
  "/user/get-faq",
  "/controllers/client/invoices/:id",
  "/clientapi/get-clients",
  "/clientapi/get-buckets",
];

const tempAuthPath = [
  "/user/verify-otp",
  "/clientapi/verify-otp",
  "/user/resend-otp",
  "/reset-password",
  "/admin/verify-otp",
  "/admin/reset-password",
  "/user/reset-password",
  "/clientapi/reset-password",
];

const JWTAuthantication = async (req, res, next) => {
  try {
    let urlPath = req._parsedUrl.pathname;
    let token = "";
    //  console.log('urlPath', req._parsedUrl)
    // Auth not checked
    if (skipAuthPath.indexOf(urlPath.toLowerCase()) > -1) {
      token = req.headers.authorization;
      if (token && token != null) {
        token = token.split(" ")[1];
        let privatekey1 = process.env.JWT_ACCESSTOKEN_SECRET;
        jwt.verify(token, privatekey1, async (err, decoded) => {
          if (!err) req.user = decoded;
          return next();
        });
      } else {
        next();
      }
    }
    // temp auth checked
    else if (
      tempAuthPath.indexOf(urlPath.toLowerCase()) > -1 &&
      req.headers.authorization
    ) {
      token = req.headers.authorization;
      token = token.split(" ")[1];
      if (token && token != null) {
        let tempKey = process.env.JWT_TEMPTOKEN_SECRET;
        jwt.verify(token, tempKey, async (err, decoded) => {
          if (err) {
            console.error("JWTAuthantication", err);
            return res.status(401).json({
              responseCode: 401,
              success: false,
              message: "Invalid token",
              data: { token },
            });
          } else {
            console.info("JWTAuthantication token decode", decoded);
            req.userTemp = decoded;
            return next();
          }
        });
      } else {
        return res.status(401).json({
          responseCode: 401,
          success: false,
          message: "Invalid token",
          data: { token },
        });
      }
    }
    // auth checked
    else if (req.headers.authorization) {
      token = req.headers.authorization;
      token = token.split(" ")[1];
      if (token && token != null) {
        let privatekey = process.env.JWT_ACCESSTOKEN_SECRET;
        jwt.verify(token, privatekey, async (err, decoded) => {
          if (err) {
            // console.error('JWTAuthantication', err)
            return res.status(401).json({
              responseCode: 401,
              success: false,
              message: "Invalid token",
              data: { token },
            });
          } else {
            req.user = decoded;
            if (decoded.role == "user") {
              const user = await userModel.findOne({
                _id: new mongoose.Types.ObjectId(req.user.id),
              });

              console.log(client);
              console.log(user.id);
              if (user && user.isStatus === "blocked") {
                return res.status(401).json({
                  responseCode: 401,
                  success: false,
                  message:
                    "Your account is deactivated by admin, please contact admin.",
                  data: { isBlocked: true },
                });
              }

              if (!user) {
                return res.status(401).json({
                  responseCode: 401,
                  success: false,
                  message: "Invalid token",
                  data: {},
                });
              }
            }
            const client = await clientModel.findOne({
              _id: new mongoose.Types.ObjectId(req.user.id),
            });
            if (client && client.isStatus === "inactive") {
              return res.status(401).json({
                responseCode: 401,
                success: false,
                message:
                  "Your account is deactivated by admin, please contact admin.",
              });
            }
            return next();
          }
        });
      } else {
        return res.status(401).json({
          responseCode: 401,
          success: false,
          message: "Invalid token",
          data: { token },
        });
      }
    } else {
      return res.status(401).json({
        responseCode: 401,
        success: false,
        message: "Invalid token",
        data: { token },
      });
    }
  } catch (err) {
    console.error("JWTAuthantication", err);
    return res.status(500).json({
      responseCode: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

module.exports = JWTAuthantication;
