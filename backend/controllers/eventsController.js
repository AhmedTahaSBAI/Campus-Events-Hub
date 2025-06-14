const  Event = require('../models/Event');

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
    const { title, description, date, time, location, category } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      category,
      userId: req.user.id  // ⬅️ Associe le user connecté à l'événement
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  } 
};
exports.getUserEvents = async (req, res) => {
  const userId = req.params.userId;

  try {
    const events = await Event.findAll({ where: { userId } });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des événements utilisateur.' });
  }
};
