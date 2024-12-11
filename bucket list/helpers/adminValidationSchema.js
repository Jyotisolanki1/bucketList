const Joi = require("joi");
const loginValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(body);
};

const updateCmsValidation = (body) => {
  const schema = Joi.object({
    type: Joi.string().required().label("type"),
    content: Joi.string().required().label("content"),
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

///employee validation
const registerEmployeeValidation = (body) => {
  const schema = Joi.object({
    firstname: Joi.string().required().label("First Name"),
    lastname: Joi.string().required().label("Last Name"),
    email: Joi.string().required().label("email"),
    phone: Joi.number().label("phone"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(body);
};

const updateEmployeeProfileValidation = (body) => {
  const schema = Joi.object({
    id: Joi.string().required().label("id"),
    firstname: Joi.string().required().label("First Name"),
    lastname: Joi.string().required().label("Last Name"),
    email: Joi.string().required().label("email"),
    phone: Joi.number().label("phone"),
  });
  return schema.validate(body);
};

module.exports = {
  loginValidation,
  updateCmsValidation,
  changePasswordValidation,
  registerEmployeeValidation,
  updateEmployeeProfileValidation
};
