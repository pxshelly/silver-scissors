import React from 'react';
import moment from 'moment';

const PastAppts = props => {
  const { appts } = props;

  const filterPastAppts = () => {
    return appts.filter(appt => appt.appt_date < moment());
  };

  const renderAppts = () => {
    return filterPastAppts().map((appt, i) => {
      return (
        <li key={i}>
          <span>{moment(appt.appt_date).format('l')}</span>
          <span>{appt.hair_service}</span>
          <button>Details</button>
        </li>
      );
    });
  };

  return (
    <div>
      <h1>Past Appointments</h1>
      <ul>
        {renderAppts()}
      </ul>
    </div>
  );
};

export default PastAppts;