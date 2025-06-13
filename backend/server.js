const app = require('./app');
const sequelize = require('./config/database'); // Import direct

sequelize.sync()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ DB sync error:', err));