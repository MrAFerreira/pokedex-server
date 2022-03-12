const router = require('express').Router();

const mongoose = require('mongoose');

// Require the User model in order to interact with the database
const User = require('../models/User.model');
const Team = require('../models/Team.model');

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const { isAuthenticated } = require('../middleware/jwt.middleware');

router.post('/team', isAuthenticated, (req, res, next) => {
  const { _id } = req.payload;
  const { name, pokemon } = req.body;

  Team.create({ user: _id, name, pokemon })
    .then((newTeam) => {
      return User.findByIdAndUpdate(_id, { $push: { teams: newTeam._id } });
    })
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});

router.get('/team/:id', isAuthenticated, (req, res, next) => {
  const { id } = req.params;
  Team.findById(id)
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(500).json(err));
});

router.put('/team/:id', isAuthenticated, (req, res, next) => {
  const { id } = req.params;
  const { name, pokemon } = req.body;
  Team.findByIdAndUpdate(id, { name, pokemon }, { new: true })
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(500).json(err));
});

router.delete('/team/:id', isAuthenticated, (req, res, next) => {
  const { id } = req.params;
  Team.findByIdAndRemove(id)
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
