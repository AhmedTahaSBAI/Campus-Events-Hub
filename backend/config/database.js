const { Sequelize } = require('sequelize');

// Créez une nouvelle instance Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: console.log // Active les logs SQL (optionnel)
});

// Testez la connexion
sequelize.authenticate()
  .then(() => console.log('✅ Connexion à la DB réussie'))
  .catch(err => console.error('❌ Erreur de connexion à la DB:', err));

// Exportez l'instance sequelize
module.exports = sequelize; // Export direct (pas besoin de {sequelize})