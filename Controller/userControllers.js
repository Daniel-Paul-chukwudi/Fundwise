require('dotenv').config()
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')



exports.signUp = async (req, res, next) => {
  const { firstName, lastName, phoneNumber, role, email, password } = req.body

  try {
    const user = await userModel.findOne({ email: email.toLowerCase() })
    if (user) {
      return res.status(404).json({
        message: 'User already exists, Log in to your account',
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const otp = Math.round(Math.random() * 1e4)
      .toString()
      .padStart(4, '0')

    const newUser = new userModel({
      firstName,
      lastName,
      phoneNumber,
      password: hashedPassword,
      role,
      email,
      otp: otp,
      otpExpiredAt: Date.now() + 1000 * 60,
    })
    const savedUser = await newUser.save()

    
    const emailOptions = {
      email: newUser.email,
      subject: 'Sign up successful',
      html: signUpTemplate(otp, newUser.firstName),
    }

    emailSender(emailOptions)

    return res.status(201).json({
      message: 'User created successfully',
      data: savedUser,
    })
  } catch (error) {
    next(error)
  }
}

exports.resendOtp = async (req, res, next) => {
  const { email } = req.body

  try {
    const user = await userModel.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    const newOtp = Math.floor(1000 + Math.random() * 9000).toString()
    user.otp = newOtp
    user.otpExpiredAt = Date.now() + 2 * 60 * 1000

    await user.save()

    const emailOptions = {
      email: user.email,
      subject: 'OTP Resent',
      html: resendOtpTemplate(newOtp, user.firstName),
    }

    await emailSender(emailOptions)

    res.status(200).json({
      message: 'OTP resent successfully',
    })
  } catch (error) {
    next(error)
  }
}

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email required' });
  }
  if (!password) {
    return res.status(400).json({ message: 'Password required' });
  }

  try {
    // Find user in SQL database
    const user = await userModel.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
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
    });
  } catch (error) {
    console.error("Change password error:", error);
    next(error);
  }
};