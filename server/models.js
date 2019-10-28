const pool = require('../database/index');
const moment = require('moment');

const DATA_FORMAT = 'HH:mm:ss';
const CLIENT_FORMAT = 'h:mm A';

const retrieveAppointments = (date) => {
  return new Promise((resolve, reject) => {
    pool.connect()
      .then((client) => {
        const query = `SELECT * FROM appointments WHERE appt_date = $1 ORDER BY appt_time ASC`;
        return Promise.all([client.query(query, [date]), client]);
      })
      .then(([result, client]) => {
        // Create data for a "day" to be returned
        const data = {};

        // Set data object with 24 hours
        for (let i = 0; i < 24; i++) {
          let time = moment(i, DATA_FORMAT).format(CLIENT_FORMAT);
          data[time] = [];
        }

        // Assign appointments to their respective time slot
        result.rows.forEach((appointment) => {
          const time = appointment.appt_time;
          const formattedTime = moment(time, DATA_FORMAT).format(CLIENT_FORMAT);
          appointment.appt_time = formattedTime;
          
          const hour = moment(time, DATA_FORMAT).startOf('hour').format(CLIENT_FORMAT);

          data[hour].push(appointment);
        });
        
        resolve([data, result.rows]);
        client.release();
      })
      .catch((error) => reject(error));
  });
};

const retrieveAppointmentDetails = (appointment) => {
  return new Promise((resolve, reject) => {
    pool.connect()
      .then((client) => {
        const query = `SELECT * FROM appointments WHERE appt_id = $1`;
        return Promise.all([client.query(query, [appointment]), client]);
      })
      .then(([result, client]) => {
        resolve(result.rows);
        client.release();
      })
      .catch((error) => reject(error));
  });
};

const createAppointment = (appointment) => {
  const data = Object.values(appointment);
  return new Promise((resolve, reject) => {
    pool.connect()
      .then((client) => {
        const query = `INSERT INTO appointments (customer_name, employee_name, hair_service, appt_date, appt_time, phone_number, textable, notes, pictures) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
        return Promise.all([client.query(query, data), client]);
      })
      .then(([result, client]) => {
        resolve(result);
        client.release();
      })
      .catch((error) => reject(error));
  })
}
module.exports = { retrieveAppointments, retrieveAppointmentDetails, createAppointment };