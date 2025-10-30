require('dotenv').config()
const userModel = require('../models/user')
const businessModel = require('../models/business')
const saveModel = require('../models/save')
const meetingModel = require('../models/meeting')
const jwt = require('jsonwebtoken')
const {verify,forgotPassword}= require('../Middleware/emailTemplates')
const sendEmail = require('../Middleware/Bmail')
const bcrypt = require('bcrypt')
const { where } = require('sequelize')



exports.signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, email, password,confirmPassword } = req.body
    const user = await userModel.findOne({where:{ email: email.toLowerCase() }})
    // console.log(user);
    
    // if (user !== null) {
    //   return res.status(403).json({
    //     message: 'User already exists, Log in to your account',
    //   })
      // return next(createError(404, "User not found"));
    //}
    if(password !== confirmPassword){   
      return res.status(403).json({
        message:"Passwords dont match"
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const otp = Math.round(Math.random() * 1e6)//6 digits
      .toString()
      .padStart(6, '0')

    const newUser = new userModel({
      firstName,
      lastName,
      phoneNumber,
      password: hashedPassword,
      email:email.toLowerCase(),
      otp: otp,
      otpExpiredAt:Date.now() + (1000 * 120)
    })
    console.log(newUser);
    
    //Date.now() + 1000 * 120
    await newUser.save()
    // console.log(newUser.dataValues);
    

    const verifyMail = {
      email:newUser.email,
      subject:`Please verify your email ${newUser.firstName}`,
      html:verify(newUser.firstName,newUser.otp)//email template 
    }
    sendEmail(verifyMail)


    return res.status(201).json({
      message: 'User created successfully',
      data: newUser,

    })
  } catch (error) {
    next(error)
  }
}

exports.verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    // Find user by email
    const user = await userModel.findOne({ where: { email: email.toLowerCase() } });
    // console.log("user:", user);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // console.log("current",new Date(Date.now() + 1000 * 60 * 2));
    console.log("user current",user.otpExpiredAt);
    console.log("new date",(Date.now() + (1000 * 120)));
    // console.log(Date.now());
    // console.log(Date.now()+1000*120);
    // console.log(Date.now()+(1000*120));

    
    
    
    //  Check OTP
    // if ((Date.now() + (1000 * 120)) > user.otpExpiredAt) {
    //   return res.status(400).json({ message: 'OTP Expired' });
    // }
    
    
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    //  Update verification
    Object.assign(user, {
      otp: null,
      otpExpiredAt: null,
      isVerified: true
    });

    await user.save();
    return res.status(200).json({ 
      message: 'Email verified successfully',
      data:user 
    });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
      
      try {
        const { email, password } = req.body;
    // Find user in SQL database
    const user = await userModel.findOne({ where: { email: email.toLowerCase() } });
    if (user === null) {
      return res.status(404).json({ 
        message: 'User not found' });
    }
    if(user.isVerified === false){
      return res.status(401).json({
        message:"Please verify your account"
      })
    }
    
    //  Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    // Return response
    return res.status(200).json({
      message: 'Login successful',
      token,
      
    });
  } catch (error) {
    next(error);
  }
};

exports.userResendOtp = async (req, res, next) => {
  const { email } = req.body

  try {
    const user = await userModel.findOne({where:{ email: email.toLowerCase() }})
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    const newOtp = Math.floor(1000 + Math.random() * 9000).toString()
    user.otp = newOtp
    otpExpiredAt: new Date(Date.now() + 1000 * 60 * 2) // 2 minutes later


    await user.save()

    const emailOptions = {
      email: user.email,
      subject: 'OTP Resent',
      html: verify(newOtp, user.firstName),
    }

    await sendEmail(emailOptions)

    res.status(200).json({
      message: 'OTP resent successfully',
    })
  } catch (error) {
    next(error)
  }
}

exports.changePassword = async (req, res, next) => {
  const { id } = req.user; // comes from the JWT middleware
  const { oldPassword, newPassword, confirmPassword } = req.body;
  
  try {
    //Find user in SQL database
    const user = await userModel.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    //Check if old password matches
    const checkOldPassword = await bcrypt.compare(oldPassword, user.password);
    if (!checkOldPassword) {
      return res.status(400).json({
        message: "Old password incorrect",
      });
    }

    //Ensure new password matches confirmation
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "New password mismatch",
      });
    }

    //Hash and save the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    user.password = hashedPassword;
    await user.save();
    
    // v21
    // Return success message
    return res.status(200).json({
      message: "Password changed successfully",
      data:user
    });
  } catch (error) {
    console.error("Change password error:", error);
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
        subject:'Password reset link',
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
    const {newPassword, confirmPassword} = req.body;
    if (newPassword !== confirmPassword) {
      return res.status(404).json({
          message:'passwords do not match'
      });
    } 
     const decoded = jwt.verify(token, process.env.JWT_SECRET)
     if(decoded === null){
      return res.status(403).json({
          message:"invalid token or token expired",
          error:error
      })
     }

    const user = await userModel.findOne({where:{id:decoded.id}});
    if (!user) {
      return res.status(404).json({
          message:'user not found'
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await  bcrypt.hash(newPassword, salt);

    await user.update({password:hash})

      res.status(200).json({
          message:'password reset successful, try and login again',
          data:user
      });
  }catch(error){
      res.status(500).json({
          message:'internal server error',
          error:error.message
      })
  }
};

exports.getAll = async (req,res)=>{
    try {
        const users = await userModel.findAll()

        res.status(200).json({
            message:"All users in the database",
            count:users.length,
            data: users
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
};

exports.getOne = async(req,res)=>{
  try {
        const id  = req.params.id
        const user = await userModel.findByPk(id)
        // const savedBusinesses = await saveModel.findAll({where:{userId:id}})
        // console.log(savedBusinesses);
        
        const businesses = await businessModel.findAll({where:{businessOwner:id}})
        let totalLikes = 0
        let totalViews = 0
        businesses.forEach((x)=>{
          totalLikes += x.likeCount
          totalViews += x.viewCount
        })
        const meetings = []
        meetings.push(await meetingModel.findAll({where:{host:id}}))
        meetings.push(await meetingModel.findAll({where:{guest:id}}))
        const response = {
          user,
          businesscount:businesses.length,
          totalLikes,
          totalViews,
          businesses,
          meetings
        }


        res.status(200).json({
            message:"The user in the database",
            data: response
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

exports.deleteUser = async (req,res)=>{
  try {
    const {email} = req.body
    const user = await userModel.findOne({where:{email:email.toLowerCase()}})
    if(!user){
      return res.status(404).json({
        message:"the guy no dey DB"
      })
    }else{
      await businessModel.destroy({where:{businessOwner:user.id}})
      user.destroy()
      res.status(200).json({
      message:"i don commot am"
    })}
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    })
  }
}

exports.subscriptionBypass = async (req,res)=>{
  try {
    const {id} = req.body
    const user = await userModel.findByPk(id)

    user.subscribed = true 
    user.viewAllocation = 1
    await user.save()
    res.status(200).json({
      message:"stuff",
      data:user
    })

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    })
  }
}

