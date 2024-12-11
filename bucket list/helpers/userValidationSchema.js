const Joi = require("joi");

const singUpValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().required().label("name"),
    company_name: Joi.string().required().label("Company name"),
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
    phone: Joi.number().required().label("phone"),
    position: Joi.string().required().label("position"),
    fcmToken: Joi.string(),
  });
  return schema.validate(body);
};
const updateProfileValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().required().label("name"),
    company_name: Joi.string().required().label("Company name"),
    email: Joi.string().required().label("Email"),
    phone: Joi.number().required().label("phone"),
    position: Joi.string().required().label("position"),
  });
  return schema.validate(body);
};
const changePasswordValidation = (body) => {
  const schema = Joi.object({
    old_password: Joi.string().required().label("Old Password"),
    new_password: Joi.string().required().label("New Password"),
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
const createRequestValidation = (body) => {
  const schema = Joi.object({
    company_name: Joi.string().required().label("Company Name"),
    company_employee: Joi.string().required().label("Company Employee"),
    job_title: Joi.string().required().label("Job Title"),
    email: Joi.string().required().label("Email"),
    phone: Joi.number().required().label("phone"),
    work_scope: Joi.string().required().label("Work Scope"),
    location: Joi.string().label("Location"),
    cost_code: Joi.string().required().label("Cost Code"),
    bucketInfo: Joi.string().required().label("Bucket Info"),
    requested_date: Joi.string().required().label("Requested Date"),
    purchase_order: Joi.string().required().label("Purchase Order"),
  });
  return schema.validate(body);
};
module.exports = {
  singUpValidation,
  updateProfileValidation,
  changePasswordValidation,
  resetPasswordValidation,
  createRequestValidation,
};
