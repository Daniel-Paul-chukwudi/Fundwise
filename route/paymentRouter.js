const {initializeSubscriptionPaymentBusiness,initializeInvestementPaymentInvestor,webHook,verifyPayment, getAll} = require('../Controller/paymentController')
const {checkLogin, checkInvestorLogin} = require('../Middleware/authentication')

const router = require('express').Router()

router.post('/makePaymentBusiness',checkLogin, initializeSubscriptionPaymentBusiness)

router.post('/makeInvestment',checkInvestorLogin,initializeInvestementPaymentInvestor)

router.get('/verify-payment', verifyPayment);

router.get('/allP',getAll)

router.post('/Pcheck',webHook)

module.exports = router
