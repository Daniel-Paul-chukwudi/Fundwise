const {createBusiness,getBusiness,getByCategory,updateB,getOneById, deleteB,likeBusiness,viewBusiness,saveBusiness, requestDelete} = require('../Controller/businessController')
const {checkLogin,checkSubscription,checkAdmin, checkInvestorLogin} = require('../Middleware/authentication')
const {createBusinessValidator} = require('../Middleware/validator')

const express = require('express')
const router = express.Router()
const {uploads,uploadDoc} = require('../Middleware/multer')



router.post('/pitch',uploads.fields([
    { name: 'pitchDeck', maxCount: 1 },
    { name: 'businessRegistrationCertificate', maxCount: 1 },
  ]), checkLogin, createBusiness);
/**
 * @swagger
 * /pitch:
 *   post:
 *     summary: Create a new business pitch
 *     description: Allows a logged-in user to create a new business pitch with full business details.
 *     tags:
 *       - Businesses
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - businessName
 *               - fundGoal
 *               - description
 *               - industry
 *               - yearFounded
 *               - businessModel
 *               - revenueModel
 *               - targetMarket
 *               - fundingStage
 *               - fundingSought
 *               - currentRevenue
 *             properties:
 *               businessName:
 *                 type: string
 *                 example: "Tech Innovations Ltd"
 *               fundGoal:
 *                 type: number
 *                 example: 50000
 *               description:
 *                 type: string
 *                 example: "A startup developing AI-driven financial tools for SMEs."
 *               industry:
 *                 type: string
 *                 example: "FinTech"
 *               yearFounded:
 *                 type: integer
 *                 example: 2023
 *               businessModel:
 *                 type: string
 *                 example: "Subscription-based"
 *               revenueModel:
 *                 type: string
 *                 example: "Monthly recurring revenue"
 *               targetMarket:
 *                 type: string
 *                 example: "Small and medium-sized enterprises"
 *               fundingStage:
 *                 type: string
 *                 example: "Seed"
 *               fundingSought:
 *                 type: number
 *                 example: 100000
 *               currentRevenue:
 *                 type: number
 *                 example: 15000
 *               pitchDeck:
 *                 type: string
 *                 example: "https://example.com/pitchdeck.pdf"
 *     responses:
 *       201:
 *         description: Business created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Business created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "b1d2e3f4-5678-9876-5432-10a11b12c13d"
 *                     businessName:
 *                       type: string
 *                       example: "Tech Innovations Ltd"
 *                     fundGoal:
 *                       type: number
 *                       example: 50000
 *       401:
 *         description: Unauthorized — token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please login again to continue"
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
 *                   example: "SequelizeValidationError: Missing required field"
 */
// router.post('/pitch', checkLogin, createBusiness);

/**
 * @swagger
 * /like:
 *   post:
 *     summary: Like a business
 *     description: Allows an authenticated investor to like a business profile.
 *     tags:
 *       - Investor Actions
 *     security:
 *       - bearerAuth: []  # JWT required
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
 *                 type: string
 *                 example: "8d7b5d10-1234-4b2c-9f7a-a3d45f2b6bdf"
 *     responses:
 *       200:
 *         description: Business liked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Business liked successfully"
 *       400:
 *         description: Business already liked
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You already liked this business"
 *       401:
 *         description: Missing or expired authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please login again to continue"
 *       404:
 *         description: Business or investor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Business not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error liking business"
 *                 error:
 *                   type: string
 *                   example: "SequelizeConnectionError: ..."
 */
router.post('/like',checkInvestorLogin,likeBusiness)

/**
 * @swagger
 * /view:
 *   post:
 *     summary: View a business profile
 *     description: Allows an authenticated and subscribed investor to view a business profile. Each view reduces the user's view allocation and increases the business's view count.
 *     tags:
 *       - Investor Actions
 *     security:
 *       - bearerAuth: []  # JWT authentication required
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
 *                 type: string
 *                 description: The ID of the business being viewed.
 *                 example: "a9c7b5e1-34f2-4d89-8b10-7c3f8d6e5a11"
 *     responses:
 *       200:
 *         description: Business viewed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "viewed succesfully"
 *                 data:
 *                   type: object
 *                   description: The business data retrieved
 *                 businessviews:
 *                   type: integer
 *                   example: 21
 *       401:
 *         description: Unauthorized - token missing, expired, or subscription inactive
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "hello John your subscription has expired"
 *       404:
 *         description: Investor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Authentication Failed: investor not found"
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
 *                   example: "SequelizeConnectionError: ..."
 */
router.post('/view',checkInvestorLogin,viewBusiness)

/**
 * @swagger
 * /save:
 *   post:
 *     summary: Save or unsave a business
 *     description: Allows an authenticated investor to save or unsave a business. If the business is already saved, it will be unsaved instead.
 *     tags:
 *       - Investor Actions
 *     security:
 *       - bearerAuth: []  # JWT authentication required
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
 *                 type: string
 *                 description: The ID of the business to save or unsave.
 *                 example: "5f89c9f0-8a1e-4b91-9b6d-45a45cf334c8"
 *     responses:
 *       200:
 *         description: Successfully saved or unsaved a business
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "saved succesfully"
 *                 data:
 *                   type: object
 *                   description: The saved or unsaved business details
 *       401:
 *         description: Unauthorized - token missing or expired
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
 *                   example: "Authentication Failed: investor not found"
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
 *                   example: "SequelizeConnectionError: ..."
 */
router.post('/save',checkInvestorLogin,saveBusiness)

