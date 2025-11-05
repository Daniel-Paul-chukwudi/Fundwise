const express = require('express');
const router = express.Router();
const {createKyc,getAllKycs,getKycById,updateKyc,deleteKyc} = require('../Controller/kycControllerInvestor');
const { checkLogin,checkInvestorLogin } = require('../Middleware/authentication');
const {uploads} = require('../Middleware/multer')

// Create new KYC with file uploads
router.post('/kycI',checkInvestorLogin,uploads.fields([
    { name: 'governmentId', maxCount: 1 },
    { name: 'proofOfAddress', maxCount: 1 }
  ]),createKyc );

router.get('/kycs', getAllKycs);

// Get one KYC 
router.get('/:id', getKycById);

// Update KYC 


// Delete a KYC
router.delete('/:id', checkLogin, deleteKyc);

module.exports = router;
