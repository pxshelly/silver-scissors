import React from 'react';
import moment from 'moment';
import SelectedDate from './SelectedDate.jsx';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonthAndYear: moment().format('MMMM YYYY'),
      selectMonth: false,
      currentMonth: moment().month()+1,
      firstDayOfMonth: moment().startOf('month').format('d'),
      daysInMonth: moment().daysInMonth(),
      counter: 0,
      isDateSelected: false,
      selectedDate: 'Select a date'
    };
    // this.selectMonth = this.selectMonth.bind(this);
    this.loadCalendar = this.loadCalendar.bind(this);
    this.lastMonth = this.lastMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.selectedDate = this.selectedDate.bind(this);
  }

  getWeekdays() {
     const weekdays = moment.weekdays().map((day, i) => {
      return <td key={i}>{day}</td>;
    })
    return weekdays;
  }
  
  lastMonth() {
    this.setState({
      counter: this.state.counter++,
      currentMonth: this.state.currentMonth--,
      currentMonthAndYear: moment().subtract(this.state.counter, 'month').format('MMMM YYYY'),
      firstDayOfMonth: moment().subtract(this.state.counter, 'month').startOf('month').format('d'),
      daysInMonth: moment().subtract(this.state.counter, 'month').daysInMonth()
    })
    this.loadCalendar();
  }

  nextMonth() {
    this.setState({
      counter: this.state.counter++,
      currentMonth: this.state.currentMonth++,
      currentMonthAndYear: moment().add(this.state.counter, 'month').format('MMMM YYYY'),
      firstDayOfMonth: moment().add(this.state.counter, 'month').startOf('month').format('d'),
      daysInMonth: moment().add(this.state.counter, 'month').daysInMonth()
    })
    this.loadCalendar();
  }

  selectedDate(e) {
    this.setState({
      isDateSelected: true,
      selectedDate: e.target.innerText})
  }

  loadCalendar() {
    // determine which day the first of the month falls in and how many blank spaces to leave in calendar
    const blanks = [];
    for (let i = 0; i < this.state.firstDayOfMonth; i++) {
      blanks.push(<td key={i*1000}></td>)
    }

    // create td tags for each day in month
    const allDays = []
    for (let i = 1; i <= this.state.daysInMonth; i++) {
      allDays.push(<td key={i} onClick={(e) => this.selectedDate(e)}><span>{i}</span></td>)
    }

    // combine blank spaces with number of days and create rows for each week
    const totalCells = [...blanks, ...allDays];
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

    return weeks;
  }

  // selectMonth() {
  //   this.setState({selectMonth: !this.state.selectMonth});
  //   const months = moment.months().map((month) => {
  //     return <div key={month}>{month}</div>
  //   })
  //   console.log(months);
  //   if (this.state.selectMonth) {
  //     return (
  //       <div>
  //         {months}
  //       </div>
  //     )
  //   }
  // }

  render() {
    return (
      <div className='calendar-container'>
        <table>
          <thead>
            <tr>
              <th>{this.state.currentYear}</th>
            </tr>
            <tr>
              <td onClick={() => this.lastMonth()}>Last Month</td>
              <th onClick={() => this.selectMonth()}>{this.state.currentMonthAndYear}</th>
              <td onClick={() => this.nextMonth()}>Next Month</td>
            </tr>
            <tr>{this.getWeekdays()}</tr>
          </thead>
          <tbody>{this.loadCalendar()}</tbody>
        </table>
        <SelectedDate date={this.state.selectedDate} isDateSelected={this.state.isDateSelected}/>
      </div>
    )
  }
}

export default Calendar;