const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { register, login, getMe } = require('../controllers/authController'); // 👈 ajoute getMe

router.post('/register', register);
router.post('/login', login);

// ✅ Corrige ici : utilise bien ta fonction getMe
router.get('/me', authenticate, getMe);

module.exports = router;
