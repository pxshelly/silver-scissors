import React from 'react';

function stylistMenu() {
  const stylists = [
    'No Preference',
    'Kathy',
    'Ruby',
    'Ken',
    'Jack'
  ];

  const stylistTags = stylists.map((stylist, i) => {
    return <option value={stylist} key={i} className='services-option'>{stylist}</option>;
  });

  return stylistTags;
}

export default stylistMenu;