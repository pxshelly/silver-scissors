import React from 'react';
import axios from 'axios';
import moment from 'moment';
import EmployeeAddAppointment from './EmployeeAddAppointment.jsx';
import AppointmentDetails from './AppointmentDetails.jsx';

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createAppointment: false,
      appointments: [],
      appointmentDetails: false,
      error: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.getAppointmentDetails = this.getAppointmentDetails.bind(this);
  }

  handleClick() {
    this.setState({ createAppointment: !this.state.createAppointment });
  }

  // create each hour in a day
  timesOfDay() {
    const times = [12];

    for (let i = 1; i < 12; i++) {
      times.push(i);
    }

    const am = times.map((time, i) => {
      return `${time}:00 AM`;
    });

    const pm = times.map((time, i) => {
      return `${time}:00 PM`;
    });

    return [...am, ...pm];
  }

  loadSchedule() {
    const times = this.timesOfDay();
    const schedule = [];
    const appointments = this.state.appointments;

    // sort appointments by time
    for (let i = 0; i < times.length; i++) {
      schedule.push(<div className='times'>{times[i]}</div>);

      for (let j = 0; j < appointments.length; j++) {
        let current = appointments[j];
        let time = moment(current.appt_time, 'HH:mm:ss').format('hh:mm A');

        if (current.appt_time.slice(0, 2) == i && time.slice(-3) === times[i].slice(-3)) {
          if (time[0] === '0') {
            schedule.push(
              <div className='appointments' id={current.appointment_id} onClick={(e) => this.getAppointmentDetails(e)}>{time.slice(1)} {current.customer_name}</div>
            );
          } else {
            schedule.push(
              <div className='appointments' id={current.appointment_id} onClick={(e) => this.getAppointmentDetails(e)}>{time} {current.customer_name}</div>
            );
          }
        }
      }
    }

    return schedule;
  }

  renderAppointments() {
    const appointments = this.state.appointments.map((appointment, i) => {
      return (
        <div key={i}>{appointment.customer_name}</div>
      );
    });

    return appointments;
  }

  getAppointments() {
    const date = `${this.props.selectedMonth}-${this.props.date}-${this.props.selectedYear}`
    axios.get(`/schedule/${date}`)
      .then((result) => this.setState({appointments: result.data.result}))
      .catch((error) => this.setState({error: error}));
  }

  componentDidMount() {
    this.getAppointments();
  }

  componentDidUpdate(prevProps) {
    const newDate = `${this.props.selectedMonth}-${this.props.date}-${this.props.selectedYear}`;
    const previousDate = `${prevProps.selectedMonth}-${prevProps.date}-${prevProps.selectedYear}`;
    if (newDate !== previousDate) {
      this.getAppointments();
    }
  }

  getAppointmentDetails(e) {
    const id = e.target.getAttribute('id');
    axios.get(`/schedule/appointments/${id}`)
      .then((result) => this.setState({appointmentDetails: result.data[0]}))
      .catch((error) => this.setState({error: error}));
  }

  render() {
    return (
      <div>
        <button className='create-appointment-button' onClick={() => this.handleClick()}>Create Appointment</button>
        <EmployeeAddAppointment state={this.state.createAppointment} />
        <h2 className='times-header'>{this.props.selectedMonth} {this.props.date}, {this.props.selectedYear}</h2>
        <div>Appointments: {this.renderAppointments()}</div>
        <AppointmentDetails appointmentDetails={this.state.appointmentDetails} />
        <div className='times-container'>
          {this.loadSchedule()}
        </div>
      </div>
    );
  }
}

export default Schedule;
