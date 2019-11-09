import React from 'react';
import axios from 'axios';
import UpcomingAppts from './UpcomingAppts.jsx';
import PendingAppts from './PendingAppts.jsx';
import PastAppts from './PastAppts.jsx';

class ApptPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appts: [],
      pendingAppts: [],
      error: ''
    }
  }

  componentDidMount() {
    let customer_id = 2;
    axios.get(`/appointments/${customer_id}`)
      .then((result) => this.setState({appts: result.data}))
      .catch((error) => this.setState({error: error}));
  }

  render() {
    return (
      <div>
        <UpcomingAppts appts={this.state.appts}/>
        <PendingAppts appts={this.state.pendingAppts}/>
        <PastAppts appts={this.state.appts}/>
      </div>
    );   
  }
}

export default ApptPage;