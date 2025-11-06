const express = require('express');
const router = express.Router();
const ndaController = require('../Controller/ndaController');

router.post('/nda', ndaController.createNda);

router.get('/nda',  ndaController.getAllNdas);


router.get('/nda/:id', ndaController.getNdaByUser);

router.put('/:id',  ndaController.updateNda);

router.delete('/:id', ndaController.deleteNda);

module.exports = router;
