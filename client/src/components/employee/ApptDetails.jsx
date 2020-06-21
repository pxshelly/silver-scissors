import React from 'react';
import moment from 'moment';
import axios from 'axios';

function apptDetails(props) {
  const { customer_name, stylist, hair_services, appt_date, appt_time, email, telephone, textable, notes, pictures, id, price, duration_hours, duration_minutes } = props.apptDetails;

  const details = {
    'Customer': customer_name,
    'Service': hair_services,
    'Stylist': stylist,
    'Date': moment(appt_date).format('LL'),
    'Time': appt_time,
    'Email': email,
    'Telephone': telephone,
    'Can we text this number?': textable,
    'Notes': notes,
    'Pictures': pictures,
    'Price': price,
    'Hours': duration_hours,
    'Minutes': duration_minutes
  }

  const tableRows = [];
  for (const key in details) {
    tableRows.push(
      <tr key={key}>
        <td className='edit-appt-modal-td'>{key}</td>
        <td>{details[key]}</td>
      </tr>
    );
  }

  const autofill = () => {
    setTimeout(() => {
      const details = this.state.apptDetails;
      for (const key in details) {
        if (details[key] === null) {
          continue;
        }
        if (key === 'id' || key === 'user_id' || key === 'appt_status') {
          continue;
        }
        if (key === 'appt_date') {
          details[key] = moment(details[key]).format('YYYY-MM-DD');
        }
        if (key === 'appt_time') {
          details[key] = moment(details[key], 'h:mm A').format('HH:mm:ss');
        }
        if (key === 'hair_services') {
          let services = details[key];
          services = services.replace(/"|{|}/g, '').split(',');
          for (let key of services) {
            document.getElementById(key).checked = true;
          }
          continue;
        }
        if (key === 'textable') {
          if (details[key] === 'true') {
            document.getElementById('yes').checked = true;
            continue;
          } else {
            document.getElementById('no').checked = true;
            continue;
          }
        }
        document.getElementById(key).value = details[key];
      }
    }, 10)
  }

  const deleteAppt = () => {
    axios.put(`/appointments?status=deleted`, props.apptDetails)
  }

  const closeModal = () => {
    document.getElementsByClassName('modal')[0].style.display = 'none';
  }

  if (props.apptDetails) {
    return (
      <div className='modal'>
        <div className='edit-appt-modal'>
          <div className='close-modal-button'>
            <button onClick={closeModal}>&#x2715;</button>
          </div>
          <table className='edit-appt-modal-table'>
            <tbody>
              {tableRows}
            </tbody>
          </table>
          <div className='center edit-appt-modal-buttons'>
            <button id={id} className='button edit-appt-button' onClick={autofill}>Edit Appointment</button>
            <button id={id} className='button delete-appt-button' onClick={deleteAppt}>Delete Appointment</button>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default apptDetails;
