const express = require('express');
const router = express.Router();
const { checkLogin, checkInvestorLogin,checkAdmin } = require('../Middleware/authentication');

const {createTicket, getAllTickets, getTicketById, updateTicket, deleteTicket} = require('../Controller/supportTicketController')
const supportController = require('../Controller/supportTicketController');

/**
 * @swagger
 * tags:
 *   - name: Support Tickets
 *     description: Manage support tickets for businesses and users
 */

/**
 * @swagger
 * /support:
 *   post:
 *     summary: Create a new support ticket
 *     description: Authenticated users can create a support ticket for a business.
 *     tags: [Support Tickets]
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
 *               - title
 *               - description
 *             properties:
 *               businessId:
 *                 type: string
 *                 example: "a3d98f9b-bf1c-4c89-b0a1-1f2f7df81234"
 *               title:
 *                 type: string
 *                 example: "Issue with dashboard loading"
 *               description:
 *                 type: string
 *                 example: "The analytics dashboard keeps crashing whenever I log in."
 *     responses:
 *       201:
 *         description: Support ticket created successfully
 *       400:
 *         description: Missing or invalid data
 */
router.post('/support', checkLogin, createTicket);

/**
 * @swagger
 * /supportI:
 *   post:
 *     summary: Create a support ticket (Investor)
 *     description: Allows a logged-in investor to create a support ticket when they encounter an issue or need assistance.
 *     tags:
 *       - Support
 *     security:
 *       - bearerAuth: []   # Assumes JWT authentication for investor login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Issue with investment payment"
 *               description:
 *                 type: string
 *                 example: "I made a payment for an investment but it hasn't reflected on my dashboard."
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
 *                   example: Support ticket created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 12
 *                     userId:
 *                       type: integer
 *                       example: 45
 *                     title:
 *                       type: string
 *                       example: "Issue with investment payment"
 *                     description:
 *                       type: string
 *                       example: "I made a payment for an investment but it hasn't reflected on my dashboard."
 *                     ticketStatus:
 *                       type: string
 *                       example: "open"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-10-07T09:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-10-07T09:00:00Z"
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please fill all required fields
 *       401:
 *         description: Unauthorized (Investor not logged in)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized - please log in as investor
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error creating ticket
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */
router.post('/supportI', checkInvestorLogin, createTicket);

/**
 * @swagger
 * /supports:
 *   get:
 *     summary: Get all support tickets
 *     description: Fetch all tickets (admin only)
 *     tags: [Support Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all support tickets
 */
router.get('/supports', checkAdmin, getAllTickets);

/**
 * @swagger
 * /support/{id}:
 *   get:
 *     summary: Get a support ticket by ID
 *     description: Retrieve a specific support ticket using its ID.
 *     tags: [Support Tickets]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ticket
 *     responses:
 *       200:
 *         description: Support ticket details
 *       404:
 *         description: Ticket not found
 */
router.get('/support/:id', checkLogin, getTicketById);

/**
 * @swagger
 * /support/{id}:
 *   patch:
 *     summary: Update a support ticket
 *     description: Update the title, description, or status of a ticket.
 *     tags: [Support Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated ticket title"
 *               description:
 *                 type: string
 *                 example: "Added more details to the issue."
 *               ticketStatus:
 *                 type: string
 *                 enum: [open, under review, closed]
 *                 example: "under review"
 *     responses:
 *       200:
 *         description: Ticket updated successfully
 *       404:
 *         description: Ticket not found
 */
router.patch('/support/:id', checkLogin, updateTicket);

/**
 * @swagger
 * /support/{id}:
 *   delete:
 *     summary: Delete a support ticket
 *     description: Admin can delete a ticket permanently.
 *     tags: [Support Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket deleted successfully
 *       404:
 *         description: Ticket not found
 */
router.delete('/support/:id', checkAdmin, deleteTicket);

module.exports = router;