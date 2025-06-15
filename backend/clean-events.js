const { Event, User } = require('./models');
const sequelize = require('./config/database');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la DB réussie');

    const deleted = await Event.destroy({ where: { userId: null } });
    console.log(`✅ ${deleted} événements orphelins supprimés`);
  } catch (err) {
    console.error('❌ Erreur de suppression:', err);
  } finally {
    // S'assurer qu'aucune opération n'est en cours avant de fermer
    setTimeout(async () => {
      await sequelize.close();
      console.log('🔒 Connexion fermée proprement');
    }, 500); // petit délai pour éviter les appels résiduels
  }
})();
