import React from 'react';
import axios from 'axios';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/login-status') 
      .then((result) => {
        const { data: { loggedIn = false } = {} } = result;
        if (loggedIn) {
          this.setState({loggedIn: true})
        }
      })
  }

  render() {
    return (
      <div className='header-container'>
        <a href='/' className='title-container'>
          <h1>Silver Scissors</h1>
          <h2>hair salon</h2>
        </a>
        <a href='/auth/facebook'>{this.state.loggedIn ? 'Welcome' : 'Sign In'}</a>
        <a href='/logout'>Sign Out</a>
      </div>
    )
  }
}

export default Header;