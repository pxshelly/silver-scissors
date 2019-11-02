import React from 'react';
import ApptForm from './ApptForm.jsx';

function addAppt(props) {
  if (props.createAppt || props.editState) {
    return (
      <ApptForm />
    );
  }
  return null;
}

export default addAppt;
