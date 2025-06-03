const mongoose = require('mongoose');

const chargingStationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  powerOutput: { type: Number, required: true },
  connectorType: { type: String, required: true },
});

module.exports = mongoose.model('ChargingStation', chargingStationSchema);