import React from 'react';
import axios from 'axios';
// import UpcomingAppts from './UpcomingAppts.jsx';
import PendingAppts from './PendingAppts.jsx';
import PastAppts from './PastAppts.jsx';

class ApptPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appts: []
    }
  }

  componentDidMount() {
    // let user_id = 2;
    axios.get(`/appointments?user_id=${user_id}`)
      .then((result) => this.setState({appts: result.data}))
      .catch((error) => {
        if (error.response.status === 302) {
          location.href = error.response.data.redirect;
        }
      });;
  }

  render() {
    return (
      <div>
        <UpcomingAppts appts={this.state.appts} />
        <PendingAppts appts={this.state.pendingAppts} />
        <PastAppts appts={this.state.appts} />
      </div>
    );   
  }
}

export default ApptPage;