const express = require('express');
const router = express.Router();
const {meetingValidator} = require('../Middleware/validator');
const {getAllMeetings,getMeetingById,updateMeeting,deleteMeeting, createMeetingInvestor,approveMeeting,requestReschedule,respondReschedule, declineMeeting, rescheduleMeeting} = require('../Controller/meetingController');
const {checkInvestorLogin, checkLogin, checkAdmin} = require('../Middleware/authentication')


/**
 * @swagger
 * /meeting:
 *   post:
 *     summary: Create a new meeting (Investor-initiated)
 *     description: Allows an authenticated investor to create a meeting with a business owner. A valid JWT token is required in the Authorization header.
 *     tags:
 *       - Meetings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Meeting details to be created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - meetingTitle
 *               - date
 *               - time
 *               - meetingType
 *               - guest
 *             properties:
 *               meetingTitle:
 *                 type: string
 *                 example: Investment Discussion
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2025-10-15
 *               time:
 *                 type: string
 *                 example: 14:00
 *               meetingType:
 *                 type: string
 *                 example: Virtual
 *               note:
 *                 type: string
 *                 example: Discuss potential funding opportunities.
 *               guest:
 *                 type: string
 *                 description: The user ID of the business owner invited to the meeting.
 *                 example: "72f4b01e-b3b2-4a88-8a23-fb021df8b9a5"
 *     responses:
 *       201:
 *         description: Meeting created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Meeting created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 3e5d7f00-84bc-11ef-9bcb-0a0027000001
 *                     meetingTitle:
 *                       type: string
 *                       example: Investment Discussion
 *                     date:
 *                       type: string
 *                       example: 2025-10-15
 *                     time:
 *                       type: string
 *                       example: 14:00
 *                     meetingType:
 *                       type: string
 *                       example: Virtual
 *                     note:
 *                       type: string
 *                       example: Discuss potential funding opportunities.
 *                     meetingStatus:
 *                       type: string
 *                       example: Awaiting Approval
 *                 hostName:
 *                   type: string
 *                   example: John Doe
 *                 guestName:
 *                   type: string
 *                   example: Sarah Daniels
 */
router.post('/meeting',meetingValidator, checkInvestorLogin, createMeetingInvestor);

/**
 * @swagger
 * /approve-meeting:
 *   post:
 *     summary: Approve a meeting request
 *     description: >
 *       This endpoint allows an authenticated business owner or investor to approve a meeting request.  
 *       Once approved, the meeting status is updated to "Approved and Upcoming".
 *     tags:
 *       - Meetings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - meetingId
 *             properties:
 *               meetingId:
 *                 type: string
 *                 description: The unique ID of the meeting to approve
 *                 example: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *     responses:
 *       200:
 *         description: Meeting approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Approved meeting
 *                 data:
 *                   type: object
 *                   description: The updated meeting record
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *                     meetingStatus:
 *                       type: string
 *                       example: "Approved and Upcoming"
 */
router.post('/approve-meeting',checkLogin,approveMeeting)

/**
 * @swagger
 * /reschedule-meeting:
 *   post:
 *     summary: Request to reschedule a meeting
 *     description: >
 *       This endpoint allows an authenticated user to request a reschedule of an existing meeting  
 *       by updating the date and time. The meeting status will be set to `"Reschedule Requested"`.
 *     tags:
 *       - Meetings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - meetingId
 *               - date
 *               - time
 *             properties:
 *               meetingId:
 *                 type: string
 *                 description: The unique ID of the meeting to reschedule
 *                 example: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The new meeting date
 *                 example: "2025-10-12"
 *               time:
 *                 type: string
 *                 description: The new meeting time (in 24-hour format)
 *                 example: "14:30"
 *     responses:
 *       200:
 *         description: Meeting reschedule request submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: changes made awaiting approval
 *                 data:
 *                   type: object
 *                   description: The updated meeting record
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *                     date:
 *                       type: string
 *                       example: "2025-10-12"
 *                     time:
 *                       type: string
 *                       example: "14:30"
 *                     meetingStatus:
 *                       type: string
 *                       example: "Reschedule Requested"
 *       404:
 *         description: Meeting not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Oops it seems like the meeting does not exist
 */
router.post('/reschedule-meeting',checkLogin,rescheduleMeeting)

/**
 * @swagger
 * /decline-meeting:
 *   post:
 *     summary: Decline a meeting
 *     description: >
 *       This endpoint allows an authenticated user to decline a meeting.  
 *       Once declined, the meeting status will be updated to `"Declined"`.
 *     tags:
 *       - Meetings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - meetingId
 *             properties:
 *               meetingId:
 *                 type: string
 *                 description: The unique ID of the meeting to decline
 *                 example: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *     responses:
 *       200:
 *         description: Meeting declined successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Declined meeting
 *                 data:
 *                   type: object
 *                   description: The updated meeting record
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *                     meetingStatus:
 *                       type: string
 *                       example: "Declined"
 *       404:
 *         description: Meeting not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Oops it seems like the meeting does not exist
 */
