const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  time: { type: DataTypes.TIME, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  category: { 
    type: DataTypes.ENUM('sport', 'club', 'workshop', 'study'),
    allowNull: false 
  },
  userId: { //  Liaison avec l'utilisateur
    type: DataTypes.INTEGER,
    allowNull: false ,
  }
});

module.exports = Event;
