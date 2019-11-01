import React from 'react';
import moment from 'moment';

function apptDetails(props) {
  const { customer_name, stylist, hair_service, appt_date, appt_time, telephone, textable, notes, pictures, appt_id } = props.apptDetails;

  const obj = {
    'Customer Name': customer_name,
    'Stylist': stylist,
    'Service': hair_service,
    'Date': moment(appt_date).format('LL'),
    'Time': appt_time, 
    'Telephone': telephone,
    'Can we text this number?': textable,
    'Notes': notes,
    'Pictures': pictures,
  }

  const tr = [];
  for (const key in obj) {
    tr.push(
      <tr key={key}>
        <td>{key}</td>
        <td>{obj[key]}</td>
      </tr>
    );
  }
  
  const autofill = () => {
    props.editAppt();
    setTimeout(() => {
      let details = props.apptDetails;
      for (const key in details) {
        if (key === 'appt_id') {
          continue;
        } 
        if (key === 'appt_date') {
          details[key] = moment(details[key]).format('YYYY-MM-DD');        
        }
        document.getElementsByName(key)[0].value = details[key];
      }
    }, 50)
  }

  if (props.apptDetails) {
    return (
      <div>
        <button id={appt_id} onClick={() => autofill()}>Edit Appointment</button>
        <table>
          <tbody>
            {tr}
          </tbody>
        </table>
      </div>
    );
  } 
  return null;
}

export default apptDetails;
