const express = require('express')
// const {register,getAll,login,changeRole,forgotPassword,resetPassword} = require("../Controller/userController")
const {checkInvestorLogin,checkAdmin} = require('../Middleware/authentication')
const { signUp, logininvestor,forgotPassword,changePassword,resetPassword,getAll,deleteUser,getOne,verifyOtp, subscriptionBypass} = require('../Controller/investorController')

const router = express.Router()

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account, hashes the password, generates an OTP for email verification, and sends a verification email.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - phoneNumber
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Daniel
 *               lastName:
 *                 type: string
 *                 example: Saul
 *               phoneNumber:
 *                 type: string
 *                 example: "08123456789"
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 example: user
 *               email:
 *                 type: string
 *                 format: email
 *                 example: danielsaul@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: myStrongPassword123
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: myStrongPassword123
 *     responses:
 *       201:
 *         description: User successfully registered and verification email sent.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 6710b7e3b61a2f15b6ac0219
 *                     firstName:
 *                       type: string
 *                       example: Daniel
 *                     lastName:
 *                       type: string
 *                       example: Saul
 *                     email:
 *                       type: string
 *                       example: danielsaul@example.com
 *                     role:
 *                       type: string
 *                       example: user
 *       403:
 *         description: Validation error or duplicate user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     userExists:
 *                       summary: Duplicate email
 *                       value: User already exists, Log in to your account
 *                     passwordMismatch:
 *                       summary: Password mismatch
 *                       value: Passwords dont match
 *       500:
 *         description: Internal server error while creating user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error creating user
 */
router.post('/investor', signUp);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     description: Fetches all registered users from the database.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successfully retrieved all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All users in the database
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 6710b7e3b61a2f15b6ac0219
 *                       firstName:
 *                         type: string
 *                         example: Daniel
 *                       lastName:
 *                         type: string
 *                         example: Saul
 *                       email:
 *                         type: string
 *                         example: danielsaul@example.com
 *                       role:
 *                         type: string
 *                         example: user
 *       500:
 *         description: Internal server error while retrieving users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 error:
 *                   type: string
 *                   example: Database connection failed
 */
router.get('/investor', getAll);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieves a single user from the database by their unique ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve.
 *         example: 6710b7e3b61a2f15b6ac0219
 *     responses:
 *       200:
 *         description: User successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The user in the database
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 6710b7e3b61a2f15b6ac0219
 *                     firstName:
 *                       type: string
 *                       example: Daniel
 *                     lastName:
 *                       type: string
 *                       example: Saul
 *                     email:
 *                       type: string
 *                       example: danielsaul@example.com
 *                     role:
 *                       type: string
 *                       example: user
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error while retrieving user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 error:
 *                   type: string
 *                   example: Database connection failed
 */
router.get('/investor/:id', getOne);

/**
 * @swagger
 * /userl:
 *   post:
 *     summary: User login
 *     description: Authenticates a user with email and password, returning a JWT token upon success.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
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
 *                 format: email
 *                 example: danielsaul@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: MySecurePassword123!
 *     responses:
 *       200:
 *         description: Login successful — JWT token returned.
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
 *         description: Incorrect password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Incorrect password
 *       401:
 *         description: Account not verified.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please verify your account
 *       404:
 *         description: User not found in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Server error during login process.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/investorl', logininvestor);

/**
 * @swagger
 * /verify:
 *   post:
 *     summary: Verify user email using OTP
 *     description: Verifies a user's email address by validating the OTP sent to their email. If valid, the user's account is marked as verified.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       description: User's email and OTP code for verification
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
 *                 format: email
 *                 example: johndoe@example.com
 *               otp:
 *                 type: string
 *                 example: "123456"
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
 *                       type: string
 *                       example: "a1b2c3d4e5"
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     isVerified:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Invalid OTP or expired OTP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid OTP
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error during OTP verification
 */
router.post('/verifyInvestor', verifyOtp);


/**
 * @swagger
 * /change:
 *   patch:
 *     summary: Change user password
 *     description: Allows an authenticated user to change their password by providing the old password, a new password, and a confirmation.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []   # JWT authentication required
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
 *                 example: oldPassword123
 *               newPassword:
 *                 type: string
 *                 example: newStrongPassword456
 *               confirmPassword:
 *                 type: string
 *                 example: newStrongPassword456
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password changed successfully
 *                 data:
 *                   type: object
 *                   description: The updated user record.
 *       400:
 *         description: Invalid request, such as incorrect old password or mismatched new passwords.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Old password incorrect
 *       401:
 *         description: Missing or invalid authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please login again to continue
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.patch('/changeIvestor', checkInvestorLogin, changePassword);

/**
 * @swagger
 * /forgot:
 *   post:
 *     summary: Request password reset
 *     description: Sends a password reset email containing a secure token link that expires in 10 minutes.
 *     tags:
 *       - Authentication
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
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: password reset email sent successfully
 *                 link:
 *                   type: string
 *                   example: http://localhost:3000/reset-password/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       404:
 *         description: User not found for the provided email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user not found
 *       500:
 *         description: Internal server error while sending the reset email.
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
 *                   example: Email sending failed due to invalid credentials
 */
router.post('/forgoti', forgotPassword);

/**
 * @swagger
 * /reset-password/{token}:
 *   patch:
 *     summary: Reset user password
 *     description: Resets the user's password using the token sent via email. The token expires in 10 minutes.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: JWT token sent to the user's email for password reset.
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
 *                 example: MyNewStrongPassword123
 *               confirmPassword:
 *                 type: string
 *                 example: MyNewStrongPassword123
 *     responses:
 *       200:
 *         description: Password reset successful. The user can now log in with the new password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: password reset successful, try and login again
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 9e5fadc4-0c29-4b7d-8a3d-f2e6db3c50b5
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *       400:
 *         description: New password mismatch.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: passwords do not match
 *       403:
 *         description: Invalid or expired token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: invalid token or token expired
 *       404:
 *         description: User not found for the provided token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user not found
 *       500:
 *         description: Internal server error during password reset.
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
 *                   example: jwt malformed
 */
router.patch('/reset-passwordi/:token', resetPassword);

/**
 * @swagger
 * /kill:
 *   delete:
 *     summary: Delete a user by email
 *     description: Permanently removes a user from the database using their email address.
 *     tags:
 *       - Users
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
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: i don commot am
 *       404:
 *         description: User not found in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: the guy no dey DB
 *       500:
 *         description: Internal server error while deleting the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 error:
 *                   type: string
 *                   example: SequelizeDatabaseError
 */
router.delete('/killi', deleteUser); 

// router.post('/user',register)
// router.get('/user',checkLogin,checkAdmin,getAll)
// router.post('/userl',login)
// router.patch('/makeAdmin',checkLogin,checkAdmin,changeRole)

router.post('/admin',subscriptionBypass)

module.exports = router

