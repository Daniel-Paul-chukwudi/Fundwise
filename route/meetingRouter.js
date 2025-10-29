const express = require('express');
const router = express.Router();
const {getAllMeetings,getMeetingById,updateMeeting,deleteMeeting, createMeetingInvestor,approveMeeting} = require('../Controller/meetingController');
const {checkInvestorLogin, checkLogin} = require('../Middleware/authentication')


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
 *       400:
 *         description: Bad request (e.g. meeting title already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Meeting title already exists
 *       401:
 *         description: Unauthorized (missing or expired token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please login again to continue
 *       404:
 *         description: Investor not found or authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authentication Failed: investor not found
 *       500:
 *         description: Internal server error or unexpected failure
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error creating meeting
 *                 error:
 *                   type: string
 *                   example: Internal server error details
 */
router.post('/meeting', checkInvestorLogin, createMeetingInvestor);


router.post('/approve-meeting',checkLogin,approveMeeting)

router.get('/meetings', getAllMeetings);

router.get('/meeting/:id', getMeetingById);

router.patch('/meeting/:id', updateMeeting);

router.delete('/meeting/:id', deleteMeeting);

module.exports = router;