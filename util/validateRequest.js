const Joi = require("joi");
const AppError = require("./appError");
const headerMethods = ['body', 'params', 'query' ];

module.exports = (schema) => {
  return (req, res, next) => {
    headerMethods.forEach((key) => {
      if (schema[key]) {
          const validationResult = schema[key].validate(req[key])
          if (validationResult.error) {
            return next(new AppError(validationResult.error.details[0].message, 400));
          }
      }
  })
    next();
  }
}