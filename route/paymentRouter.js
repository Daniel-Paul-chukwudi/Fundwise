const {initializeSubscriptionPaymentBusiness,webHook} = require('../Controller/paymentController')
const {checkLogin} = require('../Middleware/authentication')

const router = require('express').Router()

router.post('/makePaymentBusiness',checkLogin, initializeSubscriptionPaymentBusiness)

router.post('/Pcheck',webHook)

module.exports = router
