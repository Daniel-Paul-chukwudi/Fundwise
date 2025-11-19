const adminModel = require('../models/admin')
const ticketModel = require('../models/supportticket')
const businessModel = require('../models/business')
const UserModel = require('../models/user')
const investorModel = require('../models/investor')
const KycModel = require('../models/kyc-businessOwner');
const KycModelI = require('../models/kyc-investor');
const agreementModel = require('../models/agreement')
const {notify} = require('../helper/notificationTemplate')


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

exports.getAllAgreements = async( req,res)=>{
    try {
        const allAgreements = await agreementModel.findAll()
        res.status(200).json({
            message:"All agreements",
            data:allAgreements
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
        notify({
            userId:business.businessOwner,
            title:`Your business has been approved`,
            businessId:businessId,
            description:`hello ${business.businessOwnerName} your business has been approved .\n
            Thank you for putting your trust in TrustForge 👊😁`
            }) 
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
        let kyc
        const investor = await investorModel.findByPk(userId)
        const user = await UserModel.findByPk(userId)
        if(!user && investor){
            kyc = await KycModelI.update({verificationStatus:"approved"},{where:{userId:userId}})
            await investor.update({kycStatus:"verified"},{where:{id:userId}})
            notify({
                userId:investor.id,
                title:`Your kyc has been approved`,
                description:`hello ${investor.fullName} your kyc has been approved .\n
                Thank you for putting your trust in TrustForge 👊😁`
                })            
            return res.status(200).json({
                message:"investor kyc verified successfully",
                investor
            })
        }else if(!investor && user){
            kyc = await KycModel.update({verificationStatus:"approved"},{where:{userId:userId}})
            await user.update({kycStatus:"verified"},{where:{id:userId}})
            notify({
                userId:user.id,
                title:`Your kyc has been approved`,
                description:`hello ${user.fullName} your kyc has been approved .\n
                Thank you for putting your trust in TrustForge 👊😁`
                }) 
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

exports.UnVerifyKyc= async(req,res)=>{
    try {
        const {userId} = req.body
        let kyc
        const investor = await investorModel.findByPk(userId)
        const user = await UserModel.findByPk(userId)
        if(!user && investor){
            kyc = await KycModelI.destroy({where:{userId:userId}})
            await investor.update({kycStatus:"not provided"},{where:{id:userId}})          
            return res.status(200).json({
                message:"investor kyc Unverified successfully",
                investor
            })
        }else if(!investor && user){
            kyc = await KycModel.destroy({where:{userId:userId}})
            await user.update({kycStatus:"not provided"},{where:{id:userId}})
            return res.status(200).json({
                message:"business Owner kyc Unverified successfully",
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

exports.getOneKyc = async (req,res)=>{
     try {
        const {userId} = req.body
        const investor = await investorModel.findByPk(userId)
        const user = await UserModel.findByPk(userId)
        if(!user && investor){
            const kycI = await KycModelI.findOne({where:{userId:userId}})
            return res.status(200).json({
                message:"The kyc of this investor",
                kycI
            })
        }else if(!investor && user){
            const kyc = await KycModel.findOne({where:{userId:userId}})
            return res.status(200).json({
                message:"The kyc of this user",
                kyc
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

exports.getAllKyc = async (req,res)=>{
    try {
        let KYC = []
        const kycs = await KycModel.findAll({where:{verificationStatus: "pending"}})
        const kycs2 = await KycModelI.findAll({where:{verificationStatus: "pending"}})

        res.status(200).json({
            message:"All kys in the DB",
            businessOwners:kycs,
            investors:kycs2
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            error:error.message
        })
    }
}


