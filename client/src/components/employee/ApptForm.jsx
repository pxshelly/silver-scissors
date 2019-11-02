import React from 'react';
import ServiceMenu from './ServiceMenu.jsx';
import StylistMenu from './StylistMenu.jsx';
import axios from 'axios';

class ApptForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_name: '',
      stylist: 'No Preference',
      hair_service: 'Women Full Color',
      appt_date: '',
      appt_time: '',
      telephone: '',
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
    axios.post('/appointment', [
      this.state.customer_name || document.getElementsByName('customer_name')[0].value,
      this.state.stylist || document.getElementsByName('stylist')[0].value,
      this.state.hair_service || document.getElementsByName('service')[0].value,
      this.state.appt_date || document.getElementsByName('appt_date')[0].value,
      this.state.appt_time || document.getElementsByName('appt_time')[0].value,
      this.state.telephone || document.getElementsByName('telephone')[0].value,
      this.state.textable || document.getElementsByName('textable')[0].value,
      this.state.notes || document.getElementsByName('notes')[0].value,
      this.state.pictures || document.getElementsByName('pictures')[0].value
    ])
    .catch((error) => console.log(error));
  }

  createFields() {
    const fieldData = [
      {
        label: 'Name',
        type: 'text',
        name: 'customer_name',
        required: 'required',
        className: 'appt-form'
      },
      {
        label: 'Preferred Stylist',
        name: 'stylist',
        className: 'services-appt-dropdown'
      },
      {
        label: 'Service',
        name: 'hair_service',
        className: 'services-appt-dropdown'
      },
      {
        label: 'Date',
        type: 'date',
        name: 'appt_date',
        pattern: '\d{4}-\d{2}-\d{2}',
        required: 'required',
        className: 'appt-form'
      },
      {
        label: 'Time',
        type: 'time',
        name: 'appt_time',
        min: '09:00',
        max: '19:00',
        pattern: '[0-9]{2}:[0-9]{2}',
        required: 'required',
        className: 'appt-form'
      },
      {
        label: 'Phone Number',
        type: 'tel',
        name: 'telephone',
        pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
        placeholder: 'XXX-XXX-XXXX',
        required: 'required',
        className: 'appt-form'
      },
      {
        label: 'Can we text this number?',
        type: 'text',
        name: 'textable',
        required: 'required',
        className: 'appt-form'
      },
      {
        label: 'Notes',
        type: 'text',
        name: 'notes',
        placeholder: 'Additional information you would like us to know',
        className: 'appt-form'
      },
      {
        label: 'Pictures',
        type: 'url',
        name: 'pictures',
        placeholder: 'Link to pictures for hairstyle reference',
        className: 'appt-form'
      }
    ];
    
    const fields = fieldData.map((field, i) => {
      if (field.label === 'Service') {
        return (
          <div key={i}>
            <label>{field.label}</label>
            <select {...field} onChange={(e) => this.handleChange(e)}>
              <ServiceMenu />
            </select>
          </div>
        );
      } 
      if (field.label === 'Preferred Stylist') {
        return (
          <div key={i}>
            <label>{field.label}</label>
            <select {...field} onChange={(e) => this.handleChange(e)}>
              <StylistMenu />
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
      <form onSubmit={(e) => this.handleSubmit(e)}>
        {this.createFields()}
        <button className='appt-form'>Submit</button>
      </form>
    );
  }
}

export default ApptForm;
