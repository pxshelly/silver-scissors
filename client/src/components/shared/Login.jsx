import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    window.location = '/';
  }

  render() {
    if (!document.cookie) {
      return (
        <div className='modal' onClick={this.closeModal}>
          <div className='sign-in-modal-content sign-in-modal'>
            <div className='sign-in-left'>
              <div className='sign-in-button-container'>
                <a href='/auth/facebook'>
                  <button type='button' className='sign-in-button-modal' onClick={this.props.authenticate}>
                    {this.state.loggedIn ? 'Welcome' : 'Sign In'}
                  </button>
                </a>
              </div>
            </div>
            <div className='sign-in-right'>
              <img className='sign-in-pic' src='https://silver-scissors.s3-us-west-1.amazonaws.com/IMG_6102.jpg' />
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default Login;
