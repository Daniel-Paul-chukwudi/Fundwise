const express = require('express');
const router = express.Router();
const ndaController = require('../Controller/ndaController');

/**
 * @swagger
 * tags:
 *   name: NDA
 *   description: Endpoints for managing Non-Disclosure Agreements
 */

/**
 * @swagger
 * /nda:
 *   post:
 *     summary: Create a new NDA agreement
 *     tags: [NDA]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - agreementText
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "b6f85bcb-2c29-44a1-b4f4-7d7a1b0cf351"
 *               startupName:
 *                 type: string
 *                 example: "TechVentures Inc."
 *               agreementText:
 *                 type: string
 *                 example: "This NDA protects confidential information shared between parties."
 *     responses:
 *       201:
 *         description: NDA created successfully
 *       500:
 *         description: Server error
 */
router.post('/', ndaController.createNda);

/**
 * @swagger
 * /nda/sign/{id}:
 *   post:
 *     summary: Sign an NDA agreement
 *     tags: [NDA]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: NDA ID to sign
 *     responses:
 *       200:
 *         description: NDA signed successfully
 *       404:
 *         description: NDA not found
 */
router.post('/sign/:id', ndaController.signNda);

/**
 * @swagger
 * /nda:
 *   get:
 *     summary: Get all NDA agreements
 *     tags: [NDA]
 *     responses:
 *       200:
 *         description: All NDAs retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/', ndaController.getAllNdas);

/**
 * @swagger
 * /nda/user/{userId}:
 *   get:
 *     summary: Get NDAs by user ID
 *     tags: [NDA]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID to filter NDAs
 *     responses:
 *       200:
 *         description: NDAs retrieved successfully
 *       404:
 *         description: No NDA found for this user
 */
router.get('/user/:userId', ndaController.getUserNdas);

/**
 * @swagger
 * /nda/{id}/status:
 *   put:
 *     summary: Update NDA status
 *     tags: [NDA]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: NDA ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "Expired"
 *     responses:
 *       200:
 *         description: NDA status updated successfully
 *       404:
 *         description: NDA not found
 */
router.put('/:id/status', ndaController.updateNdaStatus);

module.exports = router;
