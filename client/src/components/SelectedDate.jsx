import React from 'react';
import AddAppointment from './AddAppointment.jsx';

class SelectedDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addAppointment: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  timesOfDay() {
    const times = [12];
    for(let i = 1; i < 12; i++) {
      times.push(i);
    }
    const am = times.map((time, i) => {
      return <li key={i+1}>{`${time}:00 AM`}</li>;
    })
    const pm = times.map((time, i) => {
      return <li key={i*13}>{`${time}:00 PM`}</li>;
    })
    return [...am, ...pm];
  }

  handleClick() {
    this.setState({addAppointment: !this.state.addAppointment})
  }
  
  render() {
    if (this.props.isDateSelected) {
      return (
        <div>
          <button onClick={() => this.handleClick()}>Add Appointment</button>
          <h2>{this.props.month} {this.props.date}, {this.props.year}</h2>
          <ul>
            {this.timesOfDay()}
          </ul>
          <AddAppointment state={this.state.addAppointment}/>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default SelectedDate;