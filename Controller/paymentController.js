const userModel = require('../models/user')
const otpGen = require('otp-generator')
const businessModel = require('../models/business')
const axios = require('axios')
const paymentModel = require('../models/payment')


exports.initializeSubscriptionPaymentBusiness = async (req, res) => {
  try {
      const { id } = req.user;
      const user = await userModel.findByPk(id);
      const code = await otpGen.generate(12, { upperCaseAlphabets: false, lowerCaseAlphabets: true, digits: true, specialChars: false })
      const ref = `TF-${code}-BO`
      const {price} = req.body
      

    if (user === null) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    const paymentData = {
      amount: price,
      currency: 'NGN',
      reference: ref,
      customer: {
        email: user.email,
        name: `${user.firstName} ${user.lastName}`
      }
    }

    const { data } = await axios.post('https://api.korapay.com/merchant/api/v1/charges/initialize', paymentData, {
      headers: {
        Authorization: `Bearer ${process.env.KORA_SECRET_KEY}`
      }
    });

    const payment = new paymentModel({
      userId: id,
      paymentType:'subscription',
      reference: ref,
      price,
      userType:"businessOwner"
    });

    if (data?.status === true) {
      await payment.save();
    }

    res.status(200).json({
      message: 'Payment Initialized successfuly',
      data: {
        reference: data?.data?.reference,
        url: data?.data?.checkout_url
      },
      payment,
      paymentData
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error initializing payment: ' + error.message,
      error: error.response?.data
    })
  }
};

exports.webHook = async (req, res) => {
  try {
    const { event , data } = req.body;
    const payment = await paymentModel.findOne({ reference:data.reference });
    if (payment === null) {
      return res.status(404).json({
        message: 'Payment not found'
      })
    }
    // const { data } = await axios.get(`https://api.korapay.com/merchant/api/v1/charges/${reference}`, {
    //   headers: {
    //     Authorization: `Bearer ${process.env.KORAPAY_SECRET_KEY}`
    //   }
    // })

    console.log(data)
    if ( event === "charge.success") {
      payment.status = 'Successful'
      await payment.save();
      res.status(200).json({
        message: 'Payment Verified Successfully'
      })
    } else if (event === "charge.failed"){
      payment.status = 'Failed'
      await payment.save();
      res.status(200).json({
        message: 'Payment Failed via webhook'
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error verifying payment via webhook' + error.message
    })
  }
};