import React from 'react';

class ApptConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className='confirmation'>
        <div>Thank you for requesting an appointment. We will be in touch soon!</div>
        <img className='confirmation-pic' src='https://silver-scissors.s3-us-west-1.amazonaws.com/IMG_6078.jpg' />
      </div>
    );
  }
}

export default ApptConfirmation;