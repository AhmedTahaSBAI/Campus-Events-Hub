const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

// ⬇️ Cette route retourne l'utilisateur connecté
router.get('/me', authenticate, (req, res) => {
  const { id, name, email } = req.user;
  res.json({ id, name, email });
});

module.exports = router;
