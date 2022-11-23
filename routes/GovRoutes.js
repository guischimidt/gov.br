const express = require('express');
const router = express.Router();
const GovController = require('../controllers/GovController');

router.get('/auxilio-brasil', GovController.auxilioBrasilMunicipio);
router.get('/auxilio-emergencial', GovController.auxilioEmergencialCPF);


module.exports = router;