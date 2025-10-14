require('dotenv').config()
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


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

exports.forgotPassword = async (req,res) => {
    try {
      const {email} = req.body
      const user = await userModel.findOne({where:{email}});
      if (!user) {
        return res.status(404).json({
            message:'user not found'
        })
      }
      const token = jwt.sign({id:userExists.id}, process.env.JWT_SECRET,{
        expiresIn:'5m',
      });
      const link = `${req.protocol}://${req.get(
        'host'
      )}/api/v1/reset-password/${userExists.id}/${token}`;
   
       await sendEmail({email,
        subject:'Password reset',
        html:passwordResetHtml(link,user.firstName)});
      res.status(200).json({
        message:'password reset email sent successfully',link
      })
    } catch (error) {
    res.status(500).json({
        message:'internal server errror',
        error:error.message
    })
    }
}

exports.resetPassword = async (req,res) => {
    try {
        const {id,token} = req.params;
      const {password, confirmPassword} = req.body;
      if (password !== confirmPassword) {
        return res.status(404).json({
            message:'passwords do not match'
        });
      } 
      let decoded;
      try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(400).json({
            message:'invalid or expired token'
    });
}
const user = await userModel.findOne({where:{id}});
if (!user) {
    return res.status(404).json({message:'user not found'});
}
const salt = await bcrypt.genSalt(10);
const hash = await  bcrypt.hash(password, salt);

await user.update({password:hash})
res.status(200).json({message:'password reset successful'});
    }catch(error){
        res.status(500).json({
            message:'internal server error',
            error:error.message
        })
    }
};