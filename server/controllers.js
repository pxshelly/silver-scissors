const { createAppointment } = require('./models');

const makeAppointment = (req, res) => {
  createAppointment(req.body)
    .then((result) => res.status(201).send(result))
    .catch((error) => res.status(500).send(error));
};

module.exports = { makeAppointment };