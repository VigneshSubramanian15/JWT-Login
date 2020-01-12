//Validation
const Joi = require('@hapi/joi')

//registervalidation
const userValidation = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .min(3)
        .max(30)
        .email()
        .required(),
    pass: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
});

//loginvalodation
const loginValidation = Joi.object({
    email: Joi.string()
        .min(3)
        .max(30)
        .email()
        .required(),
    pass: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
});
module.exports.userValidation = userValidation
module.exports.loginValidation = loginValidation