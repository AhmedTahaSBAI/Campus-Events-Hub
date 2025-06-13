const { Event } = require('../models/Event');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};