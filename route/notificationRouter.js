const {markAllRead,allNotifications,allNotificationsById,deleteNotification, createNofification,oneNotification,readOneNotification, deleteAllNotifications} = require('../Controller/notificationController')
const { checkLogin, checkInvestorLogin, checkLoginUniversal } = require('../Middleware/authentication')

const router = require('express').Router()

/**
 * @swagger
 * /addNotification:
 *   post:
 *     summary: Create a new notification
 *     description: Creates a notification entry for a user or business with a title and description.
 *     tags:
 *       - Notifications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - businessId
 *               - title
 *               - description
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user receiving the notification
 *                 example: "45a7b2f1-c21d-4b8f-b678-62a8c3a2f799"
 *               businessId:
 *                 type: string
 *                 description: ID of the business associated with the notification
 *                 example: "93b8d4e2-1a6b-45e3-8c92-63d59d3a87b1"
 *               title:
 *                 type: string
 *                 description: Notification title
 *                 example: "Subscription Approved"
 *               description:
 *                 type: string
 *                 description: Notification body or message
 *                 example: "Your business subscription has been successfully activated!"
 *     responses:
 *       201:
 *         description: Notification created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: notification created
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "cd9e6c77-9cb4-4b39-8a41-7e312a6a1cb4"
 *                     userId:
 *                       type: string
 *                     businessId:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 */
router.post('/addNotification',createNofification)

/**
 * @swagger
 * /oneNotification:
 *   post:
 *     summary: Get a single notification by ID
 *     description: Fetches a specific notification record using its ID.
 *     tags:
 *       - Notifications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - notificationId
 *             properties:
 *               notificationId:
 *                 type: string
 *                 description: The unique ID of the notification
 *                 example: "b64c89f1-7f22-4b9f-a0a8-fc94a8eaa932"
 *     responses:
 *       200:
 *         description: Notification found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "notification found"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "b64c89f1-7f22-4b9f-a0a8-fc94a8eaa932"
 *                     title:
 *                       type: string
 *                       example: "New investment update"
 *                     message:
 *                       type: string
 *                       example: "Your recent investment has been approved"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-10-07T12:30:00Z"
 *       404:
 *         description: Notification not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "notification not found"
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
router.post('/oneNotification',oneNotification)

/**
 * @swagger
 * /read:
 *   post:
 *     summary: Mark a notification as read
 *     description: Updates the status of a specific notification to "read" using its ID.
 *     tags:
 *       - Notifications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - notificationId
 *             properties:
 *               notificationId:
 *                 type: string
 *                 description: The unique ID of the notification
 *                 example: "e3f4c52b-5a1a-4e39-bb47-0a5d2b6f567c"
 *     responses:
 *       200:
 *         description: Notification marked as read successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "notification found"
 *       404:
 *         description: Notification not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "notification not found"
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
router.post('/read',readOneNotification)

/**
 * @swagger
 * /allRead:
 *   patch:
 *     summary: Mark all notifications as read
 *     description: Marks all notifications belonging to the logged-in user as "read".
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []   # Requires JWT authentication
 *     responses:
 *       200:
 *         description: All notifications successfully marked as read
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: all notifications marked as read
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
 */
router.patch('/allRead',checkLogin,markAllRead)

/**
 * @swagger
 * /allReadI:
 *   patch:
 *     summary: Mark all investor notifications as read
 *     description: Marks all notifications belonging to the logged-in investor as "read".
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []   # JWT required for investor authentication
 *     responses:
 *       200:
 *         description: All investor notifications successfully marked as read
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: all notifications marked as read
 *       401:
 *         description: Unauthorized - missing or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please login again to continue
 */
router.patch('/allReadI',checkInvestorLogin,markAllRead)

/**
 * @swagger
 * /allNotifications:
 *   get:
 *     summary: Get all notifications
 *     description: Retrieves all notifications stored in the database. This endpoint is typically for admin or debugging use.
 *     tags:
 *       - Notifications
 *     responses:
 *       200:
 *         description: Successfully retrieved all notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: all the notifications in the db
 *                 notifications:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 3
 *                       userId:
 *                         type: integer
 *                         example: 12
 *                       businessId:
 *                         type: integer
 *                         example: 5
 *                       title:
 *                         type: string
 *                         example: New Investment Opportunity
 *                       description:
 *                         type: string
 *                         example: Your business has received an investment offer.
 *                       status:
 *                         type: string
 *                         example: unread
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 */
router.get('/allNotifications',allNotifications)

/**
 * @swagger
 * /allNotificationsById:
 *   get:
 *     summary: Get all notifications for the logged-in user
 *     description: Retrieves both read and unread notifications for the currently authenticated user.
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []   # Requires a valid user token
 *     responses:
 *       200:
 *         description: Successfully retrieved user's notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: all the notifications in the db for this user
 *                 read:
 *                   type: array
 *                   description: List of read notifications
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 7
 *                       userId:
 *                         type: integer
 *                         example: 12
 *                       businessId:
 *                         type: integer
 *                         example: 5
 *                       title:
 *                         type: string
 *                         example: Subscription Confirmed
 *                       description:
 *                         type: string
 *                         example: Your business subscription has been approved successfully.
 *                       status:
 *                         type: string
 *                         example: read
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 unread:
 *                   type: array
 *                   description: List of unread notifications
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 9
 *                       userId:
 *                         type: integer
 *                         example: 12
 *                       businessId:
 *                         type: integer
 *                         example: 8
 *                       title:
 *                         type: string
 *                         example: Meeting Invitation
 *                       description:
 *                         type: string
 *                         example: You have a new meeting scheduled with an investor.
 *                       status:
 *                         type: string
 *                         example: unread
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
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
 */
router.get('/allNotificationsById',checkLogin,allNotificationsById)

/**
 * @swagger
 * /allNotificationsI:
 *   get:
 *     summary: Get all notifications for the logged-in investor
 *     description: Retrieves both read and unread notifications for the currently authenticated investor.
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []   # Requires a valid investor token
 *     responses:
 *       200:
 *         description: Successfully retrieved investor's notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: all the notifications in the db for this user
 *                 read:
 *                   type: array
 *                   description: List of read notifications
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 3
 *                       userId:
 *                         type: integer
 *                         example: 15
 *                       businessId:
 *                         type: integer
 *                         example: 6
 *                       title:
 *                         type: string
 *                         example: Investment Approved
 *                       description:
 *                         type: string
 *                         example: Your investment in TechFlow has been confirmed successfully.
 *                       status:
 *                         type: string
 *                         example: read
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 unread:
 *                   type: array
 *                   description: List of unread notifications
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 9
 *                       userId:
 *                         type: integer
 *                         example: 15
 *                       businessId:
 *                         type: integer
 *                         example: 7
 *                       title:
 *                         type: string
 *                         example: New Meeting Request
 *                       description:
 *                         type: string
 *                         example: A business owner has requested a meeting with you.
 *                       status:
 *                         type: string
 *                         example: unread
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized - missing or invalid investor token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please login again to continue
 */
router.get('/allNotificationsI',checkInvestorLogin,allNotificationsById)

/**
 * @swagger
 * /KillN:
 *   delete:
 *     summary: Delete a notification
 *     description: Deletes a specific notification from the database using its ID passed in the request body.
 *     tags:
 *       - Notifications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Notification deleted successfully
 *       404:
 *         description: Notification not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Notification not found
 */
router.delete('/KillN/:id',deleteNotification)

router.delete('/clear',checkLoginUniversal,deleteAllNotifications)

module.exports = router