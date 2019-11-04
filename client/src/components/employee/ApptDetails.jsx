import React from 'react';
import moment from 'moment';
import axios from 'axios';

function apptDetails(props) {
  const { customer_name, stylist, hair_service, appt_date, appt_time, telephone, textable, notes, pictures, appt_id } = props.apptDetails;

  const details = {
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

  const tableRows = [];
  for (const key in details) {
    tableRows.push(
      <tr key={key}>
        <td>{key}</td>
        <td>{details[key]}</td>
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
    }, 10);
  }

  const deleteAppt = () => {
    let id = document.getElementsByClassName('delete-appt-button')[0].getAttribute('id');
    axios.delete(`/appointment/delete/${id}`)
      .catch((error) => console.log(error));
  }

  if (props.apptDetails) {
    return (
      <div>
        <button id={appt_id} className='edit-appt-button' onClick={() => autofill()}>Edit Appointment</button>
        <table>
          <tbody>
            {tableRows}
          </tbody>
        </table>
        <button id={appt_id} className='delete-appt-button' onClick={() => deleteAppt()}>Delete Appointment</button>
      </div>
    );
  } 
  return null;
}

export default apptDetails;
