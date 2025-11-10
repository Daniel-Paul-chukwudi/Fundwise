const userModel = require('../models/user')
const otpGen = require('otp-generator')
const businessModel = require('../models/business')
const axios = require('axios')
const paymentModel = require('../models/payment')
const investorModel = require('../models/investor')
const agreementModel = require('../models/agreement')
const notificationModel = require('../models/notification')






exports.initializeSubscriptionPaymentInvestor = async (req, res) => {
  try {
      const { id } = req.user;
      const user = await investorModel.findByPk(id);
      const code = await otpGen.generate(12, { upperCaseAlphabets: false, lowerCaseAlphabets: true, digits: true, specialChars: false })
      const ref = `TF-${code}-INS`
      const {price} = req.body
      const link = `https://thetrustforge.vercel.app/payment-success/${user.id}/${user.fullName}/${ref}/${price}`
      

    if (user === null) {
      return res.status(404).json({
        message: 'Investor not found'
      })
    }

    const paymentData = {
      amount: price,
      currency: 'NGN',
      reference: ref,
      redirect_url:link,
      customer: {
        email: user.email,
        name: `${user.fullName}`
      }
    }
    console.log(paymentData);
    

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
      userType:"investor"
    });

    if (data?.status === true) {
      await payment.save();
    }
    // const link = data?.data?.checkout_url
    // res.redirect(link)
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

