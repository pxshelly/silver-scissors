import React from 'react';
import moment from 'moment';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: moment().format('MMMM'),
      today: moment().date(),
      currentYear: moment().year()
    };
  }

  firstDayOfMonth() {
    return moment().startOf('month').format('d');
  }

  render() {
    // create td tags for each weekday
    const weekdays = moment.weekdays().map((day, i) => {
      return <td key={i}>{day}</td>;
    })

    // determine which day the first of the month falls in and how many blank spaces to leave in calendar
    const blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td key={i*1000}></td>)
    }

    // create td tags for each day in month
    const allDays = []
    const days = moment().daysInMonth();
    for (let i = 1; i <= days; i++) {
      allDays.push(<td key={i}><span>{i}</span></td>)
    }

    // combine blank spaces with number of days and create rows for each week
    const totalCells = [...blanks, ...allDays];
    console.log(totalCells);
    const calendarRows = [];
    let calendarCells = [];
    totalCells.forEach((day, i) => {
      if (i % 7 !== 0 ) {
        calendarCells.push(day);
      } else {
        calendarRows.push(calendarCells.slice());
        calendarCells = [];
        calendarCells.push(day);
      }
      if (i === totalCells.length - 1) {
        calendarRows.push(calendarCells.slice());
      }
    })

    // create <td> tag for each row with random key
    const weeks = calendarRows.map((week, i) => {
      return <tr key={i*100}>{week}</tr>
    }); 

    return (
      <div className='calendar-container'>
        <table>
          <thead>
            <tr>
              <th>{this.state.currentYear}</th>
              <th>{this.state.currentMonth}</th>
            </tr>
            <tr>{weekdays}</tr>
          </thead>
          <tbody>{weeks}</tbody>
        </table>
      </div>
    )
  }
}

export default Calendar;