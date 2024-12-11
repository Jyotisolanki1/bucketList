const Joi = require("joi");

const clientSingUpValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().required().label("name"),
    company_name: Joi.string().required().label("Company name"),
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
    phone: Joi.number().required().label("phone"),
    category: Joi.string().required().label("category"),
    city_zip: Joi.string().required().label("city_zip"),
    job_title: Joi.string().required().label("job_title"),
    sales_person: Joi.string().label("sales_person"),
    company_information: Joi.string().required().label("company_information"),
    address: Joi.string().required().label("address"),
    website: Joi.string().required().label("website"),
    fcmToken: Joi.string(),
  });
  return schema.validate(body);
};
const clientUpdateProfileValidation = (body) => {
  const schema = Joi.object({
    id: Joi.string(),
    name: Joi.string().required().label("name"),
    company_name: Joi.string().required().label("Company name"),
    email: Joi.string().required().label("Email"),
    phone: Joi.number().required().label("phone"),
    category: Joi.string().required().label("category"),
    city_zip: Joi.string().required().label("city_zip"),
    job_title: Joi.string().required().label("job_title"),
    sales_person: Joi.string().label("sales_person"),
    company_information: Joi.string().required().label("company_information"),
    address: Joi.string().required().label("address"),
    website: Joi.string().required().label("website"),
    password: Joi.string(),
  });
  return schema.validate(body);
};
module.exports = { clientSingUpValidation, clientUpdateProfileValidation };
