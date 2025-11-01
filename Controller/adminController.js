const adminModel = require('../models/admin')
const ticketModel = require('../models/supportticket')

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