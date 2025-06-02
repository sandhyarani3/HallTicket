const express = require('express');
const multer = require('multer');
const { createStudent } = require('../controllers/hallticketCon');

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/create', upload.single('photo'), createStudent);

module.exports = router;
