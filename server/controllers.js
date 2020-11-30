const { retrieveApptsByDate, retrieveApptDetails, createAppt, updateAppt, retrieveApptsByStatus, retrieveApptsByUser } = require('./models');
const { sanitizeAppt } = require('./utils');

const getApptsByDate = (req, res) => {
  retrieveApptsByDate(req.params.date, req.query.status)
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(400).send(error));
};

const getAppt = (req, res) => {
  if (req.query.status) {
    retrieveApptsByStatus(req.query.status)
      .then((result) => { res.status(200).send(result) })
      .catch((error) => res.status(400).send(error));
  } else if (req.query.details) {
    retrieveApptDetails(req.query.details)
      .then((result) => { res.status(200).send(result) })
      .catch((error) => res.status(400).send(error));
  } else if (req.query.user_id) {
    retrieveApptsByUser(req.query.user_id)
      .then((result) => { res.status(200).send(result) })
      .catch((error) => res.status(400).send(error));
  } else {
    res.status(400).send('Invalid query parameters provided');
  }
};

const makeAppt = (req, res) => {
  if (req.user) {
    req.body.user_id = req.user.id;
  }
  if (req.query.status === 'approved') {
    req.body.appt_status = 'approved';
  }
  if (req.query.status === 'pending') {
    req.body.appt_status = 'pending';
  }
  createAppt(sanitizeAppt(req.body))
    .then((result) => res.status(201).send(result))
    .catch((error) => res.status(500).send(error));
};

const editAppt = (req, res) => {
  if (req.query.status) {
    req.body.appt_status = req.query.status;
  }
  updateAppt(sanitizeAppt(req.body))
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(500).send(error));
};

module.exports = { getApptsByDate, getAppt, makeAppt, editAppt };