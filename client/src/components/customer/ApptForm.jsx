import React from 'react';
import ServiceMenu from '../shared/ServiceMenu.jsx';
import StylistMenu from '../shared/StylistMenu.jsx';
import axios from 'axios';

class ApptForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_name: '',
      stylist: 'No Preference',
      hair_services: {},
      appt_date: '',
      appt_time: '',
      email: '',
      telephone: '',
      textable: false,
      notes: '',
      pictures: '',
      price: 0,
      duration_hours: 0,
      duration_minutes: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const services = {
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

    const textable = {
      yes: true,
      no: true
    };

    let { id, value } = e.target;
    if (textable[id]) {
      id = 'textable';
    }
    if (services[id]) {
      let updatedHairServices = { ...this.state.hair_services };
      if (!this.state.hair_services[id]) {
        updatedHairServices[id] = true;
      } else {
        delete updatedHairServices[id];
      }
      id = 'hair_services';
      value = updatedHairServices;
    }
    this.setState({
      [id]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let textable;
    let radioButtons = document.getElementsByName('textable');
    for (let i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        textable = radioButtons[i].value;
      }
    }
    const data = {
      customer_name: this.state.customer_name || document.getElementById('customer_name').value,
      stylist: this.state.stylist || document.getElementById('stylist').value,
      hair_services: this.state.hair_services || document.getElementById('hair_services').value,
      appt_date: this.state.appt_date || document.getElementById('appt_date').value,
      appt_time: this.state.appt_time || document.getElementById('appt_time').value,
      email: this.state.email || document.getElementById('email').value,
      telephone: this.state.telephone || document.getElementById('telephone').value,
      textable: this.state.textable || textable,
      notes: this.state.notes || document.getElementById('notes').value,
      pictures: this.state.pictures || document.getElementById('pictures').value
    };
    if (this.props.editAppt) {
      const id = document.getElementsByClassName('edit-appt-button')[0].getAttribute('id');
      data.id = id;
      axios.put(`/appointments?status=approved`, data);
    } else {
      axios.post('/appointments?status=pending', data)
        .then(window.location = '/appointment-confirmation')
    }
  }

  createFields() {
    const formFields = [
      {
        legend: 'Contact Information',
        fields: [{
          text: 'First and Last Name',
          element: 'input',
          labelAttributes: {
            htmlFor: 'customer_name',
            className: 'appt-form-label'
          },
          elementAttributes: {
            type: 'text',
            id: 'customer_name',
            required: 'required',
            className: 'appt-form-input'
          }
        },
        {
          text: 'Email',
          element: 'input',
          labelAttributes: {
            htmlFor: 'email',
            className: 'appt-form-label'
          },
          elementAttributes: {
            type: 'email',
            id: 'email',
            name: 'email',
            className: 'appt-form-input'
          }
        },
        {
          text: 'Phone Number',
          element: 'input',
          labelAttributes: {
            htmlFor: 'telephone',
            className: 'appt-form-label'
          },
          elementAttributes: {
            type: 'tel',
            id: 'telephone',
            placeholder: 'xxx-xxx-xxxx',
            required: 'required',
            className: 'appt-form-telephone'
          }
        },
        {
          text: 'Can we text this number?',
          element: 'input',
          labelAttributes: {
            className: 'appt-form-label'
          },
          elementAttributes: {
            type: 'radio',
            name: 'textable',
            required: 'required',
            className: 'appt-form-radio'
          }
        }]
      },
      {
        legend: 'Appointment Information',
        fields: [{
          text: 'Select all services needed:',
          element: 'select',
          labelAttributes: {
            htmlFor: 'hair_services',
            className: 'appt-form-label'
          },
          elementAttributes: {
            id: 'hair_services',
            required: 'required',
            // className: 'appt-form-input'
          }
        },
        {
          text: 'Preferred Stylist',
          element: 'select',
          labelAttributes: {
            htmlFor: 'stylist',
            className: 'appt-form-label'
          },
          elementAttributes: {
            id: 'stylist',
            required: 'required',
            className: 'services-appt-dropdown appt-form-input'
          }
        },
        {
          text: 'Date',
          element: 'input',
          labelAttributes: {
            htmlFor: 'appt_date',
            className: 'appt-form-label'
          },
          elementAttributes: {
            type: 'date',
            id: 'appt_date',
            pattern: '\d{4}-\d{2}-\d{2}',
            required: 'required',
            className: 'appt-form-date-time'
          }
        },
        {
          text: 'Time',
          element: 'input',
          labelAttributes: {
            htmlFor: 'time',
            className: 'appt-form-label'
          },
          elementAttributes: {
            type: 'time',
            id: 'appt_time',
            min: '09:00',
            max: '19:00',
            step: '600',
            pattern: '[0-9]{2}:[0-9]{2}',
            required: 'required',
            className: 'appt-form-date-time'
          }
        }
        ]
      },
      {
        legend: 'Additonal Information',
        fields: [{
          text: 'Notes',
          element: 'input',
          labelAttributes: {
            htmlFor: 'notes',
            className: 'appt-form-label'
          },
          elementAttributes: {
            type: 'text',
            id: 'notes',
            placeholder: 'Additional information you would like us to know',
            className: 'appt-form-input'
          }
        },
        {
          text: 'Pictures',
          element: 'input',
          labelAttributes: {
            htmlFor: 'pictures',
            className: 'appt-form-label'
          },
          elementAttributes: {
            type: 'file',
            id: 'pictures',
            placeholder: 'Link to pictures for hairstyle reference',
            className: 'appt-form-input',
          }
        }]
      }
    ];

    const fields = formFields.map((field, i) => {
      return (
        <fieldset key={i}>
          <h3>{field.legend}</h3>
          {field.fields.map((element, i) => {
            if (element.elementAttributes.name === 'textable') {
              return (
                <div className='appt-form-field' key={i}>
                  <label {...element.labelAttributes}>{element.text}</label>
                  <label className='textable-options-label' htmlFor='yes'>Yes</label>
                  <input {...element.elementAttributes} id='yes' value='true' />
                  <label className='textable-options-label' htmlFor='no'>No</label>
                  <input {...element.elementAttributes} id='no' value='false' />
                </div>
              );
            }
            if (element.element === 'input') {
              return (
                <div className='appt-form-field' key={i}>
                  <label {...element.labelAttributes}>{element.text}</label>
                  <input {...element.elementAttributes} />
                </div>
              );
            }
            if (element.elementAttributes.id === 'stylist') {
              return (
                <div className='appt-form-field' key={i}>
                  <label {...element.labelAttributes}>{element.text}</label>
                  <select {...element.elementAttributes}>
                    <StylistMenu />
                  </select>
                </div>
              );
            }
            if (element.elementAttributes.id === 'hair_services') {
              return (
                <div className='appt-form-field' key={i}>
                  <label {...element.labelAttributes}>{element.text}</label>
                  <ServiceMenu />
                </div>
              );
            }
          })}
        </fieldset>
      );
    })
    return fields;
  }

  render() {
    return (
      <div className='appt-form-container' >
        <img src='https://silver-scissors.s3-us-west-1.amazonaws.com/IMG_6031.jpg' />
        <form onSubmit={(e) => this.handleSubmit(e)} className='appt-form' onChange={(e) => this.handleChange(e)}>
          {this.createFields()}
          <button className='appt-form-submit-button'>Submit</button>
        </form>
      </div >
    );
  }
}


export default ApptForm;
