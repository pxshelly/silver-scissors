import React from 'react';
import { services } from '../shared/services';

function serviceMenu() {
  const combineServices = () => {
    const options = [];
    for (let key in services) {
      options.push(Object.keys(services[key]));
    }
    return options.flat();
  }

  const serviceTags = combineServices().map((service, i) => {
    return <option value={service} key={i} className='services-option'>{service}</option>;
  });
  
  return serviceTags;
}

export default serviceMenu;