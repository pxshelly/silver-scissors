import React from 'react';
import moment from 'moment';

function appointmentDetails(props) {
  const details = props.appointmentDetails;

  const obj = {
    'Customer Name': details.customer_name,
    'Employee': details.employee_name,
    'Service': details.hair_service,
    'Date': moment(details.appt_date).format('LL'),
    'Time': moment(details.appt_time, 'HH:mm:ss').format('hh:mm A'), 
    'Phone Number': details.phone_number,
    'Can we text this number?': details.textable,
    'Notes': details.notes,
    'Pictures': details.Pictures
  }

  const tr = [];
  for (const key in obj) {
    tr.push(
      <tr key={key}>
        <td>{key}</td>
        <td>{obj[key]}</td>
      </tr>
    )
  }
  
  if (props.appointmentDetails) {
    return (
      <table>
        <tbody>
          {tr}
        </tbody>
      </table>
    )
  }

  return null;
}

export default appointmentDetails;
