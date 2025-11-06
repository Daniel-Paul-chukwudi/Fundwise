const {createAdmin,getAllAdmins,getOne,updateAdmin,deleteAdmin,verifyBusiness,verifyKyc} = require('../Controller/adminController')

const router = require('express').Router()

router.post('/admin',createAdmin)

router.get('/allAdmins',getAllAdmins)

router.get('/admin/:id',getOne)

router.patch('/admin',updateAdmin)

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

router.delete('/admin',deleteAdmin)

module.exports = router