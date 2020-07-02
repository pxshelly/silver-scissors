import React from 'react';
import ServiceMenu from '../shared/ServiceMenu.jsx';
import StylistMenu from '../shared/StylistMenu.jsx';
import axios from 'axios';
import moment from 'moment';

class ApptFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_name: this.props.apptDetails.customer_name,
      stylist: this.props.apptDetails.stylist,
      hair_services: this.props.apptDetails.hair_services.replace(/\\|"|{|}|:true/g, ''),
      appt_date: this.props.apptDetails.appt_date,
      appt_time: this.props.apptDetails.appt_time,
      email: this.props.apptDetails.email,
      telephone: this.props.apptDetails.telephone,
      textable: this.props.apptDetails.textable,
      notes: this.props.apptDetails.notes,
      pictures: this.props.apptDetails.pictures,
      price: this.props.apptDetails.price,
      duration_hours: this.props.apptDetails.duration_hours,
      duration_minutes: this.props.apptDetails.duration_minutes
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.autofill = this.autofill.bind(this);
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
      let updatedHairServices = {};

      if (typeof this.state.hair_services === 'string') {
        for (let element of this.state.hair_services.split(',')) {
          updatedHairServices[element] = true;
        }
      } else {
        updatedHairServices = { ...this.state.hair_services };
      }

      if (!updatedHairServices[id]) {
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

  componentDidMount() {
    this.autofill();
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
      pictures: this.state.pictures || document.getElementById('pictures').value,
      price: Number(this.state.price) || Number(document.getElementById('price').value),
      duration_hours: Number(this.state.duration_hours) || Number(document.getElementById('duration_hours').value),
      duration_minutes: Number(this.state.duration_minutes) || Number(document.getElementById('duration_minutes').value),
    };
    if (this.props.editAppt) {
      const id = document.getElementsByClassName('edit-appt-button')[0].getAttribute('id');
      data.id = id;
      axios.put(`/appointments?status=approved`, data);
    } else {
      axios.post('/appointments?status=approved', data);
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
            // className: 'appt-form-input'
          }
        }
        ]
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
        },
        {
          text: 'Price',
          element: 'input',
          labelAttributes: {
            htmlFor: 'price',
            className: 'appt-form-label'
          },
          elementAttributes: {
            type: 'number',
            id: 'price',
            placeholder: 'Example: 19.50',
            className: 'appt-form-input',
          }
        }, {
          text: 'Duration',
          element: 'input',
          labelAttributes: {
            htmlFor: 'duration',
            className: 'appt-form-label'
          },
          elementAttributes: {
            type: 'number',
            id: 'duration',
            // className: 'appt-form-input',
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
            if (element.elementAttributes.id === 'duration') {
              return (
                <div className='appt-form-field' key={i}>
                  <label {...element.labelAttributes}>{element.text}</label>
                  <label {...element.labelAttributes} htmlFor='duration_hours'>Hours</label>
                  <input {...element.elementAttributes} id='duration_hours' max='12' />
                  <label {...element.labelAttributes} htmlFor='duration_minutes'>Minutes</label>
                  <input {...element.elementAttributes} id='duration_minutes' max='59' />
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
                  <ServiceMenu />
                  <label {...element.labelAttributes}>{element.text}</label>
                </div>
              );
            }
          })}
        </fieldset>
      );
    })
    return fields;
  }

  closeModal() {
    const confirmation = confirm('Are you sure you do not want to edit this appointment?');
    if (confirmation) {
      document.getElementsByClassName('pending-appt-modal')[0].style.display = 'none';
      window.location='/calendar';  
      this.setState({
        apptDetails: false
      });
    }
  }

  autofill() {
    setTimeout(() => {
      const details = this.props.apptDetails;
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
        if (key === 'hair_services') {
          let services = details[key];
          if (typeof services === 'string') {
            services = services.replace(/\\|"|{|}|:true/g, '').split(',');
          }
          for (let key of services) {
            document.getElementById(key).checked = true;
          }
          continue;
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

  render() {
    return (
      <div className='modal'>
        <div className='pending-appt-modal'>
          <div className='close-modal-button'>
            <button onClick={this.closeModal}>&#x2715;</button>
          </div>
          <div className='appt-form-container employee-appt-form-container'>
            <img src='https://silver-scissors.s3-us-west-1.amazonaws.com/IMG_6031.jpg' />
            <form onSubmit={(e) => this.handleSubmit(e)} className='appt-form' onChange={(e) => this.handleChange(e)}>
              {this.createFields()}
              <button className='appt-form-submit-button'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ApptFormModal;
