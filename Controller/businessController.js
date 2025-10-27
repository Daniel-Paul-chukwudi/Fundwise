require('dotenv').config()
const business = require('../models/business')
const businessModel = require('../models/business')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const likeModel = require('../models/like')
const viewModel = require('../models/view')
const saveModel = require('../models/save')

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
        res.status(201).json({
            message:"created successfully",
            data:business.dataValues,
            user,
            busy:user.businesses
        })

    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}

exports.likeBusiness = async (req,res)=>{
    try {
        const {businessId} = req.body
        const {id} = req.user
        // console.log(id);
        
        const business = await businessModel.findOne({where:{id:businessId}})
        const likeCheck = await likeModel.findOne({where:{userId:id,businessId:businessId}})
        // console.log(likeCheck);
        
        if(likeCheck){
            business.likeCount -= 1
            await business.save()
            await likeModel.destroy({where:{userId:id,businessId:businessId}})
            return res.status(200).json({
                message:"unliked succesfully",
                data: business,
                businesslikes:business.likeCount
            })
        }else{
            const like = await likeModel.create({
                userId:id,
                businessId
            })
            business.likeCount += 1
            await business.save()
            return res.status(200).json({
            message:"liked succesfully",
            data: business,
            businesslikes:business.likeCount
        })
        }

    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}

exports.viewBusiness = async (req,res)=>{
    try {
        const {businessId} = req.body
        const {id} = req.user

        const user = await userModel.findByPk(id)

        const business = await businessModel.findOne({where:{id:businessId}})
        const viewCheck = await viewModel.findOne({where:{userId:id,businessId:businessId}})
        
        if (user.subscribed !== true) {
            res.status(401).json({
                message:`hello ${user.firstName} your subscription has expired`
            })
        }else if(viewCheck){
            return res.status(200).json({
                message:"viewed succesfully",
                data: business,
                businesslikes:business.viewCount
            })
        }else if(user.viewAllocation === 1){
            business.viewCount += 1
            await business.save()
            user.subscribed = false
            user.viewAllocation -= 1
            await user.save()
            return res.status(200).json({
            message:"viewed succesfully",
            data: business,
            businessviews:business.viewCount
        })
        
        }else{
            
            const view = await viewModel.create({
                userId:id,
                businessId
            })
            business.viewCount += 1
            await business.save()
            user.viewAllocation -= 1
            await user.save()
            return res.status(200).json({
            message:"viewed succesfully",
            data: business,
            businessviews:business.viewCount
        })
        }


    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}

exports.saveBusiness = async (req,res)=>{
    try {
        const {businessId} = req.body
        const {id} = req.user
        
        const business = await businessModel.findOne({where:{id:businessId}})
        const saveCheck = await saveModel.findOne({where:{userId:id,businessId:businessId}})
        
        if(saveCheck){
            await saveModel.destroy({where:{userId:id,businessId:businessId}})
            return res.status(200).json({
                message:"unsaved succesfully",
                data: business,
            })
        }else{
            const save = await saveModel.create({
                userId:id,
                businessId
            })

            return res.status(200).json({
            message:"saved succesfully",
            data: business,
        })
        }

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