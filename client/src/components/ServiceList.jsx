import React from 'react';
import { services } from './services';

function serviceList() {
  const combineServices = () => {
    const arr = [];
    for (let key in services) {
      arr.push(Object.keys(services[key]));
    }
    return arr.flat();
  }

  const buildServiceTags = combineServices().map((service, i) => {
    return <option value={service} key={i} className='services-option'>{service}</option>
  });
  return buildServiceTags;
}

export default serviceList;