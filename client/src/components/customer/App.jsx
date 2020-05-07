import React from 'react';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom'
import Routes from './Routes.jsx';

class CustomerApp extends React.Component {
  constructor(props) {
    super(props);
  }

  linkRoutes() {
    const routes = {
      '/services': 'Services',
      '/request-appointment': 'Request an Appointment',
      '/visit-us': 'Visit Us'
    };

    const linkTags = [];
    for (let key in routes) {
      linkTags.push(<Link to={key} key={key}>{routes[key]}</Link>)
    };

    return linkTags;
  }

  render() {
    return (
      <div>
        <Router>
          <div className='nav-container'>
            <nav>
              <a href='/'>silver scissors</a>
              {this.linkRoutes()}
            </nav>
          </div>
          <Routes />
        </Router>
      </div>
    );
  }
}

export default CustomerApp;