import React from 'react';

function visitUs() {
  return (
    <div className='visit-us'>
      <div className='contact-info'>
        <address>
          Silver Scissors
          <br />
          4559 Peck Rd
          <br />
          El Monte, CA 91732
          (626) 444-3856
          <br />
          Tuesday - Sunday
          <br />
          9AM - 7PM
          <br />
        </address>
        <img src='https://silver-scissors.s3-us-west-1.amazonaws.com/IMG_5916.jpg' />
      </div>
      <div className='visit-us-right-column'>
        <iframe className='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.3055633691974!2d-118.0190540845859!3d34.087311823328186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2d9ff23167abd%3A0xccc05f30d476c6b5!2sSilver%20Scissors%20Hair%20Salon!5e0!3m2!1sen!2sus!4v1570830352263!5m2!1sen!2sus"></iframe>
        <div className='say-hi'>
          <p>Come say hi!</p>
        </div>
      </div>
    </div>
  )
}

export default visitUs;