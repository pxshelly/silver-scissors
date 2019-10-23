import React from 'react';
import ServiceList from './ServiceList.jsx';
import StylistList from './StylistList.jsx';

class AppointmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      stylist: '',
      service: '',
      date: '',
      time: '',
      phoneNumer: '',
      textable: '',
      notes: '',
      pictures: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  createFields() {
    const fieldData = [
      {
        label: 'Name',
        type: 'text',
        name: 'name',
        required: 'required',
        className: 'appointment-form'
      },
      {
        label: 'Preferred Stylist',
        name: 'stylist',
        className: 'services-appointment-dropdown'
      },
      {
        label: 'Service',
        name: 'service',
        className: 'services-appointment-dropdown'
      },
      {
        label: 'Date',
        type: 'date',
        name: 'date',
        pattern: '\d{4}-\d{2}-\d{2}',
        required: 'required',
        className: 'appointment-form'
      },
      {
        label: 'Time',
        type: 'time',
        name: 'time',
        min: '9:00',
        max: '19:00',
        pattern: '[0-9]{2}:[0-9]{2}',
        required: 'required',
        className: 'appointment-form'
      },
      {
        label: 'Phone Number',
        type: 'tel',
        name: 'phoneNumber',
        pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
        placeholder: 'XXX-XXX-XXXX',
        required: 'required',
        className: 'appointment-form'
      },
      {
        label: 'Can we text this number?',
        type: 'text',
        name: 'text',
        required: 'required',
        className: 'appointment-form'
      },
      {
        label: 'Notes',
        type: 'text',
        name: 'notes',
        placeholder: 'Additional information you would like us to know',
        className: 'appointment-form'
      },
      {
        label: 'Pictures',
        type: 'url',
        name: 'pictures',
        placeholder: 'Link to pictures for hairstyle reference',
        className: 'appointment-form'
      }
    ];
    
    const fields = fieldData.map((field, i) => {
      if (field.label === 'Service') {
        return (
          <div key={i}>
            <label>{field.label}</label>
            <select {...field} onChange={(e) => this.handleChange(e)}>
              <ServiceList />
            </select>
          </div>
        );
      } 
      if (field.label === 'Preferred Stylist') {
        return (
          <div key={i}>
            <label>{field.label}</label>
            <select {...field} onChange={(e) => this.handleChange(e)}>
              <StylistList />
            </select>
          </div>
        );
      } else {
        return (
          <div key={i}> 
            <label>{field.label}</label>
            <input {...field} onChange={(e) => {this.handleChange(e)}}></input>
          </div>
        );
      }
    });

    return fields;
  }

  render() {
    return (
      <form>
        {this.createFields()}
        <input type='submit' value='submit' className='appointment-form' onSubmit={() => this.handleSubmit()}></input>
      </form>
    );
  }
}

export default AppointmentForm;
