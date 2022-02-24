const Joi = require("joi");
const { param } = require("../routes/userRoutes");


exports.validateLogIn = {
    body: Joi.object().keys(
        {email: Joi.string().email().required(), password: Joi.string().required()}
    )
}

exports.validateRegister = {
    body: Joi.object().keys(
        {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            name: Joi.string().required(),
            age: Joi.number().required(),
        }
    )
}



exports.validateChangePassword = {
    body: Joi.object().keys(
        {
            password: Joi.string().required(),
            newPassword: Joi.string().required(),
        }
    )
}
exports.validateForgetPassword = {
    body: Joi.object().keys(
        {
            email: Joi.string().required(),
        }
    )
}
exports.validateResetPassword = {
    body: Joi.object().keys(
        {
            password: Joi.string().required(),
        }
    ),
    param: Joi.object().keys({
        token: Joi.string().required()
    })
}

exports.validateUpdate = {
    body: Joi.object().keys(
        {
            name: Joi.string(),
            age: Joi.number().max(80).min(18),
        }
    )
}
