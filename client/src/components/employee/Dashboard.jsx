import React from 'react';
import moment from 'moment';
import axios from 'axios';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appts: ''
    }
    this.getTodaysAppts = this.getTodaysAppts.bind(this);
    this.createServiceChart = this.createServiceChart.bind(this);
    this.createApptList = this.createApptList.bind(this);
  }

  componentDidMount() {
    this.getTodaysAppts();
  }

  getTodaysAppts() {
    const month = moment().format('MMMM');
    const date = moment().format('D');
    const year = moment().format('YYYY');
    const today = `${month}-${date}-${year}`;
    axios.get(`/schedule/${today}?status=approved`)
      .then((result) => {
        this.setState({
          appts: result.data[1]
        });
      })
      .catch((error) => {
        if (error.response.status === 302) {
          location.href = error.response.data.redirect;
        }
      });
  }

  createServiceChart() {
    const allServices = {
      'Women Haircut': true,
      'Men Haircut': true,
      'Girls Haircut': true,
      'Boys Haircut': true,
      'Women Color': true,
      'Men Color': true,
      'Highlights': true,
      'Balayage/Ombre': true,
      'Root Touch Up': true,
      'Regular Perm': true,
      'Digital Perm': true,
      'Straight Perm': true,
      'Shampoo and Blow Dry': true,
      'Treatment': true,
      'Up-do': true,
      'Women Shampoo': true,
      'Men Shampoo': true
    };

    // loop through today's appts and tally frequency of each service
    const servicesToday = {};
    let appts = this.state.appts;
    for (let i = 0; i < appts.length; i++) {
      let serviceArr = appts[i].hair_services.replace(/"|{|}|:true/g, '').split(',');
      for (let j = 0; j < serviceArr.length; j++) {
        servicesToday[serviceArr[j]] = servicesToday[serviceArr[j]] ? servicesToday[serviceArr[j]] + 1 : 1
      }
    }

    // create graph
    const serviceChart = [];
    for (let key in servicesToday) {
      let row = [
        <div className='bar-graph-content'>
          <div className='service-title'>{key}</div>
          <span>{servicesToday[key]}</span>
        </div>
      ];
      for (let i = 0; i < servicesToday[key]; i++) {
        row.push(<span className='bar-graph-count'></span>)
      }
      serviceChart.push(row);
    }
    return serviceChart;
  }

  createApptList() {
    const headers = ['Customer Name', 'Time', 'Services', 'Stylist', 'Notes', 'Price', 'Phone Number', 'Can you text this number?'];
    let columns = headers.map((header, i) => <span key={i} className='dashboard-appt-header'>{header}</span>);

    const apptList = [];
    for (let element of this.state.appts) {
      apptList.push(
        <div className='appt-grid'>
          <div>{element.customer_name}</div>
          <div>{element.appt_time}</div>
          <div className='hair-services-column'>{element.hair_services.replace(/"|{|}|:true/g, '')}</div>
          <div>{element.stylist}</div>
          <div>{element.notes}</div>
          <div>{element.price}</div>
          <div>{element.telephone}</div>
          <div>{element.textable}</div>
        </div>
      );
    }
    return (
      <div className='dashboard-appt-container'>
        <h2>Appointments</h2>
        <div className='appt-grid'>{columns}</div>
        {apptList}
      </div>
    );
  }

  render() {
    return (
      <div className='dashboard'>
        <h1 className='dashboard-date'>{moment().format('dddd, MMMM Do YYYY')}</h1>
        <div className='dashboard-flex'>
          <div className='bar-graph-container'>
            <h2>Services</h2>
            {this.createServiceChart()}
          </div>
          <div className='dashboard-appt-count-container'>
            <div className='dashboard-number-title'>Total appointments</div>
            <div className='dashboard-appt-count'>{this.state.appts.length}</div>
          </div>
        </div>
        {this.createApptList()}
      </div>
    );
  }
}

export default Dashboard;