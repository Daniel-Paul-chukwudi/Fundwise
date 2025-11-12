require('dotenv').config()
const userModel = require('../models/user')
const adminModel = require('../models/admin')
const jwt = require('jsonwebtoken')
const investorModel = require("../models/investor")
const meetingModel = require("../models/meeting")
exports.checkLogin = async (req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                message: 'Please login again to continue'
            })
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    
        const user = await userModel.findByPk(decoded.id);

        if (user === null) {
            return res.status(404).json({
                message: 'Authentication Failed: User not found'
            })
        }
        req.user = decoded;
        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: 'Session expired, Please login again to continue'
            })
        }
        res.status(500).json({
            message:"internal server error",
            error: error.message
        })
    }
}


exports.checkInvestorLogin  = async (req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                message: 'Please login again to continue'
            })
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await investorModel.findByPk(decoded.id);

        if (user === null) {
            return res.status(404).json({
                message: 'Authentication Failed: investor not found'
            })
        }
        req.user = decoded;
        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: 'Session expired, Please login again to continue'
            })
        }
        res.status(500).json({
            message:"internal server error from the authentication",
            error: error.message
        })
    }
}


exports.checkKyc = async (req,res,next)=>{
    try {
        
        const userId =  req.user.id
        const investor = await investorModel.findByPk(userId)
        const user = await userModel.findByPk(userId)
        if(!user && investor){
            if(investor.kycStatus === 'not provided'){
                return res.status(200).json({
                message:"Please submit your KYC for verification"
                })
            }else if (investor.kycStatus === 'under review'){
                return res.status(200).json({
                message:"your kyc is under review wait for it to be verified"
                })
            }else{
                next()
            }
        }else if(!investor && user){
            if(user.kycStatus === 'not provided'){
                return res.status(200).json({
                message:"Please submit your KYC for verification"
                })
            }else if (user.kycStatus === 'under review'){
                return res.status(200).json({
                message:"your kyc is under review wait for it to be verified"
                })
            }else{
                next()
            }
        }else{
            return res.status(404).json({
                message:"User not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            error: error.message
        })
    }
}

exports.checkAdmin = async (req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                message: 'Please login again to continue'
            })
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await adminModel.findByPk(decoded.id)

        if(user === null){
            return res.status(404).json({
                message:"admin not found"
            })
        }else{
            if(user.role !== 'admin' ){
                return res.status(404).json({
                message:"You are not authorized to view this"
                })
            }else{
                next()
            }
        }

    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            error: error.message
        })
    }
}

exports.checkSubscription = async (req,res,next)=>{
    try {
        const data = req.user
        const user = await userModel.findByPk(data.id)

        if(user === null){
            return res.status(404).json({
                message:"user not found"
            })
        }else{
            if(user.subscribed ===  false ){
                return res.status(404).json({
                message:"You are subscribtion expired pls subscribe to continue"
                })
            }else{
                next()
            }
        }

    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            error: error.message
        })
    }
}