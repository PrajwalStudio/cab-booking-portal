const { sequelize } = require('../models');

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected to cab_booking_portal');

    await sequelize.sync({ force: false });
    console.log('✅ All tables created successfully');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sequelize.close();
  }
}

syncDatabase();