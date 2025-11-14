const {createAdmin,getAllAdmins,getOne,updateAdmin,deleteAdmin,verifyBusiness,verifyKyc, getAllKyc, getOneKyc, getAllAgreements, UnVerifyKyc} = require('../Controller/adminController')

const router = require('express').Router()

router.post('/admin',createAdmin)

router.get('/allAdmins',getAllAdmins)

router.get('/admin/:id',getOne)

router.patch('/admin',updateAdmin)

router.get('/allAgreements',getAllAgreements)

/**
 * @swagger
 * /verifyBusiness:
 *   patch:
 *     summary: Verify a business
 *     description: Marks a business as verified by updating its `businessStatus` to `"verified"`.
 *     tags:
 *       - Business
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - businessId
 *             properties:
 *               businessId:
 *                 type: integer
 *                 example: 12
 *     responses:
 *       200:
 *         description: Business verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: business verified successfully
 *                 business:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 12
 *                     businessName:
 *                       type: string
 *                       example: FinEdge Solutions
 *                     businessStatus:
 *                       type: string
 *                       example: verified
 *       400:
 *         description: Invalid or missing input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: businessId is required
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
 *       500:
 *         description: Internal server error
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
 *                   example: Cannot read properties of null (reading 'update')
 */
router.patch('/verifyBusiness',verifyBusiness)

/**
 * @swagger
 * /verifyKyc:
 *   patch:
 *     summary: Verify KYC for a user or investor
 *     description: >
 *       This endpoint verifies the KYC (Know Your Customer) status for a user or investor.  
 *       It checks both `UserModel` and `InvestorModel` — if the provided `userId` belongs to either,  
 *       their `kycStatus` is updated to `"verified"`.
 *     tags:
 *       - KYC
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 42
 *     responses:
 *       200:
 *         description: KYC verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: investor kyc verified successfully
 *                 investor:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 42
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     kycStatus:
 *                       type: string
 *                       example: verified
 *                 user:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 77
 *                     firstName:
 *                       type: string
 *                       example: Jane
 *                     kycStatus:
 *                       type: string
 *                       example: verified
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
 *                   example: Internal server error
 *                 error:
 *                   type: string
 *                   example: Cannot read properties of undefined
 */
router.patch('/verifyKyc',verifyKyc)

router.patch('/unverifyKyc',UnVerifyKyc)

/**
 * @swagger
 * /allKyc:
 *   get:
 *     summary: Get all KYC records
 *     description: >
 *       Fetches all KYC submissions from both **business owners** and **investors**.  
 *       This route is typically restricted to **admin** access for review or verification purposes.
 *     tags:
 *       - Admin KYC
 *     responses:
 *       200:
 *         description: Successfully retrieved all KYC records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All KYCs in the DB
 *                 businessOwners:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 101
 *                       userId:
 *                         type: integer
 *                         example: 22
 *                       firstName:
 *                         type: string
 *                         example: David
 *                       lastName:
 *                         type: string
 *                         example: Okoro
 *                       kycStatus:
 *                         type: string
 *                         example: under review
 *                       governmentIdUrl:
 *                         type: string
 *                         example: https://res.cloudinary.com/demo/image/upload/v1712/govID.jpg
 *                       proofOfAddressUrl:
 *                         type: string
 *                         example: https://res.cloudinary.com/demo/image/upload/v1712/addressProof.jpg
 *                       profilePic:
 *                         type: string
 *                         example: https://res.cloudinary.com/demo/image/upload/v1712/profilePic.jpg
 *                 investors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 204
 *                       userId:
 *                         type: integer
 *                         example: 45
 *                       firstName:
 *                         type: string
 *                         example: Sarah
 *                       lastName:
 *                         type: string
 *                         example: Johnson
 *                       investmentType:
 *                         type: string
 *                         example: Angel Investor
 *                       kycStatus:
 *                         type: string
 *                         example: under review
 *                       governmentIdUrl:
 *                         type: string
 *                         example: https://res.cloudinary.com/demo/image/upload/v1712/investorGov.jpg
 *                       proofOfAddressUrl:
 *                         type: string
 *                         example: https://res.cloudinary.com/demo/image/upload/v1712/investorProof.jpg
 *                       profilePic:
 *                         type: string
 *                         example: https://res.cloudinary.com/demo/image/upload/v1712/investorPic.jpg
 *       500:
 *         description: Internal server error
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
 *                   example: Cannot read properties of undefined
 */
router.get('/allKyc',getAllKyc)

/**
 * @swagger
 * /oneKyc:
 *   get:
 *     summary: Get a single user's KYC record
 *     description: >
 *       Retrieves the KYC record of a specific **user** or **investor** using their `userId`.  
 *       The route automatically determines if the user is a **business owner** or **investor** and fetches the corresponding KYC entry.
 *     tags:
 *       - KYC Management
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: The ID of the user or investor whose KYC record should be retrieved.
 *                 example: 42
 *     responses:
 *       200:
 *         description: KYC record retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: The kyc of this user
 *                     kyc:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 10
 *                         userId:
 *                           type: integer
 *                           example: 42
 *                         firstName:
 *                           type: string
 *                           example: Daniel
 *                         lastName:
 *                           type: string
 *                           example: Saul
 *                         kycStatus:
 *                           type: string
 *                           example: verified
 *                         governmentIdUrl:
 *                           type: string
 *                           example: https://res.cloudinary.com/demo/image/upload/v1712/id.jpg
 *                         proofOfAddressUrl:
 *                           type: string
 *                           example: https://res.cloudinary.com/demo/image/upload/v1712/proof.jpg
 *                         profilePic:
 *                           type: string
 *                           example: https://res.cloudinary.com/demo/image/upload/v1712/profile.jpg
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: The kyc of this investor
 *                     kycI:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 8
 *                         userId:
 *                           type: integer
 *                           example: 84
 *                         firstName:
 *                           type: string
 *                           example: Sarah
 *                         lastName:
 *                           type: string
 *                           example: Johnson
 *                         investmentType:
 *                           type: string
 *                           example: Angel Investor
 *                         kycStatus:
 *                           type: string
 *                           example: under review
 *                         governmentIdUrl:
 *                           type: string
 *                           example: https://res.cloudinary.com/demo/image/upload/v1712/id_investor.jpg
 *                         proofOfAddressUrl:
 *                           type: string
 *                           example: https://res.cloudinary.com/demo/image/upload/v1712/proof_investor.jpg
 *                         profilePic:
 *                           type: string
 *                           example: https://res.cloudinary.com/demo/image/upload/v1712/profile_investor.jpg
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
 *                   example: Internal server error
 *                 error:
 *                   type: string
 *                   example: Cannot read properties of undefined
 */
router.get('/oneKyc',getOneKyc)

router.delete('/admin',deleteAdmin)

module.exports = router