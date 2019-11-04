const { retrieveAppts, retrieveApptDetails, createAppt, updateAppt, deleteAppt } = require('./models');

const getAppts = (req, res) => {
  retrieveAppts(req.params.date)
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(400).send(error));
};

const getApptDetails = (req, res) => {
  retrieveApptDetails(req.params.id)
    .then((result) => {res.status(200).send(result)})
    .catch((error) => res.status(400).send(error));
};

const makeAppt = (req, res) => {
  createAppt(req.body)
    .then((result) => res.status(201).send(result))
    .catch((error) => res.status(500).send(error));
};

const editAppt = (req, res) => {
  updateAppt(req.body)
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(500).send(error));
}

const removeAppt = (req, res) => {
  deleteAppt(req.params.id)
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(400).send(error));
}

module.exports = { getAppts, getApptDetails, makeAppt, editAppt, removeAppt };