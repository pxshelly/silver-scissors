import React from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../constants.js';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }

  componentDidMount() {
    axios.get(`${SERVER_URL}/login-status`)
      .then((result) => {
        const { data: { loggedIn = false } = {} } = result;
        if (loggedIn) {
          this.setState({ loggedIn: true })
        }
      })
  }

  render() {
    return (
      <div className='header-container'>
        <div className='header'>
          <a href='/' className='title-container'>
            <h1>Silver Scissors</h1>
            <h2>hair salon</h2>
          </a>
        </div>
        <div className='login-container'>
          <a href='/auth/facebook'>
            <button className='button sign-in-button'>{this.state.loggedIn ? 'Welcome!' : 'Sign In'}</button>
          </a>
          <a href='/logout'>
            <button className='button'>Sign Out</button>
          </a>
        </div>
      </div>
    )
  }
}

export default Header;