import React from 'react';
import axios from 'axios';
import EditAppt from './EditAppt.jsx';
import moment from 'moment';

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: false,
      apptDetails: false,
      appts: [],
      editAppt: false,
      error: ''
    };
    this.getApptDetails = this.getApptDetails.bind(this);
    this.editAppt = this.editAppt.bind(this);
    this.loadApptDetails = this.loadApptDetails.bind(this);
    this.closeApptDetailsModal = this.closeApptDetailsModal.bind(this);
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

  loadApptDetails() {
    let { customer_name, stylist, hair_services, appt_date, appt_time, email, telephone, textable, notes, pictures, id, price, duration_hours, duration_minutes } = this.state.apptDetails;
    if (textable === 'true') {
      textable = 'Yes';
    } else {
      textable = 'No';
    }

    telephone = telephone.split('');
    telephone.splice(3, 0, '-');
    telephone.splice(7, 0, '-');
    telephone = telephone.join('');

    if (!price) {
      price = ''; 
    }

    const details = {
      'Customer': customer_name,
      'Service': hair_services.replace(/\\|"|{|}|:true/g, '').split(',').join(', '),
      'Stylist': stylist,
      'Date': moment(appt_date).format('LL'),
      'Time': appt_time,
      'Email': email,
      'Telephone': telephone,
      'Can we text this number?': textable,
      'Notes': notes,
      'Pictures': pictures,
      'Price': price,
      'Hours': duration_hours,
      'Minutes': duration_minutes
    }

    const tableRows = [];
    for (const key in details) {
      tableRows.push(
        <tr key={key}>
          <td className='edit-appt-modal-td'>{key}</td>
          <td>{details[key]}</td>
        </tr>
      );
    }

    return tableRows;
  }

  closeApptDetailsModal() {
    this.setState({
      apptDetails: false
    });
  }

  editAppt() {
    this.setState({ editAppt: !this.state.editAppt });
  }

  deleteAppt() {
    const confirmation = confirm('Are you sure you want to delete this appointment?');
    if (confirmation) {
      axios.put(`/appointments?status=deleted`, props.apptDetails);
    }
  }

  render() {
    if (this.state.apptDetails) {
      return (
        <div>
          <div className='modal'>
            <div className='edit-appt-modal'>
              <div className='close-modal-button'>
                <button onClick={this.closeApptDetailsModal}>&#x2715;</button>
              </div>
              <table className='edit-appt-modal-table'>
                <tbody>
                  {this.loadApptDetails()}
                </tbody>
              </table>
              <div className='center edit-appt-modal-buttons'>
                <button id={this.state.apptDetails.id} className='button edit-appt-button' onClick={this.editAppt}>Edit Appointment</button>
                <button id={this.state.apptDetails.id} className='button delete-appt-button' onClick={this.deleteAppt}>Delete Appointment</button>
              </div>
            </div>
          </div>
          <div>
            <div className='today-info'>
              <div>Today's Appointments: {this.state.appts.length} {this.renderAppts()}</div>
              <h2 className='times-header'>{this.props.selectedMonth} {this.props.date}, {this.props.selectedYear}</h2>
            </div>
            <div className='times-container'>
              {this.loadSchedule()}
            </div>
            <EditAppt editState={this.state.editAppt} apptDetails={this.state.apptDetails} />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className='today-info'>
            <div>Today's Appointments: {this.state.appts.length} {this.renderAppts()}</div>
            <h2 className='times-header'>{this.props.selectedMonth} {this.props.date}, {this.props.selectedYear}</h2>
          </div>
          <div className='times-container'>
            {this.loadSchedule()}
          </div>
        </div>
      );
    }
  }
}

export default Schedule;
