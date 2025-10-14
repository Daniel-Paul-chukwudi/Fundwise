require('dotenv').config()
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')


exports.register = async (req,res)=>{
    console.log("connected");
    try {
        const {firstName,lastName,email,password}= req.body
        
        
       const user = await userModel.create({
            firstName,
            lastName,
            email,
            password
        }) 
        res.status(201).json({
            message:"Created successfully",
            data: user
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
};

exports.getAllUsers = async (req,res)=>{
    try {
        const users = await userModel.findAll()

        res.status(200).json({
            message:"All users in the database",
            data: users
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
};

exports.login = async(req,res)=>{
    try {
        const {email,password}= req.body
        const user = await userModel.findOne({where:{email:email.toLowerCase()}})

        const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:"10m"})

        res.status(200).json({
            message:`welcome ${user.firstName} we are happy to see you`,
            data: token
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

exports.changeRole = async(req,res)=>{
    try {
        const {email} = req.body
        const user = await userModel.findOne({where:{email:email}})
        const updated = await user.update({role:"admin"})

        res.status(200).json({
            message:`Adminerized`,
            data: user,updated
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }

}