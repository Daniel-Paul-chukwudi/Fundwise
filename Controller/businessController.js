require('dotenv').config()
const business = require('../models/business')
const businessModel = require('../models/business')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

exports.createBusiness= async(req,res)=>{
    try {
        const userId = req.user.id
        const {businessName,fundGoal,description,category}=req.body

        const business = new businessModel({
            businessName,
            fundGoal,
            description,
            category,
            businessOwner:userId
        })
        await business.save()

        const user = await userModel.findByPk(userId)
        const newbusiness = {
            businessId:business.id,
            businessName,
            fundGoal,
            description,
            category,
        }
        const ventures = user.businesses
        console.log("ventures",ventures);
        ventures.push(newbusiness)
        
        
        // await user.update({businesses:user.businesses})
        // const updatedUser = await userModel.update({businesses:ventures},{
        //     where:{email:user.email}
        // })

        

        res.status(201).json({
            message:"created successfully",
            data:business.dataValues,
            updatedUser,
            user
        })

    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}

exports.getBusiness = async(req,res)=>{
    try {
        const businesses = await businessModel.findAll()
        res.status(200).json({
                message:"All the businesses in the DB",
                data:businesses
        })
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}

exports.getOneById = async(req,res)=>{
    try {
        const id = req.params.id
        const target = await businessModel.findByPk(id)
        res.status(200).json({
            message:`Business found`,
            data:target
            })
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}

exports.getByCategory = async (req,res)=>{
    try {
        const filter = req.query.category
        const targets = await businessModel.findAll({where:{category:filter}})
        res.status(200).json({
            message: `businesses in the ${filter} category`,
            data:targets
        })
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}

exports.updateB = async (req,res)=>{
    try {
        const id = req.params.id
        const {businessName,fundGoal,description,category,businessOwner} = req.body
        const target = await businessModel.findByPk(id)
        const update = await target.update({businessName,fundGoal,description,category,businessOwner})
        res.status(200).json({
            message:"Business data updated successfully",
            previous:target,
            current:update
        })
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}

exports.deleteB = async(req,res)=>{
    try {
        const id = req.params.id
        const target = await businessModel.findByPk(id)
        await target.destroy()
        res.status(200).json({
            message:"Business data deleted successfully",
        })

    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}