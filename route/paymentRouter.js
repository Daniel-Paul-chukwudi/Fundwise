const {initializeInvestementPaymentInvestor,webHook,verifyPayment, getAll, initializeSubscriptionPaymentInvestor} = require('../Controller/paymentController')
const {checkLogin, checkInvestorLogin} = require('../Middleware/authentication')

const router = require('express').Router()

/**
 * @swagger
 * /subscribeInvestor:
 *   post:
 *     summary: Initialize subscription payment (Investor)
 *     description: This endpoint allows an authenticated investor to initialize a subscription payment using KoraPay. A valid JWT token is required in the Authorization header.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Subscription payment details
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
 *                 description: The subscription amount to be charged in NGN.
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
 *                       example: TF-ab12cd34ef56-INS
 *                     url:
 *                       type: string
 *                       example: https://checkout.korapay.com/checkout/ab12cd34ef56
 *                 payment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 5c82d24b-74b4-4de9-b7b8-f4f6e2ed13e0
 *                     userId:
 *                       type: string
 *                       example: 1b8a6c47-4d23-4b3e-b2d9-9d83ad38e84a
 *                     paymentType:
 *                       type: string
 *                       example: subscription
 *                     reference:
 *                       type: string
 *                       example: TF-ab12cd34ef56-INS
 *                     price:
 *                       type: number
 *                       example: 5000
 *                     userType:
 *                       type: string
 *                       example: Investor
 *                 paymentData:
 *                   type: object
 *                   properties:
 *                     amount:
 *                       type: number
 *                       example: 5000
 *                     currency:
 *                       type: string
 *                       example: NGN
 *                     reference:
 *                       type: string
 *                       example: TF-ab12cd34ef56-INS
 *                     customer:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           example: investor@email.com
 *                         name:
 *                           type: string
 *                           example: John Doe
 *       400:
 *         description: Missing or invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid input or missing price
 *       401:
 *         description: Unauthorized (missing or expired token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please login again to continue
 *       404:
 *         description: Investor not found or authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Investor not found
 *       500:
 *         description: Internal server error or payment initialization failure
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error initializing payment: Request failed with status code 400
 *                 error:
 *                   type: object
 *                   example:
 *                     status: false
 *                     message: Invalid merchant authorization
 */
router.post('/subscribeInvestor', checkInvestorLogin, initializeSubscriptionPaymentInvestor);


/**
 * @swagger
 * /makeInvestment:
 *   post:
 *     summary: Initialize investment payment (Investor)
 *     description: Allows an authenticated investor to make an investment in a business. The endpoint initializes a payment using KoraPay and returns a checkout URL for the investor to complete the transaction.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Investment details including price and business ID
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
 *                 description: The amount (in NGN) to invest in the business.
 *               businessId:
 *                 type: string
 *                 example: "c81e728d-9d4c-3f63-af06-7f89cc14862c"
 *                 description: The unique ID of the business the investor wants to invest in.
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
 *                       example: TF-xk3f92hd73sl-ININ
 *                     url:
 *                       type: string
 *                       example: https://checkout.korapay.com/checkout/xk3f92hd73sl
 *                 payment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 9a3ef95d-872e-42d9-a7d8-8d309fd6c519
 *                     userId:
 *                       type: string
 *                       example: 4d5f3e7a-98a2-45d9-8b8b-03b95d9031fa
 *                     paymentType:
 *                       type: string
 *                       example: Investment
 *                     reference:
 *                       type: string
 *                       example: TF-xk3f92hd73sl-ININ
 *                     price:
 *                       type: number
 *                       example: 100000
 *                     userType:
 *                       type: string
 *                       example: Investor
 *                     businessId:
 *                       type: string
 *                       example: c81e728d-9d4c-3f63-af06-7f89cc14862c
 *                 paymentData:
 *                   type: object
 *                   properties:
 *                     amount:
 *                       type: number
 *                       example: 100000
 *                     currency:
 *                       type: string
 *                       example: NGN
 *                     reference:
 *                       type: string
 *                       example: TF-xk3f92hd73sl-ININ
 *                     customer:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           example: investor@email.com
 *                         name:
 *                           type: string
 *                           example: John Doe
 *       400:
 *         description: Invalid or missing fields in the request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Missing required fields: price or businessId
 *       401:
 *         description: Unauthorized — token missing or expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please login again to continue
 *       404:
 *         description: Investor not found or business not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error or payment initialization failure
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error initializing payment: Request failed with status code 400
 *                 error:
 *                   type: object
 *                   example:
 *                     status: false
 *                     message: Invalid merchant authorization
 */
router.post('/makeInvestment', checkInvestorLogin, initializeInvestementPaymentInvestor);


router.get('/verify-payment', verifyPayment);

router.get('/allP',getAll)

router.post('/Pcheck',webHook)

module.exports = router
