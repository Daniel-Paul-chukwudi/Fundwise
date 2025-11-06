const express = require('express');
const router = express.Router();
const {createKycI,getAllKycs,getKycById,updateKyc,deleteKyc} = require('../Controller/kycControllerInvestor');
const {createKyc} = require('../Controller/kycControllerBusinessOwner');
const { checkLogin,checkInvestorLogin } = require('../Middleware/authentication');
const {uploads} = require('../Middleware/multer')

router.post('/kyc',uploads.fields([
    { name: 'governmentId', maxCount: 1 },
    { name: 'proofOfAddress', maxCount: 1 },
    { name: 'profilePic', maxCount: 1 }
]),checkLogin,createKyc)

router.post('/kycI',uploads.fields([
    { name: 'governmentId', maxCount: 1 },
    { name: 'proofOfAddress', maxCount: 1 },
    { name: 'profilePic', maxCount: 1 }
  ]),checkInvestorLogin,createKycI );

router.get('/kycs', getAllKycs);

// Get one KYC 
router.get('/:id', getKycById);

// Update KYC 


// Delete a KYC
router.delete('/:id', checkLogin, deleteKyc);

module.exports = router;
