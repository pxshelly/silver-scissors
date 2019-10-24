const { retrieveAppointments, createAppointment } = require('./models');

const getAppointments = (req, res) => {
  retrieveAppointments(req.params.date)
    .then((result) => res.status(200).send({
      result: result, 
      date: req.params.date
    }))
    .catch((error) => res.status(400).send(error));
};

const makeAppointment = (req, res) => {
  createAppointment(req.body)
    .then((result) => res.status(201).send(result))
    .catch((error) => res.status(500).send(error));
};

module.exports = { getAppointments, makeAppointment };