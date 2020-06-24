import React from 'react';
import ApptFormModal from './ApptFormModal.jsx';

const editAppt = props => {
  if (props.editState) {
    return (
      <ApptFormModal apptDetails={props.apptDetails} />
    );
  }
  return null;
}

export default editAppt;
