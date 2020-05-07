import React from 'react';
import moment from 'moment';
import axios from 'axios';
import EditAppt from './EditAppt.jsx';

class PendingAppts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingAppts: [],
      editAppt: false,
      apptDetails: false,
      error: ''
    };
    this.approveAppt = this.approveAppt.bind(this);
    this.denyAppt = this.denyAppt.bind(this);
    this.editAppt = this.editAppt.bind(this);
    this.autofill = this.autofill.bind(this);
  }

  componentDidMount() {
    axios.get('appointments?status=pending')
      .then(result => this.setState({ pendingAppts: result.data }))
      .catch(error => this.setState({ error: error }));
  }

  approveAppt(index) {
    axios.put('/appointments?status=approved', this.state.pendingAppts[index]);
  }

  denyAppt(index) {
    axios.put('/appointments?status=denied', this.state.pendingAppts[index]);
  }

  autofill() {
    setTimeout(() => {
      const details = this.state.apptDetails;
      for (const key in details) {
        if (details[key] === null) {
          continue;
        }
        if (key === 'id' || key === 'user_id' || key === 'appt_status') {
          continue;
        }
        if (key === 'appt_date') {
          details[key] = moment(details[key]).format('YYYY-MM-DD');
        }
        if (key === 'appt_time') {
          details[key] = moment(details[key], 'h:mm A').format('HH:mm:ss');
        }
        if (key === 'telephone') {
          let telephone = details[key].toString().split('');
          telephone.splice(3, 0, '-');
          telephone.splice(7, 0, '-');
          details[key] = telephone.join('');
        }
        if (key === 'textable') {
          if (details[key] === 'true') {
            document.getElementById('yes').checked = true;
            continue;
          } else {
            document.getElementById('no').checked = true;
            continue;
          }
        }
        document.getElementById(key).value = details[key];
      }
    }, 10)
  }

  editAppt(index) {
    this.setState({
      editAppt: !this.state.editAppt,
      apptDetails: this.state.pendingAppts[index]
    }, this.autofill);
  }

  displayHeaders() {
    const headers = ['Date', 'Customer Name', 'Time', 'Service', 'Stylist', 'Notes', 'Pictures', 'Approve/Deny'];
    return headers.map((header, i) => <span key={i} className='pending-appts-header'>{header}</span>);
  }

  renderAppts() {
    return this.state.pendingAppts.map((appt, i) => {
      return (
        <li key={i} className='pending-appts'>
          <span>{moment(appt.appt_date).format('l')}</span>
          <span>{appt.customer_name}</span>
          <span>{moment(appt.appt_time, 'HH:mm:ss').format('h:mm A')}</span>
          <span>{appt.hair_services}</span>
          <span>{appt.stylist}</span>
          <span>{appt.notes}</span>
          <span>
            {appt.pictures ? <img src={appt.pictures} /> : ''}
          </span>
          <button onClick={() => this.editAppt(i)}>Edit</button>
          <button onClick={() => this.approveAppt(i)}>&#x2713;</button>
          <button onClick={() => this.denyAppt(i)} className='deny-button'>&#x2715;</button>
        </li>
      );
    });
  }

  render() {
    return (
      <div className='pending-appts-container'>
        <h1>Pending Appointments</h1>
        <div className='pending-appts-header'> {this.displayHeaders()}</div>
        <ul>
          {this.state.pendingAppts.length === 0 ? <p>There are no pending appointments</p> : this.renderAppts()}
        </ul>
        <EditAppt editState={this.state.editAppt} />
        {/* <ApptDetails apptDetails={this.state.apptDetails} editAppt={this.editAppt} /> */}
      </div>
    );

  }
};

export default PendingAppts;