/**
 * @swagger
 * /businesses:
 *   get:
 *     summary: Get all businesses
 *     description: Fetches all businesses available in the database.
 *     tags:
 *       - Businesses
 *     responses:
 *       200:
 *         description: Successfully retrieved all businesses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All the businesses in the DB"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "b7a5b7c2-3f3f-4f20-9b23-312f9eab8d22"
 *                       name:
 *                         type: string
 *                         example: "TechNova Ltd"
 *                       description:
 *                         type: string
 *                         example: "A startup focused on renewable energy solutions."
 *                       viewCount:
 *                         type: integer
 *                         example: 45
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-07T10:45:32.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-07T10:45:32.000Z"
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
 *                   example: "SequelizeConnectionError: Database not reachable"
 */
router.get('/businesses',getBusiness)

/**
 * @swagger
 * /business:
 *   get:
 *     summary: Get businesses by category
 *     description: Retrieve all businesses that belong to a specific category.
 *     tags:
 *       - Businesses
 *     parameters:
 *       - in: query
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: The category of businesses to filter by.
 *         example: "Technology"
 *     responses:
 *       200:
 *         description: Successfully retrieved businesses for the given category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "businesses in the Technology category"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "e41b3f88-2cde-4e33-b12e-28f98b8b391b"
 *                       name:
 *                         type: string
 *                         example: "TechNova Ltd"
 *                       description:
 *                         type: string
 *                         example: "A startup building AI-powered logistics tools."
 *                       category:
 *                         type: string
 *                         example: "Technology"
 *                       viewCount:
 *                         type: integer
 *                         example: 120
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-07T10:45:32.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-07T10:45:32.000Z"
 *       400:
 *         description: Missing category query parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category is required"
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
 *                   example: "SequelizeDatabaseError: Unknown column 'category'"
 */
router.get('/business',getByCategory)

/**
 * @swagger
 * /Abusiness/{id}:
 *   get:
 *     summary: Get a specific business by ID
 *     description: Retrieve details of a single business using its unique ID.
 *     tags:
 *       - Businesses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the business to retrieve.
 *         example: "b1d2e3f4-5678-9876-5432-10a11b12c13d"
 *     responses:
 *       200:
 *         description: Business found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Business found"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "b1d2e3f4-5678-9876-5432-10a11b12c13d"
 *                     name:
 *                       type: string
 *                       example: "AgroLink Ventures"
 *                     description:
 *                       type: string
 *                       example: "Connecting farmers to investors and buyers."
 *                     category:
 *                       type: string
 *                       example: "Agriculture"
 *                     location:
 *                       type: string
 *                       example: "Lagos, Nigeria"
 *                     viewCount:
 *                       type: integer
 *                       example: 134
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-10-06T12:34:56.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-10-07T09:21:30.000Z"
 *       404:
 *         description: Business not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Business not found"
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
 *                   example: "SequelizeDatabaseError: Unknown column 'id'"
 */
router.get('/Abusiness/:id',getOneById)

/**
 * @swagger
 * /request:
 *   delete:
 *     summary: Request deletion of a business
 *     description: Allows a logged-in user to submit a support ticket requesting that a specific business be deleted.
 *     tags:
 *       - Support Tickets
 *     security:
 *       - bearerAuth: []
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
 *                 type: string
 *                 example: "b7d8e9f0-1234-5678-90ab-cdef12345678"
 *     responses:
 *       201:
 *         description: Support ticket created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Your support Ticket has been created, you should receive a response soon"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "t1a2b3c4-d5e6-7890-f1g2-h3i4j5k6l7m8"
 *                     userId:
 *                       type: string
 *                       example: "u9n8m7l6-k5j4-h3g2-f1e0-d9c8b7a6"
 *                     businessId:
 *                       type: string
 *                       example: "b7d8e9f0-1234-5678-90ab-cdef12345678"
 *                     title:
 *                       type: string
 *                       example: "Request to delete business"
 *                     ticketStatus:
 *                       type: string
 *                       example: "open"
 *       401:
 *         description: Unauthorized — token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please login again to continue"
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
 *                   example: "SequelizeDatabaseError: column not found"
 */
router.delete('/request',checkLogin,requestDelete)

/**
 * @swagger
 * /business/{id}:
 *   patch:
 *     summary: Update a business by ID
 *     description: Update the details of an existing business using its unique ID.
 *     tags:
 *       - Businesses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the business to update.
 *         example: "b1d2e3f4-5678-9876-5432-10a11b12c13d"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               businessName:
 *                 type: string
 *                 example: "AgroLink Ventures"
 *               fundGoal:
 *                 type: number
 *                 example: 500000
 *               description:
 *                 type: string
 *                 example: "A platform connecting farmers with investors."
 *               category:
 *                 type: string
 *                 example: "Agriculture"
 *               businessOwner:
 *                 type: string
 *                 example: "John Doe"
 *     responses:
 *       200:
 *         description: Business updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Business data updated successfully"
 *                 previous:
 *                   type: object
 *                   description: Previous business details before the update
 *                 current:
 *                   type: object
 *                   description: Updated business details
 *       404:
 *         description: Business not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Business not found"
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
 *                   example: "SequelizeDatabaseError: Unknown column 'fundGoal'"
 */
router.patch("/business/:id",updateB)//admin only

/**
 * @swagger
 * /business/{id}:
 *   delete:
 *     summary: Delete a business by ID
 *     description: Permanently remove a business record from the database using its unique ID.
 *     tags:
 *       - Businesses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the business to delete.
 *         example: "b1d2e3f4-5678-9876-5432-10a11b12c13d"
 *     responses:
 *       200:
 *         description: Business deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Business data deleted successfully"
 *       404:
 *         description: Business not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Business not found"
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
 *                   example: "SequelizeDatabaseError: Unknown column 'business'"
 */
router.delete("/business/:id",deleteB)//admin only

module.exports = router
