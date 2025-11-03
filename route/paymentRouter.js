const {initializeInvestementPaymentInvestor,webHook,verifyPayment, getAll, initializeSubscriptionPaymentInvestor, initializeSubscriptionPaymentBusinessOwner} = require('../Controller/paymentController')
const {checkInvestorLogin, checkLogin} = require('../Middleware/authentication')
const {paymentValidator} = require('../Middleware/validator')

const router = require('express').Router()

/**
 * @swagger
 * /subscribeInvestor:
 *   post:
 *     summary: Initialize subscription payment for an investor
 *     description: Authenticated investors can initialize a subscription payment through KoraPay. A reference is generated for the transaction, and the payment record is stored in the database.
 *     tags:
 *       - Investor Payments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - price
 *             properties:
 *               price:
 *                 type: number
 *                 example: 5000
 *                 description: The subscription amount in Naira (NGN)
 *     responses:
 *       200:
 *         description: Payment initialized successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Payment Initialized successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     reference:
 *                       type: string
 *                       example: "TF-ab12cd34ef56-INS"
 *                     url:
 *                       type: string
 *                       example: "https://checkout.korapay.com/pay/ab12cd34ef56"
 *                 payment:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "inv_01ab23cd45ef67gh"
 *                     paymentType:
 *                       type: string
 *                       example: "subscription"
 *                     reference:
 *                       type: string
 *                       example: "TF-ab12cd34ef56-INS"
 *                     price:
 *                       type: number
 *                       example: 5000
 *                     userType:
 *                       type: string
 *                       example: "Investor"
 *                 paymentData:
 *                   type: object
 *                   properties:
 *                     amount:
 *                       type: number
 *                       example: 5000
 *                     currency:
 *                       type: string
 *                       example: "NGN"
 *                     reference:
 *                       type: string
 *                       example: "TF-ab12cd34ef56-INS"
 *                     customer:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           example: "investor@example.com"
 *                         name:
 *                           type: string
 *                           example: "John Doe"
 *       401:
 *         description: Unauthorized — token missing, invalid, or expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please login again to continue"
 *       404:
 *         description: Investor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Investor not found"
 *       500:
 *         description: Internal server error or KoraPay API error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error initializing payment: Request failed with status code 400"
 *                 error:
 *                   type: object
 *                   example:
 *                     status: false
 *                     message: "Invalid API key"
 */
router.post('/subscribeInvestor', checkInvestorLogin, initializeSubscriptionPaymentInvestor);

/**
 * @swagger
 * /subscribeBusinessOwner:
 *   post:
 *     summary: Initialize subscription payment for a Business Owner
 *     description: Authenticated business owners can initialize a subscription payment through KoraPay. This generates a unique reference, records the payment in the database, and provides a checkout link for payment completion.
 *     tags:
 *       - Business Owner Payments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - price
 *             properties:
 *               price:
 *                 type: number
 *                 example: 5000
 *                 description: Subscription amount in Naira (NGN)
 *     responses:
 *       200:
 *         description: Subscription payment initialized successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Payment Initialized successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     reference:
 *                       type: string
 *                       example: "TF-ab12cd34ef56-BOS"
 *                     url:
 *                       type: string
 *                       example: "https://checkout.korapay.com/pay/ab12cd34ef56"
 *                 payment:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "user_01ab23cd45ef67gh"
 *                     paymentType:
 *                       type: string
 *                       example: "subscription"
 *                     reference:
 *                       type: string
 *                       example: "TF-ab12cd34ef56-BOS"
 *                     price:
 *                       type: number
 *                       example: 5000
 *                     userType:
 *                       type: string
 *                       example: "BusinessOwner"
 *                 paymentData:
 *                   type: object
 *                   properties:
 *                     amount:
 *                       type: number
 *                       example: 5000
 *                     currency:
 *                       type: string
 *                       example: "NGN"
 *                     reference:
 *                       type: string
 *                       example: "TF-ab12cd34ef56-BOS"
 *                     customer:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           example: "owner@example.com"
 *                         name:
 *                           type: string
 *                           example: "Jane Doe"
 *       401:
 *         description: Unauthorized — missing, invalid, or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please login again to continue"
 *       404:
 *         description: Business owner not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "user not found"
 *       500:
 *         description: Internal server error or KoraPay API error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error initializing payment: Request failed with status code 400"
 *                 error:
 *                   type: object
 *                   example:
 *                     status: false
 *                     message: "Invalid API key"
 */
