import React from 'react'; 
{/* <li key={i}>{`${i}:00`}</li> */}

class SelectedDay extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <div>
        <h2>{this.props.day}</h2>
        <ul>
          {this.timesOfDay()}
        </ul>
      </div>
    )

  }
}

export default SelectedDay;