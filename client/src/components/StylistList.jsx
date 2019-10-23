import React from 'react';

function stylistList() {
  const stylists = [
    'No Preference',
    'Kathy',
    'Ruby',
    'Ken',
    'Jack'
  ];

  const buildStylistTags = stylists.map((stylist, i) => {
    return <option value={stylist} key={i} className='services-option'>{stylist}</option>;
  });

  return buildStylistTags;
}

export default stylistList;