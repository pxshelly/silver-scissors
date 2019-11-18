import React from 'react';

const authenticate = () => {
  location.href = 'http://localhost:3000/auth/facebook';
}

const logIn = () => {
  return (
    <div>
      <button type='button' onClick={authenticate}>Sign In</button>
    </div>
  );
}

export default logIn;