router.post('/subscribeBusinessOwner', checkLogin, initializeSubscriptionPaymentBusinessOwner);

/**
 * @swagger
 * /makeInvestment:
 *   post:
 *     summary: Initialize an investment payment for a business
 *     description: Authenticated investors can initiate an investment payment through KoraPay. The system generates a transaction reference and records the payment before redirecting the investor to complete payment.
 *     tags:
 *       - Investor Payments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - price
 *               - businessId
 *             properties:
 *               price:
 *                 type: number
 *                 example: 100000
 *                 description: Amount to invest in Naira (NGN)
 *               businessId:
 *                 type: string
 *                 example: "bus_01ab23cd45ef67gh"
 *                 description: The ID of the business being invested in
 *     responses:
 *       200:
 *         description: Investment payment initialized successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Payment Initialized successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     reference:
 *                       type: string
 *                       example: "TF-ab12cd34ef56-ININ"
 *                     url:
 *                       type: string
 *                       example: "https://checkout.korapay.com/pay/ab12cd34ef56"
 *                 payment:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "inv_01ab23cd45ef67gh"
 *                     paymentType:
 *                       type: string
 *                       example: "Investment"
 *                     reference:
 *                       type: string
 *                       example: "TF-ab12cd34ef56-ININ"
 *                     price:
 *                       type: number
 *                       example: 100000
 *                     userType:
 *                       type: string
 *                       example: "Investor"
 *                     businessId:
 *                       type: string
 *                       example: "bus_01ab23cd45ef67gh"
 *                 paymentData:
 *                   type: object
 *                   properties:
 *                     amount:
 *                       type: number
 *                       example: 100000
 *                     currency:
 *                       type: string
 *                       example: "NGN"
 *                     reference:
 *                       type: string
 *                       example: "TF-ab12cd34ef56-ININ"
 *                     customer:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           example: "investor@example.com"
 *                         name:
 *                           type: string
 *                           example: "John Doe"
 *       401:
 *         description: Unauthorized — token missing, invalid, or expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please login again to continue"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal server error or KoraPay API error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error initializing payment: Request failed with status code 400"
 *                 error:
 *                   type: object
 *                   example:
 *                     status: false
 *                     message: "Invalid API key"
 */
router.post('/makeInvestment', checkInvestorLogin, initializeInvestementPaymentInvestor);

/**
 * @swagger
 * /verify-payment:
 *   get:
 *     summary: Verify the status of a payment using its reference
 *     description: >
 *       This endpoint verifies the payment status from the KoraPay API using the provided reference.
 *       It also updates the corresponding payment record in the database with the result (Successful or Failed).
 *     tags:
 *       - Payments
 *     parameters:
 *       - in: query
 *         name: reference
 *         required: true
 *         description: The unique payment reference generated during payment initialization.
 *         schema:
 *           type: string
 *           example: "TF-ab12cd34ef56-ININ"
 *     responses:
 *       200:
 *         description: Payment verification result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Payment Verified Successfully
 *       404:
 *         description: Payment record not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Payment not found
 */
router.get('/verify-payment', verifyPayment);

/**
 * @swagger
 * /allP:
 *   get:
 *     summary: Retrieve all payment records
 *     description: Fetches a list of all payments made by users (Investors or Business Owners), including their details such as reference, type, price, and user type.
 *     tags:
 *       - Payments
 *     responses:
 *       200:
 *         description: Successfully retrieved all payments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: all payments
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "1"
 *                       userId:
 *                         type: string
 *                         example: "user_01ab23cd45ef67gh"
 *                       paymentType:
 *                         type: string
 *                         example: "Investment"
 *                       reference:
 *                         type: string
 *                         example: "TF-ab12cd34ef56-ININ"
 *                       price:
 *                         type: number
 *                         example: 10000
 *                       userType:
 *                         type: string
 *                         example: "Investor"
 *                       businessId:
 *                         type: string
 *                         nullable: true
 *                         example: "biz_01ab23cd45ef67gh"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-07T12:34:56.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-07T12:35:56.000Z"
 *       500:
 *         description: Internal server error while fetching payment records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: internal server error
 *                 error:
 *                   type: string
 *                   example: "Database connection error"
 */
router.get('/allP',getAll)

router.post('/Pcheck',webHook)

module.exports = router
