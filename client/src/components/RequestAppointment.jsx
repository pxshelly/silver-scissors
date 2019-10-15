import React from 'react';

class RequestAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false
    };
    this.buildServicesTags = this.buildServicesTags.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  buildServicesTags() {
    const services =[
      'Full Color',
      'Highlights',
      'Balayage/Ombre',
      'Root Touch Up',
      'Women',
      ' Haircut',
      ' Kids (9 and under) Haircut',
      ' With Shampoo',
      ' Shampoo and Blow Dry',
      'Men',
      ' Haircut',
      ' Kids (9 and under) Haircut',
      ' With Shampoo',
      ' Full Color',
      'Regular Perm',
      'Digital Perm',
      'Straight Perm',
      'Up-do',
      'Treatment',
    ];
  
    const servicesTag = services.map((service, i) => {
      return <li value={i} key={i} className='services-li'>{service}</li>
    });
    return servicesTag;
  }

  handleClick() {
    this.setState({isDropdownOpen: !this.state.isDropdownOpen})
  }

  render() {
    if (this.state.isDropdownOpen) {
      return (
        <form>
          <label>Name</label>
          <input type='text' required></input>
          <br/>
          <label>Service</label>
          <ul className='services-appointment-dropdown'>
            <div className='services-appointment-container-open'>
            {this.buildServicesTags()}
            </div>
          </ul>
          <br/>
          <label>Date</label>
          <input type='text' required></input>
          <br/>
          <label>Time</label>
          <input type='number' required></input>
          <br/>
          <label>Phone Number</label>
          <input type='nunber' required></input>
          <br/>
          <label>Can we text this number?</label>
          <input type='text' required></input>
          <br/>
          <label>Notes</label>
          <input type='text'></input>
          <br/>
          <input type='submit' value='Submit'></input>
        </form>
      )
    } else {
      return (
        <form>
          <label>Name</label>
          <input type='text' required></input>
          <br/>
          <label>Service</label>
          <div className='services-appointment-container-closed' onClick={() => {this.handleClick()}}>Choose a service</div>
          <br/>
          <label>Date</label>
          <input type='text' required></input>
          <br/>
          <label>Time</label>
          <input type='number' required></input>
          <br/>
          <label>Phone Number</label>
          <input type='nunber' required></input>
          <br/>
          <label>Can we text this number?</label>
          <input type='text' required></input>
          <br/>
          <label>Notes</label>
          <input type='text'></input>
          <br/>
          <input type='submit' value='Submit'></input>
        </form>
      )
    }
  }
}

export default RequestAppointment;