import React from 'react';

function header(props) {
  return (
    <div className='header-container'>
      <button type='button' className='sign-in-button'>
        {props.signedIn ? 'Welcome' : 'Sign In'}
          <a href="/auth/facebook" />
      </button>
      <div className='title-container'>
        <h1>Silver Scissors</h1>
        <h2>hair salon</h2>
      </div>
    </div>
  )
}

export default header;