exports.initializeSubscriptionPaymentBusinessOwner = async (req, res) => {
  try {
      const { id } = req.user;
      const user = await userModel.findByPk(id);
      const code = await otpGen.generate(12, { upperCaseAlphabets: false, lowerCaseAlphabets: true, digits: true, specialChars: false })
      const ref = `TF-${code}-BOS`
      const {price} = req.body

      

    if (user === null) {
      return res.status(404).json({
        message: 'user not found'
      })
    }
    const link = `https://thetrustforge.vercel.app/payment-success/${user.id}/${user.fullName}/${ref}/${price}`

    const paymentData = {
      amount: price,
      currency: 'NGN',
      reference: ref,
      redirect_url:link,
      customer: {
        email: user.email,
        name: `${user.fullName}`
      }
    }
    console.log(paymentData);
    

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

    // const link = data?.data?.checkout_url
    // res.redirect(link)
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

exports.initializeInvestementPaymentInvestor = async (req, res) => {
  try {
      const { id } = req.user;
      const user = await investorModel.findByPk(id);
      const code = await otpGen.generate(12, { upperCaseAlphabets: false, lowerCaseAlphabets: true, digits: true, specialChars: false })
      const ref = `TF-${code}-ININ`
      const {price,businessId} = req.body
      

    if (user === null) {
      return res.status(404).json({
        message: 'User not found'
      })
    }
    const link = `https://thetrustforge.vercel.app/dashboard/investor/payment-success/${user.id}/${user.fullName}/${ref}/${price}`
    

    const paymentData = {
      amount: price,
      currency: 'NGN',
      reference: ref,
      redirect_url:link,
      customer: {
        email: user.email,
        name: `${user.fullName}`
      }
    }

    const { data } = await axios.post('https://api.korapay.com/merchant/api/v1/charges/initialize', paymentData, {
      headers: {
        Authorization: `Bearer ${process.env.KORA_SECRET_KEY}`
      }
    });

    const payment = new paymentModel({
      userId: id,
      paymentType:'investment',
      reference: ref,
      price,
      userType:"investor",
      businessId
    });

    if (data?.status === true) {
      await payment.save();
    }

    // const link = data?.data?.checkout_url
    // res.redirect(link)
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

exports.verifyPayment = async (req, res) => {
  try {
    const { reference } = req.query;
    console.log(reference);
    
    const payment = await paymentModel.findOne({where:{reference}})
    console.log(payment);
    
    if (payment === null) {
      return res.status(404).json({
        message: 'Payment not found'
      })
    }
    const { data } = await axios.get(`https://api.korapay.com/merchant/api/v1/charges/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.KORA_SECRET_KEY}`
      }
    })

    console.log(data)
    if (data?.status === true && data?.data?.status === "success") {
      payment.status = 'Successful'
      await payment.save();
      res.status(200).json({
        message: 'Payment Verified Successfully'
      })
    } else{
      payment.status = 'Failed'
      await payment.save();
      res.status(200).json({
        message: 'Payment Failed'
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error verifying payment: ' + error.message
    })
  }
};

exports.getAll = async (req,res)=>{
    try {
       const payments = await paymentModel.findAll()
       res.status(200).json({
        message:"all payments",
        data:payments
       })
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}

exports.webHook = async (req, res) => {
  try {
    const { event , data } = req.body;
    const payment = await paymentModel.findOne({where:{ reference:data.reference }});
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
    // data example
    // {
    // reference: 'TF-9gequ4em9mk6-BO',
    // payment_reference: 'TF-9gequ4em9mk6-BO',
    // currency: 'NGN',
    // amount: 10044,
    // fee: 140.36,
    // payment_method: 'card',
    // status: 'success'
    // }

    // console.log(data)
    // console.log(payment);
    
    if ( event === "charge.success") {
      let link = ''
      payment.status = 'Successful'
      await payment.save();
      console.log(payment);
        if (payment.paymentType === 'subscription'){
            if(payment.userType === 'investor'){
              const targetI = await investorModel.findByPk(payment.userId)
              // console.log('investor',targetI);
              await notificationModel.create({
              userId:payment.userId,
              businessId,
              title:`Your subscription was successful `,
              description:`hello ${targetI.fullName} your subscription was successful and you have been allocated 5 view points.\n
              Thank you for putting your trust in TrustForge 👊😁\n one quicky for you 😉`
              })
              targetI.subscribed = true
              targetI.viewAllocation = 5
              await targetI.save()
            }else if(payment.userType === 'businessOwner'){
              const targetB = await userModel.findByPk(payment.userId)
              // console.log('business',targetB);
              targetB.subscribed = true
              await targetB.save()
              await notificationModel.create({
              userId:payment.userId,
              businessId,
              title:`Your subscription was successful `,
              description:`hello ${targetB.fullName} your subscription was successful and your business has been added to the promoted section.\n
              Thank you for putting your trust in TrustForge 👊😁\n one quicky for you 😉`
              })
            }
        }else if(payment.paymentType === 'investment'){
          
          const targetI = await investorModel.findByPk(payment.userId)
          targetI.totalInvestment += payment.price
          console.log(targetI);
          await targetI.save()
          const Business = await businessModel.findByPk(payment.businessId)
          Business.fundRaised += payment.price
          Business.save()
          await notificationModel.create({
            userId:payment.userId,
            businessId:payment.businessId,
            title:`Your investment was successful `,
            description:`hello ${targetI.fullName} your investment payment into ${Business.businessName} was successful .\n
            Thank you for putting your trust in TrustForge 👊😁\n one quicky for you 😉`
            })
            await notificationModel.create({
              userId:Business.businessOwner,
          businessId:payment.businessId,
          title:`You just got an investor `,
          description:`hello ${Business.businessOwnerName} your ${Business.businessName} was just funded with the sum of ${payment.price} by ${targetI.fullName} .\n
          Thank you for putting your trust in TrustForge 👊😁\n one quicky for you 😉`
            })
        
          const targetBusiness = await agreementModel.findOne({where:{businessId:payment.businessId,investorId:targetI.id}})
          if(targetBusiness){
            await agreementModel.update({totalInvestment: targetBusiness.totalInvestment += payment.price},
            {where:{businessId:payment.businessId,investorId:targetI.id}})
          }else if(!targetBusiness){
            await agreementModel.create({
              investorId:payment.userId,
              businessOwner:Business.businessOwner,
              businessId:payment.businessId,
              totalInvestment:payment.price
            })
          }
          
        }
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