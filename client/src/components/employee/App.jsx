import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Routes from './Routes.jsx';
import Header from '../shared/Header.jsx';
import axios from 'axios';

class EmployeeApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }

  componentDidMount() {
    axios.get('/login-status')
      .then(({ data: { loggedIn } }) => this.setState({ loggedIn }))
      .catch(() => {
        this.setState({ loggedIn: false })
      });
  }

  linkRoutes() {
    const routes = {
      '/home': 'Home',
      '/calendar': 'Calendar',
      '/create-appointment': 'Create Appointment',
      '/pending-appointments': 'Pending Appointments'
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
        <Header />
        <Router>
          <nav className='employee-nav'>
            {this.linkRoutes()}
          </nav>
          <Routes loggedIn={this.state.loggedIn} />
        </Router>
      </div>
    );
  }
}

export default EmployeeApp;