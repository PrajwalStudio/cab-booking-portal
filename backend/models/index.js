const sequelize = require('../config/database');
const User = require('./User');
const Booking = require('./Booking');
const Driver = require('./Driver');
const Vehicle = require('./Vehicle');

// Define associations
User.hasMany(Booking, { as: 'CompanyBookings', foreignKey: 'companyId' });
User.hasMany(Booking, { as: 'VendorBookings', foreignKey: 'vendorId' });
User.hasMany(Driver, { foreignKey: 'vendorId' });
User.hasMany(Vehicle, { foreignKey: 'vendorId' });

Booking.belongsTo(User, { as: 'Company', foreignKey: 'companyId' });
Booking.belongsTo(User, { as: 'Vendor', foreignKey: 'vendorId' });
Booking.belongsTo(Driver, { foreignKey: 'driverId' });
Booking.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

Driver.belongsTo(User, { as: 'Vendor', foreignKey: 'vendorId' });
Driver.hasMany(Booking, { foreignKey: 'driverId' });

Vehicle.belongsTo(User, { as: 'Vendor', foreignKey: 'vendorId' });
Vehicle.hasMany(Booking, { foreignKey: 'vehicleId' });

module.exports = {
  sequelize,
  User,
  Booking,
  Driver,
  Vehicle
};