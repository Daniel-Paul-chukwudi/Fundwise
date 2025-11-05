const joi = require('joi');
const { schema } = require('../models/business');

exports.validateSignUp = async (req,res,next) => {
    try {
      const schema = joi.object({
       fullName: joi.string().min(3).required(),
       email:joi.string().email().required(),
       password:joi.string().min(6).required(), 
      })  
    } catch (error) {
      schema.validate(req.body);
      if (error) {
        return res.status
      }  
    }
}