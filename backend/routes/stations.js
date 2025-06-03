const express = require('express');
const auth = require('../middleware/auth');
const ChargingStation = require('../models/ChargingStation');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const station = new ChargingStation(req.body);
    await station.save();
    res.status(201).json(station);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const stations = await ChargingStation.find();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const station = await ChargingStation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!station) return res.status(404).json({ error: 'Station not found' });
    res.json(station);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const station = await ChargingStation.findByIdAndDelete(req.params.id);
    if (!station) return res.status(404).json({ error: 'Station not found' });
    res.json({ message: 'Station deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;