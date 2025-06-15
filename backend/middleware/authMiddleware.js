// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const SECRET_KEY = 'votre_cle_secrete'; // Remplace par process.env.SECRET_KEY si tu utilises dotenv

exports.authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'Utilisateur introuvable' });
    }

    // ✅ Correction ici
    req.user = user; // Pour accéder à user directement
    req.userId = user.id; // Pour compatibilité avec tes autres fonctions

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide ou expiré' });
  }
};
