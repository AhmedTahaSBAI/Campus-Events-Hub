const User = require('./User');
const Event = require('./Event');

// 🔗 Définir les relations entre modèles
User.hasMany(Event, { foreignKey: 'userId', onDelete: 'CASCADE' });
Event.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  Event
};
