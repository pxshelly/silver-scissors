import React from 'react';

function requestAppointment() {
  return (
    <form>
      Name
      <input type='text'></input>
      <br/>
      Service
      <input type='text'></input>
      <br/>
      Date
      <input type='text'></input>
      <br/>
      Time
      <input type='text'></input>
      <br/>
      Phone Number
      <input type='text'></input>
      <br/>
      Can we text this number?
      <input type='text'></input>
      <br/>
      Notes
      <input type='text'></input>
      <br/>
      <input type='submit' value='Submit'></input>
    </form>
  )
}

export default requestAppointment;