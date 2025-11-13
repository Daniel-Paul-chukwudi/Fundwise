const express = require('express')
// const {register,getAll,login,changeRole,forgotPassword,resetPassword} = require("../Controller/userController")
const {checkInvestorLogin,checkAdmin, checkLogin} = require('../Middleware/authentication')
const {registerValidator, loginValidator, verifyValidator,changePasswordValidator,forgotPasswordValidator, resendValidator, resetPasswordValidator,deleteUserValidator} = require('../Middleware/validator')
const { signUp, logininvestor,forgotPassword,changePassword,resetPassword,getAll,deleteUser,getOne,verifyOtp, subscriptionBypass,investorResendOtp,makeDeal, fundingHistory} = require('../Controller/investorController')

const router = express.Router()

/**
 * @swagger
 * /makeDeal/{id}:
 *   post:
 *     summary: Create a new deal between an investor and a business
 *     description: Allows an authenticated investor to initiate a deal with a specific business, creating an agreement with status "meetup".
 *     tags:
 *       - Deals
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the business the investor wants to make a deal with.
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       201:
 *         description: Deal created successfully between the investor and the business
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Meeting between 2 and 5 created
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 12
 *                     investorId:
 *                       type: integer
 *                       example: 2
 *                     businessOwner:
 *                       type: integer
 *                       example: 4
 *                     businessId:
 *                       type: integer
 *                       example: 5
 *                     agreementStatus:
 *                       type: string
 *                       example: meetup
 *       404:
 *         description: Business not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Business not found
 */
router.post('/makeDeal/:id',checkInvestorLogin, makeDeal) 

/**
 * @swagger
 * /investor:
 *   post:
 *     summary: Register a new investor
 *     description: >
 *       Creates a new investor account, hashes the password, generates a 6-digit OTP for email verification,  
 *       and sends a verification email. The investor must verify their email before logging in.
 *     tags:
 *       - Investors
 *     requestBody:
 *       required: true
 *       description: Investor registration details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - phoneNumber
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "Jane Doe"
 *               phoneNumber:
 *                 type: string
 *                 example: "+2348123456789"
 *               email:
 *                 type: string
 *                 example: "janedoe@email.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "strongPassword123"
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: "strongPassword123"
 *     responses:
 *       201:
 *         description: Investor account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "investor created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     fullName:
 *                       type: string
 *                       example: "Jane Doe"
 *                     email:
 *                       type: string
 *                       example: "janedoe@email.com"
 *                     otp:
 *                       type: string
 *                       example: "123456"
 *                     otpExpiredAt:
 *                       type: integer
 *                       example: 1723467890123
 *       403:
 *         description: Investor already exists or password mismatch
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Passwords dont match"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post('/investor', signUp);

/**
 * @swagger
 * /investor:
 *   get:
 *     summary: Get all investors
 *     description: Retrieves a list of all investors stored in the database.
 *     tags:
 *       - Investors
 *     responses:
 *       200:
 *         description: Successfully retrieved all investors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All investor in the database"
 *                 count:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       fullName:
 *                         type: string
 *                         example: "Jane Doe"
 *                       email:
 *                         type: string
 *                         example: "janedoe@example.com"
 *                       phoneNumber:
 *                         type: string
 *                         example: "+2348012345678"
 *                       isVerified:
 *                         type: boolean
 *                         example: true
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-07T12:34:56.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-07T13:00:00.000Z"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */
router.get('/investor', getAll);

/**
 * @swagger
 * /investor/{id}:
 *   get:
 *     summary: Get a single investor by ID
 *     description: Retrieves details of an investor and their saved businesses based on the provided ID.
 *     tags:
 *       - Investors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the investor
 *         schema:
 *           type: string
 *           example: "c7b1a7b9-0e8f-4a4f-bb57-df6c5a55cfa7"
 *     responses:
 *       200:
 *         description: Successfully retrieved investor details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The investor in the database"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "c7b1a7b9-0e8f-4a4f-bb57-df6c5a55cfa7"
 *                         fullName:
 *                           type: string
 *                           example: "Jane Doe"
 *                         email:
 *                           type: string
 *                           example: "janedoe@example.com"
 *                         phoneNumber:
 *                           type: string
 *                           example: "+2348012345678"
 *                         isVerified:
 *                           type: boolean
 *                           example: true
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-10-07T12:34:56.000Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-10-07T13:00:00.000Z"
 *                     savedBusinesses:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "bf7821a1-ec87-4cf1-9e1a-14d45350a3c1"
 *                           businessName:
 *                             type: string
 *                             example: "TechNova"
 *                           description:
 *                             type: string
 *                             example: "A platform connecting startups to investors."
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-10-05T14:30:00.000Z"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */
router.get('/investor/:id', getOne);

