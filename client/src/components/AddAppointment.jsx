import React from 'react';

function addAppointment(props) {
  if (props.state) {
    return (
      <form>
        Customer Name
        <input type='text'></input>
        <br/>
        Employee Name
        <input type='text'></input>
        <br/>
        Service
        <input type='text'></input>
        <br/>
        Time
        <input type='text'></input>
        <br/>
        Price
        <input type='text'></input>
        <br/>
        Notes
        <input type='text'></input>
        <br/>
        <input type='submit' value='Submit'></input>
      </form>
    )
  } else {
    return null;
  }
}

export default addAppointment;