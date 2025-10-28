const express = require('express');
const router = express.Router();
const { 
  createMeeting, 
  getAllMeetings, 
  getMeetingById, 
  updateMeeting, 
  deleteMeeting 
} = require('../Controller/meetingController');

/**
 * @swagger
 * tags:
 *   name: Meetings
 *   description: API endpoints for managing meetings
 */

/**
 * @swagger
 * /meeting:
 *   post:
 *     summary: Create a new meeting
 *     tags: [Meetings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               meetingTitle:
 *                 type: string
 *               date:
 *                 type: string
 *               time:
 *                 type: string
 *               meetingType:
 *                 type: string
 *               note:
 *                 type: string
 *             example:
 *               meetingTitle: Project Discussion
 *               date: 2025-10-28
 *               time: 3:00 PM
 *               meetingType: Online
 *               note: Discussing project updates
 *     responses:
 *       201:
 *         description: Meeting created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/meeting', createMeeting);

/**
 * @swagger
 * /meetings:
 *   get:
 *     summary: Get all meetings
 *     tags: [Meetings]
 *     responses:
 *       200:
 *         description: Successfully fetched all meetings
 *       500:
 *         description: Server error
 */
router.get('/meetings', getAllMeetings);

/**
 * @swagger
 * /meeting/{id}:
 *   get:
 *     summary: Get a single meeting by ID
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Meeting ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meeting found
 *       404:
 *         description: Meeting not found
 *       500:
 *         description: Server error
 */
router.get('/meeting/:id', getMeetingById);

/**
 * @swagger
 * /meeting/{id}:
 *   patch:
 *     summary: Update a meeting
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Meeting ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               meetingTitle:
 *                 type: string
 *               date:
 *                 type: string
 *               time:
 *                 type: string
 *               meetingType:
 *                 type: string
 *               note:
 *                 type: string
 *     responses:
 *       200:
 *         description: Meeting updated successfully
 *       404:
 *         description: Meeting not found
 *       500:
 *         description: Server error
 */
router.patch('/meeting/:id', updateMeeting);

/**
 * @swagger
 * /meeting/{id}:
 *   delete:
 *     summary: Delete a meeting
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Meeting ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meeting deleted successfully
 *       404:
 *         description: Meeting not found
 *       500:
 *         description: Server error
 */
router.delete('/meeting/:id', deleteMeeting);

module.exports = router;