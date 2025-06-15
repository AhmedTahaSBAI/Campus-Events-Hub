const User = require('../models/User'); // correction ici
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'votre_cle_secrete';

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });

    res.status(201).json({ message: 'Utilisateur créé' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) { // correction ici
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ['id', 'name', 'email'] // 🔐 Pas de mot de passe
    });

    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" }); // ✅ Avec return
    }

    return res.json({ user }); // ✅ Ne s’exécute que si user trouvé
  } catch (error) {
    console.error('❌ Erreur dans getMe:', error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

