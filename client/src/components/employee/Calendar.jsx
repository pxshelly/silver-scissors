import React from 'react';
import moment from 'moment';
import Schedule from './Schedule.jsx';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: moment().year(),
      month: moment().format('MMMM'),
      firstDayOfMonth: moment().startOf('month').format('d'),
      daysInMonth: moment().daysInMonth(),
      monthDifference: 0,
      yearDifference: 0,
      date: moment().format('D'),
      selectedMonth: moment().format('MMMM'),
      selectedYear: moment().year()
    };
    this.loadCalendar = this.loadCalendar.bind(this);
    this.lastMonth = this.lastMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.updateState = this.updateState.bind(this);
    this.selectDate = this.selectDate.bind(this);
  }

  getWeekdays() {
    const weekdays = moment.weekdaysShort().map((day, i) => {
      return <td key={i}>{day}</td>;
    });

    return weekdays;
  }

  updateState() {
    this.setState({
      month: moment().add(this.state.monthDifference, 'month').format('MMMM'),
      firstDayOfMonth: moment().add(this.state.monthDifference, 'month').startOf('month').format('d'),
      daysInMonth: moment().add(this.state.monthDifference, 'month').daysInMonth()
    });
  }

  lastMonth() {
    // determine if year needs to be updated also    
    if (this.state.month === 'January' && this.state.monthDifference < 0 || this.state.month === 'January' && this.state.yearDifference > 0) {
      this.setState({
        yearDifference: this.state.yearDifference -= 1,
        year: moment().add(this.state.yearDifference, 'years').format('YYYY')
      });
    }
    // update month
    this.setState({ monthDifference: this.state.monthDifference -= 1 });
    this.updateState();
  }

  nextMonth() {
    // determine if year needs to be updated also
    if (this.state.month === 'December' && this.state.monthDifference > 0 || this.state.month === 'December' && this.state.yearDifference < 0) {
      this.setState({
        yearDifference: this.state.yearDifference += 1,
        year: moment().add(this.state.yearDifference, 'years').format('YYYY')
      });
    }
    // update month
    this.setState({ monthDifference: this.state.monthDifference += 1 });
    this.updateState();
  }

  loadCalendar() {
    // determine which day the first of the month falls in and how many blank spaces to leave in calendar
    const blanks = [];
    for (let i = 0; i < this.state.firstDayOfMonth; i++) {
      blanks.push(<td key={i * 1000}></td>);
    }

    // create td tags for each day in month
    const allDays = [];
    for (let i = 1; i <= this.state.daysInMonth; i++) {
      allDays.push(<td key={i} className='calendar-day pointer-cursor' onClick={(e) => this.selectDate(e)}><span>{i}</span></td>);
    }

    // combine blank spaces with number of days and create rows for each week
    const totalCells = [...blanks, ...allDays];
    const calendarRows = [];
    let calendarCells = [];

    totalCells.forEach((day, i) => {
      if (i % 7 !== 0) {
        calendarCells.push(day);
      } else {
        calendarRows.push(calendarCells.slice());
        calendarCells = [];
        calendarCells.push(day);
      }
      if (i === totalCells.length - 1) {
        calendarRows.push(calendarCells.slice());
      }
    });

    // create <td> tag for each row with random key
    const weeks = calendarRows.map((week, i) => {
      return <tr key={i * 100}>{week}</tr>;
    });

    return weeks;
  }

  selectDate(e) {
    this.setState({
      date: e.target.innerText,
      selectedMonth: this.state.month,
      selectedYear: this.state.year
    });
  }

  render() {
    return (
      <div>
        <div className='calendar-container'>
          <div className='calendar-year bold'>{this.state.year}</div>
          <div className='calendar-header'>
            <span className='calendar-header-contents pointer-cursor' onClick={this.lastMonth}>{'<'}</span>
            <span className='calendar-header-contents bold'>{this.state.month}</span>
            <span className='calendar-header-contents pointer-cursor' onClick={this.nextMonth}>{'>'}</span>
          </div>
          <div>
            <table className='calendar-table'>
              <tbody>
                <tr>{this.getWeekdays()}</tr>
                {this.loadCalendar()}
              </tbody>
            </table>
          </div>
        </div>
        <Schedule
          date={this.state.date}
          year={this.state.year}
          month={this.state.month}
          selectedMonth={this.state.selectedMonth}
          selectedYear={this.state.selectedYear}
        />
      </div>
    );
  }
}

export default Calendar;
