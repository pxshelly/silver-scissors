import React from 'react';
import EmployeeAddAppointment from './EmployeeAddAppointment.jsx';

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createAppointment: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  timesOfDay() {
    const times = [12];

    for(let i = 1; i < 12; i++) {
      times.push(i);
    }

    const am = times.map((time, i) => {
      return <li className='times' key={i+1}>{`${time}:00 AM`}</li>;
    });

    const pm = times.map((time, i) => {
      return <li className='times' key={i*13}>{`${time}:00 PM`}</li>;
    });

    return [...am, ...pm];
  }

  handleClick() {
    this.setState({createAppointment: !this.state.createAppointment});
  }
  
  render() {
    if (this.props.dateSelected) {
      return (
        <div>
          <button className='create-appointment-button' onClick={() => this.handleClick()}>Create Appointment</button>
          <EmployeeAddAppointment state={this.state.createAppointment} />
          <h2 className='times-header'>{this.props.month} {this.props.date}, {this.props.year}</h2>
          <ul className='times-container'>
            {this.timesOfDay()}
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <button className='create-appointment-button' onClick={() => this.handleClick()}>Create Appointment</button>
          <EmployeeAddAppointment state={this.state.createAppointment} />
          <h2 className='times-header'>{this.props.date}</h2>
          <ul className='times-container'>
            {this.timesOfDay()}
          </ul>
        </div>
      );
    }
  }
}

export default Schedule;
