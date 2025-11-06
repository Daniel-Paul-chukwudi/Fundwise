const express = require('express');
const router = express.Router();
const {createKycI,getAllKycs,getKycById,updateKyc,deleteKyc} = require('../Controller/kycControllerInvestor');
const {createKyc} = require('../Controller/kycControllerBusinessOwner');
const { checkLogin,checkInvestorLogin } = require('../Middleware/authentication');
const {uploads} = require('../Middleware/multer')


/**
 * @swagger
 * /kyc:
 *   post:
 *     summary: Submit KYC details
 *     description: >
 *       Allows a logged-in user to submit their KYC information, including government ID, proof of address, and profile picture.  
 *       Once submitted, the user's `kycStatus` is automatically set to `"under review"`.
 *     tags:
 *       - KYC
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - dateOfBirth
 *               - phoneNumber
 *               - email
 *               - nationality
 *               - residentialAddress
 *               - city
 *               - state
 *               - accountName
 *               - accountNumber
 *               - accountType
 *               - bankName
 *               - governmentId
 *               - proofOfAddress
 *               - profilePic
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: 1990-05-14
 *               phoneNumber:
 *                 type: string
 *                 example: "+2348123456789"
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               nationality:
 *                 type: string
 *                 example: Nigerian
 *               residentialAddress:
 *                 type: string
 *                 example: "12 Adeola Street, Ikeja"
 *               city:
 *                 type: string
 *                 example: Lagos
 *               state:
 *                 type: string
 *                 example: Lagos State
 *               accountName:
 *                 type: string
 *                 example: John Doe
 *               accountNumber:
 *                 type: string
 *                 example: "0123456789"
 *               accountType:
 *                 type: string
 *                 example: Savings
 *               bankName:
 *                 type: string
 *                 example: GTBank
 *               governmentId:
 *                 type: string
 *                 format: binary
 *               proofOfAddress:
 *                 type: string
 *                 format: binary
 *               profilePic:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: KYC created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: KYC created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 101
 *                     userId:
 *                       type: integer
 *                       example: 12
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     kycStatus:
 *                       type: string
 *                       example: under review
 *                     profilePic:
 *                       type: string
 *                       example: https://res.cloudinary.com/your-cloud/image/upload/v12345/profilePic.jpg
 *       400:
 *         description: KYC already exists for this user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: KYC already exists for this user
 *       401:
 *         description: Unauthorized - missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please login again to continue
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
router.post('/kyc',checkLogin,uploads.fields([
    { name: 'governmentId', maxCount: 1 },
    { name: 'proofOfAddress', maxCount: 1 },
    { name: 'profilePic', maxCount: 1 }
]),createKyc)

/**
 * @swagger
 * /kycI:
 *   post:
 *     summary: Submit KYC details for Investor
 *     description: >
 *       Allows a logged-in investor to submit their KYC information, including a government ID, proof of address, and profile picture.  
 *       Once submitted, the investor’s `kycStatus` is automatically set to `"under review"`.
 *     tags:
 *       - Investor KYC
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - dateOfBirth
 *               - phoneNumber
 *               - email
 *               - nationality
 *               - residentialAddress
 *               - city
 *               - state
 *               - investmentType
 *               - governmentId
 *               - proofOfAddress
 *               - profilePic
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Sarah
 *               lastName:
 *                 type: string
 *                 example: Johnson
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: 1992-03-10
 *               phoneNumber:
 *                 type: string
 *                 example: "+2348012345678"
 *               email:
 *                 type: string
 *                 example: sarah.johnson@example.com
 *               nationality:
 *                 type: string
 *                 example: Nigerian
 *               residentialAddress:
 *                 type: string
 *                 example: "10b Lekki Gardens Estate"
 *               city:
 *                 type: string
 *                 example: Lagos
 *               state:
 *                 type: string
 *                 example: Lagos State
 *               investmentType:
 *                 type: string
 *                 example: Angel Investor
 *               governmentId:
 *                 type: string
 *                 format: binary
 *                 description: Upload a government-issued ID (e.g., passport, driver's license)
 *               proofOfAddress:
 *                 type: string
 *                 format: binary
 *                 description: Upload a document proving your address (e.g., utility bill)
 *               profilePic:
 *                 type: string
 *                 format: binary
 *                 description: Upload a clear profile picture
 *     responses:
 *       201:
 *         description: KYC created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: KYC created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 202
 *                     userId:
 *                       type: integer
 *                       example: 45
 *                     firstName:
 *                       type: string
 *                       example: Sarah
 *                     kycStatus:
 *                       type: string
 *                       example: under review
 *                     governmentIdUrl:
 *                       type: string
 *                       example: https://res.cloudinary.com/demo/image/upload/v1712/govID.jpg
 *                     proofOfAddressUrl:
 *                       type: string
 *                       example: https://res.cloudinary.com/demo/image/upload/v1712/addressProof.jpg
 *                     profilePic:
 *                       type: string
 *                       example: https://res.cloudinary.com/demo/image/upload/v1712/profilePic.jpg
 *       400:
 *         description: KYC already exists for this investor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: KYC already exists for this user
 *       401:
 *         description: Unauthorized - missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please login again to continue
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
router.post('/kycI',checkInvestorLogin,uploads.fields([
    { name: 'governmentId', maxCount: 1 },
    { name: 'proofOfAddress', maxCount: 1 },
    { name: 'profilePic', maxCount: 1 }
  ]),createKycI );

router.get('/kycs', getAllKycs);

// Get one KYC 
router.get('/:id', getKycById);

// Update KYC 


// Delete a KYC
router.delete('/:id', checkLogin, deleteKyc);

module.exports = router;
