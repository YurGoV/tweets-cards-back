const Joi = require('joi');
const { catchAsyncWrapper, CustomError } = require('../utils');

const joiUpdateUserSchema = (data) =>
  Joi.object({
    id: Joi.objectId().required(),
    followers: Joi.number().min(1).max(10000000).required(),
    followed: Joi.boolean().required(),
  }).validate(data);

exports.updateValidateMiddleware = (req, res, next) => {
  const { error, value } = joiUpdateUserSchema(req.body);
  if (error) {
    return next(new CustomError(400, error.details[0].message));
  }

  req.body = value;
  next();
};
