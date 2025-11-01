const Joi = require('joi');

// Helper function for validation
function validate(schema, req, res, next) {
  const { error } = schema.validate(req.body, { abortEarly: true });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

//USER VALIDATORS
// Register Validator
exports.registerValidator = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().min(2).trim().required(),
    phoneNumber: Joi.string().required()
      .messages({ "string.pattern.base": "Phone number must be 11 digits" }),
    email: Joi.string().email().trim().required(),
    password: Joi.string()
      // .pattern(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%*#?&-])[A-Za-z\d@$!%*#?&-]{8,}$/)
      .required()
      .messages({
        "string.pattern.base": "Password must be at least 8 chars long with upper, lower, number & special character"
      }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required()
      .messages({ "any.only": "Passwords do not match" })
  });
  validate(schema, req, res, next);
};

// Login Validator
exports.loginValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().required()
  });
  validate(schema, req, res, next);
};

// Verify OTP
exports.verifyValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().min(4).max(8).required()
  });
  validate(schema, req, res, next);
};

// Resend OTP
exports.resendValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required()
  });
  validate(schema, req, res, next);
};

// Change Password
exports.changePasswordValidator = (req, res, next) => {
  const schema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string()
      // .pattern(/^(?=.[A-Z])(?=.[a-z])(?=.*\d).{8,}$/)
      .required(),
    confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required()
      .messages({ "any.only": "Passwords do not match" })
  });
  validate(schema, req, res, next);
};

// Forgot Password
exports.forgotPasswordValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required()
  });
  validate(schema, req, res, next);
};

// Reset Password
exports.resetPasswordValidator = (req, res, next) => {
  const schema = Joi.object({
    newPassword: Joi.string()
      // .pattern(/^(?=.[A-Z])(?=.[a-z])(?=.*\d).{8,}$/)
      .required(),
    confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required()
      .messages({ "any.only": "Passwords do not match" })
  });
  validate(schema, req, res, next);
};

// Delete User
exports.deleteUserValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required()
  });
  validate(schema, req, res, next);
};

// BUSINESS VALIDATOR
exports.createBusinessValidator = (req, res, next) => {
  const schema = Joi.object({
    businessName: Joi.string().min(3).required(),
    fundGoal: Joi.number().required(),
    category: Joi.string().required(),
    description: Joi.string().required().optional()
  });
  validate(schema, req, res, next);
};

//MEETING VALIDATOR
exports.meetingValidator = (req, res, next) => {
  const schema = Joi.object({
    meetingTitle: Joi.string().required().messages({
      "string.empty": "Meeting title is required"
    }),
    date: Joi.string().required().messages({
      "string.empty": "Meeting date is required"
    }),
    time: Joi.string().required().messages({
      "string.empty": "Meeting time is required"
    }),
    guest: Joi.string().required().messages({
      "string.empty": "guestId is required"
    }),
    meetingType: Joi.string().optional(),
    note: Joi.string().optional()
  });
  validate(schema, req, res, next);
};

//PAYMENT VALIDATOR
exports.paymentValidator = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.string().optional(),
    amount: Joi.number().positive().required().messages({
      "number.positive": "Amount must be greater than 0",
      "any.required": "Amount is required"
    }),
    method: Joi.string().valid("card", "bank", "transfer").optional(),
    reference: Joi.string().optional()
  });
  validate(schema, req, res, next);
};

//INVESTOR VALIDATOR=
exports.investorValidator = (req, res, next) => {
  const schema = Joi.object({
    investorName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    amount: Joi.number().positive().required(),
    businessId: Joi.string().required()
  });
  validate(schema, req, res, next);
};