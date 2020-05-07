import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }

  render() {
    if (!document.cookie) {
      return (
        <div className='modal'>
          <div className='modal-content'>Please sign in
          <a href='/auth/facebook'>
            <button type='button' className='modal-content sign-in-button' onClick={this.props.authenticate}>
                {this.state.loggedIn ? 'Welcome' : 'Sign In'}
              </button>
            </a>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default Login;
