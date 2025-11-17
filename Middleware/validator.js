const Joi = require('joi');


function validate(schema, req, res, next) {
  const { error } = schema.validate(req.body, { abortEarly: true });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

exports.registerValidator = (req, res, next) => {
const signUpSchema = Joi.object({
  fullName: Joi.string()
    .min(3)
    .max(50)
    .required(),

  phoneNumber: Joi.string()
    .pattern(/^[0-9]{11}$/) // adjust based on country format
    .required(),

  email: Joi.string()
    .email()
    .required(),

  subscriptionTier: Joi.string()
    .valid("free", "growth", "premium")
    .default("free"),

  password: Joi.string()
    .min(6)
    .max(100)
    .required(),

  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match"
    }),
});
validate(schema, req, res, next);
}

exports.kycValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),

    dateOfBirth: Joi.date().iso().required(),

    phoneNumber: Joi.string()
      .pattern(/^[0-9]{11}$/)
      .required()
      .messages({
        "string.pattern.base": "Phone number must be 11 digits"
      }),

    email: Joi.string().email().required(),

    nationality: Joi.string().min(2).max(50).required(),

    residentialAddress: Joi.string().min(5).required(),
    city: Joi.string().min(2).required(),
    state: Joi.string().min(2).required(),

    accountName: Joi.string().min(3).max(100).required(),

    accountNumber: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required()
      .messages({
        "string.pattern.base": "Account number must be 10 digits"
      }),

    accountType: Joi.string()
      .valid("savings", "current", "domiciliary")
      .required(),

    bankName: Joi.string().min(3).required(),
  });
  validate(schema, req, res, next);
};

exports.createKycIValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    dateOfBirth: Joi.date().iso().required(),

    phoneNumber: Joi.string()
      .pattern(/^[0-9]{11}$/)
      .required(),

    email: Joi.string().email().required(),
    nationality: Joi.string().min(2).max(50).required(),

    residentialAddress: Joi.string().min(5).max(200).required(),
    city: Joi.string().min(2).max(50).required(),
    state: Joi.string().min(2).max(50).required(),

    investmentType: Joi.string()
      .valid("real_estate", "agro", "tech", "forex", "crypto") // edit as needed
      .required(),

    governmentId: Joi.string().optional(), 
    proofOfAddress: Joi.string().optional(),
    profilePic: Joi.string().optional()
  });
  validate(schema, req, res, next);
};



exports.loginValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().required()
  });
  validate(schema, req, res, next);
};

exports.verifyValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().min(4).max(8).required()
  });
  validate(schema, req, res, next);
};

exports.resendValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required()
  });
  validate(schema, req, res, next);
};

exports.changePasswordValidator = (req, res, next) => {
  const schema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string()
      .pattern(/^(?=.[A-Z])(?=.[a-z])(?=.*\d).{8,}$/)
      .required(),
    confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required()
      .messages({ "any.only": "Passwords do not match" })
  });
  validate(schema, req, res, next);
};

exports.forgotPasswordValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required()
  });
  validate(schema, req, res, next);
};

exports.resetPasswordValidator = (req, res, next) => {
  const schema = Joi.object({
    newPassword: Joi.string()
      .pattern(/^(?=.[A-Z])(?=.[a-z])(?=.*\d).{8,}$/)
      .required(),
    confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required()
      .messages({ "any.only": "Passwords do not match" })
  });
  validate(schema, req, res, next);
};

exports.deleteUserValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required()
  });
  validate(schema, req, res, next);
};

exports.createBusinessValidator = (req, res, next) => {
  const schema = Joi.object({
    businessName: Joi.string().min(3).required(),
    fundGoal: Joi.number().required(),
    category: Joi.string().required(),
    description: Joi.string().required().optional()
  });
  validate(schema, req, res, next);
};

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
    meetingType: Joi.string().optional()
  });
  validate(schema, req, res, next);
};

exports.paymentValidator = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.string().optional(),
    amount: Joi.number().positive().required().messages({
      "number.positive": "Amount must be greater than 0",
      "any.required": "Amount is required"
    }),
  });
  validate(schema, req, res, next);
};

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