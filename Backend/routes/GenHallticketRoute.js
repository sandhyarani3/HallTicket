const express = require('express');
const router = express.Router();
const { generateHallticket } = require('../controllers/GenHallticketCon');

router.post('/generate', generateHallticket);

module.exports = router;