/**
 * @swagger
 * /investorl:
 *   post:
 *     summary: Login an existing investor
 *     description: >
 *       Authenticates an investor by verifying their email and password.  
 *       Ensures the account is verified before granting access, and returns a signed JWT token upon success.
 *     tags:
 *       - Investors
 *     requestBody:
 *       required: true
 *       description: Investor login credentials
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: danielsaul@email.com
 *                 description: Registered email address of the investor
 *               password:
 *                 type: string
 *                 example: StrongPass@123
 *                 description: Investor’s account password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Incorrect password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Incorrect password
 *       401:
 *         description: Account not verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please verify your account
 *       404:
 *         description: Investor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: investor not found
 *       500:
 *         description: Internal server error during login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/investorl',loginValidator, logininvestor);

/**
 * @swagger
 * /verifyInvestor:
 *   post:
 *     summary: Verify investor email using OTP
 *     description: >
 *       Verifies an investor’s email address by validating the OTP sent to their email.  
 *       Once verified, the investor's account status is updated to `isVerified: true`.
 *     tags:
 *       - Investors
 *     requestBody:
 *       required: true
 *       description: Email and OTP details for verification
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 example: danielsaul@email.com
 *                 description: Investor’s registered email address
 *               otp:
 *                 type: string
 *                 example: "482913"
 *                 description: 6-digit OTP sent to the investor’s email
 *     responses:
 *       200:
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email verified successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 12
 *                     firstName:
 *                       type: string
 *                       example: Daniel
 *                     lastName:
 *                       type: string
 *                       example: Saul
 *                     email:
 *                       type: string
 *                       example: danielsaul@email.com
 *                     isVerified:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Invalid OTP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid OTP
 *       404:
 *         description: Investor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error during verification
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/verifyInvestor',verifyValidator, verifyOtp);

/**
 * @swagger
 * /resendi:
 *   post:
 *     summary: Resend OTP for investor account
 *     description: >
 *       Sends a new One-Time Password (OTP) to the investor’s registered email address for account verification.  
 *       The OTP expires 5 minutes after being generated.
 *     tags:
 *       - Investors
 *     requestBody:
 *       required: true
 *       description: Email of the investor requesting a new OTP
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "investor@example.com"
 *     responses:
 *       200:
 *         description: OTP resent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP resent successfully"
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
 *       400:
 *         description: Invalid request (e.g., malformed email)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid email format"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post('/resendi', resendValidator, investorResendOtp);

/**
 * @swagger
 * /changeInvestor:
 *   patch:
 *     summary: Change investor password
 *     description: Allows a logged-in investor to change their password after verifying the old one.
 *     tags:
 *       - Investors
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: "OldPass123!"
 *               newPassword:
 *                 type: string
 *                 example: "NewPass456!"
 *               confirmPassword:
 *                 type: string
 *                 example: "NewPass456!"
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password changed successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "a8f1b5b9-2e3d-4f21-8c1d-3b5a934ddf4c"
 *                     fullName:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-10-07T14:22:15.000Z"
 *       400:
 *         description: Invalid password input or mismatch
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "New password mismatch"
 *       401:
 *         description: Unauthorized or expired session
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Session expired, Please login again to continue"
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
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "internal server error"
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */
router.patch('/changeInvestor', checkInvestorLogin, changePassword);

/**
 * @swagger
 * /forgoti:
 *   post:
 *     summary: Send investor password reset link
 *     description: Sends a password reset link to the investor's registered email. The link expires in 10 minutes.
 *     tags:
 *       - Investors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "investor@example.com"
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset email sent successfully"
 *                 link:
 *                   type: string
 *                   example: "https://yourapi.com/reset-password/eyJhbGciOiJIUzI1NiIsInR5..."
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
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "internal server error"
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */
router.post('/forgoti', forgotPasswordValidator, forgotPassword);

/**
 * @swagger
 * /reset-passwordi/{token}:
 *   patch:
 *     summary: Reset investor password
 *     description: Allows an investor to reset their password using a valid token from the password reset email.
 *     tags:
 *       - Investors
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: JWT token sent via password reset email
 *         schema:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: "NewSecurePassword123!"
 *               confirmPassword:
 *                 type: string
 *                 example: "NewSecurePassword123!"
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset successful, try and login again"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: "investor@example.com"
 *       400:
 *         description: Passwords do not match
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "passwords do not match"
 *       403:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "invalid token or token expired"
 *       404:
 *         description: Investor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "investor not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "internal server error"
 *                 error:
 *                   type: string
 *                   example: "jwt malformed"
 */
router.patch('/reset-passwordi/:token', resetPassword);

/**
 * @swagger
 * /killi:
 *   delete:
 *     summary: Delete an investor account
 *     description: Permanently removes an investor from the database using their email address.
 *     tags:
 *       - Investors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: "investor@example.com"
 *     responses:
 *       200:
 *         description: Investor deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "i don commot am"
 *       404:
 *         description: Investor not found in the database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "the guy no dey DB"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 error:
 *                   type: string
 *                   example: "SequelizeConnectionError: ..."
 */
router.delete('/killi', deleteUser);

/**
 * @swagger
 * /fundHistory:
 *   get:
 *     summary: Get the investor’s funding history
 *     description: Returns all ongoing investments made by the currently logged-in investor, along with total investment amount and count.
 *     tags:
 *       - Funding
 *     security:
 *       - bearerAuth: []   # Requires investor authentication
 *     responses:
 *       200:
 *         description: Funding history fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: all of the users investments
 *                 totalInvestment:
 *                   type: number
 *                   example: 125000
 *                 activeInvestments:
 *                   type: integer
 *                   example: 3
 *                 investments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       businessName:
 *                         type: string
 *                         example: "EcoWave Technologies"
 *                       investmentAmount:
 *                         type: number
 *                         example: 50000
 *                       status:
 *                         type: string
 *                         example: "ongoing"
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-09-30T12:45:32.000Z"
 *       401:
 *         description: Unauthorized - Investor not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized - please log in as an investor"
 *       404:
 *         description: No investments found for this investor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No ongoing investments found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "internal server error"
 *                 clue:
 *                   type: string
 *                   example: "error getting funding history"
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */
router.get('/fundHistory',checkInvestorLogin, fundingHistory)


module.exports = router

