const express = require('express');
const router = express.Router();
const { getAllEvents, createEvent } = require('../controllers/eventsController');
const { authenticate } = require('../middleware/authMiddleware'); // ✅ ici

router.get('/', getAllEvents);
router.post('/', authenticate, createEvent); // ✅ ici

module.exports = router;
