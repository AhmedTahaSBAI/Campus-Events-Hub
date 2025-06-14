const express = require('express');
const router = express.Router();

const {
  getAllEvents,
  createEvent,
  getUserEvents
} = require('../controllers/eventsController');

const { authenticate } = require('../middleware/authMiddleware');

// ✅ Route sécurisée pour récupérer les événements de l'utilisateur
router.get('/user/:userId', authenticate, getUserEvents);

// ✅ Route publique pour récupérer tous les événements
router.get('/', getAllEvents);

// ✅ Route sécurisée pour créer un événement
router.post('/', authenticate, createEvent);

module.exports = router;
