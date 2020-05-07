import React from 'react';
import moment from 'moment';

const PendingAppts = props => {
  const { appts } = props;

  const renderAppts = () => {
    return appts.map((appt, i) => {
      return (
        <li key={i}>
          <span>{moment(appt.appt_date).format('l')}</span>
          <span>{appt.hair_services}</span>
          <span>{appt.appt_status}</span>
          <button>Details</button>
        </li>
      );
    });
  };

  return (
    <div>
      <h1>Pending Appointments</h1>
      <ul>
        {renderAppts()}
      </ul>
    </div>
  );
};

export default PendingAppts;