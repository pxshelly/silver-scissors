import React from 'react';
import ApptForm from './ApptForm.jsx';

const editAppt = props => {
  if (props.editState) {
    return (
      <ApptForm editAppt={props.editState}/>
    );
  }
  return null;
}

export default editAppt;
