
require('dotenv').config()
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {verify,forgotPassword} = require('../Middleware/emailTemplates')
const sendEmail = require('../Middleware/Bmail')
const investorModel = require('../models/investor')
const agreementModel = require('../models/agreement')


exports.makeDeal = async (req,res)=>{
    try {
        const investorId = req.user.id
        const businessId = req.params.id

        const deal = await agreementModel.create({
            investorId,
            businessId,
            agreementStatus:"meetup"
        })
        res.status(201).json({
            message: `Meeting between ${investorId} and ${businessId} created`,
            data:deal
        })


    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}