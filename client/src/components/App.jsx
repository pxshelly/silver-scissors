import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Routes from './Routes.jsx';
import Header from './Header.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
          <Header />
          <nav>
            <ul>
              <li>
                <Link to='/services'>Services</Link>
              </li>
              <li>
                <Link to='/calendar'>Calendar</Link>
              </li>
              <li>
                <Link to='/visitus'>Visit Us</Link>
              </li>
              <li>
                <Link to='/appointments'>Request an Appointment</Link>
              </li>
            </ul>
            <Routes />
          </nav>
      </Router>
    );
  }
}

export default App;