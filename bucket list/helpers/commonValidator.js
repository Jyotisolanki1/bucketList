const Joi = require("joi");
const forgetPasswordValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
  });
  return schema.validate(body);
};

const verifyOtpValidation = (body) => {
  const schema = Joi.object({
    otp: Joi.string().required().label("otp"),
  });
  return schema.validate(body);
};

const changePasswordValidation = (body) => {
  const schema = Joi.object({
    old_password: Joi.string().required().label("Old Password"),
    new_password: Joi.string().required().label("New Password"),
    id: Joi.string(),
    confirm_password: Joi.string()
      .valid(Joi.ref("new_password"))
      .required()
      .label("Confirm Password"),
  });
  return schema.validate(body);
};
const resetPasswordValidation = (body) => {
  const schema = Joi.object({
    password: Joi.string().required().label("Password"),
    confirm_password: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .label("Confirm Password"),
  });
  return schema.validate(body);
};
const loginValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
    fcmToken: Joi.string(),
  });
  return schema.validate(body);
};

const sendQueryValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    mobile: Joi.string().required(),
    message: Joi.string().required(),
    reply: Joi.string(),
  });
  return schema.validate(body);
};
module.exports = {
  forgetPasswordValidation,
  verifyOtpValidation,
  changePasswordValidation,
  resetPasswordValidation,
  loginValidation,
  sendQueryValidation,
};
