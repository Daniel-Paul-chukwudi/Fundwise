const adminModel = require('../models/admin')
const ticketModel = require('../models/supportticket')
const businessModel = require('../models/business')
const UserModel = require('../models/user')
const investorModel = require('../models/investor')

exports.createAdmin = async (req,res)=>{
    try {
      const {fullName} = req.body
      
      const newAdmin = await adminModel.create({
        fullName,
        role:"Admin"
      })
      res.status(201).json({
        message:"Admin created",
        data:newAdmin
      })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            error:error.message
        })
    }
}

exports.getAllAdmins = async (req,res)=>{
    try {
        const allAdmins = await adminModel.findAll()
        res.status(200).json({
            message:"All admins",
            data:allAdmins
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            error:error.message
        })
    }
}

exports.getOne = async (req,res)=>{
    try {
        const id = req.params.id
        const admin = await adminModel.findByPk(id)
        const tasks = await ticketModel.findAll()
        res.status(200).json({
            message:`Admin ${admin.fullName}'s full details`,
            data:admin,
            tasks
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            error:error.message
        })
    }
}

exports.updateAdmin = async (req,res)=>{
    try {
        const id = req.params.id
        const {fullName} = req.body
        const admin = await adminModel.findByPk(id)
        await admin.update({fullName})
        res.status(200).json({
            message:`Admin ${admin.fullName}'s details updated successfully`,
            data:admin
        })

    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            error:error.message
        })
    }
}

exports.deleteAdmin = async (req,res)=>{
    try {
        const id = req.params.id
        const admin = await adminModel.findByPk(id)
        await admin.destroy()
        res.status(200).json({
            message:"Admin deleted"
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            error:error.message
        })
    }
}

exports.verifyBusiness = async(req,res)=>{
    try {
        const {businessId} = req.body
        const business = await businessModel.findByPk(businessId)
        await business.update({businessStatus:"verified"},{where:{id:businessId}})
        res.status(200).json({
            message:"business verified successfully",
            business
        })

    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            error:error.message
        })
    }
}

exports.verifyKyc= async(req,res)=>{
    try {
        const {userId} = req.body
        const investor = await investorModel.findByPk(userId)
        const user = await UserModel.findByPk(userId)
        if(!user && investor){
            await investor.update({kycStatus:"verified"},{where:{id:userId}})
            return res.status(200).json({
                message:"investor kyc verified successfully",
                investor
            })
        }else if(!investor && user){
            await user.update({kycStatus:"verified"},{where:{id:userId}})
            return res.status(200).json({
                message:"business Owner kyc verified successfully",
                user
            })
        }else{
            return res.status(404).json({
                message:"User not found"
            })
        }
        

    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            error:error.message
        })
    }
}

