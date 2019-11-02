import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Routes from './Routes.jsx';
import Header from '../shared/Header.jsx';

class EmployeeApp extends React.Component {
  constructor(props) {
    super(props);
  }

  linkRoutes() {
    const routes = {
      '/calendar': 'Calendar',
      '/create-appointment' : 'Create Appointment',
    };
    
    const linkTags = [];
    for (let key in routes) {
      linkTags.push(<Link to={key} key={key} className='nav-links'>{routes[key]}</Link>)
    };

    return linkTags;
  }

  render() {
    return (
      <Router>
          <Header />
          <nav>
            <ul>
              {this.linkRoutes()}
            </ul>
            <Routes />
          </nav>
      </Router>
    );
  }
}

export default EmployeeApp;