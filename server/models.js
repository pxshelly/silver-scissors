const pool = require('../database/index');
const moment = require('moment');

const DATA_FORMAT = 'HH:mm:ss';
const CLIENT_FORMAT = 'h:mm A';

const retrieveAppts = (date) => {
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
        result.rows.forEach((appt) => {
          const time = appt.appt_time;
          const formattedTime = moment(time, DATA_FORMAT).format(CLIENT_FORMAT);
          appt.appt_time = formattedTime;
          
          const hour = moment(time, DATA_FORMAT).startOf('hour').format(CLIENT_FORMAT);

          data[hour].push(appt);
        });
        
        resolve([data, result.rows]);
        client.release();
      })
      .catch((error) => reject(error));
  });
};

const retrieveApptDetails = appt => {
  return new Promise((resolve, reject) => {
    pool.connect()
      .then((client) => {
        const query = `SELECT * FROM appointments WHERE appt_id = $1`;
        return Promise.all([client.query(query, [appt]), client]);
      })
      .then(([result, client]) => {
        resolve(result.rows);
        client.release();
      })
      .catch((error) => reject(error));
  });
};

const createAppt = appt => {
  const data = Object.values(appt);
  return new Promise((resolve, reject) => {
    pool.connect()
      .then((client) => {
        const query = `INSERT INTO appointments (customer_name, stylist, hair_service, appt_date, appt_time, telephone, textable, notes, pictures) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
        return Promise.all([client.query(query, data), client]);
      })
      .then(([result, client]) => {
        resolve(result);
        client.release();
      })
      .catch((error) => console.log(error));
  })
}

const updateAppt = (appt) => {
  return new Promise((resolve, reject) => {
    pool.connect()
      .then((client) => {
        const query = `UPDATE appointments SET customer_name = $1, stylist = $2, hair_service = $3, appt_date = $4, appt_time = $5, telephone = $6, textable = $7, notes = $8, pictures = $9 WHERE appt_id = $10`;
        const params = [appt.customer_name, appt.employee_name, appt.hair_service, appt.appt_date, appt.appt_time, appt.phone_number, appt.textable, appt.notes, appt.pictures, appt.id];
        return Promise.all([client.query(query, params), client]);
      })
      .then(([result, client]) => {
        resolve(result);
        client.release();
      })
      .catch((error) => console.log(error));
  })
}

module.exports = { retrieveAppts, retrieveApptDetails, createAppt , updateAppt };