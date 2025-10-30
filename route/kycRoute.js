// const express = require('express');
// const router = express.Router();

// const {
//   createKyc,
//   getAllKycs,
//   getKycById,
//   updateKyc,
//   deleteKyc
// } = require('../controllers/kycController');

// const { checkLogin } = require('../Middleware/authentication');

// router.post('/', checkLogin, createKyc);

// router.get('/', checkLogin, getAllKycs);

// router.get('/:id', checkLogin, getKycById);

// router.put('/:id', checkLogin, updateKyc);

// router.delete('/:id', checkLogin, deleteKyc);

// module.exports = router;

const express = require('express');
const router = express.Router();

const {
  createKyc,
  getAllKycs,
  getKycById,
  updateKyc,
  deleteKyc
} = require('../Controller/kycController');

const { checkLogin } = require('../Middleware/authentication');

router.post('/kyc', checkLogin, createKyc);

router.get('/kycs',checkLogin, getAllKycs);

router.get('/:id',checkLogin, getKycById);

router.put('/:id',  updateKyc);

router.delete('/:id', deleteKyc);

module.exports = router;
