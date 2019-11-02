import React from 'react';
import axios from 'axios';
import AddAppt from './AddAppt.jsx';
import ApptDetails from './ApptDetails.jsx';

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createAppt: false,
      schedule: false,
      apptDetails: false,
      appts: [],
      editAppt: false,
      error: ''
    }
    this.createAppt = this.createAppt.bind(this);
    this.getApptDetails = this.getApptDetails.bind(this);
    this.editAppt = this.editAppt.bind(this); 
  }

  createAppt() {
    this.setState({createAppt: !this.state.createAppt});
  }

  loadSchedule() {
    const schedule = [];
    for (let key in this.state.schedule) {
      schedule.push(<div key={key} className = 'times'>{key}</div>);

      this.state.schedule[key].forEach((appt, i) => {
        schedule.push(
          <div 
            key={appt.appt_id} 
            className = 'times appt' 
            id={appt.appt_id} 
            onClick={(e) => {this.getApptDetails(e)}}
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
    const date = `${this.props.selectedMonth}-${this.props.date}-${this.props.selectedYear}`
    axios.get(`/schedule/${date}`)
      .then((result) => {
        this.setState({
          schedule: result.data[0],
          appts: result.data[1]
        });
      })
      .catch((error) => this.setState({ error: error }));
  }

  componentDidMount() {
    this.getAppts();
  }

  componentDidUpdate(prevProps) {
    const newDate = `${this.props.selectedMonth}-${this.props.date}-${this.props.selectedYear}`;
    const previousDate = `${prevProps.selectedMonth}-${prevProps.date}-${prevProps.selectedYear}`;
    if (newDate !== previousDate) {
      this.getAppts();
    }
  }

  getApptDetails(e) {
    const id = e.target.getAttribute('id');
    axios.get(`/appointment/${id}`)
      .then((result) => this.setState({apptDetails: result.data[0]}))
      .catch((error) => this.setState({error: error}));
  }

  editAppt() {
    this.setState({editAppt: !this.state.editAppt});
  }

  render() {
    return (
      <div>
        <button className='create-appt-button' onClick={() => this.createAppt()}>Create Appointment</button>
        <AddAppt 
          createAppt={this.state.createAppt}
          editState={this.state.editAppt}
        />
        <h2 className='times-header'>{this.props.selectedMonth} {this.props.date}, {this.props.selectedYear}</h2>
        <div>Appointments: {this.renderAppts()}</div>
        <ApptDetails 
          apptDetails={this.state.apptDetails}
          createAppt={this.state.createAppt}
          autofill={this.autofill}
          editAppt={this.editAppt}
        />
        <div className='times-container'>
          {this.loadSchedule()}
        </div>
      </div>
    );
  }
}

export default Schedule;
