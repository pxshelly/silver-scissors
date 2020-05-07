import React from 'react';
import axios from 'axios';
import EditAppt from './EditAppt.jsx';
import ApptDetails from './ApptDetails.jsx';

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: false,
      apptDetails: false,
      appts: [],
      editAppt: false,
      error: ''
    }
    this.getApptDetails = this.getApptDetails.bind(this);
    this.editAppt = this.editAppt.bind(this);
  }

  loadSchedule() {
    const schedule = [];
    for (let key in this.state.schedule) {
      let id;
      if (key === '9:00 AM') {
        id = 'startOfDay';
      }
      schedule.push(<div key={key} id={id} className='times'>{key}</div>);

      this.state.schedule[key].forEach((appt, i) => {
        schedule.push(
          <div
            key={appt.id}
            className='times appt'
            id={appt.id}
            onClick={(e) => { this.getApptDetails(e) }}
          >
            {appt.appt_time} {appt.customer_name}
          </div>
        );
      });
    }

    return schedule;
  }

  renderAppts() {
    return this.state.appts.map((appt, i) => {
      return (
        <div key={i}>{appt.customer_name}</div>
      );
    });
  }

  getAppts() {
    const date = `${this.props.selectedMonth}-${this.props.date}-${this.props.selectedYear}`;
    axios.get(`/schedule/${date}?status=approved`)
      .then((result) => {
        this.setState({
          schedule: result.data[0],
          appts: result.data[1]
        });
      })
      .catch((error) => {
        if (error.response.status === 302) {
          location.href = error.response.data.redirect;
        }
      });
  }

  componentDidMount() {
    this.getAppts();
  }

  componentDidUpdate(prevProps) {
    const times = document.getElementsByClassName('times-container')[0];
    const nineAM = document.getElementById('startOfDay');
    if (times && nineAM) {
      times.scroll({ top: 0, left: 0 });
      const timesRect = times.getBoundingClientRect();
      const nineAMRect = document.getElementById('startOfDay').getBoundingClientRect();
      times.scroll({ top: nineAMRect.top - timesRect.top, left: 0 });
    }

    const newDate = `${this.props.selectedMonth}-${this.props.date}-${this.props.selectedYear}`;
    const previousDate = `${prevProps.selectedMonth}-${prevProps.date}-${prevProps.selectedYear}`;
    if (newDate !== previousDate) {
      this.getAppts();
    }
  }

  getApptDetails(e) {
    const id = e.target.getAttribute('id');
    axios.get(`/appointments?details=${id}`)
      .then((result) => this.setState({ apptDetails: result.data[0] }))
      .catch((error) => this.setState({ error: error }));
  }

  editAppt() {
    this.setState({ editAppt: !this.state.editAppt });
  }

  render() {
    return (
      <div>
        <div>Today's Appointments: {this.state.appts.length} {this.renderAppts()}</div>
        <h2 className='times-header'>{this.props.selectedMonth} {this.props.date}, {this.props.selectedYear}</h2>
        <div className='times-container'>
          {this.loadSchedule()}
        </div>
        <EditAppt editState={this.state.editAppt} />
        <ApptDetails apptDetails={this.state.apptDetails} editAppt={this.editAppt} />
      </div>
    );
  }
}

export default Schedule;
