import React from 'react';
import AppointmentForm from './AppointmentForm.jsx';

function employeeAddAppointment(props) {
  if (props.state) {
    return (
      <AppointmentForm />
    );
  }
  return null;
}

export default employeeAddAppointment;
