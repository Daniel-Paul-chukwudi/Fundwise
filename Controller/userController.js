require('dotenv').config()
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {verify,forgotPassword} = require('../Middleware/emailTemplates')
const sendEmail = require('../Middleware/Bmail')


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

exports.verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;

  try {
    // Find user by email
    const user = await userModel.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    //  Check OTP
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    //  Check expiry
    if (new Date(user.otpExpiredAt) < new Date()) {
      return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
    }

    //  Update verification
    await user.update({
      isVerified: true,
      otp: null,
      otpExpiredAt: null,
    });

    return res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    next(error);
  }
};



exports.forgotPassword = async (req,res) => {
    try {
      const {email} = req.body
      const user = await userModel.findOne({where:{email}});
      if (!user) {
        return res.status(404).json({
            message:'user not found'
        })
      }
      const token = jwt.sign({id:user.id}, process.env.JWT_SECRET,{
        expiresIn:'10m',
      });
      const link = `${req.protocol}://${req.get('host')}/reset-password/${token}`;
   
       await sendEmail({email,
        subject:'Password reset',
        html:forgotPassword(link,user.firstName)});
      
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
        const {token} = req.params;
      const {password, confirmPassword} = req.body;
      if (password !== confirmPassword) {
        return res.status(404).json({
            message:'passwords do not match'
        });
      } 
       const decoded = jwt.verify(token, process.env.JWT_SECRET)
    //    if(decoded === null){
    //     return res.status(403).json({
    //         message:"invalid token or token expired",
    //         error:error
    //     })
       //}
    
        const user = await userModel.findOne({where:{id:decoded.id}});
        if (!user) {
            return res.status(404).json({
                message:'user not found'
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await  bcrypt.hash(password, salt);

        await user.update({password:hash})

        res.status(200).json({
            message:'password reset successful',
            data:user
        });
    }catch(error){
        res.status(500).json({
            message:'internal server error',
            error:error.message
        })
    }
};