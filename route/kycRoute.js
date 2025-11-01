const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  createKyc,
  getAllKycs,
  getKycById,
  updateKyc,
  deleteKyc
} = require('../Controller/kycController');

const { checkLogin } = require('../Middleware/authentication');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create new KYC with file uploads
router.post(
  '/kyc',
  checkLogin,
  upload.fields([
    { name: 'governmentId', maxCount: 1 },
    { name: 'proofOfAddress', maxCount: 1 }
  ]),
  createKyc
);

// Get all KYCs
router.get('/kycs', checkLogin, getAllKycs);

// Get one KYC 
router.get('/:id', checkLogin, getKycById);

// Update KYC 
router.put(
  '/:id',
  checkLogin,
  upload.fields([
    { name: 'governmentId', maxCount: 1 },
    { name: 'proofOfAddress', maxCount: 1 }
  ]),
  updateKyc
);

// Delete a KYC
router.delete('/:id', checkLogin, deleteKyc);

module.exports = router;