router.post('/decline-meeting',checkLogin,declineMeeting)

/**
 * @swagger
 * /meetings:
 *   get:
 *     summary: Retrieve all meetings
 *     description: >
 *       Fetch all meeting records from the database.  
 *       This endpoint does not require authentication and returns an array of meetings.
 *     tags:
 *       - Meetings
 *     responses:
 *       200:
 *         description: Successfully retrieved all meetings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   description: List of all meetings
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "c47ac10b-58cc-4372-a567-0e02b2c3d479"
 *                       hostId:
 *                         type: string
 *                         example: "b23ac10b-12dc-4372-b567-0e02b2c3a123"
 *                       guestId:
 *                         type: string
 *                         example: "d13ac10b-99ac-4372-c567-0e02b2c3b567"
 *                       date:
 *                         type: string
 *                         example: "2025-10-07"
 *                       time:
 *                         type: string
 *                         example: "14:00"
 *                       meetingStatus:
 *                         type: string
 *                         example: "Approved and Upcoming"
 */
router.get('/meetings', getAllMeetings);

/**
 * @swagger
 * /meeting/{id}:
 *   get:
 *     summary: Get a meeting by ID
 *     description: Retrieve a single meeting record from the database using its unique ID.
 *     tags:
 *       - Meetings
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the meeting
 *         schema:
 *           type: string
 *           example: "c47ac10b-58cc-4372-a567-0e02b2c3d479"
 *     responses:
 *       200:
 *         description: Successfully retrieved the meeting
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: Meeting details
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "c47ac10b-58cc-4372-a567-0e02b2c3d479"
 *                     hostId:
 *                       type: string
 *                       example: "b23ac10b-12dc-4372-b567-0e02b2c3a123"
 *                     guestId:
 *                       type: string
 *                       example: "d13ac10b-99ac-4372-c567-0e02b2c3b567"
 *                     date:
 *                       type: string
 *                       example: "2025-10-07"
 *                     time:
 *                       type: string
 *                       example: "15:30"
 *                     meetingStatus:
 *                       type: string
 *                       example: "Approved and Upcoming"
 *       404:
 *         description: Meeting not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Meeting not found
 */
router.get('/meeting/:id', getMeetingById);

/**
 * @swagger
 * /meeting/{id}:
 *   patch:
 *     summary: Update meeting details (Admin only)
 *     description: Allows an admin to update an existing meeting’s details such as title, date, time, type, or note.
 *     tags:
 *       - Meetings
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the meeting to update
 *         schema:
 *           type: string
 *           example: "c47ac10b-58cc-4372-a567-0e02b2c3d479"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               meetingTitle:
 *                 type: string
 *                 example: "Investment Strategy Review"
 *               date:
 *                 type: string
 *                 example: "2025-10-15"
 *               time:
 *                 type: string
 *                 example: "14:00"
 *               meetingType:
 *                 type: string
 *                 example: "Virtual"
 *               note:
 *                 type: string
 *                 example: "Ensure all financial documents are ready."
 *     responses:
 *       200:
 *         description: Meeting updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Meeting updated successfully
 *                 data:
 *                   type: object
 *                   description: Updated meeting details
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "c47ac10b-58cc-4372-a567-0e02b2c3d479"
 *                     meetingTitle:
 *                       type: string
 *                       example: "Investment Strategy Review"
 *                     date:
 *                       type: string
 *                       example: "2025-10-15"
 *                     time:
 *                       type: string
 *                       example: "14:00"
 *                     meetingType:
 *                       type: string
 *                       example: "Virtual"
 *                     note:
 *                       type: string
 *                       example: "Ensure all financial documents are ready."
 *       401:
 *         description: Missing or invalid authorization token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please login again to continue
 *       403:
 *         description: Unauthorized access (not an admin)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You are not authorized to view this
 *       404:
 *         description: Meeting or admin not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Meeting not found
 */
router.patch('/meeting/:id',checkAdmin, updateMeeting);// admin only

/**
 * @swagger
 * /meeting/{id}:
 *   delete:
 *     summary: Delete a meeting (Admin only)
 *     description: Allows an admin to permanently delete a meeting by its unique ID.
 *     tags:
 *       - Meetings
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the meeting to delete
 *         schema:
 *           type: string
 *           example: "c47ac10b-58cc-4372-a567-0e02b2c3d479"
 *     responses:
 *       200:
 *         description: Meeting deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Meeting deleted successfully
 *       401:
 *         description: Missing or invalid authorization token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please login again to continue
 *       403:
 *         description: Unauthorized access (not an admin)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You are not authorized to view this
 *       404:
 *         description: Meeting not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Meeting not found
 */
router.delete('/meeting/:id', checkAdmin, deleteMeeting);// admin only



// router.post('/meeting/request-reschedule', checkLogin,requestReschedule) //business owner

// router.post('/meeting/respond-reschedule', checkInvestorLogin, respondReschedule) //investor respond owner

module.exports = router;