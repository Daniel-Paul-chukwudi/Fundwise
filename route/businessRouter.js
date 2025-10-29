const {createBusiness,getBusiness,getByCategory,updateB,getOneById, deleteB,likeBusiness,viewBusiness,saveBusiness} = require('../Controller/businessController')
const {checkLogin,checkSubscription,checkAdmin} = require('../Middleware/authentication')
const express = require('express')
const router = express.Router()


/**
 * @swagger
 * /pitch:
 *   post:
 *     summary: Create a new business pitch
 *     description: Allows an authenticated user to create a new business pitch by submitting the business details. A valid JWT token is required in the Authorization header.
 *     tags:
 *       - Business
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Business details to be created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - businessName
 *               - fundGoal
 *               - description
 *               - category
 *             properties:
 *               businessName:
 *                 type: string
 *                 example: TrustForge Limited
 *               fundGoal:
 *                 type: number
 *                 example: 50000
 *               description:
 *                 type: string
 *                 example: A fintech platform helping users save and invest effortlessly.
 *               category:
 *                 type: string
 *                 example: Fintech
 *     responses:
 *       201:
 *         description: Business pitch created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 2b5fa7f1-7a6d-4f32-b73f-1de27b49d55f
 *                     businessName:
 *                       type: string
 *                       example: TrustForge Limited
 *                     fundGoal:
 *                       type: number
 *                       example: 50000
 *                     description:
 *                       type: string
 *                       example: A fintech platform helping users save and invest effortlessly.
 *                     category:
 *                       type: string
 *                       example: Fintech
 *                 user:
 *                   type: object
 *                   description: The user who created the business pitch
 *                 busy:
 *                   type: array
 *                   description: Existing businesses associated with the user
 *       400:
 *         description: Bad request (missing or invalid input)
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please login again to continue
 *       404:
 *         description: User not found or authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authentication Failed: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: internal server error
 */
router.post('/pitch', checkLogin, createBusiness);


// router.post('/like',checkLogin,likeBusiness)

router.post('/like',checkLogin,likeBusiness)

router.post('/view',checkLogin,viewBusiness)

router.post('/save',checkLogin,saveBusiness)

router.get('/businesses',getBusiness)

router.get('/business',getByCategory)

router.get('/Abusiness/:id',getOneById)

router.patch("/business/:id",updateB)//admin only

router.delete("/business/:id",deleteB)//admin only

module.exports = router
