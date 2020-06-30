const pool = require('../database/index');
const moment = require('moment');

const DATA_FORMAT = 'HH:mm:ss';
const CLIENT_FORMAT = 'h:mm A';

const retrieveApptsByDate = (date, status) => {
  return new Promise((resolve, reject) => {
    pool.connect()
      .then((client) => {
        const query = `SELECT * FROM appointments WHERE (appt_date = $1 AND appt_status = $2) ORDER BY appt_time ASC`;
        return Promise.all([client.query(query, [date, status]), client]);
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

const retrieveApptDetails = appt_id => {
  return new Promise((resolve, reject) => {
    pool.connect()
      .then((client) => {
        const query = `SELECT * FROM appointments WHERE id = $1`;
        return Promise.all([client.query(query, [appt_id]), client]);
      })
      .then(([result, client]) => {
        result.rows.forEach((appt) => {
          appt.appt_time = moment(appt.appt_time, DATA_FORMAT).format(CLIENT_FORMAT);
        });

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
        const params = Object.keys(appt).join(', ');
        const values = Object.keys(appt).map((keys, i) => `$${i + 1}`).join(', ');
        const data = Object.keys(appt).map((keys, i) => appt[keys]);
        const query = `INSERT INTO appointments (${params}) VALUES (${values}) RETURNING *`;
        return Promise.all([client.query(query, data), client]);
      })
      .then(([result, client]) => {
        resolve(result);
        client.release();
      })
      .catch((error) => reject(error));
  })
};

const updateAppt = appt => {
  return new Promise((resolve, reject) => {
    pool.connect()
    .then((client) => {
      const id = appt.id;
      delete appt.id;
      const params = Object.values(appt);
      params.push(id);

        const keyValuePairs = Object
          .keys(appt)
          .map((key, i) => `${key} = $${i + 1}`)
          .join(', ');
        let query = `UPDATE appointments SET ${keyValuePairs} WHERE id = $${params.length}`;
        return Promise.all([client.query(query, params), client]);
      })
      .then(([result, client]) => {
        resolve(result);
        client.release();
      })
      .catch((error) => reject(error));
  });
};

const retrieveApptsByStatus = status => {
  return new Promise((resolve, reject) => {
    pool.connect()
      .then((client) => {
        const query = `SELECT * FROM appointments WHERE appt_status = $1`;
        return Promise.all([client.query(query, [status]), client]);
      })
      .then(([result, client]) => {
        resolve(result.rows);
        client.release();
      })
      .catch((error) => reject(error));
  });
};

const retrieveApptsByUser = user_id => {
  return new Promise((resolve, reject) => {
    pool.connect()
      .then((client) => {
        const query = `SELECT * FROM appointments WHERE user_id = $1`;
        return Promise.all([client.query(query, [user_id]), client]);
      })
      .then(([result, client]) => {
        resolve(result.rows);
        client.release();
      })
      .catch((error) => reject(error));
  });
};

const retrieveUserById = id => {
  return new Promise((resolve, reject) => {
    pool.connect()
      .then((client) => {
        const query = `SELECT * FROM users WHERE fb_id = $1`;
        return Promise.all([client.query(query, [id]), client]);
      })
      .then(([result, client]) => {
        resolve(result.rows);
        client.release();
      })
      .catch((error) => reject(error));
  });
};

const createUser = userOptions => {
  return new Promise((resolve, reject) => {
    const whitelist = ['user_name', 'user_type', 'fb_id', 'fb_access_token', 'email', 'telephone'];
    if (!userOptions.user_name) {
      reject(new Error('No username provided'));
      return;
    }
    userOptions.user_type = 'customer';

    for (let key in userOptions) {
      if (!whitelist.includes(key)) {
        reject(new Error('User options are invalid'));
        return;
      }
    }
    pool.connect()
      .then((client) => {
        const params = Object.keys(userOptions).join(', ');
        const values = Object.keys(userOptions).map((option, i) => `$${i + 1}`).join(', ');
        const data = Object.keys(userOptions).map((option, i) => userOptions[option]);
        const query = `INSERT INTO users (${params}) VALUES (${values}) RETURNING *`;
        return Promise.all([client.query(query, data), client]);
      })
      .then(([result, client]) => {
        resolve(result);
        client.release();
      })
      .catch((error) => reject(error));
  });
};

module.exports = { retrieveApptsByDate, retrieveApptDetails, createAppt, updateAppt, retrieveApptsByStatus, retrieveUserById, createUser, retrieveApptsByUser };